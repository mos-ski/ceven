"use client";

import { FadeUp } from "@/components/animations/fade-up";
import { Stagger, StaggerItem } from "@/components/animations/stagger";

export function HowItWorksSection() {
  const largeCards = CAREGIVER_CARDS.filter((c) => c.large);
  const smallCards = CAREGIVER_CARDS.filter((c) => !c.large);

  return (
    <section className="bg-white py-16 sm:py-24 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <div className="text-center mb-10 sm:mb-14">
            <h2
              className="font-[family-name:var(--font-fraunces)] font-semibold text-[#3b2513] text-[30px] sm:text-[38px] lg:text-[46px] leading-[1.15] mb-4"
              style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
            >
              For Caregivers, you spend time with children, not paperwork.
            </h2>
            <p className="font-[family-name:var(--font-plus-jakarta-sans)] text-[#3d444f] text-[16px] sm:text-[17px] leading-[1.6]">
              Three steps. That&apos;s it. CEven is built for busy people — caregivers and parents alike.
            </p>
          </div>
        </FadeUp>

        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {largeCards.map((card) => (
            <StaggerItem key={card.title}>
              <CaregiverCard card={card} />
            </StaggerItem>
          ))}
        </Stagger>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {smallCards.map((card) => (
            <StaggerItem key={card.title}>
              <CaregiverCard card={card} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

type Card = { title: string; description: string; mockup: React.ReactNode; large: boolean };

function CaregiverCard({ card }: { card: Card }) {
  return (
    <div className="bg-[#FAF2E1] rounded-2xl overflow-hidden border border-[#E8DFD0] flex flex-col">
      <div className="bg-[#F0E6D3] p-5 flex-1 min-h-[180px] flex items-start justify-center overflow-hidden">
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

const CAREGIVER_CARDS: Card[] = [
  {
    title: "Crèche logs the day",
    description: "Guided forms make it easy to log meals, activities, naps, and incidents. Structured, fast, and professional.",
    mockup: <CaregiverLogMockup />,
    large: true,
  },
  {
    title: "You get notified",
    description: "See confirmations and parent responses instantly. Know your logs are seen and appreciated in real time.",
    mockup: <CaregiverNotifyMockup />,
    large: true,
  },
  {
    title: "You focus. Fully.",
    description: "Less admin, more care. Spend your energy where it matters — with the children in your care.",
    mockup: <CaregiverFocusMockup />,
    large: false,
  },
  {
    title: "Food program",
    description: "Simple meal recording, automatic reports, and easy menu planning that keeps compliance effortless.",
    mockup: <CaregiverFoodMockup />,
    large: false,
  },
  {
    title: "Reporting",
    description: "Submit daily reports, track incidents, and share progress with parents and administrators seamlessly.",
    mockup: <CaregiverReportMockup />,
    large: false,
  },
];

function CaregiverLogMockup() {
  const items = ["Activities", "Meals", "Nap Time", "Hygiene", "Health"];
  return (
    <div className="w-full max-w-[320px] bg-white rounded-xl shadow-sm overflow-hidden text-[11px]">
      <div className="px-3 py-2.5 bg-[#3b2513] text-white text-[10px] font-semibold">
        Log Entry · Emma Johnson
      </div>
      <div className="p-3 flex flex-col gap-1.5">
        {items.map((item, i) => (
          <div key={item} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
            <span className="text-[#6b7280]">{item}</span>
            <div className={`h-1.5 rounded-full ${i < 3 ? "bg-[#4CAF82] w-16" : "bg-[#E8DFD0] w-12"}`} />
          </div>
        ))}
        <button className="mt-2 w-full bg-[#3b2513] text-white text-[11px] font-medium py-2 rounded-lg">
          Submit Report
        </button>
      </div>
    </div>
  );
}

function CaregiverNotifyMockup() {
  return (
    <div className="w-full max-w-[300px] flex flex-col gap-2">
      {[
        { text: "Report for Emma submitted ✓", sub: "Sent to 2 parents", color: "#4CAF82" },
        { text: "Amara Obi's parent replied", sub: "\"Thank you so much!\"", color: "#C4895A" },
        { text: "Lunch logged for 12 children", sub: "Completed · 12:15 PM", color: "#5B8DEF" },
      ].map((n) => (
        <div key={n.text} className="bg-white rounded-xl shadow-sm px-3 py-2.5 flex items-start gap-2.5">
          <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: n.color }} />
          <div>
            <p className="text-[#3b2513] text-[11px] font-medium">{n.text}</p>
            <p className="text-[#9b9b9b] text-[10px] mt-0.5">{n.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function CaregiverFocusMockup() {
  return (
    <div className="w-full max-w-[240px] bg-white rounded-xl shadow-sm p-3 flex flex-col gap-2">
      <p className="text-[#3b2513] font-semibold text-[10px] mb-1">Today&apos;s Schedule</p>
      {[
        { time: "9:00", activity: "Morning circle", done: true },
        { time: "10:30", activity: "Outdoor play", done: true },
        { time: "12:00", activity: "Lunch", done: false },
        { time: "13:00", activity: "Nap time", done: false },
      ].map((s) => (
        <div key={s.time} className="flex items-center gap-2 text-[10px]">
          <span className="text-[#9b9b9b] w-10 shrink-0">{s.time}</span>
          <div className={`w-2 h-2 rounded-full shrink-0 ${s.done ? "bg-[#4CAF82]" : "bg-[#E8DFD0]"}`} />
          <span className={s.done ? "text-[#9b9b9b] line-through" : "text-[#3b2513]"}>{s.activity}</span>
        </div>
      ))}
    </div>
  );
}

function CaregiverFoodMockup() {
  return (
    <div className="w-full max-w-[240px] bg-white rounded-xl shadow-sm p-3 text-[10px]">
      <p className="font-semibold text-[#3b2513] mb-2 text-[11px]">Lunch logged</p>
      <div className="flex flex-col gap-1.5">
        {[
          { child: "Emma J.", food: "Rice & beans ✓" },
          { child: "Kofi A.", food: "Rice & beans ✓" },
          { child: "Amara O.", food: "Refused lunch" },
        ].map((r) => (
          <div key={r.child} className="flex justify-between items-center py-1 border-b border-gray-50">
            <span className="text-[#6b7280]">{r.child}</span>
            <span className={r.food.includes("Refused") ? "text-[#E05C5C]" : "text-[#4CAF82]"}>{r.food}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CaregiverReportMockup() {
  return (
    <div className="w-full max-w-[240px] bg-white rounded-xl shadow-sm p-3 text-[10px]">
      <p className="font-semibold text-[#3b2513] mb-2.5 text-[11px]">Today&apos;s Summary</p>
      {[
        { label: "Children logged", value: "12 / 12" },
        { label: "Reports sent", value: "12" },
        { label: "Parent replies", value: "8" },
      ].map((s) => (
        <div key={s.label} className="flex justify-between py-1.5 border-b border-gray-50 last:border-0">
          <span className="text-[#9b9b9b]">{s.label}</span>
          <span className="font-semibold text-[#3b2513]">{s.value}</span>
        </div>
      ))}
    </div>
  );
}
