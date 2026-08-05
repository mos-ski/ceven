import { PageHeader } from "@/components/ui/page-header";
import { HealthIncidentsView } from "@/components/admin/daily-operations/health-incidents-view";

export default function HealthV3Page() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Health & Incidents"
        description="Track incident reports, severity, and parent notifications."
      />
      <HealthIncidentsView />
    </div>
  );
}
