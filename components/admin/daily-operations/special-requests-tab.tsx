"use client";

import { useMemo, useState } from "react";
import { Search, Sparkles } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  SPECIAL_REQUESTS,
  type SpecialRequest,
  type SpecialRequestStatus,
  type SpecialRequestPriority,
  type SpecialRequestSource,
} from "@/lib/mock-data/special-requests";

// ── Constants ─────────────────────────────────────────────────────────────────

const STATUS_STYLE: Record<SpecialRequestStatus, string> = {
  Done: "bg-[#e6f9ee] text-[#009061]",
  "In Progress": "bg-[#e8f0fe] text-[#1a73e8]",
  Pending: "bg-[#fff6e6] text-[#cc8000]",
  Overdue: "bg-[#fde8e8] text-[#d32f2f]",
  Cancelled: "bg-[#f3f4f6] text-[#6b7280]",
};

const PRIORITY_DOT: Record<SpecialRequestPriority, string> = {
  Low: "bg-[#6b7280]",
  Medium: "bg-[#cc8000]",
  High: "bg-[#ef4444]",
};

const SOURCE_BADGE: Record<SpecialRequestSource, string> = {
  Parent: "bg-[#fdf6e8] text-[#c47b2c] border-[#e0bfa0]",
  "Auto-Assigned": "bg-[#ede9fe] text-[#7c3aed] border-[#c4b5fd]",
  Admin: "bg-[#e8f0fe] text-[#1a73e8] border-[#93c5fd]",
  Routine: "bg-[#f3f4f6] text-[#6b7280] border-[#d0d5dd]",
};

type SourceFilter = "All" | SpecialRequestSource;
type StatusFilter = "All" | SpecialRequestStatus;

// ── Helpers ───────────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: SpecialRequestStatus }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-[family-name:var(--font-urbanist)] text-xs font-medium ${STATUS_STYLE[status]}`}>
      ● {status}
    </span>
  );
}

function SourceBadge({ source }: { source: SpecialRequestSource }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-[family-name:var(--font-urbanist)] text-[10px] font-medium ${SOURCE_BADGE[source]}`}>
      {source === "Auto-Assigned" && <Sparkles size={9} />}
      {source === "Auto-Assigned" ? "Auto-Assigned" : source}
    </span>
  );
}

// ── Detail modal ──────────────────────────────────────────────────────────────

function RequestDetailModal({
  request,
  onOpenChange,
}: {
  request: SpecialRequest | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={request !== null} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request Details</DialogTitle>
        </DialogHeader>
        {request && (
          <div className="flex flex-col gap-5 px-6 py-5">
            <div className="flex items-center justify-between rounded-xl bg-[#faf2e1] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#edd9c0] font-[family-name:var(--font-urbanist)] text-xs font-bold text-[#3b2513]">
                  {request.parentAvatar}
                </div>
                <div>
                  <p className="font-[family-name:var(--font-urbanist)] text-sm font-bold text-[#2d1810]">
                    {request.parentName}
                  </p>
                  <p className="font-[family-name:var(--font-urbanist)] text-[10px] text-[#6b7280]">
                    Sent on {request.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <SourceBadge source={request.source} />
                <StatusBadge status={request.status} />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {[
                ["Request", request.title],
                ["Description", request.description],
                ["Child", request.childName === "—" ? "—" : `${request.childName} — ${request.childRoom} Room`],
                ["Assigned Caregiver", request.caregiverName],
                ["Scheduled Time", request.scheduledTime],
                ["Due Date", request.dueDate],
                ["Reminder Time", request.reminderTime || "—"],
                ["Priority", request.priority],
                ["Source", request.source],
                ["Additional Comment", request.comment || "—"],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-4">
                  <p className="w-[140px] shrink-0 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#6b7280]">
                    {label}
                  </p>
                  <p className="font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#1f2937]">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-end border-t border-[#eaecf0] pt-4">
              <DialogClose className="rounded-lg bg-[#3b2513] px-5 py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1] hover:bg-[#2d1810]">
                Close
              </DialogClose>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ── Add request modal ─────────────────────────────────────────────────────────

function AddRequestModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [childName, setChildName] = useState("");
  const [caregiver, setCaregiver] = useState("");
  const [priority, setPriority] = useState<SpecialRequestPriority>("Medium");
  const [scheduledTime, setScheduledTime] = useState("");

  const canSave = title.trim().length > 0 && description.trim().length > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSave) return;
    onOpenChange(false);
    setTitle("");
    setDescription("");
    setChildName("");
    setCaregiver("");
    setPriority("Medium");
    setScheduledTime("");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Special Request</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-6 py-5">
          <div className="flex flex-col gap-1.5">
            <label className="font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]">Task</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Apply sunscreen before outdoor play" className="h-10 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-[#c47b2c]" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]">Description</label>
            <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What needs to be done..." className="resize-none rounded-lg border border-[#d0d5dd] px-3 py-2.5 font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-[#c47b2c]" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]">Child</label>
              <input type="text" value={childName} onChange={(e) => setChildName(e.target.value)} placeholder="Child name" className="h-10 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-[#c47b2c]" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]">Caregiver</label>
              <input type="text" value={caregiver} onChange={(e) => setCaregiver(e.target.value)} placeholder="Assigned to" className="h-10 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-[#c47b2c]" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]">Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value as SpecialRequestPriority)} className="h-10 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]">
                <option>Low</option><option>Medium</option><option>High</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]">Scheduled Time</label>
              <input type="text" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} placeholder="e.g. 12:30pm" className="h-10 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-[#c47b2c]" />
            </div>
          </div>
          <DialogFooter className="border-t border-[#eaecf0] px-0 pt-2">
            <DialogClose className="rounded-lg border border-[#d0d5dd] px-5 py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810] hover:bg-[#f9fafb]">
              Cancel
            </DialogClose>
            <button type="submit" disabled={!canSave} className="rounded-lg bg-[#3b2513] px-5 py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1] hover:bg-[#2d1810] disabled:opacity-40">
              Save Request
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ── Main tab ──────────────────────────────────────────────────────────────────

const SOURCE_FILTERS: SourceFilter[] = ["All", "Parent", "Auto-Assigned", "Admin", "Routine"];
const STATUS_FILTERS: StatusFilter[] = ["All", "Pending", "In Progress", "Done", "Overdue", "Cancelled"];

export function SpecialRequestsTab() {
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("All");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [viewing, setViewing] = useState<SpecialRequest | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return SPECIAL_REQUESTS.filter((r) => {
      if (sourceFilter !== "All" && r.source !== sourceFilter) return false;
      if (statusFilter !== "All" && r.status !== statusFilter) return false;
      if (
        q &&
        !r.title.toLowerCase().includes(q) &&
        !r.parentName.toLowerCase().includes(q) &&
        !r.childName.toLowerCase().includes(q) &&
        !r.caregiverName.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [search, sourceFilter, statusFilter]);

  const stats = useMemo(() => {
    const all = SPECIAL_REQUESTS;
    return {
      total: all.length,
      parent: all.filter((r) => r.source === "Parent").length,
      aiAssigned: all.filter((r) => r.source === "Auto-Assigned").length,
      pending: all.filter((r) => r.status === "Pending").length,
      inProgress: all.filter((r) => r.status === "In Progress").length,
      done: all.filter((r) => r.status === "Done").length,
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-6">
        {[
          { label: "Total", value: stats.total, color: "text-[#2d1810]" },
          { label: "From Parents", value: stats.parent, color: "text-[#c47b2c]" },
          { label: "Auto-Assigned", value: stats.aiAssigned, color: "text-[#7c3aed]" },
          { label: "Pending", value: stats.pending, color: "text-[#cc8000]" },
          { label: "In Progress", value: stats.inProgress, color: "text-[#1a73e8]" },
          { label: "Done", value: stats.done, color: "text-[#009061]" },
        ].map((s) => (
          <div key={s.label} className="flex flex-col gap-1 rounded-xl border border-[#e6ebf3] bg-white p-3">
            <p className="font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">{s.label}</p>
            <p className={`font-[family-name:var(--font-merriweather)] text-xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4">
          <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
            Special Requests & Tasks
          </h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute top-1/2 left-2 size-3.5 -translate-y-1/2 text-[#9ca3af]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search requests, parents, children…"
                className="h-8 w-full rounded-lg border border-[rgba(45,24,16,0.12)] bg-[#f5edd8] pl-7 pr-3 font-[family-name:var(--font-urbanist)] text-xs text-[#2d1810] placeholder:text-[#9ca3af] focus:outline-none sm:w-64"
              />
            </div>
            <button
              onClick={() => setAddOpen(true)}
              className="flex items-center gap-1.5 rounded-lg bg-[#3b2513] px-4 py-2 font-[family-name:var(--font-urbanist)] text-xs font-semibold text-[#faf2e1] hover:bg-[#2d1810]"
            >
              Add Request
            </button>
          </div>
        </div>

        {/* Source filter pills */}
        <div className="flex flex-wrap gap-1.5 px-4 pb-2">
          {SOURCE_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setSourceFilter(s)}
              className={`rounded-full border px-3 py-1 font-[family-name:var(--font-urbanist)] text-[11px] font-medium transition-colors ${
                sourceFilter === s
                  ? "border-[#3b2513] bg-[#3b2513] text-[#faf2e1]"
                  : "border-[#d0d5dd] text-[#6b7280] hover:border-[#c47b2c]"
              }`}
            >
              {s === "Auto-Assigned" ? "✦ Auto-Assigned" : s}
            </button>
          ))}
        </div>

        {/* Status filter pills */}
        <div className="flex flex-wrap gap-1.5 px-4 pb-3">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-full border px-3 py-1 font-[family-name:var(--font-urbanist)] text-[11px] font-medium transition-colors ${
                statusFilter === s
                  ? "border-[#c47b2c] bg-[#c47b2c] text-white"
                  : "border-[#d0d5dd] text-[#6b7280] hover:border-[#c47b2c]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#edd9c0]">
                {["Parent", "Request", "Child", "Caregiver", "Source", "Priority", "Due", "Status", "Action"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-[family-name:var(--font-urbanist)] text-sm font-normal text-black">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-10 text-center font-[family-name:var(--font-urbanist)] text-sm text-[#9ca3af]">
                    No requests match your search or filters.
                  </td>
                </tr>
              ) : (
                filtered.map((req) => (
                  <tr key={req.id} className="border-t border-[#eaecf0]">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#edd9c0] font-[family-name:var(--font-urbanist)] text-[10px] font-bold text-[#3b2513]">
                          {req.parentAvatar}
                        </div>
                        <span className="font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]">
                          {req.parentName}
                        </span>
                      </div>
                    </td>
                    <td className="max-w-[180px] px-4 py-3">
                      <p className="truncate font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810]">{req.title}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810]">{req.childName}</p>
                      <p className="font-[family-name:var(--font-urbanist)] text-[10px] text-[#9ca3af]">{req.childRoom}</p>
                    </td>
                    <td className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm text-[#6b7280]">
                      {req.caregiverName}
                    </td>
                    <td className="px-4 py-3"><SourceBadge source={req.source} /></td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]">
                        <span className={`h-2 w-2 rounded-full ${PRIORITY_DOT[req.priority]}`} />
                        {req.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm text-[#6b7280]">
                      {req.dueDate}
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={req.status} /></td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => setViewing(req)} className="font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#3b2513] underline">
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile card list */}
        <div className="flex flex-col gap-2 px-4 pb-4 lg:hidden">
          {filtered.length === 0 && (
            <p className="py-6 text-center font-[family-name:var(--font-urbanist)] text-sm text-[#9ca3af]">
              No requests match your search or filters.
            </p>
          )}
          {filtered.map((req) => (
            <button
              key={req.id}
              onClick={() => setViewing(req)}
              className="w-full rounded-xl border border-[#eaecf0] p-3 text-left transition-colors hover:bg-[#faf9f7]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#edd9c0] font-[family-name:var(--font-urbanist)] text-[10px] font-bold text-[#3b2513]">
                    {req.parentAvatar}
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#2d1810]">{req.parentName}</p>
                    <p className="font-[family-name:var(--font-urbanist)] text-[10px] text-[#9ca3af]">{req.childName} • {req.caregiverName}</p>
                  </div>
                </div>
                <StatusBadge status={req.status} />
              </div>
              <p className="mt-1.5 truncate font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">{req.title}</p>
              <div className="mt-1.5 flex items-center gap-2">
                <SourceBadge source={req.source} />
                <span className="inline-flex items-center gap-1 font-[family-name:var(--font-urbanist)] text-[10px] text-[#6b7280]">
                  <span className={`h-1.5 w-1.5 rounded-full ${PRIORITY_DOT[req.priority]}`} />
                  {req.priority}
                </span>
                <span className="text-[#d0d5dd]">•</span>
                <span className="font-[family-name:var(--font-urbanist)] text-[10px] text-[#9ca3af]">{req.dueDate}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <RequestDetailModal request={viewing} onOpenChange={(open) => !open && setViewing(null)} />
      <AddRequestModal open={addOpen} onOpenChange={setAddOpen} />
    </div>
  );
}
