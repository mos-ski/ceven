"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertTriangle, ArrowLeft, Clock } from "lucide-react";
import {
  findIndependentCaregiverInvite,
  formatInviteExpiry,
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

function ProblemState({ problem }: { problem: InviteProblem }) {
  const copy = {
    missing: {
      title: "Invite link not found",
      body: "This invite code does not match an active CEven caregiver invite.",
    },
    expired: {
      title: "Invite expired",
      body: "This caregiver invite is past its 7-day window. Ask the parent to send a new link.",
    },
    used: {
      title: "Invite already used",
      body: "This single-use invite has already been accepted and cannot be opened again.",
    },
    revoked: {
      title: "Invite revoked",
      body: "The parent cancelled this pending invite before it was accepted.",
    },
  }[problem];

  return (
    <div className="flex flex-1 flex-col bg-cg-bg">
      <div className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <Link href="/caregiver/auth" className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200">
          <ArrowLeft size={16} className="text-gray-600" />
        </Link>
        <h1 className="text-base font-bold text-cg-brand">Caregiver invite</h1>
      </div>

      <div className="flex flex-1 items-center px-5">
        <div className="w-full rounded-3xl bg-white p-6 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
            <AlertTriangle size={26} />
          </div>
          <h2 className="text-xl font-bold text-cg-brand">{copy.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-500">{copy.body}</p>
          <Link href="/caregiver/auth" className="mt-6 block rounded-2xl bg-cg-brand py-3 text-sm font-bold text-white">
            Go to caregiver login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CaregiverInvitePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params);
  const router = useRouter();
  const invite = useMemo(() => findIndependentCaregiverInvite(code), [code]);

  const problem = useMemo(() => getInviteProblem(invite), [invite]);

  if (problem) return <ProblemState problem={problem} />;

  if (!invite) {
    return <div className="flex flex-1 bg-cg-bg" />;
  }

  return (
    <div className="flex flex-1 flex-col bg-cg-bg">
      <div className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <button
          onClick={() => router.back()}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200"
        >
          <ArrowLeft size={16} className="text-gray-600" />
        </button>
        <h1 className="text-base font-bold text-cg-brand">Caregiver invite</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5">
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Parent invitation</p>
          <h2 className="mt-1 text-xl font-bold text-cg-brand">{invite.parentName} invited you to care for {invite.childName}</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-cg-quick-action p-3">
              <p className="text-[10px] font-bold uppercase text-gray-400">Child</p>
              <p className="mt-1 text-sm font-bold text-cg-brand">{invite.childName}</p>
              <p className="text-xs text-gray-500">{invite.childAge}</p>
            </div>
            <div className="rounded-2xl bg-cg-quick-action p-3">
              <p className="text-[10px] font-bold uppercase text-gray-400">Phone OTP</p>
              <p className="mt-1 text-sm font-bold text-cg-brand">{invite.caregiverPhone}</p>
              <p className="text-xs text-gray-500">Must match invite</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-2xl bg-amber-50 p-3 text-amber-700">
            <Clock size={16} className="shrink-0" />
            <p className="text-xs font-semibold">Single-use link expires {formatInviteExpiry(invite.expiresAt)}</p>
          </div>

          <Link
            href={`/caregiver/invite/${code}/verify`}
            className="mt-5 block w-full rounded-2xl bg-cg-brand py-3 text-center text-sm font-bold text-white"
          >
            Continue to phone verification
          </Link>
        </div>
      </div>
    </div>
  );
}
