"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Users, Smartphone, AlertTriangle, PhoneMissed, Search, MoreVertical } from "lucide-react";

import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AiRiskBadge, { calculateRisk } from "@/components/dashboard/ai-risk-badge";
import { PARENTS } from "@/lib/mock-data/children";

// Proxy overdue-days used only to feed the shared AI risk calculator, the mock Parent
// record only carries a coarse feeStatus, not a real days-overdue figure.
function proxyOverdueDays(feeStatus: (typeof PARENTS)[number]["feeStatus"]) {
 if (feeStatus === "Overdue") return 10;
 if (feeStatus === "Pending") return 4;
 return 0;
}

const APP_ACTIVE = PARENTS.filter((p) => p.appStatus === "Installed").length;
const HIGH_RISK = PARENTS.filter((p) => calculateRisk(proxyOverdueDays(p.feeStatus)) === "high").length;
// "Uncontacted Today" has no v2 equivalent, approximated as parents who have not
// installed the app (never reached digitally), a proxy until real contact-log data exists.
const UNCONTACTED_TODAY = PARENTS.filter((p) => p.appStatus === "Not Installed").length;

function StatCard({
 Icon,
 label,
 value,
 sub,
}: {
 Icon: typeof Users;
 label: string;
 value: string;
 sub: string;
}) {
 return (
  <div className="relative overflow-hidden rounded-2xl bg-[#F5EDD8]/30 p-4">
   <p className="text-xs font-bold uppercase tracking-wide text-[#2D1810]/50">{label}</p>
   <p className="mt-1.5 font-[family-name:var(--font-merriweather)] text-[1.85rem] font-bold leading-none text-[#2D1810]">
    {value}
   </p>
   <p className="mt-1.5 text-[11px] text-[#2D1810]/60">{sub}</p>
   <Icon className="pointer-events-none absolute right-3 top-3 h-6 w-6 text-[#2D1810]/10" />
  </div>
 );
}

function getInitials(name: string) {
 const parts = name.split(" ").filter((part) => !/^(Mr|Mrs|Ms|Dr|Miss|&)\.?$/i.test(part));
 return parts.slice(0, 2).map((p) => p[0]?.toUpperCase()).join("");
}

export default function ParentsV3Page() {
 const [search, setSearch] = useState("");

 const filteredParents = useMemo(() => {
  const query = search.trim().toLowerCase();
  if (!query) return PARENTS;
  return PARENTS.filter(
   (p) =>
    p.name.toLowerCase().includes(query) ||
    p.childName.toLowerCase().includes(query) ||
    p.email.toLowerCase().includes(query)
  );
 }, [search]);

 return (
  <div className="flex flex-col gap-5">
   <div>
    <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2D1810]">
     Parents
    </h1>
    <p className="mt-1 text-sm text-[#2D1810]/60">
     Directory of registered parents and guardians, app adoption and payment risk.
    </p>
   </div>

   <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
    <StatCard Icon={Users} label="Registered" value={String(PARENTS.length).padStart(2, "0")} sub="+12.5% vs last month" />
    <StatCard Icon={Smartphone} label="App Active" value={String(APP_ACTIVE).padStart(2, "0")} sub={`${Math.round((APP_ACTIVE / PARENTS.length) * 100)}% of parents`} />
    <StatCard Icon={AlertTriangle} label="High Payment Risk" value={String(HIGH_RISK).padStart(2, "0")} sub="7+ days overdue" />
    <StatCard Icon={PhoneMissed} label="Uncontacted Today" value={String(UNCONTACTED_TODAY).padStart(2, "0")} sub="No app activity yet" />
   </div>

   <div className="rounded-2xl bg-[#F5EDD8]/30 p-5">
    <div className="flex flex-col gap-3 pb-4 sm:flex-row sm:items-center sm:justify-between">
     <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2D1810]">
      Parent Directory
     </h2>
     <div className="relative">
      <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#2D1810]/40" />
      <input
       value={search}
       onChange={(e) => setSearch(e.target.value)}
       placeholder="Search parents, children…"
       className="h-9 w-64 rounded-lg border border-black/[0.1] bg-[#F5EDD8] pl-8 text-xs text-[#2D1810] placeholder:text-[#2D1810]/40 focus:outline-none"
      />
     </div>
    </div>

    <div className="overflow-x-auto">
     <table className="w-full border-collapse text-sm">
      <thead>
       <tr className="text-left text-xs uppercase tracking-wide text-[#2D1810]/50">
        <th className="pb-2 pr-3 font-semibold">Parent</th>
        <th className="pb-2 pr-3 font-semibold">Phone</th>
        <th className="pb-2 pr-3 font-semibold">Children</th>
        <th className="pb-2 pr-3 font-semibold">Balance</th>
        <th className="pb-2 pr-3 font-semibold">App Status</th>
        <th className="pb-2 pr-3 font-semibold">Risk</th>
        <th className="pb-2 font-semibold text-center">Action</th>
       </tr>
      </thead>
      <tbody>
       {filteredParents.length === 0 ? (
        <tr>
         <td colSpan={7} className="py-10 text-center text-sm text-[#2D1810]/50">
          No parents match your search.
         </td>
        </tr>
       ) : (
        filteredParents.map((parent) => (
         <tr key={parent.id} className={`group ${parent.id.length % 2 === 0 ? "bg-white/60" : "bg-transparent"}`}>
          <td className="py-3 pr-3">
           <Link href={`/admin/v3/parents/${parent.id}`} className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EDD9C0] text-xs font-bold text-[#3B2513]">
             {getInitials(parent.name)}
            </div>
            <div>
             <p className="font-semibold text-[#2D1810] group-hover:underline">{parent.name}</p>
             <p className="text-[11px] text-[#2D1810]/50">{parent.email}</p>
            </div>
           </Link>
          </td>
          <td className="py-3 pr-3 text-[#2D1810]/80">{parent.phone}</td>
          <td className="py-3 pr-3 text-[#2D1810]/80">{parent.childName}</td>
          <td className="py-3 pr-3 font-mono">
           {parent.dueAmount ? (
            <span className="font-semibold text-[#D4522F]">{parent.dueAmount}</span>
           ) : (
            <span className="text-[#2D1810]/40">--</span>
           )}
          </td>
          <td className="py-3 pr-3">
           {parent.appStatus === "Installed" ? (
            <span className="rounded-full bg-[#2A8A52]/10 px-2.5 py-1 text-xs font-semibold text-[#2A8A52]">
             Installed
            </span>
           ) : (
            <button className="text-xs font-semibold text-[#2D1810] underline hover:opacity-70">
             Send App Invite
            </button>
           )}
          </td>
          <td className="py-3 pr-3">
           <AiRiskBadge level={calculateRisk(proxyOverdueDays(parent.feeStatus))} overdueDays={proxyOverdueDays(parent.feeStatus)} />
          </td>
          <td className="py-3">
           <div className="flex items-center justify-center">
            <DropdownMenu>
             <DropdownMenuTrigger render={<button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#2D1810]/5" />}>
              <MoreVertical className="h-4 w-4 text-[#2D1810]/60" />
             </DropdownMenuTrigger>
             <DropdownMenuContent>
              <DropdownMenuItem render={<Link href={`/admin/v3/parents/${parent.id}`} />}>View Profile</DropdownMenuItem>
              <DropdownMenuItem render={<Link href={`/admin/v3/children/${parent.childId}`} />}>View Child</DropdownMenuItem>
             </DropdownMenuContent>
            </DropdownMenu>
           </div>
          </td>
         </tr>
        ))
       )}
      </tbody>
     </table>
    </div>
   </div>
  </div>
 );
}
