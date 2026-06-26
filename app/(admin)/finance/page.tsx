"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { BillingPaymentsTab } from "@/components/admin/finance/billing-payments-tab";
import { ExpensesTab } from "@/components/admin/finance/expenses-tab";
import { FinancialReportsTab } from "@/components/admin/finance/financial-reports-tab";
import WalletTab from "@/components/admin/finance/wallet-tab";

type ActiveTab = "Wallet" | "Billing & Payments" | "Expenses" | "Financial Reports";

const TAB_QUERY_MAP: Record<string, ActiveTab> = {
  wallet: "Wallet",
  "billing-payments": "Billing & Payments",
  expenses: "Expenses",
  "financial-reports": "Financial Reports",
};

const TABS: ActiveTab[] = ["Wallet", "Billing & Payments", "Expenses", "Financial Reports"];

function FinanceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const activeTab: ActiveTab = (tabParam && TAB_QUERY_MAP[tabParam]) || "Wallet";

  function setActiveTab(tab: ActiveTab) {
    const query = Object.entries(TAB_QUERY_MAP).find(([, value]) => value === tab)?.[0];
    router.push(query ? `/finance?tab=${query}` : "/finance");
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">
          Finance
        </h1>

        {/* Tab pill group */}
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

      {/* Tab content */}
      {activeTab === "Wallet" && <WalletTab />}
      {activeTab === "Billing & Payments" && <BillingPaymentsTab />}
      {activeTab === "Expenses" && <ExpensesTab />}
      {activeTab === "Financial Reports" && <FinancialReportsTab />}
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
