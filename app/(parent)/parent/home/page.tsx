"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, Baby, FileText, MessageSquare, Images, CreditCard, ChevronRight } from "lucide-react";
import { ParentBottomNav } from "@/components/parent/bottom-nav";
import { mockParentUser, mockDailyReports } from "@/lib/parent/mock-data";

export default function ParentHomePage() {
  const router = useRouter();
  const todayReport = mockDailyReports[0];

  return (
    <div className="flex flex-1 flex-col bg-cg-bg">
      <div className="flex-1 overflow-y-auto px-4 pt-2 pb-4">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cg-brand text-xs font-bold text-white">
              {mockParentUser.avatarInitials}
            </div>
            <div>
              <p className="text-[10px] text-gray-400">Welcome Back,</p>
              <p className="text-xs font-semibold text-cg-brand">{mockParentUser.name}</p>
            </div>
          </div>
          <Link href="/parent/notifications" className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
            <Bell size={18} className="text-gray-500" />
          </Link>
        </div>

        {/* Child card */}
        <div className="mb-5 rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cg-accent-muted">
              <Baby size={22} className="text-cg-brand" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-400">Your Child</p>
              <p className="font-bold text-cg-brand">{mockParentUser.childName}</p>
            </div>
            <Link href="/parent/child" className="flex h-8 w-8 items-center justify-center rounded-full bg-cg-quick-action">
              <ChevronRight size={16} className="text-cg-brand" />
            </Link>
          </div>
        </div>

        {/* Today's summary */}
        {todayReport && (
          <div className="mb-5">
            <p className="mb-3 text-sm font-semibold text-gray-600">Today&apos;s Summary</p>
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-sm">{todayReport.mood.join(" ")}</span>
                <span className="text-xs text-gray-400">{todayReport.date}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-cg-quick-action p-3">
                  <p className="text-[10px] text-gray-400">Meals</p>
                  <p className="text-lg font-bold text-cg-brand">{todayReport.meals}</p>
                </div>
                <div className="rounded-xl bg-cg-quick-action p-3">
                  <p className="text-[10px] text-gray-400">Nap</p>
                  <p className="text-sm font-bold text-cg-brand">{todayReport.napDuration}</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-gray-500">{todayReport.activities}</p>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <p className="mb-3 text-sm font-semibold text-gray-600">Quick Actions</p>
        <div className="mb-3 flex gap-3">
          <button
            onClick={() => router.push("/parent/reports")}
            className="flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl bg-cg-quick-action py-5 active:brightness-95"
          >
            <FileText size={24} className="text-cg-brand" />
            <span className="text-xs font-medium text-cg-brand">Reports</span>
          </button>
          <button
            onClick={() => router.push("/parent/chat")}
            className="flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl bg-cg-quick-action py-5 active:brightness-95"
          >
            <MessageSquare size={24} className="text-cg-brand" />
            <span className="text-xs font-medium text-cg-brand">Chat</span>
          </button>
          <button
            onClick={() => router.push("/parent/gallery")}
            className="flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl bg-cg-quick-action py-5 active:brightness-95"
          >
            <Images size={24} className="text-cg-brand" />
            <span className="text-xs font-medium text-cg-brand">Gallery</span>
          </button>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/parent/fees")}
            className="flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl bg-cg-quick-action py-5 active:brightness-95"
          >
            <CreditCard size={24} className="text-cg-brand" />
            <span className="text-xs font-medium text-cg-brand">Fees</span>
          </button>
          <button
            onClick={() => router.push("/parent/child")}
            className="flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl bg-cg-quick-action py-5 active:brightness-95"
          >
            <Baby size={24} className="text-cg-brand" />
            <span className="text-xs font-medium text-cg-brand">My Child</span>
          </button>
        </div>
      </div>

      <ParentBottomNav />
    </div>
  );
}
