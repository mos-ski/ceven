"use client";

import { ArrowDownLeft, Copy, CheckCircle2, Clock, Info } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const PAYSTACK_ACCOUNT = {
  bankName: "Wema Bank",
  accountNumber: "8012345678",
  accountName: "Swayosoo/Sway Creche",
};

const DEPOSIT_FEE = 50;
const MINIMUM_DEPOSIT = 100;

export default function DepositInfoModal({ open, onOpenChange }: Props) {
  const [copied, setCopied] = useState(false);
  const [amount, setAmount] = useState("");

  const amountNum = parseInt(amount.replace(/\D/g, ""), 10) || 0;
  const fee = amountNum > 0 ? DEPOSIT_FEE : 0;
  const youReceive = Math.max(0, amountNum - fee);
  const belowMinimum = amountNum > 0 && amountNum < MINIMUM_DEPOSIT;

  function handleCopy() {
    navigator.clipboard.writeText(PAYSTACK_ACCOUNT.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[440px]" showCloseButton>
        <DialogHeader>
          <DialogTitle>Deposit Funds</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 px-6 py-6">
          <div className="flex items-center gap-3 rounded-xl bg-[#ecfff8] p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#009061]">
              <ArrowDownLeft className="size-5 text-white" />
            </div>
            <div>
              <p className="font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#2d1810]">
                Pay into this account
              </p>
              <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
                Transfer to the account below and it will reflect in your wallet automatically.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-[#e6ebf3] bg-[#faf9f7] p-4">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <span className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">Bank</span>
                <span className="font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#2d1810]">
                  {PAYSTACK_ACCOUNT.bankName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">Account Name</span>
                <span className="font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#2d1810]">
                  {PAYSTACK_ACCOUNT.accountName}
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-[#eaecf0] pt-3">
                <span className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">Account Number</span>
                <div className="flex items-center gap-2">
                  <span className="font-[family-name:var(--font-merriweather)] text-lg font-bold tracking-wide text-[#2d1810]">
                    {PAYSTACK_ACCOUNT.accountNumber}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="flex size-8 items-center justify-center rounded-lg border border-[#e6ebf3] bg-white hover:bg-[#f5edd8] transition-colors"
                    title="Copy account number"
                  >
                    {copied ? (
                      <CheckCircle2 className="size-4 text-[#009061]" />
                    ) : (
                      <Copy className="size-4 text-[#6b7280]" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Live fee calculator */}
          <div className="flex flex-col gap-1">
            <label className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]">
              How much are you depositing? (Optional)
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
                Minimum deposit is ₦{MINIMUM_DEPOSIT}.
              </p>
            )}
          </div>

          {amountNum > 0 && (
            <div className="rounded-xl border border-[#e6ebf3] bg-[#faf9f7] p-4">
              <div className="flex justify-between mb-2">
                <span className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">Deposit fee</span>
                <span className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]">₦{DEPOSIT_FEE}</span>
              </div>
              <div className="flex justify-between border-t border-[#eaecf0] pt-2">
                <span className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">You will receive</span>
                <span className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#009061]">₦{youReceive}</span>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#009061]" />
              <p className="font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                Deposits are credited automatically via Paystack
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-[#009061]" />
              <p className="font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                Deposits reflect <strong>instantly</strong> in your wallet
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 size-4 shrink-0 text-[#cc8000]" />
              <p className="font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                A flat ₦{DEPOSIT_FEE} fee applies per deposit (min ₦{MINIMUM_DEPOSIT})
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end border-t border-[#eaecf0] px-6 py-4">
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-lg border border-[#3b2513] bg-white px-5 py-3 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#3b2513] hover:bg-[#f9fafb]"
          >
            Done
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
