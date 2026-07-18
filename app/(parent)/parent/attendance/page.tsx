"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, LogIn, LogOut, AlertTriangle } from "lucide-react";
import { mockChild, mockAttendanceHistory, type AttendanceStatus } from "@/lib/parent/mock-data";
import { NewBadge } from "@/components/parent/new-badge";

const STATUS_STYLES: Record<AttendanceStatus, string> = {
  present: "bg-emerald-100 text-emerald-700",
  late: "bg-amber-100 text-amber-700",
  absent: "bg-gray-100 text-gray-600",
};

export default function ParentAttendancePage() {
  const router = useRouter();
  const today = mockAttendanceHistory[0];

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#fffefa]">
      <div className="flex items-center gap-3 bg-white px-5 pt-12 pb-4 shadow-sm">
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-cg-brand">Arrivals & Pickups</h1>
            <NewBadge />
          </div>
          <p className="text-xs text-gray-400">For {mockChild.name}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {/* Today status */}
        <div className="mb-5 rounded-2xl bg-cg-brand p-5 text-white">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-white/60">Today</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <LogIn size={16} className="text-emerald-300" />
              <div>
                <p className="text-[11px] text-white/60">Checked in</p>
                <p className="text-sm font-bold">{today.checkInTime ?? "Not yet"}</p>
              </div>
            </div>
            <div className="h-8 w-px bg-white/15" />
            <div className="flex items-center gap-2">
              <LogOut size={16} className="text-white/50" />
              <div>
                <p className="text-[11px] text-white/60">Checked out</p>
                <p className="text-sm font-bold">{today.checkOutTime ?? "Still at creche"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* History */}
        <p className="mb-2 text-sm font-semibold text-gray-700">Past 7 days</p>
        <div className="flex flex-col gap-2">
          {mockAttendanceHistory.map((event, i) => (
            <div key={i} className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="mb-1.5 flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-800">{event.date}</p>
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold capitalize ${STATUS_STYLES[event.status]}`}>
                  {event.status}
                </span>
              </div>
              {event.status === "absent" ? (
                <p className="text-xs text-gray-400">Not at the creche today.</p>
              ) : (
                <p className="text-xs text-gray-500">
                  In {event.checkInTime ?? "—"} · Out {event.checkOutTime ?? "—"}
                  {event.pickedUpBy && ` · ${event.pickedUpBy}`}
                </p>
              )}
              {event.exception && (
                <div className="mt-2 flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2">
                  <AlertTriangle size={13} className="mt-0.5 shrink-0 text-red-500" />
                  <p className="text-[11px] leading-relaxed text-red-700">{event.exception}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
