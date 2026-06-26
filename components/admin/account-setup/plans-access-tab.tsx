"use client";

import { ChevronLeft } from "lucide-react";
import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

type ButtonStyle = "outline" | "current";

type BillingCycle = "monthly" | "quarterly" | "yearly";

type Plan = {
  name: string;
  /** Monthly base price in ₦ */
  monthlyPrice: number;
  desc: string;
  features: string[];
  button: string;
  buttonStyle: ButtonStyle;
  highlighted?: boolean;
  hasAddOns: boolean;
};

type ComparisonRow = {
  feature: string;
  seedling: string;
  nestling: string;
  flourish: string;
};

type AddOn = {
  name: string;
  price: string;
  added: boolean;
};

// ── Static data ───────────────────────────────────────────────────────────────

const plans: Plan[] = [
  {
    name: "Seedling",
    monthlyPrice: 18500,
    desc: "Perfect for small creches just getting started.",
    features: ["Up to 20 children", "2 staff accounts", "Basic reporting", "Email support"],
    button: "Subscribe",
    buttonStyle: "outline",
    hasAddOns: false,
  },
  {
    name: "Nestling Pro",
    monthlyPrice: 45000,
    desc: "Our most popular plan for growing creches.",
    features: [
      "Up to 60 children",
      "10 staff accounts",
      "AI reports & insights",
      "Priority support",
      "Custom branding",
    ],
    button: "Current Plan",
    buttonStyle: "current",
    highlighted: true,
    hasAddOns: true,
  },
  {
    name: "Flourish",
    monthlyPrice: 85000,
    desc: "For established creches with multiple rooms.",
    features: [
      "Unlimited children",
      "Unlimited staff",
      "Advanced AI suite",
      "Dedicated support",
      "Multi-branch support",
      "Custom integrations",
    ],
    button: "Upgrade",
    buttonStyle: "outline",
    hasAddOns: true,
  },
];

// ── Pricing helpers ─────────────────────────────────────────────────────────

function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

function getPriceForCycle(monthlyPrice: number, cycle: BillingCycle): number {
  if (cycle === "quarterly") return Math.round(monthlyPrice * 3 * 0.95); // 5% discount
  if (cycle === "yearly") return Math.round(monthlyPrice * 12 * 0.8); // 20% discount
  return monthlyPrice;
}

function getPerMonthPrice(monthlyPrice: number, cycle: BillingCycle): number {
  if (cycle === "quarterly") return Math.round(monthlyPrice * 0.95); // 5% discount
  if (cycle === "yearly") return Math.round(monthlyPrice * 0.8); // 20% discount
  return monthlyPrice;
}

function getBillingLabel(cycle: BillingCycle): string {
  if (cycle === "quarterly") return "/quarter";
  if (cycle === "yearly") return "/year";
  return "/month";
}

const comparisonRows: ComparisonRow[] = [
  { feature: "Children Limit", seedling: "Up to 20", nestling: "Up to 60", flourish: "Unlimited" },
  { feature: "Staff Accounts", seedling: "2 accounts", nestling: "10 accounts", flourish: "Unlimited" },
  { feature: "AI Reports", seedling: "✗", nestling: "✓", flourish: "✓" },
  { feature: "Ada AI Assistant", seedling: "✗", nestling: "✓", flourish: "✓" },
  { feature: "Custom Branding", seedling: "✗", nestling: "✓", flourish: "✓" },
  { feature: "Priority Support", seedling: "✗", nestling: "✓", flourish: "✓" },
  { feature: "Multi-Branch", seedling: "✗", nestling: "✗", flourish: "✓" },
  { feature: "API Access", seedling: "✗", nestling: "✗", flourish: "✓" },
];

const initialAddOns: AddOn[] = [
  { name: "AI Wellness Reports", price: "₦1,800/month", added: false },
  { name: "Custom Branding Package", price: "₦3,500/month", added: true },
  { name: "SMS Notifications", price: "₦2,000/month", added: false },
  { name: "Multi-Staff Training", price: "₦5,000/month", added: false },
  { name: "Parent Portal Premium", price: "₦2,500/month", added: false },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

function ComparisonCell({ value }: { value: string }) {
  if (value === "✓") {
    return <span className="font-bold text-[#009061]">✓</span>;
  }
  if (value === "✗") {
    return <span className="font-bold text-[#ef4444]">✗</span>;
  }
  return <span className="font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{value}</span>;
}

function StepIndicator({ currentStep, hasAddOns }: { currentStep: 2 | 3 | 4; hasAddOns: boolean }) {
  const steps = hasAddOns
    ? [
        { label: "Choose Plan", number: 1 },
        { label: "Configure Add-ons", number: 2 },
        { label: "Billing & Payment", number: 3 },
      ]
    : [
        { label: "Choose Plan", number: 1 },
        { label: "Plan Period", number: 2 },
      ];

  // currentStep is the global step (2|3|4 for add-on plans, 2 for simple plans);
  // map onto the 1-based step number within this plan's own step sequence.
  const localStep = hasAddOns ? currentStep - 1 : currentStep;

  return (
    <div className="mb-6 flex items-center gap-2 overflow-x-auto font-[family-name:var(--font-nunito)] text-sm">
      {steps.map((step, i) => {
        const isComplete = step.number < localStep;
        const isActive = step.number === localStep;
        const isFuture = step.number > localStep;

        return (
          <div key={step.number} className="flex items-center gap-2">
            {i > 0 && <div className="h-px bg-[#e6ebf3]" style={{ width: 40 }} />}
            <div className="flex items-center gap-2">
              {isActive ? (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3b2513] text-xs text-white">
                  {step.number}
                </div>
              ) : (
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full bg-[#edd9c0] text-xs ${
                    isFuture ? "text-[#9ca3af]" : "text-[#3b2513]"
                  }`}
                >
                  {step.number}
                </div>
              )}
              <span
                className={
                  isComplete
                    ? "text-[#9ca3af] line-through"
                    : isActive
                    ? "font-semibold text-[#3b2513]"
                    : "text-[#9ca3af]"
                }
              >
                {step.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Step 1: Choose Plan ─────────────────────────────────────────────────────

function Step1({ onNext }: { onNext: (plan: Plan) => void }) {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  return (
    <div className="pb-8">
      <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">
        Plans & Access
      </h1>
      <p className="mt-1 font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        Manage your creche subscription and access settings.
      </p>

      {/* Billing cycle toggle */}
      <div className="mt-6 flex items-center justify-center">
        <div className="inline-flex rounded-lg border border-[#e6ebf3] bg-white p-1">
          {(["monthly", "quarterly", "yearly"] as BillingCycle[]).map((cycle) => (
            <button
              key={cycle}
              onClick={() => setBillingCycle(cycle)}
              className={`rounded-md px-4 py-2 font-[family-name:var(--font-urbanist)] text-sm font-medium transition-colors ${
                billingCycle === cycle
                  ? "bg-[#3b2513] text-[#faf2e1]"
                  : "text-[#6b7280] hover:text-[#2d1810]"
              }`}
            >
              {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
              {cycle === "quarterly" && (
                <span className="ml-1 text-[10px] text-[#009061]">Save 5%</span>
              )}
              {cycle === "yearly" && (
                <span className="ml-1 text-[10px] text-[#009061]">Save 20%</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.map((plan) => {
          const total = getPriceForCycle(plan.monthlyPrice, billingCycle);
          const perMonth = getPerMonthPrice(plan.monthlyPrice, billingCycle);
          return (
            <div key={plan.name} className="flex flex-col gap-4 rounded-2xl border border-[#edd9c0] bg-white p-6">
              <div className="flex flex-col gap-1">
                <p className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="font-[family-name:var(--font-merriweather)] text-3xl font-bold text-[#2d1810]">
                    {formatNaira(total)}
                  </span>
                  <span className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
                    {getBillingLabel(billingCycle)}
                  </span>
                </div>
                <p className="font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">
                  {formatNaira(perMonth)}/month{billingCycle !== "monthly" && " (billed " + billingCycle + ")"}
                </p>
                <p className="mt-1 font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">{plan.desc}</p>
              </div>

              <ul className="flex flex-col gap-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                    <span className="mr-2 text-[#009061]">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {plan.buttonStyle === "current" ? (
                <button className="w-full rounded-lg border border-[#d4a67f] bg-[#e0bfa0] py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#3b2513]">
                  {plan.button}
                </button>
              ) : (
                <button
                  className="w-full rounded-lg border border-[#3b2513] py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#3b2513]"
                  onClick={() => onNext(plan)}
                >
                  {plan.button}
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
        <p className="p-5 font-[family-name:var(--font-merriweather)] font-bold text-[#2d1810]">
          Feature Comparison
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#edd9c0]">
                <th className="px-5 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
                  Feature
                </th>
                <th className="px-5 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
                  Seedling
                </th>
                <th className="px-5 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
                  Nestling Pro
                </th>
                <th className="px-5 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
                  Flourish
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={row.feature} className={`border-b border-[#eaecf0] ${i % 2 === 0 ? "bg-white" : "bg-[#f9f8f6]"}`}>
                  <td className="px-5 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                    {row.feature}
                  </td>
                  <td className="px-5 py-3">
                    <ComparisonCell value={row.seedling} />
                  </td>
                  <td className="px-5 py-3">
                    <ComparisonCell value={row.nestling} />
                  </td>
                  <td className="px-5 py-3">
                    <ComparisonCell value={row.flourish} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Step 2 (no add-ons): Plan Period + Billing + Pay ───────────────────────

function PlanPeriodAndBilling({
  plan,
  onBack,
  onPay,
  stepNumber,
  hasAddOns,
  baseCharges,
}: {
  plan: Plan;
  onBack: () => void;
  onPay: () => void;
  stepNumber: 2 | 3;
  hasAddOns: boolean;
  baseCharges: { label: string; value: string }[];
}) {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  const total = getPriceForCycle(plan.monthlyPrice, billingCycle);
  const perMonth = getPerMonthPrice(plan.monthlyPrice, billingCycle);

  return (
    <div className="pb-8">
      <StepIndicator currentStep={stepNumber} hasAddOns={hasAddOns} />

      <button
        onClick={onBack}
        aria-label="Back"
        className="mb-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#edd9c0]"
      >
        <ChevronLeft className="h-5 w-5 text-[#3b2513]" />
      </button>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="rounded-2xl border border-[#edd9c0] p-5" style={{ background: "rgba(241,155,2,0.08)" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">Subscribe for</p>
                <p className="font-[family-name:var(--font-merriweather)] text-xl font-bold text-[#2d1810]">
                  {plan.name}
                </p>
              </div>
              <div className="flex gap-4">
                {(["monthly", "quarterly", "yearly"] as BillingCycle[]).map((cycle) => (
                  <label key={cycle} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="billing"
                      checked={billingCycle === cycle}
                      onChange={() => setBillingCycle(cycle)}
                      className="accent-[#3b2513]"
                    />
                    <span className="font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                      {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
                    </span>
                    {cycle === "quarterly" && (
                      <span className="rounded-full bg-[#ecfff8] px-1.5 py-0.5 text-[10px] font-semibold text-[#009061]">-5%</span>
                    )}
                    {cycle === "yearly" && (
                      <span className="rounded-full bg-[#ecfff8] px-1.5 py-0.5 text-[10px] font-semibold text-[#009061]">-20%</span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            <p className="mt-1 font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">
              {formatNaira(total)} <span className="font-[family-name:var(--font-nunito)] text-xs font-normal text-[#6b7280]">{getBillingLabel(billingCycle)}</span>
            </p>
            {billingCycle !== "monthly" && (
              <p className="font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">
                {formatNaira(perMonth)}/month equivalent
              </p>
            )}

            <div className="my-4 border-t border-[#edd9c0]" />

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">First Payment:</p>
                <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">Due Now</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">Next Payment Due:</p>
                <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
                  {billingCycle === "monthly" && "July 28, 2026"}
                  {billingCycle === "quarterly" && "September 28, 2026"}
                  {billingCycle === "yearly" && "June 28, 2027"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <p className="mb-3 font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
              Billing Information
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Creche Name"
                className="w-full rounded-lg border border-[#d0d5dd] bg-white px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] placeholder:text-[#9ca3af] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-lg border border-[#d0d5dd] bg-white px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] placeholder:text-[#9ca3af] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
              />
            </div>
          </div>

          <div className="mt-4">
            <p className="mb-3 font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
              Card Information
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Cardholder Name"
                className="w-full rounded-lg border border-[#d0d5dd] bg-white px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] placeholder:text-[#9ca3af] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
              />
              <input
                type="text"
                placeholder="0000 0000 0000 0000"
                className="w-full rounded-lg border border-[#d0d5dd] bg-white px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] placeholder:text-[#9ca3af] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full rounded-lg border border-[#d0d5dd] bg-white px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] placeholder:text-[#9ca3af] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
                />
                <input
                  type="text"
                  placeholder="•••"
                  className="w-full rounded-lg border border-[#d0d5dd] bg-white px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] placeholder:text-[#9ca3af] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
                />
              </div>
              <label className="flex cursor-pointer items-center gap-2">
                <input type="checkbox" className="accent-[#3b2513]" />
                <span className="font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                  Save card for future payments
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[360px] shrink-0">
          <div className="rounded-2xl border border-[#e6ebf3] bg-white p-5">
            <p className="mb-4 font-[family-name:var(--font-nunito)] font-semibold text-[#2d1810]">Summary</p>

            {baseCharges.map((charge) => (
              <div key={charge.label} className="mb-3 flex justify-between font-[family-name:var(--font-nunito)] text-sm">
                <span className="text-[#6b7280]">{charge.label}</span>
                <span className="text-[#2d1810]">{charge.value}</span>
              </div>
            ))}

            <div className="my-3 border-t border-[#e6ebf3]" />

            <div className="flex justify-between font-[family-name:var(--font-nunito)] text-sm">
              <span className="font-bold text-[#2d1810]">Total Amount</span>
              <span className="font-bold text-[#2d1810]">{formatNaira(total)}</span>
            </div>

            <button
              onClick={onPay}
              className="mt-4 w-full rounded-lg bg-[#3b2513] py-3 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#faf2e1]"
            >
              Pay {formatNaira(total)}.00
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Step 2 (with add-ons): Configure Add-ons ────────────────────────────────

function ConfigureAddOns({
  plan,
  onBack,
  onContinue,
}: {
  plan: Plan;
  onBack: () => void;
  onContinue: () => void;
}) {
  const [addOns, setAddOns] = useState<AddOn[]>(initialAddOns);

  function toggleAddOn(index: number) {
    setAddOns((prev) => prev.map((addon, i) => (i === index ? { ...addon, added: !addon.added } : addon)));
  }

  const addedCount = addOns.filter((a) => a.added).length;

  return (
    <div className="pb-8">
      <StepIndicator currentStep={2} hasAddOns />

      <button
        onClick={onBack}
        aria-label="Back"
        className="mb-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#edd9c0]"
      >
        <ChevronLeft className="h-5 w-5 text-[#3b2513]" />
      </button>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="rounded-2xl border border-[#edd9c0] p-5" style={{ background: "rgba(241,155,2,0.08)" }}>
            <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">Subscribe for</p>
            <p className="font-[family-name:var(--font-merriweather)] text-xl font-bold text-[#2d1810]">{plan.name}</p>
            <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
              {formatNaira(plan.monthlyPrice)} <span className="text-xs">/ Per Month</span>
            </p>
          </div>

          <div className="mt-5 rounded-2xl border border-[#e6ebf3] bg-white p-5">
            <p className="mb-4 font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">Add-ons</p>

            <div className="flex flex-col gap-3">
              {addOns.map((addon, i) => (
                <div
                  key={addon.name}
                  className="flex items-center justify-between gap-10 rounded-xl border border-[#ccd2dc] bg-white px-4 py-3"
                >
                  <div>
                    <p className="font-[family-name:var(--font-nunito)] text-sm text-[#1f2937]">{addon.name}</p>
                    <p className="font-[family-name:var(--font-merriweather)] text-sm font-semibold text-black">
                      {addon.price}
                    </p>
                  </div>
                  {addon.added ? (
                    <button
                      onClick={() => toggleAddOn(i)}
                      className="shrink-0 rounded-lg border border-[#cd3030] px-5 py-2 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#cd3030]"
                    >
                      Remove From Plan
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleAddOn(i)}
                      className="shrink-0 rounded-lg border border-[#3b2513] px-5 py-2 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#3b2513]"
                    >
                      Add to Plan
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[360px] shrink-0">
          <div className="rounded-2xl border border-[#e6ebf3] bg-white p-5">
            <p className="mb-4 font-[family-name:var(--font-nunito)] font-semibold text-[#2d1810]">Summary</p>

            {addOns
              .filter((a) => a.added)
              .map((addon) => (
                <div key={addon.name} className="mb-3 flex justify-between font-[family-name:var(--font-nunito)] text-sm">
                  <span className="text-[#6b7280]">{addon.name}</span>
                  <span className="text-[#2d1810]">{addon.price.replace("/month", "")}</span>
                </div>
              ))}
            <div className="mb-3 flex justify-between font-[family-name:var(--font-nunito)] text-sm">
              <span className="text-[#6b7280]">VAT (7.5%)</span>
              <span className="text-[#2d1810]">₦3,000.00</span>
            </div>

            <div className="my-3 border-t border-[#e6ebf3]" />

            <div className="flex justify-between font-[family-name:var(--font-nunito)] text-sm">
              <span className="font-bold text-[#2d1810]">Total Amount</span>
              <span className="font-bold text-[#2d1810]">₦43,000</span>
            </div>

            <button
              onClick={onContinue}
              className="mt-4 w-full rounded-lg bg-[#e0bfa0] py-3 font-[family-name:var(--font-urbanist)] text-sm font-medium text-white"
            >
              Continue
            </button>
            {addedCount === 0 && (
              <p className="mt-2 text-center font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">
                No add-ons selected yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3 | 4;

export function PlansAccessTab() {
  const [step, setStep] = useState<Step>(1);
  const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[0]);

  if (step === 1) {
    return (
      <Step1
        onNext={(plan) => {
          setSelectedPlan(plan);
          setStep(2);
        }}
      />
    );
  }

  if (!selectedPlan.hasAddOns) {
    // Two-step flow: Choose Plan -> Plan Period (billing + pay)
    return (
      <PlanPeriodAndBilling
        plan={selectedPlan}
        stepNumber={2}
        hasAddOns={false}
        onBack={() => setStep(1)}
        onPay={() => setStep(1)}
        baseCharges={[
          { label: "Base Price", value: "₦40,000.00" },
          { label: "VAT (7.5%)", value: "₦3,000.00" },
        ]}
      />
    );
  }

  // Three-step flow: Choose Plan -> Configure Add-ons -> Billing & Payment
  if (step === 2) {
    return <ConfigureAddOns plan={selectedPlan} onBack={() => setStep(1)} onContinue={() => setStep(3)} />;
  }

  return (
    <PlanPeriodAndBilling
      plan={selectedPlan}
      stepNumber={3}
      hasAddOns
      onBack={() => setStep(2)}
      onPay={() => setStep(1)}
      baseCharges={[
        { label: "Base Price", value: "₦40,000.00" },
        { label: "Add-ons", value: "₦40,000.00" },
        { label: "VAT (7.5%)", value: "₦3,000.00" },
      ]}
    />
  );
}
