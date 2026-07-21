# Parent Home Quick-Actions Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the parent app's Home screen into a pure quick-actions dashboard (matching the caregiver app's pattern), extracting the current Moments and Special Requests tab content into their own dedicated screens.

**Architecture:** Two new leaf screens (`/parent/moments`, `/parent/special-requests`) get the exact tab content cut-and-pasted out of `app/(parent)/parent/home/page.tsx` unchanged, plus their own back-button header. A new `components/parent/quick-action-card.tsx` (a straight copy of the caregiver app's `QuickActionCard`, kept in the parent namespace per this codebase's per-app component convention) powers a 13-tile grid grouped into 4 labeled sections on the now-simplified Home page.

**Tech Stack:** Next.js 16 App Router, React, Tailwind CSS v4 (`cg-*` shared design tokens), lucide-react icons.

## Global Constraints

- No new data models, no backend calls — this is a navigation/layout change only (per `docs/superpowers/specs/2026-07-21-parent-home-quick-actions-design.md`).
- Preserve the two existing banners (Scan attendance code, today's check-in status) on Home exactly as styled today.
- Preserve the existing floating "Add child" button (bottom-right, links to `/parent/child/add`) on Home — it is unrelated to the Moments/Special-Requests tabs being extracted and is out of scope for removal.
- Moments and Special Requests screens must reproduce their current tab content byte-for-byte in behavior (same mock data, same modals, same empty states) — only the container (own header + own route) changes.
- Verify with `npx tsc --noEmit` after each task (no test framework in this repo) plus a manual check via the dev server.

**Note on the spec's floating-"+"-button wording:** the design spec (`docs/superpowers/specs/2026-07-21-parent-home-quick-actions-design.md`, "New screen: Special Requests" section) describes moving "the floating '+' button that opens the create-task modal" into the new screen. In the actual current code, that is inaccurate: the floating "+" bottom-right is the **Add Child** button (`/parent/child/add`), unrelated to tasks. Special Requests' "create task" trigger is a separate inline dashed **"New Request"** button, not a floating one. Task 3 below extracts the real inline button; Task 4 leaves the floating Add Child button on Home where it already lives.

---

### Task 1: Parent `QuickActionCard` component

**Files:**
- Create: `components/parent/quick-action-card.tsx`

**Interfaces:**
- Produces: `QuickActionCard({ icon: LucideIcon, label: string, onClick: () => void, isNew?: boolean })` — a React component, default export style matches caregiver's (named export `QuickActionCard`). Later tasks (Task 4) import this as `import { QuickActionCard } from "@/components/parent/quick-action-card"`.

- [ ] **Step 1: Create the component**

```tsx
"use client";

import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  isNew?: boolean;
};

export function QuickActionCard({ icon: Icon, label, onClick, isNew }: Props) {
  return (
    <button
      onClick={onClick}
      className="relative flex flex-col items-center justify-center gap-2 rounded-2xl bg-cg-quick-action py-5 active:brightness-95"
    >
      {isNew && (
        <span className="absolute right-2 top-2 rounded-full bg-emerald-500 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-white">
          New
        </span>
      )}
      <Icon size={24} className="text-cg-brand" />
      <span className="text-xs font-medium text-cg-brand">{label}</span>
    </button>
  );
}
```

Note: unlike the caregiver version (`flex flex-1 ...`, used inside a `flex` row), this one drops `flex-1` since Task 4 places it in a CSS grid (`grid-cols-3`), where children size to their grid cell automatically.

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no new errors (the file isn't imported anywhere yet, so this just confirms the file itself is valid TypeScript).

- [ ] **Step 3: Commit**

```bash
git add components/parent/quick-action-card.tsx
git commit -m "Add parent QuickActionCard component"
```

---

### Task 2: Extract Moments into its own screen

**Files:**
- Create: `app/(parent)/parent/moments/page.tsx`

**Interfaces:**
- Consumes: `mockFeedPosts` from `@/lib/parent/mock-data` (existing, unchanged), `ParentBottomNav` from `@/components/parent/bottom-nav` (existing, unchanged).
- Produces: route `/parent/moments`, which Task 4's Home page links to.

- [ ] **Step 1: Create the page**

```tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, MessageSquare, Bookmark, Play, Plus } from "lucide-react";
import { ParentBottomNav } from "@/components/parent/bottom-nav";
import { mockFeedPosts } from "@/lib/parent/mock-data";

export default function MomentsPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#fffefa]">
      <div className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-base font-bold text-cg-brand">Moments</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        {mockFeedPosts.length > 0 ? (
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
        )}
      </div>

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
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Manual verification**

Start the dev server (`npm run dev`), navigate to `/parent/moments` directly, confirm:
- Header shows a back arrow and "Moments" title.
- The 3 mock feed posts render with tag, caption, "posted by", time-ago, Comment/Save buttons, and video play icon on post-2.
- Clicking a post card navigates to `/parent/gallery`.
- Back button returns to the previous page.

- [ ] **Step 4: Commit**

```bash
git add "app/(parent)/parent/moments/page.tsx"
git commit -m "Extract Moments feed into its own screen"
```

---

### Task 3: Extract Special Requests into its own screen

**Files:**
- Create: `app/(parent)/parent/special-requests/page.tsx`

**Interfaces:**
- Consumes: `ParentBottomNav` from `@/components/parent/bottom-nav` (existing, unchanged).
- Produces: route `/parent/special-requests`, which Task 4's Home page links to. Owns the `Task` type and all task state going forward — no other file depends on it.

- [ ] **Step 1: Create the page**

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, X, CheckCircle2, Clock, Clock3, AlarmClock } from "lucide-react";
import { ParentBottomNav } from "@/components/parent/bottom-nav";

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

export default function SpecialRequestsPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  function handleCreateTask(data: Omit<Task, "id" | "status">) {
    const newTask: Task = { ...data, id: `task-${Date.now()}`, status: "Pending" };
    setTasks((prev) => [...prev, newTask]);
  }

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-[#fffefa]">
      {showCreateTask && (
        <CreateTaskModal onClose={() => setShowCreateTask(false)} onCreate={handleCreateTask} />
      )}
      {selectedTask && (
        <TaskDetailsModal task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}

      <div className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-base font-bold text-cg-brand">Special Requests</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
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
      </div>

      <ParentBottomNav />
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Manual verification**

With the dev server running, navigate to `/parent/special-requests` directly, confirm:
- Header shows a back arrow and "Special Requests" title.
- The one initial task ("Give medicine to Tosin") renders as a card; clicking it opens the Task Details modal with all 5 fields plus status badge.
- Tapping "New Request" opens the Create Task modal; filling Title/Description/Scheduled Time and submitting shows the success state, and after tapping "Done" the new task appears in the list.
- Required-field validation: "Create Task" stays disabled until title, description, and scheduled time are all non-empty.

- [ ] **Step 4: Commit**

```bash
git add "app/(parent)/parent/special-requests/page.tsx"
git commit -m "Extract Special Requests into its own screen"
```

---

### Task 4: Rewrite Home as a quick-actions dashboard

**Files:**
- Modify: `app/(parent)/parent/home/page.tsx` (full rewrite — replaces the entire current file, which drops the `Task` type, `INITIAL_TASKS`, `CreateTaskModal`, `TaskDetailsModal`, `TaskCard`, `EmptyFeed`, `ScrollIcon`, the tab switcher, and the `mockFeedPosts` import, since those all moved to Task 2/3's new screens)

**Interfaces:**
- Consumes: `QuickActionCard` from `@/components/parent/quick-action-card` (Task 1), routes `/parent/moments` (Task 2) and `/parent/special-requests` (Task 3), plus the 11 already-existing parent routes listed in the design spec.
- Produces: the final Home page — no other task depends on this file.

- [ ] **Step 1: Replace the file**

```tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  ScanLine,
  LogIn,
  Plus,
  Baby,
  LayoutGrid,
  Images,
  TrendingUp,
  Pill,
  AlertTriangle,
  Star,
  CalendarCheck,
  Clock,
  CalendarDays,
  Megaphone,
  FileText,
  CreditCard,
} from "lucide-react";
import { ParentBottomNav } from "@/components/parent/bottom-nav";
import { QuickActionCard } from "@/components/parent/quick-action-card";
import { mockParentUser, mockChild, mockAttendanceHistory } from "@/lib/parent/mock-data";

export default function ParentHomePage() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-[#fffefa]">
      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-4">
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
          <Link
            href="/parent/notifications"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f5f6]"
          >
            <Bell size={20} className="text-gray-600" />
          </Link>
        </div>

        {/* Scan attendance code CTA */}
        <Link
          href="/parent/scan"
          className="mt-3 flex items-center justify-center gap-2.5 rounded-xl bg-cg-brand px-4 py-3 text-white active:scale-[0.98] transition-transform"
        >
          <ScanLine size={18} />
          <span className="text-sm font-semibold">Scan attendance code</span>
          <span className="inline-flex shrink-0 items-center rounded-full bg-white/20 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-white">
            New
          </span>
        </Link>

        {/* Today's check-in status */}
        <Link
          href="/parent/attendance"
          className="mt-3 flex items-center gap-2.5 rounded-xl bg-emerald-50 px-3.5 py-2.5"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
            <LogIn size={13} />
          </span>
          <p className="flex-1 text-xs font-semibold text-emerald-800">
            {mockAttendanceHistory[0].checkInTime
              ? `${mockChild.name} checked in at ${mockAttendanceHistory[0].checkInTime}`
              : `${mockChild.name} hasn't checked in yet today`}
          </p>
          <span className="text-[10px] font-semibold text-emerald-600">Details</span>
        </Link>

        {/* Quick Actions */}
        <p className="mb-3 mt-5 text-sm font-semibold text-gray-600">Quick Actions</p>

        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">My Family</p>
        <div className="mb-4 grid grid-cols-3 gap-3">
          <QuickActionCard icon={Baby} label="Manage Kids" onClick={() => router.push("/parent/children")} />
          <QuickActionCard icon={LayoutGrid} label="Moments" onClick={() => router.push("/parent/moments")} />
          <QuickActionCard icon={Images} label="Gallery" onClick={() => router.push("/parent/gallery")} />
        </div>

        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Health & Care</p>
        <div className="mb-4 grid grid-cols-3 gap-3">
          <QuickActionCard icon={TrendingUp} label="Growth" onClick={() => router.push("/parent/child/growth")} isNew />
          <QuickActionCard icon={Pill} label="Medication" onClick={() => router.push("/parent/medication")} isNew />
          <QuickActionCard icon={AlertTriangle} label="Incidents" onClick={() => router.push("/parent/incidents")} isNew />
          <QuickActionCard icon={Star} label="Rate Caregiver" onClick={() => router.push("/parent/rate-caregiver")} isNew />
        </div>

        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Creche Life</p>
        <div className="mb-4 grid grid-cols-3 gap-3">
          <QuickActionCard icon={CalendarCheck} label="Attendance" onClick={() => router.push("/parent/attendance")} />
          <QuickActionCard icon={Clock} label="Special Requests" onClick={() => router.push("/parent/special-requests")} />
          <QuickActionCard icon={CalendarDays} label="Events" onClick={() => router.push("/parent/events")} isNew />
          <QuickActionCard icon={Megaphone} label="Announcements" onClick={() => router.push("/parent/announcements")} isNew />
        </div>

        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Enrollment & Billing</p>
        <div className="grid grid-cols-3 gap-3">
          <QuickActionCard icon={FileText} label="Application/Waitlist" onClick={() => router.push("/parent/application")} />
          <QuickActionCard icon={CreditCard} label="Fees" onClick={() => router.push("/parent/fees")} />
        </div>
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
```

Note on layout: sections use `grid grid-cols-3` (not the caregiver home's `flex` rows) because caregiver's tile counts are always multiples of 3 per row; here **Health & Care** (4 tiles) and **Creche Life** (4 tiles) aren't. A CSS grid leaves the trailing row's remaining cell(s) empty instead of stretching the last tile(s) to fill the row, which is what would happen with `flex`.

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors. In particular, confirm no lingering references to `mockFeedPosts`, `Task`, or the removed modal components anywhere in this file.

- [ ] **Step 3: Manual verification**

With the dev server running, navigate to `/parent/home`, confirm:
- Header is just avatar + welcome text + bell (no kids icon next to the bell).
- Both banners (Scan attendance code, check-in status) render and link correctly, unchanged from before.
- "Quick Actions" heading, then 4 section labels (My Family, Health & Care, Creche Life, Enrollment & Billing) each with a 3-column tile grid; tile counts are 3, 4, 4, 2 respectively and the last cell(s) of ragged rows are empty (not stretched).
- Tapping each tile navigates to its target route (spot-check at least Manage Kids → `/parent/children`, Moments → `/parent/moments`, Special Requests → `/parent/special-requests`, Fees → `/parent/fees`).
- "New" badges appear only on Growth, Medication, Incidents, Rate Caregiver, Events, Announcements.
- The floating "Add child" button (bottom-right, "+") still works and still links to `/parent/child/add`.
- Bottom nav still renders and still works.

- [ ] **Step 4: Full production build check**

Run: `npm run build`
Expected: build succeeds with no type or lint errors across the whole app (this catches any stale reference to the old Home internals from other files, e.g. anything that imported `EmptyFeed`/`ScrollIcon`/`Task` from the old home page — none are expected, but this is the safety net).

- [ ] **Step 5: Commit**

```bash
git add "app/(parent)/parent/home/page.tsx"
git commit -m "Redesign parent Home into a quick-actions dashboard"
```

---

## Self-Review Notes

- **Spec coverage:** Header simplification ✓ (Task 4), banners unchanged ✓ (Task 4), 4-section/13-tile grid with the exact routes listed in the spec ✓ (Task 4), Moments as its own screen ✓ (Task 2), Special Requests as its own screen with its modals/state ✓ (Task 3), "New" badges mirroring existing usage elsewhere (Growth/Medication/Incidents/Rate Caregiver/Events/Announcements match caregiver's own "isNew" tiles for the same features) ✓.
- **Placeholder scan:** none — every task ships complete file contents.
- **Type consistency:** `QuickActionCard`'s prop shape (`icon`, `label`, `onClick`, `isNew?`) is identical across Task 1's definition and every call site in Task 4. `Task` type and its fields are self-contained within Task 3's file only (Home no longer references it).
- **Deviation flagged:** floating "+" button semantics corrected against the spec's imprecise wording (see Global Constraints note); grid vs. flex layout choice explained inline in Task 4.
