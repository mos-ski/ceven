"use client";

import { useState } from "react";
import { Wallet, Receipt, PiggyBank, Clock3, Paperclip, Download } from "lucide-react";

import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import NewExpenseModal from "@/components/admin/finance/new-expense-modal";
import { exportRowsToCsv } from "@/lib/super-admin/export-csv";
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
    <Card padding="compact" className="relative overflow-hidden">
      <p className="text-xs font-bold uppercase tracking-wide text-[#2D1810]/50">{label}</p>
      <p className="mt-1.5 font-[family-name:var(--font-merriweather)] text-[1.85rem] font-bold leading-none text-[#2D1810]">
        {value}
      </p>
      <p className="mt-1.5 text-[11px] text-[#2D1810]/60">{sub}</p>
      <Icon className="pointer-events-none absolute right-3 top-3 h-6 w-6 text-[#2D1810]/10" />
    </Card>
  );
}

export default function ExpensesV3Page() {
  const [expenseOpen, setExpenseOpen] = useState(false);
  const maxSpend = Math.max(...BUDGET_VS_ACTUAL.flatMap((r) => [r.budget, r.actual]));

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
          title="Expenses"
          description="Monitor spend against budget and keep the expense log audit-ready."
          action={
            <>
              <Button
                variant="outline"
                onClick={() =>
                  exportRowsToCsv(
                    "expenses.csv",
                    ["Date", "Vendor", "Category", "Description", "Amount", "Status"],
                    EXPENSES.map((e) => [e.date, e.vendor, e.category, e.description, e.amount, e.status]),
                  )
                }
                className="h-9 gap-2 rounded-lg border-[#d0d5dd] px-4 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]"
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
              <button
                onClick={() => setExpenseOpen(true)}
                className="rounded-lg bg-[#C47B2C] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                + New Expense
              </button>
            </>
          }
        />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {EXPENSE_OVERVIEW.map((stat, i) => (
          <StatCard key={stat.label} Icon={STAT_ICONS[i]} label={stat.label} value={stat.value} sub={stat.helper} />
        ))}
      </div>

      {/* Budget vs Actual */}
      <Card>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-bold text-[#2D1810]">Budget vs Actual — by Category</p>
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
      </Card>

      {/* Expense Log */}
      <Card padding="none">
        <p className="p-5 pb-3 text-sm font-bold text-[#2D1810]">Expense Log</p>
        <Table className="pb-5">
          <TableHeader>
            <TableRow className="border-b border-black/[0.08]">
              <TableHead className="pb-2 pr-3">Date</TableHead>
              <TableHead className="pb-2 pr-3">Vendor</TableHead>
              <TableHead className="pb-2 pr-3">Category</TableHead>
              <TableHead className="pb-2 pr-3">Description</TableHead>
              <TableHead className="pb-2 pr-3">Amount</TableHead>
              <TableHead className="pb-2 pr-3">Receipt</TableHead>
              <TableHead className="pb-2">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {EXPENSES.map((row) => {
              const status = STATUS_STYLES[row.status];
              return (
                <TableRow key={row.id} className="border-b border-black/[0.05] last:border-0">
                  <TableCell className="py-2.5 pr-3 text-[#2D1810]/70">{row.date}</TableCell>
                  <TableCell className="py-2.5 pr-3 font-semibold text-[#2D1810]">{row.vendor}</TableCell>
                  <TableCell className="py-2.5 pr-3 text-[#2D1810]/70">{row.category}</TableCell>
                  <TableCell className="py-2.5 pr-3 text-[#2D1810]/70">{row.description}</TableCell>
                  <TableCell className="py-2.5 pr-3 font-mono text-[#2D1810]">{row.amount}</TableCell>
                  <TableCell className="py-2.5 pr-3">
                    {row.receipt ? (
                      <span className="inline-flex items-center gap-1 text-xs text-[#2A8A52]">
                        <Paperclip className="h-3 w-3" /> Attached
                      </span>
                    ) : (
                      <span className="text-xs text-[#2D1810]/40">—</span>
                    )}
                  </TableCell>
                  <TableCell className="py-2.5">
                    <span
                      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                      style={{ backgroundColor: status.bg, color: status.text }}
                    >
                      {row.status === "Paid" ? "Approved" : row.status}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      <NewExpenseModal open={expenseOpen} onOpenChange={setExpenseOpen} />
    </div>
  );
}
