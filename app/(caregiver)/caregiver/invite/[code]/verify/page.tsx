"use client";

import { use, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertTriangle, ArrowLeft, CheckCircle2, LogIn, UserPlus } from "lucide-react";
import {
  acceptIndependentCaregiverInvite,
  findIndependentCaregiverInvite,
  getInviteOtpCode,
  isExistingCaregiverPhone,
  type IndependentCaregiverInvite,
} from "@/lib/independent-caregiver-invites";

type InviteProblem = "missing" | "expired" | "used" | "revoked";

function getInviteProblem(invite: IndependentCaregiverInvite | null): InviteProblem | null {
  if (!invite) return "missing";
  if (invite.status === "accepted") return "used";
  if (invite.status === "revoked") return "revoked";
  if (new Date(invite.expiresAt).getTime() <= Date.now()) return "expired";
  return null;
}

function AlphanumericOtpInput({
  value,
  onChange,
  length = 6,
}: {
  value: string;
  onChange: (value: string) => void;
  length?: number;
}) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  function clean(nextValue: string) {
    return nextValue.replace(/[^a-z0-9]/gi, "").toUpperCase().slice(0, length);
  }

  function updateAt(index: number, nextChar: string) {
    const chars = value.padEnd(length, " ").split("");
    chars[index] = clean(nextChar).slice(-1) || " ";
    onChange(chars.join("").replace(/\s/g, "").slice(0, length));
  }

  function handleInput(index: number, rawValue: string) {
    const nextValue = clean(rawValue);

    if (nextValue.length > 1) {
      const chars = value.padEnd(length, " ").split("");
      nextValue.split("").forEach((char, offset) => {
        if (index + offset < length) chars[index + offset] = char;
      });
      onChange(chars.join("").replace(/\s/g, "").slice(0, length));
      inputRefs.current[Math.min(index + nextValue.length, length - 1)]?.focus();
      return;
    }

    updateAt(index, nextValue);
    if (nextValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleBackspace(index: number) {
    if (value[index]) {
      updateAt(index, "");
      return;
    }
    if (index > 0) {
      inputRefs.current[index - 1]?.focus();
      updateAt(index - 1, "");
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(node) => {
              inputRefs.current[index] = node;
            }}
            value={value[index] ?? ""}
            onChange={(event) => handleInput(index, event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Backspace") {
                event.preventDefault();
                handleBackspace(index);
              }
              if (event.key === "ArrowLeft" && index > 0) inputRefs.current[index - 1]?.focus();
              if (event.key === "ArrowRight" && index < length - 1) inputRefs.current[index + 1]?.focus();
            }}
            onPaste={(event) => {
              event.preventDefault();
              handleInput(index, event.clipboardData.getData("text"));
            }}
            aria-label={`Code character ${index + 1}`}
            autoCapitalize="characters"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            inputMode="text"
            maxLength={1}
            spellCheck={false}
            className="h-12 min-w-0 flex-1 rounded-xl border border-gray-200 bg-white text-center text-base font-black uppercase text-cg-brand shadow-sm outline-none focus:border-cg-brand focus:ring-2 focus:ring-cg-brand/10"
          />
        ))}
      </div>
      <p className="text-center text-[11px] font-semibold text-gray-400">Tap a box or paste the full code.</p>
    </div>
  );
}

function ProblemState({ problem }: { problem: InviteProblem }) {
  const copy = {
    missing: ["Invite link not found", "This invite code does not match an active CEven caregiver invite."],
    expired: ["Invite expired", "This caregiver invite is past its 7-day window. Ask the parent to send a new link."],
    used: ["Invite already used", "This single-use invite has already been accepted and cannot be opened again."],
    revoked: ["Invite revoked", "The parent cancelled this pending invite before it was accepted."],
  }[problem];

  return (
    <div className="flex flex-1 flex-col bg-cg-bg">
      <div className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <Link href="/caregiver/auth" className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200">
          <ArrowLeft size={16} className="text-gray-600" />
        </Link>
        <h1 className="text-base font-bold text-cg-brand">Phone verification</h1>
      </div>
      <div className="flex flex-1 items-center px-5">
        <div className="w-full rounded-3xl bg-white p-6 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
            <AlertTriangle size={26} />
          </div>
          <h2 className="text-xl font-bold text-cg-brand">{copy[0]}</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-500">{copy[1]}</p>
        </div>
      </div>
    </div>
  );
}

export default function CaregiverInviteVerifyPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params);
  const router = useRouter();
  const invite = useMemo(() => findIndependentCaregiverInvite(code), [code]);
  const [otp, setOtp] = useState("");
  const [accepted, setAccepted] = useState<IndependentCaregiverInvite | null>(null);

  const problem = useMemo(() => getInviteProblem(invite), [invite]);
  const otpVerified = otp.toUpperCase() === getInviteOtpCode();
  const matchedExistingAccount = invite ? isExistingCaregiverPhone(invite.caregiverPhone) : false;

  function handleAccept(accountType: "existing" | "new") {
    const result = acceptIndependentCaregiverInvite(code, accountType);
    if (!result) return;
    setAccepted(result);
  }

  if (problem) return <ProblemState problem={problem} />;
  if (!invite) return <div className="flex flex-1 bg-cg-bg" />;

  if (accepted) {
    return (
      <div className="flex flex-1 flex-col bg-cg-bg">
        <div className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
          <h1 className="text-base font-bold text-cg-brand">Invite accepted</h1>
        </div>

        <div className="flex flex-1 items-center px-5">
          <div className="w-full rounded-3xl bg-white p-6 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={30} />
            </div>
            <h2 className="text-xl font-bold text-cg-brand">{accepted.childName} is now in your care list</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              {accepted.acceptedAccountType === "existing"
                ? "We matched the verified phone number to your existing caregiver account."
                : "Your caregiver profile is ready without a business setup step."}
            </p>
            <button
              onClick={() => router.replace("/caregiver/children")}
              className="mt-6 w-full rounded-2xl bg-cg-brand py-3 text-sm font-bold text-white"
            >
              View My Families
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col bg-cg-bg">
      <div className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <Link href={`/caregiver/invite/${code}`} className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200">
          <ArrowLeft size={16} className="text-gray-600" />
        </Link>
        <h1 className="text-base font-bold text-cg-brand">Phone verification</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5">
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <div className="mb-4">
            <p className="text-sm font-bold text-cg-brand">Verify phone number</p>
            <p className="mt-1 text-xs leading-relaxed text-gray-500">
              We sent an alphanumeric code to {invite.caregiverPhone}. Prototype code:{" "}
              <span className="font-bold text-cg-brand">{getInviteOtpCode()}</span>.
            </p>
          </div>
          <AlphanumericOtpInput value={otp} onChange={setOtp} length={6} />

          <div className="mt-4 space-y-3">
            <button
              onClick={() => handleAccept("existing")}
              disabled={!otpVerified}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-cg-brand py-3 text-sm font-bold text-white disabled:opacity-40"
            >
              <LogIn size={16} />
              {matchedExistingAccount ? "Continue with existing account" : "Log in and attach invite"}
            </button>
            <button
              onClick={() => handleAccept("new")}
              disabled={!otpVerified || matchedExistingAccount}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 py-3 text-sm font-bold text-cg-brand disabled:opacity-40"
            >
              <UserPlus size={16} />
              Create caregiver account
            </button>
            {matchedExistingAccount && (
              <p className="text-center text-xs leading-relaxed text-gray-500">
                This phone number matches an existing caregiver, so CEven will attach the relationship instead of creating a duplicate profile.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
