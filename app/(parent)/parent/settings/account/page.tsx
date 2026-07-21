"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft, ExternalLink, CreditCard, Receipt, History, ShieldCheck, ChevronRight,
} from "lucide-react";

const MEMBERSHIP_LINK = "https://ceven.app/me";

export default function ManageAccountPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#F9F5F0]">
      <div className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-base font-bold text-gray-800">Manage Account</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {/* Hero banner */}
        <a
          href={MEMBERSHIP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-2xl bg-gradient-to-br from-[#7A4C29] via-[#8B5E3C] to-[#A67548] p-5 shadow-md active:scale-[0.98] transition-transform"
        >
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
          <p className="mt-3 text-center text-xs font-semibold text-white/80">Tap to manage on ceven.app →</p>
        </a>

        {/* Quick links */}
        <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
          <a
            href={`${MEMBERSHIP_LINK}/plans`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 active:bg-gray-50"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50">
              <CreditCard size={16} className="text-blue-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700">Change Plan</p>
              <p className="text-[11px] text-gray-400">Upgrade or downgrade your subscription</p>
            </div>
            <ExternalLink size={14} className="text-gray-300" />
          </a>

          <a
            href={`${MEMBERSHIP_LINK}/transactions`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 active:bg-gray-50"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50">
              <Receipt size={16} className="text-emerald-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700">Transaction History</p>
              <p className="text-[11px] text-gray-400">View all past payments & receipts</p>
            </div>
            <ExternalLink size={14} className="text-gray-300" />
          </a>

          <a
            href={`${MEMBERSHIP_LINK}/payment`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 active:bg-gray-50"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-50">
              <History size={16} className="text-purple-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700">Payment Methods</p>
              <p className="text-[11px] text-gray-400">Update card, bank, or USSD details</p>
            </div>
            <ExternalLink size={14} className="text-gray-300" />
          </a>

          <a
            href={`${MEMBERSHIP_LINK}/cancel`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3.5 active:bg-gray-50"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50">
              <ShieldCheck size={16} className="text-red-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700">Cancel Membership</p>
              <p className="text-[11px] text-gray-400">Manage or cancel your subscription</p>
            </div>
            <ExternalLink size={14} className="text-gray-300" />
          </a>
        </div>

        {/* School fees info */}
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="mb-2 text-sm font-semibold text-gray-800">School Fees</p>
          <p className="text-xs text-gray-500 leading-relaxed">
            School fees, acceptance fees, and other charges are managed through your membership portal. 
            You can view invoices, make payments, and download receipts from the links above.
          </p>
        </div>
      </div>
    </div>
  );
}
