"use client";

import { useState } from "react";
import { Check, Star } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

type PlanTier = "CEven Grow" | "CEven Thrive";

type Plan = {
 name: PlanTier;
 monthlyPrice: number;
 tagline: string;
 icon: "leaf" | "star";
 highlighted: boolean;
 features: string[];
};

const PLANS: Plan[] = [
 {
  name: "CEven Grow",
  monthlyPrice: 25000,
  tagline: "Perfect for growing childcare centres",
  icon: "leaf",
  highlighted: false,
  features: [
   "Up to 35 children",
   "Up to 10 staff accounts",
   "Parent mobile app",
   "Daily reports",
   "Attendance management",
   "Child records",
   "Parent communication",
   "Billing & invoicing",
   "Basic analytics",
   "Email support",
  ],
 },
 {
  name: "CEven Thrive",
  monthlyPrice: 37000,
  tagline: "Built for ambitious childcare providers",
  icon: "star",
  highlighted: true,
  features: [
   "Unlimited children",
   "Unlimited staff accounts",
   "Everything in Grow",
   "Reports & insights",
   "Advanced analytics",
   "Priority support",
   "Multi-branch support",
   "Custom branding",
   "API & integrations",
   "Dedicated onboarding",
  ],
 },
];

type ComparisonRow = {
 feature: string;
 grow: string;
 thrive: string;
};

const COMPARISON_ROWS: ComparisonRow[] = [
 { feature: "Children Limit", grow: "Up to 35", thrive: "Unlimited" },
 { feature: "Staff Accounts", grow: "Up to 10", thrive: "Unlimited" },
 { feature: "Parent Mobile App", grow: "✓", thrive: "✓" },
 { feature: "Daily Reports", grow: "✓", thrive: "✓" },
 { feature: "Attendance Management", grow: "✓", thrive: "✓" },
 { feature: "Reports & Insights", grow: "–", thrive: "✓" },
 { feature: "Advanced Analytics", grow: "–", thrive: "✓" },
 { feature: "Priority Support", grow: "Email support", thrive: "Priority support" },
 { feature: "Multi-branch Support", grow: "–", thrive: "✓" },
];

function formatNaira(amount: number): string {
 return `₦${amount.toLocaleString("en-NG")}`;
}

function PlanIcon({ icon, highlighted }: { icon: "leaf" | "star"; highlighted: boolean }) {
 if (icon === "leaf") {
  return (
   <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#4C1D95]">
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="h-6 w-6">
     <path d="M12 22c4-4 8-7.5 8-12a8 8 0 1 0-16 0c0 4.5 4 8 8 12z" />
     <path d="M12 22V10" />
     <path d="M8 14c2-1 4-1 6 0" />
    </svg>
   </div>
  );
 }
 return (
  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F59E0B]">
   <Star className="h-6 w-6 text-white" />
  </div>
 );
}

function ComparisonCheck() {
 return (
  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-[#009061]">
   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
  </svg>
 );
}

export default function PlansV3Page() {
 const [currentPlan] = useState<PlanTier>("CEven Grow");

 return (
  <div className="flex flex-col gap-6">
   {/* Header */}
   <div className="text-center">
    <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2D1810]">
     Choose Your CEven Plan
    </h1>
    <p className="mt-2 text-sm text-[#2D1810]/50">
     Everything you need to manage your childcare centre, delight parents, and grow your business.
    </p>
    <div className="mt-4 inline-flex items-center gap-3 rounded-full bg-[#F5EDD8]/60 px-5 py-2 text-xs font-medium text-[#2D1810]/70">
     <span>14-day free trial</span>
     <span className="text-black/20">|</span>
     <span>No credit card required</span>
     <span className="text-black/20">|</span>
     <span>Cancel anytime</span>
    </div>
   </div>

   {/* Pricing cards */}
   <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
    {PLANS.map((plan) => {
     const isCurrent = plan.name === currentPlan;
     return (
      <div
       key={plan.name}
       className={`relative flex flex-col gap-5 rounded-2xl p-6 ${
        plan.highlighted
         ? "bg-[#D4522F]/[0.06]"
         : "border border-black/[0.07] bg-white"
       }`}
      >
       {plan.highlighted && (
        <span className="absolute -right-2 -top-2 rounded-bl-xl rounded-tr-2xl bg-[#D4522F] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
         Most Popular
        </span>
       )}

       <div className="flex items-start gap-4">
        <PlanIcon icon={plan.icon} highlighted={plan.highlighted} />
        <div className="flex-1">
         <p className={`font-[family-name:var(--font-merriweather)] text-xl font-bold ${
          plan.highlighted ? "text-[#D4522F]" : "text-[#4C1D95]"
         }`}>
          {plan.name}
         </p>
         <p className="mt-0.5 text-sm text-[#2D1810]/50">{plan.tagline}</p>
        </div>
       </div>

       <div className="flex items-baseline gap-1">
        <span className={`font-[family-name:var(--font-merriweather)] text-3xl font-bold ${
         plan.highlighted ? "text-[#D4522F]" : "text-[#4C1D95]"
        }`}>
         {formatNaira(plan.monthlyPrice)}
        </span>
        <span className="text-sm text-[#2D1810]/50">/month</span>
       </div>

       {/* Subtle divider using background instead of border */}
       <div className="h-px bg-[#2D1810]/[0.06]" />

       <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {plan.features.map((feature) => (
         <li key={feature} className="flex items-start gap-2 text-sm text-[#2D1810]">
          <Check className={`mt-0.5 h-4 w-4 shrink-0 ${
           plan.highlighted ? "text-[#D4522F]" : "text-[#4C1D95]"
          }`} />
          {feature}
         </li>
        ))}
       </ul>

       <button
        className={`mt-auto w-full rounded-lg py-3 text-sm font-bold transition-colors ${
         isCurrent
          ? "bg-[#D4522F]/10 text-[#D4522F] cursor-default"
          : plan.highlighted
          ? "bg-[#D4522F] text-white hover:bg-[#B94427]"
          : "bg-[#4C1D95] text-white hover:bg-[#3B1673]"
        }`}
        disabled={isCurrent}
       >
        {isCurrent ? "Current Plan" : "Start Your 14-Day Free Trial"}
       </button>

       <p className="text-center text-xs text-[#2D1810]/50">
        No credit card required. Cancel anytime.
       </p>
      </div>
     );
    })}
   </div>

   {/* Feature Comparison, flat, no borders */}
   <div className="rounded-2xl border border-black/[0.07] bg-white">
    <div className="px-6 py-4">
     <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2D1810]">
      Feature Comparison
     </h2>
    </div>
    <div className="overflow-x-auto">
     <table className="w-full border-collapse">
      <thead>
       <tr>
        <th className="px-6 py-3 text-left text-sm font-semibold text-[#2D1810]">Feature</th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-[#4C1D95]">CEven Grow</th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-[#D4522F]">CEven Thrive</th>
       </tr>
      </thead>
      <tbody>
       {COMPARISON_ROWS.map((row, i) => (
        <tr key={row.feature} className={i % 2 === 0 ? "bg-white/60" : "bg-transparent"}>
         <td className="px-6 py-3 text-sm text-[#2D1810]">{row.feature}</td>
         <td className="px-6 py-3">
          {row.grow === "✓" ? (
           <ComparisonCheck />
          ) : (
           <span className="text-sm text-[#2D1810]/50">{row.grow}</span>
          )}
         </td>
         <td className="px-6 py-3">
          {row.thrive === "✓" ? (
           <ComparisonCheck />
          ) : (
           <span className="text-sm text-[#2D1810]/50">{row.thrive}</span>
          )}
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
