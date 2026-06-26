"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { WALLET_BALANCE, MOCK_BANK_ACCOUNT, formatNaira } from "@/lib/mock-data/wallet";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type Step = "amount" | "review" | "success";

export default function WithdrawalRequestModal({ open, onOpenChange }: Props) {
  const [step, setStep] = useState<Step>("amount");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const amountNum = parseInt(amount.replace(/\D/g, ""), 10) || 0;
  const minBalance = 1000;
  const availableBalance = WALLET_BALANCE.available;
  const belowMinimum = amountNum > 0 && availableBalance - amountNum < minBalance;
  const insufficientFunds = amountNum > availableBalance;
  const canProceed = amountNum > 0 && !belowMinimum && !insufficientFunds;

  function handleProceed() {
    if (canProceed) {
      setStep("review");
    }
  }

  function handleConfirm() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("success");
    }, 2000);
  }

  function handleClose() {
    onOpenChange(false);
    setTimeout(() => {
      setStep("amount");
      setAmount("");
      setNote("");
    }, 300);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[480px]" showCloseButton>
        {step === "amount" && (
          <>
            <DialogHeader>
              <DialogTitle>Withdraw Funds</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-4 px-6 py-6">
              <div className="rounded-xl bg-[#faf9f7] p-4">
                <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">Available Balance</p>
                <p className="mt-1 font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">
                  {formatNaira(availableBalance)}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]">
                  Amount (₦)
                </label>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter amount"
                  className="h-[52px] w-full rounded-xl border border-[#e6ebf3] bg-white px-4 font-[family-name:var(--font-nunito)] text-lg text-[#2d1810] placeholder:text-[#6b7280] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
                />
                {belowMinimum && (
                  <p className="font-[family-name:var(--font-nunito)] text-xs text-[#cd3030]">
                    Minimum balance of ₦1,000 must be maintained.
                  </p>
                )}
                {insufficientFunds && (
                  <p className="font-[family-name:var(--font-nunito)] text-xs text-[#cd3030]">
                    Insufficient balance. Available: {formatNaira(availableBalance)}
                  </p>
                )}
              </div>

              <div className="rounded-xl border border-[#e6ebf3] p-4">
                <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">Payout Account</p>
                <div className="mt-1 flex items-center gap-2">
                  <p className="font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#2d1810]">
                    {MOCK_BANK_ACCOUNT.bankName}
                  </p>
                  <span
                    className={`rounded-full px-2 py-0.5 font-[family-name:var(--font-urbanist)] text-[10px] font-semibold ${
                      MOCK_BANK_ACCOUNT.accountType === "Business"
                        ? "bg-[#ecfff8] text-[#009061]"
                        : "bg-[#fff6e6] text-[#cc8000]"
                    }`}
                  >
                    {MOCK_BANK_ACCOUNT.accountType}
                  </span>
                </div>
                <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
                  {MOCK_BANK_ACCOUNT.accountName} • ••••{MOCK_BANK_ACCOUNT.accountNumber.slice(-4)}
                </p>
                {MOCK_BANK_ACCOUNT.accountType === "Personal" && (
                  <p className="mt-2 rounded-lg bg-[#fff6e6] px-3 py-2 font-[family-name:var(--font-nunito)] text-xs text-[#cc8000]">
                    This is a personal account. Withdrawals to personal accounts require CEven support approval.
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]">
                  Note (Optional)
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Staff salary — Mrs. Sarah"
                  className="h-[52px] w-full rounded-xl border border-[#e6ebf3] bg-white px-4 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] placeholder:text-[#6b7280] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
                />
              </div>
            </div>

            <DialogFooter>
              <button
                onClick={handleClose}
                className="rounded-lg border border-[#3b2513] bg-white px-5 py-3 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#3b2513] hover:bg-[#f9fafb]"
              >
                Cancel
              </button>
              <button
                onClick={handleProceed}
                disabled={!canProceed}
                className="rounded-lg border border-[#d4a67f] bg-[#3b2513] px-5 py-3 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1] hover:bg-[#2d1810] disabled:cursor-not-allowed disabled:bg-[#e0bfa0]"
              >
                Continue
              </button>
            </DialogFooter>
          </>
        )}

        {step === "review" && (
          <>
            <DialogHeader>
              <DialogTitle>Review Withdrawal</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-4 px-6 py-6">
              <div className="rounded-xl bg-[#faf9f7] p-4 text-center">
                <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">Withdrawal Amount</p>
                <p className="mt-1 font-[family-name:var(--font-merriweather)] text-3xl font-bold text-[#2d1810]">
                  {formatNaira(amountNum)}
                </p>
              </div>

              <div className="flex flex-col gap-2 rounded-xl border border-[#e6ebf3] p-4">
                <div className="flex justify-between">
                  <span className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">Destination</span>
                  <span className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]">
                    {MOCK_BANK_ACCOUNT.bankName} ••••{MOCK_BANK_ACCOUNT.accountNumber.slice(-4)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">Account Name</span>
                  <span className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]">
                    {MOCK_BANK_ACCOUNT.accountName}
                  </span>
                </div>
                <div className="flex justify-between border-t border-[#eaecf0] pt-2">
                  <span className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">Remaining Balance</span>
                  <span className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]">
                    {formatNaira(availableBalance - amountNum)}
                  </span>
                </div>
                {note && (
                  <div className="flex justify-between border-t border-[#eaecf0] pt-2">
                    <span className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">Note</span>
                    <span className="font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{note}</span>
                  </div>
                )}
              </div>

              <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
                This withdrawal will be sent to the owner for approval. You&apos;ll be notified once it&apos;s reviewed.
              </p>
            </div>

            <DialogFooter>
              <button
                onClick={() => setStep("amount")}
                className="rounded-lg border border-[#3b2513] bg-white px-5 py-3 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#3b2513] hover:bg-[#f9fafb]"
              >
                Back
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading}
                className="rounded-lg border border-[#d4a67f] bg-[#3b2513] px-5 py-3 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1] hover:bg-[#2d1810] disabled:cursor-not-allowed disabled:bg-[#e0bfa0]"
              >
                {loading ? "Processing..." : "Confirm Withdrawal"}
              </button>
            </DialogFooter>
          </>
        )}

        {step === "success" && (
          <>
            <div className="flex flex-col items-center gap-3 px-6 py-10">
              <div className="flex size-16 items-center justify-center rounded-full bg-[#ecfff8]">
                <Check className="size-8 text-[#009061]" />
              </div>
              <h3 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
                Withdrawal Request Sent
              </h3>
              <p className="max-w-xs text-center font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
                Your withdrawal of {formatNaira(amountNum)} has been submitted and is pending owner approval.
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
