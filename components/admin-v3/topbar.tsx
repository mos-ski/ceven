"use client";

import { usePathname } from "next/navigation";
import { Search, Bot, Bell } from "lucide-react";
import { NAV_SECTIONS } from "@/components/admin-v3/nav-items";

function currentTitle(pathname: string): string {
  for (const section of NAV_SECTIONS) {
    for (const item of section.items) {
      if (pathname.startsWith(item.href)) return item.label;
    }
  }
  return "Dashboard";
}

export function TopbarV3() {
  const pathname = usePathname();

  return (
    <header className="flex h-[54px] shrink-0 items-center gap-3.5 border-b border-black/[0.07] bg-[#FFFCF4] px-4 lg:px-6">
      <div className="pl-12 flex flex-1 items-center gap-2 lg:pl-0">
        <h1 className="text-[15px] font-extrabold text-[#2D1810]">{currentTitle(pathname)}</h1>
        <span className="hidden rounded-full bg-gradient-to-r from-[#1E2D4A] to-[#C47B2C] px-2.5 py-1 text-[10px] font-extrabold tracking-wide text-white sm:inline">
          Nestling Pro
        </span>
      </div>

      <div className="hidden max-w-[260px] flex-1 items-center gap-2 rounded-lg border border-black/[0.12] bg-[#F5EDD8] px-3.5 py-1.5 md:flex">
        <Search className="h-3.5 w-3.5 shrink-0 text-[#2D1810]/50" />
        <input
          placeholder="Search children, parents, staff, invoice…"
          className="w-full bg-transparent text-[13px] text-[#2D1810] placeholder:text-[#2D1810]/40 focus:outline-none"
        />
      </div>

      <button
        type="button"
        aria-label="AI assistant"
        className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#1E2D4A] to-[#2D1810] text-[#F5EDD8]"
      >
        <Bot className="h-4 w-4" />
      </button>

      <button
        type="button"
        aria-label="Notifications"
        className="relative flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-lg border border-black/[0.12] bg-[#F5EDD8] text-[#2D1810]"
      >
        <Bell className="h-4 w-4" />
        <span className="absolute right-1 top-1 h-[7px] w-[7px] rounded-full border border-[#FFFCF4] bg-[#D4522F]" />
      </button>
    </header>
  );
}
