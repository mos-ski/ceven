"use client";

import { Clock, Users } from "lucide-react";
import { CALENDAR_EVENTS, CALENDAR_MONTH_LABEL, type CalendarEventStatus } from "@/lib/mock-data/communication";

// The v2 calendar mock data only carries day/title/time/status — audience,
// description and action labels are invented here for the richer event-card
// layout this page needs (no v2 equivalent existed for these fields).
const EVENT_DETAILS: Record<
  string,
  { audience: string; description: string; actions: string[]; accent: "navy" | "amber" | "green" }
> = {
  "evt-1": {
    audience: "All Parents",
    description:
      "Termly progress meetings between parents and lead caregivers. Each family has a 10-minute slot.",
    actions: ["Manage Bookings", "Send Reminder"],
    accent: "navy",
  },
  "evt-2": {
    audience: "All Families",
    description:
      "Annual sports and family engagement day. Activities for children and parents, catering arranged.",
    actions: ["View RSVPs", "Send Invite"],
    accent: "amber",
  },
  "evt-3": {
    audience: "All Parents",
    description: "End-of-term progress meeting to review each child's development and discuss next term's goals.",
    actions: ["Manage Bookings", "Send Reminder"],
    accent: "green",
  },
};

const STATUS_BADGE_CLASS: Record<CalendarEventStatus, string> = {
  Approved: "bg-[#E8F1FF] text-[#1A78F2]",
  Pending: "bg-[#FFF6E6] text-[#C47B2C]",
  Cancelled: "bg-[#FDE8E8] text-[#EF4444]",
};

const ACCENT_CARD_CLASS: Record<"navy" | "amber" | "green", string> = {
  navy: "border-[#1E2D4A]/15 bg-[#1E2D4A]/[0.05]",
  amber: "border-[#C47B2C]/20 bg-[#C47B2C]/[0.06]",
  green: "border-[#2A8A52]/15 bg-[#2A8A52]/[0.05]",
};

const MONTH_ABBR = CALENDAR_MONTH_LABEL.split(" ")[0]?.slice(0, 3).toUpperCase() ?? "";

export default function EventsV3Page() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2D1810]">
          Events Calendar
        </h1>
        <p className="mt-1 text-sm text-[#2D1810]/50">
          {CALENDAR_EVENTS.length} upcoming events · {CALENDAR_MONTH_LABEL}
        </p>
      </div>

      <div className="rounded-2xl border border-black/[0.07] bg-white p-5">
        <p className="mb-4 text-sm font-bold text-[#2D1810]">Upcoming Events</p>
        <div className="flex flex-col gap-3">
          {CALENDAR_EVENTS.map((event) => {
            const details = EVENT_DETAILS[event.id];
            return (
              <div
                key={event.id}
                className={`rounded-xl border p-4 ${details ? ACCENT_CARD_CLASS[details.accent] : "border-black/[0.08] bg-[#F5EDD8]/40"}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex w-12 shrink-0 flex-col items-center rounded-lg bg-white px-2 py-1.5 shadow-sm">
                      <span className="font-[family-name:var(--font-merriweather)] text-lg font-bold leading-none text-[#2D1810]">
                        {event.day}
                      </span>
                      <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wide text-[#2D1810]/50">
                        {MONTH_ABBR}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#2D1810]">{event.title}</p>
                      <p className="mt-0.5 flex items-center gap-1.5 text-xs text-[#2D1810]/50">
                        <Clock className="h-3 w-3" />
                        {event.time}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${STATUS_BADGE_CLASS[event.status]}`}
                  >
                    {event.status}
                  </span>
                </div>

                {details && (
                  <>
                    <p className="mt-3 text-xs leading-5 text-[#2D1810]/70">{details.description}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-[#2D1810]">
                        <Users className="h-3 w-3" />
                        {details.audience}
                      </span>
                      {details.actions.map((action) => (
                        <button
                          key={action}
                          className="rounded-full border border-black/[0.1] bg-white px-3 py-1 text-[11px] font-semibold text-[#3B2513] hover:bg-[#F5EDD8]"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
