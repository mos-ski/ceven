"use client";

import { useState } from "react";
import Link from "next/link";

export function TrialBannerV1() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="flex items-center justify-between gap-3 bg-indigo-600 px-4 py-2 text-white">
      <p className="text-xs font-medium">
        11 days left on your free trial — upgrade to keep AI insights and unlimited children.
      </p>
      <div className="flex items-center gap-3">
        <Link
          href="/admin/v1/plans-access"
          className="rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-indigo-600"
        >
          Choose a Plan
        </Link>
        <button
          type="button"
          aria-label="Dismiss trial banner"
          onClick={() => setDismissed(true)}
          className="text-white/80 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
