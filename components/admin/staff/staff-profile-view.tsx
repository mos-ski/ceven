"use client";

import Link from "next/link";
import { ChevronLeft, Download, FileText, Upload, ChevronDown } from "lucide-react";

import type { StaffMember } from "@/lib/mock-data/staff";

const logs = [
  { activity: "Daily Report Logged", child: "King Andrew", time: "10 Oct 2025, 3:50 PM", status: "Completed" },
  { activity: "Daily Report Logged", child: "Zara Mohammed", time: "10 Oct 2025, 3:48 PM", status: "Completed" },
  { activity: "Incident Reported", child: "Leo Adeyemi", time: "10 Oct 2025, 9:14 AM", status: "Flagged" },
  { activity: "Attendance Marked", child: "All Lion Room", time: "10 Oct 2025, 8:05 AM", status: "Completed" },
  { activity: "Daily Report Logged", child: "King Andrew", time: "09 Oct 2025, 4:00 PM", status: "Completed" },
  { activity: "Daily Report Logged", child: "Zara Mohammed", time: "09 Oct 2025, 3:55 PM", status: "Completed" },
  { activity: "Late Log Submitted", child: "Leo Adeyemi", time: "08 Oct 2025, 5:30 PM", status: "Late" },
  { activity: "Attendance Marked", child: "All Lion Room", time: "08 Oct 2025, 8:10 AM", status: "Completed" },
];

const statusStyles: Record<string, string> = {
  Completed: "bg-[#ecfff8] border border-[#009061] text-[#009061]",
  Flagged: "bg-[#fff5f5] border border-[#ef4444] text-[#ef4444]",
  Late: "bg-[#fff6e6] border border-[#cc8000] text-[#cc8000]",
};

const documents = [
  { name: "Employment Contract.pdf", date: "Oct 10, 2025" },
  { name: "DBS Check Certificate.pdf", date: "Aug 5, 2025" },
  { name: "First Aid Certificate.pdf", date: "Jan 15, 2025" },
];

const profileBadgeStyles: Record<StaffMember["status"], string> = {
  Active: "border-[#009061] bg-[#ecfff8] text-[#009061]",
  Absent: "border-[#cc8000] bg-[#fff6e6] text-[#cc8000]",
  Pending: "border-[#9ca3af] bg-[#f3f4f6] text-[#6b7280]",
  Suspended: "border-[#ef4444] bg-[#fde8e8] text-[#ef4444]",
};

function getInitials(name: string) {
  const parts = name.split(" ").filter((part) => !/^(Mr|Mrs|Ms|Dr|Miss)\.?$/i.test(part));
  return parts.slice(0, 2).map((part) => part[0]?.toUpperCase()).join("");
}

export function StaffProfileView({ staff }: { staff: StaffMember }) {
  const details = [
    { label: "Email", value: staff.email },
    { label: "Phone", value: staff.phone },
    { label: "Date Added", value: staff.dateAdded },
    { label: "Role", value: staff.role },
    { label: "Room", value: "Lion Class" },
    { label: "Emergency Contact", value: "Mr Okonkwo +234 80 1234 5678" },
  ];

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/v2/staff"
          className="flex items-center gap-2 font-[family-name:var(--font-urbanist)] text-sm text-[#3b2513]"
        >
          <ChevronLeft className="size-4" />
          Back to Staff
        </Link>
        <div className="flex items-center gap-3">
          <button className="rounded-lg border border-[#3b2513] px-4 py-2 font-[family-name:var(--font-urbanist)] text-sm text-[#3b2513]">
            Suspend Account
          </button>
          <button className="rounded-lg bg-[#ef4444] px-4 py-2 font-[family-name:var(--font-urbanist)] text-sm text-white">
            Disable Account
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-[#3b2513] px-4 py-2 font-[family-name:var(--font-urbanist)] text-sm text-[#3b2513]">
            Export Log
            <Download className="size-4" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-5">
        {/* Left Panel */}
        <div className="w-[280px] shrink-0 space-y-4">
          {/* Profile Card */}
          <div className="rounded-xl border border-[#e6ebf3] bg-white p-5">
            {/* Avatar */}
            <div className="mb-4 flex flex-col items-center gap-2">
              <div className="flex size-20 items-center justify-center rounded-full bg-[#edd9c0]">
                <span className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#3b2513]">
                  {getInitials(staff.name)}
                </span>
              </div>
              <div className="text-center">
                <p className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
                  {staff.name}
                </p>
                <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
                  Staff ID: CEV-STF-{staff.id.padStart(4, "0")}
                </p>
              </div>
              <span
                className={`rounded-full border px-2.5 py-0.5 font-[family-name:var(--font-urbanist)] text-xs ${profileBadgeStyles[staff.status]}`}
              >
                {staff.status}
              </span>
            </div>

            {/* Divider */}
            <div className="mb-4 h-px bg-[#f3f4f6]" />

            {/* Key-value details */}
            <div className="space-y-3">
              {details.map(({ label, value }) => (
                <div key={label}>
                  <p className="font-[family-name:var(--font-nunito)] text-[10px] text-[#9ca3af]">{label}</p>
                  <p className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div className="rounded-xl border border-[#e6ebf3] bg-white p-4">
            <p className="mb-3 font-[family-name:var(--font-merriweather)] text-sm font-bold text-[#2d1810]">
              Documents
            </p>
            <div className="space-y-2">
              {documents.map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-center justify-between rounded-lg border border-[#e6ebf3] p-2.5"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded bg-[#edd9c0]">
                      <FileText className="size-3.5 text-[#3b2513]" />
                    </div>
                    <div>
                      <p className="font-[family-name:var(--font-nunito)] text-xs font-medium text-[#2d1810]">
                        {doc.name}
                      </p>
                      <p className="font-[family-name:var(--font-nunito)] text-[10px] text-[#9ca3af]">{doc.date}</p>
                    </div>
                  </div>
                  <button className="font-[family-name:var(--font-urbanist)] text-xs text-[#3b2513] hover:underline">
                    View
                  </button>
                </div>
              ))}
            </div>

            {/* Upload area */}
            <div className="mt-3 rounded-lg border-2 border-dashed border-[#d0d5dd] p-4 text-center">
              <Upload className="mx-auto mb-1 size-5 text-[#9ca3af]" />
              <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
                Drop files here or{" "}
                <span className="cursor-pointer text-[#3b2513] underline">browse</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1">
          {/* AI Flag Card */}
          <div className="mb-4 rounded-xl border border-[#e0bfa0] bg-[#fdf6e8] p-4">
            <div className="flex items-start gap-3">
              <span className="text-lg text-[#c47b2c]">✦</span>
              <div className="flex-1">
                <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
                  Ada AI Flag
                </p>
                <p className="mt-0.5 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
                  {staff.name}&apos;s log compliance has dropped to 52% this week (below the 72% threshold).
                  Recommended action: Brief check-in before end of day.
                </p>
              </div>
              <span className="font-[family-name:var(--font-urbanist)] text-[10px] text-[#9ca3af]">Just now</span>
            </div>
          </div>

          {/* Log History Table */}
          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="flex items-center justify-between p-4">
              <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
                Log History
              </h2>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1.5 rounded-lg border border-[#e6ebf3] px-3 py-1.5 font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">
                  Date Range <ChevronDown className="size-3" />
                </button>
                <button className="flex items-center gap-1.5 rounded-lg border border-[#e6ebf3] px-3 py-1.5 font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">
                  Activity Type <ChevronDown className="size-3" />
                </button>
              </div>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-[#edd9c0]">
                  <th className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-xs font-semibold text-[#2d1810]">
                    Activity
                  </th>
                  <th className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-xs font-semibold text-[#2d1810]">
                    Child
                  </th>
                  <th className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-xs font-semibold text-[#2d1810]">
                    Date &amp; Time
                  </th>
                  <th className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-xs font-semibold text-[#2d1810]">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaecf0]">
                {logs.map((log, i) => (
                  <tr key={i} className="hover:bg-[#faf9f7]">
                    <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                      {log.activity}
                    </td>
                    <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
                      {log.child}
                    </td>
                    <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
                      {log.time}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 font-[family-name:var(--font-urbanist)] text-xs ${statusStyles[log.status]}`}
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
