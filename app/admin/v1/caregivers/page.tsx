"use client";

import { useRouter } from "next/navigation";
import { CAREGIVERS } from "@/lib/admin-v1/v1-data";
import { DataTable, type Column } from "@/components/admin-v1/data-table";
import type { Caregiver } from "@/lib/admin-v1/v1-data";

const STATUS_BADGE: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  inactive: "bg-gray-100 text-gray-500 border-gray-200",
};

const columns: Column<Caregiver>[] = [
  { key: "fullName", label: "Full Name" },
  { key: "email", label: "Email" },
  { key: "assignedChildren", label: "Assigned Children" },
  { key: "phoneNumber", label: "Phone Number" },
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
      <button className="text-gray-400 hover:text-gray-600">⋮</button>
    ),
  },
];

export default function CaregiversPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-800">Caregivers</h1>

      <DataTable
        columns={columns}
        data={CAREGIVERS}
        title="All Caregivers"
        onRowClick={(row) => router.push(`/admin/v1/caregivers/${row.id}`)}
        actions={
          <>
            <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Assign Room
            </button>
            <button className="rounded-lg bg-[#3B2513] px-4 py-2 text-sm font-semibold text-white hover:bg-[#4A2F18]">
              Add Caregiver
            </button>
          </>
        }
      />
    </div>
  );
}
