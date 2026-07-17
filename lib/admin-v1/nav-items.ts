export type NavItemV1 = {
  label: string;
  href: string;
};

export type NavGroupV1 = {
  label: string;
  items: NavItemV1[];
};

const BASE = "/admin/v1";

export const NAV_GROUPS_V1: NavGroupV1[] = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: `${BASE}/dashboard` }],
  },
  {
    label: "Children & People",
    items: [
      { label: "Children", href: `${BASE}/children` },
      { label: "Parents", href: `${BASE}/parents` },
      { label: "Enrolment & Waitlist", href: `${BASE}/enrolment-waitlist` },
      { label: "Child Development", href: `${BASE}/child-development` },
      { label: "Staff", href: `${BASE}/staff` },
      { label: "Leave Management", href: `${BASE}/leave-management` },
      { label: "Compliance & Safety", href: `${BASE}/compliance-safety` },
      { label: "Rooms & Classes", href: `${BASE}/rooms-classes` },
    ],
  },
  {
    label: "Daily Operations",
    items: [
      { label: "Reception / QR", href: `${BASE}/reception-qr` },
      { label: "Daily Logs", href: `${BASE}/daily-logs` },
      { label: "Health & Incidents", href: `${BASE}/health-incidents` },
      { label: "Medication", href: `${BASE}/medication` },
      { label: "Inventory & Supplies", href: `${BASE}/inventory-supplies` },
      { label: "Facilities", href: `${BASE}/facilities` },
      { label: "Tasks", href: `${BASE}/tasks` },
    ],
  },
  {
    label: "Finance",
    items: [
      { label: "Wallet", href: `${BASE}/wallet` },
      { label: "Billing & Payments", href: `${BASE}/billing-payments` },
      { label: "Expenses", href: `${BASE}/expenses` },
      { label: "Payroll", href: `${BASE}/payroll` },
      { label: "Financial Reports", href: `${BASE}/financial-reports` },
    ],
  },
  {
    label: "Communication",
    items: [
      { label: "Messages", href: `${BASE}/messages` },
      { label: "Announcements", href: `${BASE}/announcements` },
      { label: "Events Calendar", href: `${BASE}/events-calendar` },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { label: "AI Command Center", href: `${BASE}/ai-command-center` },
      { label: "Analytics", href: `${BASE}/analytics` },
      { label: "Reports", href: `${BASE}/reports` },
      { label: "Audit Trail", href: `${BASE}/audit-trail` },
    ],
  },
  {
    label: "Account & Setup",
    items: [
      { label: "Plans & Access", href: `${BASE}/plans-access` },
      { label: "Help & Training", href: `${BASE}/help-training` },
      { label: "Settings", href: `${BASE}/settings` },
    ],
  },
];
