import { TENANTS, PLATFORM_STATS } from "@/lib/super-admin/mock-data";

const PLAN_ORDER = ["Seedling", "Nestling Pro", "Flourish"] as const;

export default function PlatformBillingPage() {
  const byPlan = PLAN_ORDER.map((plan) => ({
    plan,
    count: TENANTS.filter((t) => t.plan === plan && t.status !== "Trial").length,
  }));

  const pastDueTenants = TENANTS.filter((t) => t.status === "Past Due");

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-3">
          <p className="text-xs text-slate-500">Total MRR</p>
          <p className="mt-1 text-xl font-bold text-slate-800">{PLATFORM_STATS.mrr}</p>
          <p className="mt-1 text-[10px] text-emerald-600">{PLATFORM_STATS.mrrTrend}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3">
          <p className="text-xs text-slate-500">Paying Tenants</p>
          <p className="mt-1 text-xl font-bold text-slate-800">
            {TENANTS.filter((t) => t.status === "Active" || t.status === "Past Due").length}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3">
          <p className="text-xs text-slate-500">Active Trials</p>
          <p className="mt-1 text-xl font-bold text-slate-800">{PLATFORM_STATS.activeTrials}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3">
          <p className="text-xs text-slate-500">Past Due</p>
          <p className="mt-1 text-xl font-bold text-red-600">{PLATFORM_STATS.pastDue}</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="mb-3 text-sm font-bold text-slate-800">Tenants by Plan</p>
        <div className="flex flex-col gap-2">
          {byPlan.map((row) => (
            <div key={row.plan} className="flex items-center gap-3">
              <span className="w-28 shrink-0 text-xs text-slate-600">{row.plan}</span>
              <div className="h-2 flex-1 rounded-full bg-slate-100">
                <div
                  className="h-2 rounded-full bg-purple-500"
                  style={{ width: `${(row.count / TENANTS.length) * 100}%` }}
                />
              </div>
              <span className="w-6 shrink-0 text-right text-xs font-semibold text-slate-700">{row.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="mb-3 text-sm font-bold text-slate-800">Past Due Tenants</p>
        {pastDueTenants.length === 0 ? (
          <p className="text-xs text-slate-400">No tenants currently past due.</p>
        ) : (
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400">
                <th className="pb-2 font-medium">Tenant</th>
                <th className="pb-2 font-medium">Plan</th>
                <th className="pb-2 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {pastDueTenants.map((tenant) => (
                <tr key={tenant.id} className="border-t border-slate-100">
                  <td className="py-2 font-medium text-slate-700">{tenant.name}</td>
                  <td className="py-2 text-slate-500">{tenant.plan}</td>
                  <td className="py-2 text-red-600">{tenant.mrr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
