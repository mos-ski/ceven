"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
 Search,
 Baby,
 Users,
 UserCog,
 Wallet,
 Receipt,
 AlertTriangle,
 Pill,
 Package,
 ClipboardList,
 MessageSquare,
 FileText,
 GraduationCap,
 Building2,
 ListTodo,
 X,
 ArrowRight,
 Hash,
} from "lucide-react";

import { CHILDREN, PARENTS, ENQUIRIES } from "@/lib/mock-data/children";
import { STAFF, LEAVE_REQUESTS } from "@/lib/mock-data/staff";
import { INVOICE_TRACKING, EXPENSES } from "@/lib/mock-data/finance";
import { INCIDENTS, MEDICATIONS, INVENTORY_ITEMS, STAFF_TASKS, FACILITY_ISSUES } from "@/lib/mock-data/daily-operations";
import { ANNOUNCEMENT_LOG, CALENDAR_EVENTS } from "@/lib/mock-data/communication";
import { AUDIT_LOG, GENERATED_REPORTS } from "@/lib/mock-data/intelligence";
import { NAV_SECTIONS } from "@/components/admin-v3/nav-items";

type SearchResult = {
 id: string;
 title: string;
 subtitle: string;
 category: string;
 icon: typeof Baby;
 href: string;
 color: string;
};

function buildIndex(): SearchResult[] {
 const results: SearchResult[] = [];

 for (const c of CHILDREN) {
  results.push({
   id: `child-${c.name}`,
   title: c.name,
   subtitle: `${c.room} · ${c.parentName} · ${c.status}`,
   category: "Children",
   icon: Baby,
   href: "/admin/v3/children",
   color: "#C47B2C",
  });
 }

 for (const e of ENQUIRIES) {
  results.push({
   id: `enquiry-${e.childName}`,
   title: e.childName,
   subtitle: `${e.parentName} · ${e.stage} · ${e.preferredRoom}`,
   category: "Enquiries",
   icon: ClipboardList,
   href: "/admin/v3/enrolment",
   color: "#1E2D4A",
  });
 }

 for (const p of PARENTS) {
  results.push({
   id: `parent-${p.name}`,
   title: p.name,
   subtitle: `${p.email} · ${p.childName} · ${p.feeStatus}`,
   category: "Parents",
   icon: Users,
   href: "/admin/v3/parents",
   color: "#2A8A52",
  });
 }

 for (const s of STAFF) {
  results.push({
   id: `staff-${s.name}`,
   title: s.name,
   subtitle: `${s.role} · ${s.email} · ${s.status}`,
   category: "Staff",
   icon: UserCog,
   href: "/admin/v3/staff",
   color: "#6B4C9A",
  });
 }

 for (const lr of LEAVE_REQUESTS) {
  results.push({
   id: `leave-${lr.name}-${lr.leaveType}`,
   title: `${lr.name}, ${lr.leaveType}`,
   subtitle: `${lr.reason} · ${lr.status}`,
   category: "Leave",
   icon: Wallet,
   href: "/admin/v3/leave",
   color: "#D4913F",
  });
 }

 for (const inv of INVOICE_TRACKING) {
  results.push({
   id: `invoice-${inv.id}`,
   title: `${inv.child}, ${inv.duePayment}`,
   subtitle: `${inv.parentName} · ${inv.roomPlan} · ${inv.status}`,
   category: "Invoices",
   icon: Receipt,
   href: "/admin/v3/billing",
   color: "#D4522F",
  });
 }

 for (const ex of EXPENSES) {
  results.push({
   id: `expense-${ex.vendor}`,
   title: ex.vendor,
   subtitle: `${ex.category} · ${ex.description} · ${ex.status}`,
   category: "Expenses",
   icon: Receipt,
   href: "/admin/v3/expenses",
   color: "#D4522F",
  });
 }

 for (const inc of INCIDENTS) {
  results.push({
   id: `incident-${inc.child}-${inc.type}`,
   title: `${inc.child}, ${inc.type}`,
   subtitle: `${inc.room} · ${inc.severity} · ${inc.status}`,
   category: "Incidents",
   icon: AlertTriangle,
   href: "/admin/v3/health",
   color: "#D4522F",
  });
 }

 for (const med of MEDICATIONS) {
  results.push({
   id: `med-${med.child}-${med.medication}`,
   title: `${med.child}, ${med.medication}`,
   subtitle: `${med.room} · ${med.status}`,
   category: "Medication",
   icon: Pill,
   href: "/admin/v3/medication",
   color: "#2A8A52",
  });
 }

 for (const item of INVENTORY_ITEMS) {
  results.push({
   id: `inventory-${item.name}`,
   title: item.name,
   subtitle: `${item.category} · ${item.status}`,
   category: "Inventory",
   icon: Package,
   href: "/admin/v3/inventory",
   color: "#1E2D4A",
  });
 }

 for (const task of STAFF_TASKS) {
  results.push({
   id: `task-${task.title}`,
   title: task.title,
   subtitle: `${task.assignedTo} · ${task.room} · ${task.status}`,
   category: "Tasks",
   icon: ListTodo,
   href: "/admin/v3/tasks",
   color: "#C47B2C",
  });
 }

 for (const issue of FACILITY_ISSUES) {
  results.push({
   id: `facility-${issue.area}`,
   title: issue.area,
   subtitle: `${issue.description} · ${issue.assignedTo} · ${issue.status}`,
   category: "Facilities",
   icon: Building2,
   href: "/admin/v3/facilities",
   color: "#6B4C9A",
  });
 }

 for (const ann of ANNOUNCEMENT_LOG) {
  results.push({
   id: `announcement-${ann.title}`,
   title: ann.title,
   subtitle: ann.excerpt,
   category: "Announcements",
   icon: MessageSquare,
   href: "/admin/v3/announcements",
   color: "#1E2D4A",
  });
 }

 for (const evt of CALENDAR_EVENTS) {
  results.push({
   id: `event-${evt.title}`,
   title: evt.title,
   subtitle: `${evt.time} · ${evt.status}`,
   category: "Events",
   icon: FileText,
   href: "/admin/v3/events",
   color: "#2A8A52",
  });
 }

 for (const log of AUDIT_LOG) {
  results.push({
   id: `audit-${log.id}`,
   title: `${log.actorName}, ${log.action}`,
   subtitle: log.detail,
   category: "Audit Trail",
   icon: Hash,
   href: "/admin/v3/audit-trail",
   color: "#6B7280",
  });
 }

 for (const report of GENERATED_REPORTS) {
  results.push({
   id: `report-${report.title}`,
   title: report.title,
   subtitle: `${report.type} · ${report.generatedBy} · ${report.status}`,
   category: "Reports",
   icon: FileText,
   href: "/admin/v3/reports",
   color: "#1E2D4A",
  });
 }

 return results;
}

function flattenNavItems() {
 const items: { label: string; href: string; icon: typeof Baby; section: string }[] = [];
 for (const section of NAV_SECTIONS) {
  for (const item of section.items) {
   items.push({ label: item.label, href: item.href, icon: item.icon, section: section.label });
  }
 }
 return items;
}

const NAV_ITEMS = flattenNavItems();

export function GlobalSearchModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
 const router = useRouter();
 const inputRef = useRef<HTMLInputElement>(null);
 const listRef = useRef<HTMLDivElement>(null);
 const [query, setQuery] = useState("");
 const [activeIndex, setActiveIndex] = useState(0);
 const index = useMemo(() => buildIndex(), []);

 useEffect(() => {
  if (open) {
   setQuery("");
   setActiveIndex(0);
   setTimeout(() => inputRef.current?.focus(), 50);
  }
 }, [open]);

 const filtered = useMemo(() => {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const matches = index.filter(
   (r) =>
    r.title.toLowerCase().includes(q) ||
    r.subtitle.toLowerCase().includes(q) ||
    r.category.toLowerCase().includes(q)
  );
  return matches.slice(0, 20);
 }, [query, index]);

 const navMatches = useMemo(() => {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return NAV_ITEMS.filter((n) => n.label.toLowerCase().includes(q)).slice(0, 5);
 }, [query]);

 const showQuickNav = query.trim().length > 0 && filtered.length === 0;
 const combined: SearchResult[] = showQuickNav
  ? navMatches.map((n) => ({
    id: `nav-${n.href}`,
    title: n.label,
    subtitle: n.section,
    category: "Pages",
    icon: n.icon,
    href: n.href,
    color: "#C47B2C",
   }))
  : filtered;

 useEffect(() => {
  setActiveIndex(0);
 }, [query]);

 useEffect(() => {
  if (!open) return;
  function handleKeyDown(e: KeyboardEvent) {
   if (e.key === "Escape") {
    onOpenChange(false);
   } else if (e.key === "ArrowDown") {
    e.preventDefault();
    setActiveIndex((i) => Math.min(i + 1, combined.length - 1));
   } else if (e.key === "ArrowUp") {
    e.preventDefault();
    setActiveIndex((i) => Math.max(i - 1, 0));
   } else if (e.key === "Enter" && combined[activeIndex]) {
    e.preventDefault();
    router.push(combined[activeIndex].href);
    onOpenChange(false);
   }
  }
  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
 }, [open, combined, activeIndex, router, onOpenChange]);

 useEffect(() => {
  const el = listRef.current?.children[activeIndex] as HTMLElement | undefined;
  el?.scrollIntoView({ block: "nearest" });
 }, [activeIndex]);

 const grouped = useMemo(() => {
  const map = new Map<string, typeof combined>();
  for (const item of combined) {
   const cat = showQuickNav ? "Pages" : item.category;
   if (!map.has(cat)) map.set(cat, []);
   map.get(cat)!.push(item);
  }
  return map;
 }, [combined, showQuickNav]);

 return (
  <>
   {open && <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => onOpenChange(false)} />}

   <div
    className={`fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-[10vh] transition-all duration-200 ${
     open ? "opacity-100" : "pointer-events-none opacity-0"
    }`}
   >
    <div
     className="w-full max-w-[580px] overflow-hidden rounded-2xl bg-white shadow-2xl"
     onClick={(e) => e.stopPropagation()}
    >
     {/* Search input */}
     <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      <Search className="h-[18px] w-[18px] shrink-0 text-[#2D1810]/40" />
      <input
       ref={inputRef}
       value={query}
       onChange={(e) => setQuery(e.target.value)}
       placeholder="Search children, parents, staff, invoices, tasks…"
       className="flex-1 bg-transparent text-[15px] text-[#2D1810] placeholder:text-[#2D1810]/35 focus:outline-none"
      />
      {query && (
       <button onClick={() => setQuery("")} className="rounded-md p-1 text-[#2D1810]/30 hover:bg-black/5 hover:text-[#2D1810]/60">
        <X className="h-4 w-4" />
       </button>
      )}
      <kbd className="hidden rounded-md border border-black/[0.1] bg-[#F5EDD8] px-1.5 py-0.5 text-[10px] font-medium text-[#2D1810]/40 sm:inline">
       ESC
      </kbd>
     </div>

     {/* Results */}
     <div ref={listRef} className="max-h-[50vh] overflow-y-auto p-2">
      {!query.trim() && (
       <div className="px-3 py-8 text-center">
        <p className="text-sm text-[#2D1810]/40">Start typing to search across everything</p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
         {["children", "staff", "invoices", "tasks", "incidents"].map((suggestion) => (
          <button
           key={suggestion}
           onClick={() => setQuery(suggestion)}
           className="rounded-full bg-[#F5EDD8]/50 px-3 py-1 text-xs font-medium text-[#2D1810]/50 hover:bg-[#F5EDD8] hover:text-[#2D1810]/70"
          >
           {suggestion}
          </button>
         ))}
        </div>
       </div>
      )}

      {query.trim() && combined.length === 0 && (
       <div className="px-3 py-8 text-center">
        <p className="text-sm text-[#2D1810]/40">No results for &ldquo;{query}&rdquo;</p>
        <p className="mt-1 text-xs text-[#2D1810]/30">Try a different search term</p>
       </div>
      )}

      {Array.from(grouped.entries()).map(([category, items]) => (
       <div key={category} className="mb-2">
        <p className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#2D1810]/30">{category}</p>
        {items.map((item) => {
         const idx = combined.indexOf(item);
         const Icon = item.icon;
         return (
          <button
           key={item.id}
           onClick={() => {
            router.push(item.href);
            onOpenChange(false);
           }}
           onMouseEnter={() => setActiveIndex(idx)}
           className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
            idx === activeIndex ? "bg-[#F5EDD8]" : "hover:bg-[#FAF2E1]/60"
           }`}
          >
           <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${item.color}15` }}
           >
            <Icon className="h-4 w-4" style={{ color: item.color }} />
           </div>
           <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold text-[#2D1810]">{item.title}</p>
            <p className="truncate text-[11px] text-[#2D1810]/45">{item.subtitle}</p>
           </div>
           <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#2D1810]/20" />
          </button>
         );
        })}
       </div>
      ))}
     </div>

     {/* Footer */}
     {query.trim() && combined.length > 0 && (
      <div className="flex items-center justify-between px-4 py-2.5" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
       <p className="text-[11px] text-[#2D1810]/35">
        {combined.length} result{combined.length !== 1 ? "s" : ""}
       </p>
       <div className="flex items-center gap-2 text-[11px] text-[#2D1810]/35">
        <span className="rounded border border-black/[0.1] bg-[#F5EDD8] px-1 py-0.5 text-[10px]">↑↓</span>
        navigate
        <span className="rounded border border-black/[0.1] bg-[#F5EDD8] px-1 py-0.5 text-[10px]">↵</span>
        open
       </div>
      </div>
     )}
    </div>
   </div>
  </>
 );
}
