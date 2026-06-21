"use client";

import { X, Info } from "lucide-react";
import { useState } from "react";
import SuccessModal from "@/components/dashboard/success-modal";

type Props = {
  onClose: () => void;
};

const genderOptions = ["Male", "Female", "Other"];
const bloodGroupOptions = ["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−", "Unknown"];
const roomOptions = ["Toddlers", "Infants", "Fingerlings", "Preschool", "Lion Class", "Tiger Class"];
const planOptions = [
  "Free Plan – No Cost (Limited update)",
  "Premium (Monthly) – ₦9,950",
  "Premium (Quarterly) – ₦23,880",
  "Premium (Yearly) – ₦95,520",
];

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
      {children}
      {required && <span className="ml-0.5 text-[#ef4444]">*</span>}
    </label>
  );
}

function TextInput({
  placeholder,
  type = "text",
}: {
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full rounded-lg border border-[#d0d5dd] bg-white px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] placeholder:text-[#9ca3af] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
    />
  );
}

function SelectInput({ options, placeholder }: { options: string[]; placeholder?: string }) {
  return (
    <select className="w-full rounded-lg border border-[#d0d5dd] bg-white px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]">
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

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-[family-name:var(--font-merriweather)] text-base font-bold text-[#2d1810]">
      {children}
    </h3>
  );
}

export default function EnrollChildModal({ onClose }: Props) {
  const [consentChecked, setConsentChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <SuccessModal
        title="Enrollment Successful!"
        description="You have successfully enrolled this child"
        onClose={onClose}
      />
    );
  }

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative flex max-h-[90vh] w-full max-w-full mx-2 sm:mx-4 sm:max-w-[680px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#e6ebf3] px-6 py-5">
          <div>
            <h2 className="font-[family-name:var(--font-merriweather)] text-xl font-bold text-[#2d1810]">
              Add New Child
            </h2>
            <p className="mt-0.5 font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
              Fill in the details below to enroll a new child.
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#2d1810]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-6 py-5">
          {/* Info note */}
          <div className="flex items-start gap-2.5 rounded-xl border border-[#e0bfa0] bg-[#fdf6e8] px-4 py-3">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#c47b2c]" />
            <p className="font-[family-name:var(--font-nunito)] text-xs leading-relaxed text-[#6b7280]">
              All fields marked with <span className="font-bold text-[#ef4444]">*</span> are required.
              Enrollment will be set to <span className="font-semibold text-[#2d1810]">Pending</span> until
              verified by an admin.
            </p>
          </div>

          {/* Section 1 — Child's Information */}
          <div className="flex flex-col gap-4">
            <SectionHeading>Child&apos;s Information</SectionHeading>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <FieldLabel required>First Name</FieldLabel>
                <TextInput placeholder="e.g. Amara" />
              </div>
              <div className="flex flex-col gap-1.5">
                <FieldLabel required>Last Name</FieldLabel>
                <TextInput placeholder="e.g. Okafor" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <FieldLabel required>Date of Birth</FieldLabel>
                <TextInput type="date" />
              </div>
              <div className="flex flex-col gap-1.5">
                <FieldLabel required>Gender</FieldLabel>
                <SelectInput options={genderOptions} placeholder="Select gender" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <FieldLabel>Blood Group</FieldLabel>
                <SelectInput options={bloodGroupOptions} placeholder="Select blood group" />
              </div>
              <div className="flex flex-col gap-1.5">
                <FieldLabel required>Room / Class</FieldLabel>
                <SelectInput options={roomOptions} placeholder="Assign a room" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <FieldLabel>Allergies / Medical Notes</FieldLabel>
              <textarea
                placeholder="List any known allergies or medical conditions..."
                rows={3}
                className="w-full resize-none rounded-lg border border-[#d0d5dd] bg-white px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] placeholder:text-[#9ca3af] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#f3f4f6]" />

          {/* Section 2 — Parent / Guardian Info */}
          <div className="flex flex-col gap-4">
            <SectionHeading>Parent / Guardian Info</SectionHeading>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <FieldLabel required>Full Name</FieldLabel>
                <TextInput placeholder="e.g. Mrs Ngozi Okafor" />
              </div>
              <div className="flex flex-col gap-1.5">
                <FieldLabel required>Email Address</FieldLabel>
                <TextInput type="email" placeholder="e.g. ngozi@email.com" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <FieldLabel>Phone Number</FieldLabel>
              <TextInput type="tel" placeholder="e.g. +234 801 234 5678" />
            </div>

            <label className="flex cursor-pointer items-start gap-3">
              <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
                <input
                  type="checkbox"
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                  className="h-4 w-4 rounded border-[#d0d5dd] accent-[#c47b2c]"
                />
              </div>
              <span className="font-[family-name:var(--font-nunito)] text-sm leading-relaxed text-[#6b7280]">
                I confirm that I have the parent or guardian&apos;s consent to enroll this child and share
                their data with the creche.
              </span>
            </label>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#f3f4f6]" />

          {/* Section 3 — Subscription & Start Date */}
          <div className="flex flex-col gap-4">
            <SectionHeading>Subscription &amp; Start Date</SectionHeading>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <FieldLabel required>Subscription Plan</FieldLabel>
                <SelectInput options={planOptions} placeholder="Select a plan" />
              </div>
              <div className="flex flex-col gap-1.5">
                <FieldLabel required>Start Date</FieldLabel>
                <TextInput type="date" />
              </div>
            </div>
          </div>

          {/* Bottom spacing */}
          <div className="h-1" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-[#e6ebf3] px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-[#d0d5dd] px-5 py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810] hover:bg-[#f9fafb]"
          >
            Cancel
          </button>
          <button
            onClick={() => setSubmitted(true)}
            className="rounded-lg bg-[#3b2513] px-5 py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#faf2e1] hover:bg-[#2d1810]"
          >
            Enroll Child
          </button>
        </div>
      </div>
    </div>
  );
}
