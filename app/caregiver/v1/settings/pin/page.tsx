"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { OtpInput } from "@/components/caregiver/otp-input";

const DEMO_PIN = "123456";

type Step = "current" | "new" | "confirm" | "success";

export default function ChangePinPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("current");
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");

  function handleCurrentPin(v: string) {
    setCurrentPin(v);
    setError("");
    if (v.length === 6) {
      if (v === DEMO_PIN) {
        setCurrentPin("");
        setStep("new");
      } else {
        setError("Incorrect PIN. Use 123456 for demo.");
        setTimeout(() => setCurrentPin(""), 800);
      }
    }
  }

  function handleNewPin(v: string) {
    setNewPin(v);
    if (v.length === 6) {
      setNewPin("");
      setStep("confirm");
    }
  }

  function handleConfirmPin(v: string) {
    setConfirmPin(v);
    setError("");
    if (v.length === 6) {
      if (v === newPin || newPin === "") {
        setStep("success");
      } else {
        setError("PINs don't match. Try again.");
        setTimeout(() => setConfirmPin(""), 800);
      }
    }
  }

  if (step === "success") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-cg-bg px-8 text-center">
        <CheckCircle size={56} className="text-cg-accent" />
        <h2
          className="text-lg font-bold text-cg-brand"
          style={{ fontFamily: "var(--font-merriweather)" }}
        >
          PIN Changed!
        </h2>
        <p className="text-sm text-gray-500">Your PIN has been updated successfully.</p>
        <button
          onClick={() => router.back()}
          className="mt-4 w-full rounded-xl bg-cg-brand py-3.5 text-sm font-bold text-white"
        >
          Back to Settings
        </button>
      </div>
    );
  }

  const stepIndex = { current: 0, new: 1, confirm: 2 }[step] ?? 0;

  const title =
    step === "current" ? "Enter Current PIN" : step === "new" ? "Choose New PIN" : "Confirm New PIN";
  const subtitle =
    step === "current"
      ? "Enter your current 6-digit PIN to continue"
      : step === "new"
      ? "Enter a new 6-digit PIN"
      : "Re-enter your new PIN to confirm";

  const value = step === "current" ? currentPin : step === "new" ? newPin : confirmPin;
  const handler =
    step === "current" ? handleCurrentPin : step === "new" ? handleNewPin : handleConfirmPin;

  function goBack() {
    if (step === "current") router.back();
    else if (step === "new") { setNewPin(""); setStep("current"); }
    else { setConfirmPin(""); setStep("new"); }
  }

  return (
    <div className="flex flex-1 flex-col bg-cg-bg">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
        <button
          onClick={goBack}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white"
        >
          <ArrowLeft size={16} className="text-gray-600" />
        </button>
        <h1
          className="text-lg font-bold text-cg-brand"
          style={{ fontFamily: "var(--font-merriweather)" }}
        >
          Change PIN
        </h1>
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto px-6 pt-4">
        {/* Step progress */}
        <div className="mb-6 flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                stepIndex >= i ? "bg-cg-accent" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        <p className="mb-1 text-base font-bold text-cg-brand">{title}</p>
        <p className="mb-6 text-sm text-gray-500">{subtitle}</p>

        {error && <p className="mb-3 text-center text-xs font-semibold text-red-500">{error}</p>}

        <OtpInput value={value} onChange={handler} length={6} />
      </div>
    </div>
  );
}
