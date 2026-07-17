"use client";

import { useState } from "react";
import { Users, UserCheck, UserX } from "lucide-react";
import { DASHBOARD_STATS_V1 } from "@/lib/admin-v1/dashboard-data";
import { DashboardChart } from "@/components/admin-v1/dashboard-chart";
import { SetupBanner } from "@/components/admin-v1/setup-banner";
import { VerificationBanner } from "@/components/admin-v1/verification-banner";
import { CrecheSetupModal } from "@/components/admin-v1/creche-setup-modal";

const STAT_ICONS = [Users, UserCheck, UserX];

export default function AdminV1DashboardPage() {
  const [setupOpen, setSetupOpen] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  const [year, setYear] = useState("This year");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-[#3B2513] focus:outline-none"
        >
          <option>This year</option>
          <option>Last year</option>
          <option>All time</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {DASHBOARD_STATS_V1.map((stat, i) => {
          const Icon = STAT_ICONS[i];
          return (
            <div
              key={stat.label}
              className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${stat.bgColor}`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {!setupComplete ? (
        <SetupBanner onOpenSetup={() => setSetupOpen(true)} />
      ) : (
        <VerificationBanner />
      )}

      <DashboardChart />

      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
        <div>
          <p className="text-sm font-semibold text-gray-800">Ringo Daycare</p>
          <p className="text-xs text-gray-500">sifid76874@luckfeed.com</p>
        </div>
      </div>

      <CrecheSetupModal
        open={setupOpen}
        onClose={() => setSetupOpen(false)}
        onComplete={() => {
          setSetupComplete(true);
          setSetupOpen(false);
        }}
      />
    </div>
  );
}
