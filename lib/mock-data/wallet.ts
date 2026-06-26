// ── Wallet Mock Data ─────────────────────────────────────────────────────────

export type WalletTransactionType = "Credit" | "Debit";

export type WalletTransactionCategory =
  | "Tuition"
  | "Admission Fee"
  | "External Funding"
  | "Payroll"
  | "Rent"
  | "Supplies"
  | "Utilities"
  | "Refund"
  | "Other";

export type WalletTransactionStatus = "Completed" | "Pending" | "Failed" | "Rejected" | "Expired";

export type WalletTransaction = {
  id: string;
  date: string;
  time: string;
  type: WalletTransactionType;
  category: WalletTransactionCategory;
  description: string;
  amount: number;
  status: WalletTransactionStatus;
  reference?: string;
};

export type WithdrawalStatus = "Pending Approval" | "Processing" | "Completed" | "Rejected" | "Expired";

export type WithdrawalRequest = {
  id: string;
  requestedBy: string;
  amount: number;
  destinationBank: string;
  destinationAccount: string;
  destinationName: string;
  note?: string;
  status: WithdrawalStatus;
  requestedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
};

export type WalletOnboardingStep = 1 | 2 | 3;

export type WalletOnboardingState = "not_started" | "in_progress" | "completed";

export type BankAccountInfo = {
  bankName: string;
  accountNumber: string;
  accountName: string;
  accountType: "Business" | "Personal";
  verified: boolean;
};

// ── Mock wallet balance ──────────────────────────────────────────────────────

export const WALLET_BALANCE = {
  available: 1245000,
  pendingIn: 85000,
  pendingOut: 120000,
};

// ── Mock summary stats ───────────────────────────────────────────────────────

export type WalletStat = {
  label: string;
  value: string;
  helper: string;
  trend?: "up" | "down";
};

export const WALLET_STATS: WalletStat[] = [
  { label: "Total In", value: "₦2,450,000", helper: "This Month", trend: "up" },
  { label: "Total Out", value: "₦1,205,000", helper: "This Month", trend: "down" },
  { label: "Net Flow", value: "+₦1,245,000", helper: "This Month", trend: "up" },
];

// ── Mock transactions ────────────────────────────────────────────────────────

export const WALLET_TRANSACTIONS: WalletTransaction[] = [
  {
    id: "txn-1",
    date: "25 Jun 2026",
    time: "09:14",
    type: "Credit",
    category: "Tuition",
    description: "Payment from Mrs. Okafor — September Tuition",
    amount: 40000,
    status: "Completed",
    reference: "PAYSTACK-TXN-001",
  },
  {
    id: "txn-2",
    date: "24 Jun 2026",
    time: "16:30",
    type: "Debit",
    category: "Payroll",
    description: "Staff salary — Mrs. Sarah (Caregiver)",
    amount: 85000,
    status: "Completed",
  },
  {
    id: "txn-3",
    date: "24 Jun 2026",
    time: "11:05",
    type: "Credit",
    category: "Tuition",
    description: "Payment from Mr. Bello — Weekly Plan",
    amount: 42000,
    status: "Completed",
    reference: "PAYSTACK-TXN-002",
  },
  {
    id: "txn-4",
    date: "23 Jun 2026",
    time: "14:22",
    type: "Debit",
    category: "Rent",
    description: "Monthly facility rent — June",
    amount: 350000,
    status: "Completed",
  },
  {
    id: "txn-5",
    date: "23 Jun 2026",
    time: "10:00",
    type: "Credit",
    category: "Admission Fee",
    description: "Payment from Mrs. Eze — New enrolment admission",
    amount: 25000,
    status: "Completed",
    reference: "PAYSTACK-TXN-003",
  },
  {
    id: "txn-6",
    date: "22 Jun 2026",
    time: "08:45",
    type: "Debit",
    category: "Utilities",
    description: "Electricity bill — Ikeja Electric",
    amount: 45000,
    status: "Completed",
  },
  {
    id: "txn-7",
    date: "22 Jun 2026",
    time: "07:30",
    type: "Debit",
    category: "Supplies",
    description: "Nappies & wipes — Sunshine Supplies",
    amount: 32000,
    status: "Pending",
  },
  {
    id: "txn-8",
    date: "21 Jun 2026",
    time: "15:10",
    type: "Credit",
    category: "Tuition",
    description: "Payment from Mrs. Adeyemi — Monthly Plan",
    amount: 40000,
    status: "Completed",
    reference: "PAYSTACK-TXN-004",
  },
  {
    id: "txn-9",
    date: "21 Jun 2026",
    time: "09:00",
    type: "Debit",
    category: "Payroll",
    description: "Staff salary — Mr. James (Admin)",
    amount: 75000,
    status: "Completed",
  },
  {
    id: "txn-10",
    date: "20 Jun 2026",
    time: "13:45",
    type: "Credit",
    category: "Tuition",
    description: "Payment from Mr. Chukwu — Termly Plan",
    amount: 110000,
    status: "Completed",
    reference: "PAYSTACK-TXN-005",
  },
  {
    id: "txn-11",
    date: "20 Jun 2026",
    time: "11:20",
    type: "Debit",
    category: "Supplies",
    description: "Learning materials — Amazon Supplies",
    amount: 28000,
    status: "Failed",
  },
  {
    id: "txn-12",
    date: "19 Jun 2026",
    time: "08:30",
    type: "Credit",
    category: "External Funding",
    description: "Grant — Lagos State Education Support Fund",
    amount: 500000,
    status: "Completed",
  },
];

// ── Mock pending withdrawals ──────────────────────────────────────────────────

export const PENDING_WITHDRAWALS: WithdrawalRequest[] = [
  {
    id: "wd-1",
    requestedBy: "Mr. Ben (Admin)",
    amount: 85000,
    destinationBank: "GTBank",
    destinationAccount: "••••4567",
    destinationName: "Greg Creche Limited",
    note: "Staff salary — Mrs. Sarah",
    status: "Pending Approval",
    requestedAt: "24 Jun 2026, 16:30",
  },
  {
    id: "wd-2",
    requestedBy: "Mrs. Adunni (Admin)",
    amount: 45000,
    destinationBank: "GTBank",
    destinationAccount: "••••4567",
    destinationName: "Greg Creche Limited",
    note: "Electricity bill payment",
    status: "Processing",
    requestedAt: "23 Jun 2026, 10:15",
    reviewedAt: "23 Jun 2026, 11:00",
    reviewedBy: "Mrs. Folake (Owner)",
  },
];

// ── Mock bank account ────────────────────────────────────────────────────────

export const MOCK_BANK_ACCOUNT: BankAccountInfo = {
  bankName: "Guaranty Trust Bank",
  accountNumber: "0123456789",
  accountName: "Greg Creche Limited",
  accountType: "Business",
  verified: true,
};

// ── Mock banks list ──────────────────────────────────────────────────────────

export const NIGERIAN_BANKS = [
  "Access Bank",
  "Citibank Nigeria",
  "Ecobank Nigeria",
  "Fidelity Bank Nigeria",
  "First Bank of Nigeria",
  "First City Monument Bank",
  "Globus Bank",
  "Guaranty Trust Bank",
  "Keystone Bank",
  "Kuda Bank",
  "Opay",
  "Palmpay",
  "Polaris Bank",
  "Providus Bank",
  "Stanbic IBTC Bank",
  "Standard Chartered Bank",
  "Sterling Bank",
  "SunTrust Bank",
  "Titan Trust Bank",
  "Union Bank of Nigeria",
  "United Bank for Africa",
  "Unity Bank",
  "VFD Microfinance Bank",
  "Wema Bank",
  "Zenith Bank",
];

// ── Helper functions ─────────────────────────────────────────────────────────

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export function getTransactionCategoryColor(category: WalletTransactionCategory): string {
  const colors: Record<WalletTransactionCategory, string> = {
    Tuition: "#009061",
    "Admission Fee": "#009061",
    "External Funding": "#009061",
    Payroll: "#cd3030",
    Rent: "#cd3030",
    Supplies: "#cd3030",
    Utilities: "#cd3030",
    Refund: "#cc8000",
    Other: "#6b7280",
  };
  return colors[category];
}

export function getTransactionStatusColor(status: WalletTransactionStatus): string {
  const colors: Record<WalletTransactionStatus, string> = {
    Completed: "#009061",
    Pending: "#cc8000",
    Failed: "#cd3030",
    Rejected: "#cd3030",
    Expired: "#6b7280",
  };
  return colors[status];
}

export function getWithdrawalStatusColor(status: WithdrawalStatus): string {
  const colors: Record<WithdrawalStatus, string> = {
    "Pending Approval": "#cc8000",
    Processing: "#3b2513",
    Completed: "#009061",
    Rejected: "#cd3030",
    Expired: "#6b7280",
  };
  return colors[status];
}

export function checkNameMatch(accountName: string, crecheName: string): boolean {
  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const a = normalize(accountName);
  const b = normalize(crecheName);
  if (a === b) return true;
  const aWords = a.split(/\s+/);
  const bWords = b.split(/\s+/);
  let matches = 0;
  for (const w of aWords) {
    if (bWords.some((bw) => bw.includes(w) || w.includes(bw))) matches++;
  }
  return matches / Math.max(aWords.length, bWords.length) >= 0.5;
}
