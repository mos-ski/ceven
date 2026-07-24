import { mockParentChildren } from "@/lib/parent/mock-data";

export type PlanId = "free" | "premium_family";
export type BillingCycle = "monthly" | "quarterly" | "yearly";

export type Plan = {
  id: PlanId;
  name: string;
  features: string[];
  highlight: boolean;
  /** Only paid plans carry pricing; Free has none. */
  pricing?: Record<BillingCycle, number>;
};

export const BILLING_CYCLES: { id: BillingCycle; label: string }[] = [
  { id: "monthly", label: "Monthly" },
  { id: "quarterly", label: "Quarterly" },
  { id: "yearly", label: "Yearly" },
];

/** Max child profiles a Free-tier account may create (existing profiles are never hidden). */
export const FREE_PLAN_CHILD_LIMIT = 1;

export const VAT_RATE = 0.075;

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free Plan",
    highlight: false,
    features: ["5 messages", "5 CEvenAI chats", "1 special request per child", "1 device", "1 parent profile"],
  },
  {
    id: "premium_family",
    name: "Premium",
    highlight: true,
    pricing: { monthly: 9950, quarterly: 23880, yearly: 95520 },
    features: [
      "CEven AI Assistant",
      "Special Requests Feature",
      "Unlimited children profiles",
      "Up to 2 devices",
      "Priority support",
      "7-day free trial",
    ],
  },
];

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export type PaymentMethodType = "card" | "bank" | "ussd";

export type PaymentMethod = {
  id: string;
  type: PaymentMethodType;
  label: string;
  detail: string;
  isDefault: boolean;
};

export const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  { id: "pm-1", type: "card", label: "Visa •••• 4242", detail: "Expires 08/28", isDefault: true },
  { id: "pm-2", type: "bank", label: "GTBank •••• 6021", detail: "Account ending 6021", isDefault: false },
];

export type AcceptanceFee = {
  id: string;
  childId: string;
  childName: string;
  amount: number;
  status: "paid" | "pending";
  dueDate: string;
};

export const MOCK_ACCEPTANCE_FEES: AcceptanceFee[] = [
  { id: "af-1", childId: mockParentChildren[0].id, childName: mockParentChildren[0].name, amount: 15000, status: "paid", dueDate: "2025-09-01" },
  { id: "af-2", childId: mockParentChildren[1].id, childName: mockParentChildren[1].name, amount: 15000, status: "pending", dueDate: "2026-08-15" },
];
