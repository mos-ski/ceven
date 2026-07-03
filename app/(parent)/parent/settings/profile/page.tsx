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
          className="flex w-full items-center justify-between rounded-xl bg-white px-3 py-3 shadow-sm text-sm text-left"
        >
          <span className={value ? "text-gray-800" : "text-gray-400"}>{value || "Select"}</span>
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

function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="mb-4">
      <p className="mb-1.5 text-sm font-medium text-gray-800">{label}</p>
      <div className="flex items-center rounded-xl bg-white px-3 py-3 shadow-sm">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
        />
      </div>
      <p className="mt-1 text-xs text-gray-400">This is a hint text to help user</p>
    </div>
  );
}

function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
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
          <p className="mb-6 text-sm text-gray-500">Your parent profile is ready.</p>
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-[#FAF2E1]"
          >
            Add Child
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ParentProfileSetupPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [language, setLanguage] = useState("");
  const [timezone, setTimezone] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const isActive =
    firstName.trim() && lastName.trim() && relationship && language && timezone &&
    emergencyName.trim() && emergencyPhone.trim();

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Brown header */}
      <div className="relative bg-[#5B391E] px-6 pt-14 pb-6">
        <div className="pointer-events-none absolute top-0 right-0 h-[220px] w-[220px] rounded-full bg-[#D4A67F] opacity-20" />
        <div className="pointer-events-none absolute -top-10 -right-10 h-[192px] w-[192px] rounded-full bg-[#D4A67F] opacity-15" />
        <button
          onClick={() => router.back()}
          className="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#F4F5F6]/20"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-white">Connect to Your Child&apos;s Day</h1>
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs">🔔</div>
        </div>
        <p className="mt-1 text-sm text-white/70">Set up your profile in a few taps.</p>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto bg-white px-6 py-5">
        <TextField label="First Name *" value={firstName} onChange={setFirstName} placeholder="Enter your first name" />
        <TextField label="Last Name *" value={lastName} onChange={setLastName} placeholder="Enter your last name" />
        <SelectField label="Relationship *" value={relationship} options={RELATIONSHIP_OPTIONS} onChange={setRelationship} />
        <SelectField label="Language *" value={language} options={LANGUAGE_OPTIONS} onChange={setLanguage} />
        <SelectField label="Time Zone *" value={timezone} options={TIMEZONE_OPTIONS} onChange={setTimezone} />
        <TextField label="Emergency Contact Name *" value={emergencyName} onChange={setEmergencyName} placeholder="Enter full name" />
        <TextField label="Emergency Contact *" value={emergencyPhone} onChange={setEmergencyPhone} placeholder="Enter phone number" />

        <button
          onClick={() => isActive && setShowSuccess(true)}
          className={`mt-2 w-full rounded-xl py-3 text-sm font-semibold transition-colors ${
            isActive ? "bg-cg-brand text-[#FAF2E1]" : "bg-[#E0BFA0] text-[#FAF2E1] cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>

      {showSuccess && (
        <SuccessModal onClose={() => { setShowSuccess(false); router.push("/parent/home"); }} />
      )}
    </div>
  );
}
