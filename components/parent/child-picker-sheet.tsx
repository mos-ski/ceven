"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, X } from "lucide-react";
import type { ChildInfo } from "@/lib/parent/mock-data";

export function ChildPickerSheet({
  children,
  onClose,
}: {
  children: ChildInfo[];
  onClose: () => void;
}) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function handleSelect(child: ChildInfo) {
    setSelectedId(child.id);
    setTimeout(() => {
      router.push(`/parent/reports?childId=${child.id}`);
      onClose();
    }, 150);
  }

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/40">
      <div className="w-full max-w-[430px] rounded-t-3xl bg-white pb-6 pt-4 animate-slide-up">
        {/* Handle */}
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-gray-200" />

        <div className="flex items-center justify-between px-5 pb-3">
          <h2 className="text-base font-bold text-gray-800">Select Child</h2>
          <button onClick={onClose}>
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="space-y-2 px-5">
          {children.map((child) => (
            <button
              key={child.id}
              onClick={() => handleSelect(child)}
              className={`flex w-full items-center gap-3 rounded-2xl border-2 p-4 transition-all ${
                selectedId === child.id
                  ? "border-cg-brand bg-cg-brand/5"
                  : "border-gray-100 bg-white hover:border-gray-200"
              }`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cg-brand/10 text-sm font-bold text-cg-brand">
                {child.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-gray-800">{child.name}</p>
                <p className="text-xs text-gray-400">{child.room} · {child.caregiver}</p>
              </div>
              <ChevronRight size={18} className="text-gray-300" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
