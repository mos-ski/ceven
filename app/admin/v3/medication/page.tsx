import { PageHeader } from "@/components/ui/page-header";
import { MedicationView } from "@/components/admin/daily-operations/medication-view";

export default function MedicationV3Page() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Medication"
        description="Log and track medication administered to children."
      />
      <MedicationView />
    </div>
  );
}
