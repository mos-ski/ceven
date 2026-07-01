"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Baby, FileText, MessageSquare, Settings } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", icon: Home, href: "/parent/home" },
  { label: "Child", icon: Baby, href: "/parent/child" },
  { label: "Reports", icon: FileText, href: "/parent/reports" },
  { label: "Chat", icon: MessageSquare, href: "/parent/chat" },
  { label: "Settings", icon: Settings, href: "/parent/settings" },
] as const;

export function ParentBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="shrink-0 border-t border-gray-100 bg-cg-surface pb-safe">
      <div className="flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map(({ label, icon: Icon, href }) => {
          const isActive = pathname.startsWith(href);

          return (
            <Link key={label} href={href} className="flex-1 flex justify-center">
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
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
