import { PageHeader } from "@/components/ui/page-header";
import { FacilitiesView } from "@/components/admin/daily-operations/facilities-view";

export default function FacilitiesV3Page() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Facilities"
        description="Maintenance requests and the recurring cleaning schedule."
      />
      <FacilitiesView />
    </div>
  );
}
