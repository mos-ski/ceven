"use client";

import Link from "next/link";
import { CheckCircle2, Clock } from "lucide-react";
import { PARENT_MEMBERSHIP, mockFees } from "@/lib/parent/mock-data";
import { MOCK_ACCEPTANCE_FEES } from "@/lib/me/mock-data";
import { NAV_ITEMS } from "@/components/me/sidebar";

export default function MeOverviewPage() {
  const isActive = PARENT_MEMBERSHIP.status === "active";
  const outstandingFees = mockFees.filter((f) => f.status !== "paid").length;
  const outstandingAcceptance = MOCK_ACCEPTANCE_FEES.filter((f) => f.status === "pending").length;
  const totalOutstanding = outstandingFees + outstandingAcceptance;

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Account Overview</h1>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-2 flex items-center gap-2">
            {isActive ? (
              <CheckCircle2 size={18} className="text-emerald-500" />
            ) : (
              <Clock size={18} className="text-amber-500" />
            )}
            <p className="text-sm font-semibold text-gray-800">Membership Status</p>
          </div>
          <p className="text-lg font-bold text-gray-800">{isActive ? "Premium Family — Active" : "Trial ended"}</p>
          <Link href="/me/membership" className="mt-2 inline-block text-xs font-semibold text-cg-brand underline underline-offset-2">
            Manage membership
          </Link>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="mb-2 text-sm font-semibold text-gray-800">Outstanding Payments</p>
          <p className="text-lg font-bold text-gray-800">{totalOutstanding} item{totalOutstanding === 1 ? "" : "s"}</p>
          <Link href="/me/creche-fees" className="mt-2 inline-block text-xs font-semibold text-cg-brand underline underline-offset-2">
            View fees
          </Link>
        </div>
      </div>

      <p className="mb-3 text-sm font-semibold text-gray-600">Quick Links</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {NAV_ITEMS.filter((item) => item.href !== "/me").map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-2 rounded-2xl bg-white py-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <Icon size={22} className="text-cg-brand" />
            <span className="text-xs font-medium text-gray-700">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
