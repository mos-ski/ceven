"use client";

import { Sparkles } from "lucide-react";
import { AnalyticsTab } from "@/components/admin/intelligence/analytics-tab";
import { INSIGHT_CATEGORIES } from "@/lib/mock-data/intelligence";

export default function AnalyticsV3Page() {
  return (
    <div className="flex flex-col gap-5">
      {/* Page header */}
      <div>
        <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2D1810]">
          Analytics
        </h1>
        <p className="mt-1 text-sm text-[#2D1810]/50">
          Attendance, revenue, and staff performance trends, powered by Ada&apos;s ongoing analysis.
        </p>
      </div>

      {/* AI Forecast */}
      <div className="rounded-2xl border border-[#C47B2C]/40 bg-white p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#1E2D4A] to-[#2D1810] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#F5EDD8]">
            <Sparkles className="h-3 w-3 text-[#C47B2C]" /> AI Forecast
          </span>
          <span className="text-xs text-[#2D1810]/40">Updated 7am today</span>
        </div>
        <p className="text-sm leading-6 text-[#2D1810]">
          <span className="font-bold">Revenue collection</span>{" "}
          <span className="text-[#2D1810]/60">
            is trending 12% above last month&apos;s pace — if the current velocity holds, this month should close
            with collections outpacing billing for the first time this quarter.
          </span>
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {INSIGHT_CATEGORIES.map((cat) => (
            <div key={cat.label}>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#2D1810]">{cat.label}</span>
                <span className="text-[#2D1810]/50">{cat.pct}%</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-black/[0.06]">
                <div className="h-full rounded-full" style={{ width: `${cat.pct}%`, background: cat.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnalyticsTab />
    </div>
  );
}
