"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, FileText, MessageSquare, ClipboardCheck } from "lucide-react";

const NAV_ITEMS = [
  { label: "Today", icon: ClipboardCheck, href: "/caregiverv3/today" },
  { label: "Calendar", icon: CalendarDays, href: "/caregiverv3/calendar" },
  { label: "Report", icon: FileText, href: "/caregiverv3/daily-report" },
  { label: "Chat", icon: MessageSquare, href: "/caregiverv3/chat" },
] as const;

export function CaregiverV3BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="shrink-0 border-t border-gray-100 bg-white pb-safe">
      <div className="flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map(({ label, icon: Icon, href }) => {
          const isActive = pathname.startsWith(href);

          return (
            <Link key={label} href={href} className="flex flex-1 justify-center">
              <div className="flex flex-col items-center gap-0.5">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                    isActive ? "bg-[#3B2513]" : "bg-transparent"
                  }`}
                >
                  <Icon size={20} className={isActive ? "text-white" : "text-gray-400"} />
                </div>
                <span
                  className={`text-[10px] font-medium ${
                    isActive ? "text-[#3B2513]" : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
