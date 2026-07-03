"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, Clock, AlertCircle, Download } from "lucide-react";
import { mockFees } from "@/lib/parent/mock-data";

const STATUS_CONFIG = {
  paid:    { icon: CheckCircle2, color: "text-green-500",  bg: "bg-green-50",  label: "Paid" },
  pending: { icon: Clock,        color: "text-amber-500",  bg: "bg-amber-50",  label: "Pending" },
  overdue: { icon: AlertCircle,  color: "text-red-500",    bg: "bg-red-50",    label: "Overdue" },
};

export default function BillingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="relative overflow-hidden bg-[#5B391E] px-6 pt-14 pb-6">
        <div className="pointer-events-none absolute top-0 right-0 h-[220px] w-[220px] rounded-full bg-[#D4A67F] opacity-20" />
        <button onClick={() => router.back()} className="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
          <ArrowLeft size={16} className="text-white" />
        </button>
        <h1 className="text-xl font-bold text-white">Billing History</h1>
        <p className="mt-1 text-sm text-white/70">Track your past and upcoming payments.</p>
      </div>

      <div className="flex-1 overflow-y-auto bg-white px-6 py-5">
        {/* Summary card */}
        <div className="mb-5 rounded-2xl bg-[#52330A] p-4">
          <p className="text-xs text-white/60">Total paid this year</p>
          <p className="text-2xl font-bold text-amber-400">₦90,000</p>
          <p className="mt-1 text-xs text-white/60">2 invoices paid · 1 pending</p>
        </div>

        {/* Invoice list */}
        <div className="flex flex-col gap-3">
          {mockFees.map((fee) => {
            const cfg = STATUS_CONFIG[fee.status];
            const Icon = cfg.icon;
            return (
              <div key={fee.id} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{fee.term}</p>
                    <p className="mt-0.5 text-xs text-gray-400">Due: {fee.dueDate}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <p className="text-base font-bold text-gray-800">{fee.amount}</p>
                    <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${cfg.bg} ${cfg.color}`}>
                      <Icon size={10} />
                      {cfg.label}
                    </span>
                  </div>
                </div>
                {fee.status === "paid" && (
                  <button className="mt-3 flex items-center gap-1.5 text-xs font-medium text-cg-brand">
                    <Download size={12} />
                    Download Receipt
                  </button>
                )}
                {fee.status === "pending" && (
                  <button className="mt-3 w-full rounded-xl bg-cg-brand py-2.5 text-xs font-semibold text-[#FAF2E1]">
                    Pay Now
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
