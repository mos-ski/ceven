"use client";

import { useRouter } from "next/navigation";
import { User, Bell, Lock, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { BottomNav } from "@/components/caregiver/bottom-nav";
import { LogSheet } from "@/components/caregiver/log-sheet";
import { cgClearAll } from "@/lib/caregiver/storage";
import { mockUser } from "@/lib/caregiver/mock-data";

const SETTINGS_ROWS = [
  { icon: User, label: "Edit Profile" },
  { icon: Bell, label: "Notifications" },
  { icon: Lock, label: "Change PIN" },
  { icon: HelpCircle, label: "Help & Support" },
] as const;

export default function SettingsPage() {
  const router = useRouter();

  function handleLogOut() {
    cgClearAll();
    router.replace("/caregiver/auth");
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
            {mockUser.avatarInitials}
          </div>
          <div>
            <p className="font-bold text-cg-brand">{mockUser.name}</p>
            <span className="inline-block rounded-full bg-cg-quick-action px-2 py-0.5 text-xs font-medium capitalize text-cg-accent">
              {mockUser.role}
            </span>
          </div>
        </div>

        {/* Settings rows */}
        <div className="rounded-2xl bg-white shadow-sm">
          {SETTINGS_ROWS.map(({ icon: Icon, label }, i) => (
            <button
              key={label}
              className={`flex w-full items-center justify-between px-4 py-4 text-sm font-medium text-cg-brand ${
                i < SETTINGS_ROWS.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} className="text-gray-400" />
                {label}
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </button>
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

      <LogSheet />
      <BottomNav />
    </div>
  );
}
