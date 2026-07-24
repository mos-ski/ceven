"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import { mockFees, type FeeInvoice } from "@/lib/parent/mock-data";
import { PaymentFlowModal } from "@/components/me/payment-flow-modal";

const STATUS_STYLES: Record<FeeInvoice["status"], string> = {
  paid: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  overdue: "bg-red-100 text-red-700",
};

export default function CrechFeesPage() {
  const [payingFee, setPayingFee] = useState<FeeInvoice | null>(null);
  const [paidIds, setPaidIds] = useState<string[]>([]);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-1 text-2xl font-bold text-gray-800">Creche Fees</h1>
      <p className="mb-6 text-sm text-gray-500">Tuition and term invoices for your children.</p>

      <div className="flex flex-col gap-3">
        {mockFees.map((fee) => {
          const isPaid = fee.status === "paid" || paidIds.includes(fee.id);
          return (
            <div key={fee.id} className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cg-quick-action">
                  <FileText size={18} className="text-cg-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{fee.term}</p>
                  <p className="text-xs text-gray-400">Due {fee.dueDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-800">{fee.amount}</span>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize ${STATUS_STYLES[isPaid ? "paid" : fee.status]}`}>
                  {isPaid ? "paid" : fee.status}
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
          title="Pay School Fee"
          amount={payingFee.amount}
          description={payingFee.term}
          onClose={() => setPayingFee(null)}
          onSuccess={() => setPaidIds((prev) => [...prev, payingFee.id])}
        />
      )}
    </div>
  );
}
