"use client";

import { useState } from "react";
import { Send, X, RefreshCw, FileDown } from "lucide-react";
import { CEIcon } from "@/components/admin-v3/ce-icon";
import { PageHeader } from "@/components/ui/page-header";
import { toast } from "sonner";
import { getAdaReply } from "@/lib/ada-responses";

// ── Static data ──────────────────────────────────────────────────────────────
// Adapted from the page-local consts in app/admin/v2/intelligence/page.tsx and
// app/admin/v2/dashboard/page.tsx (those arrays aren't exported, so the values
// are reproduced here rather than imported) and restyled to the v3 insight-card
// shape used by app/admin/v3/dashboard/page.tsx's AI Daily Brief.

type Insight = { color: string; name: string; text: string; action: string; confidence: number; source: string };

const HEALTH_WELFARE_INSIGHTS: Insight[] = [
 {
 color: "#D4522F",
 name: "Zara Mohammed",
 text: "has been absent 3× this week. Nut allergy on file. Flag for welfare check.",
 action: "Take Action",
 confidence: 94,
 source: "attendance + health flag + comms gap",
 },
 {
 color: "#C47B2C",
 name: "Leo Adeyemi",
 text: "Peanut exposure suspected in Lion Class this morning. Under observation.",
 action: "View Incident",
 confidence: 88,
 source: "incident log + allergy record match",
 },
 {
 color: "#1E2D4A",
 name: "2 children",
 text: "have outdated vaccination records flagged by this week's compliance check.",
 action: "Review Records",
 confidence: 100,
 source: "compliance record scan",
 },
];

const FINANCE_INSIGHTS: Insight[] = [
 {
 color: "#C47B2C",
 name: "3 invoices",
 text: "are 7+ days overdue, totalling ₦190,000. Mr Okafor historically pays late in Q2.",
 action: "Send Reminders",
 confidence: 87,
 source: "18-month payment pattern analysis",
 },
 {
 color: "#D4522F",
 name: "Bello Family",
 text: "has the largest outstanding balance, ₦110,000, now 14 days overdue.",
 action: "View Account",
 confidence: 96,
 source: "invoice aging report",
 },
 {
 color: "#2A8A52",
 name: "Collection rate",
 text: "improved to 92% this month, up 4 points on May's close.",
 action: "View Analytics",
 confidence: 91,
 source: "revenue forecast model",
 },
];

const STAFF_COMPLIANCE = [
 { name: "Mrs. Sarah", role: "Caregiver", pct: 92, color: "#2A8A52" },
 { name: "Mr. James", role: "Marketer", pct: 12, color: "#D4522F" },
 { name: "Mrs. Ngozi", role: "Caregiver", pct: 87, color: "#2A8A52" },
 { name: "Mrs. Anita", role: "Admin", pct: 52, color: "#D4522F" },
];

const OUTSTANDING_PAYMENTS = [
 { family: "Okafor Family", amount: "₦40,000", days: "7 days overdue" },
 { family: "Bello Family", amount: "₦110,000", days: "14 days overdue" },
 { family: "Eze Family", amount: "₦40,000", days: "3 days overdue" },
];

const QUICK_TEMPLATES = ["Incident Report", "Parent Notice", "Compliance Reminder"];

const CHAT_MESSAGES = [
 {
 role: "ai" as const,
 text: "Good morning! I've analyzed overnight data. Here's your brief:\n\n1. Welfare: Zara M. absent 3× this week\n2. Finance: 3 invoices overdue (₦190,000 total)\n3. Compliance: Mrs. Anita at 52% log rate",
 },
 { role: "user" as const, text: "Yes, give me the full brief" },
 {
 role: "ai" as const,
 text: "Sure! Here's the full summary:\n\n**Health & Welfare:** Zara M. (Lion Class) has been absent 3 consecutive days. Leo A. has an outdated allergy record. Recommend follow-up before noon.\n\n**Finance:** Okafor, Bello, and Eze families have overdue balances. Auto-reminder scheduled for 2pm.\n\n**Staff Compliance:** Mrs. Anita's log rate has dropped to 52%, below the 72% threshold.",
 },
];

const QUICK_PROMPTS = ["Who hasn't paid?", "At-risk children?", "Draft announcement"];

function getInitials(name: string) {
 return name
 .split(" ")
 .filter(Boolean)
 .map((w) => w[0])
 .slice(0, 2)
 .join("");
}

// ── Sub-components ───────────────────────────────────────────────────────────

function SectionBadge({ children }: { children: React.ReactNode }) {
 return (
 <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#1E2D4A] to-[#2D1810] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#F5EDD8]">
    <CEIcon className="h-3 w-3 text-[#C47B2C]" /> {children}
 </span>
 );
}

function InsightCard({ title, items }: { title: string; items: Insight[] }) {
 return (
 <div className="rounded-2xl border border-black/[0.07] bg-white p-5">
  <SectionBadge>{title}</SectionBadge>
  <div className="mt-4 flex flex-col gap-3">
  {items.map((insight) => (
   <div key={insight.name} className="relative rounded-xl bg-[#FAF2E1] p-3 pl-7">
   <span className="absolute left-3 top-4 h-2 w-2 rounded-sm" style={{ background: insight.color }} />
   <p className="text-xs leading-5 text-[#2D1810]">
    <span className="font-bold">{insight.name}</span> <span className="text-[#2D1810]/50">{insight.text}</span>
   </p>
   <p className="mt-1.5 text-[10px] text-[#2D1810]/35">
    Confidence: {insight.confidence}% · {insight.source}
   </p>
   <button className="mt-2 text-xs font-semibold text-[#BA733E] hover:opacity-70">{insight.action} →</button>
   </div>
  ))}
  </div>
 </div>
 );
}

function AIChatPanel({ onClose }: { onClose?: () => void }) {
 const [inputValue, setInputValue] = useState("");
 const [messages, setMessages] = useState(CHAT_MESSAGES);
 const [isTyping, setIsTyping] = useState(false);

 function send(text: string) {
 const trimmed = text.trim();
 if (!trimmed) return;
 setMessages((prev) => [...prev, { role: "user" as const, text: trimmed }]);
 setInputValue("");
 setIsTyping(true);
 setTimeout(() => {
  setMessages((prev) => [...prev, { role: "ai" as const, text: getAdaReply(trimmed) }]);
  setIsTyping(false);
 }, 700);
 }

 return (
 <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white">
  {/* Header */}
  <div className="flex shrink-0 items-center justify-between px-4 py-4">
  <div className="flex items-center gap-3">
   <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#1E2D4A] to-[#2D1810]">
       <CEIcon className="h-5 w-5 text-[#F5EDD8]" variant="stroke" />
   </div>
   <div>
   <p className="text-sm font-bold text-[#2D1810]">Ada</p>
   <p className="text-xs text-[#2A8A52]">• Online</p>
   </div>
  </div>
  {onClose && (
   <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-md text-[#2D1810]/50 hover:bg-[#F5EDD8]">
   <X className="h-4 w-4" />
   </button>
  )}
  </div>

  {/* Messages */}
  <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
  {messages.map((msg, i) => (
   <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
   {msg.role === "ai" && (
    <div className="mr-2 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1E2D4A] to-[#2D1810]">
          <CEIcon className="h-3.5 w-3.5 text-[#F5EDD8]" variant="thick" />
    </div>
   )}
   <div
    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
    msg.role === "ai" ? "rounded-tl-sm bg-[#FAF2E1] text-[#2D1810]" : "rounded-tr-sm bg-[#C47B2C] text-white"
    }`}
    style={{ whiteSpace: "pre-line" }}
   >
    {msg.text}
   </div>
   </div>
  ))}
  {isTyping && (
   <div className="flex justify-start">
   <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-[#FAF2E1] px-3.5 py-3">
    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#C47B2C]" style={{ animationDelay: "0ms" }} />
    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#C47B2C]" style={{ animationDelay: "150ms" }} />
    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#C47B2C]" style={{ animationDelay: "300ms" }} />
   </div>
   </div>
  )}
  </div>

  {/* Quick prompts */}
  <div className="flex shrink-0 flex-wrap gap-2 px-4 py-3">
  {QUICK_PROMPTS.map((prompt) => (
   <button
   key={prompt}
   onClick={() => send(prompt)}
   className="rounded-full border border-black/[0.07] bg-white px-3 py-1 text-[10px] text-[#2D1810]/60 hover:border-[#C47B2C] hover:text-[#C47B2C]"
   >
   {prompt}
   </button>
  ))}
  </div>

  {/* Input */}
  <div className="flex shrink-0 items-center gap-2 px-4 py-3">
  <input
   type="text"
   value={inputValue}
   onChange={(e) => setInputValue(e.target.value)}
   onKeyDown={(e) => e.key === "Enter" && send(inputValue)}
   placeholder="Type a message…"
   className="flex-1 rounded-full border border-black/[0.07] bg-white px-4 py-2 text-xs text-[#2D1810] placeholder:text-[#2D1810]/40 focus:border-[#C47B2C] focus:outline-none"
  />
  <button
   onClick={() => send(inputValue)}
   className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2D1810] text-[#F5EDD8] hover:opacity-90"
  >
   <Send className="h-3.5 w-3.5" />
  </button>
  </div>
 </div>
 );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AICommandCenterV3Page() {
 const [chatOpen, setChatOpen] = useState(false);

 return (
 <div className="flex flex-col gap-5">
  <PageHeader
   title="Command Center"
   description="System analysis across health, finance, and staff. Refreshed every morning at 7am."
   action={
    <>
     <button
     onClick={() => toast.success("Exporting report as PDF...")}
     className="flex items-center gap-1.5 rounded-lg border border-black/[0.12] bg-white px-4 py-2 text-xs font-bold text-[#2D1810] hover:border-[#C47B2C]"
     >
     <FileDown className="h-3.5 w-3.5" /> Export Report
     </button>
     <button className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#1E2D4A] to-[#2D1810] px-4 py-2 text-xs font-bold text-[#F5EDD8] hover:opacity-90">
     <RefreshCw className="h-3.5 w-3.5" /> Refresh Analysis
     </button>
    </>
   }
  />

  <div className="flex flex-col gap-5 xl:flex-row xl:items-start">
  {/* Main content */}
  <div className="flex min-w-0 flex-1 flex-col gap-5">
   <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
   <InsightCard title="Health & Welfare Intelligence" items={HEALTH_WELFARE_INSIGHTS} />
   <InsightCard title="Finance Intelligence" items={FINANCE_INSIGHTS} />
   </div>

   {/* Staff & Finance Intelligence */}
   <div className="rounded-2xl border border-black/[0.07] bg-white p-5">
   <div className="mb-4">
    <SectionBadge>Staff &amp; Finance Intelligence</SectionBadge>
   </div>
   <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    {/* Staff Compliance */}
    <div className="rounded-xl bg-[#F5EDD8]/50 p-4">
    <p className="mb-3 text-sm font-bold text-[#2D1810]">Staff Compliance</p>
    <div className="flex flex-col gap-3">
     {STAFF_COMPLIANCE.map((staff) => (
     <div key={staff.name}>
      <div className="mb-1 flex items-center justify-between">
      <div className="flex items-center gap-2">
       <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F5EDD8] text-xs font-bold text-[#2D1810]">
       {getInitials(staff.name)}
       </div>
       <div>
       <p className="text-xs font-semibold text-[#2D1810]">{staff.name}</p>
       <p className="text-[10px] text-[#2D1810]/50">{staff.role}</p>
       </div>
      </div>
      <span className="text-xs font-bold" style={{ color: staff.color }}>
       {staff.pct}%
      </span>
      </div>
      <div className="h-1.5 rounded-full bg-black/[0.06]">
      <div className="h-full rounded-full" style={{ width: `${staff.pct}%`, background: staff.color }} />
      </div>
     </div>
     ))}
    </div>
    </div>

    {/* Outstanding Payments */}
    <div className="rounded-xl bg-[#F5EDD8]/50 p-4">
    <p className="mb-3 text-sm font-bold text-[#2D1810]">Outstanding Payments</p>
    <div className="flex flex-col gap-3">
     {OUTSTANDING_PAYMENTS.map((p) => (
     <div key={p.family} className="flex items-center justify-between">
      <div>
      <p className="text-xs font-bold text-[#2D1810]">{p.family}</p>
      <p className="text-[10px] text-[#D4522F]">{p.days}</p>
      </div>
      <span className="font-mono text-xs font-bold text-[#2D1810]">{p.amount}</span>
     </div>
     ))}
    </div>
    </div>

    {/* Quick Templates */}
    <div className="rounded-xl bg-[#F5EDD8]/50 p-4">
    <p className="mb-3 text-sm font-bold text-[#2D1810]">Quick Templates</p>
    <div className="flex flex-col gap-2">
     {QUICK_TEMPLATES.map((label) => (
     <button
      key={label}
      className="rounded-lg bg-[#FAF2E1] p-3 text-left hover:bg-[#C47B2C]/10"
     >
      <p className="text-xs font-medium text-[#2D1810]">{label}</p>
      <p className="text-[10px] text-[#C47B2C]">Use template</p>
     </button>
     ))}
    </div>
    </div>
   </div>
   </div>
  </div>

  {/* Persistent AI chat panel, desktop */}
  <div className="hidden xl:block xl:h-[calc(100vh-11rem)] xl:w-[360px] xl:shrink-0 xl:sticky xl:top-6">
   <AIChatPanel />
  </div>
  </div>

  {/* Mobile chat FAB */}
  <button
  onClick={() => setChatOpen(true)}
  aria-label="Open chat"
  className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#1E2D4A] to-[#2D1810] text-[#F5EDD8] xl:hidden"
  >
      <CEIcon className="h-6 w-6" variant="thick" />
  </button>

  {/* Mobile chat overlay */}
  {chatOpen && (
  <div className="fixed inset-0 z-50 flex flex-col bg-[#F5EDD8] p-3 xl:hidden">
   <AIChatPanel onClose={() => setChatOpen(false)} />
  </div>
  )}
 </div>
 );
}
