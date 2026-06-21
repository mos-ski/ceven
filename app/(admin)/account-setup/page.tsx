"use client";

import { ChevronLeft } from "lucide-react";
import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

type ButtonStyle = "outline" | "current";

type Plan = {
  name: string;
  price: string;
  period: string;
  desc: string;
  features: string[];
  button: string;
  buttonStyle: ButtonStyle;
  highlighted?: boolean;
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
    price: "₦18,500",
    period: "/month",
    desc: "Perfect for small creches just getting started.",
    features: ["Up to 20 children", "2 staff accounts", "Basic reporting", "Email support"],
    button: "Subscribe",
    buttonStyle: "outline",
  },
  {
    name: "Nestling Pro",
    price: "₦45,000",
    period: "/month",
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
  },
  {
    name: "Flourish",
    price: "₦85,000",
    period: "/month",
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
  },
];

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
  return (
    <span className="font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{value}</span>
  );
}

type StepIndicatorProps = {
  currentStep: 2 | 3;
};

function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = [
    { label: "Choose Plan", number: 1 },
    { label: "Plan Period", number: 2 },
    { label: "Configure Add-ons", number: 3 },
  ];

  return (
    <div className="mb-6 flex items-center gap-2 overflow-x-auto font-[family-name:var(--font-nunito)] text-sm">
      {steps.map((step, i) => {
        const isComplete = step.number < currentStep;
        const isActive = step.number === currentStep;
        const isFuture = step.number > currentStep;

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

// ── Step 1 ────────────────────────────────────────────────────────────────────

function Step1({ onNext }: { onNext: () => void }) {
  return (
    <div className="pb-8">
      {/* Page header */}
      <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">
        Plans & Access
      </h1>
      <p className="mt-1 font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        Manage your creche subscription and access settings.
      </p>

      {/* Plan cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="flex flex-col gap-4 rounded-2xl border border-[#edd9c0] bg-white p-6"
          >
            <div className="flex flex-col gap-1">
              <p className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
                {plan.name}
              </p>
              <div className="flex items-baseline gap-1">
                <span className="font-[family-name:var(--font-merriweather)] text-3xl font-bold text-[#2d1810]">
                  {plan.price}
                </span>
                <span className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
                  {plan.period}
                </span>
              </div>
              <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
                {plan.desc}
              </p>
            </div>

            <ul className="flex flex-col gap-2">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]"
                >
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
                onClick={onNext}
              >
                {plan.button}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Feature comparison table */}
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
              <tr
                key={row.feature}
                className={`border-b border-[#eaecf0] ${i % 2 === 0 ? "bg-white" : "bg-[#f9f8f6]"}`}
              >
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

// ── Step 2 ────────────────────────────────────────────────────────────────────

function Step2({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="pb-8">
      <StepIndicator currentStep={2} />

      {/* Back button */}
      <button
        onClick={onBack}
        className="mb-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#edd9c0]"
      >
        <ChevronLeft className="h-5 w-5 text-[#3b2513]" />
      </button>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left panel */}
        <div className="flex-1">
          {/* Plan summary card */}
          <div
            className="rounded-2xl border border-[#edd9c0] p-5"
            style={{ background: "rgba(241,155,2,0.08)" }}
          >
            <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
              Subscribe for
            </p>
            <p className="font-[family-name:var(--font-merriweather)] text-xl font-bold text-[#2d1810]">
              Seedlings
            </p>
            <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
              ₦18,500 / Per Month
            </p>

            <div className="my-4 border-t border-[#edd9c0]" />

            {/* Billing cycle radio */}
            <div className="mt-3 flex flex-col gap-3">
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-xl p-3 ${
                  billingCycle === "monthly"
                    ? "border-2 border-[#3b2513] bg-white"
                    : "border border-[#e6ebf3] bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="billing"
                  value="monthly"
                  checked={billingCycle === "monthly"}
                  onChange={() => setBillingCycle("monthly")}
                  className="accent-[#3b2513]"
                />
                <div>
                  <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
                    Monthly
                  </p>
                  <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
                    ₦18,500 / month
                  </p>
                </div>
              </label>

              <label
                className={`flex cursor-pointer items-center gap-3 rounded-xl p-3 ${
                  billingCycle === "yearly"
                    ? "border-2 border-[#3b2513] bg-white"
                    : "border border-[#e6ebf3] bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="billing"
                  value="yearly"
                  checked={billingCycle === "yearly"}
                  onChange={() => setBillingCycle("yearly")}
                  className="accent-[#3b2513]"
                />
                <div>
                  <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
                    Yearly
                  </p>
                  <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
                    ₦185,000 / year
                  </p>
                </div>
              </label>
            </div>

            <div className="my-4 border-t border-[#edd9c0]" />

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
                  First Payment:
                </p>
                <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
                  Due Now
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
                  Next Payment Due:
                </p>
                <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
                  July 28, 2026
                </p>
              </div>
            </div>
          </div>

          {/* Billing Information */}
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

          {/* Card Information */}
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

        {/* Right panel */}
        <div className="w-full lg:w-[360px] shrink-0">
          <div className="rounded-2xl border border-[#e6ebf3] bg-white p-5">
            <p className="mb-4 font-[family-name:var(--font-nunito)] font-semibold text-[#2d1810]">
              Order Summary
            </p>

            <div className="mb-3 flex justify-between font-[family-name:var(--font-nunito)] text-sm">
              <span className="text-[#6b7280]">Base Price</span>
              <span className="text-[#2d1810]">₦40,000</span>
            </div>
            <div className="mb-3 flex justify-between font-[family-name:var(--font-nunito)] text-sm">
              <span className="text-[#6b7280]">VAT (7.5%)</span>
              <span className="text-[#2d1810]">₦3,000</span>
            </div>

            <div className="my-3 border-t border-[#e6ebf3]" />

            <div className="flex justify-between font-[family-name:var(--font-nunito)] text-sm">
              <span className="font-bold text-[#2d1810]">Total Amount</span>
              <span className="font-bold text-[#2d1810]">₦43,000</span>
            </div>

            <button
              onClick={onNext}
              className="mt-4 w-full rounded-lg bg-[#3b2513] py-3 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#faf2e1]"
            >
              Pay ₦43,000.00
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Step 3 ────────────────────────────────────────────────────────────────────

function Step3({ onBack }: { onBack: () => void }) {
  const [addOns, setAddOns] = useState<AddOn[]>(initialAddOns);

  function toggleAddOn(index: number) {
    setAddOns((prev) =>
      prev.map((addon, i) => (i === index ? { ...addon, added: !addon.added } : addon))
    );
  }

  return (
    <div className="pb-8">
      <StepIndicator currentStep={3} />

      {/* Back button */}
      <button
        onClick={onBack}
        className="mb-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#edd9c0]"
      >
        <ChevronLeft className="h-5 w-5 text-[#3b2513]" />
      </button>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left panel */}
        <div className="flex-1">
          {/* Plan summary card */}
          <div
            className="rounded-2xl border border-[#edd9c0] p-5"
            style={{ background: "rgba(241,155,2,0.08)" }}
          >
            <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
              Subscribe for
            </p>
            <p className="font-[family-name:var(--font-merriweather)] text-xl font-bold text-[#2d1810]">
              Nestling Pro
            </p>
            <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
              ₦18,500/month
            </p>
          </div>

          {/* Add-ons section */}
          <div className="mt-5 rounded-2xl border border-[#e6ebf3] bg-white p-5">
            <p className="mb-4 font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
              Available Add-ons
            </p>

            <div className="flex flex-col">
              {addOns.map((addon, i) => (
                <div
                  key={addon.name}
                  className="flex items-center justify-between border-b border-[#f3f4f6] py-3 last:border-0"
                >
                  <div>
                    <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
                      {addon.name}
                    </p>
                    <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
                      {addon.price}
                    </p>
                  </div>
                  {addon.added ? (
                    <button
                      onClick={() => toggleAddOn(i)}
                      className="rounded-lg border border-[#cd3030] px-3 py-1.5 font-[family-name:var(--font-nunito)] text-xs font-medium text-[#cd3030]"
                    >
                      Remove From Plan
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleAddOn(i)}
                      className="rounded-lg border border-[#d0d5dd] px-3 py-1.5 font-[family-name:var(--font-nunito)] text-xs font-medium text-[#3b2513] hover:border-[#3b2513]"
                    >
                      Add to Plan
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-full lg:w-[360px] shrink-0">
          <div className="rounded-2xl border border-[#e6ebf3] bg-white p-5">
            <p className="mb-4 font-[family-name:var(--font-nunito)] font-semibold text-[#2d1810]">
              Order Summary
            </p>

            <div className="mb-3 flex justify-between font-[family-name:var(--font-nunito)] text-sm">
              <span className="text-[#6b7280]">Add-ons (×1)</span>
              <span className="text-[#2d1810]">₦3,500</span>
            </div>
            <div className="mb-3 flex justify-between font-[family-name:var(--font-nunito)] text-sm">
              <span className="text-[#6b7280]">Base Plan</span>
              <span className="text-[#2d1810]">₦18,500</span>
            </div>
            <div className="mb-3 flex justify-between font-[family-name:var(--font-nunito)] text-sm">
              <span className="text-[#6b7280]">VAT (7.5%)</span>
              <span className="text-[#2d1810]">₦1,650</span>
            </div>

            <div className="my-3 border-t border-[#e6ebf3]" />

            <div className="flex justify-between font-[family-name:var(--font-nunito)] text-sm">
              <span className="font-bold text-[#2d1810]">Total</span>
              <span className="font-bold text-[#2d1810]">₦23,650</span>
            </div>

            <button className="mt-4 w-full rounded-lg border border-[#d4a67f] bg-[#e0bfa0] py-3 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#3b2513]">
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AccountSetupPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  return (
    <>
      {step === 1 && <Step1 onNext={() => setStep(2)} />}
      {step === 2 && <Step2 onBack={() => setStep(1)} onNext={() => setStep(3)} />}
      {step === 3 && <Step3 onBack={() => setStep(2)} />}
    </>
  );
}
