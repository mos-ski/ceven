interface ProgressBarProps {
  current: number; // 1-indexed
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex w-full max-w-[420px] gap-1.5">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full ${
              i < current ? "bg-brand-dark" : "bg-[#E5E1D8]"
            }`}
          />
        ))}
      </div>
      <p className="font-[family-name:var(--font-urbanist)] text-sm text-muted-text">
        {current} of {total}
      </p>
    </div>
  );
}
