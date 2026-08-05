"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Search, ArrowUpDown, Download, Printer, ChevronLeft, ChevronRight, FileText, X } from "lucide-react";
import { SUBSCRIPTION_PLANS, SUBSCRIBERS, SUBSCRIPTION_STATS, type Subscriber } from "@/lib/super-admin/mock-data";
import { exportRowsToCsv } from "@/lib/super-admin/export-csv";

const PAGE_SIZE = 10;

export default function SubscriptionDetailPage() {
  const params = useParams();
  const planId = params.id as string;
  const plan = SUBSCRIPTION_PLANS.find((p) => p.id === planId);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [oldestFirst, setOldestFirst] = useState(false);
  const [viewSubscriber, setViewSubscriber] = useState<Subscriber | null>(null);

  if (!plan) {
    return (
      <div className="flex flex-col items-center gap-4 py-20">
        <p className="font-[family-name:var(--font-urbanist)] text-lg text-muted-text">Plan not found.</p>
        <Link href="/super-admin/subscriptions" className="font-[family-name:var(--font-urbanist)] text-sm font-semibold text-brand-accent hover:underline">
          ← Back to Subscriptions
        </Link>
      </div>
    );
  }

  const filtered = SUBSCRIBERS.filter((s) => s.crecheName.toLowerCase().includes(search.toLowerCase()));
  const sorted = oldestFirst ? [...filtered].reverse() : filtered;
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleExport = () => {
    exportRowsToCsv(
      `${plan.planName.toLowerCase().replace(/\s+/g, "-")}-subscribers.csv`,
      ["Expiry Date", "Creche Name", "Enrolled Children", "Revenue", "Payment", "Status"],
      sorted.map((s) => [s.expiryDate, s.crecheName, s.enrolledChildren, s.revenue, s.payment, s.status])
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Link href="/super-admin/subscriptions" className="flex items-center gap-1 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-brand-accent hover:underline">
        <ArrowLeft className="size-4" /> Back to Subscriptions
      </Link>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Total Creches", value: SUBSCRIPTION_STATS.totalCreches },
          { label: "Monthly Revenue", value: SUBSCRIPTION_STATS.monthlyRevenue },
          { label: "Active Subscriptions", value: SUBSCRIPTION_STATS.activeSubscriptions },
          { label: "Expired/Overdue", value: SUBSCRIPTION_STATS.expiredOverdue },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-card-border bg-white p-4">
            <p className="font-[family-name:var(--font-urbanist)] text-xs text-muted-text">{stat.label}</p>
            <p className="mt-1 font-[family-name:var(--font-merriweather)] text-2xl font-bold text-stat-heading">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-card-border bg-white">
        <div className="border-b border-card-border p-4">
          <h2 className="font-[family-name:var(--font-urbanist)] text-sm font-bold text-heading">
            Subscribers for {plan.planName}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-b border-card-border p-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-text" />
            <input
              type="search"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search subscribers..."
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
                <th className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-xs font-semibold text-white">Expiry Date</th>
                <th className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-xs font-semibold text-white">Creche Name</th>
                <th className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-xs font-semibold text-white">Enrolled Children</th>
                <th className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-xs font-semibold text-white">Revenue</th>
                <th className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-xs font-semibold text-white">Payment</th>
                <th className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-xs font-semibold text-white">Status</th>
                <th className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-xs font-semibold text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex size-12 items-center justify-center rounded-full bg-slate-100">
                        <FileText className="size-6 text-slate-400" />
                      </div>
                      <p className="font-[family-name:var(--font-urbanist)] text-sm font-semibold text-heading">
                        No Data Available Yet!
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((sub) => (
                  <tr key={sub.id} className="border-b border-table-border last:border-0 hover:bg-slate-50">
                    <td className="px-4 py-3"><input type="checkbox" className="rounded" /></td>
                    <td className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm text-heading">{sub.expiryDate}</td>
                    <td className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-heading">{sub.crecheName}</td>
                    <td className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm text-heading">{sub.enrolledChildren}</td>
                    <td className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm text-heading">{sub.revenue}</td>
                    <td className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm text-heading">{sub.payment}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 font-[family-name:var(--font-urbanist)] text-xs font-semibold ${
                        sub.status === "active" ? "bg-[#E1F5EC] text-[#009061]" : "bg-red-50 text-red-600"
                      }`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => setViewSubscriber(sub)}
                        className="font-[family-name:var(--font-urbanist)] text-sm font-semibold text-brand-accent hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
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

      {viewSubscriber && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <button
              type="button"
              onClick={() => setViewSubscriber(null)}
              className="absolute right-3 top-3 text-muted-text hover:text-heading"
            >
              <X className="size-5" />
            </button>
            <h3 className="mb-4 font-[family-name:var(--font-merriweather)] text-lg font-bold text-heading">
              {viewSubscriber.crecheName}
            </h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between rounded-lg border border-card-border p-3">
                <p className="font-[family-name:var(--font-urbanist)] text-sm text-heading">Expiry Date</p>
                <p className="font-[family-name:var(--font-urbanist)] text-sm font-semibold text-heading">{viewSubscriber.expiryDate}</p>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-card-border p-3">
                <p className="font-[family-name:var(--font-urbanist)] text-sm text-heading">Enrolled Children</p>
                <p className="font-[family-name:var(--font-urbanist)] text-sm font-semibold text-heading">{viewSubscriber.enrolledChildren}</p>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-card-border p-3">
                <p className="font-[family-name:var(--font-urbanist)] text-sm text-heading">Revenue</p>
                <p className="font-[family-name:var(--font-merriweather)] text-sm font-bold text-stat-heading">{viewSubscriber.revenue}</p>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-card-border p-3">
                <p className="font-[family-name:var(--font-urbanist)] text-sm text-heading">Payment</p>
                <p className="font-[family-name:var(--font-urbanist)] text-sm font-semibold text-heading">{viewSubscriber.payment}</p>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-card-border p-3">
                <p className="font-[family-name:var(--font-urbanist)] text-sm text-heading">Status</p>
                <p className="font-[family-name:var(--font-urbanist)] text-sm font-semibold text-heading">{viewSubscriber.status}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
