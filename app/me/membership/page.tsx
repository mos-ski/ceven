"use client";

import { useState } from "react";
import { Crown, CheckCircle2, X } from "lucide-react";
import { PARENT_MEMBERSHIP } from "@/lib/parent/mock-data";
import { PLANS, type PlanId } from "@/lib/me/mock-data";
import { PaymentFlowModal } from "@/components/me/payment-flow-modal";

function CancelConfirmModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[380px] rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-800">Cancel Membership</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
            <X size={16} className="text-gray-600" />
          </button>
        </div>
        <p className="mb-5 text-sm text-gray-600">
          You&apos;ll lose access to Premium Family features at the end of your current billing period. This can&apos;t be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-600">
            Keep Membership
          </button>
          <button onClick={onConfirm} className="flex-1 rounded-xl bg-red-500 py-3 text-sm font-semibold text-white">
            Cancel It
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MembershipPage() {
  const [, setTick] = useState(0);
  const [payingPlan, setPayingPlan] = useState<PlanId | null>(null);
  const [showCancel, setShowCancel] = useState(false);

  const isActive = PARENT_MEMBERSHIP.status === "active";
  const currentPlan = PLANS.find((p) => p.id === (isActive ? "premium_family" : "free"))!;

  function handleUpgrade(planId: PlanId) {
    if (planId === "free" || isActive) return;
    setPayingPlan(planId);
  }

  function handlePaymentSuccess() {
    PARENT_MEMBERSHIP.status = "active";
    setTick((n) => n + 1);
  }

  function handleCancelConfirm() {
    PARENT_MEMBERSHIP.status = "trial_ended";
    setShowCancel(false);
    setTick((n) => n + 1);
  }

  const paidPlan = PLANS.find((p) => p.id === payingPlan);

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-1 text-2xl font-bold text-gray-800">Membership</h1>
      <p className="mb-6 text-sm text-gray-500">Manage your CEven plan and billing.</p>

      <div className="mb-8 rounded-2xl bg-gradient-to-br from-cg-brand to-[#8B5E3C] p-5 text-white shadow-md">
        <p className="text-xs text-white/70">Current Plan</p>
        <p className="text-lg font-bold">{currentPlan.name}</p>
        <p className="mt-1 text-xs text-white/70">
          {isActive ? `${currentPlan.price} ${currentPlan.period}` : "Trial ended — some family features are unavailable"}
        </p>
        {isActive && (
          <button
            onClick={() => setShowCancel(true)}
            className="mt-3 rounded-lg bg-white/15 px-3 py-1.5 text-xs font-semibold text-white"
          >
            Cancel Membership
          </button>
        )}
      </div>

      <p className="mb-3 text-sm font-semibold text-gray-600">Plans</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {PLANS.map((plan) => {
          const isCurrent = plan.id === currentPlan.id;
          return (
            <div
              key={plan.id}
              className={`rounded-2xl p-5 ${plan.highlight ? "bg-[#3B2513] text-white shadow-lg" : "border border-gray-100 bg-white"}`}
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {plan.highlight && <Crown size={16} className="text-amber-400" />}
                  <span className={`text-base font-bold ${plan.highlight ? "text-white" : "text-gray-800"}`}>{plan.name}</span>
                </div>
                {isCurrent && (
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${plan.highlight ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-700"}`}>
                    Current
                  </span>
                )}
              </div>

              <div className="mb-3 flex items-baseline gap-1">
                <span className={`text-2xl font-bold ${plan.highlight ? "text-amber-400" : "text-cg-brand"}`}>{plan.price}</span>
                <span className={`text-xs ${plan.highlight ? "text-white/60" : "text-gray-400"}`}>{plan.period}</span>
              </div>

              <ul className="mb-4 space-y-1.5">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2">
                    <CheckCircle2 size={13} className={plan.highlight ? "text-amber-400 shrink-0" : "text-green-500 shrink-0"} />
                    <span className={`text-xs ${plan.highlight ? "text-white/80" : "text-gray-600"}`}>{feat}</span>
                  </li>
                ))}
              </ul>

              {!isCurrent && plan.id !== "free" && (
                <button
                  onClick={() => handleUpgrade(plan.id)}
                  className="w-full rounded-xl bg-amber-400 py-2.5 text-sm font-semibold text-[#3B2513]"
                >
                  Upgrade
                </button>
              )}
            </div>
          );
        })}
      </div>

      {paidPlan && (
        <PaymentFlowModal
          title="Upgrade Membership"
          amount={`${paidPlan.price}/mo`}
          description={`${paidPlan.name} membership`}
          onClose={() => setPayingPlan(null)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {showCancel && (
        <CancelConfirmModal onClose={() => setShowCancel(false)} onConfirm={handleCancelConfirm} />
      )}
    </div>
  );
}
