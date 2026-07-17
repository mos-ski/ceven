"use client";

import { useState } from "react";
import { Search, ArrowUpDown, Download, Printer, ChevronLeft, ChevronRight } from "lucide-react";
import { PLATFORM_NOTIFICATIONS } from "@/lib/super-admin/mock-data";

export default function NotificationsPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-heading">
          Notifications
        </h1>
        <button
          type="button"
          className="rounded-lg bg-brand-dark px-4 py-2 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-white hover:bg-brand-dark/90"
        >
          New Notification
        </button>
      </div>

      <div className="rounded-xl border border-card-border bg-white p-4">
        <div className="mb-1 flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-full bg-blue-50">
            <span className="font-[family-name:var(--font-merriweather)] text-sm font-bold text-blue-600">
              0
            </span>
          </div>
          <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-heading">Total Activity Logs</p>
        </div>
      </div>

      <div className="rounded-xl border border-card-border bg-white">
        <div className="flex flex-wrap items-center gap-3 border-b border-card-border p-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-text" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notifications..."
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
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Date Created</th>
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Recipients</th>
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Title</th>
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Message</th>
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {PLATFORM_NOTIFICATIONS.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-16 text-center">
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
                PLATFORM_NOTIFICATIONS.map((notification) => (
                  <tr key={notification.id} className="border-b border-table-border last:border-0 hover:bg-slate-50">
                    <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-heading">{notification.time}</td>
                    <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-heading">All</td>
                    <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm font-semibold text-heading">{notification.title}</td>
                    <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-muted-text">{notification.message}</td>
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
