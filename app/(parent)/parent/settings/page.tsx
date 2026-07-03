"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin, CreditCard, ShieldCheck, Languages, Bell,
  PersonStanding, Headphones, Smartphone, LogOut, ChevronRight,
} from "lucide-react";
import { ParentBottomNav } from "@/components/parent/bottom-nav";
import { mockParentUser } from "@/lib/parent/mock-data";
import { cgRemove } from "@/lib/caregiver/storage";

const SETTINGS_ROWS = [
  { icon: MapPin,         label: "Find Creche",            href: "/parent/creche" },
  { icon: CreditCard,     label: "Billing History",         href: "/parent/settings/billing" },
  { icon: ShieldCheck,    label: "Change Password",         href: "/parent/settings/change-password" },
  { icon: Languages,      label: "Language Preferences",    href: "/parent/settings/language" },
  { icon: Bell,           label: "Notification Settings",   href: "/parent/settings/notifications" },
  { icon: PersonStanding, label: "Accessibility",           href: "/parent/settings/accessibility" },
  { icon: Headphones,     label: "FAQs & Help",             href: "/parent/settings/help" },
  { icon: Smartphone,     label: "About App",               href: "/parent/settings/about" },
] as const;

export default function ParentSettingsPage() {
  const router = useRouter();

  function handleLogOut() {
    cgRemove("pin");
    cgRemove("userName");
    cgRemove("userRole");
    router.replace("/parent/auth");
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Brown header with decorative circles + profile */}
      <div className="relative overflow-hidden bg-[#7A4C29] pb-16 pt-12 px-6">
        <div className="pointer-events-none absolute -top-16 -right-16 h-[352px] w-[352px] rounded-full bg-[#D4A67F] opacity-25" />
        <div className="pointer-events-none absolute top-4 -right-4 h-[192px] w-[192px] rounded-full bg-[#D4A67F] opacity-20" />

        {/* Avatar + name + view profile */}
        <div className="relative z-10 flex items-center gap-4">
          <div className="relative">
            <div className="flex h-[86px] w-[86px] items-center justify-center rounded-full bg-[#D4A67F] text-2xl font-bold text-white">
              {mockParentUser.avatarInitials}
            </div>
            <button className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9.5 2L12 4.5L4.5 12H2V9.5L9.5 2Z" stroke="#1F2937" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div>
            <p className="text-base font-bold text-white">{mockParentUser.name}</p>
            <Link href="/parent/settings/profile" className="flex items-center gap-1 text-xs text-white/60">
              View Profile
              <ChevronRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto bg-white">
        {/* Pull wrapper up to overlap header */}
        <div className="-mt-8 flex flex-1 flex-col rounded-t-3xl bg-white px-6 pt-5">

          {/* Premium subscription card */}
          <div className="mb-5 rounded-2xl bg-[#52330A] p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-4 w-4 items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1L7.5 4.5H11L8.5 6.5L9.5 10L6 8L2.5 10L3.5 6.5L1 4.5H4.5L6 1Z" fill="#FFFFFF"/>
                  </svg>
                </div>
                <span className="text-sm font-semibold text-white">Premium Monthly</span>
              </div>
              <span className="rounded-full bg-amber-500 px-2.5 py-0.5 text-xs font-bold text-[#52330A]">Upgrade</span>
            </div>
            <p className="mb-2 text-xs text-white">🎉 Free Trial: 7 days remaining</p>
            <div className="flex items-center gap-2 text-xs text-white/80">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="3" width="12" height="9" rx="1.5" stroke="white" strokeWidth="1.2"/>
                <path d="M1 6h12" stroke="white" strokeWidth="1.2"/>
              </svg>
              Next billing: February 11, 2026
            </div>
          </div>

          {/* Settings rows */}
          <p className="mb-3 text-base font-bold text-gray-800">Settings</p>
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
            {SETTINGS_ROWS.map(({ icon: Icon, label, href }, i) => (
              <Link
                key={label}
                href={href}
                className={`flex items-center justify-between px-4 py-3.5 ${
                  i < SETTINGS_ROWS.length - 1 ? "border-b border-gray-50" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className="text-gray-500" />
                  <span className="text-sm text-gray-500">{label}</span>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </Link>
            ))}
          </div>

          {/* Logout */}
          <button
            onClick={handleLogOut}
            className="mt-4 flex items-center gap-3 px-4 py-3.5"
          >
            <LogOut size={18} className="text-red-500" />
            <span className="text-sm font-medium text-red-500">Logout</span>
          </button>
        </div>
      </div>

      <ParentBottomNav />
    </div>
  );
}
