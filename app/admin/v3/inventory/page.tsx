"use client";

import { useState } from "react";
import { PackagePlus, Wrench, ShoppingCart } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { MoreActionsButton } from "@/components/ui/more-actions-button";
import { InventoryView } from "@/components/admin/daily-operations/inventory-view";

export default function InventoryV3Page() {
  const [restockOpen, setRestockOpen] = useState(false);
  const [equipmentOpen, setEquipmentOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Inventory & Supplies"
        description="Stock levels, equipment register, and supply orders."
        action={
          <>
            <MoreActionsButton
              actions={[
                { label: "Register Equipment", icon: Wrench, onClick: () => setEquipmentOpen(true) },
                { label: "New Order", icon: ShoppingCart, onClick: () => setOrderOpen(true) },
              ]}
            />
            <Button
              onClick={() => setRestockOpen(true)}
              className="h-9 gap-2 rounded-lg bg-[#3b2513] px-4 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#faf2e1]"
            >
              <PackagePlus className="h-4 w-4" />
              Add Item
            </Button>
          </>
        }
      />
      <InventoryView
        restockOpen={restockOpen}
        onRestockOpenChange={setRestockOpen}
        equipmentOpen={equipmentOpen}
        onEquipmentOpenChange={setEquipmentOpen}
        orderOpen={orderOpen}
        onOrderOpenChange={setOrderOpen}
      />
    </div>
  );
}
