"use client";

import { useState } from "react";
import { Pill } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { MedicationView } from "@/components/admin/daily-operations/medication-view";

export default function MedicationV3Page() {
  const [logOpen, setLogOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Medication"
        description="Log and track medication administered to children."
        action={
          <Button
            onClick={() => setLogOpen(true)}
            className="h-9 gap-2 rounded-lg bg-[#3b2513] px-4 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#faf2e1]"
          >
            <Pill className="h-4 w-4" />
            Log Medication
          </Button>
        }
      />
      <MedicationView logOpen={logOpen} onLogOpenChange={setLogOpen} />
    </div>
  );
}
