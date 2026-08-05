"use client";

import { useState } from "react";
import { Clock3, Palmtree, CheckCircle2, CalendarDays, Check, X, Download, CalendarPlus } from "lucide-react";
import { toast } from "sonner";

import { StatCardV3 } from "@/components/admin-v3/stat-card";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ACTIVE_LEAVE, LEAVE_BALANCES, LEAVE_REQUESTS, type LeaveStatus } from "@/lib/mock-data/staff";
import { exportRowsToCsv } from "@/lib/super-admin/export-csv";

const STATUS_STYLES: Record<LeaveStatus, string> = {
  Approved: "bg-[#EAF6EE] text-[#1E7A3D] border border-[#1E7A3D]/25",
  Pending: "bg-[#FDF1E3] text-[#C47B2C] border border-[#C47B2C]/30",
  Rejected: "bg-[#FBEAE6] text-[#D4522F] border border-[#D4522F]/25",
};

// "Cover arranged" isn't tracked in the shared LEAVE_REQUESTS mock — derived deterministically
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
      <PageHeader
        title="Leave Management"
        description={`${pendingCount} pending requests · 1 staff currently on leave · annual leave year: Jan–Dec`}
        action={
          <>
            <Button
              variant="outline"
              onClick={() =>
                exportRowsToCsv(
                  "leave-requests.csv",
                  ["Staff", "Type", "From", "To", "Days", "Status"],
                  requests.map((r) => [r.name, r.leaveType, r.startDate, r.endDate, r.days, r.status]),
                )
              }
              className="h-9 gap-2 rounded-lg border-[#d0d5dd] px-4 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button
              onClick={() => toast.success("Leave request submitted")}
              className="h-9 gap-2 rounded-lg bg-[#3b2513] px-4 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#faf2e1]"
            >
              <CalendarPlus className="h-4 w-4" />
              Request Leave
            </Button>
          </>
        }
      />

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
      <Card padding="none">
        <div className="flex items-center justify-between p-4">
          <p className="text-sm font-bold text-[#2D1810]">Leave Requests</p>
        </div>
        <Table className="min-w-[880px] pb-4">
          <TableHeader>
            <TableRow>
              <TableHead>Staff</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Days</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Cover Arranged</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="pr-0">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((r, i) => (
              <TableRow key={r.id}>
                <TableCell>
                  <p className="font-semibold text-[#2D1810]">{r.name}</p>
                  <p className="text-[11px] text-[#2D1810]/40">{r.role}</p>
                </TableCell>
                <TableCell>{r.leaveType}</TableCell>
                <TableCell>{r.startDate}</TableCell>
                <TableCell>{r.endDate}</TableCell>
                <TableCell className="font-semibold text-[#2D1810]">{r.days}</TableCell>
                <TableCell>{r.reason}</TableCell>
                <TableCell>
                  <span
                    className={`text-xs font-semibold ${
                      coverArranged(r.days, i) === "Arranged" ? "text-[#1E7A3D]" : "text-[#D4522F]"
                    }`}
                  >
                    {coverArranged(r.days, i)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[r.status]}`}>
                    {r.status}
                  </span>
                </TableCell>
                <TableCell className="pr-0">
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
                    <span className="text-xs text-[#2D1810]/30">-</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
