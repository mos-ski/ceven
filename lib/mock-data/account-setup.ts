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

// ── Help & Training ──────────────────────────────────────────────────────────

export type SetupProgressItem = {
  id: string;
  step: number;
  title: string;
  description: string;
  done: boolean;
};

export const SETUP_PROGRESS_ITEMS: SetupProgressItem[] = [
  { id: "setup-1", step: 1, title: "Add your first child", description: "Add a child to the system", done: true },
  { id: "setup-2", step: 2, title: "Invite your staff", description: "Add caregivers and admins", done: true },
  { id: "setup-3", step: 3, title: "Set up rooms & classes", description: "Organize children into rooms", done: false },
  { id: "setup-4", step: 4, title: "Configure billing plan", description: "Choose a subscription plan", done: false },
];

export const SETUP_PROGRESS_PERCENT = Math.round(
  (SETUP_PROGRESS_ITEMS.filter((i) => i.done).length / SETUP_PROGRESS_ITEMS.length) * 100
);

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "How does QR attendance work",
    answer:
      "Dear Mrs. Johnson, just to let you know that Amara had a wonderful morning. She ate a good breakfast and is currently resting comfortably.",
  },
  { id: "faq-2", question: "How to create and send invoice", answer: "" },
  { id: "faq-3", question: "Setting up rooms and classes", answer: "" },
  { id: "faq-4", question: "How to log daily child report", answer: "" },
  { id: "faq-5", question: "How Does QR Attendance Work", answer: "" },
];

export type RoleGuide = {
  id: string;
  title: string;
  excerpt: string;
  publishedOn: string;
  intro: string;
  sections: { heading: string; body: string }[];
};

const SAMPLE_EXCERPT =
  "Dear Mrs. Johnson, just to let you know that Amara had a wonderful morning. She ate a good breakfast and is currently resting comfortably.";

const SAMPLE_SECTION_BODY =
  "Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac vestibulum turpis mi bibendum diam. Tempor integer aliquam in vitae malesuada fringilla. Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus.";

export const ROLE_GUIDES: RoleGuide[] = [
  {
    id: "guide-owners",
    title: "For Creche Owers",
    excerpt: SAMPLE_EXCERPT,
    publishedOn: "01 Oct 2025",
    intro:
      "By accessing our application, you are agreeing to be bound by these terms of service, and agree that you are responsible for compliance with any applicable local laws.",
    sections: [
      { heading: "What information do we collect?", body: SAMPLE_SECTION_BODY },
      { heading: "How do we use your information?", body: SAMPLE_SECTION_BODY },
      { heading: "How long do we keep your information?", body: SAMPLE_SECTION_BODY },
      { heading: "How do we keep your information safe?", body: SAMPLE_SECTION_BODY },
      { heading: "What are your privacy rights?", body: SAMPLE_SECTION_BODY },
    ],
  },
  {
    id: "guide-branch-managers",
    title: "For Branch Managers",
    excerpt: SAMPLE_EXCERPT,
    publishedOn: "01 Oct 2025",
    intro: "A quick guide to running day-to-day operations for your branch.",
    sections: [
      { heading: "Managing your rooms", body: SAMPLE_SECTION_BODY },
      { heading: "Reviewing staff compliance", body: SAMPLE_SECTION_BODY },
    ],
  },
  {
    id: "guide-receptionist",
    title: "For Receptionist",
    excerpt: SAMPLE_EXCERPT,
    publishedOn: "01 Oct 2025",
    intro: "Everything front-desk staff need to know about check-in and visitors.",
    sections: [
      { heading: "Using the QR check-in station", body: SAMPLE_SECTION_BODY },
      { heading: "Logging exceptions", body: SAMPLE_SECTION_BODY },
    ],
  },
  {
    id: "guide-caregivers",
    title: "For Cargivers",
    excerpt: SAMPLE_EXCERPT,
    publishedOn: "01 Oct 2025",
    intro: "How to log daily activities, meals, and incidents for the children in your care.",
    sections: [
      { heading: "Logging a daily report", body: SAMPLE_SECTION_BODY },
      { heading: "Reporting an incident", body: SAMPLE_SECTION_BODY },
    ],
  },
  {
    id: "guide-finance",
    title: "For Finance Statff",
    excerpt: SAMPLE_EXCERPT,
    publishedOn: "01 Oct 2025",
    intro: "How to manage invoices, expenses, and financial reports.",
    sections: [
      { heading: "Creating and sending an invoice", body: SAMPLE_SECTION_BODY },
      { heading: "Reading the financial report", body: SAMPLE_SECTION_BODY },
    ],
  },
];

export const ADA_SUGGESTED_PROMPTS = [
  "How can I generate report that for parenst",
  "At-risk children?",
  "Draft announcement",
];
