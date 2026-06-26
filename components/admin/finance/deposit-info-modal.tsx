"use client";

import { ArrowDownLeft, CheckCircle2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function DepositInfoModal({ open, onOpenChange }: Props) {
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[440px]" showCloseButton>
        <DialogHeader>
          <DialogTitle>How Deposits Work</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 px-6 py-6">
          <div className="flex items-center gap-3 rounded-xl bg-[#ecfff8] p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#009061]">
              <ArrowDownLeft className="size-5 text-white" />
            </div>
            <div>
              <p className="font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#2d1810]">
                Deposits are automatic
              </p>
              <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
                When a parent pays an invoice via Paystack, funds are credited to your wallet automatically.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#009061]" />
              <p className="font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                Parent pays invoice through the parent app or Paystack link
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#009061]" />
              <p className="font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                Payment is processed by Paystack (settled in T+1)
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#009061]" />
              <p className="font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                Wallet is credited with the invoice amount minus Paystack fee
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#009061]" />
              <p className="font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                Transaction appears in your wallet history
              </p>
            </div>
          </div>

          <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
            To receive payments, create an invoice in Billing &amp; Payments and share the payment link with parents.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-[#eaecf0] px-6 py-4">
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-lg border border-[#3b2513] bg-white px-5 py-3 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#3b2513] hover:bg-[#f9fafb]"
          >
            Close
          </button>
          <button
            onClick={() => {
              onOpenChange(false);
              router.push("/finance?tab=billing-payments");
            }}
            className="rounded-lg border border-[#d4a67f] bg-[#3b2513] px-5 py-3 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1] hover:bg-[#2d1810]"
          >
            Go to Billing
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
