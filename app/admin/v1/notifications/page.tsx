"use client";

import { Bell, ChevronDown } from "lucide-react";
import { ACTIVITY_LOGS } from "@/lib/admin-v1/v1-data";
import { DataTable, type Column } from "@/components/admin-v1/data-table";
import type { ActivityLog } from "@/lib/admin-v1/v1-data";

const STAT = { label: "Total Activity Logs", value: ACTIVITY_LOGS.length };

const columns: Column<ActivityLog>[] = [
  { key: "dateCreated", label: "Date Created" },
  { key: "recipients", label: "Recipients" },
  { key: "title", label: "Title" },
  { key: "message", label: "Message" },
  {
    key: "action",
    label: "Action",
    render: () => (
      <span className="text-sm font-medium text-gray-700 hover:text-[#3B2513] cursor-pointer">View Details</span>
    ),
  },
];

export default function NotificationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
            <Bell className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{STAT.label}</p>
            <p className="text-2xl font-bold text-gray-800">{STAT.value}</p>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={ACTIVITY_LOGS}
        title="Activity Logs"
        actions={
          <div className="relative">
            <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
              Log Activity
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        }
      />
    </div>
  );
}
