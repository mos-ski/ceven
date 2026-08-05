"use client";

import { useState } from "react";
import { Check, Lock, Sparkles, Gem, ArrowUpRight } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────
// Same names/prices/features as the topbar plan badge and PlansAccessTab
// (components/admin/account-setup/plans-access-tab.tsx) — figures are not invented.

type PlanTier = "Seedling" | "Nestling Pro" | "Flourish";

type Plan = {
  name: PlanTier;
  monthlyPrice: number;
  features: string[];
};

const PLANS: Plan[] = [
  {
    name: "Seedling",
    monthlyPrice: 18500,
    features: ["Up to 10 children", "2 staff accounts", "Basic reporting", "Email support"],
  },
  {
    name: "Nestling Pro",
    monthlyPrice: 45000,
    features: [
      "Up to 35 children",
      "10 staff accounts",
      "AI reports & insights",
      "Priority support",
      "Custom branding",
    ],
  },
  {
    name: "Flourish",
    monthlyPrice: 85000,
    features: [
      "Unlimited children",
      "Unlimited staff",
      "Advanced AI suite",
      "Dedicated support",
      "Multi-branch support",
      "Custom integrations",
    ],
  },
];

// Flourish-only capabilities, derived from the plan feature comparison in
// PlansAccessTab — shown as "locked" for whichever tier is currently active.
const FLOURISH_ONLY_FEATURES = [
  "Multi-branch support",
  "API access",
  "Unlimited children & staff",
  "Dedicated support",
  "Custom integrations",
];

const PARENT_ADDON = {
  name: "Parent Portal Premium",
  price: "₦2,500/month",
  description: "Unlock the premium parent app experience: milestone timelines, unlimited photo storage, and priority chat with staff.",
};

function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export default function PlansV3Page() {
  const [currentPlan, setCurrentPlan] = useState<PlanTier>("Nestling Pro");
  const [addonEnabled, setAddonEnabled] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);

  const lockedFeatures =
    currentPlan === "Flourish"
      ? []
      : FLOURISH_ONLY_FEATURES.filter((f) => !PLANS.find((p) => p.name === currentPlan)!.features.some((pf) => pf.toLowerCase().includes(f.toLowerCase().split(" ")[0])));

  function handlePlanAction(plan: Plan) {
    setCurrentPlan(plan.name);
    setNotice(`Switched to ${plan.name}. Billing will update on your next renewal date.`);
    window.setTimeout(() => setNotice(null), 4000);
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div>
        <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2D1810]">
          Plans &amp; Access
        </h1>
        <p className="mt-1 text-sm text-[#2D1810]/50">
          Manage your crèche subscription, add-ons, and access settings.
        </p>
      </div>

      {notice && (
        <div className="rounded-xl border border-[#8B9E7A]/40 bg-[#8B9E7A]/10 px-4 py-2.5 text-sm font-semibold text-[#2D1810]">
          {notice}
        </div>
      )}

      {/* Current plan banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2D1810] via-[#3D2418] to-[#3D2418] px-6 py-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
              <Gem className="h-5 w-5 text-[#C47B2C]" />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#D4913F]">Current Plan</p>
              <p className="font-[family-name:var(--font-merriweather)] text-xl font-bold text-[#F5EDD8]">
                {currentPlan}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#F5EDD8]">
              {formatNaira(PLANS.find((p) => p.name === currentPlan)!.monthlyPrice)}
              <span className="ml-1 text-sm font-normal text-[#F5EDD8]/55">/month</span>
            </p>
            <p className="text-xs text-[#F5EDD8]/55">Next renewal · Sep 5, 2026</p>
          </div>
        </div>
      </div>

      {/* Pricing cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {PLANS.map((plan) => {
          const isCurrent = plan.name === currentPlan;
          const isUpgrade = PLANS.findIndex((p) => p.name === plan.name) > PLANS.findIndex((p) => p.name === currentPlan);
          return (
            <div
              key={plan.name}
              className={`flex flex-col gap-4 rounded-2xl border bg-white p-5 ${
                isCurrent ? "border-[#C47B2C]" : "border-black/[0.07]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <p className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2D1810]">
                    {plan.name}
                  </p>
                  {isCurrent && (
                    <span className="rounded-full bg-[#C47B2C]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#C47B2C]">
                      Current
                    </span>
                  )}
                </div>
                <p className="mt-1 flex items-baseline gap-1">
                  <span className="font-[family-name:var(--font-merriweather)] text-3xl font-bold text-[#2D1810]">
                    {formatNaira(plan.monthlyPrice)}
                  </span>
                  <span className="text-sm text-[#2D1810]/50">/month</span>
                </p>
              </div>

              <ul className="flex flex-col gap-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-[#2D1810]">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8B9E7A]" />
                    {feature}
                  </li>
                ))}
              </ul>

              {isCurrent ? (
                <button
                  disabled
                  className="mt-auto w-full cursor-default rounded-lg border border-[#C47B2C]/40 bg-[#C47B2C]/10 py-2.5 text-sm font-bold text-[#C47B2C]"
                >
                  Current Plan
                </button>
              ) : (
                <button
                  onClick={() => handlePlanAction(plan)}
                  className="mt-auto w-full rounded-lg bg-[#2D1810] py-2.5 text-sm font-bold text-[#F5EDD8] transition-colors hover:bg-[#3D2418]"
                >
                  {isUpgrade ? `Upgrade to ${plan.name}` : `Downgrade to ${plan.name}`}
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Parent premium add-on */}
        <div className="rounded-2xl border border-black/[0.07] bg-white p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1E2D4A]/10">
                <Sparkles className="h-4.5 w-4.5 text-[#1E2D4A]" />
              </div>
              <div>
                <p className="font-[family-name:var(--font-merriweather)] font-bold text-[#2D1810]">
                  {PARENT_ADDON.name}
                </p>
                <p className="mt-1 text-xs leading-5 text-[#2D1810]/50">{PARENT_ADDON.description}</p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-black/[0.06] pt-4">
            <p className="font-mono text-sm font-bold text-[#2D1810]">{PARENT_ADDON.price}</p>
            <button
              onClick={() => setAddonEnabled((v) => !v)}
              className={`rounded-lg px-4 py-2 text-xs font-bold ${
                addonEnabled
                  ? "border border-[#D4522F] text-[#D4522F] hover:bg-[#D4522F]/5"
                  : "bg-[#2D1810] text-[#F5EDD8] hover:bg-[#3D2418]"
              }`}
            >
              {addonEnabled ? "Remove from Plan" : "Add to Plan"}
            </button>
          </div>
        </div>

        {/* Locked features */}
        <div className="rounded-2xl border border-black/[0.07] bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-[family-name:var(--font-merriweather)] font-bold text-[#2D1810]">
              Locked on {currentPlan}
            </p>
            <ArrowUpRight className="h-4 w-4 text-[#2D1810]/30" />
          </div>
          {lockedFeatures.length === 0 ? (
            <p className="text-sm text-[#2D1810]/50">You have every feature unlocked on Flourish.</p>
          ) : (
            <ul className="flex flex-col gap-2.5">
              {lockedFeatures.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center justify-between gap-3 rounded-lg border border-black/[0.06] bg-[#F5EDD8]/40 px-3 py-2.5"
                >
                  <span className="flex items-center gap-2 text-sm text-[#2D1810]/70">
                    <Lock className="h-3.5 w-3.5 shrink-0 text-[#2D1810]/35" />
                    {feature}
                  </span>
                  <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide text-[#C47B2C]">
                    Flourish
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
