"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Users } from "lucide-react";
import Link from "next/link";
import { OtpInput } from "@/components/caregiver/otp-input";

type Role = "parent" | "caregiver";

function AuthForm() {
  const [role, setRole] = useState<Role>("caregiver");
  const [showRoleSheet, setShowRoleSheet] = useState(true);
  const [tempRole, setTempRole] = useState<Role>("caregiver");
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(600);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function startTimer() {
    clearInterval(timerRef.current!);
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

  useEffect(() => {
    if (!showRoleSheet) startTimer();
    return () => clearInterval(timerRef.current!);
  }, [showRoleSheet]);

  function handleContinue() {
    setRole(tempRole);
    setShowRoleSheet(false);
  }

  function formatCountdown(s: number) {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  }

  useEffect(() => {
    if (otp.length !== 6) return;
    if (role === "parent") {
      router.replace("/parent/home");
    } else {
      router.replace("/caregiver/home");
    }
  }, [otp, router, role]);

  const greeting = role === "parent" ? "Welcome Parent 👋" : "Welcome Caregiver 👋";

  return (
    <div className="relative flex flex-1 flex-col bg-white">
      <button
        onClick={() => router.back()}
        className="m-4 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200"
      >
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
                startTimer();
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

        <Link
          href="/caregiver/auth/reset-pin"
          className="text-center text-sm text-cg-accent underline"
        >
          Forgot PIN?
        </Link>
      </div>

      {/* Role selector sheet */}
      {showRoleSheet && (
        <>
          <div className="absolute inset-0 z-40 bg-black/30" />
          <div className="absolute inset-x-0 bottom-0 z-50 rounded-t-3xl bg-white px-6 pb-8 pt-4">
            <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-gray-200" />
            <h2
              className="mb-1 text-xl font-bold text-cg-brand"
              style={{ fontFamily: "var(--font-merriweather)" }}
            >
              Let&apos;s Get you Started
            </h2>
            <p className="mb-5 text-sm text-gray-500">
              Select parent or caregiver to continue.
            </p>

            <div className="mb-5 flex gap-4">
              <button
                onClick={() => setTempRole("parent")}
                className={`flex flex-1 flex-col items-center gap-2.5 rounded-2xl border-2 py-6 transition-all ${
                  tempRole === "parent"
                    ? "border-cg-brand bg-cg-brand text-white"
                    : "border-gray-200 bg-white text-gray-500"
                }`}
              >
                <User size={28} />
                <span className="text-sm font-semibold">Parent</span>
              </button>

              <button
                onClick={() => setTempRole("caregiver")}
                className={`flex flex-1 flex-col items-center gap-2.5 rounded-2xl border-2 py-6 transition-all ${
                  tempRole === "caregiver"
                    ? "border-cg-brand bg-cg-brand text-white"
                    : "border-gray-200 bg-white text-gray-500"
                }`}
              >
                <Users size={28} />
                <span className="text-sm font-semibold">Caregiver</span>
              </button>
            </div>

            <button
              onClick={handleContinue}
              className="w-full rounded-xl bg-cg-brand py-4 text-base font-semibold text-white"
            >
              Continue
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense>
      <AuthForm />
    </Suspense>
  );
}
