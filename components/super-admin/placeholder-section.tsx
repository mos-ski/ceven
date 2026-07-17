export function PlaceholderSectionSA({ title }: { title: string }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8">
      <h1 className="mb-2 text-xl font-bold text-slate-800">{title}</h1>
      <p className="max-w-md text-sm text-slate-500">
        Screen scaffolded, content not yet built. Scope for this module still needs sign-off —
        see the note on Super Admin scope in this conversation's summary.
      </p>
    </div>
  );
}
