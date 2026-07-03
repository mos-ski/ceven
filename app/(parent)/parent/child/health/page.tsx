"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown, X, Plus, Search } from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────────
type ScheduleType = "Daily" | "Specific Days" | "Every X Hours/Days" | "As Needed";
const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

type TimeEntry = { hours: string; minutes: string; period: "am" | "pm" };
type Medication = {
  id: string;
  name: string;
  dosage: string;
  scheduleType: ScheduleType;
  days: string[];
  times: TimeEntry[];
  intervalValue: string;
  intervalUnit: "Hours" | "Days";
  notes: string;
};

type HealthForm = {
  allergies: string[];
  conditions: string[];
  bloodGroup: string;
  medications: Medication[];
  paediatricianName: string;
  paediatricianPhone: string;
  paediatricianClinic: string;
  immunization: Record<string, "Done" | "Pending" | "Not Applicable" | "">;
};

// ─── Constants ─────────────────────────────────────────────────────────────────
const ALLERGY_OPTIONS = ["None", "Nuts", "Milk", "Egg", "Shellfish", "Others"];
const CONDITION_OPTIONS = ["Asthma", "Sickle Cell", "Eczema", "Others"];
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const SCHEDULE_TYPES: ScheduleType[] = ["Daily", "Specific Days", "Every X Hours/Days", "As Needed"];
const VACCINES = ["BCG", "Polio", "DPT", "Hepatitis B", "Yellow Fever", "Measles"];
const IMMUN_STATUSES = ["Done", "Pending", "Not Applicable"] as const;

// ─── Reusable Modal Shell ───────────────────────────────────────────────────────
function ModalShell({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 sm:items-center">
      <div className="w-full max-w-[375px] rounded-t-2xl bg-white pb-8 pt-5 sm:rounded-2xl">
        <div className="mb-4 flex items-center justify-between px-5">
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

// ─── Checkbox Select Modal ──────────────────────────────────────────────────────
function MultiSelectModal({
  title, options, selected, onToggle, onClose,
}: {
  title: string; options: string[]; selected: string[]; onToggle: (v: string) => void; onClose: () => void;
}) {
  return (
    <ModalShell title={title} onClose={onClose}>
      <div className="mx-5 mb-4 rounded-xl border border-gray-100">
        {options.map((opt, i) => (
          <label
            key={opt}
            className={`flex cursor-pointer items-center gap-3 px-4 py-3 ${i < options.length - 1 ? "border-b border-gray-100" : ""}`}
          >
            <input
              type="checkbox"
              checked={selected.includes(opt)}
              onChange={() => onToggle(opt)}
              className="h-4 w-4 rounded border-gray-300 accent-cg-brand"
            />
            <span className="text-sm text-gray-700">{opt}</span>
          </label>
        ))}
      </div>
      <div className="px-5">
        <button onClick={onClose} className="w-full rounded-lg bg-cg-brand py-3 text-sm font-semibold text-white">
          Continue
        </button>
      </div>
    </ModalShell>
  );
}

// ─── Radio Select Modal ─────────────────────────────────────────────────────────
function RadioSelectModal({
  title, options, selected, onChange, onClose,
}: {
  title: string; options: string[]; selected: string; onChange: (v: string) => void; onClose: () => void;
}) {
  return (
    <ModalShell title={title} onClose={onClose}>
      <div className="mx-5 mb-4 rounded-xl border border-gray-100">
        {options.map((opt, i) => (
          <label
            key={opt}
            className={`flex cursor-pointer items-center gap-3 px-4 py-3 ${i < options.length - 1 ? "border-b border-gray-100" : ""}`}
          >
            <input
              type="radio"
              checked={selected === opt}
              onChange={() => { onChange(opt); onClose(); }}
              className="h-4 w-4 accent-cg-brand"
            />
            <span className="text-sm text-gray-700">{opt}</span>
          </label>
        ))}
      </div>
    </ModalShell>
  );
}

// ─── Schedule Type Dropdown ─────────────────────────────────────────────────────
function ScheduleDropdown({ value, onChange, onClose }: { value: ScheduleType; onChange: (v: ScheduleType) => void; onClose: () => void }) {
  return (
    <div className="absolute left-0 top-full z-20 mt-1 w-full rounded-xl border border-gray-100 bg-white shadow-md">
      {SCHEDULE_TYPES.map((type) => (
        <button
          key={type}
          onClick={() => { onChange(type); onClose(); }}
          className="flex w-full items-center px-4 py-3 text-left text-sm text-gray-700 last:border-0 hover:bg-cg-quick-action border-b border-gray-100"
        >
          {type}
        </button>
      ))}
    </div>
  );
}

// ─── Interval Unit Dropdown ─────────────────────────────────────────────────────
function IntervalDropdown({ onChange, onClose }: { onChange: (v: "Hours" | "Days") => void; onClose: () => void }) {
  return (
    <div className="absolute right-0 top-full z-20 mt-1 w-28 rounded-xl border border-gray-100 bg-white shadow-md">
      {["Hours", "Days"].map((unit) => (
        <button
          key={unit}
          onClick={() => { onChange(unit as "Hours" | "Days"); onClose(); }}
          className="flex w-full items-center px-4 py-3 text-left text-sm text-gray-700 border-b last:border-0 border-gray-100 hover:bg-cg-quick-action"
        >
          {unit}
        </button>
      ))}
    </div>
  );
}

// ─── Medication Modal ───────────────────────────────────────────────────────────
function MedicationModal({ onAdd, onClose }: { onAdd: (m: Medication) => void; onClose: () => void }) {
  const [med, setMed] = useState<Medication>({
    id: Date.now().toString(),
    name: "",
    dosage: "",
    scheduleType: "Daily",
    days: [],
    times: [{ hours: "10", minutes: "00", period: "am" }],
    intervalValue: "8",
    intervalUnit: "Hours",
    notes: "",
  });
  const [showScheduleDrop, setShowScheduleDrop] = useState(false);
  const [showIntervalDrop, setShowIntervalDrop] = useState(false);

  const set = <K extends keyof Medication>(k: K, v: Medication[K]) =>
    setMed((prev) => ({ ...prev, [k]: v }));

  function toggleDay(day: string) {
    set("days", med.days.includes(day) ? med.days.filter((d) => d !== day) : [...med.days, day]);
  }

  function addTime() {
    set("times", [...med.times, { hours: "10", minutes: "00", period: "am" }]);
  }

  function canAdd() { return !!med.name && !!med.dosage; }

  return (
    <ModalShell title="Add Medication" onClose={onClose}>
      <div className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto px-5 pb-4">
        {/* Name */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Medication Name <span className="text-red-500">*</span></label>
          <input value={med.name} onChange={(e) => set("name", e.target.value)}
            placeholder="E.g., Tylenol, Amoxicillin"
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none" />
        </div>

        {/* Dosage */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Dosage <span className="text-red-500">*</span></label>
          <input value={med.dosage} onChange={(e) => set("dosage", e.target.value)}
            placeholder="E.g., 2 tablets, 5ml, 250mg"
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none" />
        </div>

        {/* Schedule Type */}
        <div className="relative">
          <label className="mb-1 block text-sm font-medium text-gray-700">Schedule Type <span className="text-red-500">*</span></label>
          <button
            onClick={() => setShowScheduleDrop((v) => !v)}
            className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-700"
          >
            {med.scheduleType} <ChevronDown size={16} className="text-gray-400" />
          </button>
          {showScheduleDrop && (
            <ScheduleDropdown
              value={med.scheduleType}
              onChange={(v) => set("scheduleType", v)}
              onClose={() => setShowScheduleDrop(false)}
            />
          )}
        </div>

        {/* Specific Days chips */}
        {med.scheduleType === "Specific Days" && (
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Days of the Week <span className="text-red-500">*</span></label>
            <div className="flex flex-wrap gap-2">
              {DAYS_OF_WEEK.map((d) => (
                <button
                  key={d}
                  onClick={() => toggleDay(d)}
                  className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    med.days.includes(d) ? "bg-cg-brand text-white" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {d}
                  {med.days.includes(d) && <X size={10} />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Time slots (Daily or Specific Days) */}
        {(med.scheduleType === "Daily" || med.scheduleType === "Specific Days") && (
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Time</label>
            {med.times.map((t, i) => (
              <div key={i} className="mb-2 flex items-center rounded-lg border border-gray-200 px-3 py-2.5">
                <span className="text-sm text-gray-700">{t.hours} : {t.minutes} {t.period}</span>
              </div>
            ))}
            <button onClick={addTime} className="flex items-center gap-1 text-sm text-cg-brand">
              <Plus size={14} /> Add Time
            </button>
          </div>
        )}

        {/* Every X Hours/Days */}
        {med.scheduleType === "Every X Hours/Days" && (
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Time</label>
            <div className="flex gap-2">
              <input
                value={med.intervalValue}
                onChange={(e) => set("intervalValue", e.target.value)}
                className="flex-1 rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-cg-brand focus:outline-none"
              />
              <div className="relative">
                <button
                  onClick={() => setShowIntervalDrop((v) => !v)}
                  className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-700"
                >
                  {med.intervalUnit} <ChevronDown size={14} className="text-gray-400" />
                </button>
                {showIntervalDrop && (
                  <IntervalDropdown
                    onChange={(v) => set("intervalUnit", v)}
                    onClose={() => setShowIntervalDrop(false)}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Notes */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Notes {med.scheduleType === "As Needed" && <span className="text-red-500">*</span>}
          </label>
          <textarea
            value={med.notes}
            onChange={(e) => set("notes", e.target.value)}
            placeholder="Any additional notes about this medication..."
            rows={3}
            className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none"
          />
        </div>

        <button
          onClick={() => { if (canAdd()) { onAdd(med); onClose(); } }}
          disabled={!canAdd()}
          className={`w-full rounded-lg py-3 text-sm font-semibold text-white ${canAdd() ? "bg-cg-brand" : "bg-cg-brand/40"}`}
        >
          Add medication
        </button>
      </div>
    </ModalShell>
  );
}

// ─── Immunization Modal ─────────────────────────────────────────────────────────
function ImmunizationModal({
  value,
  onChange,
  onClose,
}: {
  value: Record<string, "Done" | "Pending" | "Not Applicable" | "">;
  onChange: (v: Record<string, "Done" | "Pending" | "Not Applicable" | "">) => void;
  onClose: () => void;
}) {
  const [search, setSearch] = useState("");
  const [local, setLocal] = useState<Record<string, "Done" | "Pending" | "Not Applicable" | "">>({ ...value });

  const filtered = VACCINES.filter((v) => v.toLowerCase().includes(search.toLowerCase()));

  function setStatus(vax: string, status: "Done" | "Pending" | "Not Applicable") {
    setLocal((prev) => ({ ...prev, [vax]: status }));
  }

  return (
    <ModalShell title="Select Immunization Status" onClose={onClose}>
      <div className="flex max-h-[65vh] flex-col overflow-hidden px-5">
        {/* Search */}
        <div className="mb-3 flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
          <Search size={14} className="text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="flex-1 text-sm focus:outline-none"
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.map((vax, i) => (
            <div key={vax} className={`py-3 ${i < filtered.length - 1 ? "border-b border-gray-100" : ""}`}>
              <p className="mb-2 text-sm font-semibold text-gray-700">{vax}</p>
              <div className="flex gap-4">
                {IMMUN_STATUSES.map((status) => (
                  <label key={status} className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
                    <input
                      type="radio"
                      name={vax}
                      checked={local[vax] === status}
                      onChange={() => setStatus(vax, status)}
                      className="accent-cg-brand"
                    />
                    {status}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => { onChange(local); onClose(); }}
          className="mt-4 w-full rounded-lg bg-cg-brand py-3 text-sm font-semibold text-white"
        >
          Continue
        </button>
      </div>
    </ModalShell>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────────
export default function ChildHealthPage() {
  const router = useRouter();

  const [form, setForm] = useState<HealthForm>({
    allergies: [],
    conditions: [],
    bloodGroup: "",
    medications: [],
    paediatricianName: "",
    paediatricianPhone: "",
    paediatricianClinic: "",
    immunization: {},
  });

  const [modal, setModal] = useState<"allergies" | "conditions" | "bloodGroup" | "medication" | "immunization" | null>(null);

  const set = <K extends keyof HealthForm>(k: K, v: HealthForm[K]) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  function toggleAllergy(v: string) {
    set("allergies", form.allergies.includes(v) ? form.allergies.filter((a) => a !== v) : [...form.allergies, v]);
  }
  function toggleCondition(v: string) {
    set("conditions", form.conditions.includes(v) ? form.conditions.filter((c) => c !== v) : [...form.conditions, v]);
  }
  function addMed(m: Medication) {
    set("medications", [...form.medications, m]);
  }
  function removeMed(id: string) {
    set("medications", form.medications.filter((m) => m.id !== id));
  }

  return (
    <>
      {modal === "allergies" && (
        <MultiSelectModal
          title="Select Allergies"
          options={ALLERGY_OPTIONS}
          selected={form.allergies}
          onToggle={toggleAllergy}
          onClose={() => setModal(null)}
        />
      )}
      {modal === "conditions" && (
        <MultiSelectModal
          title="Select Chronic Conditions"
          options={CONDITION_OPTIONS}
          selected={form.conditions}
          onToggle={toggleCondition}
          onClose={() => setModal(null)}
        />
      )}
      {modal === "bloodGroup" && (
        <RadioSelectModal
          title="Select Blood Group"
          options={BLOOD_GROUPS}
          selected={form.bloodGroup}
          onChange={(v) => set("bloodGroup", v)}
          onClose={() => setModal(null)}
        />
      )}
      {modal === "medication" && (
        <MedicationModal onAdd={addMed} onClose={() => setModal(null)} />
      )}
      {modal === "immunization" && (
        <ImmunizationModal
          value={form.immunization}
          onChange={(v) => set("immunization", v)}
          onClose={() => setModal(null)}
        />
      )}

      <div className="flex flex-1 flex-col">
        {/* Brown header */}
        <div className="shrink-0 bg-cg-brand px-6 pb-8 pt-4">
          <button onClick={() => router.back()} className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
            <ArrowLeft size={16} className="text-white" />
          </button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-merriweather)" }}>
                Let&apos;s Set Up Your Child&apos;s Profile
              </h1>
              <p className="mt-1 text-sm text-white/70">Your insight helps us care with confidence.</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/30">
              <span className="text-xs font-bold text-white">1/3</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto bg-white px-6 py-6">
          <div className="flex flex-col gap-5">

            {/* Allergies */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Allergies <span className="text-red-500">*</span>
              </label>
              <button
                onClick={() => setModal("allergies")}
                className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-400"
              >
                Select <ChevronDown size={16} className="text-gray-400" />
              </button>
              {form.allergies.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {form.allergies.map((a) => (
                    <button
                      key={a}
                      onClick={() => toggleAllergy(a)}
                      className="flex items-center gap-1 rounded-full bg-cg-brand px-2.5 py-1 text-xs font-medium text-white"
                    >
                      {a} <X size={10} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Chronic Conditions */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Chronic Conditions <span className="text-red-500">*</span>
              </label>
              <button
                onClick={() => setModal("conditions")}
                className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-400"
              >
                Select <ChevronDown size={16} className="text-gray-400" />
              </button>
              {form.conditions.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {form.conditions.map((c) => (
                    <button
                      key={c}
                      onClick={() => toggleCondition(c)}
                      className="flex items-center gap-1 rounded-full bg-cg-brand px-2.5 py-1 text-xs font-medium text-white"
                    >
                      {c} <X size={10} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Blood Group */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Blood Group</label>
              <button
                onClick={() => setModal("bloodGroup")}
                className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-sm"
              >
                <span className={form.bloodGroup ? "text-gray-800" : "text-gray-400"}>
                  {form.bloodGroup || "Select"}
                </span>
                <ChevronDown size={16} className="text-gray-400" />
              </button>
            </div>

            {/* Medication */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Medication</label>
              <button
                onClick={() => setModal("medication")}
                className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-400"
              >
                Add Medication <ChevronDown size={16} className="text-gray-400" />
              </button>
              {form.medications.length > 0 && (
                <div className="mt-2 space-y-1">
                  <button
                    onClick={() => setModal("medication")}
                    className="flex items-center gap-1 text-sm text-cg-brand"
                  >
                    <Plus size={14} /> Add Medication
                  </button>
                  <div className="flex flex-wrap gap-1.5">
                    {form.medications.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => removeMed(m.id)}
                        className="flex items-center gap-1 rounded-full bg-cg-brand px-2.5 py-1 text-xs font-medium text-white"
                      >
                        {m.name} <X size={10} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Paediatrician */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Paediatrician Full Name</label>
              <input
                value={form.paediatricianName}
                onChange={(e) => set("paediatricianName", e.target.value)}
                placeholder="Enter Paediatrician full name"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Paediatrician Phone Number</label>
              <input
                value={form.paediatricianPhone}
                onChange={(e) => set("paediatricianPhone", e.target.value)}
                placeholder="Enter paediatrician phone number"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Paediatrician Hospital / Clinic</label>
              <input
                value={form.paediatricianClinic}
                onChange={(e) => set("paediatricianClinic", e.target.value)}
                placeholder="Enter paediatrician hospital / clinic"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none"
              />
            </div>

            {/* Immunization History */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Immunization History</label>
              <button
                onClick={() => setModal("immunization")}
                className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-400"
              >
                {Object.keys(form.immunization).length > 0
                  ? `${Object.values(form.immunization).filter(Boolean).length} vaccine(s) recorded`
                  : "Select"}
                <ChevronDown size={16} className="text-gray-400" />
              </button>
            </div>

            <button
              onClick={() => router.push("/parent/child/feeding")}
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
