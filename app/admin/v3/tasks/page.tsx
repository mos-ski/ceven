import { TasksView } from "@/components/admin/daily-operations/tasks-view";

export default function TasksV3Page() {
 return (
  <div className="flex flex-col gap-5">
   <div>
    <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2D1810]">
     Tasks
    </h1>
    <p className="mt-1 text-sm text-[#2D1810]/50">
     Staff task list: assignments, due dates, and priority.
    </p>
   </div>
   <TasksView />
  </div>
 );
}
