"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { CAREGIVERS } from "@/lib/admin-v1/v1-data";
import { DataTable, type Column } from "@/components/admin-v1/data-table";

type AssignedChild = {
  assignedDate: string;
  parentName: string;
  childName: string;
  childAge: string;
  room: string;
};

const columns: Column<AssignedChild & { id: string }>[] = [
  { key: "assignedDate", label: "Assigned Date" },
  { key: "parentName", label: "Parent Name" },
  { key: "childName", label: "Child Name" },
  { key: "childAge", label: "Child Age" },
  { key: "room", label: "Room" },
  {
    key: "action",
    label: "Action",
    render: () => <ActionButton />,
  },
];

function ActionButton() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={(e) => { e.stopPropagation(); setOpen(!open); }} className="text-gray-400 hover:text-gray-600">⋮</button>
      {open && (
        <div className="absolute right-0 top-8 z-10 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
          {["View Details", "Log Picture Activity", "Log Report", "Reassign Caregiver", "Emergency"].map((item) => (
            <button
              key={item}
              onClick={(e) => { e.stopPropagation(); setOpen(false); }}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CaregiverDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const caregiver = CAREGIVERS.find((c) => c.id === id);

  if (!caregiver) {
    return <div className="p-6 text-gray-500">Caregiver not found.</div>;
  }

  const childrenData = caregiver.assignedChildrenList.map((c, i) => ({
    ...c,
    id: String(i + 1),
  }));

  return (
    <div className="flex flex-col gap-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-800"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <DataTable
        columns={columns}
        data={childrenData}
        title="Assigned Children"
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
