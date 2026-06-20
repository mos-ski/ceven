"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const RESEND_SECONDS = 66;

export function VerifyEmailForm({ email }: { email: string }) {
  const router = useRouter();
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  function handleDigitChange(index: number, value: string) {
    if (value.length > 1) return;
    const next = [...digits];
    next[index] = value;
    setDigits(next);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-merriweather)] text-[32px] font-bold text-heading">
          Check your Email
        </h1>
        <p className="mt-2 font-[family-name:var(--font-urbanist)] text-base text-muted-text">
          We&apos;ve sent a one time OTP to your email{" "}
          <span className="font-medium text-heading">{email}</span>
        </p>
      </div>

      <div className="flex gap-3">
        {digits.map((digit, index) => (
          <input
            key={index}
            value={digit}
            onChange={(e) => handleDigitChange(index, e.target.value)}
            maxLength={1}
            inputMode="numeric"
            placeholder="-"
            className="h-20 w-20 rounded-lg border border-input-border text-center font-[family-name:var(--font-merriweather)] text-2xl font-bold text-otp-text"
          />
        ))}
      </div>

      <p className="font-[family-name:var(--font-merriweather)] text-sm font-semibold text-sidebar-bg">
        Resend Code in {minutes}:{seconds}
      </p>

      <Button
        type="button"
        onClick={() => router.push("/login")}
        className="h-11 w-full border border-button-primary-border bg-button-primary-bg text-white hover:bg-button-primary-bg/90"
      >
        Continue
      </Button>

      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-1 font-[family-name:var(--font-urbanist)] text-sm text-heading"
      >
        ← Back
      </button>
    </div>
  );
}
