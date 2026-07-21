"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Receipt, CheckCircle2 } from "lucide-react";
import { getTransactions } from "@/lib/shared/transactions";

export default function TransactionHistoryPage() {
  const router = useRouter();
  const transactions = getTransactions();

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="relative overflow-hidden bg-[#5B391E] px-6 pt-14 pb-6">
        <div className="pointer-events-none absolute top-0 right-0 h-[220px] w-[220px] rounded-full bg-[#D4A67F] opacity-20" />
        <button onClick={() => router.back()} className="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
          <ArrowLeft size={16} className="text-white" />
        </button>
        <h1 className="text-xl font-bold text-white">Transaction History</h1>
        <p className="mt-1 text-sm text-white/70">({transactions.length}) Transactions</p>
      </div>

      <div className="flex-1 overflow-y-auto bg-white px-6 py-5">
        {transactions.length > 0 ? (
          <div className="flex flex-col gap-3">
            {transactions.map((txn) => (
              <div key={txn.id} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cg-quick-action">
                    <Receipt size={16} className="text-cg-brand" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-800">{txn.title}</p>
                    <p className="mt-0.5 truncate text-xs text-gray-400">{txn.reference}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-gray-50 pt-3">
                  <div>
                    <p className="text-base font-bold text-gray-800">₦{txn.amount.toLocaleString()}</p>
                    <p className="mt-0.5 text-xs text-gray-400">{txn.date} · {txn.method}</p>
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-semibold text-green-600">
                    <CheckCircle2 size={11} />
                    Successful
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-sm text-gray-400">No transactions yet.</p>
        )}
      </div>
    </div>
  );
}
