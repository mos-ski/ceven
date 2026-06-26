"use client";

import { ArrowDownLeft, Copy, CheckCircle2, ExternalLink } from "lucide-react";
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

export default function DepositInfoModal({ open, onOpenChange }: Props) {
  const [copied, setCopied] = useState(false);

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

          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#009061]" />
              <p className="font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                Deposits are credited automatically via Paystack
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#009061]" />
              <p className="font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                Settlement takes T+1 (typically next business day)
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#009061]" />
              <p className="font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                Transaction fee is auto-deducted per deposit
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
