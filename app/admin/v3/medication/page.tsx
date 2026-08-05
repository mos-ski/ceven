import { MedicationView } from "@/components/admin/daily-operations/medication-view";

export default function MedicationV3Page() {
 return (
  <div className="flex flex-col gap-5">
   <div>
    <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2D1810]">
     Medication
    </h1>
    <p className="mt-1 text-sm text-[#2D1810]/50">
     Log and track medication administered to children.
    </p>
   </div>
   <MedicationView />
  </div>
 );
}
