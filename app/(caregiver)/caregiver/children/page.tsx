"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { ChildCard } from "@/components/caregiver/child-card";
import { mockChildren, mockClassrooms } from "@/lib/caregiver/mock-data";

export default function ChildrenPage() {
  const [selectedClassroom, setSelectedClassroom] = useState("all");
  const router = useRouter();

  const filtered = selectedClassroom === "all"
    ? mockChildren
    : mockChildren.filter((c) => c.room === selectedClassroom);

  return (
    <div className="flex flex-1 flex-col bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <button onClick={() => router.back()}>
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200">
            <ArrowLeft size={16} className="text-gray-600" />
          </div>
        </button>
        <h1 className="text-lg font-bold text-cg-brand" style={{ fontFamily: "var(--font-merriweather)" }}>
          Children
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6">
        {/* Classroom filter */}
        <div className="mb-4 flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-base">🐻</span>
            <span className="text-sm font-medium text-cg-brand">
              {selectedClassroom === "all" ? "Total Classroom(s)" : selectedClassroom}
            </span>
          </div>
          <ChevronDown size={18} className="text-gray-400" />
        </div>

        {/* Children list */}
        <div className="flex flex-col gap-3">
          {filtered.map((child) => (
            <ChildCard key={child.id} child={child} />
          ))}
        </div>
      </div>
    </div>
  );
}
