"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown, X, Search, Plus, CheckCircle2, AlertTriangle } from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────────

type Form = {
  sleepPatterns: string[];
  sleepTime: string;
  comfortItems: string[];
  toiletTraining: string[];
  milestones: string[];
  communicationStyles: string[];
  behaviourNote: string;
};

// ─── Constants ─────────────────────────────────────────────────────────────────

const SLEEP_PATTERNS = ["Typical Nap", "Routine"];
const COMFORT_ITEMS = ["None", "Pacifier", "Teddy", "Blanket"];
const TOILET_TRAINING = ["Diapers", "Potty Trained", "Toilet Trained"];
const MILESTONES = ["Walking", "Talking", "Social Play"];
const COMMUNICATION_STYLES = ["None yet", "Speak Words", "Gestures", "Sign Language"];

// ─── Shared components ─────────────────────────────────────────────────────────

function ModalShell({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30">
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
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" className="flex-1 bg-transparent text-sm placeholder:text-gray-300 focus:outline-none" />
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
        <button onClick={onClose} className="w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white">Continue</button>
      </div>
    </ModalShell>
  );
}

function Badges({ items, onRemove }: { items: string[]; onRemove: (v: string) => void }) {
  if (!items.length) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="flex items-center gap-1.5 rounded-full bg-cg-brand px-3 py-1 text-xs font-medium text-white">
          {item}<button onClick={() => onRemove(item)}><X size={10} /></button>
        </span>
      ))}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-sm font-medium text-gray-700">{children}</label>;
}

function FieldButton({ label, value, onClick }: { label: string; value: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-left text-sm">
      <span className={value ? "text-gray-800" : "text-gray-300"}>{value || label}</span>
      <ChevronDown size={16} className="text-gray-400" />
    </button>
  );
}

// ─── Warning Modal ──────────────────────────────────────────────────────────────

function WarningModal({ onClose, onProceed }: { onClose: () => void; onProceed: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30">
      <div className="w-full max-w-[430px] rounded-t-2xl bg-white pb-8 pt-5">
        <div className="flex justify-end px-5 pb-2">
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
            <X size={14} className="text-gray-500" />
          </button>
        </div>
        <div className="flex flex-col items-center px-8 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50">
            <AlertTriangle size={32} className="text-amber-500" />
          </div>
          <h2 className="mb-2 text-lg font-bold text-gray-800" style={{ fontFamily: "var(--font-merriweather)" }}>
            Warning
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-gray-500">
            You&apos;re about to share your child&apos;s profile, including personal details like name, age, and care info.
          </p>
          <button onClick={onProceed} className="w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white">
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Success Modal ──────────────────────────────────────────────────────────────

function SuccessModal({ onDone }: { onDone: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30">
      <div className="w-full max-w-[430px] rounded-t-2xl bg-white pb-8 pt-5">
        <div className="flex justify-end px-5 pb-2">
          <button onClick={onDone} className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
            <X size={14} className="text-gray-500" />
          </button>
        </div>
        <div className="flex flex-col items-center px-8 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2 size={36} className="text-green-500" />
          </div>
          <h2 className="mb-2 text-lg font-bold text-gray-800" style={{ fontFamily: "var(--font-merriweather)" }}>
            Success
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-gray-500">
            You&apos;re all done! The creche has received your request.
          </p>
          <button onClick={onDone} className="w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white">
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

type ModalKey = "sleep" | "comfort" | "toilet" | "milestone" | "communication" | null;

export default function DevelopmentPage() {
  const router = useRouter();
  const [form, setForm] = useState<Form>({
    sleepPatterns: [],
    sleepTime: "",
    comfortItems: [],
    toiletTraining: [],
    milestones: [],
    communicationStyles: [],
    behaviourNote: "",
  });
  const [modal, setModal] = useState<ModalKey>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  function toggle<K extends keyof Form>(key: K, val: string) {
    setForm((prev) => {
      const arr = prev[key] as string[];
      return { ...prev, [key]: arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val] };
    });
  }

  const multiProps = (key: keyof Form, options: string[], title: string, modalKey: ModalKey) => ({
    options,
    selected: form[key] as string[],
    onToggle: (v: string) => toggle(key, v),
    onClose: () => setModal(null),
    title,
    open: modal === modalKey,
    onClick: () => setModal(modalKey),
  });

  const sp = multiProps("sleepPatterns", SLEEP_PATTERNS, "Select Sleep Pattern", "sleep");
  const ci = multiProps("comfortItems", COMFORT_ITEMS, "Select Comfort Item", "comfort");
  const tt = multiProps("toiletTraining", TOILET_TRAINING, "Select Toilet Training", "toilet");
  const ms = multiProps("milestones", MILESTONES, "Select Milestone", "milestone");
  const cs = multiProps("communicationStyles", COMMUNICATION_STYLES, "Select Communication Style", "communication");

  return (
    <>
      {showWarning && !showSuccess && (
        <WarningModal onClose={() => setShowWarning(false)} onProceed={() => { setShowWarning(false); setShowSuccess(true); }} />
      )}
      {showSuccess && (
        <SuccessModal onDone={() => router.push("/parent/home")} />
      )}
      {modal && (
        <MultiSelectModal
          title={
            modal === "sleep" ? sp.title :
            modal === "comfort" ? ci.title :
            modal === "toilet" ? tt.title :
            modal === "milestone" ? ms.title : cs.title
          }
          options={
            modal === "sleep" ? sp.options :
            modal === "comfort" ? ci.options :
            modal === "toilet" ? tt.options :
            modal === "milestone" ? ms.options : cs.options
          }
          selected={
            modal === "sleep" ? sp.selected :
            modal === "comfort" ? ci.selected :
            modal === "toilet" ? tt.selected :
            modal === "milestone" ? ms.selected : cs.selected
          }
          onToggle={
            modal === "sleep" ? sp.onToggle :
            modal === "comfort" ? ci.onToggle :
            modal === "toilet" ? tt.onToggle :
            modal === "milestone" ? ms.onToggle : cs.onToggle
          }
          onClose={() => setModal(null)}
        />
      )}

      <div className="flex min-h-0 flex-1 flex-col">
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
              <p className="mt-1 text-sm text-white/70">Help us understand your child&apos;s unique development and personality.</p>
            </div>
            <div className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white/40 bg-white/20">
              <span className="text-xs font-bold text-white">3/3</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto bg-white px-6 py-6">
          <div className="flex flex-col gap-5">

            {/* Sleep Pattern */}
            <div>
              <Label>Sleep Pattern</Label>
              <FieldButton label="Select" value={form.sleepPatterns.join(", ")} onClick={() => setModal("sleep")} />
              <Badges items={form.sleepPatterns} onRemove={(v) => toggle("sleepPatterns", v)} />
            </div>

            {/* Sleep Time */}
            <div>
              <Label>Sleep Time</Label>
              <div className="flex items-center gap-3">
                <input
                  value={form.sleepTime}
                  onChange={(e) => setForm((p) => ({ ...p, sleepTime: e.target.value }))}
                  placeholder="-- : --"
                  className="flex-1 rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none"
                />
                <button className="flex items-center gap-1.5 text-sm font-medium text-cg-brand">
                  <Plus size={14} />
                  Add Time
                </button>
              </div>
            </div>

            {/* Comfort Items */}
            <div>
              <Label>Comfort Items</Label>
              <FieldButton label="Select" value={form.comfortItems.join(", ")} onClick={() => setModal("comfort")} />
              <Badges items={form.comfortItems} onRemove={(v) => toggle("comfortItems", v)} />
            </div>

            {/* Toilet Training */}
            <div>
              <Label>Toilet Training</Label>
              <FieldButton label="Select" value={form.toiletTraining.join(", ")} onClick={() => setModal("toilet")} />
              <Badges items={form.toiletTraining} onRemove={(v) => toggle("toiletTraining", v)} />
            </div>

            {/* Milestone */}
            <div>
              <Label>Milestone</Label>
              <FieldButton label="Select" value={form.milestones.join(", ")} onClick={() => setModal("milestone")} />
              <Badges items={form.milestones} onRemove={(v) => toggle("milestones", v)} />
            </div>

            {/* Communication Style */}
            <div>
              <Label>Communication Style</Label>
              <FieldButton label="Select" value={form.communicationStyles.join(", ")} onClick={() => setModal("communication")} />
              <Badges items={form.communicationStyles} onRemove={(v) => toggle("communicationStyles", v)} />
            </div>

            {/* Behaviour Note */}
            <div>
              <Label>Behaviour Note</Label>
              <textarea
                value={form.behaviourNote}
                onChange={(e) => setForm((p) => ({ ...p, behaviourNote: e.target.value }))}
                rows={4}
                placeholder="E.g. shy, very active, separation anxiety, tantrums"
                className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none"
              />
            </div>

            <button
              onClick={() => setShowWarning(true)}
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
