"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, CreditCard, Receipt, FileText, Shield, ExternalLink, HelpCircle } from "lucide-react";

const QUICK_LINKS = [
  { label: "School Fees", desc: "View and pay outstanding invoices", icon: CreditCard, color: "from-blue-500 to-blue-600" },
  { label: "Acceptance Fee", desc: "Acceptance and enrollment charges", icon: FileText, color: "from-emerald-500 to-emerald-600" },
  { label: "Payment History", desc: "Download receipts and statements", icon: Receipt, color: "from-purple-500 to-purple-600" },
  { label: "Security & PIN", desc: "Update your login PIN or password", icon: Shield, color: "from-amber-500 to-amber-600" },
];

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
        <div className="space-y-3">
          {QUICK_LINKS.map((item) => (
            <button
              key={item.label}
              className="flex w-full items-center gap-3 rounded-2xl bg-white p-4 shadow-sm active:bg-gray-50 text-left transition-colors"
            >
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-white shadow-sm`}>
                <item.icon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-800">{item.label}</p>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
              <ExternalLink size={16} className="text-gray-300 shrink-0" />
            </button>
          ))}
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
