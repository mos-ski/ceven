"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, CreditCard } from "lucide-react";
import { mockFees } from "@/lib/caregiver/mock-data";
import { BottomNav } from "@/components/caregiver/bottom-nav";
import { LogSheet } from "@/components/caregiver/log-sheet";

const STATUS_STYLES = {
  paid: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-600",
  overdue: "bg-red-100 text-red-600",
};

export default function FeesPage() {
  const router = useRouter();

  return (
    <div className="relative flex flex-1 flex-col bg-cg-bg">
      <div className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-base font-bold text-cg-brand">Fees &amp; Invoices</h1>
      </div>

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
        {/* Summary card */}
        <div className="rounded-2xl bg-cg-brand p-4 text-white">
          <p className="text-xs opacity-70">Outstanding Balance</p>
          <p className="mt-1 text-2xl font-bold">₦90,000</p>
          <p className="mt-1 text-xs opacity-60">2 invoices pending or overdue</p>
        </div>

        {/* Invoice list */}
        {mockFees.map((fee) => (
          <div key={fee.id} className="rounded-2xl bg-white p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cg-quick-action">
                  <CreditCard size={18} className="text-cg-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-cg-brand">{fee.term}</p>
                  <p className="text-xs text-gray-400">{fee.child}</p>
                </div>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize ${STATUS_STYLES[fee.status]}`}
              >
                {fee.status}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-gray-50 pt-3">
              <div>
                <p className="text-[10px] text-gray-400">Amount</p>
                <p className="text-sm font-bold text-cg-brand">{fee.amount}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-400">Due Date</p>
                <p className="text-xs font-semibold text-gray-600">{fee.dueDate}</p>
              </div>
              {fee.status !== "paid" && (
                <button className="rounded-xl bg-cg-accent-muted px-4 py-2 text-xs font-semibold text-cg-brand">
                  Pay Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <LogSheet />
      <BottomNav />
    </div>
  );
}
