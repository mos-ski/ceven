"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ArrowUpDown, Download, Printer, ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";
import { APPROVED_CRECHES } from "@/lib/super-admin/mock-data";

const PAGE_SIZE = 10;

export default function CrechesPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filtered = APPROVED_CRECHES.filter((c) =>
    c.crecheName.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-heading">
        Creches
      </h1>

      <div className="rounded-xl border border-card-border bg-white p-4">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-full bg-emerald-50">
            <span className="font-[family-name:var(--font-merriweather)] text-sm font-bold text-emerald-600">
              {APPROVED_CRECHES.length}
            </span>
          </div>
          <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-heading">Total Creches</p>
        </div>
      </div>

      <div className="rounded-xl border border-card-border bg-white">
        <div className="flex flex-wrap items-center gap-3 border-b border-card-border p-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-text" />
            <input
              type="search"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search creches..."
              className="h-9 w-full rounded-lg border border-input-border bg-white pl-9 pr-3 font-[family-name:var(--font-nunito)] text-sm placeholder:text-muted-text focus:outline-none focus:ring-2 focus:ring-brand-accent"
            />
          </div>
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
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Phone Number</th>
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">State</th>
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Caregivers</th>
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Status</th>
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((creche) => (
                <tr key={creche.id} className="border-b border-table-border last:border-0 hover:bg-slate-50">
                  <td className="px-4 py-3"><input type="checkbox" className="rounded" /></td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-heading">{creche.requestDate}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm font-semibold text-heading">
                    <Link href={`/super-admin/creches/caregivers/${creche.id}`} className="hover:underline">
                      {creche.crecheName}
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-muted-text">{creche.email}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-heading">{creche.phone}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-heading">{creche.state}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-heading">{creche.caregiversCount}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-[#E1F5EC] px-2.5 py-0.5 font-[family-name:var(--font-nunito)] text-xs font-semibold text-[#009061]">
                      {creche.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setOpenMenu(openMenu === creche.id ? null : creche.id)}
                        className="text-muted-text hover:text-heading"
                      >
                        <MoreVertical className="size-5" />
                      </button>
                      {openMenu === creche.id && (
                        <div className="absolute right-0 top-8 z-10 w-40 rounded-lg border border-card-border bg-white py-1 shadow-lg">
                          <Link
                            href={`/super-admin/creches/caregivers/${creche.id}`}
                            className="block px-4 py-2 font-[family-name:var(--font-nunito)] text-sm text-heading hover:bg-slate-50"
                            onClick={() => setOpenMenu(null)}
                          >
                            View Details
                          </Link>
                          <Link
                            href={`/super-admin/creches/caregivers/${creche.id}`}
                            className="block px-4 py-2 font-[family-name:var(--font-nunito)] text-sm text-heading hover:bg-slate-50"
                            onClick={() => setOpenMenu(null)}
                          >
                            Caregivers
                          </Link>
                          <Link
                            href={`/super-admin/enrollment/${creche.id}`}
                            className="block px-4 py-2 font-[family-name:var(--font-nunito)] text-sm text-heading hover:bg-slate-50"
                            onClick={() => setOpenMenu(null)}
                          >
                            Rooms
                          </Link>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center font-[family-name:var(--font-nunito)] text-sm text-muted-text">
                    No creches found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-card-border px-4 py-3">
          <span className="font-[family-name:var(--font-nunito)] text-xs text-muted-text">10 per page</span>
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
