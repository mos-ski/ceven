import { CHILDREN, CHILDREN_STATS } from "@/lib/mock-data/children";
import { STAFF } from "@/lib/mock-data/staff";
import { INCIDENTS } from "@/lib/mock-data/daily-operations";
import { STAFF_TASKS } from "@/lib/mock-data/daily-operations";
import { BILLING_STATS } from "@/lib/mock-data/finance";

export const DASHBOARD_STATS = [
  { label: "Enrolled", value: String(CHILDREN_STATS.totalEnrolled) },
  { label: "Present Today", value: String(CHILDREN.filter((c) => c.status === "Present").length) },
  { label: "Absent", value: String(CHILDREN.filter((c) => c.status === "Absent").length) },
  { label: "Staff on Duty", value: String(STAFF.filter((s) => s.status === "Active").length) },
  { label: "Outstanding Fees", value: BILLING_STATS.find((s) => s.label === "Outstanding")?.value ?? "₦0" },
  { label: "Open Incidents", value: String(INCIDENTS.filter((i) => i.status === "Open").length) },
  { label: "Reports Pending", value: "3" },
  { label: "Tasks Overdue", value: String(STAFF_TASKS.filter((t) => t.status === "Overdue").length) },
];

export const AI_DAILY_BRIEF = {
  generatedAt: "7:00am",
  insights: [
    { text: "3 invoices are now over 7 days overdue — draft reminders?", cta: "Draft Reminders" },
    { text: "King Andrew has an open severe-fever incident with no follow-up logged yet.", cta: "View Incident" },
    { text: "Bear Class is at 75% capacity — 2 waitlisted families could convert this week.", cta: "View Waitlist" },
  ],
};

export const QUICK_ACTIONS = [
  { label: "Add Child", href: "/admin/v1/children" },
  { label: "QR Station", href: "/admin/v1/reception-qr" },
  { label: "New Log", href: "/admin/v1/daily-logs" },
  { label: "New Invoice", href: "/admin/v1/billing-payments" },
  { label: "View Reports", href: "/admin/v1/reports" },
];

export type OverdueInvoiceRow = {
  id: string;
  child: string;
  parent: string;
  amount: string;
  daysOverdue: number;
  risk: "High" | "Medium" | "Low";
};

export const OVERDUE_INVOICES: OverdueInvoiceRow[] = [
  { id: "inv-1", child: "King Andrew", parent: "Mrs Bakare", amount: "₦40,000", daysOverdue: 14, risk: "High" },
  { id: "inv-2", child: "Faith Eze", parent: "Mr & Mrs Eze", amount: "₦40,000", daysOverdue: 9, risk: "High" },
  { id: "inv-3", child: "Tobi Adewale", parent: "Mrs Adewale", amount: "₦40,000", daysOverdue: 5, risk: "Medium" },
  { id: "inv-4", child: "Hassan Yusuf", parent: "Mrs Yusuf", amount: "₦40,000", daysOverdue: 3, risk: "Medium" },
  { id: "inv-5", child: "Ireti Olawale", parent: "Mr Olawale", amount: "₦40,000", daysOverdue: 1, risk: "Low" },
];

export type ActivityEvent = {
  id: string;
  type: "enrolment" | "payment" | "incident" | "staff" | "message" | "task";
  text: string;
  time: string;
};

export const ACTIVITY_FEED: ActivityEvent[] = [
  { id: "act-1", type: "payment", text: "Mrs Bakare's invoice marked overdue (₦40,000)", time: "2 min ago" },
  { id: "act-2", type: "incident", text: "New incident logged for King Andrew — Minor fall", time: "18 min ago" },
  { id: "act-3", type: "enrolment", text: "New enquiry received from Mrs Bankole", time: "34 min ago" },
  { id: "act-4", type: "staff", text: "Mrs. Ngozi Eze checked in for Owl Class", time: "1 hr ago" },
  { id: "act-5", type: "message", text: "Ada drafted a reminder for 3 overdue families", time: "1 hr ago" },
  { id: "act-6", type: "task", text: "\"Submit daily report\" marked overdue for Mr Gbenga", time: "2 hrs ago" },
  { id: "act-7", type: "payment", text: "Mr & Mrs Chukwu paid invoice in full (₦40,000)", time: "3 hrs ago" },
  { id: "act-8", type: "enrolment", text: "Trial session scheduled for Halima Sani", time: "4 hrs ago" },
  { id: "act-9", type: "incident", text: "Fever incident for King Andrew marked resolved", time: "5 hrs ago" },
  { id: "act-10", type: "staff", text: "Mr Tunde Bakare submitted leave request", time: "6 hrs ago" },
];

export const ONBOARDING_STEPS_V1 = [
  { id: 1, title: "Add your first child", href: "/admin/v1/children" },
  { id: 2, title: "Set up rooms & classes", href: "/admin/v1/rooms-classes" },
  { id: 3, title: "Add staff members", href: "/admin/v1/staff" },
  { id: 4, title: "Configure fee plans", href: "/admin/v1/billing-payments" },
  { id: 5, title: "Set up parent contacts", href: "/admin/v1/parents" },
  { id: 6, title: "Complete crèche profile", href: "/admin/v1/settings" },
  { id: 7, title: "Log first daily report", href: "/admin/v1/daily-logs" },
  { id: 8, title: "Send first announcement", href: "/admin/v1/announcements" },
];
