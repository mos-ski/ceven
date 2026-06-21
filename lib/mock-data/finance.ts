export type ExpenseCategory = "Payroll" | "Rent" | "Utilities" | "Supplies" | "Others";

export type ExpenseStatus = "Paid" | "Pending" | "Overdue";

export type Expense = {
  id: string;
  date: string;
  vendor: string;
  category: ExpenseCategory;
  description: string;
  amount: string;
  status: ExpenseStatus;
};

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  "Payroll",
  "Rent",
  "Utilities",
  "Supplies",
  "Others",
];

export const EXPENSES: Expense[] = [
  {
    id: "exp-1",
    date: "10 Oct 2025",
    vendor: "Delux Baby Care",
    category: "Supplies",
    description: "Napkin",
    amount: "₦45,000",
    status: "Paid",
  },
  {
    id: "exp-2",
    date: "08 Oct 2025",
    vendor: "Lagos Water Corp",
    category: "Utilities",
    description: "Monthly water bill",
    amount: "₦12,000",
    status: "Overdue",
  },
  {
    id: "exp-3",
    date: "05 Oct 2025",
    vendor: "—",
    category: "Payroll",
    description: "Staff salaries — September",
    amount: "₦1,800,000",
    status: "Paid",
  },
  {
    id: "exp-4",
    date: "03 Oct 2025",
    vendor: "ABC Supplies Ltd",
    category: "Supplies",
    description: "Classroom learning materials",
    amount: "₦45,000",
    status: "Pending",
  },
  {
    id: "exp-5",
    date: "01 Oct 2025",
    vendor: "Landlord Estate Ltd",
    category: "Rent",
    description: "October facility rent",
    amount: "₦350,000",
    status: "Paid",
  },
  {
    id: "exp-6",
    date: "28 Sep 2025",
    vendor: "EduTech Nigeria",
    category: "Others",
    description: "Software subscription",
    amount: "₦25,000",
    status: "Pending",
  },
];

// ── Financial Reports mock data ──────────────────────────────────────────────

export type BudgetVsActualRow = {
  category: ExpenseCategory;
  budget: number;
  actual: number;
};

export const BUDGET_VS_ACTUAL: BudgetVsActualRow[] = [
  { category: "Payroll", budget: 2200000, actual: 1800000 },
  { category: "Rent", budget: 400000, actual: 350000 },
  { category: "Utilities", budget: 150000, actual: 165000 },
  { category: "Supplies", budget: 500000, actual: 450000 },
  { category: "Others", budget: 100000, actual: 70000 },
];

export type MonthlyTrendPoint = {
  month: string;
  revenue: number;
  expenses: number;
};

export const MONTHLY_TREND: MonthlyTrendPoint[] = [
  { month: "May", revenue: 3100000, expenses: 2100000 },
  { month: "Jun", revenue: 3250000, expenses: 2250000 },
  { month: "Jul", revenue: 3000000, expenses: 2300000 },
  { month: "Aug", revenue: 3400000, expenses: 2400000 },
  { month: "Sep", revenue: 3550000, expenses: 2380000 },
  { month: "Oct", revenue: 3700000, expenses: 2450000 },
];

export type ReportSummary = {
  label: string;
  value: string;
  helper: string;
  trend: "up" | "down" | "neutral";
};

export const REPORT_SUMMARY: ReportSummary[] = [
  { label: "Total Revenue", value: "₦3,700,000", helper: "+8.4% vs last month", trend: "up" },
  { label: "Total Expenses", value: "₦2,450,000", helper: "+8.2% vs last month", trend: "up" },
  { label: "Net Income", value: "₦1,250,000", helper: "33.8% margin", trend: "up" },
  { label: "Outstanding Invoices", value: "₦200,000", helper: "3 invoices overdue", trend: "down" },
];
