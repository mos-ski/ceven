"use client";

import { Check, X } from "lucide-react";

type Props = {
  title: string;
  description: string;
  onClose: () => void;
  closeLabel?: string;
};

export default function SuccessModal({ title, description, onClose, closeLabel = "Close" }: Props) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[380px] rounded-2xl bg-white p-2 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#faf2e1] text-[#3b2513] hover:bg-[#edd9c0]"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="flex flex-col items-center gap-6 rounded-xl bg-[#fafafa] px-6 py-8">
          <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#27e2a4]/15">
              <Check className="h-6 w-6 text-[#0f9d62]" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="font-[family-name:var(--font-merriweather)] text-base font-bold text-[#2d1810]">
              {title}
            </p>
            <p className="font-[family-name:var(--font-nunito)] text-sm leading-relaxed text-[#6b7280]">
              {description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-[44px] w-[160px] items-center justify-center rounded-xl border border-[#2d1810] bg-white font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810] hover:bg-[#f9fafb]"
          >
            {closeLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
