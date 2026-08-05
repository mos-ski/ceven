"use client";

import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export default function ParentResetSuccessPage() {
  const router = useRouter();

  return (
    <div className="flex flex-1 items-center justify-center bg-[#FAFAFA] px-6">
      <div className="w-full max-w-[327px] rounded-2xl bg-[#FAFAFA] px-6 py-8 shadow-lg">
        {/* Animation placeholder */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2 size={64} className="text-green-500" />
          </div>
        </div>

        {/* Text */}
        <div className="mb-6 text-center">
          <h2 className="mb-1 text-xl font-bold text-gray-800">Success!</h2>
          <p className="text-sm text-gray-500">Your password has been reset.</p>
        </div>

        {/* Sign in button */}
        <button
          onClick={() => router.replace("/parent/auth")}
          className="w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-[#FAF2E1]"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
