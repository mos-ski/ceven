"use client";

import { ChevronDown, MoreVertical, Search } from "lucide-react";
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
import { TableCell, TableRow } from "@/components/ui/table";
import {
  STAFF_TASKS,
  TASK_ASSIGNEES,
  type StaffTask,
  type TaskPriority,
  type TaskStatus,
} from "@/lib/mock-data/daily-operations";

const PRIORITY_DOT_CLASS: Record<TaskPriority, string> = {
  Low: "bg-[#2d1810]",
  Medium: "bg-[#cc8000]",
  High: "bg-[#ef4444]",
};

const STATUS_BADGE_CLASS: Record<TaskStatus, string> = {
  "To Do": "border-transparent bg-[#f3f4f6] text-[#454B54]",
  "In Progress": "border-transparent bg-[#fff6e6] text-[#cc8000]",
  Done: "border-transparent bg-badge-success-bg text-success-text",
  Overdue: "border-transparent bg-[#fde8e8] text-[#ef4444]",
  "Not Started": "border-transparent bg-[#f3f4f6] text-[#2d1810]",
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
        <input type="checkbox" className="h-4 w-4 accent-[#3b2513]" />
      </TableCell>
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
        <span className="inline-flex items-center gap-1.5 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]">
          <span className={`h-2 w-2 rounded-full ${PRIORITY_DOT_CLASS[task.priority]}`} />
          {task.priority}
        </span>
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">{task.source}</TableCell>
      <TableCell>
        <Badge variant="outline" className={STATUS_BADGE_CLASS[task.status]}>
          ● {task.status}
        </Badge>
      </TableCell>
      <TableCell>
        <button className="flex items-center justify-center text-[#6b7280] hover:text-[#2d1810]">
          <MoreVertical className="h-4 w-4" />
        </button>
      </TableCell>
    </TableRow>
  );
}

const tasksStatsCards = [
  { value: "0", title: "Assigned Task", subtitle: "Today June 24" },
  { value: "0", title: "Special Request", subtitle: "Today June 24" },
  { value: "0", title: "Pending", subtitle: "Today June 24" },
  { value: "0", title: "Completed", subtitle: "Today June 24" },
];

type TasksSubTab = "Assigned Tasks" | "Special Request";
const SUB_TABS: TasksSubTab[] = ["Assigned Tasks", "Special Request"];

export function TasksView() {
  const [addOpen, setAddOpen] = useState(false);
  const [subTab, setSubTab] = useState<TasksSubTab>("Assigned Tasks");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button
          onClick={() => setAddOpen(true)}
          className="h-9 gap-2 rounded-lg bg-[#3b2513] px-4 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#faf2e1]"
        >
          Add Task
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:gap-4 lg:grid-cols-4">
        {tasksStatsCards.map((card) => (
          <div
            key={card.title}
            className="flex flex-col gap-1 rounded-xl border border-[#e6ebf3] bg-white p-4"
          >
            <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">{card.title}</p>
            <p className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">
              {card.value}
            </p>
            {card.subtitle && (
              <p className="font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">{card.subtitle}</p>
            )}
          </div>
        ))}
      </div>

      {/* Sub tabs */}
      <div className="flex overflow-x-auto border-b border-[#e6ebf3]">
        {SUB_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setSubTab(tab)}
            className={`whitespace-nowrap px-4 py-2 text-sm font-medium font-[family-name:var(--font-urbanist)] cursor-pointer ${
              subTab === tab
                ? "border-b-2 border-[#3b2513] text-[#3b2513]"
                : "text-[#6b7280] hover:text-[#2d1810]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4">
          <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
            All Tasks
          </h2>
          <div className="flex items-center gap-2">
            <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">Filter by:</span>
            <FilterDropdown label="All Priority" options={["All Priority", "Low", "Medium", "High"]} />
            <FilterDropdown label="All Status" options={["All Status", "To Do", "In Progress", "Done", "Overdue", "Not Started"]} />
            <div className="relative">
              <Search className="absolute top-1/2 left-2 size-4 -translate-y-1/2 text-[#9ca3af]" />
              <Input
                placeholder="Search children, parents..."
                className="h-8 w-full sm:w-56 rounded-lg border-[rgba(45,24,16,0.12)] bg-[#f5edd8] pl-8 text-xs"
              />
            </div>
          </div>
        </div>

        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#edd9c0]">
                <th className="w-10 px-4 py-3">
                  <input type="checkbox" className="h-4 w-4 accent-[#3b2513]" />
                </th>
                {["Task", "Assigned To", "Due", "Priority", "Source", "Status", "Action"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {STAFF_TASKS.map((task) => (
                <TaskRow key={task.id} task={task} />
              ))}
            </tbody>
          </table>
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
                  ● {task.status}
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
                <span className="inline-flex items-center gap-1 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
                  <span className={`h-1.5 w-1.5 rounded-full ${PRIORITY_DOT_CLASS[task.priority]}`} />
                  {task.priority}
                </span>
                <span className="text-[#d0d5dd]">•</span>
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
