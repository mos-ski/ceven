"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft, UserCog, CreditCard, FileText, Receipt, FileStack, Wallet, ExternalLink,
} from "lucide-react";

const ACCOUNT_ROWS = [
  { icon: UserCog, label: "Membership", href: "https://ceven.app/me/membership" },
  { icon: CreditCard, label: "School Fees", href: "https://ceven.app/me/school-fees" },
  { icon: FileText, label: "Acceptance Fee", href: "https://ceven.app/me/acceptance-fee" },
  { icon: Receipt, label: "Payment History", href: "https://ceven.app/me/payment-history" },
  { icon: FileStack, label: "Receipts", href: "https://ceven.app/me/receipts" },
  { icon: Wallet, label: "Payment Methods", href: "https://ceven.app/me/payment-methods" },
] as const;

export default function ManageAccountPage() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-base font-bold text-gray-800">Manage Account</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5">
        <p className="mb-4 text-xs text-gray-400 leading-relaxed">
          Membership, billing, and family account details are managed from your account portal.
        </p>

        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
          {ACCOUNT_ROWS.map(({ icon: Icon, label, href }, i) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-between px-4 py-3.5 ${
                i < ACCOUNT_ROWS.length - 1 ? "border-b border-gray-50" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} className="text-gray-500" />
                <span className="text-sm text-gray-500">{label}</span>
              </div>
              <ExternalLink size={16} className="text-gray-400" />
            </a>
          ))}
        </div>

        <p className="mt-4 px-1 text-xs text-gray-400 leading-relaxed">
          Contact your creche administrator for any billing questions or payment issues.
        </p>
      </div>
    </div>
  );
}
