"use client";

import { useState } from "react";
import { ParentV3BottomNav } from "@/components/parentv3/bottom-nav";
import { UPCOMING_EVENTS, CHILDREN } from "@/lib/parentv3/mock-data";

function EventCard({
  event,
  onToggle,
}: {
  event: (typeof UPCOMING_EVENTS)[0];
  onToggle: (eventId: string, checkId: string) => void;
}) {
  const packed = event.checklist.filter((c) => c.packed).length;
  const total = event.checklist.length;
  const eventChildren = event.childIds
    .map((id) => CHILDREN.find((c) => c.id === id))
    .filter(Boolean);

  return (
    <div className="rounded-2xl bg-[#f4f5f6] p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{event.icon}</span>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-gray-800">{event.title}</h3>
          <p className="text-[10px] text-gray-400">
            {event.date} · {event.time}
          </p>
        </div>
        <div className="flex -space-x-1">
          {eventChildren.map(
            (child) =>
              child && (
                <div
                  key={child.id}
                  className="flex h-5 w-5 items-center justify-center rounded-full text-[8px] text-white font-bold border-2 border-white"
                  style={{ backgroundColor: child.avatarColor }}
                >
                  {child.avatarInitials}
                </div>
              )
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 h-1.5 rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-cg-accent transition-all"
            style={{ width: `${(packed / total) * 100}%` }}
          />
        </div>
        <span className="text-[10px] text-gray-400">
          {packed}/{total}
        </span>
      </div>

      <div className="space-y-1.5 mb-3">
        {event.checklist.map((item) => (
          <button
            key={item.id}
            onClick={() => onToggle(event.id, item.id)}
            className="flex w-full items-center gap-2.5 rounded-xl bg-white px-3 py-2 text-left hover:bg-gray-50 transition-colors"
          >
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition-colors ${
                item.packed
                  ? "border-cg-brand bg-cg-brand"
                  : "border-gray-300 bg-white"
              }`}
            >
              {item.packed && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" className="text-white">
                  <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span
              className={`text-xs ${
                item.packed ? "text-gray-400 line-through" : "text-gray-700"
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {event.note && (
        <div className="rounded-xl bg-white p-3">
          <p className="text-[10px] text-gray-500 italic">📝 {event.note}</p>
        </div>
      )}
    </div>
  );
}

export default function ParentV3CalendarPage() {
  const [events, setEvents] = useState(UPCOMING_EVENTS);

  const toggleCheck = (eventId: string, checkId: string) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
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
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-[#fffefa]">
      <div className="flex-1 overflow-y-auto scrollbar-thin px-6 pb-4">
        {/* Top bar */}
        <div className="flex items-center justify-between pt-4 pb-2">
          <div>
            <h1 className="text-base font-bold text-gray-800">Calendar</h1>
            <p className="text-[10px] text-gray-500">Upcoming events & prep</p>
          </div>
        </div>

        <div className="space-y-3 mt-2">
          {events.map((event) => (
            <EventCard key={event.id} event={event} onToggle={toggleCheck} />
          ))}
        </div>
      </div>
      <ParentV3BottomNav />
    </div>
  );
}
