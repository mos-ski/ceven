"use client";

import { useState } from "react";
import GrowthTab from "@/components/super-admin/dashboard/growth-tab";
import FinancialsTab from "@/components/super-admin/dashboard/financials-tab";
import EngagementTab from "@/components/super-admin/dashboard/engagement-tab";

const TABS = ["Growth", "Financials", "Engagement"] as const;

const MONTHS = ["January", "February", "March", "April", "May", "June", "July"];

export default function SuperAdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Growth");
  const [month, setMonth] = useState("July");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-1 rounded-lg border border-card-border bg-white p-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-md px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-semibold transition-colors ${
                activeTab === tab
                  ? "bg-brand-dark text-white"
                  : "text-muted-text hover:text-heading"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="h-9 rounded-lg border border-card-border bg-white px-3 font-[family-name:var(--font-nunito)] text-sm text-heading focus:outline-none focus:ring-2 focus:ring-brand-accent"
        >
          {MONTHS.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {activeTab === "Growth" && <GrowthTab />}
      {activeTab === "Financials" && <FinancialsTab />}
      {activeTab === "Engagement" && <EngagementTab />}
    </div>
  );
}
