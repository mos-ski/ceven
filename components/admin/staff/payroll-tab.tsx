"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

import { StatCard } from "@/components/admin/stat-card";
import {
  PAYROLL,
  PAYROLL_HISTORY,
  SALARY_SETUPS,
  type PayrollStatus,
  type SalarySetup,
} from "@/lib/mock-data/staff";

const STATUS_STYLES: Record<PayrollStatus, string> = {
  Paid: "bg-[#ecfff8] border border-[#009061] text-[#009061]",
  Pending: "bg-[#f3f4f6] border border-[#9ca3af] text-[#6b7280]",
  Processing: "bg-[#fff6e6] border border-[#cc8000] text-[#cc8000]",
};

type PayrollSubTab = "This Month" | "Payroll History" | "Salary Setup";
const SUB_TABS: PayrollSubTab[] = ["This Month", "Payroll History", "Salary Setup"];

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

function NewSalarySetupModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="flex w-full max-w-[480px] flex-col rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-[#eaecf0] px-6 pt-6 pb-4">
          <div>
            <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
              New Salary Setup
            </h2>
            <p className="mt-0.5 font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
              Set up payment details for a staff member.
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
          <div className="flex flex-col gap-1.5">
            <label className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
              Staff Member
            </label>
            <select className="rounded-lg border border-[#d0d5dd] bg-white px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]">
              {SALARY_SETUPS.map((s) => (
                <option key={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
                Employment Type
              </label>
              <select className="rounded-lg border border-[#d0d5dd] bg-white px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]">
                <option>Full time</option>
                <option>Contract</option>
                <option>Part time</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
                Basic Salary
              </label>
              <input
                type="number"
                placeholder="0"
                className="rounded-lg border border-[#d0d5dd] px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
              Bank Name
            </label>
            <input
              type="text"
              placeholder="e.g. GT Bank"
              className="rounded-lg border border-[#d0d5dd] px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
                Account Number
              </label>
              <input
                type="text"
                placeholder="0123456789"
                className="rounded-lg border border-[#d0d5dd] px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
                Pension PIN
              </label>
              <input
                type="text"
                placeholder="PEN..."
                className="rounded-lg border border-[#d0d5dd] px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
              Tax ID
            </label>
            <input
              type="text"
              placeholder="TIN..."
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
            Save Setup
          </button>
        </div>
      </div>
    </div>
  );
}

function PayrollHistoryTable() {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4">
        <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
          Payroll History
        </h2>
        <button className="flex items-center gap-1.5 rounded-lg border border-[#d0d5dd] bg-white px-3 py-1.5 font-[family-name:var(--font-nunito)] text-xs">
          Month
          <ChevronDown className="size-3" />
        </button>
      </div>
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#edd9c0]">
              {["Month", "Staffs", "Gross Payroll", "Deduction", "Net Paid", "Run by", "Date Paid", "Status", "Action"].map((h) => (
                <th key={h} className="px-4 py-3 text-xs font-semibold font-[family-name:var(--font-nunito)] text-[#2d1810]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eaecf0]">
            {PAYROLL_HISTORY.map((h) => (
              <tr key={h.id} className="hover:bg-[#faf9f7]">
                <td className="px-4 py-3 text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">{h.month}</td>
                <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{h.staffCount} staffs</td>
                <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{formatCurrency(h.grossPayroll)}</td>
                <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{formatCurrency(h.deductions)}</td>
                <td className="px-4 py-3 text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">{formatCurrency(h.netPaid)}</td>
                <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{h.runBy}</td>
                <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{h.datePaid}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-[#ecfff8] border border-[#009061] px-2.5 py-0.5 font-[family-name:var(--font-urbanist)] text-xs text-[#009061]">
                    Paid
                  </span>
                </td>
                <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#3b2513] underline">View Details</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile card list */}
      <div className="flex flex-col gap-2 p-4 lg:hidden">
        {PAYROLL_HISTORY.map((h) => (
          <div key={h.id} className="rounded-xl border border-[#eaecf0] p-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">{h.month}</p>
              <span className="rounded-full bg-[#ecfff8] border border-[#009061] px-2.5 py-0.5 font-[family-name:var(--font-urbanist)] text-xs text-[#009061]">
                Paid
              </span>
            </div>
            <p className="mt-1 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
              {h.staffCount} staffs • {formatCurrency(h.netPaid)} net
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SalarySetupRow({ setup }: { setup: SalarySetup }) {
  return (
    <tr className="hover:bg-[#faf9f7]">
      <td className="px-4 py-3 text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">{setup.name}</td>
      <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{setup.role}</td>
      <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{setup.employment}</td>
      <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{formatCurrency(setup.basicSalary)}</td>
      <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{setup.bankName}</td>
      <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{setup.accountNumber}</td>
      <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{setup.pensionPin}</td>
      <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{setup.taxId}</td>
      <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#3b2513] underline">Edit</td>
    </tr>
  );
}

function SalarySetupTable() {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4">
        <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
          Salary Setup
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-[#d0d5dd] bg-white px-3 py-1.5 font-[family-name:var(--font-nunito)] text-xs">
            Date Added
            <ChevronDown className="size-3" />
          </button>
          <button className="flex items-center gap-1.5 rounded-lg border border-[#d0d5dd] bg-white px-3 py-1.5 font-[family-name:var(--font-nunito)] text-xs">
            All Role
            <ChevronDown className="size-3" />
          </button>
        </div>
      </div>
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#edd9c0]">
              {["Staff", "Role", "Employment", "Basic Salary", "Bank Name", "Account Number", "Pension Pin", "Tax ID", "Action"].map((h) => (
                <th key={h} className="px-4 py-3 text-xs font-semibold font-[family-name:var(--font-nunito)] text-[#2d1810]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eaecf0]">
            {SALARY_SETUPS.map((setup) => (
              <SalarySetupRow key={setup.id} setup={setup} />
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile card list */}
      <div className="flex flex-col gap-2 p-4 lg:hidden">
        {SALARY_SETUPS.map((setup) => (
          <div key={setup.id} className="rounded-xl border border-[#eaecf0] p-3">
            <p className="text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">{setup.name}</p>
            <p className="mt-1 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
              {setup.role} • {setup.employment} • {formatCurrency(setup.basicSalary)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ThisMonthTable({ onRunPayroll }: { onRunPayroll: () => void }) {
  return (
    <>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
          Payroll Log (This Month)
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-[#d0d5dd] bg-white px-3 py-1.5 font-[family-name:var(--font-nunito)] text-xs">
            All Role
            <ChevronDown className="size-3" />
          </button>
          <button
            onClick={onRunPayroll}
            className="rounded-lg bg-[#3b2513] px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#faf2e1]"
          >
            Approve &amp; Run Payroll
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
    </>
  );
}

export function PayrollTab() {
  const [subTab, setSubTab] = useState<PayrollSubTab>("This Month");
  const [runOpen, setRunOpen] = useState(false);
  const [setupOpen, setSetupOpen] = useState(false);

  const totalNet = PAYROLL.reduce((sum, p) => sum + p.netPay, 0);
  const paidCount = PAYROLL.filter((p) => p.status === "Paid").length;
  const pendingCount = PAYROLL.filter((p) => p.status !== "Paid").length;

  return (
    <>
      <div className="space-y-4">
        {/* Header actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setSetupOpen(true)}
            className="rounded-lg border border-[#3b2513] px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#3b2513]"
          >
            New Salary Setup
          </button>
          <button
            onClick={() => setRunOpen(true)}
            className="rounded-lg bg-[#3b2513] px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#faf2e1]"
          >
            New Payroll
          </button>
        </div>

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

        {/* Sub-tab nav */}
        <div className="flex overflow-x-auto border-b border-[#e6ebf3]">
          {SUB_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setSubTab(tab)}
              className={`whitespace-nowrap px-4 py-2 text-sm font-medium font-[family-name:var(--font-urbanist)] cursor-pointer ${
                subTab === tab
                  ? "border-b-2 border-[#3b2513] text-[#3b2513]"
                  : "text-[#6b7280] hover:text-[#2d1810]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {subTab === "This Month" && <ThisMonthTable onRunPayroll={() => setRunOpen(true)} />}
        {subTab === "Payroll History" && <PayrollHistoryTable />}
        {subTab === "Salary Setup" && <SalarySetupTable />}
      </div>

      {runOpen && <RunPayrollModal onClose={() => setRunOpen(false)} />}
      {setupOpen && <NewSalarySetupModal onClose={() => setSetupOpen(false)} />}
    </>
  );
}
