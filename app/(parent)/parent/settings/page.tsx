"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Bell, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { ParentBottomNav } from "@/components/parent/bottom-nav";
import { mockParentUser } from "@/lib/parent/mock-data";
import { cgRemove } from "@/lib/caregiver/storage";

const SETTINGS_ROWS = [
  { icon: User, label: "Edit Profile", href: "/parent/settings/profile" },
  { icon: Bell, label: "Notifications", href: "/parent/notifications" },
  { icon: HelpCircle, label: "Help & Support", href: "/parent/settings/help" },
] as const;

export default function SettingsPage() {
  const router = useRouter();

  function handleLogOut() {
    cgRemove("pin");
    cgRemove("userName");
    cgRemove("userRole");
    router.replace("/caregiver/auth?role=parents");
  }

  return (
    <div className="flex flex-1 flex-col bg-cg-bg">
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-4">
        <h1
          className="mb-6 text-xl font-bold text-cg-brand"
          style={{ fontFamily: "var(--font-merriweather)" }}
        >
          Settings
        </h1>

        {/* Profile section */}
        <div className="mb-6 flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cg-brand text-lg font-bold text-white">
            {mockParentUser.avatarInitials}
          </div>
          <div>
            <p className="font-bold text-cg-brand">{mockParentUser.name}</p>
            <span className="inline-block rounded-full bg-cg-quick-action px-2 py-0.5 text-xs font-medium capitalize text-cg-accent">
              Parent
            </span>
          </div>
        </div>

        {/* Settings rows */}
        <div className="rounded-2xl bg-white shadow-sm">
          {SETTINGS_ROWS.map(({ icon: Icon, label, href }, i) => (
            <Link
              key={label}
              href={href}
              className={`flex w-full items-center justify-between px-4 py-4 text-sm font-medium text-cg-brand ${
                i < SETTINGS_ROWS.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} className="text-gray-400" />
                {label}
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </Link>
          ))}
        </div>

        {/* Log Out */}
        <button
          onClick={handleLogOut}
          className="mt-4 flex w-full items-center gap-3 rounded-2xl bg-white px-4 py-4 text-sm font-medium text-red-500 shadow-sm"
        >
          <LogOut size={18} />
          Log Out
        </button>
      </div>

      <ParentBottomNav />
    </div>
  );
}
