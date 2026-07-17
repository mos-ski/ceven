export type NavItemV1 = {
  label: string;
  href: string;
  icon: string;
};

export type NavGroupV1 = {
  label: string;
  items: NavItemV1[];
};

const BASE = "/admin/v1";

export const NAV_GROUPS_V1: NavGroupV1[] = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: `${BASE}/dashboard`, icon: "home" }],
  },
  {
    label: "Children & People",
    items: [
      { label: "Children", href: `${BASE}/children`, icon: "baby" },
      { label: "Parents", href: `${BASE}/parents`, icon: "users" },
      { label: "Enrolment & Waitlist", href: `${BASE}/enrolment-waitlist`, icon: "clipboard-list" },
      { label: "Child Development", href: `${BASE}/child-development", icon: "trending-up" },
      { label: "Staff", href: `${BASE}/staff`, icon: "heart-handshake" },
      { label: "Leave Management", href: `${BASE}/leave-management", icon: "calendar-off" },
      { label: "Compliance & Safety", href: `${BASE}/compliance-safety", icon: "shield-check" },
      { label: "Rooms & Classes", href: `${BASE}/rooms-classes", icon: "door-open" },
    ],
  },
  {
    label: "Daily Operations",
    items: [
      { label: "Reception / QR", href: `${BASE}/reception-qr`, icon: "scan-line" },
      { label: "Daily Logs", href: `${BASE}/daily-logs`, icon: "book-open" },
      { label: "Health & Incidents", href: `${BASE}/health-incidents", icon: "heart-pulse" },
      { label: "Medication", href: `${BASE}/medication`, icon: "pill" },
      { label: "Inventory & Supplies", href: `${BASE}/inventory-supplies", icon: "package" },
      { label: "Facilities", href: `${BASE}/facilities`, icon: "building" },
      { label: "Tasks", href: `${BASE}/tasks`, icon: "check-square" },
    ],
  },
  {
    label: "Finance",
    items: [
      { label: "Wallet", href: `${BASE}/wallet`, icon: "wallet" },
      { label: "Billing & Payments", href: `${BASE}/billing-payments", icon: "credit-card" },
      { label: "Expenses", href: `${BASE}/expenses", icon: "receipt" },
      { label: "Payroll", href: `${BASE}/payroll", icon: "banknote" },
      { label: "Financial Reports", href: `${BASE}/financial-reports", icon: "bar-chart" },
    ],
  },
  {
    label: "Communication",
    items: [
      { label: "Messages", href: `${BASE}/messages`, icon: "message-square" },
      { label: "Announcements", href: `${BASE}/announcements", icon: "megaphone" },
      { label: "Events Calendar", href: `${BASE}/events-calendar", icon: "calendar" },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { label: "AI Command Center", href: `${BASE}/ai-command-center`, icon: "sparkles" },
      { label: "Analytics", href: `${BASE}/analytics`, icon: "line-chart" },
      { label: "Reports", href: `${BASE}/reports", icon: "file-text" },
      { label: "Audit Trail", href: `${BASE}/audit-trail", icon: "history" },
    ],
  },
  {
    label: "Account & Setup",
    items: [
      { label: "Plans & Access", href: `${BASE}/plans-access`, icon: "credit-card" },
      { label: "Help & Training", href: `${BASE}/help-training", icon: "help-circle" },
      { label: "Settings", href: `${BASE}/settings`, icon: "settings" },
    ],
  },
];
