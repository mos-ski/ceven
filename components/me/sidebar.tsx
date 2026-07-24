"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid, CreditCard, FileText, Receipt, ScrollText, Wallet, Users, Car, Menu, X,
} from "lucide-react";

export const NAV_ITEMS = [
  { label: "Overview", href: "/me", icon: LayoutGrid },
  { label: "Membership", href: "/me/membership", icon: CreditCard },
  { label: "School Fees", href: "/me/fees", icon: FileText },
  { label: "Acceptance Fees", href: "/me/acceptance-fees", icon: FileText },
  { label: "Payment History", href: "/me/payment-history", icon: Receipt },
  { label: "Receipts", href: "/me/receipts", icon: ScrollText },
  { label: "Payment Methods", href: "/me/payment-methods", icon: Wallet },
  { label: "Family", href: "/me/family", icon: Users },
  { label: "Pickups", href: "/me/pickups", icon: Car },
] as const;

export function MeSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-cg-brand text-white lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[240px] shrink-0 flex-col gap-6 bg-white pt-6 shadow-sm transition-transform duration-200 lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5">
          <span className="font-[family-name:var(--font-mogra-import)] text-xl text-cg-brand">CEven</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 hover:text-cg-brand lg:hidden"
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const isActive = href === "/me" ? pathname === "/me" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                  isActive ? "bg-cg-brand text-white" : "text-gray-500 hover:text-cg-brand"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-5">
          <Link
            href="/parent/home"
            className="block rounded-lg border border-gray-100 px-3 py-2.5 text-center text-xs font-semibold text-gray-500 hover:text-cg-brand"
          >
            ← Back to app
          </Link>
        </div>
      </aside>
    </>
  );
}
