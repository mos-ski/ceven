"use client";

import { useState } from "react";
import { Plus, X, CheckCircle2, Clock, Clock3, AlarmClock } from "lucide-react";
import { PARENT_MEMBERSHIP, SPECIAL_REQUEST_TRIAL } from "@/lib/parent/mock-data";
import { TrialGateBanner } from "@/components/parent/trial-gate-banner";

type Task = {
  id: string;
  title: string;
  description: string;
  scheduledTime: string;
  reminderTime: string;
  status: "Pending" | "In Progress" | "Done";
  comment: string;
};

const INITIAL_TASKS: Task[] = [
  {
    id: "task-1",
    title: "Give medicine to Tosin",
    description: "Kindly give her the drugs when needed.",
    scheduledTime: "10:00am",
    reminderTime: "09:00am",
    status: "Pending",
    comment: "",
  },
];

// ─── Create Task Modal ──────────────────────────────────────────────────────────

function CreateTaskModal({ onClose, onCreate }: { onClose: () => void; onCreate: (t: Omit<Task, "id" | "status">) => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleCreate() {
    if (!title.trim() || !description.trim() || !scheduledTime.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 800);
  }

  if (success) {
    return (
      <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/30">
        <div className="w-full max-w-[430px] rounded-t-2xl bg-white pb-8 pt-5">
          <div className="flex justify-end px-5 pb-2">
            <button onClick={() => { onCreate({ title, description, scheduledTime, reminderTime, comment }); onClose(); }} className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
              <X size={14} className="text-gray-500" />
            </button>
          </div>
          <div className="flex flex-col items-center px-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
              <CheckCircle2 size={36} className="text-green-500" />
            </div>
            <h2 className="mb-2 text-lg font-bold text-gray-800">Success</h2>
            <p className="mb-6 text-sm text-gray-500">A new task has been successfully created.</p>
            <button
              onClick={() => { onCreate({ title, description, scheduledTime, reminderTime, comment }); onClose(); }}
              className="w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/30">
      <div className="w-full max-w-[430px] rounded-t-2xl bg-white pb-8 pt-5">
        <div className="mb-4 flex items-center justify-between px-5">
          <h3 className="text-base font-semibold text-gray-800">Create New Task</h3>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
            <X size={14} className="text-gray-500" />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-5">
          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Task Title <span className="text-red-500">*</span></label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="E.g., Give medicine to Tosin" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Description <span className="text-red-500">*</span></label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Add more details about the task..." className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Scheduled Time <span className="text-red-500">*</span></label>
                <input value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} placeholder="10 : 00 am" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Reminder Time</label>
                <input value={reminderTime} onChange={(e) => setReminderTime(e.target.value)} placeholder="09 : 00 am" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Additional Comment</label>
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={2} placeholder="Any special comment for the caregiver..." className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none" />
            </div>
            <button
              onClick={handleCreate}
              disabled={!title.trim() || !description.trim() || !scheduledTime.trim() || loading}
              className="mt-1 w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white disabled:opacity-40"
            >
              {loading ? "Creating..." : "Create Task"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Task Details Modal ─────────────────────────────────────────────────────────

function TaskDetailsModal({ task, onClose }: { task: Task; onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/30">
      <div className="w-full max-w-[430px] rounded-t-2xl bg-white pb-8 pt-5">
        <div className="mb-4 flex items-center justify-between px-5">
          <h3 className="text-base font-semibold text-gray-800">Task Details</h3>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
            <X size={14} className="text-gray-500" />
          </button>
        </div>

        <div className="px-5">
          <div className="flex flex-col gap-3">
            {[
              { label: "Task Title", value: task.title },
              { label: "Description", value: task.description },
              { label: "Scheduled Time", value: task.scheduledTime },
              { label: "Reminder Time", value: task.reminderTime || "—" },
              { label: "Additional Comment", value: task.comment || "—" },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl bg-[#F9F5EE] px-4 py-3">
                <p className="mb-0.5 text-xs font-medium text-gray-400">{label}</p>
                <p className="text-sm text-gray-800">{value}</p>
              </div>
            ))}
            <div className="rounded-xl bg-[#F9F5EE] px-4 py-3">
              <p className="mb-1 text-xs font-medium text-gray-400">Status</p>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                task.status === "Done" ? "bg-green-100 text-green-700" :
                task.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                "bg-amber-100 text-amber-700"
              }`}>
                <Plus size={10} />
                {task.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Task Card ──────────────────────────────────────────────────────────────────

function TaskCard({ task, onClick }: { task: Task; onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-full rounded-2xl bg-white p-4 shadow-sm text-left">
      <div className="mb-2 flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-800">{task.title}</p>
          <p className="mt-0.5 text-xs text-gray-400 line-clamp-2">{task.description}</p>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
          task.status === "Done" ? "bg-green-100 text-green-700" :
          task.status === "In Progress" ? "bg-blue-100 text-blue-700" :
          "bg-amber-100 text-amber-700"
        }`}>
          {task.status}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Clock3 size={12} />
          {task.scheduledTime}
        </div>
        {task.reminderTime && (
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <AlarmClock size={12} />
            {task.reminderTime}
          </div>
        )}
      </div>
    </button>
  );
}

// ─── Panel ──────────────────────────────────────────────────────────────────────

export function SpecialRequestsPanel() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const limitReached = PARENT_MEMBERSHIP.status !== "active" && SPECIAL_REQUEST_TRIAL.used;

  function handleCreateTask(data: Omit<Task, "id" | "status">) {
    const newTask: Task = { ...data, id: `task-${Date.now()}`, status: "Pending" };
    setTasks((prev) => [...prev, newTask]);
    SPECIAL_REQUEST_TRIAL.used = true;
  }

  return (
    <div className="relative flex flex-col gap-3 pt-1">
      {showCreateTask && (
        <CreateTaskModal onClose={() => setShowCreateTask(false)} onCreate={handleCreateTask} />
      )}
      {selectedTask && (
        <TaskDetailsModal task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}

      {/* New Request CTA */}
      {limitReached ? (
        <TrialGateBanner message="You've reached your special request limit. Some family features are unavailable." />
      ) : (
        <button
          onClick={() => setShowCreateTask(true)}
          className="flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-cg-accent-muted py-4 text-sm font-semibold text-cg-brand"
        >
          <Plus size={16} />
          New Request
        </button>
      )}

      {/* Task list */}
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard key={task.id} task={task} onClick={() => setSelectedTask(task)} />
        ))
      ) : (
        <div className="flex flex-col items-center py-16 text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#F3EDE5]">
            <Clock size={24} className="text-cg-accent" />
          </div>
          <p className="text-sm font-semibold text-gray-700">No Special Requests Yet!</p>
          <p className="mt-1 text-xs text-gray-400">Tap &quot;New Request&quot; above to send a task to your caregiver.</p>
        </div>
      )}
    </div>
  );
}
