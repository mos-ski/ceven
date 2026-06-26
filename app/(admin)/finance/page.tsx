"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { BillingPaymentsTab } from "@/components/admin/finance/billing-payments-tab";
import { ExpensesTab } from "@/components/admin/finance/expenses-tab";
import { FinancialReportsTab } from "@/components/admin/finance/financial-reports-tab";
import { PayrollTab } from "@/components/admin/finance/payroll-tab";
import WalletTab from "@/components/admin/finance/wallet-tab";

type ActiveTab = "Billing & Payments" | "Expenses" | "Financial Reports" | "Payroll";

const TAB_QUERY_MAP: Record<string, ActiveTab> = {
  "billing-payments": "Billing & Payments",
  expenses: "Expenses",
  "financial-reports": "Financial Reports",
  payroll: "Payroll",
};

function FinanceContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const activeTab: ActiveTab | null = tabParam ? TAB_QUERY_MAP[tabParam] ?? null : null;

  return (
    <div className="flex flex-col gap-6">
      {/* Wallet — only show when no tab is active (i.e. user clicked "Wallet" in sidebar) */}
      {!activeTab && <WalletTab />}

      {/* Other finance sections — only show when a tab is active */}
      {activeTab && (
        <div>
          {/* Page header with title */}
          <div className="mb-4">
            <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">
              {activeTab}
            </h1>
          </div>

          {activeTab === "Billing & Payments" && <BillingPaymentsTab />}
          {activeTab === "Expenses" && <ExpensesTab />}
          {activeTab === "Financial Reports" && <FinancialReportsTab />}
          {activeTab === "Payroll" && <PayrollTab />}
        </div>
      )}
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
