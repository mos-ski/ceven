"use client";

import { Bell } from "lucide-react";

export function TopbarV1() {
  const crecheName = "Ringo Daycare";

  return (
    <header className="flex h-[60px] shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex items-center gap-2">
        <span className="font-[family-name:var(--font-mogra)] text-xl font-bold text-[#3B2513]">
          CEven
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100"
        >
          <Bell className="h-5 w-5" />
        </button>
        <span className="text-sm font-semibold text-gray-800">{crecheName}</span>
      </div>
    </header>
  );
}
