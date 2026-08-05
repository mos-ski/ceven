"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, CalendarDays, ClipboardList } from "lucide-react";
import { BottomNav } from "@/components/caregiver/bottom-nav";
import { LogSheet } from "@/components/caregiver/log-sheet";
import { TaskCard } from "@/components/caregiver/task-card";
import { TaskDetailSheet } from "@/components/caregiver/task-detail-sheet";
import { CalendarPicker } from "@/components/caregiver/calendar-picker";
import { mockTasks, mockUser } from "@/lib/caregiver/mock-data";
import type { Task } from "@/lib/caregiver/mock-data";

type Tab = "pending" | "completed";

export default function TasksPage() {
  const [tab, setTab] = useState<Tab>("pending");
  const [tasks, setTasks] = useState(mockTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const pending = tasks.filter((t) => t.status === "pending");
  const completed = tasks.filter((t) => t.status === "completed" || t.status === "undone");
  const displayed = tab === "pending" ? pending : completed;

  function markDone(id: string) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: "completed" as const } : t)));
    setSelectedTask(null);
  }

  function markUndone(id: string) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: "undone" as const } : t)));
    setSelectedTask(null);
  }

  return (
    <div className="relative flex flex-1 flex-col bg-cg-bg">
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
          <Link href="/caregiver/notifications" className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
            <Bell size={18} className="text-gray-500" />
          </Link>
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
        <div className="mb-3 flex justify-end">
          <button
            onClick={() => setShowCalendar(true)}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-500"
          >
            <CalendarDays size={14} />
            Filter by date
          </button>
        </div>

        {/* Task list or empty state */}
        {displayed.length > 0 ? (
          <div className="rounded-2xl bg-white px-4">
            {displayed.map((task) => (
              <button key={task.id} className="w-full text-left" onClick={() => setSelectedTask(task)}>
                <TaskCard task={task} />
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-cg-brand/10">
              <ClipboardList size={36} className="text-cg-brand" />
            </div>
            <p className="text-base font-bold text-cg-brand">No Task Available Yet!</p>
            <p className="mt-1 text-xs text-gray-400">Completed tasks will appear here once available.</p>
          </div>
        )}
      </div>

      {selectedTask && (
        <TaskDetailSheet
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onMarkDone={markDone}
          onMarkUndone={markUndone}
        />
      )}

      {showCalendar && <CalendarPicker onClose={() => setShowCalendar(false)} />}

      <LogSheet />
      <BottomNav />
    </div>
  );
}
