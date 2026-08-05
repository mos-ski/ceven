"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, X } from "lucide-react";

export function TrialBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="flex shrink-0 items-center gap-2 bg-[#2D1810] px-4 py-2 text-center text-xs text-[#F5EDD8]/80 lg:px-6">
      <Clock className="h-3.5 w-3.5 shrink-0 text-[#D4913F]" />
      <p className="min-w-0 flex-1 truncate">
        Your 14-day free trial ends in <strong className="text-[#FFD580]">9 days</strong>. After that, choose a plan to keep your crèche running without interruption.{" "}
        <Link href="/admin/v3/plans" className="font-bold text-[#D4913F] underline underline-offset-2 hover:text-[#FFD580]">
          Choose a Plan →
        </Link>
      </p>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="shrink-0 rounded p-0.5 text-[#F5EDD8]/40 hover:text-[#F5EDD8]/80"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
