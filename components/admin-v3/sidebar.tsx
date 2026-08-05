"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Sparkles } from "lucide-react";
import { NAV_SECTIONS } from "@/components/admin-v3/nav-items";
import { MOCK_ADMIN_USER } from "@/lib/mock-data/admin-user";

function badgeClasses(badge: number | "Live") {
  if (badge === "Live") return "bg-[#C47B2C] text-white";
  return "bg-[#D4522F] text-white";
}

export function SidebarV3() {
  const pathname = usePathname();

  return (
    <aside className="relative flex h-screen w-[236px] shrink-0 flex-col overflow-hidden bg-[#2D1810] text-[#F5EDD8]">
      <svg
        className="pointer-events-none absolute bottom-0 right-0 h-[200px] w-[120px] opacity-60"
        viewBox="0 0 120 200"
        fill="none"
      >
        <path d="M20 30 Q35 10 50 30 Q65 50 50 70 Q35 90 50 110" stroke="rgba(196,123,44,0.12)" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M70 20 Q85 40 70 60 Q55 80 70 100 Q85 120 70 140" stroke="rgba(139,158,122,0.1)" strokeWidth="6" fill="none" strokeLinecap="round" />
      </svg>

      <div className="flex flex-col gap-3.5 border-b border-white/[0.06] px-4 pb-3.5 pt-5">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 36 36" fill="none" className="h-8 w-8 shrink-0">
            <ellipse cx="13" cy="8" rx="4.5" ry="4.5" fill="#2D1810" />
            <path d="M6 28 C6 20 8 16 13 16 C18 16 20 20 20 28Z" fill="#2D1810" />
            <ellipse cx="23" cy="13" rx="3.5" ry="3.5" fill="#8B9E7A" />
            <path d="M17 28 C17 22 19 18 23 18 C27 18 28 22 28 28Z" fill="#8B9E7A" />
            <path d="M10 22 Q13 26 17 22" stroke="#C47B2C" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          </svg>
          <div>
            <p className="font-[family-name:var(--font-mogra)] text-xl leading-none text-[#F5EDD8]">
              CEven
            </p>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
              Admin
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-white/[0.07] bg-white/5 px-3.5 py-2.5">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/30">
            Active Branch
          </p>
          <div className="mt-0.5 flex items-center justify-between text-[13px] font-bold text-[#F5EDD8]">
            Sunshine Crèche, Lekki
            <ChevronDown className="h-3.5 w-3.5 text-white/40" />
          </div>
        </div>
      </div>

      <Link
        href="/admin/v3/ai-command-center"
        className="relative mx-3 mt-3 overflow-hidden rounded-xl border border-[#C47B2C]/20 bg-gradient-to-br from-[#1E2D4A] to-[#2D1810] px-4 py-3.5 transition-transform hover:-translate-y-px"
      >
        <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/55">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
          Ada
        </p>
        <p className="mt-1.5 text-[13px] font-semibold leading-snug text-white">
          3 issues need your attention today
        </p>
        <p className="mt-1.5 text-[11px] text-white/60">1 welfare flag · 2 payment risks</p>
      </Link>

      <nav className="mt-1 flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 pb-3 pt-3">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label} className="mb-1">
            <p className="px-2.5 pb-1 pt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
              {section.label}
            </p>
            {section.items.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 rounded-lg px-2.5 py-[9px] text-[13px] font-semibold transition-colors ${
                    active
                      ? "bg-[#C47B2C]/18 text-[#E8B870]"
                      : "text-white/50 hover:bg-white/[0.07] hover:text-white/85"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" strokeWidth={2.2} />
                  <span className="flex-1">{item.label}</span>
                  {item.badge !== undefined && (
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] font-extrabold ${badgeClasses(item.badge)}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="flex items-center gap-2.5 border-t border-white/5 px-4 py-3.5">
        <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#C47B2C] text-[10px] font-bold text-[#2D1810]">
          {MOCK_ADMIN_USER.name
            .split(" ")
            .map((p) => p[0])
            .join("")}
        </div>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-bold text-[#F5EDD8]">{MOCK_ADMIN_USER.name}</p>
          <p className="truncate font-mono text-[10px] text-white/40">Branch Manager</p>
        </div>
        <Sparkles className="ml-auto h-3.5 w-3.5 shrink-0 text-[#C47B2C]" />
      </div>
    </aside>
  );
}
