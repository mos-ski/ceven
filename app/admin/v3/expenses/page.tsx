"use client";

import { useState } from "react";
import { Wallet, Receipt, PiggyBank, Clock3, Paperclip } from "lucide-react";

import NewExpenseModal from "@/components/admin/finance/new-expense-modal";
import {
  BUDGET_VS_ACTUAL,
  EXPENSES,
  EXPENSE_OVERVIEW,
  type ExpenseStatus,
} from "@/lib/mock-data/finance";

const STAT_ICONS = [Wallet, Receipt, PiggyBank, Clock3];

const STATUS_STYLES: Record<ExpenseStatus, { bg: string; text: string }> = {
  Paid: { bg: "#E9F6EE", text: "#2A8A52" },
  Pending: { bg: "#FDF3E4", text: "#C47B2C" },
  Overdue: { bg: "#FDECEA", text: "#D4522F" },
};

function StatCard({
  Icon,
  label,
  value,
  sub,
}: {
  Icon: typeof Wallet;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#F5EDD8]/30 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-[#2D1810]/50">{label}</p>
      <p className="mt-1.5 font-[family-name:var(--font-merriweather)] text-[1.85rem] font-bold leading-none text-[#2D1810]">
        {value}
      </p>
      <p className="mt-1.5 text-[11px] text-[#2D1810]/60">{sub}</p>
      <Icon className="pointer-events-none absolute right-3 top-3 h-6 w-6 text-[#2D1810]/10" />
    </div>
  );
}

export default function ExpensesV3Page() {
  const [expenseOpen, setExpenseOpen] = useState(false);
  const maxSpend = Math.max(...BUDGET_VS_ACTUAL.flatMap((r) => [r.budget, r.actual]));

  return (
    <div className="flex flex-col gap-5">
      {/* Page header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2D1810]">Expenses</h1>
          <p className="mt-1 text-sm text-[#2D1810]/50">
            Monitor spend against budget and keep the expense log audit-ready.
          </p>
        </div>
        <button
          onClick={() => setExpenseOpen(true)}
          className="rounded-lg bg-[#C47B2C] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          + New Expense
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {EXPENSE_OVERVIEW.map((stat, i) => (
          <StatCard key={stat.label} Icon={STAT_ICONS[i]} label={stat.label} value={stat.value} sub={stat.helper} />
        ))}
      </div>

      {/* Budget vs Actual */}
      <div className="rounded-2xl bg-[#F5EDD8]/30 p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-bold text-[#2D1810]">Budget vs Actual by Category</p>
          <div className="flex items-center gap-3 text-[11px] text-[#2D1810]/60">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#8B9E7A]" /> Budget
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#C47B2C]" /> Actual
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {BUDGET_VS_ACTUAL.map((row) => (
            <div key={row.category} className="flex items-center gap-3">
              <p className="w-20 shrink-0 text-[13px] font-semibold text-[#2D1810]">{row.category}</p>
              <div className="flex flex-1 flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <div className="h-2 flex-1 rounded-full bg-black/[0.06]">
                    <div className="h-full rounded-full bg-[#8B9E7A]" style={{ width: `${(row.budget / maxSpend) * 100}%` }} />
                  </div>
                  <span className="w-14 shrink-0 text-right font-mono text-[11px] text-[#2D1810]/50">
                    ₦{row.budget.toFixed(1)}k
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 flex-1 rounded-full bg-black/[0.06]">
                    <div className="h-full rounded-full bg-[#C47B2C]" style={{ width: `${(row.actual / maxSpend) * 100}%` }} />
                  </div>
                  <span className="w-14 shrink-0 text-right font-mono text-[11px] text-[#2D1810]/50">
                    ₦{row.actual.toFixed(1)}k
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expense Log */}
      <div className="rounded-2xl bg-[#F5EDD8]/30 p-5">
        <p className="mb-3 text-sm font-bold text-[#2D1810]">Expense Log</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-[#2D1810]/50">
                <th className="pb-2 pr-3 font-semibold">Date</th>
                <th className="pb-2 pr-3 font-semibold">Vendor</th>
                <th className="pb-2 pr-3 font-semibold">Category</th>
                <th className="pb-2 pr-3 font-semibold">Description</th>
                <th className="pb-2 pr-3 font-semibold">Amount</th>
                <th className="pb-2 pr-3 font-semibold">Receipt</th>
                <th className="pb-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {EXPENSES.map((row) => {
                const status = STATUS_STYLES[row.status];
                return (
                  <tr key={row.id} className={Number(row.id) % 2 === 0 ? "bg-white/60" : "bg-transparent"}>
                    <td className="py-2.5 pr-3 text-[#2D1810]/70">{row.date}</td>
                    <td className="py-2.5 pr-3 font-semibold text-[#2D1810]">{row.vendor}</td>
                    <td className="py-2.5 pr-3 text-[#2D1810]/70">{row.category}</td>
                    <td className="py-2.5 pr-3 text-[#2D1810]/70">{row.description}</td>
                    <td className="py-2.5 pr-3 font-mono text-[#2D1810]">{row.amount}</td>
                    <td className="py-2.5 pr-3">
                      {row.receipt ? (
                        <span className="inline-flex items-center gap-1 text-xs text-[#2A8A52]">
                          <Paperclip className="h-3 w-3" /> Attached
                        </span>
                      ) : (
                        <span className="text-xs text-[#2D1810]/40">–</span>
                      )}
                    </td>
                    <td className="py-2.5">
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                        style={{ backgroundColor: status.bg, color: status.text }}
                      >
                        {row.status === "Paid" ? "Approved" : row.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <NewExpenseModal open={expenseOpen} onOpenChange={setExpenseOpen} />
    </div>
  );
}
