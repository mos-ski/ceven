"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ScanFlow } from "@/components/attendance/scan-flow";
import { OneTimeCode } from "@/components/attendance/one-time-code";
import { BottomNav } from "@/components/caregiver/bottom-nav";
import { LogSheet } from "@/components/caregiver/log-sheet";
import { NewBadge } from "@/components/caregiver/new-badge";
import { mockUser } from "@/lib/caregiver/mock-data";

export default function CaregiverScanPage() {
  const router = useRouter();

  return (
    <div className="relative flex flex-1 flex-col bg-cg-bg">
      <div className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-cg-brand">Scan Attendance Code</h1>
            <NewBadge />
          </div>
          <p className="text-xs text-gray-400">Sign in or sign out with a scan</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        {/* Scan button */}
        <ScanFlow
          userRole="caregiver"
          userId="staff-1"
          userName={mockUser.name}
        />

        {/* Verify pickup code section */}
        <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
          <p className="mb-2 text-sm font-semibold text-cg-brand">Verify a pickup code</p>
          <p className="mb-3 text-xs text-gray-400">
            Enter a parent&apos;s one-time pickup code to verify and log a pickup.
          </p>
          <OneTimeCode
            mode="verify"
            userName={mockUser.name}
          />
        </div>
      </div>

      <LogSheet />
      <BottomNav />
    </div>
  );
}
