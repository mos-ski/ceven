"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Search, ArrowUpDown, Download, Printer, ChevronLeft, ChevronRight } from "lucide-react";
import { SUBSCRIPTION_PLANS, SUBSCRIBERS, SUBSCRIPTION_STATS } from "@/lib/super-admin/mock-data";

export default function SubscriptionDetailPage() {
  const params = useParams();
  const planId = params.id as string;
  const plan = SUBSCRIPTION_PLANS.find((p) => p.id === planId);

  if (!plan) {
    return (
      <div className="flex flex-col items-center gap-4 py-20">
        <p className="font-[family-name:var(--font-nunito)] text-lg text-muted-text">Plan not found.</p>
        <Link href="/super-admin/subscriptions" className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-brand-accent hover:underline">
          ← Back to Subscriptions
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Link href="/super-admin/subscriptions" className="flex items-center gap-1 font-[family-name:var(--font-nunito)] text-sm font-semibold text-brand-accent hover:underline">
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
            <p className="font-[family-name:var(--font-nunito)] text-xs text-muted-text">{stat.label}</p>
            <p className="mt-1 font-[family-name:var(--font-merriweather)] text-2xl font-bold text-stat-heading">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-card-border bg-white">
        <div className="border-b border-card-border p-4">
          <h2 className="font-[family-name:var(--font-urbanist)] text-sm font-bold text-heading">
            Subscribers — {plan.planName}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-b border-card-border p-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-text" />
            <input
              type="search"
              placeholder="Search subscribers..."
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
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Expiry Date</th>
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Creche Name</th>
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Enrolled Children</th>
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Revenue</th>
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Payment</th>
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Status</th>
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {SUBSCRIBERS.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex size-12 items-center justify-center rounded-full bg-slate-100">
                        <span className="text-2xl">📄</span>
                      </div>
                      <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-heading">
                        No Data Available Yet!
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                SUBSCRIBERS.map((sub) => (
                  <tr key={sub.id} className="border-b border-table-border last:border-0 hover:bg-slate-50">
                    <td className="px-4 py-3"><input type="checkbox" className="rounded" /></td>
                    <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-heading">{sub.expiryDate}</td>
                    <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm font-semibold text-heading">{sub.crecheName}</td>
                    <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-heading">{sub.enrolledChildren}</td>
                    <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-heading">{sub.revenue}</td>
                    <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-heading">{sub.payment}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 font-[family-name:var(--font-nunito)] text-xs font-semibold ${
                        sub.status === "active" ? "bg-[#E1F5EC] text-[#009061]" : "bg-red-50 text-red-600"
                      }`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button type="button" className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-brand-accent hover:underline">
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
          <span className="font-[family-name:var(--font-nunito)] text-xs text-muted-text">10 per page</span>
          <div className="flex items-center gap-1">
            <button type="button" className="flex size-8 items-center justify-center rounded-lg border border-card-border text-muted-text">
              <ChevronLeft className="size-4" />
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
