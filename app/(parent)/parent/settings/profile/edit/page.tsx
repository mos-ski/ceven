"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, CheckCircle2, X } from "lucide-react";

const RELATIONSHIP_OPTIONS = ["Father", "Mother", "Guardian", "Grandparent", "Other"];
const LANGUAGE_OPTIONS = ["English", "Yoruba", "Igbo", "Hausa", "French"];
const TIMEZONE_OPTIONS = ["GMT + 1 (Lagos)", "GMT + 0 (London)", "GMT - 5 (New York)", "GMT + 3 (Nairobi)"];

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4">
      <p className="mb-1.5 text-sm font-medium text-gray-800">{label}</p>
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between rounded-xl bg-white px-3 py-3 shadow-sm text-sm"
        >
          <span className="text-gray-800">{value}</span>
          <ChevronDown size={16} className="shrink-0 text-gray-500" />
        </button>
        {open && (
          <div className="absolute z-10 mt-1 w-full rounded-xl bg-white shadow-lg border border-gray-100">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setOpen(false); }}
                className="flex w-full items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
              >
                {opt}
                {value === opt && <CheckCircle2 size={14} className="text-cg-brand" />}
              </button>
            ))}
          </div>
        )}
      </div>
      <p className="mt-1 text-xs text-gray-400">This is a hint text to help user</p>
    </div>
  );
}

function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
      <div className="w-full max-w-[327px] rounded-2xl bg-[#FAFAFA] px-6 py-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-400">Profile</span>
          <button onClick={onClose} className="text-gray-400"><X size={20} /></button>
        </div>
        <div className="flex flex-col items-center py-4">
          <div className="mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2 size={60} className="text-green-500" />
          </div>
          <h2 className="mb-1 text-xl font-bold text-gray-800">Congratulation</h2>
          <p className="text-sm text-gray-500">Your profile has been updated.</p>
        </div>
      </div>
    </div>
  );
}

export default function EditProfilePage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("Olagoke");
  const [lastName, setLastName] = useState("Olajide");
  const [relationship, setRelationship] = useState("Father");
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("GMT + 1 (Lagos)");
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      {/* Brown header */}
      <div className="relative overflow-hidden bg-[#5B391E] px-6 pt-14 pb-6">
        <div className="pointer-events-none absolute top-0 right-0 h-[220px] w-[220px] rounded-full bg-[#D4A67F] opacity-20" />
        <button
          onClick={() => router.back()}
          className="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#F4F5F6]/20"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-white">Update Profile</h1>
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs">✏️</div>
        </div>
        <p className="mt-1 text-sm text-white/70">
          Update your details to help us provide the best experience.
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto bg-white px-6 py-5">
        <div className="mb-4">
          <p className="mb-1.5 text-sm font-medium text-gray-800">First Name *</p>
          <div className="flex items-center rounded-xl bg-white px-3 py-3 shadow-sm border border-gray-100">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="flex-1 bg-transparent text-sm text-gray-800 focus:outline-none"
            />
          </div>
          <p className="mt-1 text-xs text-gray-400">This is a hint text to help user</p>
        </div>

        <div className="mb-4">
          <p className="mb-1.5 text-sm font-medium text-gray-800">Last Name *</p>
          <div className="flex items-center rounded-xl bg-white px-3 py-3 shadow-sm border border-gray-100">
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="flex-1 bg-transparent text-sm text-gray-800 focus:outline-none"
            />
          </div>
          <p className="mt-1 text-xs text-gray-400">This is a hint text to help user</p>
        </div>

        <SelectField label="Relationship *" value={relationship} options={RELATIONSHIP_OPTIONS} onChange={setRelationship} />
        <SelectField label="Language *" value={language} options={LANGUAGE_OPTIONS} onChange={setLanguage} />
        <SelectField label="Time Zone *" value={timezone} options={TIMEZONE_OPTIONS} onChange={setTimezone} />

        <button
          onClick={() => setShowSuccess(true)}
          className="mt-2 w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-[#FAF2E1]"
        >
          Update Details
        </button>
      </div>

      {showSuccess && (
        <SuccessModal onClose={() => { setShowSuccess(false); router.back(); }} />
      )}
    </div>
  );
}
