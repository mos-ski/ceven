"use client";

import { FileText } from "lucide-react";

export function VerificationBanner() {
  return (
    <div className="rounded-xl bg-[#3B2513] p-6 text-white">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold">Creche Account Verification</h3>
            <span className="rounded-full bg-white/20 px-3 py-0.5 text-xs font-medium text-white">
              pending
            </span>
          </div>
          <p className="mt-1 text-sm text-white/70">
            Update your details to unlock all features and provide a smoother experience.
          </p>
          <button
            type="button"
            className="mt-4 rounded-lg border border-white/30 bg-transparent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            View Account
          </button>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
          <FileText className="h-6 w-6 text-white/80" />
        </div>
      </div>
    </div>
  );
}
