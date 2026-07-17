"use client";

import { useState } from "react";
import Link from "next/link";
import {
  DASHBOARD_STATS,
  AI_DAILY_BRIEF,
  QUICK_ACTIONS,
  OVERDUE_INVOICES,
  ACTIVITY_FEED,
  ONBOARDING_STEPS_V1,
} from "@/lib/admin-v1/dashboard-data";

const ACTIVITY_DOT_COLOR: Record<string, string> = {
  enrolment: "bg-emerald-500",
  payment: "bg-amber-500",
  incident: "bg-red-500",
  staff: "bg-indigo-500",
  message: "bg-sky-500",
  task: "bg-slate-400",
};

const RISK_BADGE: Record<string, string> = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-amber-100 text-amber-700",
  Low: "bg-emerald-100 text-emerald-700",
};

export default function AdminV1DashboardPage() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([1, 2]);
  const progressPct = Math.round((completedSteps.length / ONBOARDING_STEPS_V1.length) * 100);

  return (
    <div className="flex flex-col gap-4">
      {/* 8 KPI stat cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {DASHBOARD_STATS.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-3">
            <p className="text-xs text-slate-500">{stat.label}</p>
            <p className="mt-1 text-xl font-bold text-slate-800">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          {/* AI daily brief */}
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs text-white">
                ✦
              </span>
              <p className="text-sm font-bold text-slate-800">Ada's Daily Brief</p>
              <span className="flex items-center gap-1 text-[10px] text-emerald-600">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                Generated {AI_DAILY_BRIEF.generatedAt}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {AI_DAILY_BRIEF.insights.map((insight, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2"
                >
                  <p className="text-xs text-slate-700">{insight.text}</p>
                  <button
                    type="button"
                    className="shrink-0 rounded-md bg-indigo-600 px-2.5 py-1 text-[11px] font-semibold text-white"
                  >
                    {insight.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="mb-3 text-sm font-bold text-slate-800">Quick Actions</p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
              {QUICK_ACTIONS.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex flex-col items-center gap-1.5 rounded-lg border border-slate-200 p-3 text-center hover:border-indigo-300 hover:bg-indigo-50"
                >
                  <span className="text-lg">＋</span>
                  <span className="text-[11px] font-medium text-slate-700">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Outstanding invoices */}
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-bold text-slate-800">Most Overdue Invoices</p>
              <Link href="/admin/v1/billing-payments" className="text-xs font-semibold text-indigo-600">
                View All
              </Link>
            </div>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400">
                  <th className="pb-2 font-medium">Child</th>
                  <th className="pb-2 font-medium">Parent</th>
                  <th className="pb-2 font-medium">Amount</th>
                  <th className="pb-2 font-medium">Days Overdue</th>
                  <th className="pb-2 font-medium">AI Risk</th>
                </tr>
              </thead>
              <tbody>
                {OVERDUE_INVOICES.map((row) => (
                  <tr key={row.id} className="border-t border-slate-100">
                    <td className="py-2 font-medium text-slate-700">{row.child}</td>
                    <td className="py-2 text-slate-500">{row.parent}</td>
                    <td className="py-2 text-slate-700">{row.amount}</td>
                    <td className={`py-2 ${row.daysOverdue > 7 ? "font-semibold text-red-600" : "text-slate-500"}`}>
                      {row.daysOverdue}d
                    </td>
                    <td className="py-2">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${RISK_BADGE[row.risk]}`}>
                        {row.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* Onboarding checklist */}
          {progressPct < 100 && (
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-bold text-slate-800">Getting Started</p>
                <span className="text-xs font-semibold text-indigo-600">{progressPct}%</span>
              </div>
              <div className="mb-3 h-1.5 w-full rounded-full bg-slate-100">
                <div
                  className="h-1.5 rounded-full bg-indigo-600 transition-all"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                {ONBOARDING_STEPS_V1.map((step) => {
                  const done = completedSteps.includes(step.id);
                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() =>
                        setCompletedSteps((prev) =>
                          done ? prev.filter((id) => id !== step.id) : [...prev, step.id]
                        )
                      }
                      className="flex items-center gap-2 text-left text-xs"
                    >
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[10px] ${
                          done ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-300 text-transparent"
                        }`}
                      >
                        ✓
                      </span>
                      <span className={done ? "text-slate-400 line-through" : "text-slate-700"}>
                        {step.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Activity feed */}
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="mb-3 text-sm font-bold text-slate-800">Live Activity</p>
            <div className="flex flex-col gap-3">
              {ACTIVITY_FEED.map((event) => (
                <div key={event.id} className="flex items-start gap-2">
                  <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${ACTIVITY_DOT_COLOR[event.type]}`} />
                  <div>
                    <p className="text-xs text-slate-700">{event.text}</p>
                    <p className="text-[10px] text-slate-400">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
