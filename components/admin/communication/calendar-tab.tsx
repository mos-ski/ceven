"use client";

import { Calendar, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useState } from "react";

import {
  CALENDAR_EVENTS,
  CALENDAR_LEADING_BLANKS,
  CALENDAR_MONTH_DAYS,
  CALENDAR_MONTH_LABEL,
  type CalendarEventStatus,
} from "@/lib/mock-data/communication";

const STATUS_BADGE_CLASS: Record<CalendarEventStatus, string> = {
  Approved: "bg-[#e8f1ff] text-[#1a78f2]",
  Pending: "bg-[#fff6e6] text-[#cc8000]",
  Cancelled: "bg-[#fde8e8] text-[#ef4444]",
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function MonthGrid() {
  const eventsByDay = new Map(CALENDAR_EVENTS.map((e) => [e.day, e]));
  const cells: (number | null)[] = [
    ...Array.from({ length: CALENDAR_LEADING_BLANKS }, () => null),
    ...Array.from({ length: CALENDAR_MONTH_DAYS }, (_, i) => i + 1),
  ];

  return (
    <div className="flex w-full flex-col rounded-2xl border border-[#d3d3d3] bg-white p-4 lg:w-[768px]">
      <div className="mb-4 flex items-center gap-4">
        <button aria-label="Previous month" className="text-[#2b3641] hover:text-[#3b2513]">
          <ChevronLeft className="size-5" />
        </button>
        <p className="font-[family-name:var(--font-merriweather)] text-lg font-bold">
          <span className="text-[#282c31]">{CALENDAR_MONTH_LABEL.split(" ")[0]}</span>{" "}
          <span className="text-[#7e7e7e]">{CALENDAR_MONTH_LABEL.split(" ")[1]}</span>
        </p>
        <button aria-label="Next month" className="text-[#2b3641] hover:text-[#3b2513]">
          <ChevronRight className="size-5" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-1 font-[family-name:var(--font-nunito)] text-sm text-[#2b3641]">
            {d}
          </div>
        ))}
        {cells.map((day, i) => {
          if (day === null) return <div key={`blank-${i}`} />;
          const event = eventsByDay.get(day);
          return (
            <div key={day} className="flex min-h-[88px] flex-col gap-1 rounded-lg border border-[#d3d8dd] p-1.5 text-left">
              <span className="font-[family-name:var(--font-merriweather)] text-sm font-bold text-[#2b3641]">{day}</span>
              {event && (
                <div className="flex flex-col gap-1 rounded bg-[#f5edd8] p-1">
                  <p className="font-[family-name:var(--font-nunito)] text-[10px] font-semibold text-[#2d1810]">
                    {event.title}
                  </p>
                  <p className="font-[family-name:var(--font-nunito)] text-[9px] text-[#6b7280]">{event.time}</p>
                  <span className={`w-fit rounded-full px-1.5 py-0.5 font-[family-name:var(--font-urbanist)] text-[8px] font-bold ${STATUS_BADGE_CLASS[event.status]}`}>
                    {event.status}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function UpcomingEventsPanel() {
  const [search, setSearch] = useState("");
  const filtered = CALENDAR_EVENTS.filter((e) => e.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-1 flex-col gap-4 rounded-xl bg-white p-4">
      <p className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-black">Upcoming Events</p>
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-2 size-4 -translate-y-1/2 text-[rgba(45,24,16,0.5)]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search children, parents…"
            className="h-8 w-full rounded-lg border border-[rgba(45,24,16,0.12)] bg-[#f5edd8] pl-8 font-[family-name:var(--font-nunito)] text-xs text-[#2d1810] placeholder:text-[rgba(45,24,16,0.5)] outline-none"
          />
        </div>
        <button className="flex items-center gap-1.5 rounded-lg border border-[#ccd2dc] px-3 py-2 font-[family-name:var(--font-nunito)] text-xs font-semibold text-[#454b54]">
          Date Filter
          <Calendar className="size-3" />
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-1 py-12 text-center">
          <p className="font-[family-name:var(--font-nunito)] text-base font-semibold text-[#2d2e2e]">
            No Upcoming Events
          </p>
          <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6f7682]">
            No events coming up, you can start by scheduling one
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((event) => (
            <div key={event.id} className="flex items-center gap-3">
              <div className="flex flex-col items-center rounded-lg bg-[#f5edd8] px-2 py-1">
                <span className="font-[family-name:var(--font-nunito)] text-xs font-bold text-[#3b2513]">{event.day}</span>
                <span className="font-[family-name:var(--font-nunito)] text-[9px] text-[#6b7280]">JUN</span>
              </div>
              <div>
                <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">{event.title}</p>
                <p className="font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">{event.time}</p>
              </div>
              <span className={`ml-auto rounded-full px-2 py-0.5 font-[family-name:var(--font-urbanist)] text-[10px] font-bold ${STATUS_BADGE_CLASS[event.status]}`}>
                {event.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function CalendarTab() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">
          Event Calendar
        </h1>
        <button className="rounded-lg bg-[#3b2513] px-5 py-3 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1]">
          New Event
        </button>
      </div>
      <div className="flex flex-col gap-4 lg:flex-row">
        <MonthGrid />
        <UpcomingEventsPanel />
      </div>
    </div>
  );
}
