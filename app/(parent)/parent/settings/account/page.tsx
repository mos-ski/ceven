"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, CreditCard, Receipt, History, ShieldCheck, X, ExternalLink,
} from "lucide-react";

function RedirectToWebModal({ onClose, title }: { onClose: () => void; title: string }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 px-8">
      <div className="w-full max-w-[300px] rounded-2xl bg-white px-6 py-6 text-center shadow-xl">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-cg-brand/10">
          <ExternalLink size={20} className="text-cg-brand" />
        </div>
        <p className="text-sm font-bold text-gray-800">{title}</p>
        <p className="mt-2 text-xs text-gray-500 leading-relaxed">
          Please visit <strong className="text-gray-700">ceven.app/me</strong> in your browser to complete this action.
        </p>
        <button
          onClick={onClose}
          className="mt-5 w-full rounded-xl bg-cg-brand py-2.5 text-sm font-semibold text-[#FAF2E1]"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

const ACTIONS = [
  { icon: CreditCard,   label: "Change Plan",           desc: "Upgrade or downgrade your subscription", modal: "Change your membership plan" },
  { icon: Receipt,      label: "Transaction History",   desc: "View all past payments & receipts",      modal: "View transaction history" },
  { icon: History,      label: "Payment Methods",       desc: "Update card, bank, or USSD details",     modal: "Manage payment methods" },
  { icon: ShieldCheck,  label: "Cancel Membership",     desc: "Manage or cancel your subscription",      modal: "Cancel your membership" },
];

export default function ManageAccountPage() {
  const router = useRouter();
  const [modalTitle, setModalTitle] = useState<string | null>(null);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-[#F9F5F0]">
      <div className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-base font-bold text-gray-800">Manage Account</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {/* Hero banner */}
        <div className="rounded-2xl bg-gradient-to-br from-[#7A4C29] via-[#8B5E3C] to-[#A67548] p-5 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-lg font-bold text-white">CEven Membership</p>
              <p className="text-xs text-white/60">Manage your plan, payments & billing</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <ExternalLink size={18} className="text-white" />
            </div>
          </div>
          <div className="rounded-xl bg-white/10 p-3">
            <p className="text-[11px] font-medium text-white/80">Current Plan</p>
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-white">Premium Family</p>
              <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold text-white">Active</span>
            </div>
            <p className="mt-1 text-[11px] text-white/60">Renews Jan 31, 2026 · ₦45,000/term</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
          {ACTIONS.map(({ icon: Icon, label, desc, modal }, i) => (
            <button
              key={label}
              onClick={() => setModalTitle(modal)}
              className={`flex w-full items-center gap-3 px-4 py-3.5 text-left active:bg-gray-50 ${
                i < ACTIONS.length - 1 ? "border-b border-gray-50" : ""
              }`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-50">
                <Icon size={16} className="text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">{label}</p>
                <p className="text-[11px] text-gray-400">{desc}</p>
              </div>
              <ExternalLink size={14} className="text-gray-300" />
            </button>
          ))}
        </div>

        {/* Info */}
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="mb-2 text-sm font-semibold text-gray-800">School Fees</p>
          <p className="text-xs text-gray-500 leading-relaxed">
            School fees, acceptance fees, and other charges are managed through your membership portal.
            Tap any option above to manage on <strong className="text-gray-700">ceven.app/me</strong>.
          </p>
        </div>
      </div>

      {modalTitle && (
        <RedirectToWebModal onClose={() => setModalTitle(null)} title={modalTitle} />
      )}
    </div>
  );
}
