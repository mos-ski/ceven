import { Check } from "lucide-react";
import type { OnboardingOption } from "./option-list";

interface MultiSelectListProps {
  options: OnboardingOption[];
  selected: string[];
  onToggle: (value: string) => void;
  onContinue: () => void;
  continueLabel?: string;
}

export function MultiSelectList({
  options,
  selected,
  onToggle,
  onContinue,
  continueLabel = "Continue",
}: MultiSelectListProps) {
  return (
    <div className="flex flex-col gap-4">
      {options.map((option) => {
        const isSelected = selected.includes(option.value);
        return (
          <button
            key={option.value}
            onClick={() => onToggle(option.value)}
            className={`flex items-center gap-4 rounded-2xl border px-5 py-5 text-left transition-colors ${
              isSelected
                ? "border-brand-dark bg-brand-dark/5"
                : "border-[#E5E1D8] bg-white hover:border-brand-dark/40"
            }`}
          >
            <span className="flex-1 font-[family-name:var(--font-urbanist)] text-base text-heading">
              {option.label}
            </span>
            <div
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                isSelected
                  ? "border-brand-dark bg-brand-dark text-white"
                  : "border-[#C9C2B3] bg-white"
              }`}
            >
              {isSelected && <Check size={14} />}
            </div>
          </button>
        );
      })}
      <button
        onClick={onContinue}
        disabled={selected.length === 0}
        className={`mt-2 h-12 w-full rounded-xl font-[family-name:var(--font-urbanist)] text-sm font-semibold text-white transition-opacity ${
          selected.length === 0 ? "bg-brand-dark/40" : "bg-brand-dark hover:opacity-90"
        }`}
      >
        {continueLabel}
      </button>
    </div>
  );
}
