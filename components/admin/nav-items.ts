export type NavSubItem = {
  label: string;
  href: string;
  tab?: string;
};

export type NavItem = {
  label: string;
  href: string;
  icon: "home" | "child" | "staff" | "daily-ops" | "finance" | "communication" | "intelligence" | "account";
  subItems?: NavSubItem[];
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/admin/v2/dashboard", icon: "home" },
  {
    label: "Child Management",
    href: "/admin/v2/children",
    icon: "child",
    subItems: [
      { label: "Children", href: "/admin/v2/children" },
      { label: "Enrolment & Waitlist", href: "/admin/v2/children", tab: "enrolment-waitlist" },
      { label: "Caregivers", href: "/admin/v2/children", tab: "caregivers" },
      { label: "Rooms & Classes", href: "/admin/v2/children", tab: "rooms-classes" },
      { label: "Parents", href: "/admin/v2/children", tab: "parents" },
    ],
  },
  {
    label: "Staff Management",
    href: "/admin/v2/staff",
    icon: "staff",
    subItems: [
      { label: "Staff", href: "/admin/v2/staff" },
      { label: "Attendance Log", href: "/admin/v2/staff", tab: "attendance-log" },
      { label: "Role Management", href: "/admin/v2/staff", tab: "role-management" },
      { label: "Leaderboard", href: "/admin/v2/staff", tab: "leaderboard" },
      { label: "Leave Management", href: "/admin/v2/staff", tab: "leave-management" },
      { label: "Compliance & Safety", href: "/admin/v2/staff", tab: "compliance-safety" },
    ],
  },
  {
    label: "Daily Operations",
    href: "/admin/v2/daily-operations",
    icon: "daily-ops",
    subItems: [
      { label: "Reception/QR", href: "/admin/v2/daily-operations" },
      { label: "Daily Logs", href: "/admin/v2/daily-operations", tab: "daily-logs" },
      { label: "Health & Incidents", href: "/admin/v2/daily-operations", tab: "health-incidents" },
      { label: "Medication", href: "/admin/v2/daily-operations", tab: "medication" },
      { label: "Inventory & Supplies", href: "/admin/v2/daily-operations", tab: "inventory-supplies" },
      { label: "Facilities", href: "/admin/v2/daily-operations", tab: "facilities" },
      { label: "Tasks", href: "/admin/v2/daily-operations", tab: "tasks" },
    ],
  },
  {
    label: "Finance",
    href: "/admin/v2/finance",
    icon: "finance",
    subItems: [
      { label: "Wallet", href: "/admin/v2/finance" },
      { label: "Billing & Payments", href: "/admin/v2/finance", tab: "billing-payments" },
      { label: "Expenses", href: "/admin/v2/finance", tab: "expenses" },
      { label: "Payroll", href: "/admin/v2/finance", tab: "payroll" },
      { label: "Financial Reports", href: "/admin/v2/finance", tab: "financial-reports" },
    ],
  },
  {
    label: "Communication",
    href: "/admin/v2/communication",
    icon: "communication",
    subItems: [
      { label: "Messages", href: "/admin/v2/communication" },
      { label: "Announcements", href: "/admin/v2/communication", tab: "announcements" },
      { label: "Events Calendar", href: "/admin/v2/communication", tab: "events-calendar" },
    ],
  },
  {
    label: "Intelligence",
    href: "/admin/v2/intelligence",
    icon: "intelligence",
    subItems: [
      { label: "AI Command Center", href: "/admin/v2/intelligence" },
      { label: "Analytics", href: "/admin/v2/intelligence", tab: "analytics" },
      { label: "Reports", href: "/admin/v2/intelligence", tab: "reports" },
      { label: "Audit Trail", href: "/admin/v2/intelligence", tab: "audit-trail" },
    ],
  },
  {
    label: "Account & Setup",
    href: "/admin/v2/account-setup",
    icon: "account",
    subItems: [
      { label: "Plans & Access", href: "/admin/v2/account-setup" },
      { label: "Help & Training", href: "/admin/v2/account-setup", tab: "help-training" },
      { label: "Settings", href: "/admin/v2/account-setup", tab: "settings" },
    ],
  },
];
