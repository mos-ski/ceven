"use client";

import { UsersRound, UserCheck, UserX } from "lucide-react";
import { TEAM_MEMBERS } from "@/lib/admin-v1/v1-data";
import { DataTable, type Column } from "@/components/admin-v1/data-table";
import type { TeamMember } from "@/lib/admin-v1/v1-data";

const STATS = [
  { label: "Total Team Members", value: TEAM_MEMBERS.length, icon: UsersRound, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "Active Team Members", value: TEAM_MEMBERS.filter((m) => m.status === "Active").length, icon: UserCheck, color: "text-emerald-500", bg: "bg-emerald-50" },
  { label: "Disabled Team Members", value: TEAM_MEMBERS.filter((m) => m.status === "Disabled").length, icon: UserX, color: "text-red-500", bg: "bg-red-50" },
];

const STATUS_BADGE: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Disabled: "bg-red-50 text-red-700 border-red-200",
};

const columns: Column<TeamMember>[] = [
  { key: "dateAdded", label: "Date Added" },
  { key: "fullName", label: "Full Name" },
  { key: "email", label: "Email Address" },
  { key: "role", label: "Role" },
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

export default function TeamManagementPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-800">Team Management</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
        data={TEAM_MEMBERS}
        title="Total Team Members"
        actions={
          <button className="rounded-lg bg-[#3B2513] px-4 py-2 text-sm font-semibold text-white hover:bg-[#4A2F18]">
            Add User
          </button>
        }
      />
    </div>
  );
}
