"use client";

import { useState } from "react";
import {
 Baby,
 CheckCircle2,
 XCircle,
 UserCog,
 Wallet,
 AlertTriangle,
 ClipboardList,
 ListTodo,
 QrCode,
 Megaphone,
 Receipt,
 MessageSquare,
 Sparkles,
 BarChart3,
 ArrowUpRight,
 FileBarChart,
} from "lucide-react";
import { useRouter } from "next/navigation";
import EnrollChildModal from "@/components/dashboard/enroll-child-modal";
import RaiseIncidentModal from "@/components/dashboard/raise-incident-modal";
import NewInvoiceModal from "@/components/admin/finance/new-invoice-modal";
import { LogActivityModal, type LogActivityMode } from "@/components/admin/children/log-activity-modal";
import AiRiskBadge, { calculateRisk } from "@/components/dashboard/ai-risk-badge";
import { useDashboardStats } from "@/lib/dashboard-data";

const STAT_ICONS = [Baby, CheckCircle2, XCircle, UserCog, Wallet, AlertTriangle, ClipboardList, ListTodo];

const AI_INSIGHTS = [
 {
  color: "#D4522F",
  bold: "Zara Mohammed",
  text: "has been absent 3× this week. Nut allergy on file. Flag for welfare check.",
  action: "Take Action",
 },
 {
  color: "#C47B2C",
  bold: "3 invoices",
  text: "are 7+ days overdue. Mr. Okafor historically pays late in Q2. Auto-remind now?",
  action: "Send Reminders",
 },
 {
  color: "#1E2D4A",
  bold: "Lion Class",
  text: "caregiver logging compliance dropped to 62% this week, below 80% threshold.",
  action: "Assign Task",
 },
];

const ROOM_OCCUPANCY = [
 { room: "🌻 Sunflower", age: "0–12m", present: 8, enrolled: 10, pct: 80, color: "bg-[#C47B2C]" },
 { room: "🦋 Butterfly", age: "1–2yr", present: 12, enrolled: 12, pct: 100, color: "bg-[#D4522F]" },
 { room: "🐬 Dolphin", age: "2–3yr", present: 10, enrolled: 14, pct: 71, color: "bg-[#1E2D4A]" },
 { room: "🦁 Lion", age: "3–4yr", present: 8, enrolled: 12, pct: 67, color: "bg-[#2A8A52]" },
];

const ACTIVITY_FEED = [
 { color: "bg-[#2A8A52]", text: "Amara Johnson checked in", meta: "Lion Class · Ms Tunde", time: "8:14am" },
 { color: "bg-[#C47B2C]", text: "Daily report submitted", meta: "for Kofi Osei", time: "8:22am" },
 { color: "bg-[#D4522F]", text: "Incident raised", meta: "minor fall, Emeka Balogun", time: "9:05am" },
 { color: "bg-[#1E2D4A]", text: "Invoice sent", meta: "to Mr. Adeleke, ₦45,000", time: "9:30am" },
 { color: "bg-[#8B9E7A]", text: "Announcement sent", meta: "Easter closure · 42 parents", time: "Apr 9" },
];

const OUTSTANDING_PAYMENTS = [
 { child: "Emeka Okafor", parent: "Mr. Charles Okafor", amount: "₦45,000", due: "Apr 1", overdueDays: 10 },
 { child: "Sade Bello", parent: "Mrs. Folake Bello", amount: "₦38,000", due: "Apr 5", overdueDays: 6 },
 { child: "Tunde Adeyemi", parent: "Mrs. Ngozi Adeyemi", amount: "₦52,000", due: "Apr 8", overdueDays: 3 },
];

const QUICK_ACTIONS = [
 { id: "add-child", icon: Baby, label: "Add Child" },
 { id: "qr-station", icon: QrCode, label: "QR Station" },
 { id: "log-report", icon: ClipboardList, label: "Log Report" },
 { id: "raise-incident", icon: AlertTriangle, label: "Raise Incident" },
 { id: "announce", icon: Megaphone, label: "Announce" },
 { id: "new-invoice", icon: Receipt, label: "New Invoice" },
 { id: "message-parent", icon: MessageSquare, label: "Message Parent" },
 { id: "ai-insights", icon: Sparkles, label: "Insights" },
 { id: "view-reports", icon: BarChart3, label: "View Reports" },
] as const;

function StatCard({
 Icon,
 label,
 value,
 sub,
 subColor,
}: {
 Icon: typeof Baby;
 label: string;
 value: string;
 sub: string;
 subColor?: string;
}) {
 return (
  <div className="relative overflow-hidden rounded-2xl border border-black/[0.07] bg-white p-4">
   <p className="text-xs font-bold uppercase tracking-wide text-[#2D1810]/50">{label}</p>
   <p className="mt-1.5 font-[family-name:var(--font-merriweather)] text-[1.85rem] font-bold leading-none text-[#2D1810]">
    {value}
   </p>
   <p className="mt-1.5 text-[11px]" style={{ color: subColor ?? "#2D1810" }}>
    {sub}
   </p>
   <Icon className="pointer-events-none absolute right-3 top-3 h-6 w-6 text-[#2D1810]/10" />
  </div>
 );
}

export default function DashboardV3Page() {
 const router = useRouter();
 const { stats } = useDashboardStats(30000);
 const [enrollOpen, setEnrollOpen] = useState(false);
 const [incidentOpen, setIncidentOpen] = useState(false);
 const [invoiceOpen, setInvoiceOpen] = useState(false);
 const [logMode, setLogMode] = useState<LogActivityMode | null>(null);

 function handleQuickAction(id: (typeof QUICK_ACTIONS)[number]["id"]) {
  if (id === "add-child") setEnrollOpen(true);
  else if (id === "qr-station") router.push("/admin/v3/reception");
  else if (id === "log-report") setLogMode("daily-report");
  else if (id === "raise-incident") setIncidentOpen(true);
  else if (id === "announce") router.push("/admin/v3/announcements");
  else if (id === "new-invoice") setInvoiceOpen(true);
  else if (id === "message-parent") router.push("/admin/v3/messages");
  else if (id === "ai-insights") router.push("/admin/v3/ai-command-center");
  else if (id === "view-reports") router.push("/admin/v3/reports");
 }

 const allStats = [...(stats?.row1 ?? []), ...(stats?.row2 ?? [])];

 return (
  <div className="flex flex-col gap-5">
   {/* Greeting */}
   <div className="relative flex flex-col gap-4 overflow-hidden rounded-2xl bg-gradient-to-br from-[#2D1810] via-[#3D2418] to-[#3D2418] px-7 py-6 sm:flex-row sm:items-center sm:justify-between">
    <svg className="pointer-events-none absolute bottom-0 right-0 h-[140px] w-[220px] opacity-[0.08]" viewBox="0 0 220 140" fill="none">
     <path d="M20 30 Q45 5 70 30 Q95 55 70 80 Q45 105 70 130" stroke="#C47B2C" strokeWidth="10" fill="none" strokeLinecap="round" />
     <path d="M100 10 Q125 35 100 60 Q75 85 100 110 Q125 135 100 160" stroke="#8B9E7A" strokeWidth="8" fill="none" strokeLinecap="round" />
    </svg>
    <div className="relative z-10">
     <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#D4913F]">
      {new Date().toLocaleDateString("en-NG", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
     </p>
     <h1 className="mt-2 font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#F5EDD8]">
      Good morning, Amaka 👋
     </h1>
     <p className="mt-1 text-sm text-[#F5EDD8]/55">
      Sunshine Crèche, Lekki · 7 items need your attention today
     </p>
    </div>
    <div className="relative z-10 flex shrink-0 gap-2.5">
     <button
      onClick={() => router.push("/admin/v3/analytics")}
      className="flex items-center gap-1.5 rounded-xl border border-[#F5EDD8]/15 px-3.5 py-2 text-xs font-bold text-[#F5EDD8]/60 transition-colors hover:border-[#F5EDD8]/30 hover:text-[#F5EDD8]"
     >
      <FileBarChart className="h-3.5 w-3.5" /> Reports
     </button>
     <button
      onClick={() => router.push("/admin/v3/ai-command-center")}
      className="flex items-center gap-1.5 rounded-xl bg-[#C47B2C] px-3.5 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90"
     >
      <Sparkles className="h-3.5 w-3.5" /> AI Summary
     </button>
    </div>
   </div>

   {/* AI Daily Brief */}
   <div className="rounded-2xl border border-black/[0.07] bg-white p-5">
    <div className="mb-3 flex items-center justify-between">
     <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#1E2D4A] to-[#2D1810] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#F5EDD8]">
      <Sparkles className="h-3 w-3 text-[#C47B2C]" /> Daily Brief
     </span>
     <button
      onClick={() => router.push("/admin/v3/ai-command-center")}
      className="flex items-center gap-1 text-xs font-bold text-[#3B2513] hover:opacity-70"
     >
      Open AI Center <ArrowUpRight className="h-3.5 w-3.5" />
     </button>
    </div>
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
     {AI_INSIGHTS.map((insight) => (
      <div key={insight.bold} className="relative rounded-xl bg-[#FAF2E1] p-3 pl-7">
       <span className="absolute left-3 top-4 h-2 w-2 rounded-sm" style={{ background: insight.color }} />
       <p className="text-xs leading-5 text-[#2D1810]">
        <span className="font-bold">{insight.bold}</span> <span className="text-[#2D1810]/50">{insight.text}</span>
       </p>
       <button className="mt-2 text-xs font-semibold text-[#BA733E] hover:opacity-70">
        {insight.action} →
       </button>
      </div>
     ))}
    </div>
   </div>

   {/* Stats */}
   <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
    {allStats.map((stat, i) => (
     <StatCard key={stat.label} Icon={STAT_ICONS[i % STAT_ICONS.length]} {...stat} />
    ))}
   </div>

   {/* Quick Actions */}
   <div className="rounded-2xl border border-black/[0.07] bg-white p-5">
    <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[#2D1810]/50">Quick Actions</p>
    <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-5">
     {QUICK_ACTIONS.map(({ id, icon: Icon, label }) => (
      <button
       key={id}
       onClick={() => handleQuickAction(id)}
       className="flex flex-col items-center gap-1.5 rounded-xl bg-[#F5EDD8] px-2 py-3.5 text-center transition-colors hover:bg-[#C47B2C] hover:text-white"
      >
       <Icon className="h-[18px] w-[18px]" />
       <span className="text-[11px] font-semibold leading-tight">{label}</span>
      </button>
     ))}
    </div>
   </div>

   <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
    {/* Room Occupancy */}
    <div className="rounded-2xl border border-black/[0.07] bg-white p-5">
     <div className="mb-3 flex items-center justify-between">
      <p className="text-sm font-bold text-[#2D1810]">Room Occupancy</p>
      <button onClick={() => router.push("/admin/v3/rooms")} className="text-xs font-bold text-[#3B2513] hover:opacity-70">
       View all →
      </button>
     </div>
     <div className="flex flex-col gap-3">
      {ROOM_OCCUPANCY.map((room) => (
       <div key={room.room} className="flex items-center gap-3">
        <p className="w-32 shrink-0 text-[13px] font-semibold text-[#2D1810]">
         {room.room} <span className="font-normal text-[#2D1810]/50">({room.age})</span>
        </p>
        <span className="w-10 shrink-0 font-mono text-xs text-[#2D1810]/60">
         {room.present}/{room.enrolled}
        </span>
        <div className="h-1.5 flex-1 rounded-full bg-black/[0.06]">
         <div className={`h-full rounded-full ${room.color}`} style={{ width: `${room.pct}%` }} />
        </div>
       </div>
      ))}
     </div>
    </div>

    {/* Live Activity */}
    <div className="rounded-2xl border border-black/[0.07] bg-white p-5">
     <div className="mb-1 flex items-center justify-between">
      <p className="text-sm font-bold text-[#2D1810]">Live Activity</p>
      <button onClick={() => router.push("/admin/v3/audit-trail")} className="text-xs font-bold text-[#3B2513] hover:opacity-70">
       View all →
      </button>
     </div>
     <div className="flex flex-col">
      {ACTIVITY_FEED.map((item, i) => (
       <div key={i} className="flex items-start gap-3 py-2.5">
        <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${item.color}`} />
        <div className="min-w-0 flex-1">
         <p className="text-[13px] font-medium text-[#2D1810]">
          {item.text} <span className="font-normal text-[#2D1810]/50">{item.meta}</span>
         </p>
        </div>
        <span className="shrink-0 font-mono text-[10px] text-[#2D1810]/40">{item.time}</span>
       </div>
      ))}
     </div>
    </div>
   </div>

   {/* Outstanding Payments */}
   <div className="rounded-2xl border border-black/[0.07] bg-white p-5">
    <div className="mb-3 flex items-center justify-between">
     <p className="text-sm font-bold text-[#2D1810]">Outstanding Payments</p>
     <button onClick={() => router.push("/admin/v3/billing")} className="text-xs font-bold text-[#3B2513] hover:opacity-70">
      View all →
     </button>
    </div>
    <div className="overflow-x-auto">
     <table className="w-full border-collapse text-sm">
      <thead>
       <tr className="text-left text-xs uppercase tracking-wide text-[#2D1810]/50">
        <th className="pb-2 pr-3 font-semibold">Child</th>
        <th className="pb-2 pr-3 font-semibold">Parent</th>
        <th className="pb-2 pr-3 font-semibold">Amount</th>
        <th className="pb-2 pr-3 font-semibold">Due</th>
        <th className="pb-2 pr-3 font-semibold">Risk</th>
        <th className="pb-2 font-semibold" />
       </tr>
      </thead>
      <tbody>
       {OUTSTANDING_PAYMENTS.map((row) => (
        <tr key={row.child} className={row.child.length % 2 === 0 ? "bg-white/60" : "bg-transparent"}>
         <td className="py-2.5 pr-3 font-semibold text-[#2D1810]">{row.child}</td>
         <td className="py-2.5 pr-3 text-[#2D1810]/70">{row.parent}</td>
         <td className="py-2.5 pr-3 font-mono text-[#2D1810]">{row.amount}</td>
         <td className="py-2.5 pr-3 text-[#2D1810]/70">{row.due}</td>
         <td className="py-2.5 pr-3">
          <AiRiskBadge level={calculateRisk(row.overdueDays)} overdueDays={row.overdueDays} />
         </td>
         <td className="py-2.5 text-right">
          <button className="text-xs font-semibold text-[#2D1810] underline hover:opacity-70">Remind</button>
         </td>
        </tr>
       ))}
      </tbody>
     </table>
    </div>
   </div>

   {enrollOpen && <EnrollChildModal onClose={() => setEnrollOpen(false)} />}
   {incidentOpen && <RaiseIncidentModal onClose={() => setIncidentOpen(false)} />}
   {logMode && <LogActivityModal mode={logMode} onClose={() => setLogMode(null)} />}
   <NewInvoiceModal open={invoiceOpen} onOpenChange={setInvoiceOpen} />
  </div>
 );
}
