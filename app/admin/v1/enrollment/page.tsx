"use client";

import { useRouter } from "next/navigation";
import { Users, UserCheck, UserX, UsersRound } from "lucide-react";
import { ENROLLMENT_REQUESTS } from "@/lib/admin-v1/v1-data";
import { DataTable, type Column } from "@/components/admin-v1/data-table";
import type { EnrollmentRequest } from "@/lib/admin-v1/v1-data";

const STATS = [
  { label: "Total Request", value: ENROLLMENT_REQUESTS.length, icon: UsersRound, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "Pending Request", value: ENROLLMENT_REQUESTS.filter((r) => r.status === "pending").length, icon: Users, color: "text-amber-500", bg: "bg-amber-50" },
  { label: "Approved Request", value: ENROLLMENT_REQUESTS.filter((r) => r.status === "active").length, icon: UserCheck, color: "text-emerald-500", bg: "bg-emerald-50" },
  { label: "Declined Request", value: ENROLLMENT_REQUESTS.filter((r) => r.status === "declined").length, icon: UserX, color: "text-red-500", bg: "bg-red-50" },
];

const STATUS_BADGE: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  declined: "bg-red-50 text-red-700 border-red-200",
};

const columns: Column<EnrollmentRequest>[] = [
  { key: "requestDate", label: "Request Date" },
  { key: "parentName", label: "Parent Name" },
  { key: "childName", label: "Child Name" },
  { key: "childAge", label: "Child Age" },
  { key: "room", label: "Room" },
  {
    key: "status",
    label: "Status",
    render: (row) => (
      <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_BADGE[row.status]}`}>
        {row.status}
      </span>
    ),
  },
  {
    key: "action",
    label: "Action",
    render: () => (
      <span className="text-sm font-medium text-gray-700 hover:text-[#3B2513] cursor-pointer">View Details</span>
    ),
  },
];

export default function EnrollmentPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-800">Enrollment</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${stat.bg}`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <DataTable
        columns={columns}
        data={ENROLLMENT_REQUESTS}
        title="All Request"
        onRowClick={(row) => router.push(`/admin/v1/enrollment/${row.id}`)}
      />
    </div>
  );
}
