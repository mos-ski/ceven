"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className={`relative h-6 w-11 rounded-full transition-colors ${on ? "bg-cg-brand" : "bg-gray-200"}`}>
      <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5" : ""}`} />
    </button>
  );
}

export default function AccessibilityPage() {
  const router = useRouter();
  const [textSize, setTextSize] = useState(2);
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [boldText, setBoldText] = useState(false);

  const sizes = ["Small", "Default", "Large", "X-Large"];

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="relative overflow-hidden bg-[#5B391E] px-6 pt-14 pb-6">
        <div className="pointer-events-none absolute top-0 right-0 h-[220px] w-[220px] rounded-full bg-[#D4A67F] opacity-20" />
        <button onClick={() => router.back()} className="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
          <ArrowLeft size={16} className="text-white" />
        </button>
        <h1 className="text-xl font-bold text-white">Accessibility</h1>
        <p className="mt-1 text-sm text-white/70">Adjust the app to suit your needs.</p>
      </div>

      <div className="flex-1 overflow-y-auto bg-white px-6 py-5">
        {/* Text size */}
        <div className="mb-5 rounded-2xl border border-gray-100 p-4">
          <p className="mb-3 text-sm font-semibold text-gray-800">Text Size</p>
          <div className="flex gap-2">
            {sizes.map((s, i) => (
              <button
                key={s}
                onClick={() => setTextSize(i)}
                className={`flex-1 rounded-xl py-2 text-xs font-medium transition-colors ${
                  textSize === i ? "bg-cg-brand text-white" : "bg-gray-100 text-gray-500"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-gray-400">A</span>
            <div className="h-1 flex-1 mx-3 rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-cg-brand transition-all"
                style={{ width: `${(textSize / (sizes.length - 1)) * 100}%` }}
              />
            </div>
            <span className="text-lg text-gray-400">A</span>
          </div>
        </div>

        {/* Toggle options */}
        <div className="rounded-2xl border border-gray-100 overflow-hidden">
          {[
            { label: "High Contrast",  desc: "Increase contrast for better readability", on: highContrast, toggle: () => setHighContrast(!highContrast) },
            { label: "Reduce Motion",  desc: "Minimize animations and transitions",       on: reduceMotion, toggle: () => setReduceMotion(!reduceMotion) },
            { label: "Bold Text",      desc: "Make all text bolder throughout the app",   on: boldText,     toggle: () => setBoldText(!boldText) },
          ].map(({ label, desc, on, toggle }, i, arr) => (
            <div key={label} className={`flex items-center gap-4 px-4 py-4 ${i < arr.length - 1 ? "border-b border-gray-50" : ""}`}>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">{label}</p>
                <p className="text-xs text-gray-400">{desc}</p>
              </div>
              <Toggle on={on} onChange={toggle} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
