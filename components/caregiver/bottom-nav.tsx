"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Clock, FileText, MessageSquare, Settings } from "lucide-react";
import { useLogSheet } from "./log-sheet-context";

const NAV_ITEMS = [
  { label: "Home", icon: Home, href: "/caregiver/home" },
  { label: "Tasks", icon: Clock, href: "/caregiver/tasks" },
  { label: "Report", icon: FileText, href: null }, // opens sheet
  { label: "Chat", icon: MessageSquare, href: "/caregiver/chat" },
  { label: "Settings", icon: Settings, href: "/caregiver/settings" },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  const { openLog } = useLogSheet();

  return (
    <nav className="shrink-0 border-t border-gray-100 bg-cg-surface pb-safe">
      <div className="flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map(({ label, icon: Icon, href }) => {
          const isActive = href ? pathname.startsWith(href) : false;

          const content = (
            <div className="flex flex-col items-center gap-0.5">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                  isActive ? "bg-cg-brand" : "bg-transparent"
                }`}
              >
                <Icon
                  size={20}
                  className={isActive ? "text-white" : "text-gray-400"}
                />
              </div>
              <span
                className={`text-[10px] font-medium ${
                  isActive ? "text-cg-brand" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
          );

          if (!href) {
            return (
              <button key={label} onClick={openLog} className="flex-1">
                {content}
              </button>
            );
          }

          return (
            <Link key={label} href={href} className="flex-1 flex justify-center">
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
