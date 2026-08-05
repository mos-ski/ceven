import { InventoryView } from "@/components/admin/daily-operations/inventory-view";

export default function InventoryV3Page() {
 return (
  <div className="flex flex-col gap-5">
   <div>
    <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2D1810]">
     Inventory & Supplies
    </h1>
    <p className="mt-1 text-sm text-[#2D1810]/50">
     Stock levels, equipment register, and supply orders.
    </p>
   </div>
   <InventoryView />
  </div>
 );
}
