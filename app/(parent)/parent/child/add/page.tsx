"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, ChevronDown, Calendar, Upload, X, CheckCircle2,
  ChevronLeft, ChevronRight,
} from "lucide-react";

type Form = {
  firstName: string;
  lastName: string;
  nickName: string;
  dob: string;
  gender: string;
  photo: File | null;
};

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function parseDob(dob: string): { day: number; month: number; year: number } | null {
  if (!dob) return null;
  const [d, m, y] = dob.split("-").map(Number);
  return { day: d, month: m - 1, year: y };
}

// ─── Calendar Picker ───────────────────────────────────────────────────────────
function CalendarPicker({
  value,
  onChange,
  onClose,
}: {
  value: string;
  onChange: (v: string) => void;
  onClose: () => void;
}) {
  const parsed = parseDob(value);
  const today = new Date();
  const [month, setMonth] = useState(parsed?.month ?? today.getMonth());
  const [year, setYear] = useState(parsed?.year ?? today.getFullYear());

  const days = getDaysInMonth(year, month);
  const firstDay = new Date(year, month, 1).getDay();
  const selectedDay = parsed && parsed.month === month && parsed.year === year ? parsed.day : null;

  function prev() {
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  }
  function next() {
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
  }
  function select(day: number) {
    const mm = String(month + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    onChange(`${dd}-${mm}-${year}`);
    onClose();
  }

  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="mx-6 w-full max-w-[342px] rounded-2xl bg-white p-5 shadow-xl">
        {/* Close */}
        <div className="mb-4 flex justify-end">
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
            <X size={14} className="text-gray-500" />
          </button>
        </div>

        {/* Month/Year nav */}
        <div className="mb-4 flex items-center justify-between">
          <button onClick={prev}>
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <p className="font-semibold text-gray-800">{MONTHS[month]} {year}</p>
          <button onClick={next}>
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Day grid */}
        <div className="grid grid-cols-7 gap-y-2 text-center text-sm">
          {["S","M","T","W","T","F","S"].map((d, i) => (
            <div key={i} className="pb-1 text-[11px] text-gray-400">{d}</div>
          ))}
          {cells.map((cell, i) =>
            cell === null ? (
              <div key={i} />
            ) : (
              <button
                key={i}
                onClick={() => select(cell)}
                className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors ${
                  selectedDay === cell
                    ? "bg-cg-brand font-bold text-white"
                    : "text-gray-700 hover:bg-cg-quick-action"
                }`}
              >
                {cell}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Gender Picker ──────────────────────────────────────────────────────────────
function GenderPicker({ value, onChange, onClose }: { value: string; onChange: (v: string) => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="mx-6 w-full max-w-[342px] rounded-2xl bg-white p-5 shadow-xl">
        <div className="mb-4 flex justify-end">
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
            <X size={14} className="text-gray-500" />
          </button>
        </div>
        {["Male", "Female", "Other"].map((g) => (
          <button
            key={g}
            onClick={() => { onChange(g); onClose(); }}
            className={`flex w-full items-center justify-between border-b border-gray-100 py-3 text-sm last:border-0 ${value === g ? "font-semibold text-cg-brand" : "text-gray-700"}`}
          >
            {g}
            {value === g && <CheckCircle2 size={16} className="text-cg-brand" />}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Success Modal ──────────────────────────────────────────────────────────────
function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="mx-6 w-full max-w-[342px] rounded-2xl bg-white px-8 py-10 shadow-xl text-center">
        <button onClick={onClose} className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
          <X size={14} className="text-gray-500" />
        </button>
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cg-quick-action">
            <CheckCircle2 size={36} className="text-cg-brand" />
          </div>
        </div>
        <h2 className="mb-2 text-xl font-bold text-gray-800" style={{ fontFamily: "var(--font-merriweather)" }}>
          Congratulations
        </h2>
        <p className="text-sm text-gray-500">Your child&apos;s profile has been successfully created.</p>
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-cg-brand py-3 text-sm font-semibold text-white"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────────
export default function AddChildPage() {
  const router = useRouter();
  const [form, setForm] = useState<Form>({ firstName: "", lastName: "", nickName: "", dob: "", gender: "", photo: null });
  const [showCalendar, setShowCalendar] = useState(false);
  const [showGender, setShowGender] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);

  const set = (key: keyof Form, value: string | File | null) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    set("photo", file);
    setUploading(true);
    setTimeout(() => setUploading(false), 600);
  }

  function handleContinue() {
    if (!form.firstName || !form.lastName || !form.dob || !form.gender) return;
    setShowSuccess(true);
  }

  const canContinue = !!form.firstName && !!form.lastName && !!form.dob && !!form.gender;

  return (
    <>
      {showCalendar && (
        <CalendarPicker
          value={form.dob}
          onChange={(v) => set("dob", v)}
          onClose={() => setShowCalendar(false)}
        />
      )}
      {showGender && (
        <GenderPicker
          value={form.gender}
          onChange={(v) => set("gender", v)}
          onClose={() => setShowGender(false)}
        />
      )}
      {showSuccess && (
        <SuccessModal
          onClose={() => {
            setShowSuccess(false);
            router.push("/parent/child/health");
          }}
        />
      )}

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {/* Brown header */}
        <div className="shrink-0 bg-cg-brand px-6 pb-8 pt-4">
          <button onClick={() => router.back()} className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
            <ArrowLeft size={16} className="text-white" />
          </button>
          <h1 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-merriweather)" }}>
            Bring Your Child&apos;s Day to Life
          </h1>
          <p className="mt-1 text-sm text-white/70">Create their profile now!</p>
        </div>

        {/* Form card */}
        <div className="flex-1 overflow-y-auto bg-white px-6 py-6">
          <div className="flex flex-col gap-5">
            {/* First Name */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                value={form.firstName}
                onChange={(e) => set("firstName", e.target.value)}
                placeholder="Enter child's first name"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-300 focus:border-cg-brand focus:outline-none"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                value={form.lastName}
                onChange={(e) => set("lastName", e.target.value)}
                placeholder="Enter child's last name"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-300 focus:border-cg-brand focus:outline-none"
              />
            </div>

            {/* Nick Name */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Nick Name</label>
              <input
                value={form.nickName}
                onChange={(e) => set("nickName", e.target.value)}
                placeholder="Enter child's nick name"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-300 focus:border-cg-brand focus:outline-none"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <button
                onClick={() => setShowCalendar(true)}
                className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-800"
              >
                <span className={form.dob ? "text-gray-800" : "text-gray-300"}>{form.dob || "Select"}</span>
                <Calendar size={16} className="text-gray-400" />
              </button>
            </div>

            {/* Gender */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Gender <span className="text-red-500">*</span>
              </label>
              <button
                onClick={() => setShowGender(true)}
                className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-800"
              >
                <span className={form.gender ? "text-gray-800" : "text-gray-300"}>{form.gender || "Select"}</span>
                <ChevronDown size={16} className="text-gray-400" />
              </button>
            </div>

            {/* Photo */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Photo</label>
              {form.photo ? (
                <div className="rounded-lg border border-gray-200 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cg-quick-action">
                      <Upload size={16} className="text-cg-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium text-gray-800">{form.photo.name}</p>
                      <p className="text-xs text-gray-400">{(form.photo.size / 1024).toFixed(0)} KB</p>
                    </div>
                    {!uploading && <CheckCircle2 size={18} className="shrink-0 text-cg-brand" />}
                  </div>
                  {uploading ? (
                    <div className="mt-2 h-1.5 rounded-full bg-gray-100">
                      <div className="h-full w-1/2 animate-pulse rounded-full bg-cg-accent" />
                    </div>
                  ) : (
                    <div className="mt-2 h-1.5 rounded-full bg-gray-100">
                      <div className="h-full w-full rounded-full bg-cg-brand" />
                    </div>
                  )}
                </div>
              ) : (
                <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-gray-200 py-6 text-center">
                  <Upload size={20} className="text-gray-400" />
                  <p className="text-sm text-gray-500">
                    <span className="font-medium text-cg-brand">Tap to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">PNG or JPG (max. 5mb)</p>
                  <input type="file" accept="image/*" className="sr-only" onChange={handleFile} />
                </label>
              )}
            </div>

            <button
              onClick={handleContinue}
              disabled={!canContinue}
              className={`mt-2 w-full rounded-lg py-3 text-sm font-semibold text-white transition-opacity ${
                canContinue ? "bg-cg-brand" : "bg-cg-brand/40"
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
