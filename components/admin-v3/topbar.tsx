"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Search, Bot, Bell } from "lucide-react";
import { NAV_SECTIONS } from "@/components/admin-v3/nav-items";
import { GlobalSearchModal } from "@/components/admin-v3/global-search-modal";
import { useAiPanel } from "@/components/admin-v3/ai-panel-context";

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
  const [searchOpen, setSearchOpen] = useState(false);
  const { open: aiOpen, pinned: aiPinned, toggle: toggleAi } = useAiPanel();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="flex h-[54px] shrink-0 items-center gap-3.5 bg-[#FFFCF4] px-4 lg:px-6">
        <div className="pl-12 flex flex-1 items-center gap-2 lg:pl-0">
          <h1 className="text-[15px] font-extrabold text-[#2D1810]">{currentTitle(pathname)}</h1>
          <span className="hidden rounded-full bg-gradient-to-r from-[#1E2D4A] to-[#C47B2C] px-2.5 py-1 text-[10px] font-extrabold tracking-wide text-white sm:inline">
            Nestling Pro
          </span>
        </div>

        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="hidden max-w-[260px] flex-1 items-center gap-2 rounded-lg border border-black/[0.12] bg-[#F5EDD8] px-3.5 py-1.5 text-left md:flex"
        >
          <Search className="h-3.5 w-3.5 shrink-0 text-[#2D1810]/50" />
          <span className="w-full shrink whitespace-nowrap bg-transparent text-[13px] text-[#2D1810]/40">Search anything…</span>
          <kbd className="ml-auto shrink-0 rounded border border-black/[0.1] bg-white/60 px-1.5 py-0.5 text-[10px] font-medium text-[#2D1810]/35">⌘K</kbd>
        </button>

        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          aria-label="Search"
          className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-lg border border-black/[0.12] bg-[#F5EDD8] text-[#2D1810] md:hidden"
        >
          <Search className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={toggleAi}
          aria-label="Assistant"
          aria-pressed={aiOpen || aiPinned}
          className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#1E2D4A] to-[#2D1810] text-[#F5EDD8] ${
            aiOpen || aiPinned ? "ring-2 ring-[#C47B2C] ring-offset-1 ring-offset-[#FFFCF4]" : ""
          }`}
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

      <GlobalSearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
