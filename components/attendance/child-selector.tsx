"use client";

import { useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import type { ChildState } from "@/lib/attendance/types";

type Props = {
  children: ChildState[];
  onConfirm: (selectedChildIds: string[]) => void;
  onClose: () => void;
};

export function ChildSelector({ children, onConfirm, onClose }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggle(childId: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(childId)) next.delete(childId);
      else next.add(childId);
      return next;
    });
  }

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/30">
      <div className="w-full max-w-[430px] rounded-t-2xl bg-white pb-8 pt-5">
        <div className="mb-4 flex items-center justify-between px-5">
          <h3 className="text-base font-semibold text-gray-800">
            Who are you signing in/out?
          </h3>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
            <X size={14} className="text-gray-500" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-5">
          <div className="flex flex-col gap-2">
            {children.map((child) => {
              const isChecked = selected.has(child.childId);
              const action = child.isCheckedIn ? "Checked in" : "Not yet dropped off";
              const time = child.checkInTime ? ` at ${child.checkInTime}` : "";

              return (
                <button
                  key={child.childId}
                  onClick={() => toggle(child.childId)}
                  className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-colors ${
                    isChecked
                      ? "border-cg-brand bg-cg-quick-action"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors ${
                    isChecked ? "border-cg-brand bg-cg-brand" : "border-gray-300"
                  }`}>
                    {isChecked && <CheckCircle2 size={14} className="text-white" />}
                  </div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cg-brand text-xs font-bold text-white">
                    {child.avatarInitials}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">{child.childName}</p>
                    <p className="text-xs text-gray-400">
                      {action}{time} · {child.room} Room
                    </p>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    child.isCheckedIn
                      ? "bg-blue-100 text-blue-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}>
                    {child.isCheckedIn ? "Pickup" : "Drop-off"}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => {
              if (selected.size > 0) onConfirm(Array.from(selected));
            }}
            disabled={selected.size === 0}
            className="mt-5 w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white disabled:opacity-40"
          >
            Confirm ({selected.size} selected)
          </button>
        </div>
      </div>
    </div>
  );
}
