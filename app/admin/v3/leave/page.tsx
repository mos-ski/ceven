"use client";

import { useState } from "react";
import { Clock3, Palmtree, CheckCircle2, CalendarDays, Check, X } from "lucide-react";

import { StatCardV3 } from "@/components/admin-v3/stat-card";
import { ACTIVE_LEAVE, LEAVE_BALANCES, LEAVE_REQUESTS, type LeaveStatus } from "@/lib/mock-data/staff";

const STATUS_STYLES: Record<LeaveStatus, string> = {
  Approved: "bg-[#EAF6EE] text-[#1E7A3D]",
  Pending: "bg-[#FDF1E3] text-[#C47B2C]",
  Rejected: "bg-[#FBEAE6] text-[#D4522F]",
};

// "Cover arranged" isn't tracked in the shared LEAVE_REQUESTS mock, derived deterministically
// per request (short requests are easier to cover than long/maternity ones) purely for display.
function coverArranged(days: number, index: number) {
  if (days > 30) return "TBC";
  return (days + index) % 2 === 0 ? "Arranged" : "Not yet";
}

export default function LeaveV3Page() {
  const [requests, setRequests] = useState(LEAVE_REQUESTS);

  const pendingCount = requests.filter((r) => r.status === "Pending").length;
  const approvedCount = requests.filter((r) => r.status === "Approved").length;
  const avgDaysAvailable = Math.round(
    LEAVE_BALANCES.reduce((sum, b) => sum + (b.annualEntitled - b.annualTaken), 0) / LEAVE_BALANCES.length,
  );

  function decide(id: string, status: "Approved" | "Rejected") {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2D1810]">
          Leave Management
        </h1>
        <p className="text-sm text-[#2D1810]/50">
          {pendingCount} pending requests · 1 staff currently on leave · annual leave year: Jan–Dec
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCardV3 icon={Clock3} label="Pending" value={String(pendingCount)} sub="awaiting review" subColor="#C47B2C" />
        <StatCardV3 icon={Palmtree} label="On Leave" value="1" sub={ACTIVE_LEAVE.name} />
        <StatCardV3
          icon={CheckCircle2}
          label="Approved This Month"
          value={String(approvedCount)}
          sub="requests cleared"
          subColor="#1E7A3D"
        />
        <StatCardV3 icon={CalendarDays} label="Avg Days Available" value={String(avgDaysAvailable)} sub="per staff member" />
      </div>

      {/* Leave requests */}
      <div className="rounded-2xl bg-[#F5EDD8]/30 p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-bold text-[#2D1810]">Leave Requests</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] border-collapse text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-[#2D1810]/50">
                <th className="pb-2 pr-3 font-semibold">Staff</th>
                <th className="pb-2 pr-3 font-semibold">Type</th>
                <th className="pb-2 pr-3 font-semibold">From</th>
                <th className="pb-2 pr-3 font-semibold">To</th>
                <th className="pb-2 pr-3 font-semibold">Days</th>
                <th className="pb-2 pr-3 font-semibold">Reason</th>
                <th className="pb-2 pr-3 font-semibold">Cover Arranged</th>
                <th className="pb-2 pr-3 font-semibold">Status</th>
                <th className="pb-2 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r, i) => (
                <tr key={r.id} className={i % 2 === 0 ? "bg-white/60" : "bg-transparent"}>
                  <td className="py-2.5 pr-3">
                    <p className="font-semibold text-[#2D1810]">{r.name}</p>
                    <p className="text-[11px] text-[#2D1810]/40">{r.role}</p>
                  </td>
                  <td className="py-2.5 pr-3 text-[#2D1810]/70">{r.leaveType}</td>
                  <td className="py-2.5 pr-3 text-[#2D1810]/70">{r.startDate}</td>
                  <td className="py-2.5 pr-3 text-[#2D1810]/70">{r.endDate}</td>
                  <td className="py-2.5 pr-3 font-semibold text-[#2D1810]">{r.days}</td>
                  <td className="py-2.5 pr-3 text-[#2D1810]/70">{r.reason}</td>
                  <td className="py-2.5 pr-3">
                    <span
                      className={`text-xs font-semibold ${
                        coverArranged(r.days, i) === "Arranged" ? "text-[#1E7A3D]" : "text-[#D4522F]"
                      }`}
                    >
                      {coverArranged(r.days, i)}
                    </span>
                  </td>
                  <td className="py-2.5 pr-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[r.status]}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="py-2.5">
                    {r.status === "Pending" ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => decide(r.id, "Approved")}
                          aria-label={`Approve ${r.name}'s leave`}
                          className="rounded-full p-1 text-[#1E7A3D] hover:bg-[#EAF6EE]"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => decide(r.id, "Rejected")}
                          aria-label={`Decline ${r.name}'s leave`}
                          className="rounded-full p-1 text-[#D4522F] hover:bg-[#FBEAE6]"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-[#2D1810]/30">–</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
