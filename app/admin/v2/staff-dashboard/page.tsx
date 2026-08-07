"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
 ArrowUpRight,
 BarChart3,
 Bell,
 CreditCard,
 FileText,
 LogOut,
 Receipt,
 TrendingUp,
 Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const STAFF_SESSION_KEY = "ceven_staff_session";

type StaffSession = {
 email: string;
 name: string;
 role: string;
 code: string;
};

const financeStats = [
 { label: "Total Revenue", value: "₦4,280,000", sub: "+12.5% vs last month", trendUp: true, icon: Wallet },
 { label: "Outstanding Fees", value: "₦850,000", sub: "23 invoices pending", trendUp: false, icon: Receipt },
 { label: "Monthly Payroll", value: "₦1,950,000", sub: "Paid on 30 Oct", trendUp: true, icon: CreditCard },
 { label: "Expenses", value: "₦620,000", sub: "Below budget", trendUp: true, icon: FileText },
];

const recentTransactions = [
 { id: "tx-1", title: "Monthly fee — King Andrew", amount: "₦85,000", date: "Today", status: "Paid" },
 { id: "tx-2", title: "Monthly fee — Chidera Nwosu", amount: "₦80,000", date: "Yesterday", status: "Paid" },
 { id: "tx-3", title: "Payroll — Caregivers", amount: "₦1,200,000", date: "30 Oct", status: "Paid" },
 { id: "tx-4", title: "Food supplies — Vendor A", amount: "₦185,000", date: "28 Oct", status: "Pending" },
];

const overdueInvoices = [
 { id: "inv-1", child: "Emeka Obi", parent: "Mr. Obi", amount: "₦40,000", due: "5 days overdue" },
 { id: "inv-2", child: "Aisha Bello", parent: "Mrs. Bello", amount: "₦40,000", due: "2 days overdue" },
 { id: "inv-3", child: "Tunde Adeyemi", parent: "Mrs. Adeyemi", amount: "₦40,000", due: "Due today" },
];

export default function StaffDashboardPage() {
 const router = useRouter();
 const [session, setSession] = useState<StaffSession | null>(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  if (typeof window === "undefined") return;
  const raw = localStorage.getItem(STAFF_SESSION_KEY);
   if (!raw) {
   router.push("/login");
   return;
  }
  try {
   const parsed = JSON.parse(raw) as StaffSession;
   setSession(parsed);
  } catch {
   router.push("/login");
  } finally {
   setLoading(false);
  }
 }, [router]);

 function handleLogout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STAFF_SESSION_KEY);
  router.push("/login");
 }

 if (loading) {
  return (
   <div className="flex min-h-screen items-center justify-center bg-[#faf9f7]">
    <p className="font-[family-name:var(--font-urbanist)] text-sm text-[#6b7280]">Loading...</p>
   </div>
  );
 }

 if (!session) return null;

 const roleLabel = session.role;

 return (
  <div className="min-h-screen bg-[#faf9f7]">
   {/* Topbar */}
   <header className="flex h-16 items-center justify-between border-b border-[#e6ebf3] bg-white px-4 lg:px-6">
    <div className="flex items-center gap-3">
     <img src="/Logo/icon.svg" alt="CEven" className="h-8 w-8" />
     <div className="flex flex-col">
      <span className="font-[family-name:var(--font-mogra)] text-xl text-[#3b2513]">CEven</span>
      <span className="font-[family-name:var(--font-urbanist)] text-[10px] text-[#9a6033]">Staff Dashboard</span>
     </div>
    </div>
    <div className="flex items-center gap-3">
     <button
      type="button"
      aria-label="Notifications"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e6ebf3] bg-white text-[#2d1810]"
     >
      <Bell className="size-5" />
     </button>
     <div className="hidden flex-col items-end sm:flex">
      <span className="font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#2d1810]">
       {session.name}
      </span>
      <span className="font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">{session.email}</span>
     </div>
     <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#edd9c0] font-[family-name:var(--font-urbanist)] text-xs font-bold text-[#3b2513]">
      {session.name
       .split(" ")
       .filter((n) => !n.startsWith("Mr") && !n.startsWith("Mrs") && !n.startsWith("Ms"))
       .map((n) => n[0])
       .join("")
       .slice(0, 2)}
     </div>
     <button
      type="button"
      onClick={handleLogout}
      className="flex h-10 items-center gap-1.5 rounded-lg border border-[#d0d5dd] px-3 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810] hover:bg-[#f9fafb]"
     >
      <LogOut className="size-4" />
      <span className="hidden sm:inline">Sign out</span>
     </button>
    </div>
   </header>

   <main className="p-4 lg:p-6">
    {/* Greeting */}
    <div className="mb-6 rounded-2xl bg-gradient-to-br from-[#2d1810] via-[#3d2418] to-[#3d2418] p-6 text-white">
     <p className="font-[family-name:var(--font-urbanist)] text-xs text-[#ffd58f]">
      {new Date().toLocaleDateString("en-NG", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
     </p>
     <h1 className="mt-2 font-[family-name:var(--font-merriweather)] text-xl font-bold text-[#f5edd8] sm:text-2xl">
      Welcome back, {session.name} 👋
     </h1>
     <p className="mt-1 font-[family-name:var(--font-urbanist)] text-sm text-[#f5edd8]/70">
      You are viewing the dashboard as <strong>{roleLabel}</strong>.
     </p>
    </div>

    {/* Stats */}
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
     {financeStats.map((stat) => {
      const Icon = stat.icon;
      return (
       <div
        key={stat.label}
        className="rounded-xl border border-black/[0.07] bg-white p-4"
       >
        <div className="flex items-center justify-between">
         <p className="font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">{stat.label}</p>
         <Icon className="size-5 text-[#3b2513]/20" />
        </div>
        <p className="mt-2 font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">
         {stat.value}
        </p>
        <p className={`mt-1 flex items-center gap-1 font-[family-name:var(--font-urbanist)] text-xs ${stat.trendUp ? "text-[#009061]" : "text-[#ef4444]"}`}>
         {stat.trendUp ? <TrendingUp className="size-3" /> : <TrendingUp className="size-3 rotate-180" />}
         {stat.sub}
        </p>
       </div>
      );
     })}
    </div>

    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
     {/* Recent transactions */}
     <div className="rounded-xl border border-black/[0.07] bg-white p-5 lg:col-span-2">
      <div className="mb-4 flex items-center justify-between">
       <h2 className="font-[family-name:var(--font-merriweather)] text-base font-bold text-[#2d1810]">
        Recent Transactions
       </h2>
       <Button
        variant="outline"
        className="h-8 border-[#d0d5dd] font-[family-name:var(--font-urbanist)] text-xs text-[#3b2513]"
       >
        View all
        <ArrowUpRight className="ml-1 size-3" />
       </Button>
      </div>
      <div className="flex flex-col gap-3">
       {recentTransactions.map((tx) => (
        <div
         key={tx.id}
         className="flex items-center justify-between rounded-lg border border-[#e6ebf3] p-3"
        >
         <div>
          <p className="font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#2d1810]">
           {tx.title}
          </p>
          <p className="font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">{tx.date}</p>
         </div>
         <div className="text-right">
          <p className="font-[family-name:var(--font-urbanist)] text-sm font-bold text-[#2d1810]">
           {tx.amount}
          </p>
          <span
           className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${
            tx.status === "Paid"
             ? "bg-[#ecfff8] text-[#009061]"
             : "bg-[#fff6e6] text-[#cc8000]"
           }`}
          >
           {tx.status}
          </span>
         </div>
        </div>
       ))}
      </div>
     </div>

     {/* Overdue invoices */}
     <div className="rounded-xl border border-black/[0.07] bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
       <h2 className="font-[family-name:var(--font-merriweather)] text-base font-bold text-[#2d1810]">
        Overdue Invoices
       </h2>
       <BarChart3 className="size-5 text-[#3b2513]/40" />
      </div>
      <div className="flex flex-col gap-3">
       {overdueInvoices.map((inv) => (
        <div key={inv.id} className="flex flex-col gap-1 rounded-lg border border-[#e6ebf3] p-3">
         <div className="flex items-center justify-between">
          <p className="font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#2d1810]">
           {inv.child}
          </p>
          <p className="font-[family-name:var(--font-urbanist)] text-sm font-bold text-[#2d1810]">
           {inv.amount}
          </p>
         </div>
         <p className="font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">{inv.parent}</p>
         <p className="font-[family-name:var(--font-urbanist)] text-xs font-medium text-[#ef4444]">
          {inv.due}
         </p>
        </div>
       ))}
      </div>
      <Button className="mt-4 h-10 w-full bg-[#3b2513] font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1] hover:bg-[#3b2513]/90">
       Send Reminders
      </Button>
     </div>
    </div>
   </main>
  </div>
 );
}
