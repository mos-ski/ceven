"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown, X, Search, Plus } from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────────

type ScheduleType = "Daily" | "Specific Days" | "Every X Hours/Days" | "As Needed";

type Form = {
  feedingTypes: string[];
  favoriteMeals: string;
  dislikedFoods: string;
  dietaryRestrictions: string[];
  feedingSchedule: ScheduleType | "";
  foodType: string;
  feedingTime: string;
};

// ─── Constants ─────────────────────────────────────────────────────────────────

const FEEDING_TYPES = ["Exclusive Breastfeeding", "Formula", "Mixed", "Solid foods"];
const DIETARY_RESTRICTIONS = ["Vegetarian", "Halal", "Gluten-free", "Lactose-free"];
const SCHEDULE_TYPES: ScheduleType[] = ["Daily", "Specific Days", "Every X Hours/Days", "As Needed"];

// ─── Shared components ─────────────────────────────────────────────────────────

function ModalShell({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/30">
      <div className="w-full max-w-[430px] rounded-t-2xl bg-white pb-8 pt-5">
        <div className="mb-1 flex items-center justify-between px-5">
          <h3 className="text-base font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
            <X size={14} className="text-gray-500" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function MultiSelectModal({
  title, options, selected, onToggle, onClose,
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
  onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const filtered = options.filter((o) => o.toLowerCase().includes(q.toLowerCase()));
  return (
    <ModalShell title={title} onClose={onClose}>
      <div className="px-5 pb-2">
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
          <Search size={14} className="text-gray-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none" />
        </div>
      </div>
      <div className="max-h-64 overflow-y-auto">
        {filtered.map((opt) => (
          <button key={opt} onClick={() => onToggle(opt)} className="flex w-full items-center gap-3 px-5 py-3 text-left hover:bg-gray-50">
            <div className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-colors ${selected.includes(opt) ? "border-cg-brand bg-cg-brand" : "border-gray-300"}`}>
              {selected.includes(opt) && <svg viewBox="0 0 10 8" width="10" fill="none"><path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>}
            </div>
            <span className="text-sm text-gray-700">{opt}</span>
          </button>
        ))}
      </div>
      <div className="px-5 pt-4">
        <button onClick={onClose} className="w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white">
          Continue
        </button>
      </div>
    </ModalShell>
  );
}

function SingleSelectModal({
  title, options, selected, onSelect, onClose,
}: {
  title: string;
  options: string[];
  selected: string;
  onSelect: (v: string) => void;
  onClose: () => void;
}) {
  return (
    <ModalShell title={title} onClose={onClose}>
      <div className="max-h-72 overflow-y-auto">
        {options.map((opt) => (
          <button key={opt} onClick={() => { onSelect(opt); onClose(); }} className="flex w-full items-center justify-between px-5 py-3.5 text-left hover:bg-gray-50">
            <span className={`text-sm ${selected === opt ? "font-semibold text-cg-brand" : "text-gray-700"}`}>{opt}</span>
            <div className={`h-4 w-4 rounded-full border-2 transition-colors ${selected === opt ? "border-cg-brand bg-cg-brand" : "border-gray-300"}`} />
          </button>
        ))}
      </div>
      <div className="px-5 pt-4">
        <button onClick={onClose} className="w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white">
          Continue
        </button>
      </div>
    </ModalShell>
  );
}

// ─── Field components ──────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-sm font-medium text-gray-700">{children}</label>;
}

function Badges({ items, onRemove }: { items: string[]; onRemove: (v: string) => void }) {
  if (!items.length) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="flex items-center gap-1.5 rounded-full bg-cg-brand px-3 py-1 text-xs font-medium text-white">
          {item}
          <button onClick={() => onRemove(item)}><X size={10} /></button>
        </span>
      ))}
    </div>
  );
}

function FieldButton({ label, value, onClick }: { label: string; value: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-left text-sm">
      <span className={value ? "text-gray-800" : "text-gray-300"}>{value || label}</span>
      <ChevronDown size={16} className="text-gray-400" />
    </button>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function FeedingPage() {
  const router = useRouter();
  const [form, setForm] = useState<Form>({
    feedingTypes: [],
    favoriteMeals: "",
    dislikedFoods: "",
    dietaryRestrictions: [],
    feedingSchedule: "",
    foodType: "",
    feedingTime: "",
  });

  const [modal, setModal] = useState<"feedingType" | "dietary" | "schedule" | null>(null);

  function toggle<K extends "feedingTypes" | "dietaryRestrictions">(key: K, val: string) {
    setForm((prev) => {
      const arr = prev[key] as string[];
      return { ...prev, [key]: arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val] };
    });
  }

  return (
    <>
      {modal === "feedingType" && (
        <MultiSelectModal
          title="Select Feeding Type"
          options={FEEDING_TYPES}
          selected={form.feedingTypes}
          onToggle={(v) => toggle("feedingTypes", v)}
          onClose={() => setModal(null)}
        />
      )}
      {modal === "dietary" && (
        <MultiSelectModal
          title="Select Dietary Restrictions"
          options={DIETARY_RESTRICTIONS}
          selected={form.dietaryRestrictions}
          onToggle={(v) => toggle("dietaryRestrictions", v)}
          onClose={() => setModal(null)}
        />
      )}
      {modal === "schedule" && (
        <SingleSelectModal
          title="Select Feeding Schedule"
          options={SCHEDULE_TYPES}
          selected={form.feedingSchedule}
          onSelect={(v) => setForm((p) => ({ ...p, feedingSchedule: v as ScheduleType }))}
          onClose={() => setModal(null)}
        />
      )}

      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
        {/* Brown header */}
        <div className="relative shrink-0 overflow-hidden bg-cg-brand px-6 pb-8 pt-4">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -left-6 bottom-0 h-24 w-24 rounded-full bg-white/5" />
          <button onClick={() => router.back()} className="relative mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
            <ArrowLeft size={16} className="text-white" />
          </button>
          <div className="relative flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-merriweather)" }}>
                Let&apos;s Set Up Your Child&apos;s Profile
              </h1>
              <p className="mt-1 text-sm text-white/70">Share any feeding preferences or dietary requirements.</p>
            </div>
            <div className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white/40 bg-white/20">
              <span className="text-xs font-bold text-white">2/3</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto bg-white px-6 py-6">
          <div className="flex flex-col gap-5">

            {/* Feeding Type */}
            <div>
              <Label>Feeding Type <span className="text-red-500">*</span></Label>
              <FieldButton label="Select" value={form.feedingTypes.join(", ")} onClick={() => setModal("feedingType")} />
              <Badges items={form.feedingTypes} onRemove={(v) => toggle("feedingTypes", v)} />
            </div>

            {/* Favorite Meals */}
            <div>
              <Label>Favorite Meals / Snacks</Label>
              <input
                value={form.favoriteMeals}
                onChange={(e) => setForm((p) => ({ ...p, favoriteMeals: e.target.value }))}
                placeholder="Enter child's favorite meals / snacks"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none"
              />
            </div>

            {/* Disliked Foods */}
            <div>
              <Label>Disliked Foods</Label>
              <input
                value={form.dislikedFoods}
                onChange={(e) => setForm((p) => ({ ...p, dislikedFoods: e.target.value }))}
                placeholder="E.g. refuses to eat, intolerances"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none"
              />
            </div>

            {/* Dietary Restrictions */}
            <div>
              <Label>Dietary Restriction</Label>
              <FieldButton label="Select" value={form.dietaryRestrictions.join(", ")} onClick={() => setModal("dietary")} />
              <Badges items={form.dietaryRestrictions} onRemove={(v) => toggle("dietaryRestrictions", v)} />
            </div>

            {/* Feeding Schedule */}
            <div>
              <Label>Feeding Schedule</Label>
              <FieldButton label="Select" value={form.feedingSchedule} onClick={() => setModal("schedule")} />
            </div>

            {/* Food Type */}
            <div>
              <Label>Food Type</Label>
              <input
                value={form.foodType}
                onChange={(e) => setForm((p) => ({ ...p, foodType: e.target.value }))}
                placeholder="Enter food type"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none"
              />
            </div>

            {/* Time + Add New Schedule */}
            <div>
              <Label>Time</Label>
              <div className="flex items-center gap-3">
                <input
                  value={form.feedingTime}
                  onChange={(e) => setForm((p) => ({ ...p, feedingTime: e.target.value }))}
                  placeholder="-- : --"
                  className="flex-1 rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none"
                />
                <button className="flex items-center gap-1.5 text-sm font-medium text-cg-brand">
                  <Plus size={14} />
                  Add New Schedule
                </button>
              </div>
            </div>

            <button
              onClick={() => router.push("/parent/child/development")}
              className="mt-2 w-full rounded-lg bg-cg-brand py-3 text-sm font-semibold text-white"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
