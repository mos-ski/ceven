const SUGGESTED_ACTIONS = ["Chase overdue invoices", "Summarise today's incidents", "Draft an announcement"];

const CHAT_THREAD = [
  { from: "ada" as const, text: "Good morning! 3 invoices are now over 7 days overdue — want me to draft reminders?" },
  { from: "admin" as const, text: "Yes, draft reminders for the top 3." },
  { from: "ada" as const, text: "Done — drafts are ready in Billing & Payments for your review." },
];

function AIPanelBody() {
  return (
    <>
      <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-sm text-white">
          ✦
        </span>
        <div>
          <p className="text-sm font-bold text-slate-800">Ada</p>
          <p className="flex items-center gap-1 text-[10px] text-emerald-600">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            Live
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
        {CHAT_THREAD.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-lg px-3 py-2 text-xs ${
              msg.from === "ada"
                ? "bg-indigo-50 text-slate-700"
                : "ml-auto bg-indigo-600 text-white"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 px-4 py-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
          Suggested
        </p>
        <div className="flex flex-col gap-1.5">
          {SUGGESTED_ACTIONS.map((action) => (
            <button
              key={action}
              type="button"
              className="rounded-md border border-slate-200 px-2.5 py-1.5 text-left text-xs text-slate-600 hover:border-indigo-300 hover:bg-indigo-50"
            >
              {action}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Ask Ada anything..."
          className="mt-3 h-9 w-full rounded-lg border border-slate-200 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </>
  );
}

export function AIPanelV1({ open }: { open: boolean }) {
  return (
    <>
      {/* Persistent at 1440px+, per PRD spec */}
      <div className="hidden w-[316px] shrink-0 flex-col border-l border-slate-200 bg-white min-[1440px]:flex">
        <AIPanelBody />
      </div>

      {/* Toggleable overlay below 1440px */}
      {open && (
        <div className="fixed inset-y-0 right-0 z-40 flex w-[316px] flex-col border-l border-slate-200 bg-white shadow-xl min-[1440px]:hidden">
          <AIPanelBody />
        </div>
      )}
    </>
  );
}
