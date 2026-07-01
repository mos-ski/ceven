"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Bell } from "lucide-react";
import { ParentBottomNav } from "@/components/parent/bottom-nav";
import { mockChild } from "@/lib/parent/mock-data";

export default function ChildPage() {
  const router = useRouter();

  return (
    <div className="flex flex-1 flex-col bg-cg-bg">
      <div className="flex-1 overflow-y-auto px-4 pt-2 pb-4">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cg-brand text-xs font-bold text-white">
              JM
            </div>
            <div>
              <p className="text-[10px] text-gray-400">Welcome Back,</p>
              <p className="text-xs font-semibold text-cg-brand">James Miller</p>
            </div>
          </div>
          <Link href="/parent/notifications" className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
            <Bell size={18} className="text-gray-500" />
          </Link>
        </div>

        {/* Child profile */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cg-accent-muted text-xl font-bold text-cg-brand">
              LS
            </div>
            <div>
              <h1 className="text-lg font-bold text-cg-brand">{mockChild.name}</h1>
              <p className="text-sm text-gray-400">{mockChild.age} &middot; {mockChild.room}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-sm text-gray-500">Classroom</span>
              <span className="text-sm font-semibold text-cg-brand">{mockChild.room}</span>
            </div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-sm text-gray-500">Caregiver</span>
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cg-brand text-[10px] font-bold text-white">
                  {mockChild.caregiverInitials}
                </div>
                <span className="text-sm font-semibold text-cg-brand">{mockChild.caregiver}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Age</span>
              <span className="text-sm font-semibold text-cg-brand">{mockChild.age}</span>
            </div>
          </div>
        </div>
      </div>

      <ParentBottomNav />
    </div>
  );
}
