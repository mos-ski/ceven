"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ArrowUpDown, Download, Printer, ChevronLeft, ChevronRight } from "lucide-react";
import { SUBSCRIPTION_PLANS, SUBSCRIPTION_STATS } from "@/lib/super-admin/mock-data";
import { exportRowsToCsv } from "@/lib/super-admin/export-csv";

const STATUS_BADGE: Record<string, string> = {
  active: "bg-[#E1F5EC] text-[#009061]",
  inactive: "bg-red-50 text-red-600",
};

const PAGE_SIZE = 10;

export default function SubscriptionsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [oldestFirst, setOldestFirst] = useState(false);

  const filtered = SUBSCRIPTION_PLANS.filter((s) =>
    s.planName.toLowerCase().includes(search.toLowerCase())
  );
  const sorted = oldestFirst ? [...filtered].reverse() : filtered;
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleExport = () => {
    exportRowsToCsv(
      "subscription-plans.csv",
      ["Date Created", "Plan Name", "Duration", "Subscribers", "Recipient", "Revenue", "Status"],
      sorted.map((p) => [p.dateCreated, p.planName, p.duration.join("/"), p.subscribers, p.recipient, p.revenue, p.status])
    );
  };

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
            <p className="font-[family-name:var(--font-urbanist)] text-xs text-muted-text">{stat.label}</p>
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
              className="h-9 w-full rounded-lg border border-input-border bg-white pl-9 pr-3 font-[family-name:var(--font-urbanist)] text-sm placeholder:text-muted-text focus:outline-none focus:ring-2 focus:ring-brand-accent"
            />
          </div>
          <button
            type="button"
            onClick={() => { setOldestFirst((v) => !v); setPage(1); }}
            className="flex h-9 items-center gap-1.5 rounded-lg border border-input-border bg-white px-3 font-[family-name:var(--font-urbanist)] text-sm text-heading"
          >
            <ArrowUpDown className="size-3.5" /> Sort by: {oldestFirst ? "Oldest" : "Most recent"}
          </button>
          <button
            type="button"
            onClick={handleExport}
            className="flex h-9 items-center gap-1.5 rounded-lg border border-input-border bg-white px-3 font-[family-name:var(--font-urbanist)] text-sm text-heading"
          >
            <Download className="size-3.5" /> Export as
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex h-9 items-center gap-1.5 rounded-lg border border-input-border bg-white px-3 font-[family-name:var(--font-urbanist)] text-sm text-heading"
          >
            <Printer className="size-3.5" /> Print
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-table-header-bg">
                <th className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-xs font-semibold text-white">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-xs font-semibold text-white">Date Created</th>
                <th className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-xs font-semibold text-white">Plan Name</th>
                <th className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-xs font-semibold text-white">Duration</th>
                <th className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-xs font-semibold text-white">Subscribers</th>
                <th className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-xs font-semibold text-white">Recipient</th>
                <th className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-xs font-semibold text-white">Revenue</th>
                <th className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-xs font-semibold text-white">Status</th>
                <th className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-xs font-semibold text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((plan) => (
                <tr key={plan.id} className="border-b border-table-border last:border-0 hover:bg-slate-50">
                  <td className="px-4 py-3"><input type="checkbox" className="rounded" /></td>
                  <td className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm text-heading">{plan.dateCreated}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-heading">{plan.planName}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm text-heading">{plan.duration.join(", ")}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm text-heading">{plan.subscribers}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm text-heading">{plan.recipient}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm text-heading">{plan.revenue}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 font-[family-name:var(--font-urbanist)] text-xs font-semibold ${STATUS_BADGE[plan.status]}`}>
                      {plan.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/super-admin/subscriptions/${plan.id}`}
                      className="font-[family-name:var(--font-urbanist)] text-sm font-semibold text-brand-accent hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center font-[family-name:var(--font-urbanist)] text-sm text-muted-text">
                    No subscription plans found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-card-border px-4 py-3">
          <span className="font-[family-name:var(--font-urbanist)] text-xs text-muted-text">10 per page</span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex size-8 items-center justify-center rounded-lg border border-card-border text-muted-text hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronLeft className="size-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                className={`flex size-8 items-center justify-center rounded-lg font-[family-name:var(--font-urbanist)] text-xs font-semibold ${
                  p === page ? "bg-brand-dark text-white" : "border border-card-border text-heading hover:bg-slate-50"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex size-8 items-center justify-center rounded-lg border border-card-border text-muted-text hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
