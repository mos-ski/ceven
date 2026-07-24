import { mockParentChildren } from "@/lib/parent/mock-data";

export type PlanId = "free" | "premium_family";

export type Plan = {
  id: PlanId;
  name: string;
  price: string;
  period: string;
  features: string[];
  highlight: boolean;
};

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: "₦0",
    period: "forever",
    features: ["5 AI queries per day", "Basic daily summaries", "Standard support"],
    highlight: false,
  },
  {
    id: "premium_family",
    name: "Premium Family",
    price: "₦2,500",
    period: "per month",
    features: [
      "Unlimited AI queries",
      "Advanced health insights",
      "Weekly trend analysis",
      "Additional family members",
      "Priority support",
      "Early feature access",
    ],
    highlight: true,
  },
];

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
