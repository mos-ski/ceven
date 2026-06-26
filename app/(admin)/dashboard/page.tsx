"use client";

import {
  AlertTriangle,
  ArrowUpRight,
  BarChart2,
  Bell,
  Bot,
  ChevronDown,
  ClipboardList,
  FileText,
  Minus,
  Plus,
  QrCode,
  Send,
  Settings2,
  ShieldAlert,
  TrendingUp,
  UserPlus,
  X,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import EnrollChildModal from "@/components/dashboard/enroll-child-modal";
import NotificationPanel from "@/components/dashboard/notification-panel";
import { LogActivityModal, type LogActivityMode } from "@/components/admin/children/log-activity-modal";
import NewInvoiceModal from "@/components/admin/finance/new-invoice-modal";
import { getAdaReply } from "@/lib/ada-responses";
import { useDashboardStats, formatLastUpdated } from "@/lib/dashboard-data";
import OnboardingChecklist from "@/components/dashboard/onboarding-checklist";
import AiRiskBadge, { calculateRisk } from "@/components/dashboard/ai-risk-badge";

// ── Types ─────────────────────────────────────────────────────────────────────

type StatCardData = {
  label: string;
  value: string;
  sub: string;
  subColor?: string;
  showTrend?: boolean;
  showAlert?: boolean;
};

// ── Activity feed types ──────────────────────────────────────────────────────

type ActivityType = "health" | "finance" | "staff" | "compliance" | "operations" | "enrolment";

const ACTIVITY_COLORS: Record<ActivityType, string> = {
  health: "#dc2626",
  finance: "#059669",
  staff: "#2563eb",
  compliance: "#d97706",
  operations: "#6b7280",
  enrolment: "#7c3aed",
};

type ActivityFeedItem = {
  title: string;
  desc: string;
  time: string;
  type: ActivityType;
  typeLabel: string;
};

const liveActivities: ActivityFeedItem[] = [
  { title: "Zara Mohammed absent", desc: "No contact from parent today", time: "2 min ago", type: "health", typeLabel: "Health" },
  { title: "Payment received — ₦85,000", desc: "King Andrew monthly fee", time: "15 min ago", type: "finance", typeLabel: "Finance" },
  { title: "Mr Moore submitted daily log", desc: "Lion Class activities logged", time: "1 hour ago", type: "operations", typeLabel: "Operations" },
  { title: "DBS check expiring", desc: "Grace Nka — expires in 12 days", time: "2 hours ago", type: "compliance", typeLabel: "Compliance" },
  { title: "New enrolment application", desc: "Tunde Adeyemi — Tiger Class", time: "3 hours ago", type: "enrolment", typeLabel: "Enrolment" },
];

// ── Static data ───────────────────────────────────────────────────────────────

const INSIGHT_TAG_ROUTES: Record<string, string> = {
  "Health & Wellness": "/children",
  "Finance & Invoice": "/finance",
  "Creche Performance": "/staff?tab=compliance-safety",
};

const aiInsights = [
  {
    color: "#d4522f",
    bold: "Zara Mohammed",
    text: " has been absent 3× this week. Nut allergy on file – flag for welfare check.",
    tag: "Health & Wellness",
  },
  {
    color: "#27e2a4",
    bold: "3 invoices",
    text: " are 7+ days overdue. Mr Okafor historically pays late in Q2 – auto-remind now",
    tag: "Finance & Invoice",
  },
  {
    color: "#f59e0b",
    bold: "Lion Class",
    text: " caregiver logging compliance dropped to 62% this week — below 80% threshold.",
    tag: "Creche Performance",
  },
];

const upcomingEvents = [
  { date: "July 05", time: "12:00am", title: "Jenita's birthday" },
  { date: "July 05 – July 10", time: "08:00am", title: "Creche short break" },
  { date: "July 05 – July 10", time: "08:00am", title: "Parents teachers meeting" },
];

const roomOccupancy = [
  { room: "Lion Class", enrolled: 12, present: 10, capacity: 15, pct: 80 },
  { room: "Tiger Class", enrolled: 9, present: 8, capacity: 12, pct: 67 },
  { room: "Elephant Class", enrolled: 7, present: 5, capacity: 10, pct: 50 },
  { room: "Zebra Class", enrolled: 11, present: 9, capacity: 15, pct: 60 },
];

const outstandingPayments = [
  { child: "King Andrew", cls: "Lion", amount: "₦40,000", dueDate: "Jan 10", status: "Overdue", overdueDays: 10 },
  { child: "Chidera Nwosu", cls: "Tiger", amount: "₦40,000", dueDate: "Feb 2", status: "Pending", overdueDays: 5 },
  { child: "Emeka Obi", cls: "Elephant", amount: "₦40,000", dueDate: "May 1", status: "Pending", overdueDays: 2 },
  { child: "Aisha Bello", cls: "Zebra", amount: "₦40,000", dueDate: "Feb 10", status: "Pending", overdueDays: 0 },
];

const pendingEnrollments = [
  { child: "Tunde Adeyemi", cls: "Tiger", status: "Pending", submitted: "Jan 10" },
  { child: "Ngozi Okoro", cls: "Lion", status: "Pending", submitted: "Feb 2" },
  { child: "Yemi Afolabi", cls: "Elephant", status: "Pending", submitted: "May 1" },
  { child: "Funke Alabi", cls: "Zebra", status: "Pending", submitted: "Feb 10" },
];

const chatMessages = [
  {
    role: "ai" as const,
    text: "Good morning! Here's a quick summary: 3 children flagged for follow-up, 2 invoices overdue, and Lion Class has low logging compliance this week. Want me to draft a staff reminder?",
  },
  { role: "user" as const, text: "Yes, draft a reminder for Lion Class staff about logging." },
  {
    role: "ai" as const,
    text: "Done! Here's a draft:\n\n\"Hi Lion Class team, logging compliance this week is at 62% — below our 80% target. Please ensure all activities and meals are logged before end of day. Thank you!\" — Shall I send this?",
  },
];

const quickPrompts = [
  "Summarise today's absences",
  "Which invoices are overdue?",
  "Flag welfare concerns",
];

// ── PRD-compliant 5 quick actions ────────────────────────────────────────────

type QuickActionId = "add-child" | "qr-station" | "new-log" | "new-invoice" | "view-reports";

const ALL_QUICK_ACTIONS: { id: QuickActionId; icon: typeof Plus; label: string; color: string }[] = [
  { id: "add-child", icon: Plus, label: "Add Child", color: "#3b2513" },
  { id: "qr-station", icon: QrCode, label: "QR Station", color: "#1d4ed8" },
  { id: "new-log", icon: ClipboardList, label: "New Log", color: "#059669" },
  { id: "new-invoice", icon: FileText, label: "New Invoice", color: "#7c3aed" },
  { id: "view-reports", icon: BarChart2, label: "View Reports", color: "#c47b2c" },
];

function CustomizeQuickActionsModal({
  selectedIds,
  onSave,
  onClose,
}: {
  selectedIds: QuickActionId[];
  onSave: (ids: QuickActionId[]) => void;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState<QuickActionId[]>(selectedIds);

  function toggle(id: QuickActionId) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : prev.length < 12 ? [...prev, id] : prev));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="relative flex max-h-[90vh] w-full max-w-[680px] flex-col overflow-y-auto rounded-[20px] border-6 border-[#faf2e1] bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-[#e6ebf3] bg-white px-6 py-5">
          <div>
            <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#171f26]">
              Customize Quick Actions
            </h2>
            <p className="mt-1 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
              Choose which actions appear on your dashboard quick actions bar
            </p>
          </div>
          <button onClick={onClose} aria-label="Close modal" className="rounded p-1 text-[#6b7280] hover:text-[#2d1810]">
            <X className="size-5" />
          </button>
        </div>

        <div className="flex flex-col gap-4 px-6 py-5">
          <p className="font-[family-name:var(--font-nunito)] text-xs text-black">
            Selected (<span className="font-semibold">Max of 5</span>)
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {ALL_QUICK_ACTIONS.filter((a) => selected.includes(a.id)).map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => toggle(id)}
                className="relative flex flex-col items-center gap-4 rounded-xl border border-[#d4a67f] bg-[#faf2e1] px-5 py-6"
              >
                <Minus className="absolute right-2 top-2 size-5 rounded-full border border-[#d4a67f] bg-white p-0.5 text-[#3b2513]" />
                <Icon className="size-6 text-[#3b2513]" />
                <span className="flex items-center gap-1 font-[family-name:var(--font-nunito)] text-xs font-bold text-[#3b2513]">
                  {label}
                  <Plus className="size-3.5" />
                </span>
              </button>
            ))}
          </div>

          <p className="mt-2 font-[family-name:var(--font-nunito)] text-xs text-black">Add actions from below</p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {ALL_QUICK_ACTIONS.filter((a) => !selected.includes(a.id)).map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => toggle(id)}
                className="relative flex flex-col items-center gap-4 rounded-xl border border-[#ccd2dc] px-5 py-6"
              >
                <Plus className="absolute right-2 top-2 size-5 rounded-full border border-[#ccd2dc] p-0.5 text-[#3b2513]" />
                <Icon className="size-6 text-[#3b2513]" />
                <span className="flex items-center gap-1 font-[family-name:var(--font-nunito)] text-xs font-bold text-[#3b2513]">
                  {label}
                  <Plus className="size-3.5" />
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="sticky bottom-0 z-10 flex items-center justify-end gap-4 border-t border-[#e6ebf3] bg-white px-6 py-4">
          <button
            onClick={onClose}
            className="flex h-11 items-center justify-center rounded-lg border border-[#3b2513] px-5 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#3b2513]"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(selected);
              onClose();
            }}
            className="flex h-11 w-40 items-center justify-center rounded-lg bg-[#3b2513] font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Shared sub-components ─────────────────────────────────────────────────────

function LinkArrow({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 font-[family-name:var(--font-nunito)] text-xs font-bold text-[#3b2513] hover:opacity-70"
    >
      {label}
      <ArrowUpRight className="h-4 w-4" />
    </button>
  );
}

function StatusBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-md bg-[#f9f1e6] px-2 py-1 font-[family-name:var(--font-urbanist)] text-xs font-medium text-[#ff9a01]">
      {label}
    </span>
  );
}

// ── Stat Card with pulse animation ──────────────────────────────────────────

function StatCard({ label, value, sub, subColor = "#6b7280", showTrend, showAlert, isRefreshing }: StatCardData & { isRefreshing?: boolean }) {
  const prevValueRef = useRef(value);
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      setIsPulsing(true);
      const timer = setTimeout(() => setIsPulsing(false), 1000);
      prevValueRef.current = value;
      return () => clearTimeout(timer);
    }
  }, [value]);

  return (
    <div className={`flex flex-col gap-2 rounded-xl border border-[#e6ebf3] bg-white px-4 py-5 transition-all duration-300 ${isPulsing ? "ring-2 ring-[#c47b2c]/30" : ""}`}>
      <div className="flex flex-col gap-2">
        <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6f7682]">{label}</p>
        <p className={`font-[family-name:var(--font-merriweather)] text-2xl lg:text-[32px] font-bold leading-none text-[#2d1810] transition-all duration-300 ${isPulsing ? "scale-105" : "scale-100"}`}>
          {value}
        </p>
      </div>
      <div className="flex items-center gap-1" style={{ color: subColor }}>
        {showAlert && <AlertTriangle className="h-4 w-4" />}
        {showTrend && <TrendingUp className="h-4 w-4" />}
        <span className="font-[family-name:var(--font-nunito)] text-[10px]">{sub}</span>
      </div>
    </div>
  );
}

// ── AI Chat Panel ─────────────────────────────────────────────────────────────

function AIChatPanel({ onClose }: { onClose: () => void }) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState(chatMessages);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      { role: "user" as const, text: trimmed },
      { role: "ai" as const, text: getAdaReply(trimmed) },
    ]);
    setInputValue("");
  }

  return (
    <div className="flex w-full lg:w-[360px] shrink-0 flex-col overflow-hidden rounded-2xl border-l-4 border-[#c47b2c] bg-[#fffcf4] shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#edd9c0] px-4 py-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{ background: "linear-gradient(135deg, #1e2d4a 0%, #3b2513 100%)" }}
          >
            <Bot className="h-5 w-5 text-[#ffd58f]" />
          </div>
          <div>
            <p className="font-[family-name:var(--font-nunito)] text-sm font-bold text-[#2d1810]">
              Ada
            </p>
            <p className="font-[family-name:var(--font-urbanist)] text-xs text-[#27e2a4]">
              • Online
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex h-7 w-7 items-center justify-center rounded-md text-[#6b7280] hover:bg-[#edd9c0]"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "ai" && (
              <div
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full mr-2 mt-1"
                style={{ background: "linear-gradient(135deg, #1e2d4a 0%, #3b2513 100%)" }}
              >
                <Bot className="h-3.5 w-3.5 text-[#ffd58f]" />
              </div>
            )}
            <div
              className={`max-w-[240px] rounded-2xl px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-xs leading-relaxed ${
                msg.role === "ai"
                  ? "rounded-tl-sm bg-[#fdf6e8] text-[#2d1810]"
                  : "rounded-tr-sm bg-[#c47b2c] text-white"
              }`}
              style={{ whiteSpace: "pre-line" }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Prompts */}
      <div className="flex flex-wrap gap-2 border-t border-[#edd9c0] px-4 py-3">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => send(prompt)}
            className="rounded-full border border-[#edd9c0] bg-white px-3 py-1 font-[family-name:var(--font-urbanist)] text-[10px] text-[#6b7280] hover:border-[#c47b2c] hover:text-[#c47b2c]"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 border-t border-[#edd9c0] px-4 py-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send(inputValue)}
          placeholder="Ask Ada anything..."
          className="flex-1 rounded-full border border-[#edd9c0] bg-white px-4 py-2 font-[family-name:var(--font-nunito)] text-xs text-[#2d1810] placeholder:text-[#9ca3af] focus:border-[#c47b2c] focus:outline-none"
        />
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3b2513] text-[#faf2e1] hover:bg-[#2d1810]"
          onClick={() => send(inputValue)}
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter();
  const { stats, lastUpdated, isRefreshing } = useDashboardStats(30000);
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [logActivityMode, setLogActivityMode] = useState<LogActivityMode | null>(null);
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [quickActionIds, setQuickActionIds] = useState<QuickActionId[]>(["add-child", "qr-station", "new-log", "new-invoice", "view-reports"]);
  const [customizeOpen, setCustomizeOpen] = useState(false);

  const quickActions = ALL_QUICK_ACTIONS.filter((a) => quickActionIds.includes(a.id));

  function handleQuickAction(id: QuickActionId) {
    if (id === "add-child") setEnrollOpen(true);
    else if (id === "qr-station") router.push("/daily-operations");
    else if (id === "new-log") setLogActivityMode("daily-report");
    else if (id === "new-invoice") setInvoiceOpen(true);
    else if (id === "view-reports") router.push("/intelligence?tab=reports");
  }

  const greetingDate = new Date().toLocaleDateString("en-NG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <>
      {/* Main content area — shrinks when AI panel is open */}
      <div className={`flex gap-4 ${aiPanelOpen ? "items-start" : "flex-col"}`}>
        {/* Left / main column */}
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          {/* 1. Greeting Banner */}
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{
              background: "linear-gradient(138.9deg, #2d1810 0%, #3d2418 70%, #3d2418 100%)",
              minHeight: 140,
            }}
          >
            {/* Decorative squiggle watermark */}
            <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 opacity-25">
              <svg width="400" height="280" viewBox="0 0 400 280" fill="none">
                <path d="M60 30 C80 90, 40 140, 60 200 C80 260, 40 260, 60 310" stroke="#c47b2c" strokeWidth="2.5" fill="none" />
                <path d="M150 15 C170 85, 130 140, 150 200 C170 270, 130 270, 150 320" stroke="#c47b2c" strokeWidth="2.5" fill="none" />
                <path d="M255 40 C275 100, 235 145, 255 210 C275 260, 235 265, 255 315" stroke="#c47b2c" strokeWidth="2.5" fill="none" />
                <path d="M330 100 C345 145, 320 170, 335 220 C350 265, 325 270, 340 300" stroke="#c47b2c" strokeWidth="2.5" fill="none" />
              </svg>
            </div>

            {/* Content */}
            <div className="relative flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-7">
              <div className="flex flex-col gap-2">
                <p className="font-[family-name:var(--font-nunito)] text-xs font-medium text-[#ffd58f]">
                  {greetingDate}
                </p>
                <h1 className="font-[family-name:var(--font-merriweather)] text-lg sm:text-2xl font-bold text-[#f5edd8]">
                  {getGreeting()}, Amaka 👋
                </h1>
                <span className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#27e2a4] underline decoration-solid">
                  • Active
                </span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                {/* Notification bell */}
                <button
                  onClick={() => setNotificationOpen((v) => !v)}
                  className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#e0bfa0] text-[#faf2e1] hover:bg-white/10"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ef4444] font-[family-name:var(--font-nunito)] text-[9px] font-bold text-white">
                    4
                  </span>
                </button>

                {/* AI chat toggle */}
                <button
                  onClick={() => setAiPanelOpen((v) => !v)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-lg border border-[#e0bfa0] px-3 py-2 font-[family-name:var(--font-urbanist)] text-xs font-medium text-[#faf2e1] hover:bg-white/10 sm:px-4 sm:py-2.5 sm:text-sm ${
                    aiPanelOpen ? "bg-white/10" : ""
                  }`}
                >
                  <BarChart2 className="h-4 w-4" />
                  <span className="hidden sm:inline">AI Reports</span>
                  <span className="sm:hidden">AI</span>
                </button>
                <button
                  onClick={() => setEnrollOpen(true)}
                  className="shrink-0 rounded-lg bg-[#faf2e1] px-3 py-2 font-[family-name:var(--font-urbanist)] text-xs font-medium text-[#3b2513] shadow-sm hover:bg-white sm:px-5 sm:py-2.5 sm:text-sm"
                >
                  Enroll
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions — visible when AI panel is open */}
          {aiPanelOpen && (
            <div className="flex items-center gap-3 overflow-x-auto rounded-xl bg-[#faf2e1] px-4 py-3">
              {quickActions.map(({ id, icon: Icon, label, color }) => (
                <button
                  key={label}
                  onClick={() => handleQuickAction(id)}
                  className="flex shrink-0 flex-col items-center gap-1.5 rounded-xl border border-[#edd9c0] bg-white px-4 py-3 hover:shadow-sm"
                >
                  <Icon className="h-5 w-5" style={{ color }} />
                  <span className="font-[family-name:var(--font-urbanist)] text-xs font-medium text-[#2d1810]">
                    {label}
                  </span>
                </button>
              ))}
              <button
                onClick={() => setCustomizeOpen(true)}
                aria-label="Customize Quick Actions"
                className="flex shrink-0 flex-col items-center gap-1.5 rounded-xl border border-dashed border-[#d4a67f] bg-white px-4 py-3 text-[#3b2513] hover:shadow-sm"
              >
                <Settings2 className="h-5 w-5" />
                <span className="font-[family-name:var(--font-urbanist)] text-xs font-medium">Customize</span>
              </button>
            </div>
          )}

          {/* Onboarding Checklist */}
          <OnboardingChecklist />

          {/* 2. Stats Grid — swipeable on mobile, grid on desktop */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-1 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
              {(stats?.row1 ?? []).map((card) => (
                <div key={card.label} className="min-w-[160px] snap-start flex-1 sm:min-w-[180px] lg:min-w-0">
                  <StatCard {...card} isRefreshing={isRefreshing} />
                </div>
              ))}
            </div>
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-1 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
              {(stats?.row2 ?? []).map((card) => (
                <div key={card.label} className="min-w-[160px] snap-start flex-1 sm:min-w-[180px] lg:min-w-0">
                  <StatCard {...card} isRefreshing={isRefreshing} />
                </div>
              ))}
            </div>
            {/* Last updated timestamp */}
            {lastUpdated && (
              <p className="font-[family-name:var(--font-nunito)] text-[10px] text-[#9ca3af]">
                Last updated: {formatLastUpdated(lastUpdated)}
                {isRefreshing && <span className="ml-2 text-[#c47b2c]">Refreshing...</span>}
              </p>
            )}
          </div>

          {/* 3. Middle Panels */}
          <div className={`grid gap-4 ${aiPanelOpen ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}>
            {/* AI Daily Brief */}
            <div className="flex flex-col gap-4 rounded-xl border border-[#c47b2c] bg-white p-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div
                    className="rounded-full px-3 py-1.5"
                    style={{ background: "linear-gradient(126.84deg, #1e2d4a 0%, #2d1810 100%)" }}
                  >
                    <span className="font-[family-name:var(--font-nunito)] text-[10px] font-medium tracking-wide text-[#f5edd8]">
                      <span className="text-[#c47b2c]">✦ </span>
                      AI DAILY BRIEF
                    </span>
                  </div>
                  <LinkArrow label="Open AI Center" onClick={() => router.push("/intelligence")} />
                </div>
                <p className="font-[family-name:var(--font-nunito)] text-sm">
                  <span className="text-[#6b7280]">Today&apos;s report</span>
                  <span className="text-black"> - generated 7am</span>
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {aiInsights.map((insight, i) => (
                  <div
                    key={i}
                    className="relative rounded-xl border border-[rgba(45,24,16,0.07)] bg-[#faf2e1] p-3 pl-7"
                  >
                    <div
                      className="absolute left-3 top-4 h-2 w-2 rounded-sm"
                      style={{ background: insight.color }}
                    />
                    <p className="font-[family-name:var(--font-nunito)] text-xs leading-5 text-[#2d1810]">
                      <span className="font-bold">{insight.bold}</span>
                      <span className="text-[rgba(45,24,16,0.5)]">{insight.text}</span>
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="rounded-full bg-[#edd9c0] px-2 py-1 font-[family-name:var(--font-urbanist)] text-[8px] text-[#6b7280]">
                        {insight.tag}
                      </span>
                      <button
                        onClick={() => router.push(INSIGHT_TAG_ROUTES[insight.tag] ?? "/intelligence")}
                        className="font-[family-name:var(--font-nunito)] text-xs font-semibold text-[#ba733e] hover:opacity-70"
                      >
                        Take Action
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events (default) OR Room Occupancy (AI panel open) */}
            {!aiPanelOpen ? (
              <div className="flex flex-col gap-4 rounded-xl border border-[rgba(45,24,16,0.07)] bg-white p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-[family-name:var(--font-nunito)] text-base font-medium text-black">
                    Upcoming Events
                  </h3>
                  <LinkArrow label="Go to Calendar" onClick={() => router.push("/communication?tab=events-calendar")} />
                </div>

                <div className="flex flex-col gap-3">
                  {upcomingEvents.map((event, i) => (
                    <div key={i} className="flex flex-col gap-2 rounded-xl border border-[#e6ebf3] p-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 shrink-0 rounded-full bg-[#fe7171]" />
                        <span className="font-[family-name:var(--font-urbanist)] text-xs text-black">
                          {event.date}
                        </span>
                        <span className="font-[family-name:var(--font-urbanist)] text-xs text-[#9ca3af]">
                          {event.time}
                        </span>
                      </div>
                      <p className="font-[family-name:var(--font-nunito)] text-sm text-black">
                        {event.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4 rounded-xl border border-[rgba(45,24,16,0.07)] bg-white p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-[family-name:var(--font-nunito)] text-base font-medium text-black">
                    Room Occupancy
                  </h3>
                  <LinkArrow label="View All" onClick={() => router.push("/children?tab=rooms-classes")} />
                </div>

                <div className="flex flex-col gap-3">
                  {roomOccupancy.map((room, i) => (
                    <div key={i} className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]">
                          {room.room}
                        </span>
                        <span className="font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">
                          {room.present}/{room.enrolled} present
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-[#f3f4f6]">
                        <div
                          className="h-full rounded-full bg-[#c47b2c]"
                          style={{ width: `${room.pct}%` }}
                        />
                      </div>
                      <span className="font-[family-name:var(--font-urbanist)] text-[10px] text-[#9ca3af]">
                        Capacity: {room.capacity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activity Feed — coloured dots by type */}
            {!aiPanelOpen && (
              <div className="flex flex-col gap-4 rounded-xl border border-[#e6ebf3] bg-white p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-[family-name:var(--font-nunito)] text-base font-medium text-black">
                    Activity Feed
                  </h3>
                  <LinkArrow label="Go to Daily Operations" onClick={() => router.push("/daily-operations")} />
                </div>

                <div className="flex flex-col">
                  {liveActivities.map((item, i) => (
                    <div
                      key={i}
                      className="relative border-b border-[#e6ebf3] py-3 pl-5 last:border-b-0"
                    >
                      <div
                        className="absolute left-0 top-[18px] h-2 w-2 rounded-full"
                        style={{ backgroundColor: ACTIVITY_COLORS[item.type] }}
                      />
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">
                            {item.title}
                          </p>
                          <span
                            className="inline-block mt-0.5 rounded-full px-1.5 py-0.5 font-[family-name:var(--font-urbanist)] text-[8px] font-medium"
                            style={{
                              backgroundColor: `${ACTIVITY_COLORS[item.type]}15`,
                              color: ACTIVITY_COLORS[item.type],
                            }}
                          >
                            {item.typeLabel}
                          </span>
                        </div>
                        <span className="shrink-0 font-[family-name:var(--font-urbanist)] text-[10px] text-[#9ca3af]">
                          {item.time}
                        </span>
                      </div>
                      <p className="mt-0.5 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 4. Bottom Tables */}
          <div className="flex flex-col gap-4 lg:flex-row lg:gap-4">
            {/* Outstanding Payments — with AI Risk column */}
            <div className="flex min-w-0 flex-1 flex-col rounded-xl bg-white lg:flex-[8]">
              <div className="flex items-center justify-between px-4 py-4">
                <h3 className="font-[family-name:var(--font-nunito)] text-base font-medium text-black">
                  Outstanding Payments
                </h3>
                <LinkArrow label="View All" onClick={() => router.push("/finance")} />
              </div>
              {/* Desktop table */}
              <div className="hidden overflow-hidden rounded-xl shadow-[0px_4px_8px_-2px_rgba(16,24,40,0.1),0px_2px_4px_-2px_rgba(16,24,40,0.06)] lg:block">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#edd9c0]">
                      <th className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">Child</th>
                      <th className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">Amount</th>
                      <th className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">Due Date</th>
                      <th className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">Status</th>
                      <th className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">AI Risk</th>
                      <th className="px-4 py-3 text-center font-[family-name:var(--font-nunito)] text-sm font-normal text-black">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {outstandingPayments.map((row, i) => (
                      <tr key={i} className="border-t border-[#eaecf0]">
                        <td className="px-4 py-3">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">{row.child}</span>
                            <span className="font-[family-name:var(--font-nunito)] text-xs text-[#858c98]">🦁 {row.cls}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm font-medium text-black">{row.amount}</td>
                        <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm font-medium text-black">{row.dueDate}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <StatusBadge label={row.status} />
                            <span
                              className={`font-[family-name:var(--font-nunito)] text-sm font-medium ${
                                row.overdueDays > 7 ? "text-[#cd3030]" : row.overdueDays > 3 ? "text-[#d97706]" : "text-[#6b7280]"
                              }`}
                            >
                              {row.overdueDays > 0 ? `${row.overdueDays} days` : ""}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <AiRiskBadge
                            level={calculateRisk(row.overdueDays)}
                            overdueDays={row.overdueDays}
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button className="font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810] underline hover:opacity-70">Reminder</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Mobile card list */}
              <div className="flex flex-col gap-2 px-4 pb-4 lg:hidden">
                {outstandingPayments.map((row, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl border border-[#eaecf0] p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#edd9c0] font-[family-name:var(--font-urbanist)] text-xs font-bold text-[#3b2513]">
                        {row.child.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">{row.child}</span>
                        <span className="font-[family-name:var(--font-nunito)] text-xs text-[#858c98]">{row.amount} • {row.dueDate}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <AiRiskBadge
                        level={calculateRisk(row.overdueDays)}
                        overdueDays={row.overdueDays}
                      />
                      <button className="font-[family-name:var(--font-urbanist)] text-xs font-medium text-[#2d1810] underline hover:opacity-70">Send</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Enrollments */}
            <div className="flex min-w-0 flex-1 flex-col rounded-xl bg-white lg:flex-[6]">
              <div className="flex items-center justify-between px-4 py-4">
                <h3 className="font-[family-name:var(--font-nunito)] text-base font-medium text-black">
                  Pending Enrollments
                </h3>
                <LinkArrow label="View All" onClick={() => router.push("/children?tab=enrolment-waitlist")} />
              </div>
              {/* Desktop table */}
              <div className="hidden overflow-hidden rounded-xl shadow-[0px_4px_8px_-2px_rgba(16,24,40,0.1),0px_2px_4px_-2px_rgba(16,24,40,0.06)] lg:block">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#edd9c0]">
                      <th className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">Submission</th>
                      <th className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">Status</th>
                      <th className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">Submitted</th>
                      <th className="px-4 py-3 text-center font-[family-name:var(--font-nunito)] text-sm font-normal text-black">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {pendingEnrollments.map((row, i) => (
                      <tr key={i} className="border-t border-[#eaecf0]">
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap items-center gap-3">
                            <div className="h-5 w-5 shrink-0 rounded-md border border-[#d0d5dd] bg-white" />
                            <div className="flex flex-col gap-0.5">
                              <span className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">{row.child}</span>
                              <span className="font-[family-name:var(--font-nunito)] text-xs text-[#858c98]">{row.cls}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge label={row.status} />
                        </td>
                        <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm font-medium text-black">{row.submitted}</td>
                        <td className="px-4 py-3 text-center">
                          <button className="font-[family-name:var(--font-urbanist)] text-xs font-medium text-[#2d1810] underline hover:opacity-70">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Mobile card list */}
              <div className="flex flex-col gap-2 px-4 pb-4 lg:hidden">
                {pendingEnrollments.map((row, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl border border-[#eaecf0] p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#edd9c0] font-[family-name:var(--font-urbanist)] text-xs font-bold text-[#3b2513]">
                        {row.child.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">{row.child}</span>
                        <span className="font-[family-name:var(--font-nunito)] text-xs text-[#858c98]">{row.cls} • {row.submitted}</span>
                      </div>
                    </div>
                    <StatusBadge label={row.status} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right — AI Chat Panel */}
        {aiPanelOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 lg:static lg:inset-auto lg:z-auto lg:bg-transparent">
            <div className="relative w-full max-w-[360px] lg:w-[360px]">
              <AIChatPanel onClose={() => setAiPanelOpen(false)} />
            </div>
          </div>
        )}
      </div>

      {/* Notification panel — floating overlay anchored top-right */}
      {notificationOpen && (
        <div className="fixed right-6 top-16 z-40">
          <NotificationPanel onClose={() => setNotificationOpen(false)} />
        </div>
      )}

      {/* Enroll Child Modal */}
      {enrollOpen && <EnrollChildModal onClose={() => setEnrollOpen(false)} />}
      {logActivityMode && (
        <LogActivityModal mode={logActivityMode} onClose={() => setLogActivityMode(null)} />
      )}
      <NewInvoiceModal open={invoiceOpen} onOpenChange={setInvoiceOpen} />
      {customizeOpen && (
        <CustomizeQuickActionsModal
          selectedIds={quickActionIds}
          onSave={setQuickActionIds}
          onClose={() => setCustomizeOpen(false)}
        />
      )}
    </>
  );
}
