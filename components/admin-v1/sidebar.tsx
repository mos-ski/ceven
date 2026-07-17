"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_GROUPS_V1 } from "@/lib/admin-v1/nav-items";
import { MOCK_ADMIN_USER } from "@/lib/mock-data/admin-user";
import {
  Home, Baby, Users, ClipboardList, TrendingUp, HeartHandshake,
  CalendarOff, ShieldCheck, DoorOpen, ScanLine, BookOpen, HeartPulse,
  Pill, Package, Building, CheckSquare, Wallet, CreditCard, Receipt,
  Banknote, BarChart, MessageSquare, Megaphone, Calendar, Sparkles,
  LineChart, FileText, History, HelpCircle, Settings,
} from "lucide-react";

const ICONS: Record<string, React.ReactNode> = {
  home: <Home className="h-4 w-4" />,
  baby: <Baby className="h-4 w-4" />,
  users: <Users className="h-4 w-4" />,
  "clipboard-list": <ClipboardList className="h-4 w-4" />,
  "trending-up": <TrendingUp className="h-4 w-4" />,
  "heart-handshake": <HeartHandshake className="h-4 w-4" />,
  "calendar-off": <CalendarOff className="h-4 w-4" />,
  "shield-check": <ShieldCheck className="h-4 w-4" />,
  "door-open": <DoorOpen className="h-4 w-4" />,
  "scan-line": <ScanLine className="h-4 w-4" />,
  "book-open": <BookOpen className="h-4 w-4" />,
  "heart-pulse": <HeartPulse className="h-4 w-4" />,
  pill: <Pill className="h-4 w-4" />,
  package: <Package className="h-4 w-4" />,
  building: <Building className="h-4 w-4" />,
  "check-square": <CheckSquare className="h-4 w-4" />,
  wallet: <Wallet className="h-4 w-4" />,
  "credit-card": <CreditCard className="h-4 w-4" />,
  receipt: <Receipt className="h-4 w-4" />,
  banknote: <Banknote className="h-4 w-4" />,
  "bar-chart": <BarChart className="h-4 w-4" />,
  "message-square": <MessageSquare className="h-4 w-4" />,
  megaphone: <Megaphone className="h-4 w-4" />,
  calendar: <Calendar className="h-4 w-4" />,
  sparkles: <Sparkles className="h-4 w-4" />,
  "line-chart": <LineChart className="h-4 w-4" />,
  "file-text": <FileText className="h-4 w-4" />,
  history: <History className="h-4 w-4" />,
  "help-circle": <HelpCircle className="h-4 w-4" />,
  settings: <Settings className="h-4 w-4" />,
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

      <nav className="flex flex-1 flex-col gap-4 px-3 py-2">
        {NAV_GROUPS_V1.map((group) => (
          <div key={group.label}>
            <p className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-white/40">
              {group.label}
            </p>
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors ${
                      isActive
                        ? "bg-white text-[#3B2513]"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                      {ICONS[item.icon]}
                    </span>
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 px-5 py-4">
        <p className="text-sm font-semibold text-white">
          {MOCK_ADMIN_USER.name}
        </p>
        <p className="text-xs text-white/50">{MOCK_ADMIN_USER.email}</p>
      </div>
    </aside>
  );
}
