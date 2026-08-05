"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Users, Plus, Calendar as CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { CALENDAR_EVENTS, type CalendarEvent, type CalendarEventStatus } from "@/lib/mock-data/communication";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const STATUS_COLORS: Record<CalendarEventStatus, { bg: string; text: string; dot: string }> = {
  Approved: { bg: "bg-[#E8F5E9]", text: "text-[#2E7D32]", dot: "bg-[#2E7D32]" },
  Pending: { bg: "bg-[#FFF8E1]", text: "text-[#F57F17]", dot: "bg-[#F57F17]" },
  Cancelled: { bg: "bg-[#FFEBEE]", text: "text-[#C62828]", dot: "bg-[#C62828]" },
};

const EVENT_COLORS = [
  { bg: "bg-[#1E2D4A]", text: "text-white" },
  { bg: "bg-[#C47B2C]", text: "text-white" },
  { bg: "bg-[#2A8A52]", text: "text-white" },
  { bg: "bg-[#6366F1]", text: "text-white" },
  { bg: "bg-[#D4522F]", text: "text-white" },
];

type EventWithDetails = CalendarEvent & {
  audience: string;
  description: string;
  endTime: string;
  location: string;
  colorIndex: number;
};

const EVENT_FULL_DETAILS: Record<string, Omit<EventWithDetails, keyof CalendarEvent>> = {
  "evt-1": {
    audience: "All Parents",
    description: "Termly progress meetings between parents and lead caregivers. Each family has a 10-minute slot.",
    endTime: "12:00 PM",
    location: "Main Hall",
    colorIndex: 0,
  },
  "evt-2": {
    audience: "All Families",
    description: "Annual sports and family engagement day. Activities for children and parents, catering arranged.",
    endTime: "4:00 PM",
    location: "Playground",
    colorIndex: 1,
  },
  "evt-3": {
    audience: "All Parents",
    description: "End-of-term progress meeting to review each child's development and discuss next term's goals.",
    endTime: "6:00 PM",
    location: "Conference Room",
    colorIndex: 2,
  },
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function EventsV3Page() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 1)); // June 2026
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2026, 5, 12));
  const [view, setView] = useState<"month" | "week">("month");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = new Date();

  const eventsWithDetails = useMemo(() => {
    return CALENDAR_EVENTS.map((evt) => ({
      ...evt,
      ...EVENT_FULL_DETAILS[evt.id],
    }));
  }, []);

  const eventsByDay = useMemo(() => {
    const map: Record<number, EventWithDetails[]> = {};
    eventsWithDetails.forEach((evt) => {
      if (!map[evt.day]) map[evt.day] = [];
      map[evt.day].push(evt);
    });
    return map;
  }, [eventsWithDetails]);

  const calendarDays = useMemo(() => {
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);
    return days;
  }, [firstDay, daysInMonth]);

  const selectedDayEvents = useMemo(() => {
    if (!selectedDate) return [];
    if (selectedDate.getMonth() !== month || selectedDate.getFullYear() !== year) return [];
    return eventsByDay[selectedDate.getDate()] ?? [];
  }, [selectedDate, month, year, eventsByDay]);

  function prevMonth() {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
  }

  function nextMonth() {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
  }

  function goToday() {
    setCurrentDate(new Date(2026, 5, 1));
    setSelectedDate(new Date(2026, 5, 12));
  }

  function isToday(day: number) {
    return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
  }

  function isSelected(day: number) {
    return selectedDate?.getFullYear() === year && selectedDate?.getMonth() === month && selectedDate?.getDate() === day;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2D1810]">
            Calendar
          </h1>
          <button
            onClick={goToday}
            className="rounded-lg border border-black/[0.12] bg-white px-3 py-1.5 text-xs font-semibold text-[#2D1810] hover:bg-[#F5EDD8]"
          >
            Today
          </button>
          <div className="flex items-center gap-1">
            <button
              onClick={prevMonth}
              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#F5EDD8]"
            >
              <ChevronLeft className="h-4 w-4 text-[#2D1810]" />
            </button>
            <button
              onClick={nextMonth}
              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#F5EDD8]"
            >
              <ChevronRight className="h-4 w-4 text-[#2D1810]" />
            </button>
          </div>
          <h2 className="text-lg font-bold text-[#2D1810]">
            {MONTHS[month]} {year}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-black/[0.12] bg-white">
            <button
              onClick={() => setView("month")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-l-lg ${view === "month" ? "bg-[#3B2513] text-[#FAF2E1]" : "text-[#2D1810] hover:bg-[#F5EDD8]"}`}
            >
              Month
            </button>
            <button
              onClick={() => setView("week")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-r-lg ${view === "week" ? "bg-[#3B2513] text-[#FAF2E1]" : "text-[#2D1810] hover:bg-[#F5EDD8]"}`}
            >
              Week
            </button>
          </div>
          <button
            onClick={() => toast.success("New event created")}
            className="flex items-center gap-1.5 rounded-lg bg-[#3B2513] px-3 py-1.5 text-xs font-semibold text-[#FAF2E1] hover:bg-[#2D1810]"
          >
            <Plus className="h-3.5 w-3.5" /> New Event
          </button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 gap-4">
        {/* Calendar Grid */}
        <div className="flex min-h-[560px] flex-1 flex-col rounded-2xl border border-black/[0.07] bg-white">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 border-b border-black/[0.07]">
            {WEEKDAYS.map((day) => (
              <div key={day} className="py-2 text-center text-[11px] font-bold uppercase tracking-wider text-[#2D1810]/40">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid flex-1 grid-cols-7">
            {calendarDays.map((day, idx) => {
              if (day === null) {
                return <div key={`blank-${idx}`} className="border-b border-r border-black/[0.04] bg-[#FAFAF5]" />;
              }

              const dayEvents = eventsByDay[day] ?? [];
              const today = isToday(day);
              const selected = isSelected(day);

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(new Date(year, month, day))}
                  className={`relative flex min-h-[80px] flex-col border-b border-r border-black/[0.04] p-1 text-left transition-colors ${
                    selected ? "bg-[#C47B2C]/8" : "hover:bg-[#F5EDD8]/40"
                  }`}
                >
                  <span
                    className={`ml-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                      today
                        ? "bg-[#C47B2C] text-white"
                        : selected
                          ? "bg-[#C47B2C]/15 text-[#C47B2C]"
                          : "text-[#2D1810]"
                    }`}
                  >
                    {day}
                  </span>
                  <div className="mt-0.5 flex flex-1 flex-col gap-0.5 overflow-hidden">
                    {dayEvents.slice(0, 2).map((evt) => {
                      const color = EVENT_COLORS[evt.colorIndex % EVENT_COLORS.length];
                      return (
                        <div
                          key={evt.id}
                          className={`flex items-center gap-1 rounded px-1 py-0.5 text-[10px] font-medium ${color.bg} ${color.text} truncate`}
                        >
                          <span className="truncate">{evt.title}</span>
                        </div>
                      );
                    })}
                    {dayEvents.length > 2 && (
                      <span className="px-1 text-[9px] font-medium text-[#2D1810]/40">
                        +{dayEvents.length - 2} more
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Sidebar - Selected Day Details */}
        <div className="hidden w-[280px] shrink-0 flex-col gap-4 lg:flex">
          {/* Mini Calendar */}
          <div className="rounded-2xl border border-black/[0.07] bg-white p-4">
            <p className="mb-2 text-xs font-bold text-[#2D1810]">
              {MONTHS[month]} {year}
            </p>
            <div className="grid grid-cols-7 gap-0.5">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <div key={i} className="py-1 text-center text-[9px] font-bold text-[#2D1810]/35">
                  {d}
                </div>
              ))}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`blank-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const d = i + 1;
                const today = isToday(d);
                const selected = isSelected(d);
                const hasEvents = (eventsByDay[d] ?? []).length > 0;
                return (
                  <button
                    key={d}
                    onClick={() => setSelectedDate(new Date(year, month, d))}
                    className="relative flex h-6 w-6 items-center justify-center rounded-full text-[10px]"
                  >
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full ${
                        today
                          ? "bg-[#C47B2C] text-white font-bold"
                          : selected
                            ? "bg-[#C47B2C]/15 text-[#C47B2C] font-semibold"
                            : "text-[#2D1810] hover:bg-[#F5EDD8]"
                      }`}
                    >
                      {d}
                    </span>
                    {hasEvents && !today && (
                      <span className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#C47B2C]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Day Events */}
          <div className="flex-1 rounded-2xl border border-black/[0.07] bg-white p-4">
            <p className="mb-3 text-xs font-bold text-[#2D1810]">
              {selectedDate
                ? selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
                : "Select a day"}
            </p>
            {selectedDayEvents.length === 0 ? (
              <div className="flex flex-col items-center py-6 text-center">
                <CalendarIcon className="mb-2 h-8 w-8 text-[#2D1810]/15" />
                <p className="text-xs text-[#2D1810]/40">No events on this day</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {selectedDayEvents.map((evt) => {
                  const color = EVENT_COLORS[evt.colorIndex % EVENT_COLORS.length];
                  const statusColor = STATUS_COLORS[evt.status];
                  return (
                    <div key={evt.id} className="rounded-xl border border-black/[0.06] p-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${color.bg}`} />
                          <p className="text-[13px] font-semibold text-[#2D1810]">{evt.title}</p>
                        </div>
                        <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${statusColor.bg} ${statusColor.text}`}>
                          {evt.status}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-col gap-1 text-[11px] text-[#2D1810]/50">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3" />
                          {evt.time} – {evt.endTime}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CalendarIcon className="h-3 w-3" />
                          {evt.location}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="h-3 w-3" />
                          {evt.audience}
                        </div>
                      </div>
                      <p className="mt-2 text-[11px] leading-4 text-[#2D1810]/60">{evt.description}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Upcoming Events */}
          <div className="rounded-2xl border border-black/[0.07] bg-white p-4">
            <p className="mb-3 text-xs font-bold text-[#2D1810]">Upcoming</p>
            <div className="flex flex-col gap-2">
              {eventsWithDetails.map((evt) => {
                const color = EVENT_COLORS[evt.colorIndex % EVENT_COLORS.length];
                return (
                  <div key={evt.id} className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-[#F5EDD8]/40">
                    <div className={`h-2 w-2 rounded-full ${color.bg}`} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[12px] font-semibold text-[#2D1810]">{evt.title}</p>
                      <p className="text-[10px] text-[#2D1810]/40">{MONTHS[month].slice(0, 3)} {evt.day} · {evt.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
