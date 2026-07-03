"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown, ChevronUp, Check } from "lucide-react";
import { ChildCard } from "@/components/caregiver/child-card";
import { mockChildren, mockClassrooms } from "@/lib/caregiver/mock-data";

export default function ChildrenPage() {
  const [selectedClassroom, setSelectedClassroom] = useState("all");
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const filtered =
    selectedClassroom === "all"
      ? mockChildren
      : mockChildren.filter((c) => c.room === selectedClassroom.replace(" Room", "").replace(" Classroom", ""));

  const selectedLabel =
    selectedClassroom === "all" ? "Total Classroom(s)" : selectedClassroom;

  return (
    <div className="flex flex-1 flex-col bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
        <button
          onClick={() => router.back()}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200"
        >
          <ArrowLeft size={16} className="text-gray-600" />
        </button>
        <h1 className="text-lg font-bold text-cg-brand" style={{ fontFamily: "var(--font-merriweather)" }}>
          Children ({mockChildren.length})
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-8">
        {/* Classroom filter */}
        <div className="relative mb-4">
          <button
            onClick={() => setShowDropdown((v) => !v)}
            className="flex w-full items-center justify-between rounded-2xl bg-gray-50 px-4 py-3.5"
          >
            <div className="flex items-center gap-2">
              <span className="text-base">🐻</span>
              <span className="text-sm font-medium text-cg-brand">{selectedLabel}</span>
            </div>
            {showDropdown ? (
              <ChevronUp size={18} className="text-gray-400" />
            ) : (
              <ChevronDown size={18} className="text-gray-400" />
            )}
          </button>

          {showDropdown && (
            <div className="absolute left-0 right-0 top-full z-10 mt-1 overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100">
              <button
                onClick={() => { setSelectedClassroom("all"); setShowDropdown(false); }}
                className="flex w-full items-center justify-between px-4 py-3.5 hover:bg-gray-50"
              >
                <span className="text-sm text-cg-brand">Total Classroom(s)</span>
                {selectedClassroom === "all" && <Check size={16} className="text-cg-accent" />}
              </button>
              {mockClassrooms.map((cls) => (
                <button
                  key={cls.id}
                  onClick={() => { setSelectedClassroom(cls.name); setShowDropdown(false); }}
                  className="flex w-full items-center justify-between border-t border-gray-50 px-4 py-3.5 hover:bg-gray-50"
                >
                  <span className="text-sm text-cg-brand">{cls.name}</span>
                  {selectedClassroom === cls.name && <Check size={16} className="text-cg-accent" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Children list */}
        <div className="flex flex-col gap-2">
          {filtered.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-400">No children in this classroom.</p>
          ) : (
            filtered.map((child) => (
              <ChildCard key={child.id} child={child} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
