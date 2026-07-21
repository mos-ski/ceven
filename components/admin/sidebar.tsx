"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  ChevronDown,
  Headphones,
  Home,
  Users,
  UserCog,
  ClipboardList,
  CreditCard,
  MessageSquare,
  Sparkles,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { NAV_ITEMS, type NavItem } from "@/components/admin/nav-items";
import { MOCK_ADMIN_USER } from "@/lib/mock-data/admin-user";

const ICONS: Record<NavItem["icon"], React.ComponentType<{ className?: string }>> = {
  home: Home,
  child: Users,
  staff: UserCog,
  "daily-ops": ClipboardList,
  finance: CreditCard,
  communication: MessageSquare,
  intelligence: Sparkles,
  account: Settings,
};

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSupport, setShowSupport] = useState(true);
  const [openGroup, setOpenGroup] = useState<string | null>(
    () => NAV_ITEMS.find((item) => item.subItems && pathname.startsWith(item.href))?.label ?? null
  );

  return (
    <>
      {/* Hamburger button — mobile only */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-dark text-sidebar-active-text lg:hidden"
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
        className={`fixed inset-y-0 left-0 z-50 flex w-[232px] shrink-0 flex-col gap-6 bg-white pt-6 transition-transform duration-200 lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-3.5">
          <div className="flex items-center gap-2">
            <span className="font-[family-name:var(--font-mogra)] text-xl text-brand-dark">
              CEven
            </span>
            <span className="font-[family-name:var(--font-urbanist)] text-[10px] font-medium text-[#9a6033]">
              Main Admin
            </span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-sidebar-inactive-text hover:text-brand-dark lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto px-3">
          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const Icon = ICONS[item.icon];
              const isSectionActive = pathname.startsWith(item.href);

              if (!item.subItems) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2.5 font-[family-name:var(--font-nunito)] text-sm font-semibold ${
                      isSectionActive
                        ? "bg-brand-dark text-sidebar-active-text"
                        : "text-sidebar-inactive-text hover:text-brand-dark"
                    }`}
                  >
                    <Icon className="size-5" />
                    {item.label}
                  </Link>
                );
              }

              const isOpen = openGroup === item.label;

              return (
                <div key={item.label} className="flex flex-col overflow-hidden rounded-lg">
                  <button
                    type="button"
                    onClick={() => setOpenGroup(isOpen ? null : item.label)}
                    className={`flex h-10 items-center justify-between rounded-lg px-3 py-2.5 font-[family-name:var(--font-nunito)] text-sm font-semibold ${
                      isSectionActive ? "text-brand-dark" : "text-sidebar-inactive-text"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="size-5" />
                      {item.label}
                    </span>
                    <ChevronDown
                      className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="flex flex-col">
                      {item.subItems.map((sub) => {
                        const isSubActive =
                          isSectionActive && (sub.tab ?? null) === (activeTab ?? null);
                        const href = sub.tab ? `${sub.href}?tab=${sub.tab}` : sub.href;

                        if (!sub.tab) {
                          return (
                            <button
                              key={sub.label}
                              onClick={() => {
                                router.push(href);
                                setMobileOpen(false);
                              }}
                              className={`h-10 rounded-lg py-2.5 pl-10 pr-2 text-left font-[family-name:var(--font-nunito)] text-sm ${
                                isSubActive
                                  ? "bg-brand-dark text-sidebar-active-text"
                                  : "text-sidebar-inactive-text"
                              }`}
                            >
                              <span className="flex items-center gap-1.5">
                                {sub.label}
                                {sub.isNew && (
                                  <span className="inline-flex shrink-0 items-center rounded-full bg-emerald-500 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wide text-white">
                                    New
                                  </span>
                                )}
                              </span>
                            </button>
                          );
                        }

                        return (
                          <Link
                            key={sub.label}
                            href={href}
                            onClick={() => setMobileOpen(false)}
                            className={`h-10 rounded-lg py-2.5 pl-10 pr-2 font-[family-name:var(--font-nunito)] text-sm ${
                              isSubActive
                                ? "bg-brand-dark text-sidebar-active-text"
                                : "text-sidebar-inactive-text"
                            }`}
                          >
                            <span className="flex items-center gap-1.5">
                              {sub.label}
                              {sub.isNew && (
                                <span className="inline-flex shrink-0 items-center rounded-full bg-emerald-500 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wide text-white">
                                  New
                                </span>
                              )}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-col gap-3 px-3 pb-4 pt-3">
          {showSupport && (
            <div className="flex flex-col gap-4 rounded-lg border border-[#edd9c0] p-3">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Headphones className="size-5 text-[#262626]" />
                    <p className="font-[family-name:var(--font-nunito)] text-sm text-[#262626]">
                      Need Support?
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label="Dismiss support card"
                    onClick={() => setShowSupport(false)}
                    className="text-[#525252] hover:text-brand-dark"
                  >
                    <X className="size-5" />
                  </button>
                </div>
                <p className="font-[family-name:var(--font-nunito)] text-xs text-[#525252]">
                  Get help from one of our experts
                </p>
              </div>
              <button
                type="button"
                className="w-full rounded-lg border border-brand-dark bg-white py-2 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-brand-dark shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
              >
                Get Help
              </button>
            </div>
          )}
          <div className="flex items-center gap-3 rounded-lg bg-[#faf2e1] px-3 py-2">
            <div className="flex size-8 items-center justify-center overflow-hidden rounded-full bg-[#edd9c0]">
              <span className="font-[family-name:var(--font-nunito)] text-xs font-bold text-brand-dark">
                {MOCK_ADMIN_USER.name
                  .split(" ")
                  .map((p) => p[0])
                  .join("")}
              </span>
            </div>
            <div className="flex flex-col">
              <p className="font-[family-name:var(--font-nunito)] text-xs font-semibold text-[#0a0a0a]">
                {MOCK_ADMIN_USER.name}
              </p>
              <p className="font-[family-name:var(--font-nunito)] text-[10px] text-[#525252]">
                {MOCK_ADMIN_USER.email}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
