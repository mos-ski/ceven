"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isFeatureGated } from "@/lib/parent/mock-data";
import { MembershipGateSheet } from "@/components/parent/membership-gate-sheet";
import { HouseIcon, SparkleIcon, ScrollIcon, CommunicationIcon, Setting2Icon } from "@/components/parent/nav-icons";

const NAV_ITEMS = [
  { label: "Home", icon: HouseIcon, href: "/parent/home" },
  { label: "CEvenAI", icon: SparkleIcon, href: "/parent/cevenai" },
  { label: "Report", icon: ScrollIcon, href: "/parent/reports" },
  { label: "Chat", icon: CommunicationIcon, href: "/parent/chat" },
  { label: "Settings", icon: Setting2Icon, href: "/parent/settings" },
] as const;

export function ParentBottomNav() {
  const pathname = usePathname();
  const [gateOpen, setGateOpen] = useState(false);

  return (
    <>
      <nav className="shrink-0 bg-white pb-safe shadow-[0px_-4px_12px_4px_rgba(46,46,46,0.04)]">
        <div className="flex h-[68px] items-center justify-around px-2">
          {NAV_ITEMS.map(({ label, icon: Icon, href }) => {
            const isActive = pathname.startsWith(href);
            const content = (
              <>
                <div
                  className={`flex items-center justify-center rounded-[36px] px-5 py-1 transition-colors ${
                    isActive ? "bg-[#FAF2E1]" : ""
                  }`}
                >
                  <Icon
                    size={24}
                    className={isActive ? "text-cg-brand" : "text-[#6b7280]"}
                  />
                </div>
                <span
                  className={
                    isActive
                      ? "font-[family-name:var(--font-merriweather)] text-[10px] font-semibold text-[#1f2937]"
                      : "font-[family-name:var(--font-urbanist)] text-[10px] font-normal text-[#6b7280]"
                  }
                >
                  {label}
                </span>
              </>
            );

            if (isFeatureGated(href)) {
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setGateOpen(true)}
                  className="flex flex-1 flex-col items-center justify-center gap-1 py-2"
                >
                  {content}
                </button>
              );
            }

            return (
              <Link key={label} href={href} className="flex flex-1 flex-col items-center justify-center gap-1 py-2">
                {content}
              </Link>
            );
          })}
        </div>
      </nav>

      {gateOpen && <MembershipGateSheet onClose={() => setGateOpen(false)} />}
    </>
  );
}
