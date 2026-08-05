import { PageHeader } from "@/components/ui/page-header";
import { AuditTrailTab } from "@/components/admin/intelligence/audit-trail-tab";

export default function AuditTrailV3Page() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Audit Trail"
        description="Every action taken across the platform, by staff and AI, timestamped and searchable."
      />

      <div className="rounded-2xl border border-black/[0.07] bg-white p-1">
        <AuditTrailTab />
      </div>
    </div>
  );
}
