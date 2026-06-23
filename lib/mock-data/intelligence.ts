// ── Analytics tab ───────────────────────────────────────────────────────────

export type AnalyticsMetric = {
  label: string;
  value: string;
  trendLabel: string;
  trendUp?: boolean;
};

export const ANALYTICS_METRICS: AnalyticsMetric[] = [
  { label: "AI Insights Generated", value: "248", trendLabel: "+18% this month", trendUp: true },
  { label: "Avg. Response Time", value: "1.4s", trendLabel: "-0.3s vs last month", trendUp: true },
  { label: "Flags Resolved", value: "92%", trendLabel: "+4% this month", trendUp: true },
  { label: "Active Recommendations", value: "12", trendLabel: "3 awaiting action", trendUp: false },
];

export type TrendPoint = {
  label: string;
  value: number;
};

export const INSIGHT_TREND: TrendPoint[] = [
  { label: "Mon", value: 28 },
  { label: "Tue", value: 34 },
  { label: "Wed", value: 22 },
  { label: "Thu", value: 41 },
  { label: "Fri", value: 38 },
  { label: "Sat", value: 19 },
  { label: "Sun", value: 25 },
];

export type CategoryBreakdown = {
  label: string;
  pct: number;
  color: string;
};

export const INSIGHT_CATEGORIES: CategoryBreakdown[] = [
  { label: "Health & Welfare", pct: 38, color: "#c47b2c" },
  { label: "Staff Compliance", pct: 27, color: "#3b2513" },
  { label: "Finance", pct: 21, color: "#009061" },
  { label: "Attendance", pct: 14, color: "#ef4444" },
];

export type RoomEngagement = {
  room: string;
  score: number;
};

export const ROOM_ENGAGEMENT: RoomEngagement[] = [
  { room: "Lion Class", score: 88 },
  { room: "Tiger Room", score: 74 },
  { room: "Bear Class", score: 81 },
  { room: "Owl Class", score: 65 },
];

export type AttendanceDay = {
  day: string;
  date: string;
  checkedIn: number;
  total: number;
};

export const ATTENDANCE_WEEK: AttendanceDay[] = [
  { day: "Monday", date: "8/8", checkedIn: 8, total: 8 },
  { day: "Tuesday", date: "6/8", checkedIn: 6, total: 8 },
  { day: "Wednesday", date: "8/8", checkedIn: 8, total: 8 },
  { day: "Thursday", date: "6/8", checkedIn: 6, total: 8 },
  { day: "Friday", date: "6/8", checkedIn: 6, total: 8 },
];

export type RevenueMonthPoint = {
  month: string;
  billed: number;
  collected: number;
};

export const REVENUE_MONTHLY: RevenueMonthPoint[] = [
  { month: "Jan", billed: 78, collected: 12 },
  { month: "Feb", billed: 20, collected: 23 },
  { month: "Mar", billed: 62, collected: 18 },
  { month: "Apr", billed: 38, collected: 14 },
  { month: "May", billed: 90, collected: 36 },
  { month: "Jun", billed: 65, collected: 21 },
  { month: "Jul", billed: 62, collected: 98 },
  { month: "Aug", billed: 85, collected: 64 },
  { month: "Sep", billed: 95, collected: 45 },
  { month: "Oct", billed: 90, collected: 98 },
  { month: "Nov", billed: 24, collected: 33 },
  { month: "Dec", billed: 74, collected: 95 },
];

export type StaffComplianceRating = {
  id: string;
  name: string;
  role: string;
  rooms: string;
  rating: number;
  note: string;
  compliancePct: number;
  highlight?: boolean;
};

export const STAFF_COMPLIANCE_RATINGS: StaffComplianceRating[] = [
  { id: "scr-1", name: "Mrs. Sarah Okonkwo", role: "Caregiver", rooms: "Lion Class", rating: 4.8, note: "Top performer this week", compliancePct: 96, highlight: true },
  { id: "scr-2", name: "Mr. Tunde Bakare", role: "Caregiver", rooms: "Panda Class", rating: 4.3, note: "Consistent logging", compliancePct: 88 },
  { id: "scr-3", name: "Mrs. Ngozi Eze", role: "Caregiver", rooms: "Owl Class", rating: 3.5, note: "Logging compliance dropped this week", compliancePct: 62 },
  { id: "scr-4", name: "Mrs. Amaka Taiwo", role: "Caregiver", rooms: "Bear Class", rating: 4.6, note: "Great work so far", compliancePct: 91 },
  { id: "scr-5", name: "Mr. James Adamu", role: "Marketer", rooms: "External", rating: 3.0, note: "Needs improvement on response time", compliancePct: 45 },
];

export type AnnouncementType = "Incident" | "General" | "Reminder" | "Emergency";

export const ANNOUNCEMENT_TYPES: AnnouncementType[] = ["Incident", "General", "Reminder", "Emergency"];

export const ANNOUNCEMENT_AUDIENCES = ["All Parents", "All Staff", "Specific Room", "Specific Child"];

// ── Reports tab ──────────────────────────────────────────────────────────────

export type ReportStatus = "Ready" | "Scheduled" | "Generating";

export type GeneratedReport = {
  id: string;
  title: string;
  type: string;
  fileType: "PDF" | "CSV" | "XLSX";
  generatedOn: string;
  generatedBy: string;
  status: ReportStatus;
};

export const GENERATED_REPORTS: GeneratedReport[] = [
  {
    id: "rpt-1",
    title: "Monthly Attendance Summary — May 2026",
    type: "Attendance",
    fileType: "PDF",
    generatedOn: "01 Jun 2026",
    generatedBy: "Ada (AI)",
    status: "Ready",
  },
  {
    id: "rpt-2",
    title: "Staff Compliance Audit — Q2 2026",
    type: "Compliance",
    fileType: "XLSX",
    generatedOn: "15 Jun 2026",
    generatedBy: "Mrs. Anita",
    status: "Ready",
  },
  {
    id: "rpt-3",
    title: "Outstanding Payments Report",
    type: "Finance",
    fileType: "CSV",
    generatedOn: "18 Jun 2026",
    generatedBy: "Ada (AI)",
    status: "Ready",
  },
  {
    id: "rpt-4",
    title: "Weekly Health & Incidents Digest",
    type: "Health & Welfare",
    fileType: "PDF",
    generatedOn: "22 Jun 2026",
    generatedBy: "Ada (AI)",
    status: "Scheduled",
  },
  {
    id: "rpt-5",
    title: "Enrolment & Waitlist Snapshot",
    type: "Enrolment",
    fileType: "PDF",
    generatedOn: "—",
    generatedBy: "Mrs. Sarah",
    status: "Generating",
  },
];

export const REPORT_TYPE_OPTIONS = [
  "Attendance",
  "Compliance",
  "Finance",
  "Health & Welfare",
  "Enrolment",
  "Staff Performance",
] as const;

export const REPORT_FILE_TYPE_OPTIONS = ["PDF", "CSV", "XLSX"] as const;

export const REPORT_REPEAT_OPTIONS = ["Does not repeat", "Daily", "Weekly", "Monthly"] as const;

export const REPORT_RECIPIENT_OPTIONS = [
  "All Parents",
  "Room 1 Parents",
  "Room 2 Parents",
  "Individual Parent",
] as const;

// ── Audit Trail tab ──────────────────────────────────────────────────────────

export type AuditActor = "AI" | "Admin";

export type AuditLogEntry = {
  id: string;
  actor: AuditActor;
  actorName: string;
  action: string;
  detail: string;
  timestamp: string;
};

export const AUDIT_LOG: AuditLogEntry[] = [
  {
    id: "log-1",
    actor: "AI",
    actorName: "Ada",
    action: "Flagged attendance anomaly",
    detail: "3 children in Lion Class exceeded 40% absence rate this month.",
    timestamp: "21 Jun 2026, 8:02 AM",
  },
  {
    id: "log-2",
    actor: "Admin",
    actorName: "Mrs. Sarah",
    action: "Reviewed and dismissed flag",
    detail: "Marked 'Health trend flagged — Tiger Room' as reviewed.",
    timestamp: "21 Jun 2026, 8:41 AM",
  },
  {
    id: "log-3",
    actor: "AI",
    actorName: "Ada",
    action: "Generated report",
    detail: "Monthly Attendance Summary — May 2026 (PDF) auto-generated and sent to admin inbox.",
    timestamp: "20 Jun 2026, 6:00 AM",
  },
  {
    id: "log-4",
    actor: "Admin",
    actorName: "Mr. James",
    action: "Sent parent reminder",
    detail: "Payment reminder sent to Okafor Family (₦40,000 overdue).",
    timestamp: "20 Jun 2026, 2:15 PM",
  },
  {
    id: "log-5",
    actor: "AI",
    actorName: "Ada",
    action: "Drafted parent message",
    detail: "Drafted absence follow-up message for Mrs. Mohammed re: Zara M.",
    timestamp: "19 Jun 2026, 9:30 AM",
  },
  {
    id: "log-6",
    actor: "Admin",
    actorName: "Mrs. Anita",
    action: "Updated medical record",
    detail: "Updated Mia T.'s allergy list following caregiver note.",
    timestamp: "18 Jun 2026, 11:05 AM",
  },
  {
    id: "log-7",
    actor: "AI",
    actorName: "Ada",
    action: "Compliance gap identified",
    detail: "2 children found with outdated vaccination records — flagged for follow-up.",
    timestamp: "17 Jun 2026, 7:50 AM",
  },
  {
    id: "log-8",
    actor: "Admin",
    actorName: "Mrs. Ngozi",
    action: "Scheduled report",
    detail: "Scheduled weekly Health & Incidents Digest, recipients: All Parents.",
    timestamp: "16 Jun 2026, 4:20 PM",
  },
];

// ── Shared action menus ──────────────────────────────────────────────────────

export const PAYMENT_ROW_ACTIONS = [
  "Record Payment",
  "Send Reminder",
  "View History",
  "Contact Parent",
] as const;
