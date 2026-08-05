import { FacilitiesView } from "@/components/admin/daily-operations/facilities-view";

export default function FacilitiesV3Page() {
 return (
  <div className="flex flex-col gap-5">
   <div>
    <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2D1810]">
     Facilities
    </h1>
    <p className="mt-1 text-sm text-[#2D1810]/50">
     Maintenance requests and the recurring cleaning schedule.
    </p>
   </div>
   <FacilitiesView />
  </div>
 );
}
