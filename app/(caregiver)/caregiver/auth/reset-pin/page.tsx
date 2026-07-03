"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, X } from "lucide-react";
import { OtpInput } from "@/components/caregiver/otp-input";

type Step = "otp" | "newPin";

const KEYPAD_ROWS = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["", "0", "backspace"],
];

const BackspaceIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M9 9L15 15M15 9L9 15M3 12L7 5H21V19H7L3 12Z"
      stroke="#3B2513"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ResetPinPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("otp");
  const [otp, setOtp] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [activeField, setActiveField] = useState<"new" | "confirm">("new");
  const [showSuccess, setShowSuccess] = useState(false);
  const [countdown, setCountdown] = useState(600);
  const [canResend, setCanResend] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) { setCanResend(true); clearInterval(timerRef.current!); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, []);

  function formatCountdown(s: number) {
    return `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;
  }

  function handlePinKey(key: string) {
    if (activeField === "new") {
      if (key === "backspace") setNewPin((p) => p.slice(0, -1));
      else if (newPin.length < 6 && /^\d$/.test(key)) {
        const next = newPin + key;
        setNewPin(next);
        if (next.length === 6) setActiveField("confirm");
      }
    } else {
      if (key === "backspace") setConfirmPin((p) => p.slice(0, -1));
      else if (confirmPin.length < 6 && /^\d$/.test(key)) setConfirmPin((p) => p + key);
    }
  }

  const canResetPin = newPin.length === 6 && confirmPin.length === 6 && newPin === confirmPin;

  return (
    <div className="relative flex flex-1 flex-col bg-white">
      {/* Header */}
      <button
        onClick={() => (step === "newPin" ? setStep("otp") : router.back())}
        className="m-4 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200"
      >
        <ArrowLeft size={16} className="text-gray-600" />
      </button>

      <div className="flex flex-1 flex-col px-6">
        <h1
          className="mb-1 text-2xl font-bold text-cg-brand"
          style={{ fontFamily: "var(--font-merriweather)" }}
        >
          PIN Reset
        </h1>
        <p className="mb-6 text-sm text-gray-500">
          {step === "otp"
            ? "We've sent a one time OTP to your email/phone number."
            : "Set your new PIN to complete the reset."}
        </p>

        {/* ── Step 1: OTP ── */}
        {step === "otp" && (
          <>
            <p className="mb-3 text-sm font-semibold text-gray-700">OTP</p>
            <OtpInput value={otp} onChange={setOtp} length={6} />

            <p className="my-4 text-center text-sm text-gray-500">
              {canResend ? (
                <button
                  className="font-semibold text-cg-accent underline"
                  onClick={() => {
                    setCountdown(600);
                    setCanResend(false);
                    setOtp("");
                  }}
                >
                  Resend Code
                </button>
              ) : (
                <>
                  Resend Code in{" "}
                  <span className="font-bold text-gray-700">{formatCountdown(countdown)}</span>
                </>
              )}
            </p>

            <button
              onClick={() => { if (otp.length === 6) setStep("newPin"); }}
              disabled={otp.length !== 6}
              className="w-full rounded-xl bg-cg-accent-muted py-3.5 text-base font-semibold text-cg-brand disabled:opacity-40"
            >
              Continue
            </button>
          </>
        )}

        {/* ── Step 2: New PIN ── */}
        {step === "newPin" && (
          <>
            {/* New PIN boxes */}
            <p className="mb-2 text-sm font-medium text-gray-700">New PIN</p>
            <div className="mb-4 flex gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveField("new")}
                  className={`flex h-11 flex-1 items-center justify-center rounded-lg border text-lg font-bold text-cg-brand ${
                    activeField === "new" && i === newPin.length
                      ? "border-cg-accent"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  {newPin[i] ? "●" : <span className="text-gray-300">–</span>}
                </button>
              ))}
            </div>

            {/* Confirm PIN boxes */}
            <p className="mb-2 text-sm font-medium text-gray-700">Confirm PIN</p>
            <div className="mb-4 flex gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveField("confirm")}
                  className={`flex h-11 flex-1 items-center justify-center rounded-lg border text-lg font-bold text-cg-brand ${
                    activeField === "confirm" && i === confirmPin.length
                      ? "border-cg-accent"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  {confirmPin[i] ? "●" : <span className="text-gray-300">–</span>}
                </button>
              ))}
            </div>

            {/* Keypad */}
            <div className="mt-2 grid grid-cols-3 gap-2">
              {KEYPAD_ROWS.flat().map((k, i) => (
                <button
                  key={i}
                  onClick={() => k && handlePinKey(k)}
                  disabled={!k}
                  className={`flex h-12 items-center justify-center rounded-xl text-base font-medium ${
                    k ? "bg-gray-100 text-cg-brand active:bg-gray-200" : "bg-transparent"
                  }`}
                >
                  {k === "backspace" ? <BackspaceIcon /> : k}
                </button>
              ))}
            </div>

            <button
              onClick={() => { if (canResetPin) setShowSuccess(true); }}
              disabled={!canResetPin}
              className="mt-4 w-full rounded-xl bg-cg-accent-muted py-3.5 text-base font-semibold text-cg-brand disabled:opacity-40"
            >
              Reset PIN
            </button>
          </>
        )}
      </div>

      {/* Success modal */}
      {showSuccess && (
        <>
          <div className="absolute inset-0 z-40 bg-black/30" />
          <div className="absolute inset-x-6 top-1/2 z-50 -translate-y-1/2 rounded-3xl bg-white p-6">
            <button
              onClick={() => router.replace("/caregiver/auth")}
              className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-gray-100"
            >
              <X size={14} className="text-gray-500" />
            </button>
            <div className="flex flex-col items-center gap-3 py-6">
              <p
                className="text-xl font-bold text-cg-brand"
                style={{ fontFamily: "var(--font-merriweather)" }}
              >
                Success!
              </p>
              <p className="text-sm text-gray-500">Your PIN has been set.</p>
            </div>
            <button
              onClick={() => router.replace("/caregiver/auth")}
              className="w-full rounded-xl bg-cg-brand py-3.5 text-base font-semibold text-white"
            >
              Login
            </button>
          </div>
        </>
      )}
    </div>
  );
}
