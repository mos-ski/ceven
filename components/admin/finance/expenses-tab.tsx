"use client";

import { ChevronDown, MoreVertical, Search, TrendingUp } from "lucide-react";
import { useState } from "react";

import NewExpenseModal from "@/components/admin/finance/new-expense-modal";
import {
  BUDGET_VS_ACTUAL,
  EXPENSES,
  EXPENSE_BREAKDOWN,
  EXPENSE_OVERVIEW,
  REOCCURRING_BILLS,
  type DonutSegment,
  type ExpenseStatus,
} from "@/lib/mock-data/finance";

const STATUS_BADGE_CLASS: Record<ExpenseStatus, string> = {
  Paid: "border-[#009061] bg-[#ecfff8] text-[#009061]",
  Pending: "border-[#cc8000] bg-[#fff6e6] text-[#cc8000]",
  Overdue: "border-[#ef4444] bg-[#fff5f5] text-[#ef4444]",
};

function FilterButton({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-1.5 rounded-lg border border-[#e6ebf3] bg-white px-3 py-2 font-[family-name:var(--font-urbanist)] text-sm text-[#6b7280] hover:border-[#3b2513] hover:text-[#3b2513]">
      {label}
      <ChevronDown className="h-4 w-4" />
    </button>
  );
}

function Donut({ segments, centerLabel }: { segments: DonutSegment[]; centerLabel: string }) {
  const stops = segments
    .map((s, i) => {
      const start = segments.slice(0, i).reduce((sum, x) => sum + x.pct, 0);
      return `${s.color} ${start}% ${start + s.pct}%`;
    })
    .join(", ");

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full"
        style={{ background: `conic-gradient(${stops})` }}
      >
        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white">
          <span className="font-[family-name:var(--font-merriweather)] text-sm font-bold text-[#2d1810]">
            {centerLabel}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="font-[family-name:var(--font-nunito)] text-[11px] text-[#6b7280]">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BudgetVsActualChart() {
  const max = Math.max(...BUDGET_VS_ACTUAL.flatMap((r) => [r.budget, r.actual]));
  return (
    <div className="flex flex-col gap-3">
      {BUDGET_VS_ACTUAL.map((row) => (
        <div key={row.category} className="flex items-center gap-3">
          <span className="w-20 shrink-0 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
            {row.category}
          </span>
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="h-2.5 flex-1 rounded-full bg-[#f3f4f6]">
                <div
                  className="h-2.5 rounded-full bg-[#bab68d]"
                  style={{ width: `${(row.budget / max) * 100}%` }}
                />
              </div>
              <span className="w-12 text-right font-[family-name:var(--font-nunito)] text-[10px] text-[#9ca3af]">
                {row.budget.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2.5 flex-1 rounded-full bg-[#f3f4f6]">
                <div
                  className="h-2.5 rounded-full bg-[#e2622a]"
                  style={{ width: `${(row.actual / max) * 100}%` }}
                />
              </div>
              <span className="w-12 text-right font-[family-name:var(--font-nunito)] text-[10px] text-[#9ca3af]">
                {row.actual.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      ))}
      <div className="mt-1 flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[#bab68d]" />
          <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">Budget</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[#e2622a]" />
          <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">Actual Expenses</span>
        </div>
      </div>
    </div>
  );
}

export function ExpensesTab() {
  const [expenseOpen, setExpenseOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      {/* Header action */}
      <div className="flex justify-end">
        <button
          onClick={() => setExpenseOpen(true)}
          className="rounded-lg bg-[#3b2513] px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#faf2e1]"
        >
          New Expense
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {EXPENSE_OVERVIEW.map((s) => (
          <div key={s.label} className="rounded-xl border border-[#e6ebf3] bg-white p-4">
            <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{s.label}</p>
            <p className="mt-2 font-[family-name:var(--font-merriweather)] text-xl font-bold text-[#2d1810]">{s.value}</p>
            <p
              className={`mt-1 flex items-center gap-1 font-[family-name:var(--font-urbanist)] text-xs ${
                s.trend === "up" ? "text-[#009061]" : "text-[#6b7280]"
              }`}
            >
              {s.trend === "up" && <TrendingUp className="size-3" />}
              {s.helper}
            </p>
          </div>
        ))}
      </div>

      {/* Reoccurring Bills + Budget vs Actual + Expense Breakdown */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-[family-name:var(--font-merriweather)] text-base font-bold text-[#2d1810]">
            Reoccurring Bills
          </h2>
          <div className="flex flex-col gap-3">
            {REOCCURRING_BILLS.map((bill) => (
              <div key={bill.id} className="flex items-center justify-between">
                <div>
                  <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">{bill.name}</p>
                  <p className="font-[family-name:var(--font-urbanist)] text-xs text-[#9ca3af]">{bill.dueNote}</p>
                </div>
                <span className="font-[family-name:var(--font-merriweather)] text-sm font-bold text-[#2d1810]">{bill.amount}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-[family-name:var(--font-merriweather)] text-base font-bold text-[#2d1810]">
            April Budget vs Actual Expense
          </h2>
          <BudgetVsActualChart />
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-[family-name:var(--font-merriweather)] text-base font-bold text-[#2d1810]">
            Expense Breakdown
          </h2>
          <Donut segments={EXPENSE_BREAKDOWN} centerLabel="100" />
        </div>
      </div>

      {/* Expense Log */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="flex flex-wrap items-center gap-2 px-4 py-4">
          <h3 className="font-[family-name:var(--font-merriweather)] font-bold text-[#2d1810]">Expense Log</h3>
          <div className="ml-auto flex items-center gap-3">
            <FilterButton label="All Categories" />
            <FilterButton label="All Status" />
            <FilterButton label="Date" />
            <div className="flex items-center gap-2 rounded-lg border border-[#e6ebf3] bg-[#f5edd8] px-3 py-2">
              <Search className="h-4 w-4 text-[#9ca3af]" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] placeholder:text-[#9ca3af] focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#edd9c0]">
                {["Date", "Vendor", "Category", "Description", "Amount", "Receipt", "Status", "Action"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {EXPENSES.map((row) => (
                <tr key={row.id} className="border-t border-[#eaecf0]">
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{row.date}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{row.vendor}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{row.category}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{row.description}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]">{row.amount}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
                    {row.receipt ? "● Attached" : "--"}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-[family-name:var(--font-urbanist)] text-xs ${STATUS_BADGE_CLASS[row.status]}`}>
                      {row.status === "Paid" ? "Approved" : row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-[#6b7280] hover:text-[#2d1810]">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile card list */}
        <div className="flex flex-col gap-2 px-4 pb-4 lg:hidden">
          {EXPENSES.map((row) => (
            <div key={row.id} className="rounded-xl border border-[#eaecf0] p-3">
              <div className="flex items-center justify-between">
                <span className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]">{row.vendor}</span>
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-[family-name:var(--font-urbanist)] text-xs ${STATUS_BADGE_CLASS[row.status]}`}>
                  {row.status === "Paid" ? "Approved" : row.status}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]">{row.amount}</span>
                <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{row.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <NewExpenseModal open={expenseOpen} onOpenChange={setExpenseOpen} />
    </div>
  );
}
