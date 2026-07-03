"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type Toggle = { id: string; label: string; description: string; on: boolean };

const INITIAL: Toggle[] = [
  { id: "daily-report",  label: "Daily Report Ready",   description: "Get notified when your child's daily report is available", on: true },
  { id: "messages",      label: "New Messages",          description: "Receive alerts for new messages from caregivers",          on: true },
  { id: "fee-due",       label: "Fee Reminders",         description: "Reminders when term fees are approaching due date",        on: true },
  { id: "incidents",     label: "Incident Alerts",       description: "Immediate notification for any reported incidents",        on: true },
  { id: "gallery",       label: "New Photos & Videos",   description: "When caregivers upload new activity photos",               on: false },
  { id: "enrollment",    label: "Enrolment Updates",     description: "Status updates on your creche enrolment requests",        on: true },
  { id: "promotions",    label: "Promotions & Offers",   description: "Occasional offers and app feature announcements",          on: false },
];

function ToggleSwitch({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative h-6 w-11 rounded-full transition-colors ${on ? "bg-cg-brand" : "bg-gray-200"}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5" : "translate-x-0"}`}
      />
    </button>
  );
}

export default function NotificationSettingsPage() {
  const router = useRouter();
  const [toggles, setToggles] = useState(INITIAL);

  function flip(id: string) {
    setToggles((prev) => prev.map((t) => t.id === id ? { ...t, on: !t.on } : t));
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="relative overflow-hidden bg-[#5B391E] px-6 pt-14 pb-6">
        <div className="pointer-events-none absolute top-0 right-0 h-[220px] w-[220px] rounded-full bg-[#D4A67F] opacity-20" />
        <button onClick={() => router.back()} className="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
          <ArrowLeft size={16} className="text-white" />
        </button>
        <h1 className="text-xl font-bold text-white">Notification Settings</h1>
        <p className="mt-1 text-sm text-white/70">Choose what you want to be notified about.</p>
      </div>

      <div className="flex-1 overflow-y-auto bg-white px-6 py-5">
        <div className="rounded-2xl border border-gray-100 overflow-hidden">
          {toggles.map((t, i) => (
            <div
              key={t.id}
              className={`flex items-center gap-4 px-4 py-4 ${i < toggles.length - 1 ? "border-b border-gray-50" : ""}`}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800">{t.label}</p>
                <p className="mt-0.5 text-xs text-gray-400 leading-relaxed">{t.description}</p>
              </div>
              <ToggleSwitch on={t.on} onChange={() => flip(t.id)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
