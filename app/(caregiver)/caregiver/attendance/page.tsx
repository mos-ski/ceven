"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle, XCircle, Clock, ScanLine } from "lucide-react";
import { mockAttendance } from "@/lib/caregiver/mock-data";
import type { AttendanceRecord } from "@/lib/caregiver/mock-data";
import { BottomNav } from "@/components/caregiver/bottom-nav";
import { LogSheet } from "@/components/caregiver/log-sheet";
import { NewBadge } from "@/components/caregiver/new-badge";
import { OneTimeCode } from "@/components/attendance/one-time-code";

const STATUS_STYLES: Record<AttendanceRecord["status"], string> = {
  present: "bg-green-100 text-green-700",
  absent: "bg-red-100 text-red-600",
  late: "bg-amber-100 text-amber-600",
};

const STATUS_ICONS: Record<AttendanceRecord["status"], React.ReactNode> = {
  present: <CheckCircle size={14} />,
  absent: <XCircle size={14} />,
  late: <Clock size={14} />,
};

export default function AttendancePage() {
  const router = useRouter();
  const [records, setRecords] = useState(mockAttendance);

  function toggleStatus(childId: string) {
    setRecords((prev) =>
      prev.map((r) => {
        if (r.childId !== childId) return r;
        const next: AttendanceRecord["status"] =
          r.status === "absent"
            ? "present"
            : r.status === "present"
            ? "late"
            : "absent";
        return {
          ...r,
          status: next,
          checkInTime:
            next === "present"
              ? new Date().toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                }) + " AM"
              : null,
          checkOutTime: next === "present" ? null : r.checkOutTime,
        };
      })
    );
  }

  function checkOut(childId: string) {
    setRecords((prev) =>
      prev.map((r) =>
        r.childId === childId
          ? {
              ...r,
              checkOutTime:
                new Date().toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                }) + " PM",
            }
          : r
      )
    );
  }

  const present = records.filter((r) => r.status === "present").length;
  const absent = records.filter((r) => r.status === "absent").length;
  const late = records.filter((r) => r.status === "late").length;

  return (
    <div className="relative flex flex-1 flex-col bg-cg-bg">
      <div className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-base font-bold text-cg-brand">Attendance</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Scan button */}
        <div className="mb-4 flex items-center gap-2">
          <button
            onClick={() => router.push("/caregiver/scan")}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-cg-brand py-3.5 text-white active:scale-[0.98] transition-transform"
          >
            <ScanLine size={18} />
            <span className="text-sm font-semibold">Scan attendance code</span>
          </button>
          <NewBadge />
        </div>

        {/* Summary */}
        <div className="mb-4 flex gap-3">
          {[
            { label: "Present", count: present, color: "bg-green-100 text-green-700" },
            { label: "Absent", count: absent, color: "bg-red-100 text-red-600" },
            { label: "Late", count: late, color: "bg-amber-100 text-amber-600" },
          ].map(({ label, count, color }) => (
            <div key={label} className="flex-1 rounded-2xl bg-white p-3 text-center shadow-sm">
              <p className={`text-xl font-bold ${color.split(" ")[1]}`}>{count}</p>
              <p className="text-[10px] text-gray-400">{label}</p>
            </div>
          ))}
        </div>

        {/* List */}
        <div className="overflow-hidden rounded-2xl bg-white">
          {records.map((record, i) => (
            <div key={record.childId}>
              <div className="flex items-center gap-3 px-4 py-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cg-brand text-xs font-bold text-white">
                  {record.avatarInitials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-cg-brand">{record.childName}</p>
                  <p className="text-xs text-gray-400">
                    {record.room} · {record.checkInTime ?? "Not checked in"}
                    {record.checkOutTime ? ` · Out ${record.checkOutTime}` : ""}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <button
                    onClick={() => toggleStatus(record.childId)}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${STATUS_STYLES[record.status]}`}
                  >
                    {STATUS_ICONS[record.status]}
                    {record.status}
                  </button>
                  {record.status === "present" && !record.checkOutTime && (
                    <button
                      onClick={() => checkOut(record.childId)}
                      className="text-[10px] font-semibold text-gray-400 underline"
                    >
                      Check out
                    </button>
                  )}
                </div>
              </div>
              {i < records.length - 1 && <div className="mx-4 border-b border-gray-100" />}
            </div>
          ))}
        </div>

        <p className="mt-3 text-center text-xs text-gray-400">
          Tap a status to cycle: Present → Late → Absent
        </p>
        <p className="mt-1.5 flex items-center justify-center gap-1.5 text-center text-xs text-gray-400">
          <NewBadge /> &quot;Check out&quot; is new — tap it once a child has been picked up.
        </p>

        {/* Verify pickup code section */}
        <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center gap-2">
            <p className="text-sm font-semibold text-cg-brand">Verify a pickup code</p>
            <NewBadge />
          </div>
          <p className="mb-3 text-xs text-gray-400">
            Enter a parent&apos;s one-time code to verify and log a pickup.
          </p>
          <OneTimeCode
            mode="verify"
            userName="Ms Anu"
          />
        </div>

        {/* Audit trail legend */}
        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-blue-400" />
            QR verified
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-gray-300" />
            Manual
          </span>
        </div>
      </div>

      <LogSheet />
      <BottomNav />
    </div>
  );
}
