"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  ScanLine,
  LogIn,
  Plus,
  Baby,
  LayoutGrid,
  Images,
  TrendingUp,
  Pill,
  AlertTriangle,
  Star,
  CalendarCheck,
  Clock,
  CalendarDays,
  Megaphone,
  FileText,
  CreditCard,
} from "lucide-react";
import { ParentBottomNav } from "@/components/parent/bottom-nav";
import { QuickActionCard } from "@/components/parent/quick-action-card";
import { mockParentUser, mockChild, mockAttendanceHistory } from "@/lib/parent/mock-data";

export default function ParentHomePage() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-[#fffefa]">
      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-full bg-[#f4f5f6] px-3 py-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cg-brand text-[10px] font-bold text-white">
              {mockParentUser.avatarInitials}
            </div>
            <div>
              <p className="text-[10px] text-gray-500">Welcome Back,</p>
              <p className="text-xs font-medium text-gray-800">{mockParentUser.name}&apos;s</p>
            </div>
          </div>
          <Link
            href="/parent/notifications"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f5f6]"
          >
            <Bell size={20} className="text-gray-600" />
          </Link>
        </div>

        {/* Scan attendance code CTA */}
        <Link
          href="/parent/scan"
          className="mt-3 flex items-center justify-center gap-2.5 rounded-xl bg-cg-brand px-4 py-3 text-white active:scale-[0.98] transition-transform"
        >
          <ScanLine size={18} />
          <span className="text-sm font-semibold">Scan attendance code</span>
          <span className="inline-flex shrink-0 items-center rounded-full bg-white/20 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-white">
            New
          </span>
        </Link>

        {/* Today's check-in status */}
        <Link
          href="/parent/attendance"
          className="mt-3 flex items-center gap-2.5 rounded-xl bg-emerald-50 px-3.5 py-2.5"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
            <LogIn size={13} />
          </span>
          <p className="flex-1 text-xs font-semibold text-emerald-800">
            {mockAttendanceHistory[0].checkInTime
              ? `${mockChild.name} checked in at ${mockAttendanceHistory[0].checkInTime}`
              : `${mockChild.name} hasn't checked in yet today`}
          </p>
          <span className="text-[10px] font-semibold text-emerald-600">Details</span>
        </Link>

        {/* Quick Actions */}
        <p className="mb-3 mt-5 text-sm font-semibold text-gray-600">Quick Actions</p>

        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">My Family</p>
        <div className="mb-4 grid grid-cols-3 gap-3">
          <QuickActionCard icon={Baby} label="Manage Kids" onClick={() => router.push("/parent/children")} />
          <QuickActionCard icon={LayoutGrid} label="Moments" onClick={() => router.push("/parent/moments")} />
          <QuickActionCard icon={Images} label="Gallery" onClick={() => router.push("/parent/gallery")} />
        </div>

        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Health & Care</p>
        <div className="mb-4 grid grid-cols-3 gap-3">
          <QuickActionCard icon={TrendingUp} label="Growth" onClick={() => router.push("/parent/child/growth")} isNew />
          <QuickActionCard icon={Pill} label="Medication" onClick={() => router.push("/parent/medication")} isNew />
          <QuickActionCard icon={AlertTriangle} label="Incidents" onClick={() => router.push("/parent/incidents")} isNew />
          <QuickActionCard icon={Star} label="Rate Caregiver" onClick={() => router.push("/parent/rate-caregiver")} isNew />
        </div>

        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Creche Life</p>
        <div className="mb-4 grid grid-cols-3 gap-3">
          <QuickActionCard icon={CalendarCheck} label="Attendance" onClick={() => router.push("/parent/attendance")} />
          <QuickActionCard icon={Clock} label="Special Requests" onClick={() => router.push("/parent/special-requests")} />
          <QuickActionCard icon={CalendarDays} label="Events" onClick={() => router.push("/parent/events")} isNew />
          <QuickActionCard icon={Megaphone} label="Announcements" onClick={() => router.push("/parent/announcements")} isNew />
        </div>

        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Enrollment & Billing</p>
        <div className="grid grid-cols-3 gap-3">
          <QuickActionCard icon={FileText} label="Application/Waitlist" onClick={() => router.push("/parent/application")} />
          <QuickActionCard icon={CreditCard} label="Fees" onClick={() => router.push("/parent/fees")} />
        </div>
      </div>

      <Link
        href="/parent/child/add"
        aria-label="Add child"
        className="absolute bottom-[86px] right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-cg-brand text-white shadow-[0_12px_30px_rgba(59,37,19,0.28)] active:scale-95"
      >
        <Plus size={24} />
      </Link>

      <ParentBottomNav />
    </div>
  );
}
