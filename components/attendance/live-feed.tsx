"use client";

import { useAttendance } from "@/lib/attendance/store";

export function LiveFeed() {
  const { state } = useAttendance();
  const hasRealScans = state.feed.length > 0;

  const displayFeed = hasRealScans ? state.feed : [
    { id: "1", initials: "SO", name: "Mrs. Sarah Okonkwo", role: "Caregiver", time: "9:14 AM", status: "IN" as const, method: "QR" as const },
    { id: "2", initials: "JA", name: "Mr. James Adamu", role: "Marketer", time: "9:02 AM", status: "IN" as const, method: "QR" as const },
    { id: "3", initials: "NE", name: "Mrs. Ngozi Eze", role: "Caregiver", time: "8:55 AM", status: "OUT" as const, method: "Manual" as const },
  ];

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="mb-1 flex items-center justify-between">
        <span className="font-[family-name:var(--font-merriweather)] text-sm font-bold text-[#2d1810]">
          Live Scanned Feed
        </span>
        <span className="rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-[10px] text-red-500">
          ● Live
        </span>
      </div>

      {!hasRealScans && (
        <p className="mb-1 text-[10px] italic text-[#9ca3af]">
          No scans yet today — showing example activity
        </p>
      )}

      <div className="flex flex-col">
        {displayFeed.slice(0, 8).map((row) => (
          <div
            key={row.id}
            className={`flex items-center justify-between border-b border-[#f3f4f6] py-2.5 last:border-0 ${row.isException ? "bg-red-50 -mx-4 px-4" : ""}`}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#edd9c0] font-[family-name:var(--font-urbanist)] text-xs font-bold text-[#3b2513]">
                {row.initials}
              </div>
              <div>
                <p className="font-[family-name:var(--font-nunito)] text-xs font-semibold text-[#2d1810]">
                  {row.name}
                </p>
                <p className="font-[family-name:var(--font-urbanist)] text-[10px] text-[#6b7280]">
                  {row.role}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-[family-name:var(--font-urbanist)] text-[10px] text-[#9ca3af]">
                {row.time}
              </span>
              <span className={`rounded-full px-3 py-1 font-[family-name:var(--font-urbanist)] text-xs font-medium ${
                row.isException
                  ? "bg-red-100 text-red-700"
                  : row.status === "IN"
                  ? "bg-[#edd9c0] text-[#3b2513]"
                  : "bg-gray-100 text-gray-600"
              }`}>
                {row.isException ? "⚠ EXC" : row.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
