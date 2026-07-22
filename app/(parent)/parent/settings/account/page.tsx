"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function ManageAccountPage() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-[#F9F5F0]">
      <div className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-base font-bold text-gray-800">Manage Account</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="mb-2 text-sm font-semibold text-gray-800">School Fees</p>
          <p className="text-xs text-gray-500 leading-relaxed">
            School fees, acceptance fees, and other charges are handled outside the app.
            Contact your creche administrator to arrange payment — your invoice status and
            receipts update automatically under Settings → Payment History.
          </p>
        </div>
      </div>
    </div>
  );
}
