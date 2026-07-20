interface ChildrenQuestionProps {
  count: number;
  onCountChange: (count: number) => void;
  ages: string;
  onAgesChange: (ages: string) => void;
  onContinue: () => void;
}

export function ChildrenQuestion({
  count,
  onCountChange,
  ages,
  onAgesChange,
  onContinue,
}: ChildrenQuestionProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 font-[family-name:var(--font-urbanist-import)] text-sm font-medium text-heading">
          Number of children
        </p>
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => onCountChange(Math.max(1, count - 1))}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E1D8] text-xl text-brand-dark"
          >
            −
          </button>
          <span className="font-[family-name:var(--font-urbanist-import)] text-2xl font-bold text-heading">
            {count}
          </span>
          <button
            onClick={() => onCountChange(count + 1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E1D8] text-xl text-brand-dark"
          >
            +
          </button>
        </div>
      </div>
      <div>
        <p className="mb-2 font-[family-name:var(--font-urbanist-import)] text-sm font-medium text-heading">
          How old are they?
        </p>
        <input
          type="text"
          value={ages}
          onChange={(e) => onAgesChange(e.target.value)}
          placeholder="e.g. 2 years, 4 years"
          className="h-14 w-full rounded-xl border border-[#E5E1D8] bg-white px-4 font-[family-name:var(--font-urbanist-import)] text-base text-heading outline-none focus:border-brand-dark"
        />
      </div>
      <button
        onClick={onContinue}
        disabled={ages.trim().length === 0}
        className={`h-12 w-full rounded-xl font-[family-name:var(--font-urbanist-import)] text-sm font-semibold text-white transition-opacity ${
          ages.trim().length === 0 ? "bg-brand-dark/40" : "bg-brand-dark hover:opacity-90"
        }`}
      >
        Continue
      </button>
    </div>
  );
}
