"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ScanFlow } from "@/components/attendance/scan-flow";
import { OneTimeCode } from "@/components/attendance/one-time-code";
import { ParentBottomNav } from "@/components/parent/bottom-nav";
import { NewBadge } from "@/components/parent/new-badge";
import { mockParentUser } from "@/lib/parent/mock-data";
import { useAttendance } from "@/lib/attendance/store";
import { getChildIdsForParent } from "@/lib/attendance/mock-scan";

const PARENT_ID = "parent-4";

export default function ParentScanPage() {
  const router = useRouter();
  const { state } = useAttendance();
  const myChildIds = getChildIdsForParent(PARENT_ID);
  const myChildren = state.childStates.filter((c) => myChildIds.includes(c.childId));
  const primaryChild = myChildren[0];

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-[#fffefa]">
      <div className="flex items-center gap-3 bg-white px-5 pt-12 pb-4 shadow-sm">
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-cg-brand">Scan Attendance Code</h1>
            <NewBadge />
          </div>
          <p className="text-xs text-gray-400">Scan the QR code at reception</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6">
        {/* Scan button */}
        <ScanFlow
          userRole="parent"
          userId={PARENT_ID}
          userName={mockParentUser.name}
        />

        {/* One-time code section */}
        {primaryChild && (
          <div className="mt-6 rounded-2xl bg-[#F9F5EE] p-4">
            <div className="mb-2 flex items-center gap-2">
              <p className="text-sm font-semibold text-gray-700">Need someone else to pick up?</p>
              <span className="inline-flex shrink-0 items-center rounded-full bg-emerald-500 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-white">
                New
              </span>
            </div>
            <p className="mb-3 text-xs text-gray-400">
              Generate a one-time code for a driver, grandparent, or anyone without the app.
            </p>
            <OneTimeCode
              mode="generate"
              childId={primaryChild.childId}
              childName={primaryChild.childName}
              userName={mockParentUser.name}
            />
          </div>
        )}
      </div>

      <ParentBottomNav />
    </div>
  );
}
