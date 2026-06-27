"use client";

import { useState, useCallback } from "react";
import { ChevronDown, FileText, Trash2, X, Upload, UserPlus, CheckCircle2 } from "lucide-react";

import { STAFF_CLASS_OPTIONS, STAFF_ROLE_OPTIONS } from "@/lib/mock-data/staff";

// ── Types ───────────────────────────────────────────────────────────────────

type ModalView =
  | "choice"
  | "manual-step1"
  | "manual-step2"
  | "manual-step3"
  | "bulk-upload"
  | "bulk-preview"
  | "bulk-done";

type UploadedDoc = {
  id: string;
  name: string;
  size: string;
};

type BulkStaffRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  salary: number;
  deductions: number;
  netPay: number;
  bankName: string;
  accountNumber: string;
  selected: boolean;
};

// ── Mock extracted data from "Excel" ────────────────────────────────────────

const MOCK_EXTRACTED: BulkStaffRow[] = [
  { id: "be-1", name: "Adebayo Okafor", email: "adebayo.o@udebemcresh.com", phone: "+234 80 1234 5678", role: "Caregiver", salary: 180000, deductions: 23000, netPay: 157000, bankName: "GT Bank", accountNumber: "0123456789", selected: true },
  { id: "be-2", name: "Chidinma Nwosu", email: "chidinma.n@udebemcresh.com", phone: "+234 70 2345 6789", role: "Cook", salary: 150000, deductions: 18000, netPay: 132000, bankName: "Access Bank", accountNumber: "9876543210", selected: true },
  { id: "be-3", name: "Emeka Obi", email: "emeka.o@udebemcresh.com", phone: "+234 81 3456 7890", role: "Driver", salary: 120000, deductions: 15000, netPay: 105000, bankName: "First Bank", accountNumber: "5678901234", selected: true },
  { id: "be-4", name: "Fatima Abubakar", email: "fatima.a@udebemcresh.com", phone: "+234 90 4567 8901", role: "Caregiver", salary: 180000, deductions: 23000, netPay: 157000, bankName: "UBA", accountNumber: "3456789012", selected: true },
];

// ── Helpers ─────────────────────────────────────────────────────────────────

function formatCurrency(value: number) {
  return `₦${value.toLocaleString("en-NG")}`;
}

function DropdownSelect({
  label,
  value,
  options,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex flex-col gap-1">
      <label className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-[52px] w-full items-center justify-between rounded-xl border border-[#dcdcdc] px-4 text-left font-[family-name:var(--font-urbanist)] text-sm"
      >
        <span className={value ? "text-[#111]" : "text-[#7e7e7e]"}>
          {value || placeholder || "Select"}
        </span>
        <ChevronDown className="size-4 text-[#6b7280]" />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-30 mt-1 w-full max-h-48 overflow-y-auto rounded-2xl bg-white p-2 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.12)]">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="block w-full rounded-lg px-5 py-3 text-left font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#3b2513] hover:bg-[#faf2e1]"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Modal ──────────────────────────────────────────────────────────────

export function AddStaffModal({ onClose }: { onClose: () => void }) {
  const [view, setView] = useState<ModalView>("choice");

  // Manual form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [staffClass, setStaffClass] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [basicSalary, setBasicSalary] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [pensionPin, setPensionPin] = useState("");
  const [taxId, setTaxId] = useState("");
  const [taxEnabled, setTaxEnabled] = useState(false);
  const [taxMode, setTaxMode] = useState<"percent" | "fixed">("percent");
  const [taxValue, setTaxValue] = useState("");
  const [pensionEnabled, setPensionEnabled] = useState(false);
  const [pensionMode, setPensionMode] = useState<"percent" | "fixed">("percent");
  const [pensionValue, setPensionValue] = useState("");
  const [otherEnabled, setOtherEnabled] = useState(false);
  const [otherName, setOtherName] = useState("");
  const [otherMode, setOtherMode] = useState<"percent" | "fixed">("fixed");
  const [otherValue, setOtherValue] = useState("");
  const [idDoc, setIdDoc] = useState<UploadedDoc | null>(null);
  const [workDoc, setWorkDoc] = useState<UploadedDoc | null>(null);

  // Bulk state
  const [bulkFile, setBulkFile] = useState<UploadedDoc | null>(null);
  const [bulkRows, setBulkRows] = useState<BulkStaffRow[]>([]);

  const canStep1 = name.trim() !== "" && email.trim() !== "" && phone.trim() !== "" && role !== "";
  const canStep2 = employmentType !== "" && basicSalary.trim() !== "" && bankName.trim() !== "" && accountNumber.trim() !== "";

  const salaryNum = Number(basicSalary) || 0;
  const taxDeduction = taxEnabled ? (taxMode === "percent" ? Math.round(salaryNum * (Number(taxValue) || 0) / 100) : Number(taxValue) || 0) : 0;
  const pensionDeduction = pensionEnabled ? (pensionMode === "percent" ? Math.round(salaryNum * (Number(pensionValue) || 0) / 100) : Number(pensionValue) || 0) : 0;
  const otherDeduction = otherEnabled ? (otherMode === "percent" ? Math.round(salaryNum * (Number(otherValue) || 0) / 100) : Number(otherValue) || 0) : 0;
  const totalDeductions = taxDeduction + pensionDeduction + otherDeduction;
  const netPay = salaryNum - totalDeductions;

  const handleManualSubmit = useCallback(() => {
    onClose();
  }, [onClose]);

  const toggleBulkRow = (id: string) => {
    setBulkRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, selected: !r.selected } : r)),
    );
  };

  const toggleAllBulk = () => {
    const allSelected = bulkRows.every((r) => r.selected);
    setBulkRows((prev) => prev.map((r) => ({ ...r, selected: !allSelected })));
  };

  const confirmBulk = () => {
    setView("bulk-done");
  };

  const selectedBulkCount = bulkRows.filter((r) => r.selected).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="relative flex max-h-[90vh] w-full max-w-[640px] flex-col overflow-y-auto rounded-[20px] border-6 border-[#faf2e1] bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-[#e6ebf3] bg-white px-6 py-5">
          <div>
            <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#171f26]">
              {view === "choice" && "Add New Staff"}
              {view === "manual-step1" && "Staff Information"}
              {view === "manual-step2" && "Salary Details"}
              {view === "manual-step3" && "Documents (Optional)"}
              {view === "bulk-upload" && "Bulk Upload"}
              {view === "bulk-preview" && "Review Imported Staff"}
              {view === "bulk-done" && "Staff Added"}
            </h2>
            <p className="mt-1 font-[family-name:var(--font-nunito)] text-xs text-[#666]">
              {view === "choice" && "Choose how you'd like to add staff members"}
              {view === "manual-step1" && "1/3 — Basic information"}
              {view === "manual-step2" && "2/3 — Compensation & banking"}
              {view === "manual-step3" && "3/3 — Upload ID and work documents"}
              {view === "bulk-upload" && "Upload an Excel file with your staff data"}
              {view === "bulk-preview" && `${selectedBulkCount} of ${bulkRows.length} staff selected`}
              {view === "bulk-done" && "All selected staff have been added"}
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
        <div className="flex-1 px-6 py-5">
          {/* ── Choice Screen ─────────────────────────────────────── */}
          {view === "choice" && (
            <div className="flex flex-col gap-4 py-4">
              <button
                type="button"
                onClick={() => setView("manual-step1")}
                className="flex items-center gap-4 rounded-xl border border-[#e6ebf3] p-5 text-left transition-colors hover:border-[#3b2513] hover:bg-[#faf9f7]"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#edd9c0]">
                  <UserPlus className="size-6 text-[#3b2513]" />
                </div>
                <div>
                  <p className="font-[family-name:var(--font-merriweather)] text-sm font-bold text-[#2d1810]">
                    Manual Entry
                  </p>
                  <p className="mt-0.5 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
                    Add one staff member at a time with their full details including salary & bank info
                  </p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setView("bulk-upload")}
                className="flex items-center gap-4 rounded-xl border border-[#e6ebf3] p-5 text-left transition-colors hover:border-[#3b2513] hover:bg-[#faf9f7]"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#edd9c0]">
                  <Upload className="size-6 text-[#3b2513]" />
                </div>
                <div>
                  <p className="font-[family-name:var(--font-merriweather)] text-sm font-bold text-[#2d1810]">
                    Bulk Upload
                  </p>
                  <p className="mt-0.5 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
                    Import multiple staff from an Excel spreadsheet — names, salaries, bank details & more
                  </p>
                </div>
              </button>
            </div>
          )}

          {/* ── Manual Step 1: Staff Info ─────────────────────────── */}
          {view === "manual-step1" && (
            <div className="flex flex-col gap-4">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" className="h-[52px] w-full rounded-xl border border-[#dcdcdc] px-4 font-[family-name:var(--font-urbanist)] text-sm text-black outline-none placeholder:text-[#7e7e7e] focus:ring-2 focus:ring-[#c47b2c]" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email address" className="h-[52px] w-full rounded-xl border border-[#dcdcdc] px-4 font-[family-name:var(--font-urbanist)] text-sm text-black outline-none placeholder:text-[#7e7e7e] focus:ring-2 focus:ring-[#c47b2c]" />
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter phone number" className="h-[52px] w-full rounded-xl border border-[#dcdcdc] px-4 font-[family-name:var(--font-urbanist)] text-sm text-black outline-none placeholder:text-[#7e7e7e] focus:ring-2 focus:ring-[#c47b2c]" />
              <div className="h-px w-full bg-[#e6ebf3]" />
              <DropdownSelect label="Assign Role" value={role} options={STAFF_ROLE_OPTIONS} onChange={setRole} />
              <DropdownSelect label="Assign Class" value={staffClass} options={STAFF_CLASS_OPTIONS} onChange={setStaffClass} />
            </div>
          )}

          {/* ── Manual Step 2: Salary Details ─────────────────────── */}
          {view === "manual-step2" && (
            <div className="flex flex-col gap-4">
              <DropdownSelect
                label="Employment Type"
                value={employmentType}
                options={["Full time", "Contract", "Part time"]}
                onChange={setEmploymentType}
              />
              <div className="flex flex-col gap-1">
                <label className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">
                  Basic Salary
                </label>
                <input
                  type="number"
                  value={basicSalary}
                  onChange={(e) => setBasicSalary(e.target.value)}
                  placeholder="e.g. 180000"
                  className="h-[52px] w-full rounded-xl border border-[#dcdcdc] px-4 font-[family-name:var(--font-urbanist)] text-sm text-black outline-none placeholder:text-[#7e7e7e] focus:ring-2 focus:ring-[#c47b2c]"
                />
              </div>

              {/* ── Deductions ──────────────────────────────────── */}
              <div className="h-px w-full bg-[#e6ebf3]" />
              <p className="font-[family-name:var(--font-merriweather)] text-sm font-bold text-[#2d1810]">
                Deductions
              </p>

              {/* Tax */}
              <div className="flex flex-col gap-2 rounded-xl border border-[#e6ebf3] p-4">
                <div className="flex items-center justify-between">
                  <span className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">Tax</span>
                  <button type="button" onClick={() => setTaxEnabled((v) => !v)} className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${taxEnabled ? "bg-[#3b2513]" : "bg-[#d0d5dd]"}`}>
                    <span className={`inline-block size-5 rounded-full bg-white shadow transition-transform mt-0.5 ${taxEnabled ? "translate-x-5" : "translate-x-0.5"}`} />
                  </button>
                </div>
                {taxEnabled && (
                  <div className="flex gap-2">
                    <div className="flex rounded-lg border border-[#d0d5dd] overflow-hidden">
                      <button type="button" onClick={() => setTaxMode("percent")} className={`px-3 py-2 text-xs font-medium font-[family-name:var(--font-urbanist)] ${taxMode === "percent" ? "bg-[#3b2513] text-[#faf2e1]" : "bg-white text-[#6b7280]"}`}>%</button>
                      <button type="button" onClick={() => setTaxMode("fixed")} className={`px-3 py-2 text-xs font-medium font-[family-name:var(--font-urbanist)] ${taxMode === "fixed" ? "bg-[#3b2513] text-[#faf2e1]" : "bg-white text-[#6b7280]"}`}>₦</button>
                    </div>
                    <input type="number" value={taxValue} onChange={(e) => setTaxValue(e.target.value)} placeholder={taxMode === "percent" ? "e.g. 10" : "e.g. 18000"} className="h-10 flex-1 rounded-lg border border-[#dcdcdc] px-3 font-[family-name:var(--font-urbanist)] text-sm text-black outline-none placeholder:text-[#7e7e7e] focus:ring-1 focus:ring-[#c47b2c]" />
                  </div>
                )}
              </div>

              {/* Pension */}
              <div className="flex flex-col gap-2 rounded-xl border border-[#e6ebf3] p-4">
                <div className="flex items-center justify-between">
                  <span className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">Pension</span>
                  <button type="button" onClick={() => setPensionEnabled((v) => !v)} className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${pensionEnabled ? "bg-[#3b2513]" : "bg-[#d0d5dd]"}`}>
                    <span className={`inline-block size-5 rounded-full bg-white shadow transition-transform mt-0.5 ${pensionEnabled ? "translate-x-5" : "translate-x-0.5"}`} />
                  </button>
                </div>
                {pensionEnabled && (
                  <div className="flex gap-2">
                    <div className="flex rounded-lg border border-[#d0d5dd] overflow-hidden">
                      <button type="button" onClick={() => setPensionMode("percent")} className={`px-3 py-2 text-xs font-medium font-[family-name:var(--font-urbanist)] ${pensionMode === "percent" ? "bg-[#3b2513] text-[#faf2e1]" : "bg-white text-[#6b7280]"}`}>%</button>
                      <button type="button" onClick={() => setPensionMode("fixed")} className={`px-3 py-2 text-xs font-medium font-[family-name:var(--font-urbanist)] ${pensionMode === "fixed" ? "bg-[#3b2513] text-[#faf2e1]" : "bg-white text-[#6b7280]"}`}>₦</button>
                    </div>
                    <input type="number" value={pensionValue} onChange={(e) => setPensionValue(e.target.value)} placeholder={pensionMode === "percent" ? "e.g. 8" : "e.g. 14400"} className="h-10 flex-1 rounded-lg border border-[#dcdcdc] px-3 font-[family-name:var(--font-urbanist)] text-sm text-black outline-none placeholder:text-[#7e7e7e] focus:ring-1 focus:ring-[#c47b2c]" />
                  </div>
                )}
              </div>

              {/* Other */}
              <div className="flex flex-col gap-2 rounded-xl border border-[#e6ebf3] p-4">
                <div className="flex items-center justify-between">
                  <span className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">Other</span>
                  <button type="button" onClick={() => setOtherEnabled((v) => !v)} className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${otherEnabled ? "bg-[#3b2513]" : "bg-[#d0d5dd]"}`}>
                    <span className={`inline-block size-5 rounded-full bg-white shadow transition-transform mt-0.5 ${otherEnabled ? "translate-x-5" : "translate-x-0.5"}`} />
                  </button>
                </div>
                {otherEnabled && (
                  <div className="flex flex-col gap-2">
                    <input type="text" value={otherName} onChange={(e) => setOtherName(e.target.value)} placeholder="e.g. HMO, Housing Loan" className="h-10 w-full rounded-lg border border-[#dcdcdc] px-3 font-[family-name:var(--font-urbanist)] text-sm text-black outline-none placeholder:text-[#7e7e7e] focus:ring-1 focus:ring-[#c47b2c]" />
                    <div className="flex gap-2">
                      <div className="flex rounded-lg border border-[#d0d5dd] overflow-hidden">
                        <button type="button" onClick={() => setOtherMode("percent")} className={`px-3 py-2 text-xs font-medium font-[family-name:var(--font-urbanist)] ${otherMode === "percent" ? "bg-[#3b2513] text-[#faf2e1]" : "bg-white text-[#6b7280]"}`}>%</button>
                        <button type="button" onClick={() => setOtherMode("fixed")} className={`px-3 py-2 text-xs font-medium font-[family-name:var(--font-urbanist)] ${otherMode === "fixed" ? "bg-[#3b2513] text-[#faf2e1]" : "bg-white text-[#6b7280]"}`}>₦</button>
                      </div>
                      <input type="number" value={otherValue} onChange={(e) => setOtherValue(e.target.value)} placeholder={otherMode === "percent" ? "e.g. 5" : "e.g. 10000"} className="h-10 flex-1 rounded-lg border border-[#dcdcdc] px-3 font-[family-name:var(--font-urbanist)] text-sm text-black outline-none placeholder:text-[#7e7e7e] focus:ring-1 focus:ring-[#c47b2c]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Net Pay */}
              {salaryNum > 0 && (
                <div className="rounded-xl bg-[#faf5ee] border border-[#e6ebf3] p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">Total Deductions</span>
                    <span className="font-[family-name:var(--font-nunito)] text-sm font-bold text-[#ef4444]">-{formatCurrency(totalDeductions)}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between border-t border-[#e6ebf3] pt-2">
                    <span className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">Net Pay</span>
                    <span className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#3b2513]">{formatCurrency(netPay)}</span>
                  </div>
                </div>
              )}

              {/* Bank Details */}
              <div className="h-px w-full bg-[#e6ebf3]" />
              <p className="font-[family-name:var(--font-merriweather)] text-sm font-bold text-[#2d1810]">
                Bank Details
              </p>
              <div className="flex flex-col gap-1">
                <label className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">Bank Name</label>
                <input type="text" value={bankName} onChange={(e) => setBankName(e.target.value)} placeholder="e.g. GT Bank" className="h-[52px] w-full rounded-xl border border-[#dcdcdc] px-4 font-[family-name:var(--font-urbanist)] text-sm text-black outline-none placeholder:text-[#7e7e7e] focus:ring-2 focus:ring-[#c47b2c]" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">Account Number</label>
                <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="e.g. 0123456789" className="h-[52px] w-full rounded-xl border border-[#dcdcdc] px-4 font-[family-name:var(--font-urbanist)] text-sm text-black outline-none placeholder:text-[#7e7e7e] focus:ring-2 focus:ring-[#c47b2c]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">Pension PIN</label>
                  <input type="text" value={pensionPin} onChange={(e) => setPensionPin(e.target.value)} placeholder="PEN..." className="h-[52px] w-full rounded-xl border border-[#dcdcdc] px-4 font-[family-name:var(--font-urbanist)] text-sm text-black outline-none placeholder:text-[#7e7e7e] focus:ring-2 focus:ring-[#c47b2c]" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">Tax ID</label>
                  <input type="text" value={taxId} onChange={(e) => setTaxId(e.target.value)} placeholder="TIN..." className="h-[52px] w-full rounded-xl border border-[#dcdcdc] px-4 font-[family-name:var(--font-urbanist)] text-sm text-black outline-none placeholder:text-[#7e7e7e] focus:ring-2 focus:ring-[#c47b2c]" />
                </div>
              </div>
            </div>
          )}

          {/* ── Manual Step 3: Documents ──────────────────────────── */}
          {view === "manual-step3" && (
            <div className="flex flex-col gap-4">
              <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
                You can skip this step and add documents later.
              </p>
              <div className="flex flex-col gap-2">
                <p className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">
                  ID Verification <span className="text-[#6b7280] text-xs">(NIN, National ID, Driver&apos;s License or Passport)</span>
                </p>
                {idDoc ? (
                  <div className="flex items-center gap-3 rounded-xl border border-[#3b2513] bg-white p-4">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#edd9c0]">
                      <FileText className="size-4 text-[#3b2513]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-[family-name:var(--font-merriweather)] text-xs font-semibold text-[#6b7280]">{idDoc.name}</p>
                      <p className="font-[family-name:var(--font-nunito)] text-[10px] text-[#6b7280]">{idDoc.size}</p>
                    </div>
                    <button type="button" onClick={() => setIdDoc(null)} className="rounded-lg p-1.5 text-[#cd3030] hover:bg-[#fff5f5]">
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIdDoc({ id: "id", name: "National Identity Number (NIN)", size: "JPEG 650 KB" })}
                    className="flex w-full items-center gap-4 rounded-xl border border-[#ccd2dc] bg-white p-4 text-left hover:border-[#3b2513]"
                  >
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#edd9c0]">
                      <FileText className="size-3.5 text-[#3b2513]" />
                    </div>
                    <div>
                      <p className="font-[family-name:var(--font-merriweather)] text-xs font-semibold text-[#6b7280]">
                        Drag file here or <span className="text-[#3b2513] underline">Tap to Upload</span>
                      </p>
                      <p className="font-[family-name:var(--font-nunito)] text-[10px] text-[#6b7280]">PDF, JPEG. Max 650 KB</p>
                    </div>
                  </button>
                )}
              </div>
              <div className="h-px w-full bg-[#e6ebf3]" />
              <div className="flex flex-col gap-2">
                <p className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">Work Experience</p>
                {workDoc ? (
                  <div className="flex items-center gap-3 rounded-xl border border-[#3b2513] bg-white p-4">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#edd9c0]">
                      <FileText className="size-4 text-[#3b2513]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-[family-name:var(--font-merriweather)] text-xs font-semibold text-[#6b7280]">{workDoc.name}</p>
                      <p className="font-[family-name:var(--font-nunito)] text-[10px] text-[#6b7280]">{workDoc.size}</p>
                    </div>
                    <button type="button" onClick={() => setWorkDoc(null)} className="rounded-lg p-1.5 text-[#cd3030] hover:bg-[#fff5f5]">
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setWorkDoc({ id: "work", name: "Work Experience Document", size: "PDF 650 KB" })}
                    className="flex w-full items-center gap-4 rounded-xl border border-[#ccd2dc] bg-white p-4 text-left hover:border-[#3b2513]"
                  >
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#edd9c0]">
                      <FileText className="size-3.5 text-[#3b2513]" />
                    </div>
                    <div>
                      <p className="font-[family-name:var(--font-merriweather)] text-xs font-semibold text-[#6b7280]">
                        Drag file here or <span className="text-[#3b2513] underline">Tap to Upload</span>
                      </p>
                      <p className="font-[family-name:var(--font-nunito)] text-[10px] text-[#6b7280]">PDF, JPEG. Max 650 KB</p>
                    </div>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ── Bulk Upload ───────────────────────────────────────── */}
          {view === "bulk-upload" && (
            <div className="flex flex-col gap-4 py-2">
              {bulkFile ? (
                <div className="flex items-center gap-3 rounded-xl border border-[#3b2513] bg-white p-4">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#edd9c0]">
                    <FileText className="size-4 text-[#3b2513]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-[family-name:var(--font-merriweather)] text-xs font-semibold text-[#6b7280]">{bulkFile.name}</p>
                    <p className="font-[family-name:var(--font-nunito)] text-[10px] text-[#6b7280]">{bulkFile.size}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="relative h-2 flex-1 rounded-full bg-[#f4f5f6]">
                        <div className="absolute inset-y-0 left-0 w-full rounded-full bg-[#3b2513]" />
                      </div>
                      <span className="font-[family-name:var(--font-urbanist)] text-xs font-medium text-[#6b7280]">100%</span>
                    </div>
                  </div>
                  <button type="button" onClick={() => setBulkFile(null)} className="rounded-lg p-1.5 text-[#cd3030] hover:bg-[#fff5f5]">
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setBulkFile({ id: "bulk", name: "Staff_Import_October.xlsx", size: "Excel 24 KB" })}
                  className="flex w-full flex-col items-center gap-3 rounded-xl border-2 border-dashed border-[#ccd2dc] bg-white py-12 text-center hover:border-[#3b2513]"
                >
                  <div className="flex size-14 items-center justify-center rounded-full bg-[#edd9c0]">
                    <Upload className="size-6 text-[#3b2513]" />
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-merriweather)] text-sm font-semibold text-[#6b7280]">
                      Drag &amp; drop your Excel file here
                    </p>
                    <p className="mt-1 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
                      or <span className="text-[#3b2513] underline">browse files</span>
                    </p>
                    <p className="mt-2 font-[family-name:var(--font-nunito)] text-[10px] text-[#9ca3af]">
                      Supports .xlsx, .xls, .csv — Max 5 MB
                    </p>
                  </div>
                </button>
              )}
            </div>
          )}

          {/* ── Bulk Preview ──────────────────────────────────────── */}
          {view === "bulk-preview" && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
                  The system extracted {bulkRows.length} staff from your file. Review and confirm.
                </p>
                <button
                  type="button"
                  onClick={toggleAllBulk}
                  className="font-[family-name:var(--font-nunito)] text-xs font-medium text-[#3b2513] underline"
                >
                  {bulkRows.every((r) => r.selected) ? "Deselect All" : "Select All"}
                </button>
              </div>

              {/* Desktop table */}
              <div className="hidden overflow-x-auto rounded-xl border border-[#e6ebf3] lg:block">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-[#edd9c0]">
                      <th className="px-4 py-3 w-10">
                        <input type="checkbox" checked={bulkRows.length > 0 && bulkRows.every((r) => r.selected)} onChange={toggleAllBulk} className="accent-[#3b2513]" />
                      </th>
                      {["Staff", "Role", "Salary", "Deductions", "Net Pay", "Bank", "Account"].map((h) => (
                        <th key={h} className="px-4 py-3 text-xs font-semibold font-[family-name:var(--font-nunito)] text-[#2d1810]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eaecf0]">
                    {bulkRows.map((row) => (
                      <tr key={row.id} onClick={() => toggleBulkRow(row.id)} className={`cursor-pointer transition-colors ${row.selected ? "bg-[#faf5ee]" : "hover:bg-[#faf9f7]"}`}>
                        <td className="px-4 py-3">
                          <input type="checkbox" checked={row.selected} onChange={() => toggleBulkRow(row.id)} onClick={(e) => e.stopPropagation()} className="accent-[#3b2513]" />
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">{row.name}</p>
                          <p className="text-[10px] text-[#858c98]">{row.email}</p>
                        </td>
                        <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{row.role}</td>
                        <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{formatCurrency(row.salary)}</td>
                        <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#ef4444]">-{formatCurrency(row.deductions)}</td>
                        <td className="px-4 py-3 text-sm font-bold font-[family-name:var(--font-nunito)] text-[#3b2513]">{formatCurrency(row.netPay)}</td>
                        <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{row.bankName}</td>
                        <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{row.accountNumber}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile card list */}
              <div className="flex flex-col gap-2 lg:hidden">
                {bulkRows.map((row) => (
                  <div key={row.id} onClick={() => toggleBulkRow(row.id)} className={`rounded-xl border p-3 cursor-pointer transition-colors ${row.selected ? "border-[#3b2513] bg-[#faf5ee]" : "border-[#eaecf0]"}`}>
                    <div className="flex items-center gap-3">
                      <input type="checkbox" checked={row.selected} onChange={() => toggleBulkRow(row.id)} onClick={(e) => e.stopPropagation()} className="accent-[#3b2513]" />
                      <div className="flex-1">
                        <p className="text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">{row.name}</p>
                        <p className="text-[10px] text-[#858c98]">{row.role}</p>
                        <p className="text-[10px] text-[#858c98]">{formatCurrency(row.salary)} salary • -{formatCurrency(row.deductions)} deductions</p>
                        <p className="text-xs font-bold text-[#3b2513]">Net: {formatCurrency(row.netPay)}</p>
                        <p className="text-[10px] text-[#858c98]">{row.bankName} — {row.accountNumber}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Bulk Done ─────────────────────────────────────────── */}
          {view === "bulk-done" && (
            <div className="flex flex-col items-center py-8 text-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ecfff8]">
                <CheckCircle2 className="size-8 text-[#009061]" />
              </div>
              <div>
                <p className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
                  {selectedBulkCount} Staff Added
                </p>
                <p className="mt-1 font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
                  All selected staff have been imported and are ready for payroll.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 z-10 flex items-center justify-end gap-3 border-t border-[#e6ebf3] bg-white px-6 py-4">
          {view === "choice" && (
            <button type="button" onClick={onClose} className="flex h-11 items-center justify-center rounded-lg border border-[#3b2513] px-5 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#3b2513]">
              Cancel
            </button>
          )}

          {view === "manual-step1" && (
            <>
              <button type="button" onClick={() => setView("choice")} className="flex h-11 items-center justify-center rounded-lg border border-[#3b2513] px-5 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#3b2513]">
                Back
              </button>
              <button type="button" onClick={() => setView("manual-step2")} disabled={!canStep1} className="flex h-11 w-40 items-center justify-center rounded-lg bg-[#3b2513] font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1] disabled:cursor-not-allowed disabled:bg-[#e0bfa0]">
                Continue
              </button>
            </>
          )}

          {view === "manual-step2" && (
            <>
              <button type="button" onClick={() => setView("manual-step1")} className="flex h-11 items-center justify-center rounded-lg border border-[#3b2513] px-5 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#3b2513]">
                Back
              </button>
              <button type="button" onClick={() => setView("manual-step3")} disabled={!canStep2} className="flex h-11 w-40 items-center justify-center rounded-lg bg-[#3b2513] font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1] disabled:cursor-not-allowed disabled:bg-[#e0bfa0]">
                Continue
              </button>
            </>
          )}

          {view === "manual-step3" && (
            <>
              <button type="button" onClick={handleManualSubmit} className="flex h-11 items-center justify-center rounded-lg border border-[#3b2513] px-5 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#3b2513]">
                Save &amp; Add Another
              </button>
              <button type="button" onClick={handleManualSubmit} className="flex h-11 w-40 items-center justify-center rounded-lg bg-[#3b2513] font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1]">
                Add Staff
              </button>
            </>
          )}

          {view === "bulk-upload" && (
            <>
              <button type="button" onClick={() => setView("choice")} className="flex h-11 items-center justify-center rounded-lg border border-[#3b2513] px-5 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#3b2513]">
                Back
              </button>
              <button
                type="button"
                disabled={!bulkFile}
                onClick={() => {
                  setBulkRows(MOCK_EXTRACTED);
                  setView("bulk-preview");
                }}
                className="flex h-11 w-40 items-center justify-center rounded-lg bg-[#3b2513] font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1] disabled:cursor-not-allowed disabled:bg-[#e0bfa0]"
              >
                Extract &amp; Review
              </button>
            </>
          )}

          {view === "bulk-preview" && (
            <>
              <button type="button" onClick={() => setView("bulk-upload")} className="flex h-11 items-center justify-center rounded-lg border border-[#3b2513] px-5 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#3b2513]">
                Back
              </button>
              <button
                type="button"
                disabled={selectedBulkCount === 0}
                onClick={confirmBulk}
                className="flex h-11 w-40 items-center justify-center rounded-lg bg-[#3b2513] font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1] disabled:cursor-not-allowed disabled:bg-[#e0bfa0]"
              >
                Confirm &amp; Add
              </button>
            </>
          )}

          {view === "bulk-done" && (
            <button type="button" onClick={onClose} className="flex h-11 w-40 items-center justify-center rounded-lg bg-[#3b2513] font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1]">
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
