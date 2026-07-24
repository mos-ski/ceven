"use client";

import { useState } from "react";
import { UserRound } from "lucide-react";
import { MOCK_ACCEPTANCE_FEES, type AcceptanceFee } from "@/lib/me/mock-data";
import { PaymentFlowModal } from "@/components/me/payment-flow-modal";

export default function AcceptanceFeesPage() {
  const [payingFee, setPayingFee] = useState<AcceptanceFee | null>(null);
  const [paidIds, setPaidIds] = useState<string[]>([]);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-1 text-2xl font-bold text-gray-800">Acceptance Fees</h1>
      <p className="mb-6 text-sm text-gray-500">One-time enrollment fees per child.</p>

      <div className="flex flex-col gap-3">
        {MOCK_ACCEPTANCE_FEES.map((fee) => {
          const isPaid = fee.status === "paid" || paidIds.includes(fee.id);
          return (
            <div key={fee.id} className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cg-quick-action">
                  <UserRound size={18} className="text-cg-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{fee.childName}</p>
                  <p className="text-xs text-gray-400">Due {fee.dueDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-800">₦{fee.amount.toLocaleString()}</span>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize ${
                  isPaid ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                }`}>
                  {isPaid ? "paid" : "pending"}
                </span>
                {!isPaid && (
                  <button
                    onClick={() => setPayingFee(fee)}
                    className="rounded-lg bg-cg-brand px-3 py-1.5 text-xs font-semibold text-white"
                  >
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {payingFee && (
        <PaymentFlowModal
          title="Pay Acceptance Fee"
          amount={`₦${payingFee.amount.toLocaleString()}`}
          description={`${payingFee.childName} — Acceptance Fee`}
          onClose={() => setPayingFee(null)}
          onSuccess={() => setPaidIds((prev) => [...prev, payingFee.id])}
        />
      )}
    </div>
  );
}
