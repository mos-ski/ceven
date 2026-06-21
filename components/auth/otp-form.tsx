"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { OtpInput } from "@/components/auth/otp-input";
import { Button } from "@/components/ui/button";

const RESEND_SECONDS = 66;

type OtpFormProps = {
  email: string;
  nextHref: string;
};

export function OtpForm({ email, nextHref }: OtpFormProps) {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    router.push(nextHref);
  }

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div className="flex w-full flex-col gap-1">
        <h1 className="font-[family-name:var(--font-merriweather)] text-[32px] font-bold text-heading">
          Check your Email
        </h1>
        <p className="font-[family-name:var(--font-urbanist)] text-base text-muted-text">
          We&apos;ve sent a one time OTP to your email{" "}
          {email && <span className="font-medium text-heading">{email}</span>}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center gap-6"
      >
        <OtpInput name="otp" disabled={isSubmitting} />
        <p className="font-[family-name:var(--font-merriweather)] text-sm font-semibold text-brand-dark">
          Resend Code in {minutes}:{seconds}
        </p>
        <Button
          type="submit"
          loading={isSubmitting}
          className="h-11 w-full border border-button-primary-border bg-button-primary-bg font-[family-name:var(--font-urbanist)] text-sm font-semibold text-white hover:bg-button-primary-bg/90"
        >
          Get Started
        </Button>
      </form>

      <button
        type="button"
        onClick={() => router.back()}
        disabled={isSubmitting}
        className="flex items-center gap-2 font-[family-name:var(--font-urbanist)] text-sm font-medium text-heading disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ArrowLeft className="size-5" />
        Back
      </button>
    </div>
  );
}
