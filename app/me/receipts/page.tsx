"use client";

import { Download, FileStack } from "lucide-react";
import { getTransactions } from "@/lib/shared/transactions";

export default function ReceiptsPage() {
  const receipts = getTransactions();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-1 text-2xl font-bold text-gray-800">Receipts</h1>
      <p className="mb-6 text-sm text-gray-500">Download a receipt for any completed payment.</p>

      {receipts.length > 0 ? (
        <div className="flex flex-col gap-3">
          {receipts.map((txn) => (
            <div key={txn.id} className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cg-quick-action">
                  <FileStack size={18} className="text-cg-brand" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{txn.title}</p>
                  <p className="text-xs text-gray-400">{txn.date} · ₦{txn.amount.toLocaleString()}</p>
                </div>
              </div>
              <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:border-cg-brand hover:text-cg-brand">
                <Download size={14} />
                Download
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-sm text-gray-400">No receipts yet.</p>
      )}
    </div>
  );
}
