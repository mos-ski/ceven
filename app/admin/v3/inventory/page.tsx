import { PageHeader } from "@/components/ui/page-header";
import { InventoryView } from "@/components/admin/daily-operations/inventory-view";

export default function InventoryV3Page() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Inventory & Supplies"
        description="Stock levels, equipment register, and supply orders."
      />
      <InventoryView />
    </div>
  );
}
