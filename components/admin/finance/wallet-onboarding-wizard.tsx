"use client";

import { useState } from "react";
import { Check, ChevronRight, Building2, CreditCard, ShieldCheck, X } from "lucide-react";

import { NIGERIAN_BANKS, checkNameMatch } from "@/lib/mock-data/wallet";

type Props = {
  open: boolean;
  onComplete: () => void;
  onClose: () => void;
};

const STEPS = [
  { num: 1, label: "Business Info", icon: Building2 },
  { num: 2, label: "Bank Details", icon: CreditCard },
  { num: 3, label: "Verify", icon: ShieldCheck },
];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]">
      {children}
    </label>
  );
}

export default function WalletOnboardingWizard({ open, onComplete, onClose }: Props) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [businessName, setBusinessName] = useState("Greg Creche Limited");
  const [rcNumber, setRcNumber] = useState("");
  const [accountType, setAccountType] = useState<"business" | "personal">("business");
  const [bvn, setBvn] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [fetchedName, setFetchedName] = useState("");
  const [nameMatch, setNameMatch] = useState<boolean | null>(null);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  function handleFetchAccount() {
    if (accountNumber.length === 10 && bankName) {
      setLoading(true);
      setTimeout(() => {
        setFetchedName("Greg Creche Limited");
        setNameMatch(checkNameMatch("Greg Creche Limited", businessName));
        setLoading(false);
      }, 1500);
    }
  }

  function handleSendOtp() {
    setOtpSent(true);
  }

  function handleVerifyOtp() {
    if (otp === "123456" || otp.length === 6) {
      setLoading(true);
      setTimeout(() => {
        setOtpVerified(true);
        setLoading(false);
      }, 1000);
    }
  }

  function handleComplete() {
    onComplete();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="mx-4 flex w-full max-w-[560px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#eaecf0] px-6 pb-4 pt-6">
          <div>
            <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
              Set Up Your Wallet
            </h2>
            <p className="mt-1 font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
              Complete these steps to activate your crèche wallet
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-[#6b7280] hover:text-[#2d1810]"
          >
            <X className="size-5" />
            <span className="sr-only">Close</span>
          </button>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 px-6 pt-4">
            {STEPS.map((s, i) => (
              <div key={s.num} className="flex items-center gap-2">
                <div
                  className={`flex size-8 items-center justify-center rounded-full text-sm font-semibold ${
                    step > s.num
                      ? "bg-[#009061] text-white"
                      : step === s.num
                        ? "bg-[#3b2513] text-[#faf2e1]"
                        : "bg-[#e6ebf3] text-[#6b7280]"
                  }`}
                >
                  {step > s.num ? <Check className="size-4" /> : s.num}
                </div>
                <span
                  className={`hidden font-[family-name:var(--font-nunito)] text-xs sm:block ${
                    step === s.num ? "text-[#2d1810]" : "text-[#6b7280]"
                  }`}
                >
                  {s.label}
                </span>
                {i < STEPS.length - 1 && <ChevronRight className="size-3 text-[#d0d5dd]" />}
              </div>
            ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Step 1: Business Info */}
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <FieldLabel>Business Name</FieldLabel>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="h-[52px] w-full rounded-xl border border-[#e6ebf3] bg-white px-4 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] placeholder:text-[#6b7280] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <FieldLabel>RC Number (Optional)</FieldLabel>
                <input
                  type="text"
                  value={rcNumber}
                  onChange={(e) => setRcNumber(e.target.value)}
                  placeholder="Enter RC number if available"
                  className="h-[52px] w-full rounded-xl border border-[#e6ebf3] bg-white px-4 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] placeholder:text-[#6b7280] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <FieldLabel>Account Type</FieldLabel>
                <div className="flex gap-3">
                  <button
                    onClick={() => setAccountType("business")}
                    className={`flex-1 rounded-xl border px-4 py-3 font-[family-name:var(--font-nunito)] text-sm transition-colors ${
                      accountType === "business"
                        ? "border-[#3b2513] bg-[#3b2513] text-[#faf2e1]"
                        : "border-[#e6ebf3] bg-white text-[#6b7280] hover:border-[#3b2513]"
                    }`}
                  >
                    Business Account
                  </button>
                  <button
                    onClick={() => setAccountType("personal")}
                    className={`flex-1 rounded-xl border px-4 py-3 font-[family-name:var(--font-nunito)] text-sm transition-colors ${
                      accountType === "personal"
                        ? "border-[#3b2513] bg-[#3b2513] text-[#faf2e1]"
                        : "border-[#e6ebf3] bg-white text-[#6b7280] hover:border-[#3b2513]"
                    }`}
                  >
                    Personal Account
                  </button>
                </div>
                {accountType === "personal" && (
                  <p className="mt-1 font-[family-name:var(--font-nunito)] text-xs text-[#cc8000]">
                    Withdrawals to personal accounts require CEven support approval.
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <FieldLabel>BVN</FieldLabel>
                <input
                  type="text"
                  value={bvn}
                  onChange={(e) => setBvn(e.target.value.replace(/\D/g, "").slice(0, 11))}
                  placeholder="11-digit BVN"
                  className="h-[52px] w-full rounded-xl border border-[#e6ebf3] bg-white px-4 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] placeholder:text-[#6b7280] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
                />
              </div>
            </div>
          )}

          {/* Step 2: Bank Details */}
          {step === 2 && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <FieldLabel>Bank Name</FieldLabel>
                <select
                  value={bankName}
                  onChange={(e) => {
                    setBankName(e.target.value);
                    setFetchedName("");
                    setNameMatch(null);
                  }}
                  className="h-[52px] w-full rounded-xl border border-[#e6ebf3] bg-white px-4 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
                >
                  <option value="" disabled>
                    Select bank
                  </option>
                  {NIGERIAN_BANKS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <FieldLabel>Account Number</FieldLabel>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => {
                    setAccountNumber(e.target.value.replace(/\D/g, "").slice(0, 10));
                    setFetchedName("");
                    setNameMatch(null);
                  }}
                  onBlur={handleFetchAccount}
                  placeholder="10-digit account number"
                  className="h-[52px] w-full rounded-xl border border-[#e6ebf3] bg-white px-4 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] placeholder:text-[#6b7280] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
                />
              </div>

              {loading && (
                <div className="flex items-center gap-2 rounded-xl bg-[#f9fafb] px-4 py-3">
                  <div className="size-4 animate-spin rounded-full border-2 border-[#3b2513] border-t-transparent" />
                  <span className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
                    Fetching account details...
                  </span>
                </div>
              )}

              {fetchedName && !loading && (
                <div className="rounded-xl border border-[#e6ebf3] bg-[#f9fafb] px-4 py-3">
                  <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">Account Name</p>
                  <p className="mt-1 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]">
                    {fetchedName}
                  </p>
                  {nameMatch === false && (
                    <div className="mt-2 rounded-lg bg-[#fff6e6] px-3 py-2">
                      <p className="font-[family-name:var(--font-nunito)] text-xs text-[#cc8000]">
                        Account name does not match your crèche name. Withdrawals to personal accounts require
                        CEven support approval.
                      </p>
                    </div>
                  )}
                  {nameMatch === true && (
                    <div className="mt-2 rounded-lg bg-[#ecfff8] px-3 py-2">
                      <p className="font-[family-name:var(--font-nunito)] text-xs text-[#009061]">
                        Account name matches your crèche profile.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 3: OTP Verification */}
          {step === 3 && (
            <div className="flex flex-col gap-4">
              {!otpSent && (
                <div className="flex flex-col items-center gap-3 py-6">
                  <div className="flex size-16 items-center justify-center rounded-full bg-[#f5edd8]">
                    <ShieldCheck className="size-8 text-[#3b2513]" />
                  </div>
                  <h3 className="font-[family-name:var(--font-merriweather)] text-base font-bold text-[#2d1810]">
                    Verify Your Identity
                  </h3>
                  <p className="max-w-xs text-center font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
                    We&apos;ll send a 6-digit code to your email to authorise wallet setup.
                  </p>
                  <button
                    onClick={handleSendOtp}
                    className="mt-2 rounded-lg bg-[#3b2513] px-6 py-3 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1] hover:bg-[#2d1810]"
                  >
                    Send OTP
                  </button>
                </div>
              )}

              {otpSent && !otpVerified && (
                <div className="flex flex-col items-center gap-3 py-6">
                  <div className="flex size-16 items-center justify-center rounded-full bg-[#f5edd8]">
                    <ShieldCheck className="size-8 text-[#3b2513]" />
                  </div>
                  <h3 className="font-[family-name:var(--font-merriweather)] text-base font-bold text-[#2d1810]">
                    Enter OTP
                  </h3>
                  <p className="max-w-xs text-center font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
                    Enter the 6-digit code sent to your email
                  </p>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="000000"
                    className="h-[52px] w-48 rounded-xl border border-[#e6ebf3] bg-white px-4 text-center font-[family-name:var(--font-urbanist)] text-lg tracking-[0.5em] text-[#2d1810] placeholder:text-[#6b7280] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
                  />
                  <button
                    onClick={handleVerifyOtp}
                    disabled={otp.length < 6 || loading}
                    className="mt-2 rounded-lg bg-[#3b2513] px-6 py-3 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1] hover:bg-[#2d1810] disabled:cursor-not-allowed disabled:bg-[#e0bfa0]"
                  >
                    {loading ? "Verifying..." : "Verify"}
                  </button>
                  <button
                    onClick={handleSendOtp}
                    className="font-[family-name:var(--font-nunito)] text-sm text-[#c47b2c] hover:underline"
                  >
                    Resend OTP
                  </button>
                </div>
              )}

              {otpVerified && (
                <div className="flex flex-col items-center gap-3 py-6">
                  <div className="flex size-16 items-center justify-center rounded-full bg-[#ecfff8]">
                    <Check className="size-8 text-[#009061]" />
                  </div>
                  <h3 className="font-[family-name:var(--font-merriweather)] text-base font-bold text-[#2d1810]">
                    Wallet Activated!
                  </h3>
                  <p className="max-w-xs text-center font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
                    Your wallet is ready. You can now receive payments and make withdrawals.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[#eaecf0] px-6 py-4">
          <button
            onClick={() => setStep(Math.max(1, step - 1) as 1 | 2 | 3)}
            disabled={step === 1}
            className="rounded-lg border border-[#3b2513] bg-white px-5 py-3 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#3b2513] hover:bg-[#f9fafb] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Back
          </button>

          {step < 3 && (
            <button
              onClick={() => setStep((step + 1) as 1 | 2 | 3)}
              disabled={
                (step === 1 && (!businessName || !bvn)) ||
                (step === 2 && (!bankName || accountNumber.length < 10 || !fetchedName))
              }
              className="rounded-lg border border-[#d4a67f] bg-[#3b2513] px-5 py-3 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1] hover:bg-[#2d1810] disabled:cursor-not-allowed disabled:bg-[#e0bfa0]"
            >
              Continue
            </button>
          )}

          {step === 3 && otpVerified && (
            <button
              onClick={handleComplete}
              className="rounded-lg border border-[#d4a67f] bg-[#3b2513] px-5 py-3 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1] hover:bg-[#2d1810]"
            >
              Go to Wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
