"use client";

import { useMemo, useState } from "react";
import { Receipt as ReceiptIcon } from "lucide-react";
import { getTransactions } from "@/lib/shared/transactions";

export default function PaymentHistoryPage() {
  const transactions = getTransactions();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return transactions;
    const q = query.trim().toLowerCase();
    return transactions.filter((t) => t.title.toLowerCase().includes(q));
  }, [transactions, query]);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-1 text-2xl font-bold text-gray-800">Payment History</h1>
      <p className="mb-4 text-sm text-gray-500">({transactions.length}) Transactions</p>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by child or term..."
        className="mb-4 w-full rounded-xl border border-gray-100 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:border-cg-brand focus:outline-none"
      />

      {filtered.length > 0 ? (
        <div className="flex flex-col gap-3">
          {filtered.map((txn) => (
            <div key={txn.id} className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cg-quick-action">
                  <ReceiptIcon size={16} className="text-cg-brand" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-800">{txn.title}</p>
                  <p className="mt-0.5 truncate text-xs text-gray-400">{txn.reference}</p>
                </div>
                <div className="text-right">
                  <p className="text-base font-bold text-gray-800">₦{txn.amount.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">{txn.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-sm text-gray-400">No transactions match your search.</p>
      )}
    </div>
  );
}
