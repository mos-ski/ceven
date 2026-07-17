"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, ArrowUpDown, Download, Printer, ChevronLeft, ChevronRight } from "lucide-react";
import { ENROLLMENT_REQUESTS, type EnrollmentRequest } from "@/lib/super-admin/mock-data";

const STATUS_BADGE: Record<string, string> = {
  pending: "bg-[#F9F1E6] text-[#FF9A01]",
  approved: "bg-[#E1F5EC] text-[#009061]",
  declined: "bg-red-50 text-red-600",
};

const PAGE_SIZE = 10;

export default function EnrollmentPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | EnrollmentRequest["status"]>("all");
  const [page, setPage] = useState(1);

  const filtered = ENROLLMENT_REQUESTS.filter((e) => {
    const matchesSearch = e.crecheName.toLowerCase().includes(search.toLowerCase()) || e.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const total = ENROLLMENT_REQUESTS.length;
  const pending = ENROLLMENT_REQUESTS.filter((e) => e.status === "pending").length;
  const approved = ENROLLMENT_REQUESTS.filter((e) => e.status === "approved").length;
  const declined = ENROLLMENT_REQUESTS.filter((e) => e.status === "declined").length;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-heading">
        Enrollment
      </h1>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Total Enrollment", value: total, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Pending Enrollment", value: pending, color: "text-orange-500", bg: "bg-orange-50" },
          { label: "Approved Enrollment", value: approved, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Declined Enrollment", value: declined, color: "text-red-500", bg: "bg-red-50" },
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
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by name or email..."
              className="h-9 w-full rounded-lg border border-input-border bg-white pl-9 pr-3 font-[family-name:var(--font-nunito)] text-sm placeholder:text-muted-text focus:outline-none focus:ring-2 focus:ring-brand-accent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value as typeof statusFilter); setPage(1); }}
            className="h-9 rounded-lg border border-input-border bg-white px-3 font-[family-name:var(--font-nunito)] text-sm text-heading focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="declined">Declined</option>
          </select>
          <button type="button" className="flex h-9 items-center gap-1.5 rounded-lg border border-input-border bg-white px-3 font-[family-name:var(--font-nunito)] text-sm text-heading">
            <ArrowUpDown className="size-3.5" /> Sort by
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
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Request Date</th>
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Creche Name</th>
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Email Address</th>
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Status</th>
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((enrollment) => (
                <tr key={enrollment.id} className="border-b border-table-border last:border-0 hover:bg-slate-50">
                  <td className="px-4 py-3"><input type="checkbox" className="rounded" /></td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-heading">{enrollment.requestDate}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm font-semibold text-heading">{enrollment.crecheName}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-muted-text">{enrollment.email}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 font-[family-name:var(--font-nunito)] text-xs font-semibold ${STATUS_BADGE[enrollment.status]}`}>
                      {enrollment.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/super-admin/enrollment/${enrollment.id}`}
                      className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-brand-accent hover:underline"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center font-[family-name:var(--font-nunito)] text-sm text-muted-text">
                    No enrollment requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-card-border px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="font-[family-name:var(--font-nunito)] text-xs text-muted-text">10 per page</span>
          </div>
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
                className={`flex size-8 items-center justify-center rounded-lg font-[family-name:var(--font-nunito)] text-xs font-semibold ${
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
