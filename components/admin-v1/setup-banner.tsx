"use client";

import { FileText } from "lucide-react";

type SetupBannerProps = {
  onOpenSetup: () => void;
};

export function SetupBanner({ onOpenSetup }: SetupBannerProps) {
  return (
    <div className="rounded-xl bg-[#3B2513] p-6 text-white">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold">Complete Creche Account Setup</h3>
          <p className="mt-1 text-sm text-white/70">
            Update your details to unlock all features and provide a smoother experience.
          </p>
          <button
            type="button"
            onClick={onOpenSetup}
            className="mt-4 rounded-lg border border-white/30 bg-transparent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Complete Setup
          </button>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
          <FileText className="h-6 w-6 text-white/80" />
        </div>
      </div>
    </div>
  );
}
