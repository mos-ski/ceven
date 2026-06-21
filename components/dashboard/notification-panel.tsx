"use client";

import { X } from "lucide-react";
import { useState } from "react";

type NotificationCategory = "Log Update" | "Enquiries" | "Emergency";

type NotificationItem = {
  id: number;
  category: NotificationCategory;
  emoji: string;
  bg: string;
  border: string;
  titleColor: string;
  title: string;
  desc: string;
  time: string;
};

const notifications: NotificationItem[] = [
  {
    id: 1,
    category: "Log Update",
    emoji: "🤖",
    bg: "#f4f5f6",
    border: "#ccd2dc",
    titleColor: "#1e2d4a",
    title: "AI Alert: 3 issues detected this morning",
    desc: "Welfare check · Payment risk · Compliance drop",
    time: "7:00am",
  },
  {
    id: 2,
    category: "Emergency",
    emoji: "⚠️",
    bg: "#ffeded",
    border: "#cd3030",
    titleColor: "#cd3030",
    title: "Incident raised — Emeka Balogun (minor fall)",
    desc: "Requires parent notification · Ms. Tunde · 9:05am",
    time: "7:00am",
  },
  {
    id: 3,
    category: "Log Update",
    emoji: "₦",
    bg: "#faf2e1",
    border: "#ba733e",
    titleColor: "#7a4c29",
    title: "3 invoices overdue — ₦142,000 outstanding",
    desc: "Okafor · Adeyemi · Balogun",
    time: "8:00am",
  },
  {
    id: 4,
    category: "Enquiries",
    emoji: "💬",
    bg: "#fff6e6",
    border: "#ffb537",
    titleColor: "#a36700",
    title: "Message from Mrs. Chioma Johnson",
    desc: "Asking about Amara's day · Received 9:12am",
    time: "7:50am",
  },
  {
    id: 5,
    category: "Log Update",
    emoji: "✅",
    bg: "#ecfff8",
    border: "#10b981",
    titleColor: "#10b981",
    title: "Payment received — Mrs. Johnson · ₦45,000",
    desc: "Amara Johnson · April fee · Confirmed",
    time: "7:50am",
  },
];

const filterTabs = ["All", "Log Update", "Enquiries", "Emergency"] as const;

type Props = {
  onClose: () => void;
};

export default function NotificationPanel({ onClose }: Props) {
  const [activeTab, setActiveTab] = useState<(typeof filterTabs)[number]>("All");

  const filtered =
    activeTab === "All" ? notifications : notifications.filter((n) => n.category === activeTab);

  return (
    <div className="flex w-[calc(100vw-2rem)] sm:w-[400px] flex-col gap-6 overflow-hidden rounded-2xl border-4 border-[#edd9c0] bg-white px-5 pb-6 pt-4 shadow-[0_4px_32px_rgba(0,0,0,0.1)]">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#171f26]">
            Notifications
          </h2>
          <button
            onClick={onClose}
            className="flex h-6 w-6 items-center justify-center text-[#6b7280] hover:text-[#2d1810]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="h-px w-full bg-[#e6ebf3]" />
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg px-3 py-2 font-[family-name:var(--font-nunito)] text-xs font-semibold transition-colors ${
                  activeTab === tab
                    ? "bg-[#3b2513] text-[#faf2e1]"
                    : "text-[#3b2513] hover:bg-[#f9fafb]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <span className="shrink-0 font-[family-name:var(--font-nunito)] text-xs text-[#333]">
            New Inbox ({notifications.length})
          </span>
        </div>
      </div>

      {/* Notification List */}
      <div className="flex flex-col gap-2 overflow-y-auto">
        {filtered.map((n) => (
          <div
            key={n.id}
            className="relative flex h-[60px] items-center rounded-[10px] border px-3"
            style={{ background: n.bg, borderColor: n.border }}
          >
            <span className="shrink-0 text-base">{n.emoji}</span>
            <div className="ml-3 flex min-w-0 flex-1 flex-col gap-1">
              <p
                className="truncate font-[family-name:var(--font-nunito)] text-xs font-semibold"
                style={{ color: n.titleColor }}
              >
                {n.title}
              </p>
              <p className="truncate font-[family-name:var(--font-nunito)] text-[10px] text-[#2d1810]/50">
                {n.desc}
              </p>
            </div>
            <span className="shrink-0 pl-2 font-[family-name:var(--font-urbanist)] text-[10px] text-[#2d1810]/50">
              {n.time}
            </span>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="py-6 text-center font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
            No notifications in this category.
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-4">
        <div className="h-px w-full bg-[#e6ebf3]" />
        <button className="self-end rounded-lg border border-[#3b2513] bg-[#edd9c0] px-3 py-2 font-[family-name:var(--font-nunito)] text-xs font-semibold text-[#3b2513] hover:bg-[#e0bfa0]">
          Mark All as Read
        </button>
      </div>
    </div>
  );
}
