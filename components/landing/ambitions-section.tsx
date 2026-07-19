"use client";

import { FadeUp } from "@/components/animations/fade-up";
import { Stagger, StaggerItem } from "@/components/animations/stagger";

export function AmbitionsSection() {
  const largeCards = ADMIN_CARDS.filter((c) => c.large);
  const smallCards = ADMIN_CARDS.filter((c) => !c.large);

  return (
    <section className="bg-[#FAF2E1] py-16 sm:py-24 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <div className="text-center mb-10 sm:mb-14">
            <h2
              className="font-[family-name:var(--font-fraunces)] font-semibold text-[#3b2513] text-[30px] sm:text-[38px] lg:text-[46px] leading-[1.15] mb-4"
              style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
            >
              For Admins, Simple by design.{" "}
              <em style={{ fontStyle: "italic" }}>Powerful</em> by outcome.
            </h2>
            <p className="font-[family-name:var(--font-plus-jakarta-sans)] text-[#3d444f] text-[16px] sm:text-[17px] leading-[1.6]">
              Three steps. That&apos;s it. CEven is built for busy people — caregivers and parents alike.
            </p>
          </div>
        </FadeUp>

        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {largeCards.map((card) => (
            <StaggerItem key={card.title}>
              <AdminCard card={card} />
            </StaggerItem>
          ))}
        </Stagger>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {smallCards.map((card) => (
            <StaggerItem key={card.title}>
              <AdminCard card={card} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

type Card = { title: string; description: string; mockup: React.ReactNode; large: boolean };

function AdminCard({ card }: { card: Card }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#E8DFD0] flex flex-col">
      <div className="bg-[#F5EDE0] p-5 flex-1 min-h-[180px] flex items-start justify-center overflow-hidden">
        {card.mockup}
      </div>
      <div className="p-5 border-t border-[#E8DFD0]">
        <h3 className="font-[family-name:var(--font-plus-jakarta-sans)] font-semibold text-[#3b2513] text-[15px] mb-1.5">
          {card.title}
        </h3>
        <p className="font-[family-name:var(--font-plus-jakarta-sans)] text-[#6b7280] text-[13px] leading-[1.55]">
          {card.description}
        </p>
      </div>
    </div>
  );
}

const ADMIN_CARDS: Card[] = [
  {
    title: "Crèche logs the day",
    description: "See everything happening across your crèche in one place — attendance, incidents, payments, and daily operations.",
    mockup: <AdminDashboardMockup />,
    large: true,
  },
  {
    title: "You get notified",
    description: "Real-time alerts for anything that matters — unpaid fees, staff incidents, low attendance, or parent escalations.",
    mockup: <AdminAlertsMockup />,
    large: true,
  },
  {
    title: "You focus. Fully.",
    description: "Automate the repetitive. Approve timesheets, track staff performance, and manage your waiting list without the chaos.",
    mockup: <AdminActivitiesMockup />,
    large: false,
  },
  {
    title: "Food program",
    description: "Plan menus, log meals for every child, and generate CACFP reports automatically with zero manual effort.",
    mockup: <AdminFoodMockup />,
    large: false,
  },
  {
    title: "Reporting",
    description: "From financial summaries to incident logs — build any report, export any data, and impress any auditor.",
    mockup: <AdminReportMockup />,
    large: false,
  },
];

function AdminDashboardMockup() {
  return (
    <div className="w-full max-w-[320px] bg-white rounded-xl shadow-sm overflow-hidden text-[10px]">
      <div className="px-3 py-2 bg-[#3b2513] text-white text-[9px] font-semibold flex justify-between">
        <span>Dashboard Overview</span>
        <span>Today</span>
      </div>
      <div className="p-3">
        <div className="grid grid-cols-2 gap-2 mb-3">
          {[
            { label: "Revenue", value: "₦1.6m", up: true },
            { label: "Enrolled", value: "48", up: true },
            { label: "Attendance", value: "90%", up: true },
            { label: "Pending", value: "₦240k", up: false },
          ].map((s) => (
            <div key={s.label} className="bg-[#FAF2E1] rounded-lg p-2">
              <p className="text-[#9b9b9b] text-[9px]">{s.label}</p>
              <p className="font-bold text-[#3b2513] text-[13px]">{s.value}</p>
            </div>
          ))}
        </div>
        <div className="flex items-end gap-1 h-12">
          {[40, 60, 50, 80, 70, 55, 90].map((h, i) => (
            <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: i === 6 ? "#3b2513" : "#E8DFD0" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminAlertsMockup() {
  return (
    <div className="w-full max-w-[300px] flex flex-col gap-2">
      {[
        { icon: "💳", text: "3 outstanding fee payments", sub: "Due this week", color: "#E05C5C" },
        { icon: "📊", text: "Enquiry Pipeline: 8 new leads", sub: "Funnel Time active", color: "#5B8DEF" },
        { icon: "✅", text: "All staff checked in", sub: "On time today", color: "#4CAF82" },
      ].map((n) => (
        <div key={n.text} className="bg-white rounded-xl shadow-sm px-3 py-2.5 flex items-start gap-2.5">
          <span className="text-[14px]">{n.icon}</span>
          <div>
            <p className="text-[#3b2513] text-[11px] font-medium">{n.text}</p>
            <p className="text-[#9b9b9b] text-[10px] mt-0.5">{n.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function AdminActivitiesMockup() {
  return (
    <div className="w-full max-w-[240px] bg-white rounded-xl shadow-sm p-3 text-[10px]">
      <p className="font-semibold text-[#3b2513] mb-2 text-[11px]">Live Activities</p>
      {[
        { time: "Now", text: "Outdoor play · 12 children", dot: "#4CAF82" },
        { time: "12:30", text: "Lunch · Room A", dot: "#C4895A" },
        { time: "1:00", text: "Nap time scheduled", dot: "#9b9b9b" },
      ].map((a) => (
        <div key={a.text} className="flex items-start gap-2 py-1.5 border-b border-gray-50 last:border-0">
          <div className="w-2 h-2 rounded-full mt-0.5 shrink-0" style={{ background: a.dot }} />
          <div>
            <p className="text-[#3b2513]">{a.text}</p>
            <p className="text-[#9b9b9b] text-[9px]">{a.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function AdminFoodMockup() {
  return (
    <div className="w-full max-w-[240px] bg-white rounded-xl shadow-sm p-3 text-[10px]">
      <p className="font-semibold text-[#3b2513] mb-2 text-[11px]">Menu · This week</p>
      {["Monday", "Tuesday", "Wednesday"].map((day, i) => (
        <div key={day} className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0">
          <span className="text-[#9b9b9b]">{day}</span>
          <span className={`font-medium ${i < 2 ? "text-[#4CAF82]" : "text-[#9b9b9b]"}`}>
            {i < 2 ? "Logged ✓" : "Pending"}
          </span>
        </div>
      ))}
      <div className="mt-2 bg-[#FAF2E1] rounded px-2 py-1.5">
        <p className="text-[#3b2513] text-[9px]">CACFP report auto-generated</p>
      </div>
    </div>
  );
}

function AdminReportMockup() {
  return (
    <div className="w-full max-w-[240px] bg-white rounded-xl shadow-sm p-3 text-[10px]">
      <p className="font-semibold text-[#3b2513] mb-2.5 text-[11px]">Recent Reports</p>
      {[
        { label: "Incident Report", date: "Today" },
        { label: "Monthly Financials", date: "Jul 1" },
        { label: "Attendance Summary", date: "Jun 30" },
      ].map((r) => (
        <div key={r.label} className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0">
          <span className="text-[#3b2513]">{r.label}</span>
          <span className="text-[#9b9b9b]">{r.date}</span>
        </div>
      ))}
    </div>
  );
}
