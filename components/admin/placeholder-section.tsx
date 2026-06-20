export function PlaceholderSection({ title }: { title: string }) {
  return (
    <div className="rounded-xl border border-input-border bg-white p-8">
      <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-heading">
        {title}
      </h1>
      <p className="mt-2 font-[family-name:var(--font-urbanist)] text-sm text-muted-text">
        This section is coming in a future build.
      </p>
    </div>
  );
}
