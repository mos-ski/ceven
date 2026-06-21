"use client";

import { useState } from "react";
import { ChevronDown, FileText, Trash2, X } from "lucide-react";

import { STAFF_CLASS_OPTIONS, STAFF_ROLE_OPTIONS } from "@/lib/mock-data/staff";

type Step = 1 | 2;

type UploadedDoc = {
  id: string;
  name: string;
  size: string;
};

function StepBadge({ step }: { step: Step }) {
  return (
    <p className="absolute right-6 top-[22px] font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
      {step}/2
    </p>
  );
}

function FileUploadRow({
  label,
  helper,
  doc,
  onUpload,
  onRemove,
}: {
  label: string;
  helper?: string;
  doc: UploadedDoc | null;
  onUpload: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <p className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">
        {label}
        {helper && (
          <span className="ml-1 font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">
            {helper}
          </span>
        )}
      </p>
      {doc ? (
        <div className="flex w-full items-start gap-1 rounded-lg border border-[#3b2513] bg-white p-4">
          <div className="flex flex-1 items-start gap-4">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full border-4 border-[#f4f5f6] bg-[#edd9c0]">
              <FileText className="size-4 text-[#3b2513]" />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <p className="font-[family-name:var(--font-merriweather)] text-xs font-semibold text-[#6b7280]">
                {doc.name}
              </p>
              <p className="font-[family-name:var(--font-nunito)] text-[10px] text-[#6b7280]">
                {doc.size}
              </p>
              <div className="flex w-full items-center gap-3">
                <div className="relative h-2 flex-1 rounded-full bg-[#f4f5f6]">
                  <div className="absolute inset-y-0 left-0 w-full rounded-full bg-[#3b2513]" />
                </div>
                <span className="font-[family-name:var(--font-urbanist)] text-xs font-medium text-[#6b7280]">
                  100%
                </span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${doc.name}`}
            className="rounded-lg p-1.5 text-[#cd3030] hover:bg-[#fff5f5]"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={onUpload}
          className="flex w-full items-center gap-4 rounded-xl border border-[#ccd2dc] bg-white p-4 text-left hover:border-[#3b2513]"
        >
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full border-4 border-[#f4f5f6] bg-[#edd9c0]">
            <FileText className="size-3.5 text-[#3b2513]" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-[family-name:var(--font-merriweather)] text-xs font-semibold text-[#6b7280]">
              Drag file here or{" "}
              <span className="text-[#3b2513] underline">Tap to Upload</span>
            </p>
            <p className="font-[family-name:var(--font-nunito)] text-[10px] text-[#6b7280]">
              PDF, JPEG. Max 650 KB
            </p>
          </div>
        </button>
      )}
    </div>
  );
}

export function AddStaffModal({
  onClose,
  onAdded,
}: {
  onClose: () => void;
  onAdded?: () => void;
}) {
  const [step, setStep] = useState<Step>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [staffClass, setStaffClass] = useState("");
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [classMenuOpen, setClassMenuOpen] = useState(false);

  const [idDoc, setIdDoc] = useState<UploadedDoc | null>(null);
  const [workDoc, setWorkDoc] = useState<UploadedDoc | null>(null);

  const canProceedStep1 = name.trim() !== "" && email.trim() !== "" && phone.trim() !== "" && role !== "";

  function handleProceed() {
    if (!canProceedStep1) return;
    setStep(2);
  }

  function handleAddStaff() {
    onAdded?.();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="relative flex max-h-[90vh] w-full max-w-[640px] flex-col overflow-y-auto rounded-[20px] border-6 border-[#faf2e1] bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-[#e6ebf3] bg-white px-6 py-5">
          <div>
            <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#171f26]">
              Add New Staff
            </h2>
            <p className="mt-1 font-[family-name:var(--font-nunito)] text-xs text-[#666]">
              Add staff member to easily manage their log and work output
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded p-1 text-[#6b7280] hover:text-[#2d1810]"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Body */}
        <div className="relative flex-1 px-6 py-5">
          <StepBadge step={step} />
          <p className="mb-4 font-[family-name:var(--font-nunito)] text-xs text-black">
            {step === 1 ? "Staff Information" : "Documents. You can save and do this later"}
          </p>

          {step === 1 && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                  className="h-[52px] w-full rounded-xl border border-[#dcdcdc] px-4 font-[family-name:var(--font-urbanist)] text-sm text-black outline-none placeholder:text-[#7e7e7e] focus:ring-2 focus:ring-[#c47b2c]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="h-[52px] w-full rounded-xl border border-[#dcdcdc] px-4 font-[family-name:var(--font-urbanist)] text-sm text-black outline-none placeholder:text-[#7e7e7e] focus:ring-2 focus:ring-[#c47b2c]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                  className="h-[52px] w-full rounded-xl border border-[#dcdcdc] px-4 font-[family-name:var(--font-urbanist)] text-sm text-black outline-none placeholder:text-[#7e7e7e] focus:ring-2 focus:ring-[#c47b2c]"
                />
              </div>

              <div className="h-px w-full bg-[#e6ebf3]" />

              {/* Assign Role */}
              <div className="relative flex flex-col gap-1">
                <label className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">
                  Assign Role
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setRoleMenuOpen((v) => !v);
                    setClassMenuOpen(false);
                  }}
                  className="flex h-[52px] w-full items-center justify-between rounded-xl border border-[#dcdcdc] px-4 text-left font-[family-name:var(--font-urbanist)] text-sm text-[#111]"
                >
                  <span className={role ? "text-[#111]" : "text-[#7e7e7e]"}>
                    {role || "Select"}
                  </span>
                  <ChevronDown className="size-4 text-[#6b7280]" />
                </button>
                {roleMenuOpen && (
                  <div className="absolute left-0 top-full z-20 mt-1 w-full rounded-2xl bg-[#fefefe] p-2 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.1)]">
                    {STAFF_ROLE_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setRole(opt);
                          setRoleMenuOpen(false);
                        }}
                        className="block w-full rounded-lg px-5 py-3 text-left font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#3b2513] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:bg-[#faf2e1]"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Assign Class */}
              <div className="relative flex flex-col gap-1">
                <label className="font-[family-name:var(--font-nunito)] text-sm text-black">
                  Assign Class
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setClassMenuOpen((v) => !v);
                    setRoleMenuOpen(false);
                  }}
                  className="flex h-[52px] w-full items-center justify-between rounded-xl border border-[#dcdcdc] px-4 text-left font-[family-name:var(--font-urbanist)] text-sm text-[#111]"
                >
                  <span className={staffClass ? "text-[#111]" : "text-[#7e7e7e]"}>
                    {staffClass || "Select"}
                  </span>
                  <ChevronDown className="size-4 text-[#6b7280]" />
                </button>
                {classMenuOpen && (
                  <div className="absolute left-0 top-full z-20 mt-1 w-full rounded-2xl bg-[#fefefe] p-2 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.1)]">
                    {STAFF_CLASS_OPTIONS.map((opt) => (
                      <div
                        key={opt}
                        className="mb-2 flex items-center gap-2 rounded-lg bg-white px-4 py-3 shadow-[0px_1px_1px_0px_rgba(12,12,13,0.05)] last:mb-0"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setStaffClass(opt);
                            setClassMenuOpen(false);
                          }}
                          className="font-[family-name:var(--font-nunito)] text-sm text-[#454b54]"
                        >
                          {opt}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-4">
              <FileUploadRow
                label="ID Verification "
                helper="(NIN, National ID, Driver’s License or Passport)"
                doc={idDoc}
                onUpload={() =>
                  setIdDoc({ id: "id-doc", name: "National Identity Number (NIN)", size: "JPEG 650 KB" })
                }
                onRemove={() => setIdDoc(null)}
              />
              <div className="h-px w-full bg-[#e6ebf3]" />
              <FileUploadRow
                label="Work Experience"
                doc={workDoc}
                onUpload={() => setWorkDoc({ id: "work-doc", name: "23447483photo", size: "JPEG 650 KB" })}
                onRemove={() => setWorkDoc(null)}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 z-10 flex items-center justify-end gap-4 border-t border-[#e6ebf3] bg-white px-6 py-4">
          {step === 1 ? (
            <>
              <button
                type="button"
                onClick={onClose}
                className="flex h-11 items-center justify-center rounded-lg border border-[#3b2513] px-5 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#3b2513]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleProceed}
                disabled={!canProceedStep1}
                className="flex h-11 w-40 items-center justify-center rounded-lg bg-[#3b2513] font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1] disabled:cursor-not-allowed disabled:bg-[#e0bfa0] disabled:border-[#d4a67f]"
              >
                Proceed
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleAddStaff}
                className="flex h-11 items-center justify-center rounded-lg border border-[#3b2513] px-5 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#3b2513]"
              >
                Save &amp; Add Another
              </button>
              <button
                type="button"
                onClick={handleAddStaff}
                className="flex h-11 w-40 items-center justify-center rounded-lg bg-[#3b2513] font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1]"
              >
                Add Staff
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
