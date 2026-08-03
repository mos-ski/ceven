"use client";

import { useState } from "react";
import { CaregiverV3BottomNav } from "@/components/caregivev3/bottom-nav";
import {
  CHILDREN,
  TODAY_MENU,
  MEDICINE_REMINDERS,
  EVENT_PREP,
} from "@/lib/caregivev3/mock-data";

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

function GreetingHeader() {
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="mb-5 flex items-center justify-between">
      <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-sm">
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
          <p className="text-[10px] text-gray-400">{dateStr}</p>
          <p className="text-xs font-semibold text-cg-brand">Blessing&apos;s Day</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {CHILDREN.map((child) => (
          <div
            key={child.id}
            className="flex items-center gap-1 rounded-full bg-white px-2 py-1 shadow-sm"
          >
            <Avatar
              initials={child.avatarInitials}
              color={child.avatarColor}
              size={16}
            />
            <span className="text-[10px] font-medium text-gray-600">{child.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MenuChecklist() {
  const [menu, setMenu] = useState(TODAY_MENU);

  const toggleTick = (mealId: string) => {
    setMenu((prev) =>
      prev.map((m) => (m.id === mealId ? { ...m, ticked: !m.ticked } : m))
    );
  };

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <h3 className="text-sm font-bold text-gray-800 mb-3">🍽️ Today&apos;s Menu</h3>
      <div className="space-y-2">
        {menu.map((meal) => (
          <button
            key={meal.id}
            onClick={() => toggleTick(meal.id)}
            className="flex w-full items-center gap-3 rounded-xl bg-[#f4f5f6] px-3 py-2.5 text-left hover:bg-gray-100 transition-colors"
          >
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-lg border-2 transition-colors ${
                meal.ticked
                  ? "border-cg-brand bg-cg-brand"
                  : "border-gray-300 bg-white"
              }`}
            >
              {meal.ticked && (
                <svg width="12" height="9" viewBox="0 0 10 8" fill="none" className="text-white">
                  <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p
                  className={`text-xs font-semibold ${
                    meal.ticked ? "text-gray-400 line-through" : "text-gray-800"
                  }`}
                >
                  {meal.label}
                </p>
                <span className="text-[9px] text-gray-400">{meal.time}</span>
              </div>
              <p
                className={`text-[11px] ${
                  meal.ticked ? "text-gray-300 line-through" : "text-gray-500"
                }`}
              >
                {meal.dishes.join(", ")}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function MedicineReminders() {
  const [reminders, setReminders] = useState(MEDICINE_REMINDERS);

  const updateStatus = (medId: string, status: "given" | "skipped") => {
    setReminders((prev) =>
      prev.map((m) => (m.id === medId ? { ...m, status } : m))
    );
  };

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <h3 className="text-sm font-bold text-gray-800 mb-3">💊 Medicine</h3>
      <div className="space-y-2">
        {reminders.map((med) => {
          const child = CHILDREN.find((c) => c.id === med.childId);
          return (
            <div key={med.id} className="rounded-xl bg-[#f4f5f6] p-3">
              <div className="flex items-center gap-2 mb-1">
                <Avatar
                  initials={child?.avatarInitials || "?"}
                  color={child?.avatarColor || "#999"}
                  size={20}
                />
                <span className="text-xs font-semibold text-gray-700">{med.childName}</span>
                <span className="text-[9px] text-gray-400 ml-auto">{med.time}</span>
              </div>
              <p className="text-[11px] text-gray-500 mb-1.5">
                {med.medicine} — {med.dosage}
              </p>
              {med.status === "pending" ? (
                <div className="flex gap-1.5">
                  <button
                    onClick={() => updateStatus(med.id, "given")}
                    className="flex-1 rounded-lg bg-cg-brand py-1.5 text-[10px] font-semibold text-white"
                  >
                    ✓ Given
                  </button>
                  <button
                    onClick={() => updateStatus(med.id, "skipped")}
                    className="flex-1 rounded-lg bg-white border border-gray-200 py-1.5 text-[10px] font-semibold text-gray-500"
                  >
                    Skip
                  </button>
                </div>
              ) : (
                <div
                  className={`rounded-lg py-1.5 text-center text-[10px] font-semibold ${
                    med.status === "given"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {med.status === "given" ? "✓ Given" : "✕ Skipped"}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EventPrepBlock() {
  const [events, setEvents] = useState(EVENT_PREP);

  const togglePack = (eventId: string, checkId: string) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.eventId === eventId
          ? {
              ...e,
              checklist: e.checklist.map((c) =>
                c.id === checkId ? { ...c, packed: !c.packed } : c
              ),
            }
          : e
      )
    );
  };

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <h3 className="text-sm font-bold text-gray-800 mb-3">🎒 Event Prep</h3>
      <div className="space-y-3">
        {events.map((event) => {
          const packed = event.checklist.filter((c) => c.packed).length;
          const total = event.checklist.length;
          return (
            <div key={event.eventId} className="rounded-xl bg-[#f4f5f6] p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm">{event.icon}</span>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-700">{event.title}</p>
                  <p className="text-[9px] text-gray-400">
                    {event.date} · {packed}/{total} packed
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                {event.checklist.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => togglePack(event.eventId, item.id)}
                    className="flex w-full items-center gap-2 rounded-lg bg-white px-2 py-1.5 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div
                      className={`flex h-4 w-4 items-center justify-center rounded border-2 transition-colors ${
                        item.packed
                          ? "border-cg-brand bg-cg-brand"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {item.packed && (
                        <svg width="8" height="6" viewBox="0 0 10 8" fill="none" className="text-white">
                          <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span
                      className={`text-[11px] ${
                        item.packed ? "text-gray-400 line-through" : "text-gray-600"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
              {event.note && (
                <p className="text-[9px] text-gray-400 mt-2 italic">📝 {event.note}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function CaregiverV3TodayPage() {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-cg-bg">
      <div className="flex-1 overflow-y-auto px-4 pt-2 pb-4">
        <GreetingHeader />
        <div className="space-y-3">
          <MenuChecklist />
          <MedicineReminders />
          <EventPrepBlock />
        </div>
      </div>
      <CaregiverV3BottomNav />
    </div>
  );
}
