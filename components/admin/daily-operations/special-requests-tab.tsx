"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  SPECIAL_REQUESTS,
  type SpecialRequest,
  type SpecialRequestStatus,
} from "@/lib/mock-data/special-requests";

// ── Status badge ──────────────────────────────────────────────────────────────

const STATUS_STYLE: Record<SpecialRequestStatus, string> = {
  Done: "bg-[#e6f9ee] text-[#009061]",
  "In Progress": "bg-[#e8f0fe] text-[#1a73e8]",
  Pending: "bg-[#fff6e6] text-[#cc8000]",
  Undone: "bg-[#fde8e8] text-[#d32f2f]",
};

function StatusBadge({ status }: { status: SpecialRequestStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-[family-name:var(--font-urbanist)] text-xs font-medium ${STATUS_STYLE[status]}`}
    >
      ● {status}
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
          <DialogTitle>Special Request Details</DialogTitle>
        </DialogHeader>

        {request && (
          <div className="flex flex-col gap-5 px-6 py-5">
            {/* Header card */}
            <div className="flex items-center justify-between rounded-xl bg-[#faf2e1] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#edd9c0] font-[family-name:var(--font-urbanist)] text-xs font-bold text-[#3b2513]">
                  {request.parentAvatar}
                </div>
                <div>
                  <p className="font-[family-name:var(--font-nunito)] text-sm font-bold text-[#2d1810]">
                    {request.parentName}
                  </p>
                  <p className="font-[family-name:var(--font-nunito)] text-[10px] text-[#6b7280]">
                    Sent on {request.date}
                  </p>
                </div>
              </div>
              <StatusBadge status={request.status} />
            </div>

            {/* Fields */}
            <div className="flex flex-col gap-4">
              {[
                ["Request", request.title],
                ["Description", request.description],
                ["Child", `${request.childName} — ${request.childRoom} Room`],
                ["Assigned Caregiver", request.caregiverName],
                ["Scheduled Time", request.scheduledTime],
                ["Reminder Time", request.reminderTime || "—"],
                ["Additional Comment", request.comment || "—"],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-4">
                  <p className="w-[140px] shrink-0 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#6b7280]">
                    {label}
                  </p>
                  <p className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#1f2937]">
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

// ── Main tab ──────────────────────────────────────────────────────────────────

type StatusFilter = "All" | SpecialRequestStatus;

const STATUS_FILTERS: StatusFilter[] = ["All", "Pending", "In Progress", "Done", "Undone"];

export function SpecialRequestsTab() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [viewing, setViewing] = useState<SpecialRequest | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return SPECIAL_REQUESTS.filter((r) => {
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
  }, [search, statusFilter]);

  const stats = useMemo(() => {
    const all = SPECIAL_REQUESTS;
    return {
      total: all.length,
      pending: all.filter((r) => r.status === "Pending").length,
      inProgress: all.filter((r) => r.status === "In Progress").length,
      done: all.filter((r) => r.status === "Done").length,
      undone: all.filter((r) => r.status === "Undone").length,
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {[
          { label: "Total Requests", value: stats.total, color: "text-[#2d1810]" },
          { label: "Pending", value: stats.pending, color: "text-[#cc8000]" },
          { label: "In Progress", value: stats.inProgress, color: "text-[#1a73e8]" },
          { label: "Done", value: stats.done, color: "text-[#009061]" },
          { label: "Undone", value: stats.undone, color: "text-[#d32f2f]" },
        ].map((s) => (
          <div key={s.label} className="flex flex-col gap-1 rounded-xl border border-[#e6ebf3] bg-white p-3">
            <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{s.label}</p>
            <p className={`font-[family-name:var(--font-merriweather)] text-xl font-bold ${s.color}`}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4">
          <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
            Parent Special Requests
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute top-1/2 left-2 size-3.5 -translate-y-1/2 text-[#9ca3af]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search requests, parents, children…"
                className="h-8 w-full rounded-lg border border-[rgba(45,24,16,0.12)] bg-[#f5edd8] pl-7 pr-3 font-[family-name:var(--font-nunito)] text-xs text-[#2d1810] placeholder:text-[#9ca3af] focus:outline-none sm:w-64"
              />
            </div>
          </div>
        </div>

        {/* Status filter pills */}
        <div className="flex flex-wrap gap-1.5 px-4 pb-3">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-full border px-3 py-1 font-[family-name:var(--font-urbanist)] text-[11px] font-medium transition-colors ${
                statusFilter === s
                  ? "border-[#3b2513] bg-[#3b2513] text-[#faf2e1]"
                  : "border-[#d0d5dd] text-[#6b7280] hover:border-[#c47b2c]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto lg:block">
          <Table>
            <TableHeader>
              <TableRow className="border-none bg-[#edd9c0] hover:bg-[#edd9c0]">
                <TableHead className="font-[family-name:var(--font-nunito)] text-sm font-normal text-black">
                  Parent
                </TableHead>
                <TableHead className="font-[family-name:var(--font-nunito)] text-sm font-normal text-black">
                  Request
                </TableHead>
                <TableHead className="font-[family-name:var(--font-nunito)] text-sm font-normal text-black">
                  Child
                </TableHead>
                <TableHead className="font-[family-name:var(--font-nunito)] text-sm font-normal text-black">
                  Caregiver
                </TableHead>
                <TableHead className="font-[family-name:var(--font-nunito)] text-sm font-normal text-black">
                  Time
                </TableHead>
                <TableHead className="font-[family-name:var(--font-nunito)] text-sm font-normal text-black">
                  Date
                </TableHead>
                <TableHead className="font-[family-name:var(--font-nunito)] text-sm font-normal text-black">
                  Status
                </TableHead>
                <TableHead className="text-center font-[family-name:var(--font-nunito)] text-sm font-normal text-black">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="py-10 text-center font-[family-name:var(--font-nunito)] text-sm text-[#9ca3af]">
                    No special requests match your search or filters.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((req) => (
                  <TableRow key={req.id} className="border-t border-[#eaecf0]">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#edd9c0] font-[family-name:var(--font-urbanist)] text-[10px] font-bold text-[#3b2513]">
                          {req.parentAvatar}
                        </div>
                        <span className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]">
                          {req.parentName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      <p className="truncate font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                        {req.title}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                        {req.childName}
                      </p>
                      <p className="font-[family-name:var(--font-nunito)] text-[10px] text-[#9ca3af]">
                        {req.childRoom} Room
                      </p>
                    </TableCell>
                    <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
                      {req.caregiverName}
                    </TableCell>
                    <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
                      {req.scheduledTime}
                    </TableCell>
                    <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
                      {req.date}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={req.status} />
                    </TableCell>
                    <TableCell className="text-center">
                      <button
                        onClick={() => setViewing(req)}
                        className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#3b2513] underline"
                      >
                        View
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile card list */}
        <div className="flex flex-col gap-2 px-4 pb-4 lg:hidden">
          {filtered.length === 0 && (
            <p className="py-6 text-center font-[family-name:var(--font-nunito)] text-sm text-[#9ca3af]">
              No special requests match your search or filters.
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
                    <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
                      {req.parentName}
                    </p>
                    <p className="font-[family-name:var(--font-nunito)] text-[10px] text-[#9ca3af]">
                      {req.childName} • {req.caregiverName}
                    </p>
                  </div>
                </div>
                <StatusBadge status={req.status} />
              </div>
              <p className="mt-1.5 truncate font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
                {req.title}
              </p>
              <div className="mt-1 flex items-center gap-2">
                <span className="font-[family-name:var(--font-nunito)] text-[10px] text-[#9ca3af]">
                  {req.scheduledTime}
                </span>
                <span className="text-[#d0d5dd]">•</span>
                <span className="font-[family-name:var(--font-nunito)] text-[10px] text-[#9ca3af]">
                  {req.date}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <RequestDetailModal request={viewing} onOpenChange={(open) => !open && setViewing(null)} />
    </div>
  );
}
