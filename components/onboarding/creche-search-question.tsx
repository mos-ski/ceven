"use client";

import { useState } from "react";

const KNOWN_CRECHES = [
  "Sunshine Creche",
  "Little Stars Creche",
  "Bright Beginnings Creche",
  "Rainbow Kids Creche",
];

interface CrecheSearchQuestionProps {
  value: string;
  onChange: (value: string) => void;
  onContinue: (found: boolean) => void;
}

export function CrecheSearchQuestion({ value, onChange, onContinue }: CrecheSearchQuestionProps) {
  const [checked, setChecked] = useState(false);
  const trimmed = value.trim();
  const found =
    trimmed.length > 0 &&
    KNOWN_CRECHES.some((c) => c.toLowerCase().includes(trimmed.toLowerCase()));

  function handleClick() {
    if (!checked) {
      setChecked(true);
      return;
    }
    onContinue(found);
  }

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setChecked(false);
        }}
        placeholder="Search your child's creche"
        className="h-14 w-full rounded-xl border border-[#E5E1D8] bg-white px-4 font-[family-name:var(--font-urbanist)] text-base text-heading outline-none focus:border-brand-dark"
      />
      {checked && trimmed.length > 0 && !found && (
        <p className="rounded-xl bg-[#FDF3E7] px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm text-muted-text">
          We couldn&apos;t find that creche yet — no worries, we&apos;ve noted your interest and
          we&apos;ll reach out to them too.
        </p>
      )}
      {checked && found && (
        <p className="rounded-xl bg-[#EAF3EA] px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm text-[#2F6B2F]">
          Found it! {value} is already on CEven.
        </p>
      )}
      <button
        onClick={handleClick}
        disabled={trimmed.length === 0}
        className={`h-12 w-full rounded-xl font-[family-name:var(--font-urbanist)] text-sm font-semibold text-white transition-opacity ${
          trimmed.length === 0 ? "bg-brand-dark/40" : "bg-brand-dark hover:opacity-90"
        }`}
      >
        {checked ? "Continue" : "Search"}
      </button>
    </div>
  );
}
