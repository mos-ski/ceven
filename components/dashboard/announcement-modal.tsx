"use client";

import { Info, Sparkles, X } from "lucide-react";
import { useState } from "react";
import SuccessModal from "@/components/dashboard/success-modal";

type Props = {
  onClose: () => void;
};

const sendToOptions = ["Parent", "Room", "All Parent", "Caregiver", "All Caregiver"];
const typeOptions = ["Discount", "Changes in price", "Parent meeting", "Email Newsletter", "Incident"];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">{children}</label>
  );
}

function TextField({ placeholder, rows }: { placeholder?: string; rows?: number }) {
  if (rows) {
    return (
      <textarea
        placeholder={placeholder}
        rows={rows}
        className="w-full resize-none rounded-xl border border-[#dcdcdc] bg-white px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] placeholder:text-[#6b7280] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
      />
    );
  }
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="h-[52px] w-full rounded-xl border border-[#dcdcdc] bg-white px-4 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] placeholder:text-[#6b7280] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
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

export default function AnnouncementModal({ onClose }: Props) {
  const [message, setMessage] = useState("");
  const [generating, setGenerating] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleGenerateWithAi = () => {
    setGenerating(true);
    setTimeout(() => {
      setMessage(
        "Dear parents, please be advised of an important update regarding your child's care this week. Our team remains committed to providing a safe and nurturing environment. Reach out if you have any questions."
      );
      setGenerating(false);
    }, 600);
  };

  if (submitted) {
    return (
      <SuccessModal
        title="Announcement Sent"
        description="Your announcement has been broadcast via app and SMS."
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
              Send Announcement
            </h2>
            <p className="mt-0.5 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
              Broadcast to parents/guardian via app and sms
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
          <div className="flex items-start gap-2 rounded-xl bg-[#faf2e1] px-4 py-3">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#3b2513]" />
            <p className="font-[family-name:var(--font-nunito)] text-xs text-black">
              Let AI generate announcement for you
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <FieldLabel>Send To</FieldLabel>
            <SelectField options={sendToOptions} placeholder="Select recipients" />
          </div>

          <div className="flex flex-col gap-2">
            <FieldLabel>Type</FieldLabel>
            <SelectField options={typeOptions} placeholder="Select type" />
          </div>

          <div className="flex flex-col gap-2">
            <FieldLabel>Subject</FieldLabel>
            <TextField placeholder="Enter text" />
          </div>

          <div className="flex flex-col gap-2">
            <FieldLabel>Message</FieldLabel>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Additional note..."
              rows={5}
              className="w-full resize-none rounded-xl border border-[#dcdcdc] bg-white px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] placeholder:text-[#6b7280] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
            />
            <button
              onClick={handleGenerateWithAi}
              disabled={generating}
              className="flex w-fit items-center gap-1 font-[family-name:var(--font-nunito)] text-xs font-semibold text-[#3b2513] underline hover:opacity-70 disabled:opacity-50"
            >
              <Sparkles className="h-3 w-3" />
              {generating ? "Generating…" : "Generate With AI"}
            </button>
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
            Send Now
          </button>
        </div>
      </div>
    </div>
  );
}
