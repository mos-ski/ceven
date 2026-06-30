"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Users } from "lucide-react";
import { OtpInput } from "@/components/caregiver/otp-input";
import { cgGet } from "@/lib/caregiver/storage";

type Role = "parents" | "caregivers";

export default function AuthPage() {
  const [role, setRole] = useState<Role>("caregivers");
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(600); // 10 min in seconds
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          setCanResend(true);
          clearInterval(timerRef.current!);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, []);

  function formatCountdown(s: number) {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  }

  function handleLogin() {
    if (otp.length !== 6) return;
    const pinConfigured = cgGet("pin");
    router.push(pinConfigured ? "/caregiver/home" : "/caregiver/auth/pin");
  }

  const greeting = role === "parents" ? "Welcome Parent 👋" : "Welcome Caregiver 👋";

  return (
    <div className="flex flex-1 flex-col bg-white">
      {/* Back arrow */}
      <button className="m-4 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200">
        <ArrowLeft size={16} className="text-gray-600" />
      </button>

      <div className="flex flex-1 flex-col overflow-y-auto px-6">
        <h1
          className="mb-1 text-2xl font-bold text-cg-brand"
          style={{ fontFamily: "var(--font-merriweather)" }}
        >
          {greeting}
        </h1>
        <p className="mb-6 text-sm text-gray-500">
          We&apos;ve sent a one time OTP to your email/phone number.
        </p>

        {/* Role toggle */}
        <div className="mb-6 flex rounded-full border border-gray-200 p-0.5">
          <button
            onClick={() => setRole("parents")}
            className={`flex-1 rounded-full py-2 text-sm font-medium transition-colors ${
              role === "parents" ? "bg-cg-brand text-white" : "text-gray-500"
            }`}
          >
            Parents
          </button>
          <button
            onClick={() => setRole("caregivers")}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-sm font-medium transition-colors ${
              role === "caregivers" ? "bg-cg-brand text-white" : "text-gray-500"
            }`}
          >
            <Users size={14} />
            Caregivers
          </button>
        </div>

        {/* OTP label */}
        <p className="mb-3 text-sm font-semibold text-gray-700">OTP</p>

        <OtpInput value={otp} onChange={setOtp} length={6} />

        {/* Countdown */}
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

        {/* Login button */}
        <button
          onClick={handleLogin}
          disabled={otp.length !== 6}
          className="w-full rounded-xl bg-cg-accent-muted py-3.5 text-base font-semibold text-cg-brand disabled:opacity-40"
        >
          Login
        </button>
      </div>
    </div>
  );
}
