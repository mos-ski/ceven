"use client";

import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export function TrialGateBanner({
  message = "Your trial has ended. Some family features are unavailable.",
}: {
  message?: string;
}) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white px-3 py-2 shadow-sm">
      <Lock size={13} className="shrink-0 text-gray-400" />
      <p className="flex-1 text-xs text-gray-600">{message}</p>
      <button
        onClick={() => router.push("/parent/settings/account")}
        className="shrink-0 text-xs font-semibold text-cg-brand underline underline-offset-2"
      >
        Manage
      </button>
    </div>
  );
}
