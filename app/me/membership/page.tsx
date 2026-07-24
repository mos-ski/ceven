"use client";

import { useState } from "react";
import { Zap, Layers, CheckCircle2, X } from "lucide-react";
import { PARENT_MEMBERSHIP } from "@/lib/parent/mock-data";
import { PLANS, BILLING_CYCLES, formatNaira, type BillingCycle } from "@/lib/me/mock-data";
import { MembershipCheckoutModal } from "@/components/me/membership-checkout-modal";

function CancelConfirmModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[380px] rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-[family-name:var(--font-merriweather-import)] text-base font-bold text-gray-800">Cancel Membership</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
            <X size={16} className="text-gray-600" />
          </button>
        </div>
        <p className="mb-5 text-sm text-gray-600">
          You&apos;ll lose access to Premium features at the end of your current billing period. This can&apos;t be undone.
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

const freePlan = PLANS.find((p) => p.id === "free")!;
const premiumPlan = PLANS.find((p) => p.id === "premium_family")!;

export default function MembershipPage() {
  const [, setTick] = useState(0);
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const [checkingOut, setCheckingOut] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  const isActive = PARENT_MEMBERSHIP.status === "active";
  const price = premiumPlan.pricing![cycle];

  function handlePurchase() {
    if (isActive) return;
    setCheckingOut(true);
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

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex flex-col items-center gap-1 text-center">
        <h1 className="flex items-center gap-2 font-[family-name:var(--font-merriweather-import)] text-2xl font-bold text-gray-800">
          <Zap size={20} className="text-cg-brand" />
          Choose Your Plan
        </h1>
        <p className="text-sm text-gray-500">Unlock CEven AI and Special Requests with Premium.</p>
      </div>

      {isActive && (
        <div className="mb-6 flex items-center justify-between rounded-2xl bg-gradient-to-br from-cg-brand to-[#8B5E3C] p-5 text-white shadow-md">
          <div>
            <p className="text-xs text-white/70">Current Plan</p>
            <p className="font-[family-name:var(--font-merriweather-import)] text-lg font-bold">Premium — Active</p>
          </div>
          <button
            onClick={() => setShowCancel(true)}
            className="rounded-lg bg-white/15 px-3 py-1.5 text-xs font-semibold text-white"
          >
            Cancel Membership
          </button>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {/* Free plan card */}
        <div className="overflow-hidden rounded-2xl border border-[#eaecf0] bg-white shadow-[0px_4px_6px_-2px_rgba(16,24,40,0.03),0px_12px_16px_-4px_rgba(16,24,40,0.08)]">
          <div className="flex items-center gap-2 bg-[#5b391e] px-4 py-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full border-[3px] border-[#e0bfa0] bg-[#edd9c0]">
              <Zap size={12} className="text-cg-brand" />
            </div>
            <p className="text-sm font-medium text-white">Free Plan</p>
          </div>
          <div className="p-4">
            <ul className="flex flex-col gap-2">
              {freePlan.features.map((feat) => (
                <li key={feat} className="flex items-center gap-2 text-sm text-gray-500">
                  <CheckCircle2 size={16} className="shrink-0 text-green-500" />
                  {feat}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Premium plan card */}
        <div className="overflow-hidden rounded-2xl border border-[#eaecf0] bg-white shadow-[0px_4px_6px_-2px_rgba(16,24,40,0.03),0px_12px_16px_-4px_rgba(16,24,40,0.08)]">
          <div className="flex items-center gap-2 bg-[#faf2e1] px-4 py-3">
            <div className="flex h-5 w-5 items-center justify-center rounded-full border-[3px] border-[#e0bfa0] bg-[#edd9c0]">
              <Layers size={10} className="text-cg-brand" />
            </div>
            <p className="text-sm font-medium text-cg-brand">Premium</p>
          </div>

          <div className="flex flex-col items-center gap-4 px-4 pt-4">
            <div className="flex w-full max-w-[297px] rounded-lg bg-[#f4f5f6] p-[3px]">
              {BILLING_CYCLES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCycle(c.id)}
                  className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
                    cycle === c.id ? "bg-[#5b391e] text-white" : "text-gray-800"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <p className="font-[family-name:var(--font-merriweather-import)] text-2xl font-bold text-gray-800">
              {formatNaira(price).replace(/\.00$/, "")}
            </p>
          </div>

          <div className="p-4">
            <ul className="flex flex-col gap-2">
              {premiumPlan.features.map((feat) => (
                <li key={feat} className="flex items-center gap-2 text-sm text-gray-500">
                  <CheckCircle2 size={16} className="shrink-0 text-green-500" />
                  {feat}
                </li>
              ))}
            </ul>
          </div>

          <div className="px-6 pb-4">
            {isActive ? (
              <div className="rounded-lg bg-emerald-50 py-3 text-center text-sm font-semibold text-emerald-700">
                Current Plan
              </div>
            ) : (
              <button
                onClick={handlePurchase}
                className="w-full rounded-lg bg-[#3b2513] py-3 text-base font-medium text-white shadow-sm"
              >
                Purchase Plan
              </button>
            )}
          </div>
        </div>
      </div>

      {checkingOut && (
        <MembershipCheckoutModal
          plan={premiumPlan}
          cycle={cycle}
          onClose={() => setCheckingOut(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {showCancel && (
        <CancelConfirmModal onClose={() => setShowCancel(false)} onConfirm={handleCancelConfirm} />
      )}
    </div>
  );
}
