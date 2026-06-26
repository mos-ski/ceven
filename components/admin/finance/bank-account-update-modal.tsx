"use client";

import { useState } from "react";
import { Check, ShieldCheck } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { NIGERIAN_BANKS, MOCK_BANK_ACCOUNT, checkNameMatch } from "@/lib/mock-data/wallet";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type Step = "details" | "otp" | "success";

export default function BankAccountUpdateModal({ open, onOpenChange }: Props) {
  const [step, setStep] = useState<Step>("details");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [fetchedName, setFetchedName] = useState("");
  const [nameMatch, setNameMatch] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  function handleFetchAccount() {
    if (accountNumber.length === 10 && bankName) {
      setLoading(true);
      setTimeout(() => {
        setFetchedName("Greg Creche Limited");
        setNameMatch(checkNameMatch("Greg Creche Limited", "Greg Creche Limited"));
        setLoading(false);
      }, 1500);
    }
  }

  function handleSendOtp() {
    setOtpSent(true);
    setStep("otp");
  }

  function handleVerifyOtp() {
    if (otp.length === 6) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep("success");
      }, 1000);
    }
  }

  function handleClose() {
    onOpenChange(false);
    setTimeout(() => {
      setStep("details");
      setBankName("");
      setAccountNumber("");
      setFetchedName("");
      setNameMatch(null);
      setOtp("");
      setOtpSent(false);
    }, 300);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[480px]" showCloseButton>
        {step === "details" && (
          <>
            <DialogHeader>
              <DialogTitle>Update Bank Account</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-4 px-6 py-6">
              <div className="rounded-xl border border-[#e6ebf3] bg-[#faf9f7] p-4">
                <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">Current Account</p>
                <p className="mt-1 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#2d1810]">
                  {MOCK_BANK_ACCOUNT.bankName} ••••{MOCK_BANK_ACCOUNT.accountNumber.slice(-4)}
                </p>
                <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
                  {MOCK_BANK_ACCOUNT.accountName}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]">
                  New Bank Name
                </label>
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
                <label className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]">
                  New Account Number
                </label>
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
                        Account name does not match your crèche name. This account will be flagged as personal.
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

            <DialogFooter>
              <button
                onClick={handleClose}
                className="rounded-lg border border-[#3b2513] bg-white px-5 py-3 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#3b2513] hover:bg-[#f9fafb]"
              >
                Cancel
              </button>
              <button
                onClick={handleSendOtp}
                disabled={!bankName || accountNumber.length < 10 || !fetchedName}
                className="rounded-lg border border-[#d4a67f] bg-[#3b2513] px-5 py-3 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1] hover:bg-[#2d1810] disabled:cursor-not-allowed disabled:bg-[#e0bfa0]"
              >
                Update & Verify
              </button>
            </DialogFooter>
          </>
        )}

        {step === "otp" && (
          <>
            <DialogHeader>
              <DialogTitle>Verify Update</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col items-center gap-3 px-6 py-8">
              <div className="flex size-16 items-center justify-center rounded-full bg-[#f5edd8]">
                <ShieldCheck className="size-8 text-[#3b2513]" />
              </div>
              <h3 className="font-[family-name:var(--font-merriweather)] text-base font-bold text-[#2d1810]">
                Enter OTP
              </h3>
              <p className="max-w-xs text-center font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
                Enter the 6-digit code sent to your registered phone number
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
                {loading ? "Verifying..." : "Verify & Update"}
              </button>
              <button
                onClick={handleSendOtp}
                className="font-[family-name:var(--font-nunito)] text-sm text-[#c47b2c] hover:underline"
              >
                Resend OTP
              </button>
            </div>
          </>
        )}

        {step === "success" && (
          <>
            <div className="flex flex-col items-center gap-3 px-6 py-10">
              <div className="flex size-16 items-center justify-center rounded-full bg-[#ecfff8]">
                <Check className="size-8 text-[#009061]" />
              </div>
              <h3 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
                Bank Account Updated
              </h3>
              <p className="max-w-xs text-center font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
                Your payout account has been updated to {bankName} ••••{accountNumber.slice(-4)}
              </p>
              <button
                onClick={handleClose}
                className="mt-2 rounded-lg border border-[#d4a67f] bg-[#3b2513] px-6 py-3 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1] hover:bg-[#2d1810]"
              >
                Done
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
