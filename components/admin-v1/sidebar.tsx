"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS_V1 } from "@/lib/admin-v1/nav-items";
import { MOCK_ADMIN_USER } from "@/lib/mock-data/admin-user";
import { Home, Users, HeartHandshake, Settings, Bell } from "lucide-react";

const ICONS: Record<string, React.ReactNode> = {
  home: <Home className="h-4 w-4" />,
  users: <Users className="h-4 w-4" />,
  "heart-handshake": <HeartHandshake className="h-4 w-4" />,
  settings: <Settings className="h-4 w-4" />,
  bell: <Bell className="h-4 w-4" />,
};

export function SidebarV1() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[220px] shrink-0 flex-col overflow-y-auto bg-[#3B2513]">
      <div className="flex items-center gap-2 px-5 py-5">
        <span className="font-[family-name:var(--font-mogra)] text-xl font-bold text-white">
          CEven
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-2">
        {NAV_ITEMS_V1.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-white text-[#3B2513]"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="flex h-5 w-5 items-center justify-center">
                {ICONS[item.icon]}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-5 py-4">
        <p className="text-sm font-semibold text-white">{MOCK_ADMIN_USER.name}</p>
        <p className="text-xs text-white/50">{MOCK_ADMIN_USER.email}</p>
      </div>
    </aside>
  );
}
