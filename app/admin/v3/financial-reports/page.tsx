"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, BarChart3, Wallet, Download } from "lucide-react";

import {
 EXPENSE_BREAKDOWN,
 PL_EXPENDITURE,
 PL_INCOME,
 REPORT_SUMMARY,
 ROOM_PLAN_REVENUE,
} from "@/lib/mock-data/finance";

const STAT_ICONS = [TrendingUp, TrendingDown, BarChart3, Wallet];

const TABS = ["P&L Summary", "Revenue Breakdown", "Cost Analysis"] as const;
type Tab = (typeof TABS)[number];

const COST_COLORS: Record<string, string> = {
 Payroll: "#D4522F",
 Rent: "#1E2D4A",
 Utilities: "#C47B2C",
 Supplies: "#C47B2C",
 Others: "#8B9E7A",
};

function StatCard({
 Icon,
 label,
 value,
 helper,
 trend,
}: {
 Icon: typeof Wallet;
 label: string;
 value: string;
 helper: string;
 trend: "up" | "down" | "neutral";
}) {
 return (
  <div className="relative overflow-hidden rounded-2xl bg-[#F5EDD8]/30 p-4">
   <p className="text-xs font-bold uppercase tracking-wide text-[#2D1810]/50">{label}</p>
   <p className="mt-1.5 font-[family-name:var(--font-merriweather)] text-[1.85rem] font-bold leading-none text-[#2D1810]">
    {value}
   </p>
   <p
    className="mt-1.5 text-[11px]"
    style={{ color: trend === "up" ? "#2A8A52" : trend === "down" ? "#D4522F" : "#2D1810" }}
   >
    {helper}
   </p>
   <Icon className="pointer-events-none absolute right-3 top-3 h-6 w-6 text-[#2D1810]/10" />
  </div>
 );
}

function PLColumn({ title, lines, tint }: { title: string; lines: typeof PL_INCOME; tint: string }) {
 return (
  <div>
   <p className="mb-2 pb-1.5 text-xs font-bold uppercase tracking-wide text-[#2D1810]/50">
    {title}
   </p>
   <div className="flex flex-col gap-2">
    {lines.map((line) => (
     <div
      key={line.label}
      className={`flex items-center justify-between text-sm ${
       line.bold ? "pt-2 font-bold text-[#2D1810]" : "text-[#2D1810]/70"
      }`}
     >
      <span>{line.label}</span>
      <span className="font-mono" style={{ color: line.bold ? tint : undefined }}>
       {line.value}
      </span>
     </div>
    ))}
   </div>
  </div>
 );
}

function PLSummarySection() {
 const netProfit = REPORT_SUMMARY.find((s) => s.label === "Net Profit");
 return (
  <div className="flex flex-col gap-5">
   <div className="rounded-2xl bg-[#F5EDD8]/30 p-5">
    <p className="mb-3 text-sm font-bold text-[#2D1810]">Profit &amp; Loss</p>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
     <PLColumn title="Income" lines={PL_INCOME} tint="#2A8A52" />
     <PLColumn title="Expenditure" lines={PL_EXPENDITURE} tint="#D4522F" />
    </div>
   </div>
   {netProfit && (
    <div className="rounded-2xl bg-[#F5EDD8]/30 p-5">
     <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#FAF2E1] p-4">
      <div>
       <p className="text-sm font-bold text-[#2D1810]">Net Result: This Month</p>
       <p className="text-xs text-[#2D1810]/50">{netProfit.helper}</p>
      </div>
      <p className="font-[family-name:var(--font-merriweather)] text-3xl font-bold text-[#2A8A52]">
       {netProfit.value}
      </p>
     </div>
    </div>
   )}
  </div>
 );
}

function RevenueBreakdownSection() {
 return (
  <div className="rounded-2xl bg-[#F5EDD8]/30 p-5">
   <p className="mb-3 text-sm font-bold text-[#2D1810]">Revenue by Room</p>
   <div className="overflow-x-auto">
    <table className="w-full border-collapse text-sm">
     <thead>
      <tr className="text-left text-xs uppercase tracking-wide text-[#2D1810]/50">
       <th className="pb-2 pr-3 font-semibold">Room</th>
       <th className="pb-2 pr-3 font-semibold">Children</th>
       <th className="pb-2 pr-3 font-semibold">Plan</th>
       <th className="pb-2 pr-3 font-semibold">Billed</th>
       <th className="pb-2 pr-3 font-semibold">Collected</th>
       <th className="pb-2 pr-3 font-semibold">Outstanding</th>
       <th className="pb-2 font-semibold">Collection %</th>
      </tr>
     </thead>
     <tbody>
      {ROOM_PLAN_REVENUE.map((r) => (
       <tr key={r.id} className={Number(r.id) % 2 === 0 ? "bg-white/60" : "bg-transparent"}>
        <td className="py-2.5 pr-3 font-semibold text-[#2D1810]">{r.room}</td>
        <td className="py-2.5 pr-3 text-[#2D1810]/70">{r.children}</td>
        <td className="whitespace-pre-line py-2.5 pr-3 text-[#2D1810]/70">{r.plan}</td>
        <td className="py-2.5 pr-3 font-mono text-[#2D1810]">{r.revBilled}</td>
        <td className="py-2.5 pr-3 font-mono text-[#2A8A52]">{r.revCollected}</td>
        <td className="py-2.5 pr-3 font-mono text-[#D4522F]">{r.outstanding}</td>
        <td
         className="py-2.5 font-semibold"
         style={{ color: r.collectionPct >= 75 ? "#2A8A52" : r.collectionPct >= 65 ? "#C47B2C" : "#D4522F" }}
        >
         {r.collectionPct}%
        </td>
       </tr>
      ))}
     </tbody>
    </table>
   </div>
  </div>
 );
}

function CostAnalysisSection() {
 return (
  <div className="rounded-2xl bg-[#F5EDD8]/30 p-5">
   <p className="mb-3 text-sm font-bold text-[#2D1810]">Cost Analysis: Share of Total Expense</p>
   <div className="flex flex-col gap-3">
    {EXPENSE_BREAKDOWN.map((segment) => {
     const category = segment.label.split(" - ")[0];
     const color = COST_COLORS[category] ?? "#C47B2C";
     return (
      <div key={segment.label} className="flex items-center gap-3">
       <p className="w-24 shrink-0 text-[13px] font-semibold text-[#2D1810]">{category}</p>
       <div className="h-2.5 flex-1 rounded-full bg-black/[0.06]">
        <div className="h-full rounded-full" style={{ width: `${segment.pct}%`, backgroundColor: color }} />
       </div>
       <span className="w-10 shrink-0 text-right font-mono text-xs font-semibold text-[#2D1810]">
        {segment.pct}%
       </span>
      </div>
     );
    })}
   </div>
  </div>
 );
}

export default function FinancialReportsV3Page() {
 const [tab, setTab] = useState<Tab>("P&L Summary");

 return (
  <div className="flex flex-col gap-5">
   {/* Page header */}
   <div className="flex flex-wrap items-start justify-between gap-3">
    <div>
     <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2D1810]">
      Financial Reports
     </h1>
     <p className="mt-1 text-sm text-[#2D1810]/50">
      P&amp;L, revenue by room, and cost breakdown for the current period.
     </p>
    </div>
    <button className="flex items-center gap-1.5 rounded-lg bg-[#C47B2C] px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
     <Download className="h-4 w-4" /> Export Report
    </button>
   </div>

   {/* Stats */}
   <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
    {REPORT_SUMMARY.map((stat, i) => (
     <StatCard key={stat.label} Icon={STAT_ICONS[i]} label={stat.label} value={stat.value} helper={stat.helper} trend={stat.trend} />
    ))}
   </div>

   {/* Tabs */}
   <div className="flex gap-2">
    {TABS.map((t) => (
     <button
      key={t}
      onClick={() => setTab(t)}
      className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
       tab === t
        ? "bg-[#C47B2C]/10 text-[#2D1810]"
        : "text-[#2D1810]/50 hover:text-[#2D1810]"
      }`}
     >
      {t}
     </button>
    ))}
   </div>

   {tab === "P&L Summary" && <PLSummarySection />}
   {tab === "Revenue Breakdown" && <RevenueBreakdownSection />}
   {tab === "Cost Analysis" && <CostAnalysisSection />}
  </div>
 );
}
