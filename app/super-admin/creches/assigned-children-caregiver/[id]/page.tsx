"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Search, ArrowUpDown, Download, Printer, ChevronLeft, ChevronRight } from "lucide-react";
import { ASSIGNED_CHILDREN, CAREGIVERS } from "@/lib/super-admin/mock-data";
import { exportRowsToCsv } from "@/lib/super-admin/export-csv";

const PAGE_SIZE = 10;

export default function AssignedChildrenPage() {
 const params = useParams();
 const caregiverId = params.id as string;
 const caregiver = CAREGIVERS.find((c) => c.id === caregiverId);
 const [search, setSearch] = useState("");
 const [page, setPage] = useState(1);
 const [oldestFirst, setOldestFirst] = useState(false);

 const filtered = ASSIGNED_CHILDREN.filter(
 (child) => child.childName.toLowerCase().includes(search.toLowerCase()) || child.parentName.toLowerCase().includes(search.toLowerCase())
 );
 const sorted = oldestFirst ? [...filtered].reverse() : filtered;
 const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
 const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

 const handleExport = () => {
 exportRowsToCsv(
  "assigned-children.csv",
  ["Assigned Date", "Parent Name", "Child Name", "Child Age", "Room"],
  sorted.map((child) => [child.assignedDate, child.parentName, child.childName, child.childAge, child.room])
 );
 };

 return (
 <div className="flex flex-col gap-4">
  <Link href="/super-admin/creches" className="flex items-center gap-1 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-brand-accent hover:underline">
  <ArrowLeft className="size-4" /> Back to Creches
  </Link>

  <div className="rounded-xl border border-black/[0.07] bg-white p-4">
  <div className="mb-1 flex items-center gap-2">
   <div className="flex size-8 items-center justify-center rounded-full bg-emerald-50">
   <span className="font-[family-name:var(--font-merriweather)] text-sm font-bold text-emerald-600">
    {ASSIGNED_CHILDREN.length}
   </span>
   </div>
   <p className="font-[family-name:var(--font-urbanist)] text-sm font-semibold text-heading">Assigned Children</p>
  </div>
  {caregiver && (
   <p className="font-[family-name:var(--font-urbanist)] text-xs text-muted-text">Caregiver: {caregiver.fullName}</p>
  )}
  </div>

  <div className="rounded-xl border border-black/[0.07] bg-white">
  <div className="flex flex-wrap items-center gap-3 border-b border-card-border p-4">
   <div className="relative flex-1">
   <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-text" />
   <input
    type="search"
    value={search}
    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
    placeholder="Search children..."
    className="h-9 w-full rounded-lg border border-input-border bg-white pl-9 pr-3 font-[family-name:var(--font-urbanist)] text-sm placeholder:text-muted-text focus:outline-none focus:ring-2 focus:ring-brand-accent"
   />
   </div>
   <button
   type="button"
   onClick={() => { setOldestFirst((v) => !v); setPage(1); }}
   className="flex h-9 items-center gap-1.5 rounded-lg border border-input-border bg-white px-3 font-[family-name:var(--font-urbanist)] text-sm text-heading"
   >
   <ArrowUpDown className="size-3.5" /> {oldestFirst ? "Oldest first" : "Newest first"}
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
    <th className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-xs font-semibold text-white">Assigned Date</th>
    <th className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-xs font-semibold text-white">Parent Name</th>
    <th className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-xs font-semibold text-white">Child Name</th>
    <th className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-xs font-semibold text-white">Child Age</th>
    <th className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-xs font-semibold text-white">Room</th>
    <th className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-xs font-semibold text-white">Action</th>
    </tr>
   </thead>
   <tbody>
    {paginated.map((child) => (
    <tr key={child.id} className="border-b border-table-border last:border-0 hover:bg-slate-50">
     <td className="px-4 py-3"><input type="checkbox" className="rounded" /></td>
     <td className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm text-heading">{child.assignedDate}</td>
     <td className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm text-heading">{child.parentName}</td>
     <td className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-heading">{child.childName}</td>
     <td className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm text-heading">{child.childAge}</td>
     <td className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm text-heading">{child.room}</td>
     <td className="px-4 py-3">
     <Link
      href={`/super-admin/creches/child/${child.id}`}
      className="font-[family-name:var(--font-urbanist)] text-sm font-semibold text-brand-accent hover:underline"
     >
      View Details
     </Link>
     </td>
    </tr>
    ))}
    {paginated.length === 0 && (
    <tr>
     <td colSpan={7} className="px-4 py-12 text-center font-[family-name:var(--font-urbanist)] text-sm text-muted-text">
     No assigned children found.
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
