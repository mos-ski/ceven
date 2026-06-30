"use client";

import { useState } from "react";
import { Bell, CalendarDays } from "lucide-react";
import { BottomNav } from "@/components/caregiver/bottom-nav";
import { TaskCard } from "@/components/caregiver/task-card";
import { mockTasks, mockUser } from "@/lib/caregiver/mock-data";

type Tab = "pending" | "completed";

export default function TasksPage() {
  const [tab, setTab] = useState<Tab>("pending");

  const pending = mockTasks.filter((t) => t.status === "pending");
  const completed = mockTasks.filter((t) => t.status === "completed");
  const displayed = tab === "pending" ? pending : completed;

  return (
    <div className="flex flex-1 flex-col bg-cg-bg">
      <div className="flex-1 overflow-y-auto px-4 pt-2 pb-4">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cg-brand text-xs font-bold text-white">
              {mockUser.avatarInitials}
            </div>
            <div>
              <p className="text-[10px] text-gray-400">Welcome Back,</p>
              <p className="text-xs font-semibold text-cg-brand">{mockUser.name}</p>
            </div>
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
            <Bell size={18} className="text-gray-500" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="mb-4 flex rounded-full bg-gray-100 p-0.5">
          <button
            onClick={() => setTab("pending")}
            className={`flex-1 rounded-full py-2.5 text-xs font-semibold transition-colors ${
              tab === "pending" ? "bg-cg-brand text-white" : "text-gray-500"
            }`}
          >
            Pending Tasks ({pending.length})
          </button>
          <button
            onClick={() => setTab("completed")}
            className={`flex-1 rounded-full py-2.5 text-xs font-semibold transition-colors ${
              tab === "completed" ? "bg-cg-brand text-white" : "text-gray-500"
            }`}
          >
            Completed Tasks ({completed.length})
          </button>
        </div>

        {/* Filter */}
        <div className="mb-2 flex justify-end">
          <button className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
            <CalendarDays size={14} />
            Filter by date
          </button>
        </div>

        {/* Task list */}
        <div className="rounded-2xl bg-white px-4">
          {displayed.length > 0 ? (
            displayed.map((task) => <TaskCard key={task.id} task={task} />)
          ) : (
            <p className="py-8 text-center text-sm text-gray-400">No tasks here.</p>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
