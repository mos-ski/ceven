"use client";

import { Bot, ChevronDown, User } from "lucide-react";

import { AUDIT_LOG } from "@/lib/mock-data/intelligence";

function FilterButton({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-1.5 rounded-lg border border-[#e6ebf3] bg-white px-3 py-2 font-[family-name:var(--font-urbanist)] text-sm text-[#6b7280] hover:border-[#3b2513] hover:text-[#3b2513]">
      {label}
      <ChevronDown className="h-4 w-4" />
    </button>
  );
}

export function AuditTrailTab() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
          Audit Trail
        </h2>
        <div className="flex items-center gap-2">
          <FilterButton label="All Actors" />
          <FilterButton label="Date" />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="flex flex-col divide-y divide-[#eaecf0]">
          {AUDIT_LOG.map((entry) => (
            <div key={entry.id} className="flex gap-3 p-4">
              <div
                className={`flex size-8 shrink-0 items-center justify-center rounded-full ${
                  entry.actor === "AI" ? "bg-[#1e2d4a] text-white" : "bg-[#edd9c0] text-[#3b2513]"
                }`}
              >
                {entry.actor === "AI" ? <Bot className="size-4" /> : <User className="size-4" />}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
                    {entry.actorName} <span className="font-normal text-[#6b7280]">{entry.action}</span>
                  </p>
                  <span className="font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">{entry.timestamp}</span>
                </div>
                <p className="mt-0.5 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{entry.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
