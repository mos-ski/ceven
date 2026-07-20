interface TextQuestionProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: "text" | "email";
  onContinue: () => void;
  continueLabel?: string;
  helperText?: string;
  validate?: (value: string) => boolean;
}

export function TextQuestion({
  value,
  onChange,
  placeholder,
  type = "text",
  onContinue,
  continueLabel = "Continue",
  helperText,
  validate,
}: TextQuestionProps) {
  const canContinue = value.trim().length > 0 && (validate ? validate(value) : true);
  return (
    <div className="flex flex-col gap-4">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-14 w-full rounded-xl border border-[#E5E1D8] bg-white px-4 font-[family-name:var(--font-urbanist)] text-base text-heading outline-none focus:border-brand-dark"
      />
      {helperText && (
        <p className="font-[family-name:var(--font-urbanist)] text-xs text-muted-text">
          {helperText}
        </p>
      )}
      <button
        onClick={onContinue}
        disabled={!canContinue}
        className={`h-12 w-full rounded-xl font-[family-name:var(--font-urbanist)] text-sm font-semibold text-white transition-opacity ${
          canContinue ? "bg-brand-dark hover:opacity-90" : "bg-brand-dark/40"
        }`}
      >
        {continueLabel}
      </button>
    </div>
  );
}
