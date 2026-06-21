export type StaffStatus = "Active" | "Absent" | "Pending";

export type StaffMember = {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateAdded: string;
  role: string;
  status: StaffStatus;
};

export const STAFF: StaffMember[] = [
  {
    id: "1",
    name: "Mrs. Sarah Okonkwo",
    email: "sarah.o@udebemcresh.com",
    phone: "+234 90 9827 2738",
    dateAdded: "10 Oct 2025",
    role: "Caregiver",
    status: "Active",
  },
  {
    id: "2",
    name: "Mr. James Adamu",
    email: "james.a@udebemcresh.com",
    phone: "+234 81 2345 6789",
    dateAdded: "05 Sep 2025",
    role: "Marketer",
    status: "Absent",
  },
  {
    id: "3",
    name: "Mrs. Ngozi Eze",
    email: "ngozi.e@udebemcresh.com",
    phone: "+234 70 3456 7890",
    dateAdded: "12 Aug 2025",
    role: "Caregiver",
    status: "Active",
  },
  {
    id: "4",
    name: "Mr. Chukwu Bello",
    email: "chukwu.b@udebemcresh.com",
    phone: "+234 90 4567 8901",
    dateAdded: "20 Jul 2025",
    role: "Admin",
    status: "Pending",
  },
  {
    id: "5",
    name: "Mrs. Amaka Taiwo",
    email: "amaka.t@udebemcresh.com",
    phone: "+234 81 5678 9012",
    dateAdded: "15 Jun 2025",
    role: "Caregiver",
    status: "Active",
  },
];

// ─── Add Staff form options ───────────────────────────────────────────────────

export const STAFF_ROLE_OPTIONS = [
  "Team Member",
  "Lead Caregiver",
  "Caregiver",
  "Cook",
  "Driver",
  "Cleaner",
  "Nanny",
] as const;

export const STAFF_CLASS_OPTIONS = ["Lion", "Sun flowers", "Bloomers"] as const;

// ─── Leaderboard ──────────────────────────────────────────────────────────────

export type LeaderboardEntry = {
  rank: number;
  name: string;
  role: string;
  logCompliance: number;
  attendanceScore: number;
  incidentsLogged: number;
  parentRating: number;
  points: number;
};

export const LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    name: "Mrs. Amaka Taiwo",
    role: "Caregiver",
    logCompliance: 100,
    attendanceScore: 98,
    incidentsLogged: 12,
    parentRating: 4.9,
    points: 980,
  },
  {
    rank: 2,
    name: "Mrs. Sarah Okonkwo",
    role: "Caregiver",
    logCompliance: 90,
    attendanceScore: 95,
    incidentsLogged: 9,
    parentRating: 4.8,
    points: 920,
  },
  {
    rank: 3,
    name: "Mrs. Ngozi Eze",
    role: "Caregiver",
    logCompliance: 83,
    attendanceScore: 91,
    incidentsLogged: 7,
    parentRating: 4.6,
    points: 860,
  },
  {
    rank: 4,
    name: "Mr. Chukwu Bello",
    role: "Admin",
    logCompliance: 71,
    attendanceScore: 88,
    incidentsLogged: 4,
    parentRating: 4.3,
    points: 740,
  },
  {
    rank: 5,
    name: "Mr. James Adamu",
    role: "Marketer",
    logCompliance: 33,
    attendanceScore: 60,
    incidentsLogged: 2,
    parentRating: 3.8,
    points: 410,
  },
];

// ─── Payroll ──────────────────────────────────────────────────────────────────

export type PayrollStatus = "Paid" | "Pending" | "Processing";

export type PayrollRecord = {
  id: string;
  name: string;
  role: string;
  baseSalary: number;
  bonuses: number;
  deductions: number;
  netPay: number;
  payDate: string;
  status: PayrollStatus;
};

export const PAYROLL: PayrollRecord[] = [
  {
    id: "pr-1",
    name: "Mrs. Sarah Okonkwo",
    role: "Caregiver",
    baseSalary: 180000,
    bonuses: 15000,
    deductions: 5000,
    netPay: 190000,
    payDate: "30 Oct 2025",
    status: "Paid",
  },
  {
    id: "pr-2",
    name: "Mr. James Adamu",
    role: "Marketer",
    baseSalary: 220000,
    bonuses: 0,
    deductions: 12000,
    netPay: 208000,
    payDate: "30 Oct 2025",
    status: "Pending",
  },
  {
    id: "pr-3",
    name: "Mrs. Ngozi Eze",
    role: "Caregiver",
    baseSalary: 180000,
    bonuses: 10000,
    deductions: 5000,
    netPay: 185000,
    payDate: "30 Oct 2025",
    status: "Paid",
  },
  {
    id: "pr-4",
    name: "Mr. Chukwu Bello",
    role: "Admin",
    baseSalary: 260000,
    bonuses: 20000,
    deductions: 8000,
    netPay: 272000,
    payDate: "30 Oct 2025",
    status: "Processing",
  },
  {
    id: "pr-5",
    name: "Mrs. Amaka Taiwo",
    role: "Caregiver",
    baseSalary: 180000,
    bonuses: 25000,
    deductions: 5000,
    netPay: 200000,
    payDate: "30 Oct 2025",
    status: "Paid",
  },
];

// ─── Leave Management ─────────────────────────────────────────────────────────

export type LeaveStatus = "Pending" | "Approved" | "Rejected";

export type LeaveRequest = {
  id: string;
  name: string;
  role: string;
  leaveType: "Annual Leave" | "Sick Leave" | "Maternity Leave" | "Casual Leave";
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: LeaveStatus;
};

export const LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: "lv-1",
    name: "Mrs. Sarah Okonkwo",
    role: "Caregiver",
    leaveType: "Annual Leave",
    startDate: "20 Oct 2025",
    endDate: "24 Oct 2025",
    days: 5,
    reason: "Family trip",
    status: "Pending",
  },
  {
    id: "lv-2",
    name: "Mr. James Adamu",
    role: "Marketer",
    leaveType: "Sick Leave",
    startDate: "12 Oct 2025",
    endDate: "13 Oct 2025",
    days: 2,
    reason: "Flu recovery",
    status: "Approved",
  },
  {
    id: "lv-3",
    name: "Mrs. Ngozi Eze",
    role: "Caregiver",
    leaveType: "Casual Leave",
    startDate: "05 Oct 2025",
    endDate: "05 Oct 2025",
    days: 1,
    reason: "Personal errand",
    status: "Rejected",
  },
  {
    id: "lv-4",
    name: "Mrs. Amaka Taiwo",
    role: "Caregiver",
    leaveType: "Maternity Leave",
    startDate: "01 Nov 2025",
    endDate: "28 Feb 2026",
    days: 120,
    reason: "Maternity",
    status: "Approved",
  },
];

// ─── Compliance & Safety ──────────────────────────────────────────────────────

export type ComplianceStatus = "Verified" | "Expiring Soon" | "Expired" | "Missing";

export type ComplianceItem = {
  id: string;
  name: string;
  role: string;
  documentType: string;
  issueDate: string;
  expiryDate: string | null;
  status: ComplianceStatus;
};

export const COMPLIANCE_ITEMS: ComplianceItem[] = [
  {
    id: "cm-1",
    name: "Mrs. Sarah Okonkwo",
    role: "Caregiver",
    documentType: "DBS Check Certificate",
    issueDate: "05 Aug 2024",
    expiryDate: "05 Aug 2026",
    status: "Verified",
  },
  {
    id: "cm-2",
    name: "Mr. James Adamu",
    role: "Marketer",
    documentType: "First Aid Certificate",
    issueDate: "15 Nov 2023",
    expiryDate: "15 Nov 2025",
    status: "Expiring Soon",
  },
  {
    id: "cm-3",
    name: "Mrs. Ngozi Eze",
    role: "Caregiver",
    documentType: "Food Handling Certificate",
    issueDate: "01 Jan 2023",
    expiryDate: "01 Jan 2025",
    status: "Expired",
  },
  {
    id: "cm-4",
    name: "Mr. Chukwu Bello",
    role: "Admin",
    documentType: "Background Check",
    issueDate: "20 Jul 2025",
    expiryDate: null,
    status: "Verified",
  },
  {
    id: "cm-5",
    name: "Mrs. Amaka Taiwo",
    role: "Caregiver",
    documentType: "First Aid Certificate",
    issueDate: "—",
    expiryDate: null,
    status: "Missing",
  },
];
