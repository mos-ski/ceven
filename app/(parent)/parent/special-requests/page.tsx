"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ParentBottomNav } from "@/components/parent/bottom-nav";
import { SpecialRequestsPanel } from "@/components/parent/special-requests-panel";

export default function SpecialRequestsPage() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-[#fffefa]">
      <div className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-base font-bold text-cg-brand">Special Requests</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <SpecialRequestsPanel />
      </div>

      <ParentBottomNav />
    </div>
  );
}
