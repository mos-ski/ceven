"use client";

import { useRouter } from "next/navigation";
import { Lock, X } from "lucide-react";

export function MembershipGateSheet({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30">
      <div className="w-full max-w-[430px] rounded-t-2xl bg-white pb-8 pt-5">
        <div className="flex justify-end px-5 pb-2">
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
            <X size={14} className="text-gray-500" />
          </button>
        </div>

        <div className="flex flex-col items-center px-8 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
            <Lock size={24} className="text-gray-500" />
          </div>
          <h2 className="text-base font-bold text-gray-800">Your trial has ended</h2>
          <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">
            Some family features are unavailable.
          </p>
          <button
            onClick={() => {
              onClose();
              router.push("/parent/settings/account");
            }}
            className="mt-6 w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white"
          >
            Manage Account
          </button>
        </div>
      </div>
    </div>
  );
}
