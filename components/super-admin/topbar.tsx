"use client";

import { usePathname } from "next/navigation";
import { NAV_GROUPS_SA } from "@/lib/super-admin/nav-items";

function useScreenTitle() {
  const pathname = usePathname();
  for (const group of NAV_GROUPS_SA) {
    const match = group.items.find((item) => item.href === pathname);
    if (match) return match.label;
  }
  return "Dashboard";
}

export function TopbarSA() {
  const title = useScreenTitle();

  return (
    <header className="flex h-[54px] shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4">
      <h1 className="text-sm font-bold text-slate-800">{title}</h1>

      <input
        type="search"
        placeholder="Search tenants..."
        className="hidden h-9 w-full max-w-sm rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 sm:block"
      />

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Notifications"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600"
        >
          🔔
        </button>
        <button
          type="button"
          className="hidden h-9 items-center rounded-lg bg-purple-600 px-3 text-sm font-semibold text-white sm:flex"
        >
          + New Tenant
        </button>
      </div>
    </header>
  );
}
