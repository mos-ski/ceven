"use client";

import { DollarSign, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const STATS = [
  { label: "Monthly Recurring Revenue", value: "3", trend: "+20% vs last month", trendUp: true, icon: DollarSign, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Average Revenue Per Creche", value: "2", trend: "-2% vs last month", trendUp: false, icon: TrendingUp, color: "text-orange-500", bg: "bg-orange-50" },
  { label: "Churn Rate", value: "3", trend: "+12% vs last month", trendUp: true, icon: TrendingDown, color: "text-slate-500", bg: "bg-slate-100" },
  { label: "Subscription Tiers", value: "2", trend: "", trendUp: true, icon: BarChart3, color: "text-emerald-600", bg: "bg-emerald-50" },
];

const CHART_DATA = Array.from({ length: 31 }, (_, i) => ({
  day: String(i + 1),
  MRR: 4500 + Math.round(Math.sin(i * 0.5) * 300 + Math.random() * 200),
  ARPC: 1500,
}));

export default function FinancialsTab() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="mb-1 font-[family-name:var(--font-urbanist)] text-lg font-bold text-heading">
          Financial & Revenue Metrics
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
              {stat.trend && (
                <div className="mt-3 flex items-center gap-1">
                  {stat.trendUp ? (
                    <TrendingUp className="size-3 text-success-text" />
                  ) : (
                    <TrendingDown className="size-3 text-error" />
                  )}
                  <p className={`font-[family-name:var(--font-nunito)] text-[10px] ${stat.trendUp ? "text-success-text" : "text-error"}`}>
                    {stat.trend}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-card-border bg-white p-4">
        <p className="mb-4 font-[family-name:var(--font-urbanist)] text-sm font-bold text-heading">
          Revenue Growth Trend
        </p>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={CHART_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" label={{ value: "Days", position: "insideBottom", offset: -5, fontSize: 12, fill: "#6B7280" }} tick={{ fontSize: 10, fill: "#6B7280" }} />
              <YAxis label={{ value: "Amount", angle: -90, position: "insideLeft", fontSize: 12, fill: "#6B7280" }} tick={{ fontSize: 12, fill: "#6B7280" }} tickFormatter={(v) => `₦${(v / 1000).toFixed(0)},${String(v % 1000).padStart(3, "0")}`} />
              <Tooltip formatter={(value) => [`₦${Number(value).toLocaleString()}`, ""]} />
              <Legend />
              <Line type="monotone" dataKey="MRR" stroke="#3B2513" strokeWidth={2} name="MRR" dot={{ r: 3 }} />
              <Line type="monotone" dataKey="ARPC" stroke="#f97316" strokeWidth={2} name="ARPC" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
