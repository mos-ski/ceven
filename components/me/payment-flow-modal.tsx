"use client";

import { useState } from "react";
import { CreditCard, Landmark, Smartphone, X, CheckCircle2 } from "lucide-react";
import { MOCK_PAYMENT_METHODS, type PaymentMethodType } from "@/lib/me/mock-data";

const TYPE_ICON: Record<PaymentMethodType, typeof CreditCard> = {
  card: CreditCard,
  bank: Landmark,
  ussd: Smartphone,
};

type Step = "select" | "processing" | "success";

export function PaymentFlowModal({
  title,
  amount,
  description,
  onClose,
  onSuccess,
}: {
  title: string;
  amount: string;
  description: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [step, setStep] = useState<Step>("select");
  const [selectedId, setSelectedId] = useState(MOCK_PAYMENT_METHODS.find((m) => m.isDefault)?.id ?? MOCK_PAYMENT_METHODS[0]?.id);

  function handlePay() {
    setStep("processing");
    setTimeout(() => {
      setStep("success");
    }, 1400);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[420px] rounded-2xl bg-white p-6 shadow-xl">
        {step === "select" && (
          <>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-800">{title}</h2>
              <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                <X size={16} className="text-gray-600" />
              </button>
            </div>

            <div className="mb-4 rounded-xl bg-[#F9F5EE] p-4">
              <p className="text-xs text-gray-500">{description}</p>
              <p className="mt-1 text-xl font-bold text-cg-brand">{amount}</p>
            </div>

            <p className="mb-2 text-xs font-semibold text-gray-500">Payment Method</p>
            <div className="mb-4 flex flex-col gap-2">
              {MOCK_PAYMENT_METHODS.map((m) => {
                const Icon = TYPE_ICON[m.type];
                const selected = m.id === selectedId;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedId(m.id)}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
                      selected ? "border-cg-brand bg-cg-brand/5" : "border-gray-100"
                    }`}
                  >
                    <Icon size={18} className="text-cg-brand" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">{m.label}</p>
                      <p className="text-[11px] text-gray-400">{m.detail}</p>
                    </div>
                    <div className={`h-4 w-4 rounded-full border-2 ${selected ? "border-cg-brand bg-cg-brand" : "border-gray-300"}`} />
                  </button>
                );
              })}
            </div>

            <button
              onClick={handlePay}
              disabled={!selectedId}
              className="w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white disabled:opacity-40"
            >
              Pay {amount}
            </button>
          </>
        )}

        {step === "processing" && (
          <div className="flex flex-col items-center py-10">
            <svg className="mb-4 h-8 w-8 animate-spin text-cg-brand" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="15 45" />
            </svg>
            <p className="text-sm font-semibold text-gray-700">Processing payment...</p>
          </div>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center py-6 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
              <CheckCircle2 size={36} className="text-green-500" />
            </div>
            <h2 className="mb-1 text-lg font-bold text-gray-800">Payment Successful</h2>
            <p className="mb-6 text-sm text-gray-500">{description} — {amount}</p>
            <button
              onClick={() => { onSuccess(); onClose(); }}
              className="w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
