"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS_SA } from "@/lib/super-admin/nav-items";

export function SidebarSA() {
 const pathname = usePathname();
 const [mobileOpen, setMobileOpen] = useState(false);

 return (
 <>
  {/* Hamburger button */}
  <button
  onClick={() => setMobileOpen(true)}
  className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-[#3B2513] text-white lg:hidden"
  aria-label="Open menu"
  >
  <Menu className="h-5 w-5" />
  </button>

  {/* Backdrop */}
  {mobileOpen && (
  <div
   className="fixed inset-0 z-40 bg-black/40 lg:hidden"
   onClick={() => setMobileOpen(false)}
  />
  )}

  {/* Sidebar */}
  <aside
  className={`fixed inset-y-0 left-0 z-50 flex w-[220px] shrink-0 flex-col overflow-y-auto bg-[#3B2513] transition-transform duration-200 lg:static lg:translate-x-0 ${
   mobileOpen ? "translate-x-0" : "-translate-x-full"
  }`}
  >
  <div className="flex items-center justify-between px-5 py-5">
   <div className="flex items-center gap-2">
   <img src="/Logo/icon.svg" alt="CEven" className="h-8 w-8" />
   <span className="font-[family-name:var(--font-merriweather)] text-xl font-bold text-white">
    CEven
   </span>
   </div>
   <button
   onClick={() => setMobileOpen(false)}
   className="flex h-8 w-8 items-center justify-center rounded-md text-white/70 hover:text-white lg:hidden"
   aria-label="Close menu"
   >
   <X className="h-4 w-4" />
   </button>
  </div>

  <nav className="flex flex-1 flex-col gap-1 px-3 py-2">
   {NAV_ITEMS_SA.map((item) => {
   const isActive = pathname === item.href;
   return (
    <Link
    key={item.href}
    href={item.href}
    onClick={() => setMobileOpen(false)}
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
 </>
 );
}
