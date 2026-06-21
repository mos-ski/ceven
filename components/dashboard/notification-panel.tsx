"use client";

import { X } from "lucide-react";
import { useState } from "react";

type NotificationItem = {
  id: number;
  borderColor: string;
  tag: string;
  tagBg: string;
  tagColor: string;
  title: string;
  desc: string;
  time: string;
  isUnread?: boolean;
};

const notifications: NotificationItem[] = [
  {
    id: 1,
    borderColor: "#9ca3af",
    tag: "AI Alert",
    tagBg: "#f3f4f6",
    tagColor: "#6b7280",
    title: "Ada flagged 2 children for follow-up",
    desc: "Zara M. (absent 3×) and Leo A. (allergy record outdated). Review recommended before 12pm.",
    time: "Just now",
    isUnread: true,
  },
  {
    id: 2,
    borderColor: "#ef4444",
    tag: "Incident",
    tagBg: "#fef2f2",
    tagColor: "#ef4444",
    title: "Minor fall reported — Tiger Room",
    desc: "Caregiver Ngozi logged a minor fall for Ade B. at 9:14am. Parent has been notified.",
    time: "14 min ago",
    isUnread: true,
  },
  {
    id: 3,
    borderColor: "#d4a96a",
    tag: "Invoice",
    tagBg: "#fdf6e8",
    tagColor: "#b5813d",
    title: "3 invoices now 7+ days overdue",
    desc: "Okafor, Bello, and Eze families have unpaid balances. Auto-reminder scheduled for 2pm.",
    time: "1 hr ago",
    isUnread: true,
  },
  {
    id: 4,
    borderColor: "#f59e0b",
    tag: "Message",
    tagBg: "#fffbeb",
    tagColor: "#d97706",
    title: "New enquiry from Mrs Adeyemi",
    desc: "Prospective parent asking about availability in Lion Class for September intake.",
    time: "2 hr ago",
    isUnread: true,
  },
  {
    id: 5,
    borderColor: "#22c55e",
    tag: "Payment",
    tagBg: "#f0fdf4",
    tagColor: "#16a34a",
    title: "Payment received — ₦85,000",
    desc: "Full term fee paid by Mr. Taiwo for Amira T. Receipt sent automatically.",
    time: "Yesterday",
    isUnread: false,
  },
];

const filterTabs = ["All", "Log Update", "Enquiries", "Emergency"];

type Props = {
  onClose: () => void;
};

export default function NotificationPanel({ onClose }: Props) {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="flex w-[calc(100vw-2rem)] sm:w-[360px] flex-col overflow-hidden rounded-2xl border border-[#e6ebf3] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#e6ebf3] px-5 py-4">
        <div className="flex items-center gap-2">
          <h2 className="font-[family-name:var(--font-nunito)] text-base font-semibold text-[#2d1810]">
            Notifications
          </h2>
          <span className="rounded-full bg-[#fdf2e3] px-2 py-0.5 font-[family-name:var(--font-nunito)] text-xs font-semibold text-[#c47b2c]">
            New Inbox (4)
          </span>
        </div>
        <button
          onClick={onClose}
          className="flex h-7 w-7 items-center justify-center rounded-md text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#2d1810]"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 border-b border-[#e6ebf3] px-4 pt-3">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-t-md px-3 py-2 font-[family-name:var(--font-urbanist)] text-sm font-medium transition-colors ${
              activeTab === tab
                ? "border-b-2 border-[#c47b2c] text-[#c47b2c]"
                : "text-[#6b7280] hover:text-[#2d1810]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="flex flex-col overflow-y-auto">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`relative border-b border-[#f3f4f6] px-5 py-4 last:border-b-0 ${
              n.isUnread ? "bg-[#fffcf8]" : "bg-white"
            }`}
          >
            {/* Color left bar */}
            <div
              className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full"
              style={{ background: n.borderColor }}
            />
            <div className="flex items-start justify-between gap-3 pl-2">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className="rounded-full px-2 py-0.5 font-[family-name:var(--font-urbanist)] text-[10px] font-medium"
                    style={{ background: n.tagBg, color: n.tagColor }}
                  >
                    {n.tag}
                  </span>
                  {n.isUnread && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c47b2c]" />
                  )}
                </div>
                <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
                  {n.title}
                </p>
                <p className="font-[family-name:var(--font-nunito)] text-xs leading-relaxed text-[#6b7280]">
                  {n.desc}
                </p>
              </div>
              <span className="shrink-0 font-[family-name:var(--font-urbanist)] text-[10px] text-[#9ca3af]">
                {n.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-[#e6ebf3] px-5 py-3">
        <button className="w-full rounded-lg py-2 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#c47b2c] hover:bg-[#fdf2e3]">
          Mark All as Read
        </button>
      </div>
    </div>
  );
}
