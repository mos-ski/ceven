"use client";

import { FadeUp } from "@/components/animations/fade-up";
import { Stagger, StaggerItem } from "@/components/animations/stagger";

export function AdminFeaturesSection() {
  return (
    <section className="bg-white py-16 sm:py-24 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <div className="text-center mb-10 sm:mb-14">
            <h2
              className="font-[family-name:var(--font-fraunces)] font-semibold text-[30px] sm:text-[38px] lg:text-[46px] leading-[1.15] mb-4"
              style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
            >
              <span className="text-[#d94c2e]">For Admins,</span>{" "}
              <span className="text-[#1a1209]">full oversight without having to dig for it yourself.</span>
            </h2>
            <p className="font-[family-name:var(--font-plus-jakarta-sans)] text-[#5a6170] text-[16px] sm:text-[17px] leading-[1.6] max-w-2xl mx-auto">
              Every room, every child, every naira — one place, not four notebooks and a group chat.
            </p>
          </div>
        </FadeUp>

        {/* Row 1: large payment card + kanban card */}
        <Stagger className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5 mb-5">
          <StaggerItem>
            <AdminFeatureCard title="Every payment, invoice, and Naira in one place" description="Collections, outstanding fees, invoices — the whole financial picture, not scattered across a notebook and a bank app.">
              <PaymentsMockup />
            </AdminFeatureCard>
          </StaggerItem>
          <StaggerItem>
            <AdminFeatureCard title="Manage every application, in one pipeline" description="Every family trying to enrol, tracked from first enquiry to decision — not lost in a WhatsApp chat.">
              <KanbanMockup />
            </AdminFeatureCard>
          </StaggerItem>
        </Stagger>

        {/* Row 2: three equal cards */}
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <StaggerItem>
            <AdminFeatureCard title="See everything happening, live" description="Every caregiver, every classroom, every room — one view of the whole crèche, at the moment it's needed.">
              <LiveActivitiesMockup />
            </AdminFeatureCard>
          </StaggerItem>
          <StaggerItem>
            <AdminFeatureCard title="AI that flags what needs you" description="Unpaid fees, a caregiver falling behind, something that slipped through — Ada surfaces the bigger problem.">
              <AiAdaMockup />
            </AdminFeatureCard>
          </StaggerItem>
          <StaggerItem>
            <AdminFeatureCard title="Reporting that thinks with you" description="Reports that build themselves from the day's data. Health intelligence, attendance trends, not just numbers in a spreadsheet.">
              <ReportingMockup />
            </AdminFeatureCard>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}

function AdminFeatureCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#E8DFD0] flex flex-col h-full">
      <div className="bg-[#FAF6EF] p-5 flex-1 min-h-[200px] flex items-start justify-center overflow-hidden">
        {children}
      </div>
      <div className="p-5 border-t border-[#E8DFD0]">
        <h3 className="font-[family-name:var(--font-plus-jakarta-sans)] font-semibold text-[#1a1209] text-[15px] mb-1.5">
          {title}
        </h3>
        <p className="font-[family-name:var(--font-plus-jakarta-sans)] text-[#6b7280] text-[13px] leading-[1.55]">
          {description}
        </p>
      </div>
    </div>
  );
}

/* ─── Mockup: Payments + Donut Chart ─── */
function PaymentsMockup() {
  const donutSegments = [
    { pct: 75, color: "#3b2513", label: "Paid - 75%" },
    { pct: 12, color: "#c47b2c", label: "Partial - 12%" },
    { pct: 8, color: "#f59e0b", label: "Overdue - 5%" },
    { pct: 5, color: "#e5e7eb", label: "Pending - 3%" },
  ];

  // Build SVG donut
  const r = 40;
  const cx = 55;
  const cy = 55;
  const circumference = 2 * Math.PI * r;
  let cumulative = 0;

  const slices = donutSegments.map((seg) => {
    const dashArray = (seg.pct / 100) * circumference;
    const dashOffset = -cumulative * (circumference / 100);
    cumulative += seg.pct;
    return { ...seg, dashArray, dashOffset };
  });

  return (
    <div className="w-full flex flex-col sm:flex-row gap-4 items-start">
      {/* Left: stat + bar */}
      <div className="flex flex-col gap-3 flex-1 min-w-[160px]">
        <div className="bg-white rounded-xl border border-[#E8DFD0] p-4">
          <p className="text-[10px] text-[#9b9b9b] mb-1">Payments · Last 30 days</p>
          <p className="font-[family-name:var(--font-merriweather)] font-bold text-[28px] text-[#1a1209] leading-none mb-3">₦1.6m</p>
          <div className="h-2 rounded-full bg-[#E8DFD0] overflow-hidden mb-3">
            <div className="h-full rounded-full bg-[#3b2513]" style={{ width: "57%" }} />
          </div>
          <div className="flex flex-col gap-1.5 text-[11px]">
            {[
              { label: "Offline Payments", value: "₦1,200,000" },
              { label: "Deposited", value: "₦800,000" },
              { label: "Not deposited", value: "₦400,000" },
            ].map((row) => (
              <div key={row.label} className="flex justify-between">
                <span className="text-[#9b9b9b]">{row.label}</span>
                <span className="font-semibold text-[#1a1209]">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: donut chart */}
      <div className="bg-white rounded-xl border border-[#E8DFD0] p-4 flex flex-col items-center gap-3 flex-1">
        <p className="text-[11px] font-semibold text-[#1a1209] self-start">Payment Status Breakdown</p>
        <div className="relative">
          <svg width="110" height="110" viewBox="0 0 110 110">
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f3f4f6" strokeWidth="16" />
            {slices.map((seg, i) => (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={seg.color}
                strokeWidth="16"
                strokeDasharray={`${seg.dashArray} ${circumference - seg.dashArray}`}
                strokeDashoffset={seg.dashOffset}
                style={{ transform: "rotate(-90deg)", transformOrigin: `${cx}px ${cy}px` }}
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[11px] font-bold text-[#1a1209]">₦535k</span>
            <span className="text-[9px] text-[#9b9b9b]">total</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 self-start w-full">
          {donutSegments.map((seg) => (
            <div key={seg.label} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: seg.color }} />
              <span className="text-[10px] text-[#6b7280] truncate">{seg.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Mockup: Kanban Pipeline ─── */
function KanbanMockup() {
  const columns = [
    { label: "Enquiry Received", count: 2, cards: ["Adunola M.", "Tunde A."] },
    { label: "Visit Scheduled", count: 0, cards: [] },
    { label: "Trial Booked", count: 0, cards: [] },
    { label: "Offer Made", count: 0, cards: [] },
  ];

  return (
    <div className="w-full bg-white rounded-xl border border-[#E8DFD0] overflow-hidden text-[10px]">
      <div className="px-3 py-2.5 border-b border-[#E8DFD0]">
        <span className="font-semibold text-[#1a1209] text-[11px]">Enquiry Pipeline — Kanban View</span>
      </div>
      <div className="p-2.5 flex gap-2 overflow-x-auto">
        {columns.map((col) => (
          <div key={col.label} className="flex-1 min-w-[70px] flex flex-col gap-1.5">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[9px] font-semibold text-[#6b7280] leading-tight">{col.label}</span>
              <span className="text-[9px] font-bold text-[#3b2513] bg-[#F5EDE0] rounded px-1">{col.count}</span>
            </div>
            <div className="flex flex-col gap-1.5 min-h-[60px]">
              {col.cards.map((name) => (
                <div key={name} className="bg-[#FAF6EF] rounded-lg border border-[#E8DFD0] p-1.5">
                  <p className="font-semibold text-[#1a1209] text-[9px]">{name}</p>
                  <p className="text-[#9b9b9b] text-[9px] mt-0.5">Sunflower · 9 mo</p>
                  <div className="mt-1 flex items-center gap-1">
                    <span className="text-[8px] text-[#c47b2c] bg-[#FFF4E5] rounded px-1 py-0.5">⚠ 6 days</span>
                  </div>
                </div>
              ))}
              {col.cards.length === 0 && (
                <div className="bg-[#f9fafb] rounded-lg border border-dashed border-[#d1d5db] h-12 flex items-center justify-center">
                  <span className="text-[8px] text-[#d1d5db]">Empty</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Mockup: Live Activities ─── */
function LiveActivitiesMockup() {
  const activities = [
    { label: "Health", color: "#dc2626", name: "Zara Mohammed absent", time: "2m ago" },
    { label: "Finance", color: "#059669", name: "Payment received — ₦85,000", time: "15m ago" },
    { label: "Operations", color: "#6b7280", name: "Mr Moore submitted daily log", time: "1h ago" },
    { label: "Compliance", color: "#d97706", name: "DBS check expiring — Grace N.", time: "2h ago" },
    { label: "Enrolment", color: "#7c3aed", name: "New enrolment — Tunde Adeyemi", time: "3h ago" },
  ];

  return (
    <div className="w-full bg-white rounded-xl border border-[#E8DFD0] overflow-hidden text-[10px]">
      <div className="px-3 py-2.5 border-b border-[#E8DFD0] flex items-center justify-between">
        <span className="font-semibold text-[#1a1209] text-[11px]">Live Activities</span>
        <span className="text-[9px] text-[#3b2513] font-semibold">View All →</span>
      </div>
      <div className="flex flex-col">
        {activities.map((a, i) => (
          <div key={i} className="relative px-3 py-2.5 border-b border-[#f3f4f6] last:border-b-0 pl-6">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ background: a.color }} />
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold text-[#1a1209] text-[10px] leading-tight">{a.name}</p>
              <span className="shrink-0 text-[9px] text-[#9b9b9b]">{a.time}</span>
            </div>
            <span
              className="inline-block mt-0.5 rounded-full px-1.5 py-0.5 text-[8px] font-medium"
              style={{ background: `${a.color}18`, color: a.color }}
            >
              {a.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Mockup: AI Ada Chat ─── */
function AiAdaMockup() {
  const messages = [
    {
      role: "ai",
      text: "Good morning, Amaka! I've reviewed overnight data. 3 things need your attention today.",
    },
    { role: "user", text: "Yes, give me the brief." },
    {
      role: "ai",
      text: "1. Zara Mohammed — absent 3 days, welfare check needed.\n2. ₦480K outstanding — Mr. Okafor is a repeat late payer.\n3. Ms. Tunde's logging is at 62% — below your 80% standard.",
    },
    { role: "user", text: "Write me a message for Mrs. Mohammed about Zara" },
  ];

  const prompts = ["Who hasn't paid?", "At-risk children?", "Draft announcement"];

  return (
    <div className="w-full bg-white rounded-xl border border-[#E8DFD0] overflow-hidden flex flex-col text-[10px]">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-[#E8DFD0]">
        <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #1e2d4a 0%, #3b2513 100%)" }}>
          <span className="text-[#ffd58f] text-[8px] font-bold">✦</span>
        </div>
        <div>
          <p className="font-bold text-[#1a1209] text-[10px]">Ada</p>
          <p className="text-[#27e2a4] text-[8px]">• Online</p>
        </div>
        <span className="ml-auto text-[8px] text-[#6b7280]">Professional &amp; Warm · Personalize</span>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-2 p-3 flex-1 overflow-hidden">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-1.5`}>
            {msg.role === "ai" && (
              <div className="w-4 h-4 rounded-full shrink-0 mt-0.5 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1e2d4a 0%, #3b2513 100%)" }}>
                <span className="text-[#ffd58f] text-[6px]">✦</span>
              </div>
            )}
            <div
              className={`max-w-[75%] rounded-xl px-2.5 py-1.5 text-[9px] leading-[1.5] ${
                msg.role === "ai"
                  ? "bg-[#FDF6E8] text-[#1a1209] rounded-tl-sm"
                  : "bg-[#c47b2c] text-white rounded-tr-sm"
              }`}
              style={{ whiteSpace: "pre-line" }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Quick prompts */}
      <div className="flex flex-wrap gap-1 px-3 py-2 border-t border-[#E8DFD0]">
        {prompts.map((p) => (
          <span key={p} className="rounded-full border border-[#E8DFD0] bg-white px-2 py-0.5 text-[8px] text-[#6b7280]">
            {p}
          </span>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-t border-[#E8DFD0]">
        <div className="flex-1 rounded-full border border-[#E8DFD0] bg-[#f9fafb] px-3 py-1.5 text-[9px] text-[#9b9b9b]">
          Ask Ada anything…
        </div>
        <div className="w-6 h-6 rounded-full bg-[#3b2513] flex items-center justify-center shrink-0">
          <span className="text-white text-[8px]">↑</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Mockup: Health & Welfare Reporting ─── */
function ReportingMockup() {
  const reports = [
    {
      label: "Incident Report",
      text: "Dear Mrs. Johnson, just to let you know that Amara had a wonderful morning. She ate a good breakfast and is resting comfortably.",
    },
    {
      label: "Welfare Check",
      text: "Zara Mohammed has been absent for 3 consecutive days. Allergy on file — flag for parent welfare follow-up.",
    },
    {
      label: "Daily Briefing",
      text: "Lion Class logging compliance dropped to 62% this week — below your 80% standard. Suggest a staff reminder.",
    },
  ];

  return (
    <div className="w-full bg-white rounded-xl border border-[#E8DFD0] overflow-hidden text-[10px]">
      <div className="px-3 py-2 border-b border-[#E8DFD0] flex items-center gap-1.5">
        <span className="text-[#c47b2c] text-[10px]">✦</span>
        <span className="font-semibold text-[#1a1209] text-[11px]">Health &amp; Welfare Intelligence</span>
      </div>
      <div className="flex flex-col divide-y divide-[#f3f4f6]">
        {reports.map((r, i) => (
          <div key={i} className="p-3">
            <span className="inline-block text-[8px] font-semibold text-[#3b2513] bg-[#FAF2E1] rounded px-1.5 py-0.5 mb-1.5">
              {r.label}
            </span>
            <p className="text-[9px] text-[#4b5563] leading-[1.5]">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
