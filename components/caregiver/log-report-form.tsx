"use client";

import { useState } from "react";
import { ChevronDown, Plus, X } from "lucide-react";
import { useLogSheet } from "./log-sheet-context";

const MOOD_OPTIONS = [
  { emoji: "😄", label: "Happy" },
  { emoji: "😢", label: "Sad" },
  { emoji: "🙄", label: "Moody" },
  { emoji: "🤔", label: "Playful" },
  { emoji: "💬", label: "Interactive" },
  { emoji: "😪", label: "Tired" },
  { emoji: "😭", label: "Crying" },
];

export function LogReportForm() {
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [showMoodDropdown, setShowMoodDropdown] = useState(false);
  const [meal, setMeal] = useState("");
  const [naps, setNaps] = useState([{ from: "", to: "" }]);
  const [napTags, setNapTags] = useState<Array<{ from: string; to: string }>>([]);
  const [urineCount, setUrineCount] = useState("");
  const [poopCount, setPoopCount] = useState("");
  const [healthSafety, setHealthSafety] = useState("");
  const [medications, setMedications] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const { close } = useLogSheet();

  function toggleMood(label: string) {
    setSelectedMoods((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]
    );
  }

  function addNap() {
    const current = naps[naps.length - 1];
    if (current.from && current.to) {
      setNapTags((prev) => [...prev, current]);
      setNaps([{ from: "", to: "" }]);
    } else {
      setNaps((prev) => [...prev, { from: "", to: "" }]);
    }
  }

  function updateNap(i: number, field: "from" | "to", value: string) {
    setNaps((prev) => prev.map((n, idx) => (idx === i ? { ...n, [field]: value } : n)));
  }

  function removeNapTag(i: number) {
    setNapTags((prev) => prev.filter((_, idx) => idx !== i));
  }

  function formatTime(t: string) {
    if (!t) return "--:--";
    const [h, m] = t.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "pm" : "am";
    return `${(hour % 12) || 12}:${m}${ampm}`;
  }

  function handleSubmit() {
    setShowSuccess(true);
  }

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center gap-3 py-12">
        <p className="text-xl font-bold text-cg-brand" style={{ fontFamily: "var(--font-merriweather)" }}>
          Success
        </p>
        <p className="text-center text-sm text-gray-500">
          The child&apos;s report has been successfully logged and sent to the parent.
        </p>
        <button
          onClick={close}
          className="mt-4 w-full rounded-xl bg-cg-brand py-3.5 text-sm font-semibold text-white"
        >
          Close
        </button>
      </div>
    );
  }

  const moodLabel = selectedMoods.length === 0 ? null : selectedMoods.length === 1 ? selectedMoods[0] : "Multiple moods";

  return (
    <div className="flex flex-col gap-4">
      {/* Mood */}
      <div>
        <p className="mb-1.5 text-sm font-medium text-gray-700">
          Mood <span className="text-red-500">*</span>
        </p>
        <div className="relative">
          <button
            onClick={() => setShowMoodDropdown((v) => !v)}
            className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm"
          >
            <span className={moodLabel ? "font-medium text-cg-brand" : "text-gray-300"}>
              {moodLabel ?? "Select mood observation"}
            </span>
            <ChevronDown size={16} className="text-gray-400" />
          </button>

          {showMoodDropdown && (
            <div className="absolute z-10 mt-1 w-1/2 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
              {MOOD_OPTIONS.map(({ emoji, label }) => {
                const checked = selectedMoods.includes(label);
                return (
                  <button
                    key={label}
                    onClick={() => toggleMood(label)}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm ${checked ? "bg-cg-quick-action" : "hover:bg-gray-50"}`}
                  >
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                        checked ? "border-cg-accent bg-cg-accent" : "border-gray-300"
                      }`}
                    >
                      {checked && (
                        <svg viewBox="0 0 10 8" className="h-2.5 w-2.5">
                          <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <span className="text-lg">{emoji}</span>
                    <span className="text-cg-brand">{label}</span>
                  </button>
                );
              })}
              <div className="border-t border-gray-100 px-4 py-2.5">
                <button
                  onClick={() => setShowMoodDropdown(false)}
                  className="w-full rounded-lg bg-cg-brand py-2 text-xs font-semibold text-white"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {selectedMoods.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {selectedMoods.map((m) => {
              const found = MOOD_OPTIONS.find((o) => o.label === m);
              return (
                <span key={m} className="flex items-center gap-1 rounded-full bg-cg-brand px-3 py-1 text-xs font-medium text-white">
                  {found?.emoji} {m}
                  <button onClick={() => toggleMood(m)}>
                    <X size={11} className="text-white/70" />
                  </button>
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Meal */}
      <div>
        <p className="mb-1.5 text-sm font-medium text-gray-700">
          Meal <span className="text-red-500">*</span>
        </p>
        <input
          type="text"
          inputMode="numeric"
          value={meal}
          onChange={(e) => setMeal(e.target.value)}
          placeholder="Enter number of times meal was taken"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-accent focus:outline-none"
        />
      </div>

      {/* Nap Time */}
      <div>
        <p className="mb-1.5 text-sm font-medium text-gray-700">
          Nap Time <span className="text-red-500">*</span>
        </p>
        <div className="flex flex-col gap-2">
          {naps.map((nap, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="time"
                value={nap.from}
                onChange={(e) => updateNap(i, "from", e.target.value)}
                className="flex-1 rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm focus:border-cg-accent focus:outline-none"
              />
              <input
                type="time"
                value={nap.to}
                onChange={(e) => updateNap(i, "to", e.target.value)}
                className="flex-1 rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm focus:border-cg-accent focus:outline-none"
              />
            </div>
          ))}
          <button onClick={addNap} className="flex items-center gap-1.5 py-1 text-sm font-medium text-cg-brand">
            <Plus size={16} />
            Add More
          </button>
          {napTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {napTags.map((t, i) => (
                <span key={i} className="flex items-center gap-1 rounded-full bg-cg-brand px-3 py-1 text-xs font-medium text-white">
                  {formatTime(t.from)} - {formatTime(t.to)}
                  <button onClick={() => removeNapTag(i)}><X size={11} className="text-white/70" /></button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hygiene */}
      <div>
        <p className="mb-1.5 text-sm font-medium text-gray-700">
          Hygiene <span className="text-red-500">*</span>
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            inputMode="numeric"
            value={urineCount}
            onChange={(e) => setUrineCount(e.target.value)}
            placeholder="Number of urine"
            className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-accent focus:outline-none"
          />
          <input
            type="text"
            inputMode="numeric"
            value={poopCount}
            onChange={(e) => setPoopCount(e.target.value)}
            placeholder="Number of poop"
            className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-accent focus:outline-none"
          />
        </div>
      </div>

      {/* Health & Safety */}
      <div>
        <p className="mb-1.5 text-sm font-medium text-gray-700">Health &amp; Safety</p>
        <input
          type="text"
          value={healthSafety}
          onChange={(e) => setHealthSafety(e.target.value)}
          placeholder="Report minor injuries, falls or behaviour issues"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-accent focus:outline-none"
        />
      </div>

      {/* Medications */}
      <div>
        <p className="mb-1.5 text-sm font-medium text-gray-700">Medications</p>
        <input
          type="text"
          value={medications}
          onChange={(e) => setMedications(e.target.value)}
          placeholder="Report any medication administration"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-accent focus:outline-none"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full rounded-xl bg-cg-brand py-3.5 text-sm font-semibold text-white"
      >
        Log Report
      </button>
    </div>
  );
}
