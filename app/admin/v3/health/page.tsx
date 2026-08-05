import { HealthIncidentsView } from "@/components/admin/daily-operations/health-incidents-view";

export default function HealthV3Page() {
 return (
 <div className="flex flex-col gap-5">
  <div>
  <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2D1810]">
   Health & Incidents
  </h1>
  <p className="mt-1 text-sm text-[#2D1810]/50">
   Track incident reports, severity, and parent notifications.
  </p>
  </div>
  <HealthIncidentsView />
 </div>
 );
}
