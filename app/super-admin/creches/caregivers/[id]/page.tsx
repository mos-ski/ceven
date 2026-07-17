"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Search, ArrowUpDown, Download, Printer, ChevronLeft, ChevronRight } from "lucide-react";
import { CAREGIVERS, APPROVED_CRECHES } from "@/lib/super-admin/mock-data";

const STATUS_BADGE: Record<string, string> = {
  active: "bg-[#E1F5EC] text-[#009061]",
  inactive: "bg-red-50 text-red-600",
};

export default function CaregiversPage() {
  const params = useParams();
  const crecheId = params.id as string;
  const creche = APPROVED_CRECHES.find((c) => c.id === crecheId);

  return (
    <div className="flex flex-col gap-4">
      <Link href="/super-admin/creches" className="flex items-center gap-1 font-[family-name:var(--font-nunito)] text-sm font-semibold text-brand-accent hover:underline">
        <ArrowLeft className="size-4" /> Back to Creches
      </Link>

      <div className="rounded-xl border border-card-border bg-white p-4">
        <div className="mb-1 flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-full bg-emerald-50">
            <span className="font-[family-name:var(--font-merriweather)] text-sm font-bold text-emerald-600">
              {CAREGIVERS.length}
            </span>
          </div>
          <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-heading">Total Caregivers</p>
        </div>
        {creche && (
          <p className="font-[family-name:var(--font-nunito)] text-xs text-muted-text">{creche.crecheName}</p>
        )}
      </div>

      <div className="rounded-xl border border-card-border bg-white">
        <div className="flex flex-wrap items-center gap-3 border-b border-card-border p-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-text" />
            <input
              type="search"
              placeholder="Search caregivers..."
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
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Full Name</th>
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Email</th>
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Assigned Children</th>
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Phone Number</th>
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Status</th>
                <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {CAREGIVERS.map((cg) => (
                <tr key={cg.id} className="border-b border-table-border last:border-0 hover:bg-slate-50">
                  <td className="px-4 py-3"><input type="checkbox" className="rounded" /></td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm font-semibold text-heading">{cg.fullName}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-muted-text">{cg.email}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-heading">{cg.assignedChildren}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-heading">{cg.phoneNumber}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 font-[family-name:var(--font-nunito)] text-xs font-semibold ${STATUS_BADGE[cg.status]}`}>
                      {cg.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/super-admin/creches/assigned-children-caregiver/${cg.id}`}
                      className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-brand-accent hover:underline"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
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
