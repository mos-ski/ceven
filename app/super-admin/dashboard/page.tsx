import Link from "next/link";
import { PLATFORM_STATS, PLATFORM_ACTIVITY, GROWTH_TREND, TENANTS } from "@/lib/super-admin/mock-data";

const STATS = [
  { label: "Total Tenants", value: String(PLATFORM_STATS.totalTenants) },
  { label: "Creches", value: String(PLATFORM_STATS.organizationTenants) },
  { label: "Independent Caregivers", value: String(PLATFORM_STATS.individualTenants) },
  { label: "Active Trials", value: String(PLATFORM_STATS.activeTrials) },
  { label: "MRR", value: PLATFORM_STATS.mrr },
  { label: "Total Children", value: String(PLATFORM_STATS.totalChildren) },
  { label: "Past Due", value: String(PLATFORM_STATS.pastDue) },
  { label: "Open Tickets", value: String(PLATFORM_STATS.openTickets) },
];

export default function SuperAdminDashboardPage() {
  const maxTrend = Math.max(...GROWTH_TREND);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-3">
            <p className="text-xs text-slate-500">{stat.label}</p>
            <p className="mt-1 text-xl font-bold text-slate-800">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-bold text-slate-800">Tenant Growth (12mo)</p>
              <Link href="/super-admin/growth-usage" className="text-xs font-semibold text-purple-600">
                View Analytics
              </Link>
            </div>
            <div className="flex h-24 items-end gap-1.5">
              {GROWTH_TREND.map((v, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-purple-500"
                  style={{ height: `${(v / maxTrend) * 100}%` }}
                />
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-bold text-slate-800">Tenants Needing Attention</p>
              <Link href="/super-admin/tenants" className="text-xs font-semibold text-purple-600">
                View All
              </Link>
            </div>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400">
                  <th className="pb-2 font-medium">Tenant</th>
                  <th className="pb-2 font-medium">Type</th>
                  <th className="pb-2 font-medium">Plan</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {TENANTS.filter((t) => t.status === "Past Due" || t.status === "Trial" || t.status === "Suspended").map(
                  (tenant) => (
                    <tr key={tenant.id} className="border-t border-slate-100">
                      <td className="py-2 font-medium text-slate-700">{tenant.name}</td>
                      <td className="py-2 text-slate-500">
                        {tenant.ownerType === "organization" ? "Creche" : "Independent"}
                      </td>
                      <td className="py-2 text-slate-500">{tenant.plan}</td>
                      <td className="py-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            tenant.status === "Suspended"
                              ? "bg-red-100 text-red-700"
                              : tenant.status === "Past Due"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-sky-100 text-sky-700"
                          }`}
                        >
                          {tenant.status}
                        </span>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="mb-3 text-sm font-bold text-slate-800">Platform Activity</p>
          <div className="flex flex-col gap-3">
            {PLATFORM_ACTIVITY.map((event) => (
              <div key={event.id} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500" />
                <div>
                  <p className="text-xs text-slate-700">{event.text}</p>
                  <p className="text-[10px] text-slate-400">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
