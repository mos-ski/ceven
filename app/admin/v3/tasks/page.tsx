import { PageHeader } from "@/components/ui/page-header";
import { TasksView } from "@/components/admin/daily-operations/tasks-view";

export default function TasksV3Page() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Tasks"
        description="Staff task list — assignments, due dates, and priority."
      />
      <TasksView />
    </div>
  );
}
