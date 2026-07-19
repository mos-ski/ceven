"use client";

import { FadeUp } from "@/components/animations/fade-up";
import { Stagger, StaggerItem } from "@/components/animations/stagger";

export function CaregiverFeaturesSection() {
  return (
    <section className="bg-white py-16 sm:py-24 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <div className="text-center mb-10 sm:mb-14">
            <h2
              className="font-[family-name:var(--font-fraunces)] font-semibold text-[30px] sm:text-[38px] lg:text-[46px] leading-[1.15] mb-4"
              style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
            >
              <span className="text-[#d94c2e]">For Caregivers,</span>{" "}
              <span className="text-[#1a1209]">the work you&apos;re already doing becomes visible, and easier to do</span>
            </h2>
            <p className="font-[family-name:var(--font-plus-jakarta-sans)] text-[#5a6170] text-[16px] sm:text-[17px] leading-[1.6] max-w-2xl mx-auto">
              This isn&apos;t more paperwork. It&apos;s proof of the work you&apos;re already doing.
            </p>
          </div>
        </FadeUp>

        {/* Row 1: quick actions card + classroom stats card */}
        <Stagger className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5 mb-5">
          <StaggerItem>
            <CaregiverFeatureCard
              title="Log everything, in seconds"
              description="Every activity, logged as it happens — so the work you do all day is visible, not invisible."
            >
              <QuickActionsMockup />
            </CaregiverFeatureCard>
          </StaggerItem>
          <StaggerItem>
            <CaregiverFeatureCard
              title="Manage every child and every classroom, in one app"
              description="Multiple kids, multiple rooms — one place to track it all, not six different notebooks."
            >
              <ClassroomStatsMockup />
            </CaregiverFeatureCard>
          </StaggerItem>
        </Stagger>

        {/* Row 2: three equal cards */}
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <StaggerItem>
            <CaregiverFeatureCard
              title="Tasks that don't let you forget"
              description="Medication, reminders, requests from parents — they land here and stay until done. Nothing depends on memory."
            >
              <TasksMockup />
            </CaregiverFeatureCard>
          </StaggerItem>
          <StaggerItem>
            <CaregiverFeatureCard
              title="Know who's picking up, before they arrive"
              description="When a parent arranges pickup, you're told ahead of time — never caught off guard at the door."
            >
              <PickupStatusMockup />
            </CaregiverFeatureCard>
          </StaggerItem>
          <StaggerItem>
            <CaregiverFeatureCard
              title="Talk to parents directly"
              description="Message, send photos, or hop on a video call — without leaving the app for WhatsApp."
            >
              <ParentChatMockup />
            </CaregiverFeatureCard>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}

function CaregiverFeatureCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
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

/* ─── Mockup: Quick actions grid ─── */
function QuickActionsMockup() {
  const actions = [
    { icon: "📝", label: "Log Activity" },
    { icon: "📋", label: "Log Report" },
    { icon: "💬", label: "Chat" },
    { icon: "✅", label: "Attendance" },
    { icon: "💳", label: "Fees" },
    { icon: "🖼", label: "Gallery" },
    { icon: "💊", label: "Medication", isNew: true },
    { icon: "⚠", label: "Incidents", isNew: true },
  ];
  return (
    <div className="w-full max-w-[300px] bg-white rounded-xl border border-[#E8DFD0] p-3">
      <p className="text-[9px] font-semibold text-[#6b7280] mb-2">Quick Actions</p>
      <div className="grid grid-cols-3 gap-2">
        {actions.map((a) => (
          <div
            key={a.label}
            className="relative flex flex-col items-center justify-center gap-1 rounded-lg bg-[#FAF2E1] py-2.5"
          >
            {a.isNew && (
              <span className="absolute right-1 top-1 rounded-full bg-emerald-500 px-1 py-px text-[6px] font-bold uppercase text-white">
                New
              </span>
            )}
            <span className="text-[14px]">{a.icon}</span>
            <span className="text-[7.5px] font-medium text-[#3b2513] text-center leading-tight">{a.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Mockup: Classroom + children stats ─── */
function ClassroomStatsMockup() {
  return (
    <div className="w-full max-w-[220px] flex flex-col gap-2.5">
      <div className="flex items-center justify-between bg-white rounded-xl border border-[#E8DFD0] px-3 py-2.5">
        <span className="text-[9px] text-[#6b7280]">Welcome back,</span>
        <span className="text-[9.5px] font-semibold text-[#1a1209]">Ms Anu</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-[#FBE4E9] px-3 py-2.5">
          <p className="text-[8px] text-[#9b5a67]">Classroom(s)</p>
          <p className="text-[16px] font-bold text-[#1a1209]">1</p>
        </div>
        <div className="rounded-xl bg-[#E1F5EC] px-3 py-2.5">
          <p className="text-[8px] text-[#2c8a63]">Children</p>
          <p className="text-[16px] font-bold text-[#1a1209]">5</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Mockup: Task/reminder list ─── */
function TasksMockup() {
  const tasks = [
    { title: "Give medicine to Tosin", note: "Kindly give her the drugs when needed.", time: "10:00am · 09:00am" },
    { title: "Nap check — Zain", note: "Confirm nap time and duration.", time: "12:00pm · 11:45am" },
  ];
  return (
    <div className="w-full flex flex-col gap-2">
      {tasks.map((t) => (
        <div key={t.title} className="bg-white rounded-xl border border-[#E8DFD0] p-2.5">
          <div className="flex items-center justify-between mb-1">
            <p className="font-semibold text-[#1a1209] text-[9.5px]">{t.title}</p>
            <span className="rounded-full bg-[#FFF4E5] text-[#c47b2c] text-[8px] font-semibold px-1.5 py-0.5">
              Pending
            </span>
          </div>
          <p className="text-[8.5px] text-[#6b7280] leading-snug">{t.note}</p>
          <p className="text-[8px] text-[#9b9b9b] mt-1">⏰ {t.time}</p>
        </div>
      ))}
    </div>
  );
}

/* ─── Mockup: Pickup status list ─── */
function PickupStatusMockup() {
  const pickups = [
    { name: "Noah Davies", status: "Pending" },
    { name: "Johnson Emma", status: "Sent" },
  ];
  return (
    <div className="w-full bg-white rounded-xl border border-[#E8DFD0] overflow-hidden text-[9px]">
      <div className="px-3 py-2 border-b border-[#E8DFD0]">
        <span className="font-semibold text-[#1a1209] text-[10px]">Today's Pickups</span>
      </div>
      <div className="flex flex-col divide-y divide-[#f3f4f6]">
        {pickups.map((p) => (
          <div key={p.name} className="flex items-center justify-between px-3 py-2.5">
            <span className="flex items-center gap-1.5">
              <span>👤</span>
              <span className="font-medium text-[#1a1209]">{p.name}</span>
            </span>
            <span
              className={`rounded-full text-[8px] font-semibold px-2 py-0.5 ${
                p.status === "Sent" ? "bg-[#E1F5EC] text-[#2c8a63]" : "bg-[#FFF4E5] text-[#c47b2c]"
              }`}
            >
              {p.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Mockup: Direct parent chat ─── */
function ParentChatMockup() {
  return (
    <div className="w-full bg-white rounded-xl border border-[#E8DFD0] overflow-hidden text-[9px] flex flex-col">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-[#E8DFD0]">
        <div className="w-5 h-5 rounded-full bg-[#FAF2E1] flex items-center justify-center text-[8px] font-bold text-[#3b2513]">
          M
        </div>
        <span className="font-semibold text-[#1a1209] text-[10px]">Mercy Itom</span>
        <span className="ml-auto text-[10px]">📹</span>
      </div>
      <div className="flex flex-col gap-1.5 p-3">
        <div className="self-end max-w-[75%] rounded-xl rounded-tr-sm bg-[#c47b2c] text-white px-2 py-1.5">
          <p className="text-[9px]">Hi, Mrs Itom</p>
          <p className="text-[7px] opacity-70 mt-0.5">16:50 ✓✓</p>
        </div>
        <div className="self-start max-w-[75%] rounded-xl rounded-tl-sm bg-[#FAF6EF] text-[#1a1209] px-2 py-1.5">
          <p className="text-[9px]">Good afternoon Ma, how can I help you?</p>
          <p className="text-[7px] opacity-50 mt-0.5">16:50</p>
        </div>
      </div>
    </div>
  );
}
