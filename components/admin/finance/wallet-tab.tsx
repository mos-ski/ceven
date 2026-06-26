"use client";

import { ChevronDown, Download, Search, Wallet, ArrowDownLeft, ArrowUpRight, Building2, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";

import {
  WALLET_BALANCE,
  WALLET_STATS,
  WALLET_TRANSACTIONS,
  MOCK_BANK_ACCOUNT,
  PENDING_WITHDRAWALS,
  formatNaira,
  getTransactionStatusColor,
  getWithdrawalStatusColor,
  type WalletTransactionCategory,
  type WalletTransactionType,
} from "@/lib/mock-data/wallet";
import WalletOnboardingWizard from "./wallet-onboarding-wizard";
import WithdrawalRequestModal from "./withdrawal-request-modal";
import BankAccountUpdateModal from "./bank-account-update-modal";
import DepositInfoModal from "./deposit-info-modal";

const CATEGORY_FILTERS: WalletTransactionCategory[] = [
  "Tuition",
  "Admission Fee",
  "Payroll",
  "Rent",
  "Supplies",
  "Utilities",
  "Refund",
  "Other",
];

const TYPE_BADGE: Record<WalletTransactionType, { bg: string; text: string; border: string }> = {
  Credit: { bg: "#ecfff8", text: "#009061", border: "#009061" },
  Debit: { bg: "#fff5f5", text: "#cd3030", border: "#cd3030" },
};

function FilterButton({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-1.5 rounded-lg border border-[#e6ebf3] bg-white px-3 py-2 font-[family-name:var(--font-urbanist)] text-sm text-[#6b7280] hover:border-[#3b2513] hover:text-[#3b2513]">
      {label}
      <ChevronDown className="h-4 w-4" />
    </button>
  );
}

export default function WalletTab() {
  const [onboardingState, setOnboardingState] = useState<"empty" | "wizard" | "complete">("empty");
  const [withdrawalOpen, setWithdrawalOpen] = useState(false);
  const [depositOpen, setDepositOpen] = useState(false);
  const [bankUpdateOpen, setBankUpdateOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState<"All" | WalletTransactionType>("All");
  const [categoryFilter, setCategoryFilter] = useState<"All" | WalletTransactionCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTransactions = WALLET_TRANSACTIONS.filter((txn) => {
    if (typeFilter !== "All" && txn.type !== typeFilter) return false;
    if (categoryFilter !== "All" && txn.category !== categoryFilter) return false;
    if (searchQuery && !txn.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  if (onboardingState === "wizard") {
    return <WalletOnboardingWizard open onComplete={() => setOnboardingState("complete")} onClose={() => setOnboardingState("empty")} />;
  }

  if (onboardingState === "empty") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#e6ebf3] bg-white py-16 px-6">
        <div className="flex size-16 items-center justify-center rounded-full bg-[#f5edd8]">
          <Wallet className="size-8 text-[#3b2513]" />
        </div>
        <h2 className="mt-4 font-[family-name:var(--font-merriweather)] text-xl font-bold text-[#2d1810]">
          Set Up Your Wallet
        </h2>
        <p className="mt-2 max-w-sm text-center font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
          Your wallet lets you track all money flowing in and out of your crèche. Deposits are automatic when parents pay invoices via Paystack.
        </p>
        <button
          onClick={() => setOnboardingState("wizard")}
          className="mt-6 flex items-center gap-2 rounded-lg border border-[#d4a67f] bg-[#3b2513] px-6 py-3 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1] hover:bg-[#2d1810]"
        >
          <Plus className="size-4" />
          Get Started
        </button>
        <p className="mt-3 font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">
          Takes about 2 minutes to complete
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Balance Card */}
      <div className="rounded-2xl bg-gradient-to-br from-[#3b2513] to-[#5b391e] p-6 text-white">
        <div className="flex items-center gap-2">
          <Wallet className="size-5 text-[#e0bfa0]" />
          <span className="font-[family-name:var(--font-nunito)] text-sm text-[#e0bfa0]">Wallet Balance</span>
        </div>
        <p className="mt-2 font-[family-name:var(--font-merriweather)] text-3xl font-bold sm:text-4xl">
          {formatNaira(WALLET_BALANCE.available)}
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <div>
            <span className="font-[family-name:var(--font-nunito)] text-xs text-[#e0bfa0]">Pending In</span>
            <p className="font-[family-name:var(--font-urbanist)] text-sm font-medium">
              {formatNaira(WALLET_BALANCE.pendingIn)}
            </p>
          </div>
          <div>
            <span className="font-[family-name:var(--font-nunito)] text-xs text-[#e0bfa0]">Pending Out</span>
            <p className="font-[family-name:var(--font-urbanist)] text-sm font-medium">
              {formatNaira(WALLET_BALANCE.pendingOut)}
            </p>
          </div>
        </div>
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => setWithdrawalOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-[#e0bfa0] bg-[#e0bfa0] px-4 py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#3b2513] hover:bg-[#f5edd8]"
          >
            <ArrowUpRight className="size-4" />
            Withdraw
          </button>
          <button
            onClick={() => setDepositOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-4 py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-white hover:bg-white/20"
          >
            <ArrowDownLeft className="size-4" />
            Deposit
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {WALLET_STATS.map((s) => (
          <div key={s.label} className="rounded-xl border border-[#e6ebf3] bg-white p-4">
            <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{s.label}</p>
            <p className="mt-2 font-[family-name:var(--font-merriweather)] text-xl font-bold text-[#2d1810]">
              {s.value}
            </p>
            <p
              className={`mt-1 font-[family-name:var(--font-urbanist)] text-xs ${
                s.trend === "up" ? "text-[#009061]" : "text-[#6b7280]"
              }`}
            >
              {s.helper}
            </p>
          </div>
        ))}
      </div>

      {/* Pending Withdrawals */}
      {PENDING_WITHDRAWALS.filter((w) => w.status === "Pending Approval").length > 0 && (
        <div className="rounded-xl border border-[#cc8000] bg-[#fff6e6] p-4">
          <h3 className="font-[family-name:var(--font-merriweather)] text-sm font-bold text-[#2d1810]">
            Pending Approvals
          </h3>
          <div className="mt-3 flex flex-col gap-2">
            {PENDING_WITHDRAWALS.filter((w) => w.status === "Pending Approval").map((w) => (
              <div key={w.id} className="flex items-center justify-between rounded-lg bg-white p-3">
                <div>
                  <p className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]">
                    {formatNaira(w.amount)} → {w.destinationBank} {w.destinationAccount}
                  </p>
                  <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
                    Requested by {w.requestedBy} • {w.requestedAt}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-lg bg-[#009061] px-3 py-1.5 font-[family-name:var(--font-urbanist)] text-xs font-semibold text-white hover:bg-[#007a52]">
                    Approve
                  </button>
                  <button className="rounded-lg border border-[#cd3030] bg-white px-3 py-1.5 font-[family-name:var(--font-urbanist)] text-xs font-semibold text-[#cd3030] hover:bg-[#fff5f5]">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Transaction History */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="flex flex-wrap items-center gap-2 px-4 py-4">
          <h3 className="font-[family-name:var(--font-merriweather)] font-bold text-[#2d1810]">
            Transaction History
          </h3>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as "All" | WalletTransactionType)}
              className="rounded-lg border border-[#e6ebf3] bg-white px-3 py-2 font-[family-name:var(--font-urbanist)] text-sm text-[#6b7280] focus:border-[#3b2513] focus:outline-none"
            >
              <option value="All">All Types</option>
              <option value="Credit">Credit</option>
              <option value="Debit">Debit</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as "All" | WalletTransactionCategory)}
              className="rounded-lg border border-[#e6ebf3] bg-white px-3 py-2 font-[family-name:var(--font-urbanist)] text-sm text-[#6b7280] focus:border-[#3b2513] focus:outline-none"
            >
              <option value="All">All Categories</option>
              {CATEGORY_FILTERS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-2 rounded-lg border border-[#e6ebf3] bg-[#f5edd8] px-3 py-2">
              <Search className="h-4 w-4 text-[#9ca3af]" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] placeholder:text-[#9ca3af] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#edd9c0]">
                {["Date & Time", "Type", "Category", "Description", "Amount", "Status", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredTransactions.map((txn) => (
                <tr key={txn.id} className="border-t border-[#eaecf0]">
                  <td className="px-4 py-3">
                    <p className="font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{txn.date}</p>
                    <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{txn.time}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-[family-name:var(--font-urbanist)] text-xs"
                      style={{
                        backgroundColor: TYPE_BADGE[txn.type].bg,
                        color: TYPE_BADGE[txn.type].text,
                        borderColor: TYPE_BADGE[txn.type].border,
                      }}
                    >
                      {txn.type === "Credit" ? (
                        <ArrowDownLeft className="size-3" />
                      ) : (
                        <ArrowUpRight className="size-3" />
                      )}
                      {txn.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                    {txn.category}
                  </td>
                  <td className="max-w-[240px] truncate px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                    {txn.description}
                  </td>
                  <td
                    className="px-4 py-3 font-[family-name:var(--font-merriweather)] text-sm font-bold"
                    style={{ color: txn.type === "Credit" ? "#009061" : "#cd3030" }}
                  >
                    {txn.type === "Credit" ? "+" : "-"}
                    {formatNaira(txn.amount)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-[family-name:var(--font-urbanist)] text-xs"
                      style={{
                        backgroundColor: `${getTransactionStatusColor(txn.status)}10`,
                        color: getTransactionStatusColor(txn.status),
                        borderColor: getTransactionStatusColor(txn.status),
                      }}
                    >
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="font-[family-name:var(--font-nunito)] text-sm text-[#c47b2c] hover:underline">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile card list */}
        <div className="flex flex-col gap-2 px-4 pb-4 lg:hidden">
          {filteredTransactions.map((txn) => (
            <div key={txn.id} className="rounded-xl border border-[#eaecf0] p-3">
              <div className="flex items-center justify-between">
                <span
                  className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-[family-name:var(--font-urbanist)] text-xs"
                  style={{
                    backgroundColor: TYPE_BADGE[txn.type].bg,
                    color: TYPE_BADGE[txn.type].text,
                    borderColor: TYPE_BADGE[txn.type].border,
                  }}
                >
                  {txn.type === "Credit" ? (
                    <ArrowDownLeft className="size-3" />
                  ) : (
                    <ArrowUpRight className="size-3" />
                  )}
                  {txn.type}
                </span>
                <span
                  className="font-[family-name:var(--font-merriweather)] text-sm font-bold"
                  style={{ color: txn.type === "Credit" ? "#009061" : "#cd3030" }}
                >
                  {txn.type === "Credit" ? "+" : "-"}
                  {formatNaira(txn.amount)}
                </span>
              </div>
              <p className="mt-1.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                {txn.description}
              </p>
              <p className="mt-1 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
                {txn.date} • {txn.time} • {txn.category}
              </p>
            </div>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="px-4 py-8 text-center">
            <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
              No transactions match your filters.
            </p>
          </div>
        )}
      </div>

      {/* Bank Account Card */}
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-[family-name:var(--font-merriweather)] font-bold text-[#2d1810]">Bank Account</h3>
          <button
            onClick={() => setBankUpdateOpen(true)}
            className="font-[family-name:var(--font-nunito)] text-sm text-[#c47b2c] hover:underline"
          >
            Update
          </button>
        </div>
        <div className="mt-3 flex items-center gap-4 rounded-xl border border-[#e6ebf3] bg-[#faf9f7] p-4">
          <div className="flex size-10 items-center justify-center rounded-full bg-[#f5edd8]">
            <Building2 className="size-5 text-[#3b2513]" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#2d1810]">
                {MOCK_BANK_ACCOUNT.bankName}
              </p>
              <span
                className={`rounded-full px-2 py-0.5 font-[family-name:var(--font-urbanist)] text-[10px] font-semibold ${
                  MOCK_BANK_ACCOUNT.accountType === "Business"
                    ? "bg-[#ecfff8] text-[#009061]"
                    : "bg-[#fff6e6] text-[#cc8000]"
                }`}
              >
                {MOCK_BANK_ACCOUNT.accountType}
              </span>
            </div>
            <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
              {MOCK_BANK_ACCOUNT.accountName} • ••••{MOCK_BANK_ACCOUNT.accountNumber.slice(-4)}
            </p>
          </div>
          <ChevronRight className="size-4 text-[#6b7280]" />
        </div>
      </div>

      <WithdrawalRequestModal open={withdrawalOpen} onOpenChange={setWithdrawalOpen} />
      <DepositInfoModal open={depositOpen} onOpenChange={setDepositOpen} />
      <BankAccountUpdateModal open={bankUpdateOpen} onOpenChange={setBankUpdateOpen} />
    </div>
  );
}
