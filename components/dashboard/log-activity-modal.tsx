"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { CHILDREN } from "@/lib/mock-data/children";
import SuccessModal from "@/components/dashboard/success-modal";

type Props = {
  onClose: () => void;
};

const moodOptions = ["😊 Happy", "😐 Neutral / Calm", "😴 Sleeping / Tired", "🙁 Disappointed / Sad", "🤒 Sick", "😣 Fussy"];

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">
      {children}
      {required && <span className="ml-0.5 text-[#cd3030]">*</span>}
    </label>
  );
}

function TextField({
  placeholder,
  rows,
}: {
  placeholder?: string;
  rows?: number;
}) {
  if (rows) {
    return (
      <textarea
        placeholder={placeholder}
        rows={rows}
        className="w-full resize-none rounded-xl border border-[#dcdcdc] bg-white px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] placeholder:text-[#7e7e7e] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
      />
    );
  }
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="h-[52px] w-full rounded-xl border border-[#dcdcdc] bg-white px-4 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] placeholder:text-[#7e7e7e] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
    />
  );
}

function SelectField({ options, placeholder }: { options: string[]; placeholder?: string }) {
  return (
    <select className="h-[52px] w-full appearance-none rounded-xl border border-[#dcdcdc] bg-white px-4 font-[family-name:var(--font-nunito)] text-sm text-[#111] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]">
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

export default function LogActivityModal({ onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <SuccessModal
        title="Report Logged!"
        description="The daily report has been sent to the parent."
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
          <div>
            <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#171f26]">
              Log Report
            </h2>
            <p className="mt-0.5 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
              Report will be sent to parent as summary notification
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-6 w-6 items-center justify-center text-[#6b7280] hover:text-[#2d1810]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 py-5">
          <div className="flex flex-col gap-1.5">
            <FieldLabel>Child</FieldLabel>
            <SelectField options={CHILDREN.map((c) => c.name)} placeholder="Select child" />
          </div>

          <div className="flex flex-col gap-1.5">
            <FieldLabel>Mood</FieldLabel>
            <SelectField options={moodOptions} placeholder="Select mood" />
          </div>

          <div className="flex flex-col gap-1.5">
            <FieldLabel>Meal</FieldLabel>
            <TextField placeholder="e.g. how many meal this child had, and did he/she finish" />
          </div>

          <div className="flex flex-col gap-1.5">
            <FieldLabel required>Nap Time</FieldLabel>
            <div className="flex items-center gap-4">
              <div className="flex h-[52px] flex-1 items-center gap-2 rounded-xl border border-[#ccd2dc] bg-white px-4">
                <span className="font-[family-name:var(--font-urbanist)] text-sm text-[#1f2937]">From:</span>
                <input
                  type="time"
                  className="flex-1 bg-transparent font-[family-name:var(--font-urbanist)] text-sm text-[#1f2937] focus:outline-none"
                />
              </div>
              <div className="flex h-[52px] flex-1 items-center gap-2 rounded-xl border border-[#ccd2dc] bg-white px-4">
                <span className="font-[family-name:var(--font-urbanist)] text-sm text-[#1f2937]">To:</span>
                <input
                  type="time"
                  className="flex-1 bg-transparent font-[family-name:var(--font-urbanist)] text-sm text-[#1f2937] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <FieldLabel>Hygiene</FieldLabel>
            <TextField placeholder="e.g. how many times did this child poop, pee or change diaper" />
          </div>

          <div className="flex flex-col gap-1.5">
            <FieldLabel>Health</FieldLabel>
            <TextField placeholder="e.g. painting, outdoor play" />
          </div>

          <div className="flex flex-col gap-1.5">
            <FieldLabel>Note to Parent/Guardian</FieldLabel>
            <TextField rows={2} placeholder="Any highlights, concerns or personal note to parent" />
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
            className="w-[160px] rounded-lg bg-[#3b2513] px-5 py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1] hover:bg-[#2d1810]"
          >
            Log Report
          </button>
        </div>
      </div>
    </div>
  );
}
