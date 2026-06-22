"use client";

import { ChevronDown, ChevronLeft, ChevronRight, Download, Search, TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";

import {
  CASH_FLOW,
  COLLECTION_EFFICIENCY,
  PL_EXPENDITURE,
  PL_INCOME,
  PL_MINI_STATS,
  REPORT_SUMMARY,
  REVENUE_BREAKDOWN,
  ROOM_PLAN_REVENUE,
  type DonutSegment,
} from "@/lib/mock-data/finance";

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

function CashFlowChart() {
  const max = Math.max(...CASH_FLOW.map((m) => Math.max(m.cashIn, m.cashOut)));
  return (
    <div>
      <div className="flex h-40 items-end gap-2">
        {CASH_FLOW.map((m) => (
          <div key={m.month} className="flex flex-1 flex-col items-center gap-1">
            <div className="flex h-full w-full items-end justify-center gap-0.5">
              <div
                className="w-1/2 rounded-t bg-[#bab68d]"
                style={{ height: `${(m.cashIn / max) * 100}%` }}
                title={`Cash In: ${m.cashIn}`}
              />
              <div
                className="w-1/2 rounded-t bg-[#3b2513]"
                style={{ height: `${(m.cashOut / max) * 100}%` }}
                title={`Cash Out: ${m.cashOut}`}
              />
            </div>
            <span className="font-[family-name:var(--font-nunito)] text-[10px] text-[#9ca3af]">{m.month}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[#bab68d]" />
          <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">Cash In</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[#3b2513]" />
          <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">Cash Out</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[#e2622a]" />
          <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">Net Cash Flow</span>
        </div>
      </div>
    </div>
  );
}

const TOTAL_PAGES = 10;

export function FinancialReportsTab() {
  const [page, setPage] = useState(1);

  return (
    <div className="flex flex-col gap-4">
      {/* Header action */}
      <div className="flex justify-end">
        <button className="flex items-center gap-1.5 rounded-lg bg-[#3b2513] px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#faf2e1]">
          <Download className="size-4" />
          Export Report
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {REPORT_SUMMARY.map((s) => (
          <div key={s.label} className="rounded-xl border border-[#e6ebf3] bg-white p-4">
            <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{s.label}</p>
            <p className="mt-2 font-[family-name:var(--font-merriweather)] text-xl font-bold text-[#2d1810]">{s.value}</p>
            <div className={`mt-1 flex items-center gap-1 font-[family-name:var(--font-urbanist)] text-xs ${s.trend === "up" ? "text-[#009061]" : s.trend === "down" ? "text-[#ef4444]" : "text-[#6b7280]"}`}>
              {s.trend === "up" && <TrendingUp className="size-3" />}
              {s.trend === "down" && <TrendingDown className="size-3" />}
              {s.helper}
            </div>
          </div>
        ))}
      </div>

      {/* P&L + Revenue Breakdown */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl bg-white p-4 shadow-sm lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-[family-name:var(--font-merriweather)] text-base font-bold text-[#2d1810]">
              Profit &amp; Loss
            </h2>
            <FilterButton label="This Month" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-2 font-[family-name:var(--font-nunito)] text-xs font-semibold text-[#6b7280]">Income</p>
              <div className="flex flex-col gap-2">
                {PL_INCOME.map((line) => (
                  <div key={line.label} className="flex items-center justify-between">
                    <span
                      className={`font-[family-name:var(--font-nunito)] text-sm ${line.bold ? "font-bold text-[#2d1810]" : "text-[#6b7280]"}`}
                    >
                      {line.label}
                    </span>
                    <span
                      className={`font-[family-name:var(--font-nunito)] text-sm ${line.bold ? "font-bold text-[#2d1810]" : "text-[#454b54]"}`}
                    >
                      {line.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 font-[family-name:var(--font-nunito)] text-xs font-semibold text-[#6b7280]">Expenditure</p>
              <div className="flex flex-col gap-2">
                {PL_EXPENDITURE.map((line) => (
                  <div key={line.label} className="flex items-center justify-between">
                    <span
                      className={`font-[family-name:var(--font-nunito)] text-sm ${line.bold ? "font-bold text-[#2d1810]" : "text-[#6b7280]"}`}
                    >
                      {line.label}
                    </span>
                    <span
                      className={`font-[family-name:var(--font-nunito)] text-sm ${line.bold ? "font-bold text-[#2d1810]" : "text-[#454b54]"}`}
                    >
                      {line.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {PL_MINI_STATS.map((s) => (
              <div key={s.label} className="rounded-lg bg-[#faf9f7] p-3">
                <p className="font-[family-name:var(--font-nunito)] text-[10px] text-[#6b7280]">{s.label}</p>
                <div className="flex items-baseline gap-1">
                  <p className="font-[family-name:var(--font-merriweather)] text-sm font-bold text-[#2d1810]">{s.value}</p>
                  <span className="font-[family-name:var(--font-urbanist)] text-[10px] text-[#9ca3af]">{s.pct}</span>
                </div>
                <p className="font-[family-name:var(--font-urbanist)] text-[10px] text-[#9ca3af]">{s.helper}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-[family-name:var(--font-merriweather)] text-base font-bold text-[#2d1810]">
            Revenue Breakdown
          </h2>
          <Donut segments={REVENUE_BREAKDOWN} centerLabel="100" />
        </div>
      </div>

      {/* Revenue by Room Plan + Collection Efficiency */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="overflow-hidden rounded-xl bg-white shadow-sm lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-2 p-4">
            <h2 className="font-[family-name:var(--font-merriweather)] text-base font-bold text-[#2d1810]">
              Revenue by Room Plan
            </h2>
            <div className="flex items-center gap-2">
              <FilterButton label="All Categories" />
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
                  {["Room", "Children", "Plan", "Rev Billed", "Rev Collected", "Outstanding", "Collection %"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {ROOM_PLAN_REVENUE.map((r) => (
                  <tr key={r.id} className="border-t border-[#eaecf0]">
                    <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]">{r.room}</td>
                    <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{r.children}</td>
                    <td className="whitespace-pre-line px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{r.plan}</td>
                    <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{r.revBilled}</td>
                    <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{r.revCollected}</td>
                    <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{r.outstanding}</td>
                    <td
                      className={`px-4 py-3 font-[family-name:var(--font-nunito)] text-sm font-medium ${
                        r.collectionPct >= 75 ? "text-[#009061]" : r.collectionPct >= 65 ? "text-[#cc8000]" : "text-[#ef4444]"
                      }`}
                    >
                      {r.collectionPct}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile card list */}
          <div className="flex flex-col gap-2 px-4 pb-4 lg:hidden">
            {ROOM_PLAN_REVENUE.map((r) => (
              <div key={r.id} className="rounded-xl border border-[#eaecf0] p-3">
                <div className="flex items-center justify-between">
                  <span className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]">{r.room}</span>
                  <span className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#009061]">{r.collectionPct}%</span>
                </div>
                <p className="mt-1 whitespace-pre-line font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{r.plan}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-[#eaecf0] px-4 py-3">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="flex items-center gap-1 font-[family-name:var(--font-nunito)] text-sm text-[#6b7280] hover:text-[#2d1810]"
            >
              <ChevronLeft className="size-4" />
              Previous
            </button>
            <div className="flex items-center gap-1 font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`size-7 rounded ${page === p ? "bg-[#3b2513] text-[#faf2e1]" : "hover:bg-[#f3f4f6]"}`}
                >
                  {p}
                </button>
              ))}
              <span>...</span>
              {[8, 9, 10].map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`size-7 rounded ${page === p ? "bg-[#3b2513] text-[#faf2e1]" : "hover:bg-[#f3f4f6]"}`}
                >
                  {p}
                </button>
              ))}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
              className="flex items-center gap-1 font-[family-name:var(--font-nunito)] text-sm text-[#6b7280] hover:text-[#2d1810]"
            >
              Next
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-[family-name:var(--font-merriweather)] text-base font-bold text-[#2d1810]">
            Collection Efficiency
          </h2>
          <div className="flex flex-col gap-3">
            {COLLECTION_EFFICIENCY.map((s) => (
              <div key={s.label} className="rounded-lg bg-[#faf9f7] p-3">
                <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{s.label}</p>
                <p className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cash Flow Insight */}
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <h2 className="mb-3 font-[family-name:var(--font-merriweather)] text-base font-bold text-[#2d1810]">
          Cash Flow Insight
        </h2>
        <CashFlowChart />
      </div>
    </div>
  );
}
