"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronUp } from "lucide-react";

export function SystemAlertWidget() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-40 lg:bottom-6 lg:right-6">
      {collapsed ? (
        <button
          onClick={() => setCollapsed(false)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#1E2D4A] to-[#2D1810] text-[#F5EDD8] shadow-lg transition-transform hover:scale-105"
          aria-label="Expand alerts"
        >
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
          </span>
        </button>
      ) : (
        <div className="w-[280px] overflow-hidden rounded-2xl border border-[#C47B2C]/20 bg-gradient-to-br from-[#1E2D4A] to-[#2D1810] shadow-xl">
          <div className="flex items-center justify-between px-4 pt-3.5">
            <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/55">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
              System
            </p>
            <button
              onClick={() => setCollapsed(true)}
              className="rounded-md p-0.5 text-white/40 hover:text-white/70"
              aria-label="Collapse"
            >
              <ChevronUp className="h-3.5 w-3.5" />
            </button>
          </div>
          <Link href="/admin/v3/ai-command-center" className="block px-4 pb-4 pt-2">
            <p className="text-[13px] font-semibold leading-snug text-white">
              3 issues need your attention today
            </p>
            <p className="mt-1.5 text-[11px] text-white/60">1 welfare flag · 2 payment risks</p>
          </Link>
        </div>
      )}
    </div>
  );
}
