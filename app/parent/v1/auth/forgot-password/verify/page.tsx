"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { OtpInput } from "@/components/caregiver/otp-input";

export default function ParentResetVerifyPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(66); // 01:06
  const [canResend, setCanResend] = useState(false);
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

  function handleResend() {
    setCountdown(66);
    setCanResend(false);
    setOtp("");
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
  }

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-[#FAFAFA]">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-[352px] w-[352px] rounded-full bg-[#C78C5F] opacity-20" />
      <div className="pointer-events-none absolute -top-12 -right-12 h-[269px] w-[269px] rounded-full bg-[#C78C5F] opacity-25" />
      <div className="pointer-events-none absolute top-0 right-0 h-[192px] w-[192px] rounded-full bg-[#C78C5F] opacity-30" />

      <div className="flex flex-1 flex-col px-6 pt-14">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex h-9 w-9 items-center justify-center rounded-full bg-[#F4F5F6]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="#31363E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Header */}
        <h1 className="mb-1 text-[22px] font-bold text-gray-800">Verify OTP Code</h1>
        <p className="mb-8 text-sm text-gray-500">
          We&apos;ve sent a one time OTP to your email{" "}
          <span className="font-medium text-gray-700">olajidegoke@gmail.com</span>
        </p>

        {/* OTP label */}
        <p className="mb-3 text-sm font-medium text-gray-800">Secure code</p>

        {/* OTP input + keypad */}
        <OtpInput value={otp} onChange={setOtp} length={6} />

        {/* Resend timer */}
        <p className="mt-4 text-center text-sm text-gray-500">
          {canResend ? (
            <button onClick={handleResend} className="font-semibold text-cg-brand underline">
              Resend Code
            </button>
          ) : (
            <>
              Resend Code in{" "}
              <span className="font-bold text-gray-700">{formatCountdown(countdown)}</span>
            </>
          )}
        </p>

        {/* Continue button */}
        <div className="mt-6">
          <button
            onClick={() => otp.length === 6 && router.push("/parent/auth/forgot-password/success")}
            className={`w-full rounded-xl py-3 text-sm font-semibold transition-colors ${
              otp.length === 6
                ? "bg-cg-brand text-[#FAF2E1]"
                : "bg-[#E0BFA0] text-[#FAF2E1] cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
