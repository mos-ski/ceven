"use client";

import { useState } from "react";
import Link from "next/link";
import { TENANTS, type TenantOwnerType } from "@/lib/super-admin/mock-data";

const STATUS_BADGE: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Trial: "bg-sky-100 text-sky-700",
  "Past Due": "bg-amber-100 text-amber-700",
  Suspended: "bg-red-100 text-red-700",
};

export default function TenantsPage() {
  const [ownerFilter, setOwnerFilter] = useState<TenantOwnerType | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = TENANTS.filter((t) => {
    const matchesOwner = ownerFilter === "all" || t.ownerType === ownerFilter;
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase());
    return matchesOwner && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tenants..."
          className="h-9 w-full max-w-xs rounded-lg border border-slate-200 bg-white px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <div className="flex gap-1 rounded-lg border border-slate-200 bg-white p-1">
          {(["all", "organization", "individual"] as const).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setOwnerFilter(opt)}
              className={`rounded-md px-3 py-1 text-xs font-medium ${
                ownerFilter === opt ? "bg-purple-600 text-white" : "text-slate-600"
              }`}
            >
              {opt === "all" ? "All" : opt === "organization" ? "Creches" : "Independent"}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs text-slate-400">
              <th className="px-4 py-3 font-medium">Tenant</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Plan</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Children</th>
              <th className="px-4 py-3 font-medium">MRR</th>
              <th className="px-4 py-3 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((tenant) => (
              <tr key={tenant.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                <td className="px-4 py-3">
                  <Link href={`/super-admin/tenants/${tenant.id}`} className="font-medium text-slate-800 hover:text-purple-600">
                    {tenant.name}
                  </Link>
                  <p className="text-xs text-slate-400">{tenant.location}</p>
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {tenant.ownerType === "organization" ? "Creche" : "Independent"}
                </td>
                <td className="px-4 py-3 text-slate-600">{tenant.plan}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_BADGE[tenant.status]}`}>
                    {tenant.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-600">{tenant.childrenCount}</td>
                <td className="px-4 py-3 text-slate-600">{tenant.mrr}</td>
                <td className="px-4 py-3 text-slate-500">{tenant.joinedDate}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-sm text-slate-400">
                  No tenants match this search/filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
