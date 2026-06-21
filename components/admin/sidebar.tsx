"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/components/admin/nav-items";
import { MOCK_ADMIN_USER } from "@/lib/mock-data/admin-user";

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Hamburger button — mobile only */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-bg text-sidebar-active-text lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col justify-between bg-sidebar-bg px-4 py-6 transition-transform duration-200 lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="mb-8 flex items-center justify-between px-2">
            <div>
              <span className="font-[family-name:var(--font-mogra)] text-xl text-sidebar-active-text">
                CEven
              </span>
              <span className="ml-2 font-[family-name:var(--font-urbanist)] text-xs text-sidebar-inactive-text">
                Main Admin
              </span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-md text-sidebar-inactive-text hover:text-sidebar-active-text lg:hidden"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
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
    </>
  );
}
