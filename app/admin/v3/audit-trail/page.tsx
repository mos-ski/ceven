import { AuditTrailTab } from "@/components/admin/intelligence/audit-trail-tab";

export default function AuditTrailV3Page() {
 return (
 <div className="flex flex-col gap-5">
  <div>
  <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2D1810]">
   Audit Trail
  </h1>
  <p className="mt-1 text-sm text-[#2D1810]/50">
   Every action taken across the platform, by staff and AI, timestamped and searchable.
  </p>
  </div>

  <div className="rounded-2xl border border-black/[0.07] bg-white p-1">
  <AuditTrailTab />
  </div>
 </div>
 );
}
