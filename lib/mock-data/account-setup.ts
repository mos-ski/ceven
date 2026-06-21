// ── Roles & Permissions ──────────────────────────────────────────────────────

export type PermissionGroup = {
  key: string;
  label: string;
  children: string[];
};

export const PERMISSION_GROUPS: PermissionGroup[] = [
  {
    key: "children-parent",
    label: "Children & Parent",
    children: ["Children", "Enrolment & Waitlist", "Child Development", "Rooms & Classes", "Parents"],
  },
  {
    key: "finance-system",
    label: "Finance System",
    children: ["Billing & Payments", "Expenses", "Financial Reports"],
  },
  {
    key: "account-setup",
    label: "Account & Setup",
    children: ["Plans & Access", "Team & Roles", "Profile & Preferences"],
  },
  {
    key: "staff-management",
    label: "Staff Management",
    children: ["Staff", "Payroll", "Leave Management", "Compliance & Safety"],
  },
  {
    key: "communication",
    label: "Communication",
    children: [],
  },
  {
    key: "intelligence",
    label: "Intelligence",
    children: ["Analytics", "Reports", "Audit Trail"],
  },
  {
    key: "daily-operations",
    label: "Daily Operations",
    children: ["Reception/QR", "Daily Log", "Health & Incidents", "Medications", "Inventory & Supply", "Facility", "Task"],
  },
];

export type RoleStatus = "Active" | "Disabled";

export type RoleTemplate = {
  id: string;
  name: string;
  description: string;
  staffCount: number;
  status: RoleStatus;
  /** Group keys this role has full or partial access to. */
  permissions: Record<string, "full" | "partial" | "none">;
};

export const ROLE_TEMPLATES: RoleTemplate[] = [
  {
    id: "role-1",
    name: "Admin",
    description: "Full access to every module, billing, and account settings.",
    staffCount: 2,
    status: "Active",
    permissions: {
      "children-parent": "full",
      "finance-system": "full",
      "account-setup": "full",
      "staff-management": "full",
      communication: "full",
      intelligence: "full",
      "daily-operations": "full",
    },
  },
  {
    id: "role-2",
    name: "Lead Caregiver",
    description: "Manage children, daily operations, and view staff schedules.",
    staffCount: 4,
    status: "Active",
    permissions: {
      "children-parent": "full",
      "finance-system": "none",
      "account-setup": "none",
      "staff-management": "partial",
      communication: "full",
      intelligence: "partial",
      "daily-operations": "full",
    },
  },
  {
    id: "role-3",
    name: "Caregiver",
    description: "Daily logs, health & incidents, and child profiles only.",
    staffCount: 9,
    status: "Active",
    permissions: {
      "children-parent": "partial",
      "finance-system": "none",
      "account-setup": "none",
      "staff-management": "none",
      communication: "partial",
      intelligence: "none",
      "daily-operations": "partial",
    },
  },
  {
    id: "role-4",
    name: "Front Desk",
    description: "Reception, QR check-in, and parent communication.",
    staffCount: 1,
    status: "Disabled",
    permissions: {
      "children-parent": "partial",
      "finance-system": "none",
      "account-setup": "none",
      "staff-management": "none",
      communication: "full",
      intelligence: "none",
      "daily-operations": "partial",
    },
  },
];

export const STAFF_INVITE_OPTIONS = [
  "Mrs. Sarah Okonkwo",
  "Mr. James Adamu",
  "Mrs. Ngozi Eze",
  "Mr. Chukwu Bello",
  "Mrs. Amaka Taiwo",
] as const;

// ── Creche Profile ───────────────────────────────────────────────────────────

export const MOCK_CRECHE_PROFILE = {
  name: "St. Gregory Creche",
  email: "admin@stgregcreche.com",
  phone: "+234 90 9827 2738",
  address: "14 Adeola Odeku Street, Victoria Island, Lagos",
  logoUrl: null as string | null,
};

// ── Notification Preferences ─────────────────────────────────────────────────

export type NotificationPref = {
  id: string;
  label: string;
  description: string;
  email: boolean;
  sms: boolean;
};

export const INITIAL_NOTIFICATION_PREFS: NotificationPref[] = [
  {
    id: "incidents",
    label: "Incident Reports",
    description: "Get notified when a staff member logs a health or safety incident.",
    email: true,
    sms: true,
  },
  {
    id: "billing",
    label: "Billing & Payments",
    description: "Invoice reminders, failed payments, and renewal notices.",
    email: true,
    sms: false,
  },
  {
    id: "staff-activity",
    label: "Staff Activity",
    description: "New staff invites, role changes, and login alerts.",
    email: true,
    sms: false,
  },
  {
    id: "daily-digest",
    label: "Daily Digest",
    description: "A daily summary of attendance, meals, and tasks.",
    email: false,
    sms: false,
  },
];

// ── Billing details (Account & Setup → Plans & Access) ───────────────────────

export const MOCK_BILLING_DETAILS = {
  cardholderName: "Ola Olagoke",
  cardNumber: "•••• •••• •••• 4242",
  expiry: "08/27",
  crecheName: "St. Gregory Creche",
  billingEmail: "admin@stgregcreche.com",
};
