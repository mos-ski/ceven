import { notFound } from "next/navigation";
import Link from "next/link";
import { TENANTS } from "@/lib/super-admin/mock-data";

const STATUS_BADGE: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Trial: "bg-sky-100 text-sky-700",
  "Past Due": "bg-amber-100 text-amber-700",
  Suspended: "bg-red-100 text-red-700",
};

export default async function TenantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tenant = TENANTS.find((t) => t.id === id);

  if (!tenant) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-4">
      <Link href="/super-admin/tenants" className="text-xs font-semibold text-purple-600">
        ← All Tenants
      </Link>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-800">{tenant.name}</h1>
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_BADGE[tenant.status]}`}>
                {tenant.status}
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              {tenant.ownerType === "organization" ? "Creche (organization)" : "Independent caregiver"} ·{" "}
              {tenant.location}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700"
            >
              Impersonate
            </button>
            <button
              type="button"
              className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600"
            >
              Suspend Tenant
            </button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-lg border border-slate-100 p-3">
            <p className="text-xs text-slate-400">Plan</p>
            <p className="mt-1 text-sm font-bold text-slate-800">{tenant.plan}</p>
          </div>
          <div className="rounded-lg border border-slate-100 p-3">
            <p className="text-xs text-slate-400">MRR</p>
            <p className="mt-1 text-sm font-bold text-slate-800">{tenant.mrr}</p>
          </div>
          <div className="rounded-lg border border-slate-100 p-3">
            <p className="text-xs text-slate-400">Children</p>
            <p className="mt-1 text-sm font-bold text-slate-800">{tenant.childrenCount}</p>
          </div>
          <div className="rounded-lg border border-slate-100 p-3">
            <p className="text-xs text-slate-400">
              {tenant.ownerType === "organization" ? "Staff" : "Families"}
            </p>
            <p className="mt-1 text-sm font-bold text-slate-800">{tenant.peopleCount}</p>
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-400">Joined {tenant.joinedDate}</p>
      </div>

      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
        Billing history, support tickets, and activity log for this tenant are not yet built —
        this detail view currently covers identity, plan, and status only.
      </div>
    </div>
  );
}
