// ─── Announcements ───────────────────────────────────────────────────────────

export type AnnouncementLogEntry = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  recipientCount: number;
  viewCount: number;
};

export const ANNOUNCEMENT_LOG: AnnouncementLogEntry[] = [
  {
    id: "ann-1",
    title: "Parent-Teacher Meeting",
    excerpt: "Reminder: our termly parent-teacher meeting is this Friday at 4pm in the main hall.",
    date: "Jun 20",
    recipientCount: 40,
    viewCount: 28,
  },
  {
    id: "ann-2",
    title: "Mid-Term Break Notice",
    excerpt: "The creche will be closed for mid-term break from July 5 to July 10. Regular hours resume July 11.",
    date: "Jun 18",
    recipientCount: 40,
    viewCount: 35,
  },
  {
    id: "ann-3",
    title: "Fee Payment Reminder",
    excerpt: "This is a reminder that termly fees are due by the end of the month. Please settle outstanding balances.",
    date: "Jun 15",
    recipientCount: 12,
    viewCount: 9,
  },
];

export const ANNOUNCEMENT_AUDIENCES = ["All Parents", "All Staff", "Specific Room", "Specific Child"];

export type AnnouncementType = "General" | "Incident" | "Reminder" | "Event" | "Emergency";

export const ANNOUNCEMENT_TYPES: AnnouncementType[] = ["General", "Incident", "Reminder", "Event", "Emergency"];

export type AnnouncementTemplate = {
  id: string;
  label: string;
  excerpt: string;
};

export const ANNOUNCEMENT_TEMPLATES: AnnouncementTemplate[] = [
  {
    id: "tmpl-incident",
    label: "Incident Report",
    excerpt:
      "Dear parent, just to let you know that your child was involved in a minor incident today. Our staff have logged the details and your child is doing well.",
  },
  {
    id: "tmpl-payment",
    label: "Payment Reminder",
    excerpt: "This is a friendly reminder that your account has an outstanding balance. Please make payment at your earliest convenience.",
  },
  {
    id: "tmpl-meeting",
    label: "Meeting Reminder",
    excerpt: "Reminder: we have a parent-teacher meeting scheduled. We look forward to seeing you there.",
  },
  {
    id: "tmpl-update",
    label: "General Update",
    excerpt: "We wanted to share an update with you regarding upcoming activities and changes at the creche.",
  },
];

export const ANNOUNCEMENT_QUICK_PROMPTS = [
  "Create meeting announcement",
  "Create payment reminder",
  "Button CTA",
];

// ─── Events Calendar ─────────────────────────────────────────────────────────

export type CalendarEventStatus = "Approved" | "Pending" | "Cancelled";

export type CalendarEvent = {
  id: string;
  day: number;
  title: string;
  time: string;
  status: CalendarEventStatus;
};

export const CALENDAR_MONTH_LABEL = "June 2026";
export const CALENDAR_MONTH_DAYS = 30;
export const CALENDAR_LEADING_BLANKS = 1; // June 1, 2026 falls on a Monday

export const CALENDAR_EVENTS: CalendarEvent[] = [
  { id: "evt-1", day: 12, title: "Conference", time: "9:00 AM", status: "Approved" },
  { id: "evt-2", day: 19, title: "Sports Day", time: "10:00 AM", status: "Pending" },
  { id: "evt-3", day: 26, title: "Parents Meeting", time: "4:00 PM", status: "Approved" },
];
