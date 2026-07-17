"use client";

import { Building2, Users, Smile, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { PLATFORM_STATS } from "@/lib/super-admin/mock-data";

const STATS = [
  { label: "Subscribed Creches", value: PLATFORM_STATS.organizationTenants, trend: "+18.2% vs last month", trendUp: true, icon: Building2, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Active Parents", value: 36, trend: "+20% vs last month", trendUp: true, icon: Users, color: "text-orange-500", bg: "bg-orange-50" },
  { label: "Active Creches", value: PLATFORM_STATS.organizationTenants, trend: "+18.2% vs last month", trendUp: true, icon: Building2, color: "text-slate-500", bg: "bg-slate-100" },
  { label: "Children Managed", value: PLATFORM_STATS.totalChildren, trend: "+22.7% vs last month", trendUp: true, icon: Smile, color: "text-emerald-600", bg: "bg-emerald-50" },
];

const CHART_DATA = Array.from({ length: 31 }, (_, i) => ({
  day: String(i + 1),
  creches: 13,
  parents: i < 15 ? 36 : 36 + Math.round((i - 15) * 0.6),
  children: 54,
}));

export default function GrowthTab() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="mb-1 font-[family-name:var(--font-urbanist)] text-lg font-bold text-heading">
          Platform Growth & Adoption
        </h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-card-border bg-white p-4">
              <div className="flex items-center gap-3">
                <div className={`flex size-10 items-center justify-center rounded-full ${stat.bg}`}>
                  <stat.icon className={`size-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="font-[family-name:var(--font-nunito)] text-xs text-muted-text">{stat.label}</p>
                  <p className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-stat-heading">
                    {stat.value}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1">
                <TrendingUp className="size-3 text-success-text" />
                <p className="font-[family-name:var(--font-nunito)] text-[10px] text-success-text">{stat.trend}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-card-border bg-white p-4">
        <p className="mb-4 font-[family-name:var(--font-urbanist)] text-sm font-bold text-heading">
          Platform Growth Trends
        </p>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={CHART_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" label={{ value: "Days", position: "insideBottom", offset: -5, fontSize: 12, fill: "#6B7280" }} tick={{ fontSize: 10, fill: "#6B7280" }} />
              <YAxis label={{ value: "Numbers", angle: -90, position: "insideLeft", fontSize: 12, fill: "#6B7280" }} tick={{ fontSize: 12, fill: "#6B7280" }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="creches" stroke="#10b981" strokeWidth={2} name="creches" dot={false} />
              <Line type="monotone" dataKey="parents" stroke="#f97316" strokeWidth={2} name="parents" dot={false} />
              <Line type="monotone" dataKey="children" stroke="#3B2513" strokeWidth={2} name="children" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
