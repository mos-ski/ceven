"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sparkles, ScrollText, MessageSquare, Settings, LayoutGrid, ClipboardList } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", icon: Home, href: "/parent/home" },
  { label: "Moments", icon: LayoutGrid, href: "/parent/moments" },
  { label: "CEvenAI", icon: Sparkles, href: "/parent/cevenai" },
  { label: "Requests", icon: ClipboardList, href: "/parent/special-requests" },
  { label: "Settings", icon: Settings, href: "/parent/settings" },
] as const;

export function ParentBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="shrink-0 border-t border-gray-100 bg-white pb-safe shadow-[0px_-4px_12px_4px_rgba(46,46,46,0.04)]">
      <div className="flex h-[68px] items-center justify-around px-2">
        {NAV_ITEMS.map(({ label, icon: Icon, href }) => {
          const isActive = pathname.startsWith(href);

          return (
            <Link key={label} href={href} className="flex flex-1 flex-col items-center justify-center gap-1 py-2">
              <div
                className={`flex items-center justify-center rounded-full px-5 py-1 transition-colors ${
                  isActive ? "bg-cg-quick-action" : ""
                }`}
              >
                <Icon
                  size={22}
                  className={isActive ? "text-cg-brand" : "text-gray-400"}
                />
              </div>
              <span
                className={`text-[10px] font-medium ${
                  isActive ? "text-gray-800" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
