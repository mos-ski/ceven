"use client";

import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { useLogSheet } from "./log-sheet-context";

const MOOD_OPTIONS = [
  "🤩 Playful",
  "😄 Happy",
  "😴 Sleepy",
  "😢 Sad",
  "😠 Fussy",
  "😐 Calm",
];

export function LogReportForm() {
  const [mood, setMood] = useState("");
  const [showMoodDropdown, setShowMoodDropdown] = useState(false);
  const [meal, setMeal] = useState("");
  const [naps, setNaps] = useState([{ from: "", to: "" }]);
  const [urineCount, setUrineCount] = useState("");
  const [poopCount, setPoopCount] = useState("");
  const [healthSafety, setHealthSafety] = useState("");
  const [medications, setMedications] = useState("");
  const { close } = useLogSheet();

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
            <span className={mood ? "text-cg-brand" : "text-gray-300"}>
              {mood || "Select mood observation"}
            </span>
            <ChevronDown size={16} className="text-gray-400" />
          </button>
          {showMoodDropdown && (
            <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
              {MOOD_OPTIONS.map((m) => (
                <button
                  key={m}
                  onClick={() => { setMood(m); setShowMoodDropdown(false); }}
                  className="w-full px-4 py-3 text-left text-sm text-cg-brand hover:bg-gray-50"
                >
                  {m}
                </button>
              ))}
            </div>
          )}
        </div>
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
