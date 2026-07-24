// app/me/payment-methods/page.tsx
"use client";

import { useState } from "react";
import { CreditCard, Landmark, Smartphone, Plus, X, Star } from "lucide-react";
import { MOCK_PAYMENT_METHODS, type PaymentMethod, type PaymentMethodType } from "@/lib/me/mock-data";

const TYPE_ICON: Record<PaymentMethodType, typeof CreditCard> = {
  card: CreditCard,
  bank: Landmark,
  ussd: Smartphone,
};

function AddMethodModal({ onClose, onAdd }: { onClose: () => void; onAdd: (m: PaymentMethod) => void }) {
  const [type, setType] = useState<PaymentMethodType>("card");
  const [label, setLabel] = useState("");
  const [detail, setDetail] = useState("");

  const isValid = label.trim() && detail.trim();

  function handleAdd() {
    if (!isValid) return;
    onAdd({ id: `pm-${Date.now()}`, type, label: label.trim(), detail: detail.trim(), isDefault: false });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[420px] rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-800">Add Payment Method</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
            <X size={16} className="text-gray-600" />
          </button>
        </div>

        <div className="mb-3 flex gap-2">
          {(["card", "bank", "ussd"] as PaymentMethodType[]).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`flex-1 rounded-xl border-2 py-2 text-xs font-medium capitalize transition-colors ${
                type === t ? "border-cg-brand bg-cg-brand/5 text-cg-brand" : "border-gray-100 text-gray-500"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mb-3">
          <label className="mb-1 block text-xs font-semibold text-gray-500">Label</label>
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="e.g. Mastercard •••• 1234"
            className="w-full rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-cg-brand focus:outline-none"
          />
        </div>

        <div className="mb-5">
          <label className="mb-1 block text-xs font-semibold text-gray-500">Detail</label>
          <input
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            placeholder="e.g. Expires 11/29"
            className="w-full rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-cg-brand focus:outline-none"
          />
        </div>

        <button
          onClick={handleAdd}
          disabled={!isValid}
          className="w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white disabled:opacity-40"
        >
          Add Method
        </button>
      </div>
    </div>
  );
}

export default function PaymentMethodsPage() {
  const [methods, setMethods] = useState<PaymentMethod[]>(MOCK_PAYMENT_METHODS);
  const [showAdd, setShowAdd] = useState(false);

  function setDefault(id: string) {
    setMethods((prev) => prev.map((m) => ({ ...m, isDefault: m.id === id })));
  }

  function remove(id: string) {
    setMethods((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-1 text-2xl font-bold text-gray-800">Payment Methods</h1>
      <p className="mb-6 text-sm text-gray-500">Manage the cards and accounts used for payments.</p>

      <div className="mb-4 flex flex-col gap-3">
        {methods.map((m) => {
          const Icon = TYPE_ICON[m.type];
          return (
            <div key={m.id} className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cg-quick-action">
                  <Icon size={18} className="text-cg-brand" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-gray-800">{m.label}</p>
                    {m.isDefault && (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-700">Default</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">{m.detail}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!m.isDefault && (
                  <button
                    onClick={() => setDefault(m.id)}
                    className="flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-500 hover:border-cg-brand hover:text-cg-brand"
                  >
                    <Star size={12} />
                    Set default
                  </button>
                )}
                <button
                  onClick={() => remove(m.id)}
                  className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-red-500 hover:border-red-300"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}

        {methods.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-400">No payment methods yet.</p>
        )}
      </div>

      <button
        onClick={() => setShowAdd(true)}
        className="flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-300 py-4 text-sm font-semibold text-cg-brand w-full"
      >
        <Plus size={16} />
        Add Payment Method
      </button>

      {showAdd && (
        <AddMethodModal onClose={() => setShowAdd(false)} onAdd={(m) => setMethods((prev) => [...prev, m])} />
      )}
    </div>
  );
}
