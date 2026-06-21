"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { CHILDREN } from "@/lib/mock-data/children";
import SuccessModal from "@/components/dashboard/success-modal";

type Props = {
  onClose: () => void;
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">{children}</label>
  );
}

function TextField({
  placeholder,
  type = "text",
  rows,
}: {
  placeholder?: string;
  type?: string;
  rows?: number;
}) {
  if (rows) {
    return (
      <textarea
        placeholder={placeholder}
        rows={rows}
        className="w-full resize-none rounded-xl border border-[#e6ebf3] bg-white px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] placeholder:text-[#6b7280] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
      />
    );
  }
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="h-[52px] w-full rounded-xl border border-[#e6ebf3] bg-white px-4 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] placeholder:text-[#6b7280] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
    />
  );
}

function SelectField({ options, placeholder }: { options: string[]; placeholder?: string }) {
  return (
    <select className="h-[52px] w-full appearance-none rounded-xl border border-[#e6ebf3] bg-white px-4 font-[family-name:var(--font-nunito)] text-sm text-[#111] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]">
      {placeholder && (
        <option value="" disabled selected>
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

export default function NewInvoiceModal({ onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <SuccessModal
        title="Invoice Sent"
        description="Invoice has been successfully sent to this parent"
        onClose={onClose}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative flex max-h-[90vh] w-full max-w-full mx-2 sm:mx-4 sm:max-w-[680px] flex-col overflow-hidden rounded-2xl border-6 border-[#faf2e1] bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e6ebf3] px-6 py-5">
          <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#171f26]">
            New Invoice
          </h2>
          <button
            onClick={onClose}
            className="flex h-6 w-6 items-center justify-center text-[#6b7280] hover:text-[#2d1810]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 py-5">
          <div className="flex flex-col gap-2">
            <FieldLabel>Child</FieldLabel>
            <SelectField options={CHILDREN.map((c) => c.name)} placeholder="Select child" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <FieldLabel>Amount (₦)</FieldLabel>
              <TextField type="number" placeholder="Enter amount" />
            </div>
            <div className="flex flex-col gap-2">
              <FieldLabel>Due Date</FieldLabel>
              <TextField type="date" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <FieldLabel>Description</FieldLabel>
            <TextField placeholder="e.g. full payment for the month of March" />
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">
              Discount/Waiver <span className="text-[#6b7280]">(optional)</span>
            </span>
            <TextField placeholder="₦0" />
          </div>

          <div className="flex flex-col gap-2">
            <FieldLabel>Note to Parent</FieldLabel>
            <TextField rows={3} placeholder="Additional note..." />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-[#e6ebf3] px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-[#3b2513] px-5 py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#3b2513] hover:bg-[#f9fafb]"
          >
            Cancel
          </button>
          <button
            onClick={() => setSubmitted(true)}
            className="w-[160px] rounded-lg border border-[#d4a67f] bg-[#e0bfa0] px-5 py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-white hover:bg-[#d4a67f]"
          >
            Create &amp; Send Invoice
          </button>
        </div>
      </div>
    </div>
  );
}
