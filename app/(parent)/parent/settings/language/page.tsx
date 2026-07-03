"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const LANGUAGES = [
  { code: "en", label: "English",    native: "English" },
  { code: "yo", label: "Yoruba",     native: "Yorùbá" },
  { code: "ig", label: "Igbo",       native: "Igbo" },
  { code: "ha", label: "Hausa",      native: "Hausa" },
  { code: "fr", label: "French",     native: "Français" },
  { code: "pt", label: "Portuguese", native: "Português" },
];

export default function LanguagePage() {
  const router = useRouter();
  const [selected, setSelected] = useState("en");

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="relative overflow-hidden bg-[#5B391E] px-6 pt-14 pb-6">
        <div className="pointer-events-none absolute top-0 right-0 h-[220px] w-[220px] rounded-full bg-[#D4A67F] opacity-20" />
        <button onClick={() => router.back()} className="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
          <ArrowLeft size={16} className="text-white" />
        </button>
        <h1 className="text-xl font-bold text-white">Language Preferences</h1>
        <p className="mt-1 text-sm text-white/70">Select your preferred app language.</p>
      </div>

      <div className="flex-1 overflow-y-auto bg-white px-6 py-5">
        <div className="rounded-2xl border border-gray-100 overflow-hidden">
          {LANGUAGES.map((lang, i) => (
            <button
              key={lang.code}
              onClick={() => setSelected(lang.code)}
              className={`flex w-full items-center justify-between px-4 py-4 text-left ${
                i < LANGUAGES.length - 1 ? "border-b border-gray-50" : ""
              }`}
            >
              <div>
                <p className="text-sm font-semibold text-gray-800">{lang.label}</p>
                <p className="text-xs text-gray-400">{lang.native}</p>
              </div>
              {selected === lang.code && <CheckCircle2 size={18} className="text-cg-brand" />}
            </button>
          ))}
        </div>

        <button
          onClick={() => router.back()}
          className="mt-6 w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-[#FAF2E1]"
        >
          Save Language
        </button>
      </div>
    </div>
  );
}
