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
  { label: "Dashboard", href: "/dashboard", icon: "home" },
  {
    label: "Child Management",
    href: "/children",
    icon: "child",
    subItems: [
      { label: "Children", href: "/children" },
      { label: "Enrolment & Waitlist", href: "/children", tab: "enrolment-waitlist" },
      { label: "Caregivers", href: "/children", tab: "caregivers" },
      { label: "Rooms & Classes", href: "/children", tab: "rooms-classes" },
      { label: "Parents", href: "/children", tab: "parents" },
    ],
  },
  {
    label: "Staff Management",
    href: "/staff",
    icon: "staff",
    subItems: [
      { label: "Staff", href: "/staff" },
      { label: "Attendance Log", href: "/staff", tab: "attendance-log" },
      { label: "Role Management", href: "/staff", tab: "role-management" },
      { label: "Leaderboard", href: "/staff", tab: "leaderboard" },
      { label: "Payroll", href: "/staff", tab: "payroll" },
      { label: "Leave Management", href: "/staff", tab: "leave-management" },
      { label: "Compliance & Safety", href: "/staff", tab: "compliance-safety" },
    ],
  },
  {
    label: "Daily Operations",
    href: "/daily-operations",
    icon: "daily-ops",
    subItems: [
      { label: "Reception/QR", href: "/daily-operations" },
      { label: "Daily Logs", href: "/daily-operations", tab: "daily-logs" },
      { label: "Health & Incidents", href: "/daily-operations", tab: "health-incidents" },
      { label: "Medication", href: "/daily-operations", tab: "medication" },
      { label: "Inventory & Supplies", href: "/daily-operations", tab: "inventory-supplies" },
      { label: "Facilities", href: "/daily-operations", tab: "facilities" },
      { label: "Tasks", href: "/daily-operations", tab: "tasks" },
    ],
  },
  {
    label: "Finance",
    href: "/finance",
    icon: "finance",
    subItems: [
      { label: "Wallet", href: "/finance" },
      { label: "Billing & Payments", href: "/finance", tab: "billing-payments" },
      { label: "Expenses", href: "/finance", tab: "expenses" },
      { label: "Financial Reports", href: "/finance", tab: "financial-reports" },
    ],
  },
  {
    label: "Communication",
    href: "/communication",
    icon: "communication",
    subItems: [
      { label: "Messages", href: "/communication" },
      { label: "Announcements", href: "/communication", tab: "announcements" },
      { label: "Events Calendar", href: "/communication", tab: "events-calendar" },
    ],
  },
  {
    label: "Intelligence",
    href: "/intelligence",
    icon: "intelligence",
    subItems: [
      { label: "AI Command Center", href: "/intelligence" },
      { label: "Analytics", href: "/intelligence", tab: "analytics" },
      { label: "Reports", href: "/intelligence", tab: "reports" },
      { label: "Audit Trail", href: "/intelligence", tab: "audit-trail" },
    ],
  },
  {
    label: "Account & Setup",
    href: "/account-setup",
    icon: "account",
    subItems: [
      { label: "Plans & Access", href: "/account-setup" },
      { label: "Help & Training", href: "/account-setup", tab: "help-training" },
      { label: "Settings", href: "/account-setup", tab: "settings" },
    ],
  },
];
