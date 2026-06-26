"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { BillingPaymentsTab } from "@/components/admin/finance/billing-payments-tab";
import { ExpensesTab } from "@/components/admin/finance/expenses-tab";
import { FinancialReportsTab } from "@/components/admin/finance/financial-reports-tab";
import WalletTab from "@/components/admin/finance/wallet-tab";

type ActiveTab = "Billing & Payments" | "Expenses" | "Financial Reports";

const TAB_QUERY_MAP: Record<string, ActiveTab> = {
  "billing-payments": "Billing & Payments",
  expenses: "Expenses",
  "financial-reports": "Financial Reports",
};

const TABS: ActiveTab[] = ["Billing & Payments", "Expenses", "Financial Reports"];

function FinanceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const activeTab: ActiveTab | null = tabParam ? TAB_QUERY_MAP[tabParam] ?? null : null;

  function setActiveTab(tab: ActiveTab) {
    const query = Object.entries(TAB_QUERY_MAP).find(([, value]) => value === tab)?.[0];
    router.push(query ? `/finance?tab=${query}` : "/finance");
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Wallet — full width, always visible */}
      <WalletTab />

      {/* Sub-tabs for other finance sections */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
            Financial Tools
          </h2>
          <div className="flex items-stretch gap-1 rounded-xl border border-[#e6ebf3] bg-white p-1">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 whitespace-nowrap rounded-lg px-4 py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-[#3b2513] text-[#faf2e1]"
                    : "border border-[#e6ebf3] bg-white text-[#6b7280] hover:text-[#2d1810]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "Billing & Payments" && <BillingPaymentsTab />}
        {activeTab === "Expenses" && <ExpensesTab />}
        {activeTab === "Financial Reports" && <FinancialReportsTab />}

        {!activeTab && (
          <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
            Select a tool above to manage billing, expenses, or reports.
          </p>
        )}
      </div>
    </div>
  );
}

export default function FinancePage() {
  return (
    <Suspense>
      <FinanceContent />
    </Suspense>
  );
}
