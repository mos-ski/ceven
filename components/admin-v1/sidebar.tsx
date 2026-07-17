"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_GROUPS_V1 } from "@/lib/admin-v1/nav-items";
import { MOCK_ADMIN_USER } from "@/lib/mock-data/admin-user";

export function SidebarV1() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[236px] shrink-0 flex-col overflow-y-auto border-r border-slate-800 bg-slate-900">
      <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-4">
        <span className="text-base font-bold text-white">CEven Admin</span>
        <span className="rounded bg-indigo-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-300">
          v1
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-4 px-2 py-4">
        {NAV_GROUPS_V1.map((group) => (
          <div key={group.label}>
            <p className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              {group.label}
            </p>
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-md px-2 py-1.5 text-[13px] font-medium transition-colors ${
                      isActive
                        ? "bg-indigo-600 text-white"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="flex items-center gap-2 border-t border-slate-800 px-3 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold text-white">
          {MOCK_ADMIN_USER.name
            .split(" ")
            .map((p) => p[0])
            .join("")}
        </div>
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-white">{MOCK_ADMIN_USER.name}</p>
          <p className="truncate text-[10px] text-slate-400">{MOCK_ADMIN_USER.email}</p>
        </div>
      </div>
    </aside>
  );
}
