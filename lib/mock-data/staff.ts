export type StaffStatus = "Active" | "Absent" | "Pending" | "Suspended";

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

export const STAFF_PERMISSION_GROUPS = [
  "Child Management",
  "Daily Operations",
  "Staff Management",
  "Finance",
  "Communication",
] as const;

export const DEACTIVATION_REASONS = [
  "No longer employed at this creche",
  "On extended leave",
  "Policy or conduct violation",
  "Requested by staff member",
] as const;

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

export type PayrollHistoryEntry = {
  id: string;
  month: string;
  staffCount: number;
  grossPayroll: number;
  deductions: number;
  netPaid: number;
  runBy: string;
  datePaid: string;
};

export const PAYROLL_HISTORY: PayrollHistoryEntry[] = [
  { id: "ph-1", month: "Apr", staffCount: 11, grossPayroll: 250000, deductions: 25000, netPaid: 225000, runBy: "Mrs Chidi", datePaid: "10 Oct, 2025" },
  { id: "ph-2", month: "Mar", staffCount: 9, grossPayroll: 200000, deductions: 10000, netPaid: 190000, runBy: "Mrs Chidi", datePaid: "10 Oct, 2025" },
  { id: "ph-3", month: "Feb", staffCount: 10, grossPayroll: 250000, deductions: 20000, netPaid: 230000, runBy: "Mr John", datePaid: "10 Oct, 2025" },
];

export type EmploymentType = "Full time" | "Contract" | "Part time";

export type SalarySetup = {
  id: string;
  name: string;
  role: string;
  employment: EmploymentType;
  basicSalary: number;
  bankName: string;
  accountNumber: string;
  pensionPin: string;
  taxId: string;
};

export const SALARY_SETUPS: SalarySetup[] = [
  { id: "ss-1", name: "Mr Jones", role: "Operations", employment: "Full time", basicSalary: 250000, bankName: "GT Bank", accountNumber: "012345678", pensionPin: "*********99", taxId: "*********99" },
  { id: "ss-2", name: "Mrs Chi", role: "Operations", employment: "Contract", basicSalary: 200000, bankName: "GT Bank", accountNumber: "012345678", pensionPin: "*********99", taxId: "*********99" },
  { id: "ss-3", name: "Mrs Ahag", role: "Operations", employment: "Full time", basicSalary: 250000, bankName: "GT Bank", accountNumber: "012345678", pensionPin: "*********99", taxId: "*********99" },
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

export type LeaveBalance = {
  id: string;
  name: string;
  annualEntitled: number;
  annualTaken: number;
  sickTaken: number;
  sickRemaining: number;
  others: string;
};

export const LEAVE_BALANCES: LeaveBalance[] = [
  { id: "bal-1", name: "Mrs Chidi", annualEntitled: 21, annualTaken: 0, sickTaken: 0, sickRemaining: 14, others: "90 days Maternity" },
  { id: "bal-2", name: "Mr Adamu", annualEntitled: 21, annualTaken: 3, sickTaken: 3, sickRemaining: 11, others: "-" },
  { id: "bal-3", name: "Mr Sam", annualEntitled: 21, annualTaken: 5, sickTaken: 1, sickRemaining: 13, others: "-" },
];

export type LeaveCalendarStatus = "Scheduled" | "Approved" | "Completed";

export type LeaveCalendarEntry = {
  id: string;
  day: number;
  name: string;
  leaveType: string;
  status: LeaveCalendarStatus;
};

export const LEAVE_CALENDAR_MONTH = "April 2025";

export const LEAVE_CALENDAR_ENTRIES: LeaveCalendarEntry[] = [
  { id: "cal-1", day: 3, name: "", leaveType: "", status: "Completed" },
  { id: "cal-2", day: 9, name: "Mr John", leaveType: "Sick leave", status: "Scheduled" },
  { id: "cal-3", day: 17, name: "Mrs Path", leaveType: "Maternity Leave", status: "Approved" },
];

export const LEAVE_BLOCKED_DAYS = [12];

export type ActiveLeaveEntry = {
  id: string;
  name: string;
  leaveType: string;
  dateRange: string;
};

export const ACTIVE_LEAVE: ActiveLeaveEntry = {
  id: "active-1",
  name: "Mrs Angela Godwin",
  leaveType: "Maternity leave",
  dateRange: "April 09 – May 20 (31 days)",
};

export type UpcomingLeaveEntry = {
  id: string;
  day: string;
  month: string;
  name: string;
  detail: string;
};

export const UPCOMING_LEAVE: UpcomingLeaveEntry[] = [
  { id: "up-1", day: "09", month: "SEP", name: "Angela Godwin", detail: "Maternity leave" },
  { id: "up-2", day: "12", month: "SEP", name: "Angela Godwin", detail: "Maternity leave" },
  { id: "up-3", day: "15", month: "SEP", name: "Art Exhibition Opening", detail: "10:00 - 16:00" },
];

// ─── Compliance & Safety ──────────────────────────────────────────────────────

export type ComplianceOverview = {
  compliantMaterials: number;
  dueThisMonth: number;
  dueThisMonthNote: string;
  overdue: number;
  overdueNote: string;
  nextInspection: string;
  nextInspectionNote: string;
};

export const COMPLIANCE_OVERVIEW: Record<string, ComplianceOverview> = {
  "DBS/Police Checks": {
    compliantMaterials: 7,
    dueThisMonth: 1,
    dueThisMonthNote: "Food hygiene insurance due soon",
    overdue: 2,
    overdueNote: "Immediate action required",
    nextInspection: "Aug 9, 2029",
    nextInspectionNote: "3 years Interval",
  },
  "Fire & Safety Drill": {
    compliantMaterials: 7,
    dueThisMonth: 1,
    dueThisMonthNote: "Food hygiene insurance due soon",
    overdue: 2,
    overdueNote: "Immediate action required",
    nextInspection: "Aug 9, 2026",
    nextInspectionNote: "3 Months interval",
  },
  "Food Hygiene": {
    compliantMaterials: 7,
    dueThisMonth: 1,
    dueThisMonthNote: "Food hygiene insurance due soon",
    overdue: 2,
    overdueNote: "Immediate action required",
    nextInspection: "Jun 03, 2026",
    nextInspectionNote: "Monthly check",
  },
  "Risk Assessment": {
    compliantMaterials: 7,
    dueThisMonth: 1,
    dueThisMonthNote: "Food hygiene insurance due soon",
    overdue: 2,
    overdueNote: "Immediate action required",
    nextInspection: "Jun 03, 2026",
    nextInspectionNote: "Monthly check",
  },
};

export type DbsCheckStatus = "Valid" | "Renew Soon" | "Expired";

export type DbsCheckRecord = {
  id: string;
  name: string;
  role: string;
  checkType: string;
  issueDate: string;
  expiryDate: string;
  certNumber: string;
  status: DbsCheckStatus;
};

export const DBS_POLICE_CHECKS: DbsCheckRecord[] = [
  { id: "dbs-1", name: "Mrs Chidi", role: "Care Giver", checkType: "Enhanced DBS", issueDate: "10 Jan 2026", expiryDate: "09 Jan 2028", certNumber: "023******3344", status: "Valid" },
  { id: "dbs-2", name: "Mr Adamu", role: "Lead Caregiver", checkType: "Standard DBS", issueDate: "18 days", expiryDate: "09 Jan 2028", certNumber: "023******3344", status: "Renew Soon" },
  { id: "dbs-3", name: "Mr Sam", role: "Caregiver", checkType: "Standard DBS", issueDate: "16 days", expiryDate: "09 Jan 2028", certNumber: "023******3344", status: "Expired" },
];

export type FireSafetyDrillLog = {
  id: string;
  date: string;
  time: string;
  duration: string;
  allEvacuated: "Yes" | "No";
  issuesFound: string;
  actionTaken: string;
  loggedBy: string;
};

export const FIRE_SAFETY_DRILLS: FireSafetyDrillLog[] = [
  { id: "fd-1", date: "10 Jan 2026", time: "09:30 AM", duration: "1 hour 45 minutes", allEvacuated: "Yes", issuesFound: "Nil", actionTaken: "Nil", loggedBy: "Mrs Osas" },
  { id: "fd-2", date: "10 Jan 2026", time: "09:30 AM", duration: "2 hours", allEvacuated: "No", issuesFound: "Candidate was a bit slow", actionTaken: "Proper health check, repeated training", loggedBy: "Mr Adebayo" },
  { id: "fd-3", date: "10 Jan 2026", time: "09:30 AM", duration: "2 hours 30 minutes", allEvacuated: "Yes", issuesFound: "Nil", actionTaken: "Nil", loggedBy: "Mr Adebayo" },
];

export type FoodHygieneStatus = "Pass" | "Low temp" | "Nil";

export type FoodHygieneLog = {
  id: string;
  date: string;
  meal: string;
  fridgeTemp: string;
  freezerTemp: string;
  foodTemp: string;
  supplyBatch: string;
  status: FoodHygieneStatus;
  checkedBy: string;
};

export const FOOD_HYGIENE_LOGS: FoodHygieneLog[] = [
  { id: "fh-1", date: "10 Jan 2026", meal: "Breakfast", fridgeTemp: "4.1°C", freezerTemp: "4.1°C", foodTemp: "4.1°C", supplyBatch: "FRESH - 010", status: "Pass", checkedBy: "Mrs Osas" },
  { id: "fh-2", date: "10 Jan 2026", meal: "Lunch", fridgeTemp: "4.1°C", freezerTemp: "4.1°C", foodTemp: "4.1°C", supplyBatch: "Nil", status: "Nil", checkedBy: "Mr Adebayo" },
  { id: "fh-3", date: "10 Jan 2026", meal: "Snack", fridgeTemp: "4.1°C", freezerTemp: "4.1°C", foodTemp: "4.1°C", supplyBatch: "Nil", status: "Low temp", checkedBy: "Mr Adebayo" },
];

export type RiskLevel = "Low" | "Medium" | "High";
export type RiskActionStatus = "Current" | "Review Due";

export type RiskAssessmentEntry = {
  id: string;
  area: string;
  riskLevel: RiskLevel;
  controlsInPlace: string;
  dateReviewed: string;
  reviewedBy: string;
  actionTaken: RiskActionStatus;
};

export const RISK_ASSESSMENTS: RiskAssessmentEntry[] = [
  { id: "ra-1", area: "Outdoor play area", riskLevel: "Medium", controlsInPlace: "CCTV active, 20 minutes check back to sleep policy", dateReviewed: "10 May 2026 08:20AM", reviewedBy: "Manager", actionTaken: "Current" },
  { id: "ra-2", area: "Kitchen-Food preparation", riskLevel: "High", controlsInPlace: "Locked when supervised, material cleanliness check", dateReviewed: "10 Jan 2026 01:00PM", reviewedBy: "Welfare", actionTaken: "Review Due" },
];
