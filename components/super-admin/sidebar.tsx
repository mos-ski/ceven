"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS_SA } from "@/lib/super-admin/nav-items";

export function SidebarSA() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[220px] shrink-0 flex-col overflow-y-auto bg-[#3B2513]">
      <div className="flex items-center gap-2 px-5 py-5">
        <span className="font-[family-name:var(--font-mogra)] text-xl font-bold text-white">
          CEven
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-2">
        {NAV_ITEMS_SA.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-white text-[#3B2513]"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-5 py-4">
        <p className="text-sm font-semibold text-white">CEven Platform Team</p>
        <p className="text-xs text-white/50">internal@ceven.app</p>
      </div>
    </aside>
  );
}
