"use client";

import { X, Clock, Bell, CheckCircle } from "lucide-react";
import type { Task } from "@/lib/caregiver/mock-data";

type Props = {
  task: Task | null;
  onClose: () => void;
  onMarkComplete: (id: string) => void;
};

export function TaskDetailSheet({ task, onClose, onMarkComplete }: Props) {
  if (!task) return null;

  return (
    <>
      <div className="absolute inset-0 z-40 bg-black/40" onClick={onClose} />
      <div className="absolute inset-x-0 bottom-0 z-50 rounded-t-3xl bg-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h3 className="text-base font-bold text-cg-brand">Task Details</h3>
          <button onClick={onClose}>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200">
              <X size={14} className="text-gray-600" />
            </div>
          </button>
        </div>

        <div className="px-5 pb-8 pt-4 flex flex-col gap-4">
          {/* Title + status */}
          <div className="flex items-start justify-between gap-3">
            <h4 className="text-base font-bold text-cg-brand leading-snug flex-1">{task.title}</h4>
            <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
              task.status === "completed" ? "bg-green-100 text-green-700" : "bg-cg-pending-badge text-gray-500"
            }`}>
              {task.status === "completed" ? "Completed" : "Pending"}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed">{task.description}</p>

          {/* Times */}
          <div className="flex gap-4">
            <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2.5">
              <Clock size={14} className="text-cg-accent" />
              <div>
                <p className="text-[10px] text-gray-400">Due Time</p>
                <p className="text-xs font-semibold text-cg-brand">{task.dueTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2.5">
              <Bell size={14} className="text-cg-accent" />
              <div>
                <p className="text-[10px] text-gray-400">Reminder</p>
                <p className="text-xs font-semibold text-cg-brand">{task.reminderTime}</p>
              </div>
            </div>
          </div>

          {/* Mark complete button */}
          {task.status === "pending" && (
            <button
              onClick={() => { onMarkComplete(task.id); onClose(); }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-cg-brand py-3.5 text-sm font-semibold text-white"
            >
              <CheckCircle size={16} />
              Mark as Complete
            </button>
          )}
        </div>
      </div>
    </>
  );
}
