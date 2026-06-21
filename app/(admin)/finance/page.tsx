"use client";

import {
  ChevronDown,
  ChevronLeft,
  Download,
  MoreVertical,
  Search,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

type ActiveTab = "Payment History" | "Expenses";

type PaymentRow = {
  plan: string;
  boldAmount: string;
  ref: string;
  amount: string;
  date: string;
  invoice: string;
  status: "Successful" | "Failed";
};

type InvoiceRow = {
  invoice: string;
  vendor: string;
  category: string;
  amount: string;
  due: string;
  status: "Paid" | "Overdue" | "Pending";
};

// ── Static data ───────────────────────────────────────────────────────────────

const paymentRows: PaymentRow[] = [
  { plan: "Daily", boldAmount: "₦400,000", ref: "REF0292638", amount: "₦40,000", date: "10 Oct 2025", invoice: "#0123456789", status: "Successful" },
  { plan: "Monthly", boldAmount: "₦40,000", ref: "REF0292639", amount: "₦40,000", date: "10 Oct 2025", invoice: "#0123456790", status: "Successful" },
  { plan: "Termly", boldAmount: "₦110,000", ref: "REF0292640", amount: "₦110,000", date: "09 Oct 2025", invoice: "#0123456791", status: "Failed" },
  { plan: "Annual", boldAmount: "₦400,000", ref: "REF0292641", amount: "₦400,000", date: "08 Oct 2025", invoice: "#0123456792", status: "Successful" },
  { plan: "Monthly", boldAmount: "₦40,000", ref: "REF0292642", amount: "₦40,000", date: "07 Oct 2025", invoice: "#0123456793", status: "Failed" },
];

const invoiceRows: InvoiceRow[] = [
  { invoice: "#INV-0001", vendor: "Mrs. Sarah Okonkwo", category: "Payroll", amount: "₦85,000", due: "15 Oct 2025", status: "Paid" },
  { invoice: "#INV-0002", vendor: "Lagos Water Corp", category: "Utilities", amount: "₦12,000", due: "10 Oct 2025", status: "Overdue" },
  { invoice: "#INV-0003", vendor: "ABC Supplies Ltd", category: "Operations", amount: "₦45,000", due: "20 Oct 2025", status: "Pending" },
  { invoice: "#INV-0004", vendor: "Mr. James Adamu", category: "Payroll", amount: "₦70,000", due: "15 Oct 2025", status: "Paid" },
  { invoice: "#INV-0005", vendor: "EduTech Nigeria", category: "Technology", amount: "₦25,000", due: "25 Oct 2025", status: "Pending" },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function PaymentStatusBadge({ status }: { status: "Successful" | "Failed" }) {
  if (status === "Successful") {
    return (
      <span className="inline-flex items-center rounded-full border border-[#009061] bg-[#ecfff8] px-2.5 py-0.5 font-[family-name:var(--font-urbanist)] text-xs text-[#009061]">
        {status}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full border border-[#ef4444] bg-[#fff5f5] px-2.5 py-0.5 font-[family-name:var(--font-urbanist)] text-xs text-[#ef4444]">
      {status}
    </span>
  );
}

function InvoiceStatusBadge({ status }: { status: "Paid" | "Overdue" | "Pending" }) {
  if (status === "Paid") {
    return (
      <span className="inline-flex items-center rounded-full border border-[#009061] bg-[#ecfff8] px-2.5 py-0.5 font-[family-name:var(--font-urbanist)] text-xs text-[#009061]">
        {status}
      </span>
    );
  }
  if (status === "Overdue") {
    return (
      <span className="inline-flex items-center rounded-full border border-[#ef4444] bg-[#fff5f5] px-2.5 py-0.5 font-[family-name:var(--font-urbanist)] text-xs text-[#ef4444]">
        {status}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full border border-[#f59e0b] bg-[#fffbeb] px-2.5 py-0.5 font-[family-name:var(--font-urbanist)] text-xs text-[#f59e0b]">
      {status}
    </span>
  );
}

function FilterButton({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-1.5 rounded-lg border border-[#e6ebf3] bg-white px-3 py-2 font-[family-name:var(--font-urbanist)] text-sm text-[#6b7280] hover:border-[#3b2513] hover:text-[#3b2513]">
      {label}
      <ChevronDown className="h-4 w-4" />
    </button>
  );
}

// ── Payment History Tab ───────────────────────────────────────────────────────

function PaymentHistoryTab() {
  return (
    <div className="flex flex-col">
      {/* Sub-header */}
      <div className="mb-4 flex items-center">
        <button className="mr-3 rounded-full bg-[#edd9c0] p-2 text-[#3b2513] hover:bg-[#e0c8a8]">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <h2 className="font-[family-name:var(--font-merriweather)] text-xl font-bold text-[#2d1810]">
          Payment History
        </h2>
        <span className="ml-auto font-[family-name:var(--font-urbanist)] text-sm text-[#6b7280]">
          10 Oct, 2025
        </span>
      </div>

      {/* Filter toolbar */}
      <div className="my-4 flex flex-wrap items-center gap-2">
        <FilterButton label="Date" />
        <FilterButton label="All Status" />
        <div className="flex items-center gap-2 rounded-lg border border-[#e6ebf3] bg-[#f5edd8] px-3 py-2">
          <Search className="h-4 w-4 text-[#9ca3af]" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] placeholder:text-[#9ca3af] focus:outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="hidden overflow-x-auto lg:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#edd9c0]">
              <th className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">Room Plan</th>
              <th className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">Reference ID</th>
              <th className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">Amount</th>
              <th className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">Date</th>
              <th className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">Invoice</th>
              <th className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">Status</th>
              <th className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {paymentRows.map((row, i) => (
              <tr key={i} className="border-t border-[#eaecf0]">
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-[family-name:var(--font-nunito)] text-sm font-bold text-[#2d1810]">
                      {row.plan}
                    </span>
                    <span className="font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">
                      {row.boldAmount}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                  {row.ref}
                </td>
                <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                  {row.amount}
                </td>
                <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                  {row.date}
                </td>
                <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                  {row.invoice}
                </td>
                <td className="px-4 py-3">
                  <PaymentStatusBadge status={row.status} />
                </td>
                <td className="px-4 py-3">
                  <button className="flex items-center gap-1.5 text-[#3b2513] hover:opacity-70">
                    <Download className="h-4 w-4" />
                    <span className="font-[family-name:var(--font-urbanist)] text-xs">Payslips</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        {/* Mobile card list */}
        <div className="flex flex-col gap-2 px-4 py-4 lg:hidden">
          {paymentRows.map((row, i) => (
            <div key={i} className="rounded-xl border border-[#eaecf0] p-3">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="font-[family-name:var(--font-nunito)] text-sm font-bold text-[#2d1810]">{row.plan}</span>
                  <span className="font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">{row.boldAmount}</span>
                </div>
                <PaymentStatusBadge status={row.status} />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{row.date} • {row.invoice}</span>
                <button className="flex items-center gap-1.5 text-[#3b2513] hover:opacity-70">
                  <Download className="h-3.5 w-3.5" />
                  <span className="font-[family-name:var(--font-urbanist)] text-[10px]">Payslips</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Expenses Tab ──────────────────────────────────────────────────────────────

function ExpensesTab() {
  return (
    <div className="flex flex-col">
      {/* Analysis Cards */}
      <div className="mb-6 flex gap-3 overflow-x-auto snap-x snap-mandatory pb-1 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
        {/* Total Expenses */}
        <div className="min-w-[180px] snap-start flex-1 rounded-xl border border-[#e6ebf3] bg-white p-4">
          <p className="mb-2 font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
            Total Expenses
          </p>
          <p className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">
            ₦2,450,000
          </p>
          <div className="mt-2 flex items-center gap-1 text-[#009061]">
            <TrendingUp className="h-3 w-3" />
            <span className="font-[family-name:var(--font-urbanist)] text-xs">
              +8.2% vs last month
            </span>
          </div>
        </div>

        {/* Payroll */}
        <div className="min-w-[180px] snap-start flex-1 rounded-xl border border-[#e6ebf3] bg-white p-4">
          <p className="mb-2 font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
            Payroll
          </p>
          <p className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">
            ₦1,800,000
          </p>
          <p className="mt-2 font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">
            73.5% of total expenses
          </p>
        </div>

        {/* Operations */}
        <div className="min-w-[180px] snap-start flex-1 rounded-xl border border-[#e6ebf3] bg-white p-4">
          <p className="mb-2 font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
            Operations
          </p>
          <p className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">
            ₦450,000
          </p>
          <p className="mt-2 font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">
            18.4% of total expenses
          </p>
        </div>

        {/* Pending Invoices */}
        <div className="min-w-[180px] snap-start flex-1 rounded-xl border border-[#e6ebf3] bg-white p-4">
          <p className="mb-2 font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
            Pending Invoices
          </p>
          <p className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">
            ₦200,000
          </p>
          <p className="mt-2 font-[family-name:var(--font-urbanist)] text-xs text-[#f59e0b]">
            3 invoices overdue
          </p>
        </div>
      </div>

      {/* Invoice Tracking Table */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 px-4 py-4">
          <h3 className="font-[family-name:var(--font-merriweather)] font-bold text-[#2d1810]">
            Invoice Tracking
          </h3>
          <div className="ml-auto flex items-center gap-3">
            <FilterButton label="Category" />
            <FilterButton label="Date" />
            <div className="flex items-center gap-2 rounded-lg border border-[#e6ebf3] bg-[#f5edd8] px-3 py-2">
              <Search className="h-4 w-4 text-[#9ca3af]" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] placeholder:text-[#9ca3af] focus:outline-none"
              />
            </div>
            <button className="rounded-lg bg-[#3b2513] px-4 py-2 font-[family-name:var(--font-urbanist)] text-sm text-[#faf2e1] hover:bg-[#2d1810]">
              Add Invoice
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="hidden overflow-x-auto lg:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#edd9c0]">
              <th className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">Invoice #</th>
              <th className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">Vendor / Payee</th>
              <th className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">Category</th>
              <th className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">Amount</th>
              <th className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">Due Date</th>
              <th className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">Status</th>
              <th className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {invoiceRows.map((row, i) => (
              <tr key={i} className="border-t border-[#eaecf0]">
                <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                  {row.invoice}
                </td>
                <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                  {row.vendor}
                </td>
                <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                  {row.category}
                </td>
                <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]">
                  {row.amount}
                </td>
                <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                  {row.due}
                </td>
                <td className="px-4 py-3">
                  <InvoiceStatusBadge status={row.status} />
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
          {invoiceRows.map((row, i) => (
            <div key={i} className="rounded-xl border border-[#eaecf0] p-3">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]">{row.vendor}</span>
                  <span className="font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">{row.invoice} • {row.category}</span>
                </div>
                <InvoiceStatusBadge status={row.status} />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]">{row.amount}</span>
                <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">Due {row.due}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("Payment History");

  const tabs: ActiveTab[] = ["Payment History", "Expenses"];

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">
          Finance
        </h1>

        {/* Tab pill group */}
        <div className="flex items-center gap-1 rounded-xl border border-[#e6ebf3] bg-white p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-4 py-2 font-[family-name:var(--font-urbanist)] text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-[#3b2513] text-[#faf2e1]"
                  : "border border-[#e6ebf3] bg-white text-[#6b7280] hover:text-[#2d1810]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {activeTab === "Payment History" ? <PaymentHistoryTab /> : <ExpensesTab />}
    </div>
  );
}
