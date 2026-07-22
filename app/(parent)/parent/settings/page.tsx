"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin, ExternalLink, UserCog, Users, Car, ShieldCheck, Languages, Bell,
  PersonStanding, Headphones, Smartphone, LogOut, ChevronRight,
  GraduationCap, Receipt,
} from "lucide-react";
import { ParentBottomNav } from "@/components/parent/bottom-nav";
import { mockParentUser } from "@/lib/parent/mock-data";
import { cgRemove } from "@/lib/caregiver/storage";

const SETTINGS_ROWS = [
  { icon: MapPin,         label: "Find Creche",            href: "/parent/creche",                    external: false },
  { icon: GraduationCap,  label: "Enrollments",            href: "/parent/enrollments",                external: false },
  { icon: UserCog,        label: "Manage Account",         href: "/parent/settings/account",           external: false },
  { icon: Receipt,        label: "Payment History",        href: "/parent/settings/payments",          external: false },
  { icon: Users,          label: "Family Profiles",        href: "/parent/settings/profile",           external: false },
  { icon: Car,            label: "Authorized Pickups",     href: "/parent/settings/pickups",           external: false },
  { icon: ShieldCheck,    label: "Change Password",         href: "/parent/settings/change-password",   external: false },
  { icon: Languages,      label: "Language Preferences",    href: "/parent/settings/language",          external: false },
  { icon: Bell,           label: "Notification Settings",   href: "/parent/settings/notifications",     external: false },
  { icon: PersonStanding, label: "Accessibility",           href: "/parent/settings/accessibility",     external: false },
  { icon: Headphones,     label: "FAQs & Help",             href: "/parent/settings/help",              external: false },
  { icon: Smartphone,     label: "About App",               href: "/parent/settings/about",             external: false },
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
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
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

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-white">
        <div className="flex flex-1 flex-col rounded-t-3xl bg-white px-6 pt-6">

          <p className="mb-3 text-base font-bold text-gray-800">Settings</p>
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
            {SETTINGS_ROWS.map(({ icon: Icon, label, href, external }, i) => (
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
                {external ? (
                  <ExternalLink size={16} className="text-gray-400" />
                ) : (
                  <ChevronRight size={16} className="text-gray-400" />
                )}
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
