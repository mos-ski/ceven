export type DonutSegment = {
  label: string;
  pct: number;
  color: string;
};

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
  receipt: boolean;
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
    date: "May 15",
    vendor: "Mr Ben Ayadi",
    category: "Supplies",
    description: "Apr 10 (20 days)",
    amount: "₦40,000",
    status: "Paid",
    receipt: true,
  },
  {
    id: "exp-2",
    date: "Mar 30",
    vendor: "Mr Ben Ayadi",
    category: "Supplies",
    description: "Nappies & wipes — Sunshine Supplies",
    amount: "₦40,000",
    status: "Pending",
    receipt: true,
  },
  {
    id: "exp-3",
    date: "—",
    vendor: "Mr Ben Ayadi",
    category: "Others",
    description: "May 1",
    amount: "—",
    status: "Paid",
    receipt: false,
  },
  {
    id: "exp-4",
    date: "Apr 10",
    vendor: "Mr Ben Ayadi",
    category: "Utilities",
    description: "Payment for light supply",
    amount: "₦40,000",
    status: "Pending",
    receipt: true,
  },
];

export type ReoccurringBill = {
  id: string;
  name: string;
  dueNote: string;
  amount: string;
};

export const REOCCURRING_BILLS: ReoccurringBill[] = [
  { id: "bill-1", name: "Rentage", dueNote: "Due in 8 days", amount: "₦1.2m" },
  { id: "bill-2", name: "Utility", dueNote: "Due in 8 days", amount: "₦82k" },
  { id: "bill-3", name: "Payroll", dueNote: "Due April 30", amount: "₦1.8m" },
];

export type ExpenseOverviewStat = {
  label: string;
  value: string;
  helper: string;
};

export const EXPENSE_OVERVIEW: ExpenseOverviewStat[] = [
  { label: "Monthly Budget", value: "₦250,000", helper: "12% under forecast" },
  { label: "Expenses", value: "₦220,000", helper: "8% vs Last Month (52 Transactions)" },
  { label: "Remaining Budget", value: "₦30,000", helper: "Estimated 11 days remaining" },
  { label: "Pending Approval", value: "2", helper: "₦45k waiting Review Now" },
];

export const EXPENSE_BREAKDOWN: DonutSegment[] = [
  { label: "Payroll - 75%", pct: 76, color: "#bab68d" },
  { label: "Utilities - 75%", pct: 7, color: "#e2622a" },
  { label: "Supplies - 75%", pct: 9, color: "#3b2513" },
  { label: "Rent - 75%", pct: 8, color: "#edd9c0" },
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
  { label: "Total Revenue", value: "₦100", helper: "+12.5% vs Last Month", trend: "up" },
  { label: "Total Expenses", value: "₦100", helper: "-8% vs Last Month", trend: "down" },
  { label: "Net Profit", value: "₦40", helper: "Profit margin 35%", trend: "up" },
  { label: "Cash Available", value: "₦10", helper: "56 Days Runway", trend: "neutral" },
];

// ── Billing & Payments mock data ─────────────────────────────────────────────

export type BillingStat = {
  label: string;
  value: string;
  helper: string;
  trend?: "up" | "down";
};

export const BILLING_STATS: BillingStat[] = [
  { label: "Collected", value: "₦1.6m", helper: "12% vs last month (28 invoices paid)", trend: "up" },
  { label: "Outstanding", value: "₦480k", helper: "8 Unpaid Invoice (. Due today)" },
  { label: "Overdue Payments", value: "₦135k", helper: "Oldest Overdue: 14 days+" },
  { label: "Target This Month", value: "₦1.74m (85%)", helper: "73% collection rate (19 days left)" },
];

export const COLLECTION_TREND = [42, 58, 38, 70, 50, 65, 40, 72, 55, 80, 60, 45, 68, 50];

export type CollectionProgressStat = {
  label: string;
  value: string;
  helper: string;
};

export const COLLECTION_PROGRESS_STATS: CollectionProgressStat[] = [
  { label: "Collected", value: "₦1,260,000", helper: "12% vs last month" },
  { label: "Remaining", value: "₦4,800,000", helper: "12% vs last month" },
  { label: "Forecast", value: "₦4,800,000", helper: "27% to hit breach" },
  { label: "Target", value: "₦1.75m (73%)", helper: "13 days left" },
];

export const PAYMENT_STATUS_BREAKDOWN: DonutSegment[] = [
  { label: "Paid - 75%", pct: 75, color: "#bab68d" },
  { label: "Overdue - 5%", pct: 5, color: "#e2622a" },
  { label: "Partial - 12%", pct: 12, color: "#3b2513" },
  { label: "Pending Approval - 3%", pct: 8, color: "#edd9c0" },
];

export type RiskLevel = "Low" | "Medium" | "High Risk";
export type InvoiceTrackingStatus = "Overdue" | "Partial" | "Paid" | "Pending";

export type InvoiceTrackingRow = {
  id: string;
  child: string;
  extraChildren: number;
  parentName: string;
  roomPlan: string;
  duePayment: string;
  dueDate: string;
  status: InvoiceTrackingStatus;
  daysOverdue?: string;
  risk: RiskLevel;
};

export const INVOICE_TRACKING: InvoiceTrackingRow[] = [
  { id: "it-1", child: "K Andrew", extraChildren: 1, parentName: "Mr Ben Ayadi", roomPlan: "Full day (₦40,000)", duePayment: "₦40,000", dueDate: "Apr 10", status: "Overdue", daysOverdue: "20 days", risk: "High Risk" },
  { id: "it-2", child: "King Andrew", extraChildren: 0, parentName: "Mr Ben Ayadi", roomPlan: "Weekly (₦42,000)", duePayment: "₦40,000", dueDate: "Feb 2", status: "Partial", risk: "Medium" },
  { id: "it-3", child: "King Andrew", extraChildren: 0, parentName: "Mr Ben Ayadi", roomPlan: "Monthly (₦40,000)", duePayment: "--", dueDate: "--", status: "Paid", risk: "Low" },
  { id: "it-4", child: "King Andrew", extraChildren: 0, parentName: "Mr Ben Ayadi", roomPlan: "Weekly (₦40,000)", duePayment: "₦40,000", dueDate: "Feb 10", status: "Pending", risk: "High Risk" },
];

// ── Financial Reports: Revenue Breakdown / Room Plans / Cash Flow ───────────

export const REVENUE_BREAKDOWN: DonutSegment[] = [
  { label: "Tuition fees - 75%", pct: 75, color: "#bab68d" },
  { label: "Registration - 75%", pct: 8, color: "#e2622a" },
  { label: "Transport - 75%", pct: 8, color: "#3b2513" },
  { label: "Meals - 75%", pct: 9, color: "#edd9c0" },
];

export type ProfitLossLine = {
  label: string;
  value: string;
  bold?: boolean;
};

export const PL_INCOME: ProfitLossLine[] = [
  { label: "Tuition fees", value: "₦1,200,000.00" },
  { label: "Registration fees", value: "₦1,200,000.00" },
  { label: "Meals add-on", value: "₦1,200,000.00" },
  { label: "Total Income", value: "₦1,200,000.00", bold: true },
];

export const PL_EXPENDITURE: ProfitLossLine[] = [
  { label: "Payroll", value: "₦1,200,000.00" },
  { label: "Rent", value: "₦1,200,000.00" },
  { label: "Utilities", value: "₦1,200,000.00" },
  { label: "Supplies & Consumables", value: "₦1,200,000.00" },
  { label: "Maintenance", value: "₦1,200,000.00" },
  { label: "Total Expenditure", value: "₦1,200,000.00", bold: true },
];

export type PlMiniStat = {
  label: string;
  value: string;
  pct: string;
  helper: string;
};

export const PL_MINI_STATS: PlMiniStat[] = [
  { label: "Revenue", value: "4.8M", pct: "74%", helper: "+05% vs Last Month" },
  { label: "Operation Cost", value: "2.8M", pct: "64%", helper: "+07% vs Last Month" },
  { label: "Administrative Cost", value: "2.8M", pct: "64%", helper: "-05% vs Last Month" },
  { label: "Net Profit", value: "1.8M", pct: "20%", helper: "-05% vs Last Month" },
];

export type RoomPlanRevenueRow = {
  id: string;
  room: string;
  children: string;
  plan: string;
  revBilled: string;
  revCollected: string;
  outstanding: string;
  collectionPct: number;
};

export const ROOM_PLAN_REVENUE: RoomPlanRevenueRow[] = [
  { id: "rp-1", room: "Lion", children: "Feb 2", plan: "Full day (3)\nWeekly (3)", revBilled: "₦40,000", revCollected: "₦40,000", outstanding: "₦40,000", collectionPct: 68 },
  { id: "rp-2", room: "Butterfly", children: "₦40,000", plan: "Monthly (3)\nWeekly (3)", revBilled: "₦40,000", revCollected: "₦40,000", outstanding: "₦40,000", collectionPct: 72 },
  { id: "rp-3", room: "Suflower", children: "₦40,000", plan: "Full day (3)\nMonthly (3)", revBilled: "₦40,000", revCollected: "₦40,000", outstanding: "₦40,000", collectionPct: 60 },
  { id: "rp-4", room: "Feedlings", children: "₦40,000", plan: "Monthly (3)\nWeekly (3)", revBilled: "₦40,000", revCollected: "₦40,000", outstanding: "₦40,000", collectionPct: 80 },
  { id: "rp-5", room: "Feedlings", children: "₦40,000", plan: "Monthly (3)\nWeekly (3)", revBilled: "₦40,000", revCollected: "₦40,000", outstanding: "₦40,000", collectionPct: 78 },
];

export type CashFlowMonth = {
  month: string;
  cashIn: number;
  cashOut: number;
  netCashFlow: number;
};

export const CASH_FLOW: CashFlowMonth[] = [
  { month: "Jan", cashIn: 70, cashOut: 50, netCashFlow: 25 },
  { month: "Feb", cashIn: 65, cashOut: 45, netCashFlow: 22 },
  { month: "Mar", cashIn: 75, cashOut: 55, netCashFlow: 28 },
  { month: "Apr", cashIn: 60, cashOut: 50, netCashFlow: 20 },
  { month: "May", cashIn: 85, cashOut: 60, netCashFlow: 35 },
  { month: "Jun", cashIn: 50, cashOut: 70, netCashFlow: -15 },
  { month: "Jul", cashIn: 78, cashOut: 52, netCashFlow: 30 },
  { month: "Aug", cashIn: 72, cashOut: 48, netCashFlow: 26 },
  { month: "Sep", cashIn: 80, cashOut: 58, netCashFlow: 27 },
  { month: "Oct", cashIn: 68, cashOut: 50, netCashFlow: 24 },
  { month: "Nov", cashIn: 73, cashOut: 53, netCashFlow: 25 },
  { month: "Dec", cashIn: 77, cashOut: 56, netCashFlow: 26 },
];

export type CollectionEfficiencyStat = {
  label: string;
  value: string;
};

export const COLLECTION_EFFICIENCY: CollectionEfficiencyStat[] = [
  { label: "Forecasted", value: "₦280000" },
  { label: "Collection Rate", value: "87%" },
  { label: "Outstanding Revenue", value: "₦25000" },
  { label: "Overdue Accounts", value: "8 Families" },
];
