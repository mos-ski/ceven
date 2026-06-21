"use client";

import { ChevronDown, Download, Send } from "lucide-react";
import { useState } from "react";

// ── Static data ────────────────────────────────────────────────────────────────

const incidents = [
  {
    title: "Minor Fall — Tiger Room",
    desc: "Ade B., 9:14am. Caregiver notified parent.",
  },
  {
    title: "Allergy Alert — Lion Class",
    desc: "Leo A., peanut exposure suspected. Under observation.",
  },
  {
    title: "Absence Pattern — Zara M.",
    desc: "3 consecutive absences. Follow-up call recommended.",
  },
  {
    title: "Medical Note Updated",
    desc: "Mia T.'s allergy list updated by Mrs. Amaka.",
  },
];

const aiInsights = [
  {
    title: "Attendance anomaly detected",
    desc: "3 children in Lion Class have >40% absence rate this month.",
  },
  {
    title: "Health trend flagged",
    desc: "Uptick in minor injuries in Tiger Room — review play area.",
  },
  {
    title: "Wellness check recommended",
    desc: "Zara M. showing behavioral changes — recommend parent consult.",
  },
  {
    title: "Compliance gap identified",
    desc: "2 children with outdated vaccination records.",
  },
];

const staffRows = [
  { name: "Mrs. Sarah", role: "Caregiver", pct: 92, color: "#009061" },
  { name: "Mr. James", role: "Marketer", pct: 12, color: "#ef4444" },
  { name: "Mrs. Ngozi", role: "Caregiver", pct: 87, color: "#009061" },
  { name: "Mrs. Anita", role: "Admin", pct: 52, color: "#ef4444" },
];

const payments = [
  { family: "Okafor Family", amount: "₦40,000", days: "7 days overdue" },
  { family: "Bello Family", amount: "₦110,000", days: "14 days overdue" },
  { family: "Eze Family", amount: "₦40,000", days: "3 days overdue" },
];

const templates = [{ label: "Incident Report" }, { label: "Parent Notice" }];

const chatMessages = [
  {
    role: "ai" as const,
    text: "Good morning! I've analyzed overnight data. Here's your brief:\n\n1. Welfare: Zara M. absent 3× this week\n2. Finance: 3 invoices overdue (₦190,000 total)\n3. Compliance: Mrs. Anita at 52% log rate",
  },
  {
    role: "user" as const,
    text: "Yes, give me the full brief",
  },
  {
    role: "ai" as const,
    text: "Sure! Here's the full summary:\n\n**Health & Welfare:** Zara M. (Lion Class) has been absent 3 consecutive days. Leo A. has an outdated allergy record. Recommend follow-up before noon.\n\n**Finance:** Okafor, Bello, and Eze families have overdue balances. Auto-reminder scheduled for 2pm.\n\n**Staff Compliance:** Mrs. Anita's log rate has dropped to 52%, below the 72% threshold.",
  },
  {
    role: "user" as const,
    text: "Write me a message for Mrs. Mohammed about Zara",
  },
  {
    role: "ai" as const,
    text: "Here's a draft message:\n\n'Dear Mrs. Mohammed,\n\nI hope you're well. I wanted to reach out regarding Zara's recent absences. We've missed her this week and hope everything is okay. Please do let us know if there's anything we can do to support your family.\n\nWarm regards,\nUdebem Crèche'",
  },
];

const quickPrompts = ["Who hasn't paid?", "At-risk children?", "Draft announcement"];

// ── Constants ─────────────────────────────────────────────────────────────────

const gradientBg = "linear-gradient(135deg, rgb(30,45,74) 0%, rgb(45,24,16) 100%)";

// ── Sub-components ─────────────────────────────────────────────────────────────

function GradientPill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-white"
      style={{ background: gradientBg }}
    >
      {children}
    </span>
  );
}

function DateFilterButton() {
  return (
    <button className="flex items-center gap-1.5 rounded-lg border border-[#d0d5dd] bg-white px-3 py-2 font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
      June 2026
      <ChevronDown className="h-4 w-4" />
    </button>
  );
}

function IncidentCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mb-2 last:mb-0 rounded-xl border border-[#f4f5f6] bg-[#fcfcfc] p-3">
      <p className="text-sm font-semibold font-[family-name:var(--font-merriweather)] text-[#2d1810]">
        {title}
      </p>
      <p className="mt-0.5 text-xs font-[family-name:var(--font-nunito)] text-[#6b7280]">{desc}</p>
    </div>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IntelligencePage() {
  const [adaInput, setAdaInput] = useState("");

  return (
    <div className="flex flex-col gap-6 font-[family-name:var(--font-nunito)]">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">
          AI Command Center
        </h1>
        <div className="flex flex-wrap gap-3">
          <DateFilterButton />
          <button
            className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-white"
            style={{ background: gradientBg }}
          >
            ✦ Refresh Analysis
          </button>
          <button className="flex items-center gap-1.5 rounded-lg border border-[#d0d5dd] px-4 py-2 text-sm font-medium text-[#2d1810]">
            <Download className="h-4 w-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex flex-col xl:flex-row gap-4">
        {/* LEFT MAIN CONTENT */}
        <div className="flex flex-1 flex-col gap-4">
          {/* Top 2-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left top panel — Recent Incidents & Flags */}
            <div className="rounded-2xl bg-white shadow-sm p-5">
              <GradientPill>✦ Health &amp; Welfare</GradientPill>
              <h2 className="mt-4 mb-3 text-sm font-bold font-[family-name:var(--font-merriweather)] text-[#2d1810]">
                Recent Incidents &amp; Flags
              </h2>
              {incidents.map((item) => (
                <IncidentCard key={item.title} title={item.title} desc={item.desc} />
              ))}
            </div>

            {/* Right top panel — AI Analysis & Recommendations */}
            <div className="rounded-2xl bg-white shadow-sm p-5">
              <GradientPill>✦ Health &amp; Welfare Intelligence</GradientPill>
              <h2 className="mt-4 mb-3 text-sm font-bold font-[family-name:var(--font-merriweather)] text-[#2d1810]">
                AI Analysis &amp; Recommendations
              </h2>
              {aiInsights.map((item) => (
                <IncidentCard key={item.title} title={item.title} desc={item.desc} />
              ))}
            </div>
          </div>

          {/* Bottom full-width card — Staff & Finance Intelligence */}
          <div className="rounded-2xl bg-white shadow-sm p-5">
            {/* Header row */}
            <div className="flex items-center justify-between mb-4">
              <GradientPill>✦ Staff &amp; Finance Intelligence</GradientPill>
              <DateFilterButton />
            </div>

            {/* 3-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Staff Compliance */}
              <div className="rounded-xl border border-[#edd9c0] p-4">
                <h3 className="mb-3 text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">
                  Staff Compliance
                </h3>
                {staffRows.map((staff) => (
                  <div key={staff.name} className="mb-3 last:mb-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#edd9c0] text-xs font-bold text-[#3b2513]">
                          {getInitials(staff.name)}
                        </div>
                        <div>
                          <p className="text-xs font-[family-name:var(--font-nunito)] text-[#2d1810]">
                            {staff.name}
                          </p>
                          <p className="text-[10px] font-[family-name:var(--font-nunito)] text-[#6b7280]">
                            {staff.role}
                          </p>
                        </div>
                      </div>
                      <span
                        className="text-xs font-bold font-[family-name:var(--font-nunito)]"
                        style={{ color: staff.color }}
                      >
                        {staff.pct}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[#e6ebf3]">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${staff.pct}%`, background: staff.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Finance Overview */}
              <div className="rounded-xl border border-[#edd9c0] p-4">
                <h3 className="mb-3 text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">
                  Outstanding Payments
                </h3>
                {payments.map((p) => (
                  <div
                    key={p.family}
                    className="flex items-center justify-between mb-3 last:mb-0"
                  >
                    <div>
                      <p className="text-xs font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">
                        {p.family}
                      </p>
                      <p className="text-[10px] font-[family-name:var(--font-nunito)] text-[#ef4444]">
                        {p.days}
                      </p>
                    </div>
                    <span className="text-xs font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">
                      {p.amount}
                    </span>
                  </div>
                ))}
              </div>

              {/* Quick Templates */}
              <div className="rounded-xl border border-[#edd9c0] p-4">
                <h3 className="mb-3 text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">
                  Quick Templates
                </h3>
                {templates.map((t) => (
                  <div
                    key={t.label}
                    className="mb-2 last:mb-0 cursor-pointer rounded-lg border border-[#e6ebf3] bg-[#fcfcfc] p-3 hover:border-[#c47b2c]"
                  >
                    <p className="text-xs font-[family-name:var(--font-nunito)] font-medium text-[#2d1810]">
                      {t.label}
                    </p>
                    <p className="text-[10px] font-[family-name:var(--font-nunito)] text-[#c47b2c]">
                      Use template
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT ADA PANEL */}
        <div className="flex w-full xl:w-[340px] shrink-0 flex-col overflow-hidden rounded-2xl border border-[#edd9c0] bg-[#fffcf4]">
          {/* Ada Header */}
          <div className="border-b border-[#edd9c0] p-4">
            <div className="flex items-center">
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm text-white"
                style={{ background: gradientBg }}
              >
                ✦
              </div>
              <span className="ml-2 text-sm font-bold font-[family-name:var(--font-nunito)] text-[#c47b2c]">
                ADA
              </span>
              <span className="ml-1.5 h-2 w-2 rounded-full bg-[#22c55e]" />
              <span className="ml-auto text-xs font-[family-name:var(--font-nunito)] text-[#6b7280]">
                Professional &amp; Warm
              </span>
              <button className="ml-2 cursor-pointer text-[10px] font-[family-name:var(--font-nunito)] text-[#c47b2c] underline">
                Personalize
              </button>
            </div>
          </div>

          {/* Chat area */}
          <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs font-[family-name:var(--font-nunito)] leading-relaxed ${
                    msg.role === "ai"
                      ? "rounded-tl-none bg-[#fdf6e8] text-[#2d1810]"
                      : "self-end rounded-tr-none bg-[#c47b2c] text-white"
                  }`}
                  style={{ whiteSpace: "pre-line" }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            <div className="flex justify-start">
              <div className="flex items-center gap-1 rounded-2xl rounded-tl-none bg-[#fdf6e8] p-3">
                <span
                  className="h-2 w-2 rounded-full bg-[#c47b2c] animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="h-2 w-2 rounded-full bg-[#c47b2c] animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="h-2 w-2 rounded-full bg-[#c47b2c] animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </div>

          {/* Quick prompts */}
          <div className="flex flex-wrap gap-2 px-4 pb-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                className="cursor-pointer rounded-full border border-[#edd9c0] bg-white px-3 py-1.5 font-[family-name:var(--font-nunito)] text-[10px] text-[#6b7280] hover:border-[#c47b2c] hover:text-[#c47b2c]"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Ada Input */}
          <div className="flex items-center gap-2 border-t border-[#edd9c0] p-4">
            <input
              type="text"
              value={adaInput}
              onChange={(e) => setAdaInput(e.target.value)}
              placeholder="Ask Ada anything…"
              className="flex-1 rounded-full border border-[#edd9c0] bg-white px-4 py-2 font-[family-name:var(--font-nunito)] text-sm placeholder:text-[#9ca3af] focus:border-[#c47b2c] focus:outline-none"
            />
            <button
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white"
              style={{ background: gradientBg }}
              onClick={() => setAdaInput("")}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
