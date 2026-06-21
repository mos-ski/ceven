"use client";

import { useState } from "react";
import { ChevronDown, Check, X } from "lucide-react";

import { StatCard } from "@/components/admin/stat-card";
import { LEAVE_REQUESTS, type LeaveRequest, type LeaveStatus } from "@/lib/mock-data/staff";

const STATUS_STYLES: Record<LeaveStatus, string> = {
  Approved: "bg-[#ecfff8] border border-[#009061] text-[#009061]",
  Pending: "bg-[#fff6e6] border border-[#cc8000] text-[#cc8000]",
  Rejected: "bg-[#fff5f5] border border-[#ef4444] text-[#ef4444]",
};

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

export function LeaveManagementTab() {
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

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
            Leave Requests
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
                            onClick={() => setDecisionModal({ request: r, decision: "approve" })}
                            aria-label={`Approve ${r.name}'s leave`}
                            className="rounded p-1 text-[#009061] hover:bg-[#ecfff8]"
                          >
                            <Check className="size-4" />
                          </button>
                          <button
                            onClick={() => setDecisionModal({ request: r, decision: "reject" })}
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
                      onClick={() => setDecisionModal({ request: r, decision: "approve" })}
                      className="flex-1 rounded-lg border border-[#009061] py-1.5 text-xs font-medium text-[#009061]"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => setDecisionModal({ request: r, decision: "reject" })}
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
      </div>

      {decisionModal && (
        <LeaveDecisionModal
          request={decisionModal.request}
          decision={decisionModal.decision}
          onClose={() => setDecisionModal(null)}
        />
      )}
    </>
  );
}
