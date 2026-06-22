"use client";

import { ChevronDown, Download, MoreVertical, Search } from "lucide-react";
import { useState } from "react";

import NewInvoiceModal from "@/components/admin/finance/new-invoice-modal";
import RecordPaymentModal from "@/components/admin/finance/record-payment-modal";
import {
  BILLING_STATS,
  COLLECTION_PROGRESS_STATS,
  COLLECTION_TREND,
  INVOICE_TRACKING,
  PAYMENT_STATUS_BREAKDOWN,
  type DonutSegment,
  type InvoiceTrackingStatus,
  type RiskLevel,
} from "@/lib/mock-data/finance";

const STATUS_BADGE_CLASS: Record<InvoiceTrackingStatus, string> = {
  Overdue: "border-[#ef4444] bg-[#fff5f5] text-[#ef4444]",
  Partial: "border-[#9ca3af] bg-[#f3f4f6] text-[#6b7280]",
  Paid: "border-[#009061] bg-[#ecfff8] text-[#009061]",
  Pending: "border-[#cc8000] bg-[#fff6e6] text-[#cc8000]",
};

const RISK_DOT_CLASS: Record<RiskLevel, string> = {
  Low: "bg-[#9ca3af]",
  Medium: "bg-[#cc8000]",
  "High Risk": "bg-[#ef4444]",
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
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <div
        className="relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full"
        style={{ background: `conic-gradient(${stops})` }}
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white">
          <span className="font-[family-name:var(--font-merriweather)] text-sm font-bold text-[#2d1810]">
            {centerLabel}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CollectionTrendChart() {
  const max = Math.max(...COLLECTION_TREND);
  const points = COLLECTION_TREND.map((v, i) => {
    const x = (i / (COLLECTION_TREND.length - 1)) * 100;
    const y = 100 - (v / max) * 100;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-32 w-full">
      <polyline points={points} fill="none" stroke="#c47b2c" strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function BillingPaymentsTab() {
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      {/* Header actions */}
      <div className="flex flex-wrap justify-end gap-3">
        <button
          onClick={() => setInvoiceOpen(true)}
          className="rounded-lg bg-[#3b2513] px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#faf2e1]"
        >
          New Invoice
        </button>
        <button
          onClick={() => setPaymentOpen(true)}
          className="rounded-lg border border-[#d0d5dd] bg-white px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]"
        >
          Record Payment
        </button>
        <button className="flex items-center gap-1.5 rounded-lg border border-[#d0d5dd] bg-white px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]">
          <Download className="size-4" />
          Export
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {BILLING_STATS.map((s) => (
          <div key={s.label} className="rounded-xl border border-[#e6ebf3] bg-white p-4">
            <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{s.label}</p>
            <p className="mt-2 font-[family-name:var(--font-merriweather)] text-xl font-bold text-[#2d1810]">{s.value}</p>
            <p
              className={`mt-1 font-[family-name:var(--font-urbanist)] text-xs ${
                s.trend === "up" ? "text-[#009061]" : "text-[#6b7280]"
              }`}
            >
              {s.helper}
            </p>
          </div>
        ))}
      </div>

      {/* Chart row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl bg-white p-4 shadow-sm lg:col-span-2">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-[family-name:var(--font-merriweather)] text-base font-bold text-[#2d1810]">
              Collection Progress & Trend
            </h2>
            <FilterButton label="April" />
          </div>
          <CollectionTrendChart />
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {COLLECTION_PROGRESS_STATS.map((s) => (
              <div key={s.label} className="rounded-lg bg-[#faf9f7] p-3">
                <p className="font-[family-name:var(--font-nunito)] text-[10px] text-[#6b7280]">{s.label}</p>
                <p className="font-[family-name:var(--font-merriweather)] text-sm font-bold text-[#2d1810]">{s.value}</p>
                <p className="font-[family-name:var(--font-urbanist)] text-[10px] text-[#9ca3af]">{s.helper}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-[family-name:var(--font-merriweather)] text-base font-bold text-[#2d1810]">
            Payment Status Breakdown
          </h2>
          <Donut segments={PAYMENT_STATUS_BREAKDOWN} centerLabel="535.51" />
        </div>
      </div>

      {/* Invoice Tracking */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="flex flex-wrap items-center gap-2 px-4 py-4">
          <h3 className="font-[family-name:var(--font-merriweather)] font-bold text-[#2d1810]">Invoice Tracking</h3>
          <div className="ml-auto flex items-center gap-3">
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
        </div>

        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#edd9c0]">
                {["Child", "Parent Name", "Room Plan", "Due Payment", "Due Date", "Status", "Risk", "Action"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {INVOICE_TRACKING.map((row) => (
                <tr key={row.id} className="border-t border-[#eaecf0]">
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                    {row.child}
                    {row.extraChildren > 0 && (
                      <span className="ml-1 rounded bg-[#f3f4f6] px-1.5 py-0.5 text-[10px] text-[#6b7280]">+{row.extraChildren}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{row.parentName}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{row.roomPlan}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{row.duePayment}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                    {row.dueDate}
                    {row.daysOverdue && <span className="ml-1 text-xs text-[#ef4444]">({row.daysOverdue})</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-[family-name:var(--font-urbanist)] text-xs ${STATUS_BADGE_CLASS[row.status]}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                      <span className={`size-2 rounded-full ${RISK_DOT_CLASS[row.risk]}`} />
                      {row.risk}
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
          {INVOICE_TRACKING.map((row) => (
            <div key={row.id} className="rounded-xl border border-[#eaecf0] p-3">
              <div className="flex items-center justify-between">
                <span className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]">{row.child}</span>
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-[family-name:var(--font-urbanist)] text-xs ${STATUS_BADGE_CLASS[row.status]}`}>
                  {row.status}
                </span>
              </div>
              <p className="mt-1.5 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
                {row.parentName} • {row.roomPlan}
              </p>
              <p className="mt-1 font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">
                {row.duePayment} due {row.dueDate}
              </p>
            </div>
          ))}
        </div>
      </div>

      <NewInvoiceModal open={invoiceOpen} onOpenChange={setInvoiceOpen} />
      <RecordPaymentModal open={paymentOpen} onOpenChange={setPaymentOpen} />
    </div>
  );
}
