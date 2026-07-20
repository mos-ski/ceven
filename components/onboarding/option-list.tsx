import { ArrowRight } from "lucide-react";

export interface OnboardingOption {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

interface OptionListProps {
  options: OnboardingOption[];
  onSelect: (value: string) => void;
  selected?: string | null;
}

export function OptionList({ options, onSelect, selected }: OptionListProps) {
  return (
    <div className="flex flex-col gap-4">
      {options.map((option) => {
        const isSelected = option.value === selected;
        return (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`flex items-center gap-4 rounded-2xl border px-5 py-5 text-left transition-colors ${
              isSelected
                ? "border-brand-dark bg-brand-dark/5"
                : "border-[#E5E1D8] bg-white hover:border-brand-dark/40"
            }`}
          >
            {option.icon && (
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-dark/10 text-brand-dark">
                {option.icon}
              </div>
            )}
            <span className="flex-1 font-[family-name:var(--font-urbanist)] text-base text-heading">
              {option.label}
            </span>
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                isSelected ? "bg-brand-dark text-white" : "bg-[#F4F1EA] text-brand-dark"
              }`}
            >
              <ArrowRight size={16} />
            </div>
          </button>
        );
      })}
    </div>
  );
}
