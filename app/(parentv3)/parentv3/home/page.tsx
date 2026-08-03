"use client";

import { useState } from "react";
import { ParentV3BottomNav } from "@/components/parentv3/bottom-nav";
import {
  CHILDREN,
  CAREGIVER,
  UPCOMING_EVENTS,
  PENDING_MONEY_REQUEST,
  DAILY_REPORT,
  ACTIVITY_FEED,
} from "@/lib/parentv3/mock-data";

function Avatar({
  initials,
  color,
  size = 36,
}: {
  initials: string;
  color: string;
  size?: number;
}) {
  return (
    <div
      className="flex items-center justify-center rounded-full text-white font-bold"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        fontSize: size * 0.36,
      }}
    >
      {initials}
    </div>
  );
}

function UpNextCard() {
  return (
    <div className="rounded-2xl bg-[#f4f5f6] p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🍽️</span>
        <h3 className="text-sm font-bold text-gray-800">Up Next</h3>
        <span className="ml-auto text-[10px] text-gray-400">12:30 PM</span>
      </div>
      <div className="rounded-xl bg-white p-3">
        <p className="text-[10px] text-gray-400">Lunch</p>
        <p className="text-sm font-semibold text-gray-800">Jollof Rice & Moi-moi</p>
      </div>
    </div>
  );
}

function EventPrepCard() {
  const event = UPCOMING_EVENTS[0];
  const packed = event.checklist.filter((c) => c.packed).length;
  const total = event.checklist.length;

  return (
    <div className="rounded-2xl bg-[#f4f5f6] p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{event.icon}</span>
        <h3 className="text-sm font-bold text-gray-800">{event.title}</h3>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-cg-accent transition-all"
              style={{ width: `${(packed / total) * 100}%` }}
            />
          </div>
          <p className="mt-1 text-[11px] text-gray-500">
            {packed} of {total} packed
          </p>
        </div>
        <span className="text-xs text-gray-400">{event.date}</span>
      </div>
    </div>
  );
}

function MoneyApprovalCard() {
  const [status, setStatus] = useState<"pending" | "approved" | "declined">(
    PENDING_MONEY_REQUEST.status
  );

  return (
    <div className="rounded-2xl bg-[#f4f5f6] p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">💰</span>
        <h3 className="text-sm font-bold text-gray-800">Market Money</h3>
      </div>
      <p className="text-xs text-gray-500 mb-1">{PENDING_MONEY_REQUEST.purpose}</p>
      <p className="text-lg font-bold text-gray-800 mb-3">
        ₦{PENDING_MONEY_REQUEST.amount.toLocaleString()}
      </p>
      {status === "pending" ? (
        <div className="flex gap-2">
          <button
            onClick={() => setStatus("approved")}
            className="flex-1 rounded-xl bg-cg-brand py-2.5 text-xs font-semibold text-white"
          >
            Approve
          </button>
          <button
            onClick={() => setStatus("declined")}
            className="flex-1 rounded-xl bg-white border border-gray-200 py-2.5 text-xs font-semibold text-gray-500"
          >
            Decline
          </button>
        </div>
      ) : (
        <div
          className={`rounded-xl py-2 text-center text-xs font-semibold ${
            status === "approved"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {status === "approved" ? "✓ Approved" : "✕ Declined"}
        </div>
      )}
    </div>
  );
}

function DailyReportCard() {
  return (
    <div className="rounded-2xl bg-[#f4f5f6] p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">📋</span>
        <h3 className="text-sm font-bold text-gray-800">Daily Report</h3>
        <span className="ml-auto text-[10px] text-gray-400">{DAILY_REPORT.sentAt}</span>
      </div>
      <p className="text-xs text-gray-500 mb-2">From {DAILY_REPORT.caregiverName}</p>
      <div className="flex gap-2">
        {DAILY_REPORT.childSummaries.map((cs) => {
          const child = CHILDREN.find((c) => c.id === cs.childId)!;
          return (
            <div
              key={cs.childId}
              className="flex items-center gap-1.5 rounded-xl bg-white px-3 py-1.5"
            >
              <Avatar
                initials={child.avatarInitials}
                color={child.avatarColor}
                size={20}
              />
              <span className="text-xs font-medium text-gray-700">{child.name}</span>
              <span className="text-sm">{cs.mood}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ActivityFeedSection() {
  return (
    <div className="rounded-2xl bg-[#f4f5f6] p-4">
      <h3 className="text-sm font-bold text-gray-800 mb-3">Activity Feed</h3>
      <div className="space-y-3">
        {ACTIVITY_FEED.slice(0, 8).map((item) => (
          <div key={item.id} className="flex items-start gap-2.5">
            <span className="text-sm mt-0.5">{item.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
              <p className="text-[10px] text-gray-400">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ParentV3HomePage() {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-[#fffefa]">
      <div className="flex-1 overflow-y-auto px-6 pb-4">
        {/* Top bar — matches v2 welcome pill */}
        <div className="flex items-center justify-between pt-4 pb-2">
          <div className="flex items-center gap-2 rounded-full bg-[#f4f5f6] px-3 py-2">
            <div className="flex -space-x-1.5">
              {CHILDREN.map((child) => (
                <Avatar
                  key={child.id}
                  initials={child.avatarInitials}
                  color={child.avatarColor}
                  size={24}
                />
              ))}
            </div>
            <div>
              <p className="text-[10px] text-gray-500">Good afternoon</p>
              <p className="text-xs font-medium text-gray-800">Mrs. Adeyemi&apos;s</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1.5 shadow-sm">
              <Avatar
                initials={CAREGIVER.avatarInitials}
                color={CAREGIVER.avatarColor}
                size={18}
              />
              <span className="text-[10px] font-medium text-gray-600">
                {CAREGIVER.name.split(" ")[1]}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3 mt-2">
          <UpNextCard />
          <EventPrepCard />
          <MoneyApprovalCard />
          <DailyReportCard />
          <ActivityFeedSection />
        </div>
      </div>
      <ParentV3BottomNav />
    </div>
  );
}
