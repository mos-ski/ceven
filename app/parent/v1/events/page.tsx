"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { ParentBottomNav } from "@/components/parent/bottom-nav";
import { getEvents, rsvpEvent, type CrecheEvent } from "@/lib/shared/events";
import { NewBadge } from "@/components/parent/new-badge";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function ParentEventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<CrecheEvent[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    setEvents(getEvents());
    const handler = () => setEvents(getEvents());
    window.addEventListener("ceven-events-updated", handler);
    return () => window.removeEventListener("ceven-events-updated", handler);
  }, []);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const eventDates = new Set(events.map((e) => e.date));
  const selectedEvents = selectedDate ? events.filter((e) => e.date === selectedDate) : [];

  function prevMonth() {
    setCurrentMonth(new Date(year, month - 1, 1));
    setSelectedDate(null);
  }

  function nextMonth() {
    setCurrentMonth(new Date(year, month + 1, 1));
    setSelectedDate(null);
  }

  function handleRsvp(id: string, status: "attending" | "not_attending") {
    rsvpEvent(id, status);
    setEvents(getEvents());
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#fffefa]">
      <div className="flex items-center gap-3 bg-white px-5 pt-12 pb-4 shadow-sm">
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-base font-bold text-cg-brand">Events Calendar</h1>
            <NewBadge />
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {/* Calendar header */}
        <div className="mb-4 flex items-center justify-between">
          <button onClick={prevMonth} className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
            <ChevronLeft size={16} className="text-gray-600" />
          </button>
          <p className="text-sm font-bold text-gray-800">{MONTHS[month]} {year}</p>
          <button onClick={nextMonth} className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
            <ChevronRight size={16} className="text-gray-600" />
          </button>
        </div>

        {/* Day headers */}
        <div className="mb-2 grid grid-cols-7 gap-1">
          {DAYS.map((d) => (
            <p key={d} className="text-center text-[10px] font-semibold text-gray-400">{d}</p>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="mb-4 grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const hasEvent = eventDates.has(dateStr);
            const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
            const isSelected = selectedDate === dateStr;

            return (
              <button
                key={day}
                onClick={() => setSelectedDate(dateStr)}
                className={`aspect-square flex flex-col items-center justify-center rounded-xl text-xs font-semibold transition-colors ${
                  isSelected
                    ? "bg-cg-brand text-white"
                    : isToday
                    ? "bg-cg-quick-action text-cg-brand"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {day}
                {hasEvent && (
                  <div className={`mt-0.5 h-1 w-1 rounded-full ${isSelected ? "bg-white" : "bg-cg-brand"}`} />
                )}
              </button>
            );
          })}
        </div>

        {/* Events for selected date or upcoming */}
        <p className="mb-2 text-sm font-semibold text-gray-700">
          {selectedDate
            ? `Events on ${new Date(selectedDate + "T12:00:00").toLocaleDateString("en-NG", { month: "long", day: "numeric" })}`
            : "Upcoming Events"}
        </p>

        <div className="flex flex-col gap-2">
          {(selectedDate ? selectedEvents : events.slice(0, 5)).map((event) => (
            <div key={event.id} className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="mb-2 flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} className="shrink-0 text-cg-brand" />
                  <p className="text-sm font-bold text-gray-800">{event.title}</p>
                </div>
                {event.rsvpRequired && (
                  <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                    RSVP Required
                  </span>
                )}
              </div>
              <p className="mb-2 text-xs text-gray-500 leading-relaxed">{event.description}</p>
              <div className="mb-3 flex items-center gap-3 text-[10px] text-gray-400">
                <span className="flex items-center gap-1"><Clock size={11} /> {event.startTime} - {event.endTime}</span>
                {event.room && <span className="flex items-center gap-1"><Users size={11} /> {event.room}</span>}
              </div>
              <div className="flex items-center gap-2">
                <p className="text-[10px] text-gray-400">{event.date}</p>
                {event.rsvpStatus && (
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    event.rsvpStatus === "attending" ? "bg-emerald-100 text-emerald-700" :
                    event.rsvpStatus === "not_attending" ? "bg-red-100 text-red-600" :
                    "bg-gray-100 text-gray-500"
                  }`}>
                    {event.rsvpStatus === "attending" ? "Attending" : event.rsvpStatus === "not_attending" ? "Not Attending" : "Pending"}
                  </span>
                )}
              </div>
              {event.rsvpRequired && (
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => handleRsvp(event.id, "attending")}
                    className={`flex-1 rounded-xl py-2 text-xs font-semibold transition-colors ${
                      event.rsvpStatus === "attending" ? "bg-emerald-500 text-white" : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    Attending
                  </button>
                  <button
                    onClick={() => handleRsvp(event.id, "not_attending")}
                    className={`flex-1 rounded-xl py-2 text-xs font-semibold transition-colors ${
                      event.rsvpStatus === "not_attending" ? "bg-red-500 text-white" : "bg-red-50 text-red-600"
                    }`}
                  >
                    Not Attending
                  </button>
                </div>
              )}
            </div>
          ))}
          {(selectedDate ? selectedEvents : events).length === 0 && (
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
              <CalendarDays size={24} className="mx-auto mb-2 text-gray-300" />
              <p className="text-sm text-gray-400">No events scheduled.</p>
            </div>
          )}
        </div>
      </div>

      <ParentBottomNav />
    </div>
  );
}
