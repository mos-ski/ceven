interface SliderQuestionProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  unit: string;
  onContinue: () => void;
}

export function SliderQuestion({
  value,
  onChange,
  min,
  max,
  unit,
  onContinue,
}: SliderQuestionProps) {
  const ticks = [
    min,
    Math.round(min + (max - min) * 0.25),
    Math.round(min + (max - min) * 0.5),
    Math.round(min + (max - min) * 0.75),
    `${max}+`,
  ];

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-3">
        <input
          type="number"
          min={min}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-16 w-32 rounded-xl border-2 border-brand-dark text-center font-[family-name:var(--font-urbanist-import)] text-2xl font-bold text-heading outline-none"
        />
        <span className="font-[family-name:var(--font-urbanist-import)] text-lg text-muted-text">
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={Math.min(value, max)}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#3B2513]"
      />
      <div className="flex w-full justify-between font-[family-name:var(--font-urbanist-import)] text-xs text-muted-text">
        {ticks.map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
      <button
        onClick={onContinue}
        className="mt-2 h-12 w-full rounded-xl bg-brand-dark font-[family-name:var(--font-urbanist-import)] text-sm font-semibold text-white hover:opacity-90"
      >
        Continue
      </button>
    </div>
  );
}
