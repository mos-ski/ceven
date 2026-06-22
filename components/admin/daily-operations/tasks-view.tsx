"use client";

import { ChevronDown, ClipboardPlus, MoreVertical } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  STAFF_TASKS,
  TASK_ASSIGNEES,
  type StaffTask,
  type TaskPriority,
  type TaskStatus,
} from "@/lib/mock-data/daily-operations";

const PRIORITY_BADGE_CLASS: Record<TaskPriority, string> = {
  Low: "border-transparent bg-[#f3f4f6] text-[#454B54]",
  Medium: "border-transparent bg-[#fff6e6] text-[#cc8000]",
  High: "border-transparent bg-[#fde8e8] text-[#ef4444]",
};

const STATUS_BADGE_CLASS: Record<TaskStatus, string> = {
  "To Do": "border-transparent bg-[#f3f4f6] text-[#454B54]",
  "In Progress": "border-transparent bg-[#fff6e6] text-[#cc8000]",
  Done: "border-transparent bg-badge-success-bg text-success-text",
  Overdue: "border-transparent bg-[#fde8e8] text-[#ef4444]",
};

function FilterDropdown({ label, options }: { label: string; options: string[] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            className="h-8 gap-2 rounded-lg border-input-border bg-white px-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-[#454B54]"
          />
        }
      >
        {label}
        <ChevronDown className="size-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((option) => (
          <DropdownMenuItem key={option}>{option}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AddTaskModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
            Assign a new task to a staff member.
          </p>
        </DialogHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-6 py-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="task-title">Task</Label>
            <Input id="task-title" placeholder="e.g. Submit daily report" className="h-9" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="task-assignee">Assigned To</Label>
              <select
                id="task-assignee"
                defaultValue=""
                className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
              >
                <option value="" disabled>
                  Select staff
                </option>
                {TASK_ASSIGNEES.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="task-due">Due Date</Label>
              <Input id="task-due" type="date" className="h-9" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="task-priority">Priority</Label>
            <select
              id="task-priority"
              defaultValue="Medium"
              className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <DialogFooter>
          <DialogClose
            render={
              <Button
                variant="outline"
                className="h-9 rounded-lg border-[#d0d5dd] px-4 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]"
              />
            }
          >
            Cancel
          </DialogClose>
          <Button
            onClick={() => onOpenChange(false)}
            className="h-9 rounded-lg bg-[#3b2513] px-4 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#faf2e1]"
          >
            Save Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function TaskRow({ task }: { task: StaffTask }) {
  return (
    <TableRow className="border-table-border">
      <TableCell>
        <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-black">{task.title}</p>
        {task.subtitle && (
          <p className="font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">{task.subtitle}</p>
        )}
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {task.assignedTo}
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">{task.dueDate}</TableCell>
      <TableCell>
        <Badge variant="outline" className={PRIORITY_BADGE_CLASS[task.priority]}>
          {task.priority}
        </Badge>
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">{task.source}</TableCell>
      <TableCell>
        <Badge variant="outline" className={STATUS_BADGE_CLASS[task.status]}>
          {task.status}
        </Badge>
      </TableCell>
      <TableCell>
        {task.source === "AI Assigned" ? (
          <button className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#3b2513] underline">
            View
          </button>
        ) : (
          <button className="flex items-center justify-center text-[#6b7280] hover:text-[#2d1810]">
            <MoreVertical className="h-4 w-4" />
          </button>
        )}
      </TableCell>
    </TableRow>
  );
}

const tasksStatsCards = [
  { value: "00", label: "new today", title: "Assigned Today" },
  { value: String(STAFF_TASKS.filter((t) => t.status === "In Progress").length).padStart(2, "0"), label: "underway", title: "In Progress" },
  { value: String(STAFF_TASKS.filter((t) => t.status === "Overdue").length).padStart(2, "0"), label: "need follow-up", title: "Overdue" },
  { value: String(STAFF_TASKS.filter((t) => t.source === "AI Assigned").length).padStart(2, "0"), label: "auto-created", title: "AI Escalated" },
];

export function TasksView() {
  const [addOpen, setAddOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button
          onClick={() => setAddOpen(true)}
          className="h-9 gap-2 rounded-lg bg-[#3b2513] px-4 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#faf2e1]"
        >
          <ClipboardPlus className="h-4 w-4" />
          Add Task
        </Button>
      </div>

      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-1 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
        {tasksStatsCards.map((card) => (
          <div
            key={card.title}
            className="min-w-[160px] snap-start flex-1 flex-col gap-1 rounded-xl border border-[#e6ebf3] bg-white p-4"
          >
            <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{card.title}</p>
            <p className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">
              {card.value}
            </p>
            <p className="font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4">
          <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
            All Tasks
          </h2>
          <div className="flex items-center gap-2">
            <FilterDropdown label="All Priority" options={["All Priority", "Low", "Medium", "High"]} />
            <FilterDropdown label="All Status" options={["All Status", "To Do", "In Progress", "Done", "Overdue"]} />
          </div>
        </div>

        <div className="hidden overflow-x-auto lg:block">
          <Table>
            <TableHeader>
              <TableRow className="border-none bg-table-header-bg hover:bg-table-header-bg">
                <TableHead>Task</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Due</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {STAFF_TASKS.map((task) => (
                <TaskRow key={task.id} task={task} />
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile card list */}
        <div className="flex flex-col gap-2 px-4 pb-4 lg:hidden">
          {STAFF_TASKS.map((task) => (
            <div key={task.id} className="rounded-xl border border-[#eaecf0] p-3">
              <div className="flex items-center justify-between">
                <span className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
                  {task.title}
                </span>
                <Badge variant="outline" className={STATUS_BADGE_CLASS[task.status]}>
                  {task.status}
                </Badge>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
                  {task.assignedTo}
                </span>
                <span className="text-[#d0d5dd]">•</span>
                <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{task.dueDate}</span>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <Badge variant="outline" className={PRIORITY_BADGE_CLASS[task.priority]}>
                  {task.priority}
                </Badge>
                <p className="font-[family-name:var(--font-nunito)] text-[10px] text-[#9ca3af]">{task.source}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddTaskModal open={addOpen} onOpenChange={setAddOpen} />
    </div>
  );
}
