"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Monitor,
  Users,
  ClipboardList,
  FileText,
  MessageSquare,
  Bell,
} from "lucide-react";
import { BottomNav } from "@/components/caregiver/bottom-nav";
import { StatCard } from "@/components/caregiver/stat-card";
import { QuickActionCard } from "@/components/caregiver/quick-action-card";
import { useLogSheet } from "@/components/caregiver/log-sheet-context";
import { LogSheet } from "@/components/caregiver/log-sheet";
import { mockUser, mockClassrooms, mockChildren } from "@/lib/caregiver/mock-data";

export default function HomePage() {
  const { openActivity, openReport } = useLogSheet();
  const router = useRouter();

  return (
    <div className="flex flex-1 flex-col bg-cg-bg">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pt-2 pb-4">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cg-brand text-xs font-bold text-white">
              {mockUser.avatarInitials}
            </div>
            <div>
              <p className="text-[10px] text-gray-400">Welcome Back,</p>
              <p className="text-xs font-semibold text-cg-brand">{mockUser.name}</p>
            </div>
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
            <Bell size={18} className="text-gray-500" />
          </button>
        </div>

        {/* Stat cards */}
        <Link href="/caregiver/children">
          <div className="mb-5 flex gap-3">
            <StatCard
              icon={Monitor}
              label="Total Classroom(s)"
              value={mockClassrooms.length}
              bgColor="var(--color-cg-stat-pink)"
            />
            <StatCard
              icon={Users}
              label="Total Children"
              value={mockChildren.length}
              bgColor="var(--color-cg-stat-teal)"
            />
          </div>
        </Link>

        {/* Quick Actions */}
        <p className="mb-3 text-sm font-semibold text-gray-600">Quick Actions</p>
        <div className="flex gap-3">
          <QuickActionCard
            icon={ClipboardList}
            label="Log Activity"
            onClick={openActivity}
          />
          <QuickActionCard
            icon={FileText}
            label="Log Daily Report"
            onClick={openReport}
          />
          <QuickActionCard
            icon={MessageSquare}
            label="Chat"
            onClick={() => router.push("/caregiver/chat")}
          />
        </div>
      </div>

      <LogSheet />
      <BottomNav />
    </div>
  );
}
