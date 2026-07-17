"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ArrowUpDown, Download, Printer, ChevronLeft, ChevronRight } from "lucide-react";
import { SUBSCRIPTION_PLANS, SUBSCRIPTION_STATS } from "@/lib/super-admin/mock-data";

const STATUS_BADGE: Record<string, string> = {
  active: "bg-[#E1F5EC] text-[#009061]",
  inactive: "bg-red-50 text-red-600",
};

export default function SubscriptionsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = SUBSCRIPTION_PLANS.filter((s) =>
    s.planName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-heading">
        Subscription Management
      </h1>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Total Creches", value: SUBSCRIPTION_STATS.totalCreches, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Monthly Revenue", value: SUBSCRIPTION_STATS.monthlyRevenue, color: "text-orange-500", bg: "bg-orange-50" },
          { label: "Active Subscriptions", value: SUBSCRIPTION_STATS.activeSubscriptions, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Expired/Overdue", value: SUBSCRIPTION_STATS.expiredOverdue, color: "text-red-500", bg: "bg-red-50" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-card-border bg-white p-4">
            <p className="font-[family-name:var(--font-nunito)] text-xs text-muted-text">{stat.label}</p>
            <p className={`mt-1 font-[family-name:var(--font-merriweather)] text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-card-border bg-white">
        <div className="flex flex-wrap items-center gap-3 border-b border-card-border p-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-text" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search plans..."
              className="h-9 w-full rounded-lg border border-input-border bg-white pl-9 pr-3 font-[family-name:var(--font-nunito)] text-sm placeholder:text-muted-text focus:outline-none focus:ring-2 focus:ring-brand-accent"
            />
          </div>
          <button type="button" className="flex h-9 items-center gap-1.5 rounded-lg border border-input-border bg-white px-3 font-[family-name:var(--font-nunito)] text-sm text-heading">
            <ArrowUpDown className="size-3.5" /> Sort by: Most recent
          </button>
          <button type="button" className="flex h-9 items-center gap-1.5 rounded-lg border border-input-border bg-white px-3 font-[family-name:var(--font-nunito)] text-sm text-heading">
            <Download className="size-3.5" /> Export as
          </button>
          <button type="button" className="flex h-9 items-center gap-1.5 rounded-lg border border-input-border bg-white px-3 font-[family-name:var(--font-nunito)] text-sm text-heading">
            <Printer className="size-3.5" /> Print
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-table-header-bg">
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Date Created</th>
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Plan Name</th>
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Duration</th>
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Subscribers</th>
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Recipient</th>
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Revenue</th>
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Status</th>
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((plan) => (
                <tr key={plan.id} className="border-b border-table-border last:border-0 hover:bg-slate-50">
                  <td className="px-4 py-3"><input type="checkbox" className="rounded" /></td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-heading">{plan.dateCreated}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm font-semibold text-heading">{plan.planName}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-heading">{plan.duration.join(", ")}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-heading">{plan.subscribers}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-heading">{plan.recipient}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-heading">{plan.revenue}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 font-[family-name:var(--font-nunito)] text-xs font-semibold ${STATUS_BADGE[plan.status]}`}>
                      {plan.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/super-admin/subscriptions/${plan.id}`}
                      className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-brand-accent hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center font-[family-name:var(--font-nunito)] text-sm text-muted-text">
                    No subscription plans found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-card-border px-4 py-3">
          <span className="font-[family-name:var(--font-nunito)] text-xs text-muted-text">10 per page</span>
          <div className="flex items-center gap-1">
            <button type="button" className="flex size-8 items-center justify-center rounded-lg border border-card-border text-muted-text">
              <ChevronLeft className="size-4" />
            </button>
            <button type="button" className="flex size-8 items-center justify-center rounded-lg bg-brand-dark font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">
              1
            </button>
            <button type="button" className="flex size-8 items-center justify-center rounded-lg border border-card-border text-muted-text">
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
