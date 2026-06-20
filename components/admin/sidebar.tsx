"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/components/admin/nav-items";
import { MOCK_ADMIN_USER } from "@/lib/mock-data/admin-user";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[280px] flex-col justify-between bg-sidebar-bg px-4 py-6">
      <div>
        <div className="mb-8 px-2">
          <span className="font-[family-name:var(--font-mogra)] text-xl text-sidebar-active-text">
            CEven
          </span>
          <span className="ml-2 font-[family-name:var(--font-urbanist)] text-xs text-sidebar-inactive-text">
            Main Admin
          </span>
        </div>

        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-lg px-3 py-2 font-[family-name:var(--font-urbanist)] text-sm ${
                  isActive
                    ? "bg-sidebar-active-bg text-sidebar-active-text"
                    : "text-sidebar-inactive-text hover:text-sidebar-active-text"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg bg-sidebar-active-bg p-4">
          <p className="font-[family-name:var(--font-urbanist)] text-sm font-semibold text-sidebar-active-text">
            Need Support?
          </p>
          <p className="font-[family-name:var(--font-urbanist)] text-xs text-sidebar-inactive-text">
            Get Help
          </p>
        </div>
        <div className="px-2">
          <p className="font-[family-name:var(--font-urbanist)] text-sm font-medium text-sidebar-active-text">
            {MOCK_ADMIN_USER.name}
          </p>
          <p className="font-[family-name:var(--font-urbanist)] text-xs text-sidebar-inactive-text">
            {MOCK_ADMIN_USER.email}
          </p>
        </div>
      </div>
    </aside>
  );
}
