"use client";

import { useState } from "react";
import { Wallet, Clock3, AlertTriangle, Target, Download, Phone } from "lucide-react";

import NewInvoiceModal from "@/components/admin/finance/new-invoice-modal";
import RecordPaymentModal from "@/components/admin/finance/record-payment-modal";
import AiRiskBadge from "@/components/dashboard/ai-risk-badge";
import {
  BILLING_STATS,
  COLLECTION_PROGRESS_STATS,
  INVOICE_TRACKING,
  type InvoiceTrackingStatus,
  type RiskLevel,
} from "@/lib/mock-data/finance";

const STAT_ICONS = [Wallet, Clock3, AlertTriangle, Target];
const STAT_LABELS = ["Collected", "Outstanding", "Overdue >7 days", "Monthly Target"];

const STATUS_STYLES: Record<InvoiceTrackingStatus, { bg: string; text: string }> = {
  Overdue: { bg: "#FDECEA", text: "#D4522F" },
  Partial: { bg: "#F1F0EC", text: "#6B7280" },
  Paid: { bg: "#E9F6EE", text: "#2A8A52" },
  Pending: { bg: "#FDF3E4", text: "#C47B2C" },
};

function toAiRiskLevel(risk: RiskLevel): "high" | "medium" | "low" {
  if (risk === "High Risk") return "high";
  if (risk === "Medium") return "medium";
  return "low";
}

function collectionPct(): number {
  const target = COLLECTION_PROGRESS_STATS.find((s) => s.label === "Target");
  const match = target?.value.match(/(\d+)%/);
  return match ? Number(match[1]) : 0;
}

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
    <div className="relative overflow-hidden rounded-2xl border border-black/[0.07] bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-[#2D1810]/50">{label}</p>
      <p className="mt-1.5 font-[family-name:var(--font-merriweather)] text-[1.85rem] font-bold leading-none text-[#2D1810]">
        {value}
      </p>
      <p className="mt-1.5 text-[11px] text-[#2D1810]/60">{sub}</p>
      <Icon className="pointer-events-none absolute right-3 top-3 h-6 w-6 text-[#2D1810]/10" />
    </div>
  );
}

export default function BillingV3Page() {
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const pct = collectionPct();

  return (
    <div className="flex flex-col gap-5">
      {/* Page header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2D1810]">
            Billing &amp; Payments
          </h1>
          <p className="mt-1 text-sm text-[#2D1810]/50">
            Track invoices, collections, and payment risk across every family.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => setPaymentOpen(true)}
            className="rounded-lg border border-black/[0.12] bg-white px-4 py-2 text-sm font-semibold text-[#2D1810] hover:border-[#C47B2C]"
          >
            Record Payment
          </button>
          <button
            onClick={() => setInvoiceOpen(true)}
            className="rounded-lg bg-[#C47B2C] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            + New Invoice
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {BILLING_STATS.map((stat, i) => (
          <StatCard key={stat.label} Icon={STAT_ICONS[i]} label={STAT_LABELS[i] ?? stat.label} value={stat.value} sub={stat.helper} />
        ))}
      </div>

      {/* Collection Progress */}
      <div className="rounded-2xl border border-black/[0.07] bg-white p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-bold text-[#2D1810]">Collection Progress</p>
          <span className="text-xs text-[#2D1810]/50">
            Target: {COLLECTION_PROGRESS_STATS.find((s) => s.label === "Target")?.value}
          </span>
        </div>
        <div className="mb-4 flex items-center gap-4">
          <div className="h-2.5 flex-1 rounded-full bg-black/[0.06]">
            <div className="h-full rounded-full bg-[#C47B2C]" style={{ width: `${pct}%` }} />
          </div>
          <span className="shrink-0 font-[family-name:var(--font-merriweather)] text-xl font-bold text-[#2D1810]">
            {pct}%
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {COLLECTION_PROGRESS_STATS.map((s) => (
            <div key={s.label} className="rounded-lg bg-[#FAF2E1] p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#2D1810]/50">{s.label}</p>
              <p className="font-[family-name:var(--font-merriweather)] text-sm font-bold text-[#2D1810]">{s.value}</p>
              <p className="text-[10px] text-[#2D1810]/40">{s.helper}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Invoice Tracker */}
      <div className="rounded-2xl border border-black/[0.07] bg-white p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-bold text-[#2D1810]">Invoice Tracker</p>
          <button className="flex items-center gap-1.5 text-xs font-bold text-[#3B2513] hover:opacity-70">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-black/[0.08] text-left text-xs uppercase tracking-wide text-[#2D1810]/50">
                <th className="pb-2 pr-3 font-semibold">Child</th>
                <th className="pb-2 pr-3 font-semibold">Parent</th>
                <th className="pb-2 pr-3 font-semibold">Plan</th>
                <th className="pb-2 pr-3 font-semibold">Amount</th>
                <th className="pb-2 pr-3 font-semibold">Due</th>
                <th className="pb-2 pr-3 font-semibold">Days</th>
                <th className="pb-2 pr-3 font-semibold">AI Risk</th>
                <th className="pb-2 pr-3 font-semibold">Status</th>
                <th className="pb-2 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {INVOICE_TRACKING.map((row) => {
                const status = STATUS_STYLES[row.status];
                return (
                  <tr key={row.id} className="border-b border-black/[0.05] last:border-0">
                    <td className="py-2.5 pr-3 font-semibold text-[#2D1810]">
                      {row.child}
                      {row.extraChildren > 0 && (
                        <span className="ml-1 rounded bg-black/[0.05] px-1.5 py-0.5 text-[10px] text-[#2D1810]/60">
                          +{row.extraChildren}
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 pr-3 text-[#2D1810]/70">{row.parentName}</td>
                    <td className="py-2.5 pr-3 text-[#2D1810]/70">{row.roomPlan}</td>
                    <td className="py-2.5 pr-3 font-mono text-[#2D1810]">{row.duePayment}</td>
                    <td className="py-2.5 pr-3 text-[#2D1810]/70">{row.dueDate}</td>
                    <td className="py-2.5 pr-3 text-[#2D1810]/70">{row.daysOverdue ?? "—"}</td>
                    <td className="py-2.5 pr-3">
                      <AiRiskBadge level={toAiRiskLevel(row.risk)} />
                    </td>
                    <td className="py-2.5 pr-3">
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                        style={{ backgroundColor: status.bg, color: status.text }}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="py-2.5">
                      {row.status === "Paid" ? (
                        <button className="text-xs font-semibold text-[#2D1810] underline hover:opacity-70">
                          Receipt
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button className="text-xs font-semibold text-[#2D1810] underline hover:opacity-70">
                            {row.status === "Overdue" ? "Remind" : "Resend"}
                          </button>
                          {row.status === "Overdue" && (
                            <button className="text-[#2D1810]/60 hover:text-[#2D1810]" aria-label="Call parent">
                              <Phone className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <NewInvoiceModal open={invoiceOpen} onOpenChange={setInvoiceOpen} />
      <RecordPaymentModal open={paymentOpen} onOpenChange={setPaymentOpen} />
    </div>
  );
}
