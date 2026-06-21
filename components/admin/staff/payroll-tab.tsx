"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

import { StatCard } from "@/components/admin/stat-card";
import { PAYROLL, type PayrollStatus } from "@/lib/mock-data/staff";

const STATUS_STYLES: Record<PayrollStatus, string> = {
  Paid: "bg-[#ecfff8] border border-[#009061] text-[#009061]",
  Pending: "bg-[#f3f4f6] border border-[#9ca3af] text-[#6b7280]",
  Processing: "bg-[#fff6e6] border border-[#cc8000] text-[#cc8000]",
};

function StatusBadge({ status }: { status: PayrollStatus }) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 font-[family-name:var(--font-urbanist)] text-xs ${STATUS_STYLES[status]}`}>
      {status}
    </span>
  );
}

function formatCurrency(value: number) {
  return `₦${value.toLocaleString("en-NG")}`;
}

function RunPayrollModal({ onClose }: { onClose: () => void }) {
  const totalNet = PAYROLL.reduce((sum, p) => sum + p.netPay, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="flex w-full max-w-[480px] flex-col rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-[#eaecf0] px-6 pt-6 pb-4">
          <div>
            <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
              Run Payroll
            </h2>
            <p className="mt-0.5 font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
              Review and confirm this month&apos;s payroll run.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded p-1 text-[#6b7280] hover:text-[#2d1810]"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="flex flex-col gap-4 px-6 py-5">
          <div className="flex items-center justify-between rounded-lg bg-[#faf9f7] px-4 py-3">
            <span className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
              Staff Included
            </span>
            <span className="font-[family-name:var(--font-nunito)] text-sm font-bold text-[#2d1810]">
              {PAYROLL.length}
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-[#faf9f7] px-4 py-3">
            <span className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
              Total Net Pay
            </span>
            <span className="font-[family-name:var(--font-merriweather)] text-base font-bold text-[#3b2513]">
              {formatCurrency(totalNet)}
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
              Pay Date
            </label>
            <input
              type="text"
              defaultValue="30 Oct 2025"
              className="rounded-lg border border-[#d0d5dd] px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 border-t border-[#eaecf0] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#d0d5dd] px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810] hover:bg-[#f9fafb]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-[#3b2513] px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#faf2e1]"
          >
            Confirm &amp; Run Payroll
          </button>
        </div>
      </div>
    </div>
  );
}

export function PayrollTab() {
  const [runOpen, setRunOpen] = useState(false);

  const totalNet = PAYROLL.reduce((sum, p) => sum + p.netPay, 0);
  const paidCount = PAYROLL.filter((p) => p.status === "Paid").length;
  const pendingCount = PAYROLL.filter((p) => p.status !== "Paid").length;

  return (
    <>
      <div className="space-y-4">
        {/* Stats row */}
        <div className="flex gap-3 overflow-x-auto pb-1 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
          <div className="min-w-[160px] flex-1">
            <StatCard label="Total Payroll (This Month)" value={formatCurrency(totalNet)} trendLabel="vs last month" />
          </div>
          <div className="min-w-[160px] flex-1">
            <StatCard label="Staff Paid" value={String(paidCount)} trendLabel="this cycle" />
          </div>
          <div className="min-w-[160px] flex-1">
            <StatCard label="Pending Payments" value={String(pendingCount)} trendLabel="awaiting processing" />
          </div>
          <div className="min-w-[160px] flex-1">
            <StatCard label="Next Pay Date" value="30 Oct" trendLabel="2025" />
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
            Payroll Records
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <button className="flex items-center gap-1.5 rounded-lg border border-[#d0d5dd] bg-white px-3 py-1.5 font-[family-name:var(--font-nunito)] text-xs">
              All Status
              <ChevronDown className="size-3" />
            </button>
            <button
              onClick={() => setRunOpen(true)}
              className="rounded-lg bg-[#3b2513] px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#faf2e1]"
            >
              Run Payroll
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#edd9c0]">
                  {["Staff", "Base Salary", "Bonuses", "Deductions", "Net Pay", "Pay Date", "Status"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-xs font-semibold font-[family-name:var(--font-nunito)] text-[#2d1810]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaecf0]">
                {PAYROLL.map((p) => (
                  <tr key={p.id} className="hover:bg-[#faf9f7]">
                    <td className="px-4 py-3">
                      <p className="text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">
                        {p.name}
                      </p>
                      <p className="text-[10px] text-[#858c98]">{p.role}</p>
                    </td>
                    <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">
                      {formatCurrency(p.baseSalary)}
                    </td>
                    <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#009061]">
                      +{formatCurrency(p.bonuses)}
                    </td>
                    <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#ef4444]">
                      -{formatCurrency(p.deductions)}
                    </td>
                    <td className="px-4 py-3 text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">
                      {formatCurrency(p.netPay)}
                    </td>
                    <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">
                      {p.payDate}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={p.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile card list */}
          <div className="flex flex-col gap-2 p-4 lg:hidden">
            {PAYROLL.map((p) => (
              <div key={p.id} className="rounded-xl border border-[#eaecf0] p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">
                      {p.name}
                    </p>
                    <p className="text-[10px] text-[#858c98]">{p.role}</p>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
                    Net Pay
                  </span>
                  <span className="font-[family-name:var(--font-merriweather)] text-sm font-bold text-[#3b2513]">
                    {formatCurrency(p.netPay)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {runOpen && <RunPayrollModal onClose={() => setRunOpen(false)} />}
    </>
  );
}
