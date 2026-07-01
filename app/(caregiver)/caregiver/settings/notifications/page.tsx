"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const NOTIFICATION_ITEMS = [
  { key: "tasks", label: "Task Reminders", description: "Get reminded about upcoming tasks" },
  { key: "reports", label: "Daily Reports", description: "Receive end-of-day activity summaries" },
  { key: "chat", label: "Chat Messages", description: "New messages from parents" },
  { key: "incidents", label: "Incident Alerts", description: "Notifications for logged incidents" },
  { key: "fees", label: "Fee Reminders", description: "Upcoming and overdue payment alerts" },
] as const;

type Key = (typeof NOTIFICATION_ITEMS)[number]["key"];

export default function NotificationsSettingsPage() {
  const router = useRouter();
  const [enabled, setEnabled] = useState<Record<Key, boolean>>({
    tasks: true,
    reports: true,
    chat: true,
    incidents: true,
    fees: true,
  });

  function toggle(key: Key) {
    setEnabled((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="flex flex-1 flex-col bg-cg-bg">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
        <button
          onClick={() => router.back()}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white"
        >
          <ArrowLeft size={16} className="text-gray-600" />
        </button>
        <h1
          className="text-lg font-bold text-cg-brand"
          style={{ fontFamily: "var(--font-merriweather)" }}
        >
          Notifications
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6">
        <p className="mb-4 text-sm text-gray-500">Choose which notifications you receive.</p>

        <div className="rounded-2xl bg-white shadow-sm">
          {NOTIFICATION_ITEMS.map(({ key, label, description }, i) => (
            <div
              key={key}
              className={`flex items-center justify-between px-4 py-4 ${
                i < NOTIFICATION_ITEMS.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <div className="flex-1 pr-4">
                <p className="text-sm font-semibold text-cg-brand">{label}</p>
                <p className="text-xs text-gray-400">{description}</p>
              </div>
              <button
                onClick={() => toggle(key)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  enabled[key] ? "bg-cg-accent" : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    enabled[key] ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
