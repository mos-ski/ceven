export function PlaceholderSectionV1({ title, screenId }: { title: string; screenId: string }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8">
      <div className="mb-2 flex items-center gap-2">
        <h1 className="text-xl font-bold text-slate-800">{title}</h1>
        <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-slate-500">
          {screenId}
        </span>
      </div>
      <p className="max-w-md text-sm text-slate-500">
        Screen scaffolded, content not yet built — see docs/PRD-v1.md for the full spec (user
        stories, acceptance criteria, and key screen elements) for this module.
      </p>
    </div>
  );
}
