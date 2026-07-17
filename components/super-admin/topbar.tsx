"use client";

import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import { NAV_ITEMS_SA } from "@/lib/super-admin/nav-items";

function useScreenTitle() {
  const pathname = usePathname();
  const match = NAV_ITEMS_SA.find((item) => item.href === pathname);
  return match?.label ?? "Dashboard";
}

export function TopbarSA() {
  const title = useScreenTitle();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-input-border bg-content-bg px-4 lg:px-6">
      <h1 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-heading">
        {title}
      </h1>

      <div className="ml-auto flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-input-border bg-white text-heading"
        >
          <Bell className="size-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-full bg-[#edd9c0]">
            <span className="font-[family-name:var(--font-nunito)] text-xs font-bold text-brand-dark">CN</span>
          </div>
          <span className="hidden font-[family-name:var(--font-urbanist)] text-sm font-semibold text-heading lg:block">
            CEven Platform
          </span>
        </div>
      </div>
    </header>
  );
}
