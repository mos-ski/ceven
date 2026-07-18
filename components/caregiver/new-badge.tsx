export function NewBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full bg-emerald-500 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-white ${className}`}
    >
      New
    </span>
  );
}
