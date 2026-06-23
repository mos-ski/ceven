"use client";

import { useState } from "react";
import { ChevronDown, Check, ChevronLeft, ChevronRight, X } from "lucide-react";

import { StatCard } from "@/components/admin/stat-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ACTIVE_LEAVE,
  LEAVE_BALANCES,
  LEAVE_BLOCKED_DAYS,
  LEAVE_CALENDAR_ENTRIES,
  LEAVE_CALENDAR_MONTH,
  LEAVE_REQUESTS,
  UPCOMING_LEAVE,
  type LeaveCalendarStatus,
  type LeaveRequest,
  type LeaveStatus,
} from "@/lib/mock-data/staff";

const STATUS_STYLES: Record<LeaveStatus, string> = {
  Approved: "bg-[#ecfff8] border border-[#009061] text-[#009061]",
  Pending: "bg-[#fff6e6] border border-[#cc8000] text-[#cc8000]",
  Rejected: "bg-[#fff5f5] border border-[#ef4444] text-[#ef4444]",
};

const CALENDAR_BADGE_STYLES: Record<LeaveCalendarStatus, string> = {
  Scheduled: "bg-[#fff6e6] text-[#cc8000]",
  Approved: "bg-[#efe9ff] text-[#6d4fe0]",
  Completed: "bg-[#ecfff8] text-[#009061]",
};

type LeaveSubTab = "Leave Request" | "Leave Balances" | "Calender";
const SUB_TABS: LeaveSubTab[] = ["Leave Request", "Leave Balances", "Calender"];

const APRIL_2025_DAYS = 30;
const APRIL_2025_LEADING_BLANKS = 2;

function StatusBadge({ status }: { status: LeaveStatus }) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 font-[family-name:var(--font-urbanist)] text-xs ${STATUS_STYLES[status]}`}>
      {status}
    </span>
  );
}

function LeaveDecisionModal({
  request,
  decision,
  onClose,
}: {
  request: LeaveRequest;
  decision: "approve" | "reject";
  onClose: () => void;
}) {
  const isApprove = decision === "approve";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="flex w-full max-w-[420px] flex-col items-center gap-4 rounded-2xl bg-white px-8 pt-8 pb-6 text-center shadow-2xl">
        <div
          className={`flex size-12 items-center justify-center rounded-full ${
            isApprove ? "bg-[#ecfff8] text-[#009061]" : "bg-[#fff5f5] text-[#ef4444]"
          }`}
        >
          {isApprove ? <Check className="size-6" /> : <X className="size-6" />}
        </div>
        <h2 className="font-[family-name:var(--font-merriweather)] text-xl font-bold text-[#2d1810]">
          {isApprove ? "Approve Leave Request" : "Reject Leave Request"}
        </h2>
        <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
          {isApprove
            ? `Approve ${request.name}'s ${request.leaveType.toLowerCase()} request from ${request.startDate} to ${request.endDate} (${request.days} day${request.days > 1 ? "s" : ""}).`
            : `Reject ${request.name}'s ${request.leaveType.toLowerCase()} request from ${request.startDate} to ${request.endDate}?`}
        </p>
        <div className="flex w-full items-center justify-end gap-3 border-t border-[#eaecf0] pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#d0d5dd] px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810] hover:bg-[#f9fafb]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onClose}
            className={`rounded-lg px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-medium text-white ${
              isApprove ? "bg-[#009061]" : "bg-[#ef4444]"
            }`}
          >
            {isApprove ? "Yes, Approve" : "Yes, Reject"}
          </button>
        </div>
      </div>
    </div>
  );
}

function CreateLeavePreferenceModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="flex w-full max-w-[480px] flex-col rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-[#eaecf0] px-6 pt-6 pb-4">
          <div>
            <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
              Create Leave Preference
            </h2>
            <p className="mt-0.5 font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
              Define a leave type and its default entitlement.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded p-1 text-[#6b7280] hover:text-[#2d1810]"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="flex flex-col gap-4 px-6 py-5">
          <div className="flex flex-col gap-1.5">
            <label className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
              Leave Type
            </label>
            <input
              type="text"
              placeholder="e.g. Annual Leave"
              className="rounded-lg border border-[#d0d5dd] px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
                Days Per Year
              </label>
              <input
                type="number"
                placeholder="21"
                className="rounded-lg border border-[#d0d5dd] px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
                Applies To
              </label>
              <select className="rounded-lg border border-[#d0d5dd] bg-white px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]">
                <option>All Staff</option>
                <option>Full time</option>
                <option>Contract</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 border-t border-[#eaecf0] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#d0d5dd] px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810] hover:bg-[#f9fafb]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-[#3b2513] px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#faf2e1]"
          >
            Save Preference
          </button>
        </div>
      </div>
    </div>
  );
}

type LeaveTypeFilter = "All Types" | "Annual" | "Sick" | "Others";
const LEAVE_TYPE_FILTERS: LeaveTypeFilter[] = ["All Types", "Annual", "Sick", "Others"];

function LeaveBalancesTable() {
  const [typeFilter, setTypeFilter] = useState<LeaveTypeFilter>("All Types");

  const showAnnual = typeFilter === "All Types" || typeFilter === "Annual";
  const showSick = typeFilter === "All Types" || typeFilter === "Sick";
  const showOthers = typeFilter === "All Types" || typeFilter === "Others";

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4">
        <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
          Leave Balance (2025)
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button className="flex items-center gap-1.5 rounded-lg border border-[#d0d5dd] bg-white px-3 py-1.5 font-[family-name:var(--font-nunito)] text-xs" />
            }
          >
            {typeFilter}
            <ChevronDown className="size-3" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {LEAVE_TYPE_FILTERS.map((option) => (
              <DropdownMenuItem key={option} onClick={() => setTypeFilter(option)}>
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#edd9c0]">
              <th className="px-4 py-3 text-xs font-semibold font-[family-name:var(--font-nunito)] text-[#2d1810]">Staff</th>
              {showAnnual && (
                <>
                  <th className="px-4 py-3 text-xs font-semibold font-[family-name:var(--font-nunito)] text-[#2d1810]">Annual Entitled</th>
                  <th className="px-4 py-3 text-xs font-semibold font-[family-name:var(--font-nunito)] text-[#2d1810]">Annual Taken</th>
                  <th className="px-4 py-3 text-xs font-semibold font-[family-name:var(--font-nunito)] text-[#2d1810]">Annual Left</th>
                </>
              )}
              {showSick && (
                <>
                  <th className="px-4 py-3 text-xs font-semibold font-[family-name:var(--font-nunito)] text-[#2d1810]">Sick Taken</th>
                  <th className="px-4 py-3 text-xs font-semibold font-[family-name:var(--font-nunito)] text-[#2d1810]">Sick Remaining</th>
                </>
              )}
              {showOthers && (
                <th className="px-4 py-3 text-xs font-semibold font-[family-name:var(--font-nunito)] text-[#2d1810]">Others</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eaecf0]">
            {LEAVE_BALANCES.map((b) => (
              <tr key={b.id} className="hover:bg-[#faf9f7]">
                <td className="px-4 py-3 text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">{b.name}</td>
                {showAnnual && (
                  <>
                    <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{b.annualEntitled} days</td>
                    <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{b.annualTaken} days</td>
                    <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{b.annualEntitled - b.annualTaken} days</td>
                  </>
                )}
                {showSick && (
                  <>
                    <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{b.sickTaken}</td>
                    <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{b.sickRemaining}</td>
                  </>
                )}
                {showOthers && (
                  <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{b.others}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile card list */}
      <div className="flex flex-col gap-2 p-4 lg:hidden">
        {LEAVE_BALANCES.map((b) => (
          <div key={b.id} className="rounded-xl border border-[#eaecf0] p-3">
            <p className="text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">{b.name}</p>
            <p className="mt-1 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
              {b.annualEntitled - b.annualTaken} of {b.annualEntitled} annual days left • {b.sickRemaining} sick days remaining
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LeaveCalendarView() {
  const entriesByDay = new Map(LEAVE_CALENDAR_ENTRIES.map((e) => [e.day, e]));
  const cells: (number | null)[] = [
    ...Array.from({ length: APRIL_2025_LEADING_BLANKS }, () => null),
    ...Array.from({ length: APRIL_2025_DAYS }, (_, i) => i + 1),
  ];

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="flex-1 overflow-hidden rounded-xl bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button aria-label="Previous month" className="rounded p-1 text-[#6b7280] hover:text-[#2d1810]">
              <ChevronLeft className="size-4" />
            </button>
            <h2 className="font-[family-name:var(--font-merriweather)] text-base font-bold text-[#2d1810]">
              {LEAVE_CALENDAR_MONTH}
            </h2>
            <button aria-label="Next month" className="rounded p-1 text-[#6b7280] hover:text-[#2d1810]">
              <ChevronRight className="size-4" />
            </button>
          </div>
          <button className="flex items-center gap-1.5 rounded-lg border border-[#d0d5dd] bg-white px-3 py-1.5 font-[family-name:var(--font-nunito)] text-xs">
            Upcoming Leave
            <ChevronDown className="size-3" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="py-1 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
              {d}
            </div>
          ))}
          {cells.map((day, i) => {
            if (day === null) return <div key={`blank-${i}`} />;
            const entry = entriesByDay.get(day);
            const isBlocked = LEAVE_BLOCKED_DAYS.includes(day);
            return (
              <div
                key={day}
                className={`flex min-h-[64px] flex-col gap-1 rounded-lg border p-1.5 text-left ${
                  isBlocked ? "border-[#eaecf0] bg-[#f9fafb]" : "border-[#eaecf0] bg-white"
                }`}
              >
                <span className={`font-[family-name:var(--font-nunito)] text-xs ${isBlocked ? "text-[#9ca3af]" : "text-[#2d1810]"}`}>
                  {day}
                </span>
                {entry?.name && (
                  <p className="font-[family-name:var(--font-nunito)] text-[10px] font-semibold text-[#2d1810]">{entry.name}</p>
                )}
                {entry?.leaveType && (
                  <p className="font-[family-name:var(--font-nunito)] text-[10px] text-[#6b7280]">{entry.leaveType}</p>
                )}
                {entry && (
                  <span className={`w-fit rounded px-1.5 py-0.5 font-[family-name:var(--font-urbanist)] text-[9px] ${CALENDAR_BADGE_STYLES[entry.status]}`}>
                    {entry.status}
                  </span>
                )}
                {isBlocked && (
                  <span className="w-fit rounded bg-[#f3f4f6] px-1.5 py-0.5 font-[family-name:var(--font-urbanist)] text-[9px] text-[#6b7280]">
                    Blocked
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex w-full flex-col gap-4 lg:w-[280px]">
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <h3 className="font-[family-name:var(--font-merriweather)] text-sm font-bold text-[#2d1810]">Active Leave</h3>
          <p className="mt-3 font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">{ACTIVE_LEAVE.name}</p>
          <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{ACTIVE_LEAVE.leaveType}</p>
          <p className="mt-1 font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">{ACTIVE_LEAVE.dateRange}</p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-[family-name:var(--font-merriweather)] text-sm font-bold text-[#2d1810]">Upcoming Leave</h3>
            <button className="font-[family-name:var(--font-nunito)] text-xs font-semibold text-[#3b2513]">View All</button>
          </div>
          <div className="mt-3 flex flex-col gap-3">
            {UPCOMING_LEAVE.map((u) => (
              <div key={u.id} className="flex items-center gap-3">
                <div className="flex flex-col items-center rounded-lg bg-[#f5edd8] px-2 py-1">
                  <span className="font-[family-name:var(--font-nunito)] text-xs font-bold text-[#3b2513]">{u.day}</span>
                  <span className="font-[family-name:var(--font-nunito)] text-[9px] text-[#6b7280]">{u.month}</span>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-nunito)] text-xs font-semibold text-[#2d1810]">{u.name}</p>
                  <p className="font-[family-name:var(--font-nunito)] text-[10px] text-[#9ca3af]">{u.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LeaveRequestTable({
  onDecide,
}: {
  onDecide: (request: LeaveRequest, decision: "approve" | "reject") => void;
}) {
  return (
    <>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
          Leave Request
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-[family-name:var(--font-nunito)] text-[#6b7280]">
            Filter by:
          </span>
          <button className="flex items-center gap-1.5 rounded-lg border border-[#d0d5dd] bg-white px-3 py-1.5 font-[family-name:var(--font-nunito)] text-xs">
            All Status
            <ChevronDown className="size-3" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#edd9c0]">
                {["Staff", "Leave Type", "Dates", "Days", "Reason", "Status", "Action"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-xs font-semibold font-[family-name:var(--font-nunito)] text-[#2d1810]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eaecf0]">
              {LEAVE_REQUESTS.map((r) => (
                <tr key={r.id} className="hover:bg-[#faf9f7]">
                  <td className="px-4 py-3">
                    <p className="text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">
                      {r.name}
                    </p>
                    <p className="text-[10px] text-[#858c98]">{r.role}</p>
                  </td>
                  <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">
                    {r.leaveType}
                  </td>
                  <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">
                    {r.startDate} – {r.endDate}
                  </td>
                  <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">
                    {r.days}
                  </td>
                  <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">
                    {r.reason}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="px-4 py-3">
                    {r.status === "Pending" ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onDecide(r, "approve")}
                          aria-label={`Approve ${r.name}'s leave`}
                          className="rounded p-1 text-[#009061] hover:bg-[#ecfff8]"
                        >
                          <Check className="size-4" />
                        </button>
                        <button
                          onClick={() => onDecide(r, "reject")}
                          aria-label={`Reject ${r.name}'s leave`}
                          className="rounded p-1 text-[#ef4444] hover:bg-[#fff5f5]"
                        >
                          <X className="size-4" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-[#9ca3af]">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobile card list */}
        <div className="flex flex-col gap-2 p-4 lg:hidden">
          {LEAVE_REQUESTS.map((r) => (
            <div key={r.id} className="rounded-xl border border-[#eaecf0] p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">
                    {r.name}
                  </p>
                  <p className="text-[10px] text-[#858c98]">
                    {r.leaveType} • {r.startDate} – {r.endDate}
                  </p>
                </div>
                <StatusBadge status={r.status} />
              </div>
              {r.status === "Pending" && (
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => onDecide(r, "approve")}
                    className="flex-1 rounded-lg border border-[#009061] py-1.5 text-xs font-medium text-[#009061]"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => onDecide(r, "reject")}
                    className="flex-1 rounded-lg border border-[#ef4444] py-1.5 text-xs font-medium text-[#ef4444]"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export function LeaveManagementTab() {
  const [subTab, setSubTab] = useState<LeaveSubTab>("Leave Request");
  const [preferenceOpen, setPreferenceOpen] = useState(false);
  const [decisionModal, setDecisionModal] = useState<{
    request: LeaveRequest;
    decision: "approve" | "reject";
  } | null>(null);

  const pendingCount = LEAVE_REQUESTS.filter((r) => r.status === "Pending").length;
  const approvedCount = LEAVE_REQUESTS.filter((r) => r.status === "Approved").length;
  const rejectedCount = LEAVE_REQUESTS.filter((r) => r.status === "Rejected").length;

  return (
    <>
      <div className="space-y-4">
        {/* Header action */}
        <div className="flex justify-end">
          <button
            onClick={() => setPreferenceOpen(true)}
            className="rounded-lg bg-[#3b2513] px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#faf2e1]"
          >
            Create Leave Preference
          </button>
        </div>

        {/* Stats row */}
        <div className="flex gap-3 overflow-x-auto pb-1 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
          <div className="min-w-[160px] flex-1">
            <StatCard label="Pending Requests" value={String(pendingCount)} trendLabel="awaiting review" />
          </div>
          <div className="min-w-[160px] flex-1">
            <StatCard label="Approved" value={String(approvedCount)} trendLabel="this month" trendUp />
          </div>
          <div className="min-w-[160px] flex-1">
            <StatCard label="Rejected" value={String(rejectedCount)} trendLabel="this month" />
          </div>
          <div className="min-w-[160px] flex-1">
            <StatCard label="On Leave Today" value="1" trendLabel="staff member" />
          </div>
        </div>

        {/* Sub-tab nav */}
        <div className="flex overflow-x-auto border-b border-[#e6ebf3]">
          {SUB_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setSubTab(tab)}
              className={`whitespace-nowrap px-4 py-2 text-sm font-medium font-[family-name:var(--font-urbanist)] cursor-pointer ${
                subTab === tab
                  ? "border-b-2 border-[#3b2513] text-[#3b2513]"
                  : "text-[#6b7280] hover:text-[#2d1810]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {subTab === "Leave Request" && (
          <LeaveRequestTable onDecide={(request, decision) => setDecisionModal({ request, decision })} />
        )}
        {subTab === "Leave Balances" && <LeaveBalancesTable />}
        {subTab === "Calender" && <LeaveCalendarView />}
      </div>

      {decisionModal && (
        <LeaveDecisionModal
          request={decisionModal.request}
          decision={decisionModal.decision}
          onClose={() => setDecisionModal(null)}
        />
      )}
      {preferenceOpen && <CreateLeavePreferenceModal onClose={() => setPreferenceOpen(false)} />}
    </>
  );
}
