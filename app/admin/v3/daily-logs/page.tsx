"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CHILDREN, CAREGIVERS } from "@/lib/mock-data/children";

// ── Mock daily-report data ───────────────────────────────────────────────────
// No v2 equivalent exists for per-child daily reports (v2's daily-operations
// page used a single repeated placeholder row) — this derives rows from the
// real CHILDREN/CAREGIVERS mock data instead, matching that same shape.

type DailyLogStatus = "Done" | "Flag" | "Pending" | null;

type DailyLogRow = {
  child: string;
  childInfo: string;
  room: string;
  caregiver: string;
  reportTime: string;
  mood: string;
  meal: string;
  napTime: string;
  hygiene: string;
  health: string;
  note: string;
  status: DailyLogStatus;
};

function caregiverForRoom(room: string) {
  return CAREGIVERS.find((c) => c.room === room)?.name ?? CAREGIVERS[0].name;
}

const STATUS_CYCLE: DailyLogStatus[] = ["Done", "Done", "Flag", "Pending", null, "Done", "Pending", "Done"];

const dailyLogRows: DailyLogRow[] = CHILDREN.slice(0, 8).map((child, i) => {
  const status = STATUS_CYCLE[i % STATUS_CYCLE.length];
  const base = {
    child: child.name,
    childInfo: `${child.gender} • ${child.age}`,
    room: child.room,
    caregiver: caregiverForRoom(child.room),
    reportTime: "08:20AM",
  };
  if (status === "Done") {
    return {
      ...base,
      mood: "😊 Happy",
      meal: "Finished all breakfast and lunch",
      napTime: "11:00am • 01:20pm",
      hygiene: "2 nappy changes, no concerns",
      health: "No medication administered",
      note: "Settled quickly after nap, in great spirits all day.",
      status,
    };
  }
  if (status === "Flag") {
    return {
      ...base,
      mood: "😊 Happy",
      meal: "--",
      napTime: "--",
      hygiene: "1 nappy change",
      health: "Vitamin D administered",
      note: "Flagged: meal not logged for lunch.",
      status,
    };
  }
  if (status === "Pending") {
    return {
      ...base,
      mood: "--",
      meal: "--",
      napTime: "--",
      hygiene: "--",
      health: "--",
      note: "Report not yet submitted.",
      status,
    };
  }
  return { ...base, mood: "--", meal: "--", napTime: "--", hygiene: "--", health: "--", note: "", status: null };
});

const submittedCount = dailyLogRows.filter((r) => r.status === "Done" || r.status === "Flag").length;
const pendingCount = dailyLogRows.filter((r) => r.status === "Pending" || r.status === null).length;
const compliancePct = Math.round((submittedCount / dailyLogRows.length) * 100);

const statsCards = [
  { value: String(submittedCount).padStart(2, "0"), title: "Submitted Today" },
  { value: String(pendingCount).padStart(2, "0"), title: "Pending Today" },
  { value: `${compliancePct}%`, title: "Today's Compliance" },
  { value: "6m", title: "Avg Submit Time" },
];

function FilterDropdown({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-1.5 rounded-lg border border-[#e6ebf3] bg-white px-3 py-1.5 font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">
      {label}
      <ChevronDown className="h-3.5 w-3.5" />
    </button>
  );
}

function DailyLogStatusBadge({ status }: { status: DailyLogStatus }) {
  if (status === "Done")
    return (
      <Badge variant="outline" className="border-transparent bg-badge-success-bg text-success-text">
        ● Done
      </Badge>
    );
  if (status === "Flag")
    return (
      <Badge variant="outline" className="border-transparent bg-[#f3f4f6] text-[#454B54]">
        ● Flag
      </Badge>
    );
  if (status === "Pending")
    return (
      <Badge variant="outline" className="border-transparent bg-[#fff6e6] text-[#cc8000]">
        ● Pending
      </Badge>
    );
  return <span className="text-[#9ca3af]">--</span>;
}

function DailyReportDetailsModal({
  row,
  onOpenChange,
}: {
  row: DailyLogRow | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={row !== null} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>View Details</DialogTitle>
        </DialogHeader>

        {row && (
          <>
            <div className="flex items-center justify-between gap-4 bg-[#faf2e1] px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="size-9 rounded-full bg-[#edd9c0]" />
                <div>
                  <p className="font-[family-name:var(--font-urbanist)] text-sm font-bold text-black">{row.child}</p>
                  <p className="font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">{row.childInfo}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">Status</span>
                <DailyLogStatusBadge status={row.status} />
              </div>
            </div>

            <div className="flex flex-col gap-6 px-6 py-5">
              {[
                ["Mood", row.mood],
                ["Meal", row.meal],
                ["Nap Time", row.napTime],
                ["Hygiene", row.hygiene],
                ["Health", row.health],
                ["Note", row.note || "—"],
                ["Caregiver", row.caregiver],
                ["Report Time", row.reportTime],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-[52px]">
                  <p className="w-[156px] shrink-0 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#6b7280]">
                    {label}
                  </p>
                  <p className="font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#1f2937]">{value}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function DailyLogsV3Page() {
  const [viewingRow, setViewingRow] = useState<DailyLogRow | null>(null);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2D1810]">
            Daily Logs
          </h1>
          <p className="mt-1 text-sm text-[#2D1810]/50">
            Today&apos;s child report submissions across all rooms.
          </p>
        </div>
        <button className="rounded-lg border border-[#3b2513] px-4 py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#3b2513] hover:bg-[#3b2513]/5">
          Remind Caregivers
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {statsCards.map((card) => (
          <div key={card.title} className="rounded-2xl border border-black/[0.07] bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-[#2D1810]/50">{card.title}</p>
            <p className="mt-1.5 font-[family-name:var(--font-merriweather)] text-[1.85rem] font-bold leading-none text-[#2D1810]">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* AI Insights Banner */}
      <div className="flex items-center gap-3 rounded-xl border border-[#e0bfa0] bg-[#fdf6e8] px-4 py-3">
        <span className="inline-flex items-center gap-1 rounded-full bg-[#e0bfa0] px-2 py-0.5 font-[family-name:var(--font-urbanist)] text-[10px] font-medium text-[#3b2513]">
          ✦ Insights
        </span>
        <p className="font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810]">
          ⚠ Some rooms have not submitted today. AI has notified caregivers.
        </p>
        <button className="ml-auto text-[#9ca3af] hover:text-[#6b7280]">✕</button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-black/[0.07] bg-white">
        <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
          <span className="font-[family-name:var(--font-merriweather)] text-base font-bold text-[#2d1810]">
            Today&apos;s Report Status
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">Filter by:</span>
            <FilterDropdown label="All Status" />
            <FilterDropdown label="All Room" />
            <FilterDropdown label="Date" />
            <div className="flex items-center gap-2 rounded-lg border border-[#e6ebf3] bg-white px-3 py-1.5">
              <Search className="h-3.5 w-3.5 text-[#9ca3af]" />
              <input
                type="text"
                placeholder="Search children, parents..."
                className="font-[family-name:var(--font-urbanist)] text-xs text-[#2d1810] placeholder:text-[#9ca3af] focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#edd9c0]">
                <th className="w-10 px-4 py-3">
                  <input type="checkbox" className="h-4 w-4 accent-[#3b2513]" />
                </th>
                {["Child", "Room", "Caregiver", "Report Time", "Mood", "Meal", "Status", "Action"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-[family-name:var(--font-urbanist)] text-sm font-normal text-black"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {dailyLogRows.map((row, i) => (
                <tr key={i} className="border-t border-[#eaecf0]">
                  <td className="px-4 py-3">
                    <input type="checkbox" className="h-4 w-4 accent-[#3b2513]" />
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]">{row.child}</p>
                    <p className="font-[family-name:var(--font-urbanist)] text-[10px] text-[#9ca3af]">{row.childInfo}</p>
                  </td>
                  <td className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm text-[#6b7280]">
                    {row.room}
                  </td>
                  <td className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm text-[#6b7280]">
                    {row.caregiver}
                  </td>
                  <td className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm text-[#6b7280]">
                    {row.reportTime}
                  </td>
                  <td className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm text-[#6b7280]">
                    {row.mood}
                  </td>
                  <td className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm text-[#6b7280]">
                    {row.meal}
                  </td>
                  <td className="px-4 py-3">
                    <DailyLogStatusBadge status={row.status} />
                  </td>
                  <td className="px-4 py-3">
                    {row.status === "Done" || row.status === "Flag" ? (
                      <button
                        onClick={() => setViewingRow(row)}
                        className="font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#3b2513] underline"
                      >
                        View
                      </button>
                    ) : (
                      <button className="font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#3b2513] underline">
                        Log Now
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile card list */}
        <div className="flex flex-col gap-2 px-4 pb-4 lg:hidden">
          {dailyLogRows.map((row, i) => (
            <div
              key={i}
              onClick={() => (row.status === "Done" || row.status === "Flag") && setViewingRow(row)}
              className={`rounded-xl border border-[#eaecf0] p-3 ${row.status === "Done" || row.status === "Flag" ? "cursor-pointer" : ""}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]">{row.child}</span>
                  <p className="font-[family-name:var(--font-urbanist)] text-[10px] text-[#9ca3af]">{row.childInfo}</p>
                </div>
                <DailyLogStatusBadge status={row.status} />
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">{row.room}</span>
                <span className="text-[#d0d5dd]">•</span>
                <span className="font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">{row.caregiver}</span>
                <span className="text-[#d0d5dd]">•</span>
                <span className="font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">{row.reportTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DailyReportDetailsModal row={viewingRow} onOpenChange={(open) => !open && setViewingRow(null)} />
    </div>
  );
}
