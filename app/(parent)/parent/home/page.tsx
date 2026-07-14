"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, MessageSquare, Bookmark, Play, Clock, LayoutGrid, Plus, X, CheckCircle2, Clock3, AlarmClock, UsersRound } from "lucide-react";
import { ParentBottomNav } from "@/components/parent/bottom-nav";
import { mockParentUser, mockFeedPosts } from "@/lib/parent/mock-data";

type Tab = "moments" | "special";

// ─── Mock tasks ────────────────────────────────────────────────────────────────

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

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ParentHomePage() {
  const [tab, setTab] = useState<Tab>("moments");
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showKidsTooltip, setShowKidsTooltip] = useState(true);

  function handleCreateTask(data: Omit<Task, "id" | "status">) {
    const newTask: Task = { ...data, id: `task-${Date.now()}`, status: "Pending" };
    setTasks((prev) => [...prev, newTask]);
  }

  function dismissKidsTooltip() {
    setShowKidsTooltip(false);
  }

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-[#fffefa]">
      {showCreateTask && (
        <CreateTaskModal onClose={() => setShowCreateTask(false)} onCreate={handleCreateTask} />
      )}
      {selectedTask && (
        <TaskDetailsModal task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}

      <div className="shrink-0 px-6 pt-4 pb-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-full bg-[#f4f5f6] px-3 py-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cg-brand text-[10px] font-bold text-white">
              {mockParentUser.avatarInitials}
            </div>
            <div>
              <p className="text-[10px] text-gray-500">Welcome Back,</p>
              <p className="text-xs font-medium text-gray-800">{mockParentUser.name}&apos;s</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Link
                href="/parent/children"
                aria-describedby={showKidsTooltip ? "kids-management-tooltip" : undefined}
                aria-label="My children"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f5f6] text-cg-brand"
              >
                <UsersRound size={18} />
              </Link>
              {showKidsTooltip && (
                <div
                  id="kids-management-tooltip"
                  role="tooltip"
                  className="absolute right-0 top-12 z-40 w-48 rounded-lg border border-cg-accent-muted/70 bg-cg-quick-action px-3 py-2.5 text-cg-brand shadow-[0_12px_28px_rgba(59,37,19,0.14)]"
                >
                  <span className="absolute -top-1.5 right-4 h-3 w-3 rotate-45 border-l border-t border-cg-accent-muted/70 bg-cg-quick-action" />
                  <div className="relative flex items-start gap-2">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-cg-brand shadow-sm">
                      <UsersRound size={13} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold leading-tight">Kids</p>
                      <p className="mt-0.5 text-[11px] font-semibold leading-snug text-cg-brand/70">
                        Manage your kids here
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label="Dismiss kids management tooltip"
                      onClick={dismissKidsTooltip}
                      className="-mr-1 -mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-cg-brand/50 transition-colors hover:bg-white/70 hover:text-cg-brand"
                    >
                      <X size={13} />
                    </button>
                  </div>
                </div>
              )}
            </div>
            <Link
              href="/parent/notifications"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f5f6]"
            >
              <Bell size={20} className="text-gray-600" />
            </Link>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="mt-3 flex rounded-lg bg-[#f4f5f6] p-[3px]">
          <button
            onClick={() => setTab("moments")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-semibold transition-colors ${
              tab === "moments" ? "bg-cg-brand text-white" : "text-gray-800"
            }`}
          >
            <LayoutGrid size={14} />
            Moments
          </button>
          <button
            onClick={() => setTab("special")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-medium transition-colors ${
              tab === "special" ? "bg-cg-brand text-white" : "text-gray-800"
            }`}
          >
            Special Requests
            <Clock size={14} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-4">
        {tab === "moments" ? (
          mockFeedPosts.length > 0 ? (
            <div className="flex flex-col gap-4">
              {mockFeedPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => router.push("/parent/gallery")}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm cursor-pointer active:scale-[0.98] transition-transform"
                >
                  <div className="relative h-52 overflow-hidden bg-cg-quick-action">
                    <img
                      src={post.image}
                      alt={post.caption}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                    <div className="absolute left-3 top-3 rounded-md bg-cg-brand px-2.5 py-1 text-[11px] font-semibold text-white">
                      {post.tag}
                    </div>
                    {post.hasVideo && (
                      <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80">
                        <Play size={14} className="ml-0.5 text-cg-brand" fill="currentColor" />
                      </div>
                    )}
                  </div>

                  <div className="px-4 py-3">
                    <p className="mb-2 text-sm font-medium text-gray-800 leading-snug">{post.caption}</p>
                    <div className="mb-3 flex items-center gap-1">
                      <span className="text-xs text-gray-400">{post.timeAgo}</span>
                      <span className="text-xs text-gray-300">·</span>
                      <span className="text-xs text-gray-400">Posted by {post.postedBy}</span>
                    </div>
                    <div className="flex items-center gap-4 border-t border-gray-50 pt-2" onClick={(e) => e.stopPropagation()}>
                      <button className="flex items-center gap-1.5 text-xs text-gray-400">
                        <MessageSquare size={14} />
                        Comment
                      </button>
                      <button className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Bookmark size={14} />
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyFeed />
          )
        ) : (
          <div className="flex flex-col gap-3 pt-1">
            {/* New Request CTA */}
            <button
              onClick={() => setShowCreateTask(true)}
              className="flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-cg-accent-muted py-4 text-sm font-semibold text-cg-brand"
            >
              <Plus size={16} />
              New Request
            </button>

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
        )}
      </div>

      <Link
        href="/parent/child/add"
        aria-label="Add child"
        className="absolute bottom-[86px] right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-cg-brand text-white shadow-[0_12px_30px_rgba(59,37,19,0.28)] active:scale-95"
      >
        <Plus size={24} />
      </Link>

      <ParentBottomNav />
    </div>
  );
}

function EmptyFeed() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-20">
      <div className="flex flex-col items-center gap-2 text-center">
        <ScrollIcon />
        <p className="text-base font-semibold text-gray-800">No Feed Available Yet!</p>
        <p className="text-sm text-gray-400">Feeds will appear here once data is available.</p>
      </div>
      <Link
        href="/parent/child/add"
        className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-cg-brand text-sm font-semibold text-white"
      >
        <Plus size={16} />
        Add a Child
      </Link>
    </div>
  );
}

function ScrollIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 97 97" fill="none" className="mb-1">
      <rect width="97" height="97" rx="48.5" fill="none" />
      <path d="M65 30H40a8 8 0 0 0-8 8v32a8 8 0 0 0 8 8h20a8 8 0 0 0 8-8V38a8 8 0 0 0-8-8z" fill="#1F2937" opacity="0.9" />
      <path d="M44 45h16M44 51h16M44 57h10" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M40 30c-4.4 0-8 3.6-8 8v2c0-4.4 3.6-8 8-8h4l-4-2z" fill="#1F2937" opacity="0.6" />
    </svg>
  );
}
