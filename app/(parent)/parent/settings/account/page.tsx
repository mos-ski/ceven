"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft, UserCog, CreditCard, FileText, Receipt, FileStack, Wallet,
  ExternalLink, HelpCircle, ChevronRight,
} from "lucide-react";

const QUICK_LINKS = [
  { label: "Membership", icon: UserCog, href: "https://ceven.app/me/membership" },
  { label: "Creche Fees", icon: CreditCard, href: "https://ceven.app/me/creche-fees" },
  { label: "Acceptance Fee", icon: FileText, href: "https://ceven.app/me/acceptance-fee" },
  { label: "Payment History", icon: Receipt, href: "https://ceven.app/me/payment-history" },
  { label: "Receipts", icon: FileStack, href: "https://ceven.app/me/receipts" },
  { label: "Payment Methods", icon: Wallet, href: "https://ceven.app/me/payment-methods" },
] as const;

export default function ManageAccountPage() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-[#F9F5F0]">
      {/* Header */}
      <div className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-base font-bold text-gray-800">Manage Account</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
        {/* Colorful banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cg-brand to-emerald-600 p-5 text-white shadow-lg">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
          <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-white/10" />
          <p className="text-sm font-bold">Manage your account online</p>
          <p className="mt-1 text-xs text-white/80 leading-relaxed">
            Update payment details, view invoices, and download receipts at ceven.app/me
          </p>
          <a
            href="https://ceven.app/me"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-xs font-bold text-cg-brand shadow-sm active:bg-white/90"
          >
            Go to ceven.app/me
            <ExternalLink size={13} />
          </a>
        </div>

        {/* Quick links */}
        <div>
          <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Billing</p>
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
            {QUICK_LINKS.map(({ icon: Icon, label, href }, i) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between px-4 py-3.5 ${
                  i < QUICK_LINKS.length - 1 ? "border-b border-gray-50" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className="text-gray-500" />
                  <span className="text-sm text-gray-700">{label}</span>
                </div>
                <ExternalLink size={16} className="text-gray-400" />
              </a>
            ))}
          </div>
        </div>

        {/* Help */}
        <div className="rounded-2xl bg-amber-50 border border-amber-100 p-4 flex items-start gap-3">
          <HelpCircle size={18} className="text-amber-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-bold text-amber-800">Need help?</p>
            <p className="text-xs text-amber-600 leading-relaxed mt-0.5">
              Contact your creche administrator for any billing questions or payment issues.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
