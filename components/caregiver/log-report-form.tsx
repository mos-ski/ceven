"use client";

import { useState } from "react";
import { ChevronDown, Plus, X } from "lucide-react";
import { useLogSheet } from "./log-sheet-context";

const MOOD_OPTIONS = [
  "😄 Happy",
  "😢 Sad",
  "😒 Moody",
  "🤩 Playful",
  "💬 Interactive",
  "😴 Tired",
  "😭 Crying",
];

export function LogReportForm() {
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [showMoodDropdown, setShowMoodDropdown] = useState(false);
  const [meal, setMeal] = useState("");
  const [naps, setNaps] = useState([{ from: "", to: "" }]);
  const [urineCount, setUrineCount] = useState("");
  const [poopCount, setPoopCount] = useState("");
  const [healthSafety, setHealthSafety] = useState("");
  const [medications, setMedications] = useState("");
  const { close } = useLogSheet();

  function toggleMood(m: string) {
    setSelectedMoods((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );
  }

  function removeMood(m: string) {
    setSelectedMoods((prev) => prev.filter((x) => x !== m));
  }

  function addNap() {
    setNaps((prev) => [...prev, { from: "", to: "" }]);
  }

  function updateNap(i: number, field: "from" | "to", value: string) {
    setNaps((prev) => prev.map((n, idx) => (idx === i ? { ...n, [field]: value } : n)));
  }

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
            <span className={selectedMoods.length > 0 ? "text-cg-brand" : "text-gray-300"}>
              {selectedMoods.length === 0
                ? "Select mood observation"
                : selectedMoods.length === 1
                ? selectedMoods[0]
                : "Multiple moods"}
            </span>
            <ChevronDown size={16} className="text-gray-400" />
          </button>

          {showMoodDropdown && (
            <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
              {MOOD_OPTIONS.map((m) => {
                const checked = selectedMoods.includes(m);
                return (
                  <button
                    key={m}
                    onClick={() => toggleMood(m)}
                    className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-cg-brand hover:bg-gray-50"
                  >
                    <span>{m}</span>
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded border ${
                        checked
                          ? "border-cg-accent bg-cg-accent text-white"
                          : "border-gray-300"
                      }`}
                    >
                      {checked && (
                        <svg viewBox="0 0 10 8" className="h-2.5 w-2.5 fill-white">
                          <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
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
            {selectedMoods.map((m) => (
              <span
                key={m}
                className="flex items-center gap-1 rounded-full bg-cg-quick-action px-3 py-1 text-xs font-medium text-cg-brand"
              >
                {m}
                <button onClick={() => removeMood(m)}>
                  <X size={11} className="text-cg-accent" />
                </button>
              </span>
            ))}
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
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-cg-brand placeholder:text-gray-300 focus:border-cg-accent focus:outline-none"
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
                className="flex-1 rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-cg-brand focus:border-cg-accent focus:outline-none"
              />
              <input
                type="time"
                value={nap.to}
                onChange={(e) => updateNap(i, "to", e.target.value)}
                className="flex-1 rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-cg-brand focus:border-cg-accent focus:outline-none"
              />
            </div>
          ))}
          <button
            onClick={addNap}
            className="flex items-center gap-1.5 py-1 text-sm font-medium text-cg-brand"
          >
            <Plus size={16} />
            Add More
          </button>
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
            className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-cg-brand placeholder:text-gray-300 focus:border-cg-accent focus:outline-none"
          />
          <input
            type="text"
            inputMode="numeric"
            value={poopCount}
            onChange={(e) => setPoopCount(e.target.value)}
            placeholder="Number of poop"
            className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-cg-brand placeholder:text-gray-300 focus:border-cg-accent focus:outline-none"
          />
        </div>
      </div>

      {/* Health & Safety */}
      <div>
        <p className="mb-1.5 text-sm font-medium text-gray-700">Health &amp; Safety</p>
        <textarea
          value={healthSafety}
          onChange={(e) => setHealthSafety(e.target.value)}
          placeholder="Report minor injuries, falls or behaviour issues"
          rows={3}
          className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-cg-brand placeholder:text-gray-300 focus:border-cg-accent focus:outline-none"
        />
      </div>

      {/* Medications */}
      <div>
        <p className="mb-1.5 text-sm font-medium text-gray-700">Medications</p>
        <textarea
          value={medications}
          onChange={(e) => setMedications(e.target.value)}
          placeholder="Report any medication administration"
          rows={3}
          className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-cg-brand placeholder:text-gray-300 focus:border-cg-accent focus:outline-none"
        />
      </div>

      <button
        onClick={close}
        className="w-full rounded-xl bg-cg-accent-muted py-3.5 text-sm font-semibold text-cg-brand"
      >
        Log Report
      </button>
    </div>
  );
}
