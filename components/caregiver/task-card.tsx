import type { Task } from "@/lib/caregiver/mock-data";
import { Clock, Bell } from "lucide-react";

type Props = { task: Task };

export function TaskCard({ task }: Props) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-gray-100 py-4 last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-cg-brand">{task.title}</p>
        <p className="mt-0.5 line-clamp-2 text-xs text-gray-500">{task.description}</p>
        <div className="mt-1.5 flex items-center gap-4">
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <Clock size={11} />
            {task.dueTime}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <Bell size={11} />
            {task.reminderTime}
          </span>
        </div>
      </div>
      <span
        className={`mt-0.5 shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
          task.status === "completed"
            ? "bg-green-100 text-green-700"
            : task.status === "undone"
            ? "bg-red-100 text-red-600"
            : "bg-cg-pending-badge text-gray-500"
        }`}
      >
        {task.status === "completed" ? "Completed" : task.status === "undone" ? "Undone" : "Pending"}
      </span>
    </div>
  );
}
