"use client";

import { Wallet, MinusCircle, PiggyBank, Clock3 } from "lucide-react";

import { StatCardV3 } from "@/components/admin-v3/stat-card";
import { PAYROLL, CURRENT_PAYROLL_MONTH, type PayrollStatus } from "@/lib/mock-data/staff";

function formatCurrency(value: number) {
 return `₦${Math.round(value).toLocaleString("en-NG")}`;
}

// PAYE / Pension aren't broken out in the shared PAYROLL mock (it only tracks a single
// `deductions` figure), derived here at standard Nigerian statutory rates purely for display,
// and folded into a recomputed net pay so the breakdown is internally consistent.
const PAYE_RATE = 0.09;
const PENSION_RATE = 0.08;

function absenceDays(row: (typeof PAYROLL)[number]) {
 if (row.deductions <= 0) return 0;
 const dailyRate = row.baseSalary / 22;
 return Math.max(1, Math.round(row.deductions / dailyRate));
}

const STATUS_STYLES: Record<PayrollStatus, string> = {
 Paid: "bg-[#EAF6EE] text-[#1E7A3D]",
 Pending: "bg-black/[0.04] text-[#2D1810]/60",
 Processing: "bg-[#FDF1E3] text-[#C47B2C]",
};

export default function PayrollV3Page() {
 const rows = PAYROLL.map((p) => {
  const paye = Math.round(p.baseSalary * PAYE_RATE);
  const pension = Math.round(p.baseSalary * PENSION_RATE);
  const absence = absenceDays(p);
  const netPay = p.baseSalary + p.bonuses - paye - pension - p.deductions;
  return { ...p, paye, pension, absence, netPay };
 });

 const totalGross = rows.reduce((sum, r) => sum + r.baseSalary + r.bonuses, 0);
 const totalDeductions = rows.reduce((sum, r) => sum + r.paye + r.pension + r.deductions, 0);
 const totalNet = totalGross - totalDeductions;
 const paidCount = rows.filter((r) => r.status === "Paid").length;

 return (
  <div className="flex flex-col gap-5">
   <div className="flex flex-col gap-1">
    <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2D1810]">Payroll</h1>
    <p className="text-sm text-[#2D1810]/50">
     {CURRENT_PAYROLL_MONTH} · {rows.length} staff · {paidCount} of {rows.length} paid
    </p>
   </div>

   {/* Stats */}
   <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
    <StatCardV3 icon={Wallet} label="Total Gross" value={formatCurrency(totalGross)} sub={`${rows.length} staff this month`} />
    <StatCardV3
     icon={MinusCircle}
     label="Deductions"
     value={formatCurrency(totalDeductions)}
     sub="Tax · Pension · Absences"
     subColor="#D4522F"
    />
    <StatCardV3
     icon={PiggyBank}
     label="Net Payroll"
     value={formatCurrency(totalNet)}
     sub="after all deductions"
     subColor="#1E7A3D"
    />
    <StatCardV3
     icon={Clock3}
     label="Status"
     value={`${paidCount}/${rows.length} Paid`}
     sub={paidCount === rows.length ? "cycle complete" : "run in progress"}
     subColor={paidCount === rows.length ? "#1E7A3D" : "#C47B2C"}
    />
   </div>

   {/* Staff breakdown table */}
   <div className="rounded-2xl bg-[#F5EDD8]/30 p-5">
    <div className="mb-3 flex items-center justify-between">
     <p className="text-sm font-bold text-[#2D1810]">{CURRENT_PAYROLL_MONTH}: Staff Breakdown</p>
     <p className="text-xs text-[#2D1810]/40">Review each line before running payroll</p>
    </div>
    <div className="overflow-x-auto">
     <table className="w-full min-w-[880px] border-collapse text-sm">
      <thead>
       <tr className="text-left text-xs uppercase tracking-wide text-[#2D1810]/50">
        <th className="pb-2 pr-3 font-semibold">Staff</th>
        <th className="pb-2 pr-3 font-semibold">Basic Salary</th>
        <th className="pb-2 pr-3 font-semibold">Bonus</th>
        <th className="pb-2 pr-3 font-semibold">Deductions</th>
        <th className="pb-2 pr-3 font-semibold">PAYE Tax</th>
        <th className="pb-2 pr-3 font-semibold">Pension (8%)</th>
        <th className="pb-2 pr-3 font-semibold">Absences</th>
        <th className="pb-2 pr-3 font-semibold">Net Pay</th>
        <th className="pb-2 font-semibold">Status</th>
       </tr>
      </thead>
      <tbody>
       {rows.map((row) => (
        <tr key={row.id} className={Number(row.id) % 2 === 0 ? "bg-white/60" : "bg-transparent"}>
         <td className="py-2.5 pr-3">
          <p className="font-semibold text-[#2D1810]">{row.name}</p>
          <p className="text-[11px] text-[#2D1810]/40">{row.role}</p>
         </td>
         <td className="py-2.5 pr-3 font-mono text-[#2D1810]">{formatCurrency(row.baseSalary)}</td>
         <td className="py-2.5 pr-3 font-mono text-[#1E7A3D]">
          {row.bonuses > 0 ? formatCurrency(row.bonuses) : "₦0"}
         </td>
         <td className="py-2.5 pr-3 font-mono text-[#D4522F]">
          {row.deductions > 0 ? formatCurrency(row.deductions) : "₦0"}
         </td>
         <td className="py-2.5 pr-3 font-mono text-[#2D1810]/70">{formatCurrency(row.paye)}</td>
         <td className="py-2.5 pr-3 font-mono text-[#2D1810]/70">{formatCurrency(row.pension)}</td>
         <td className="py-2.5 pr-3 font-mono text-[#2D1810]/70">
          {row.absence > 0 ? `${row.absence} day${row.absence > 1 ? "s" : ""}` : "–"}
         </td>
         <td className="py-2.5 pr-3 font-mono font-bold text-[#2D1810]">{formatCurrency(row.netPay)}</td>
         <td className="py-2.5">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[row.status]}`}>
           {row.status}
          </span>
         </td>
        </tr>
       ))}
      </tbody>
     </table>
    </div>
   </div>
  </div>
 );
}
