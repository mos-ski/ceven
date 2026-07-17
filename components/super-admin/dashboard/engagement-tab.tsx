"use client";

import { Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ENGAGEMENT_STATS } from "@/lib/super-admin/mock-data";

const STATS = [
  { label: "Daily Logins", parents: ENGAGEMENT_STATS.daily.parents, caregivers: ENGAGEMENT_STATS.daily.caregivers, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Weekly Logins", parents: ENGAGEMENT_STATS.weekly.parents, caregivers: ENGAGEMENT_STATS.weekly.caregivers, color: "text-orange-500", bg: "bg-orange-50" },
  { label: "Monthly Logins", parents: ENGAGEMENT_STATS.monthly.parents, caregivers: ENGAGEMENT_STATS.monthly.caregivers, color: "text-emerald-600", bg: "bg-emerald-50" },
];

const CHART_DATA = Array.from({ length: 28 }, (_, i) => {
  const day = i + 1;
  let caregivers = 0;
  let parents = 0;
  if (day === 8) caregivers = 3;
  if (day === 12) caregivers = 7;
  if (day === 14) { caregivers = 4; parents = 35; }
  if (day === 15) { caregivers = 6; parents = 29; }
  if (day === 16) caregivers = 2;
  if (day === 24) caregivers = 1;
  return { day: String(day), Caregivers: caregivers, Parents: parents };
});

export default function EngagementTab() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="mb-1 font-[family-name:var(--font-urbanist)] text-lg font-bold text-heading">
          Activity & Engagement Metrics
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {STATS.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-card-border bg-white p-4">
              <div className="flex items-center gap-3">
                <div className={`flex size-10 items-center justify-center rounded-full ${stat.bg}`}>
                  <Activity className={`size-5 ${stat.color}`} />
                </div>
                <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-heading">
                  {stat.label}
                </p>
              </div>
              <div className="mt-4 flex gap-4">
                <div>
                  <p className="font-[family-name:var(--font-nunito)] text-[10px] text-muted-text">Parents %</p>
                  <p className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-stat-heading">
                    {stat.parents}%
                  </p>
                </div>
                <div className="border-l border-card-border pl-4">
                  <p className="font-[family-name:var(--font-nunito)] text-[10px] text-muted-text">Caregivers %</p>
                  <p className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-stat-heading">
                    {stat.caregivers}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-card-border bg-white p-4">
        <div className="mb-4">
          <p className="font-[family-name:var(--font-urbanist)] text-sm font-bold text-heading">
            User Login Frequency
          </p>
          <p className="font-[family-name:var(--font-nunito)] text-xs text-muted-text">
            Comparison of login patterns between caregivers and parents
          </p>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={CHART_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" label={{ value: "Days", position: "insideBottom", offset: -5, fontSize: 12, fill: "#6B7280" }} tick={{ fontSize: 10, fill: "#6B7280" }} />
              <YAxis label={{ value: "Numbers", angle: -90, position: "insideLeft", fontSize: 12, fill: "#6B7280" }} tick={{ fontSize: 12, fill: "#6B7280" }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Caregivers" fill="#10b981" radius={[2, 2, 0, 0]} />
              <Bar dataKey="Parents" fill="#f97316" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
