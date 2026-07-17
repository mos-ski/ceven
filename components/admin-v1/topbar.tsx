"use client";

import { usePathname } from "next/navigation";
import { NAV_GROUPS_V1 } from "@/lib/admin-v1/nav-items";

function useScreenTitle() {
  const pathname = usePathname();
  for (const group of NAV_GROUPS_V1) {
    const match = group.items.find((item) => item.href === pathname);
    if (match) return match.label;
  }
  return "Dashboard";
}

export function TopbarV1({
  aiPanelOpen,
  onToggleAIPanel,
}: {
  aiPanelOpen: boolean;
  onToggleAIPanel: () => void;
}) {
  const title = useScreenTitle();

  return (
    <header className="flex h-[54px] shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4">
      <div className="flex items-center gap-2">
        <h1 className="text-sm font-bold text-slate-800">{title}</h1>
        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
          14-Day Trial
        </span>
      </div>

      <input
        type="search"
        placeholder="Search..."
        className="hidden h-9 w-full max-w-sm rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:block"
      />

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleAIPanel}
          aria-pressed={aiPanelOpen}
          aria-label="Toggle Ada AI panel"
          className={`flex h-9 w-9 items-center justify-center rounded-full text-sm ${
            aiPanelOpen ? "bg-indigo-600 text-white" : "border border-slate-200 bg-white text-slate-600"
          }`}
        >
          ✦
        </button>
        <button
          type="button"
          aria-label="Notifications"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600"
        >
          🔔
        </button>
        <button
          type="button"
          className="hidden h-9 items-center rounded-lg bg-indigo-600 px-3 text-sm font-semibold text-white sm:flex"
        >
          + Quick Add
        </button>
      </div>
    </header>
  );
}
