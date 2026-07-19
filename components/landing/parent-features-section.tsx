"use client";

import { FadeUp } from "@/components/animations/fade-up";
import { Stagger, StaggerItem } from "@/components/animations/stagger";

export function ParentFeaturesSection() {
  return (
    <section className="bg-white py-16 sm:py-24 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <div className="text-center mb-10 sm:mb-14">
            <h2
              className="font-[family-name:var(--font-fraunces)] font-semibold text-[30px] sm:text-[38px] lg:text-[46px] leading-[1.15] mb-4"
              style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
            >
              <span className="text-[#d94c2e]">For Parent,</span>{" "}
              <span className="text-[#1a1209]">
                you&apos;re never in the dark, and you can still reach in when you need to
              </span>
            </h2>
            <p className="font-[family-name:var(--font-plus-jakarta-sans)] text-[#5a6170] text-[16px] sm:text-[17px] leading-[1.6] max-w-2xl mx-auto">
              You&apos;re not checking in on your child. You&apos;re checking in on the day.
            </p>
          </div>
        </FadeUp>

        {/* Row 1: large daily-log card + notifications card */}
        <Stagger className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5 mb-5">
          <StaggerItem>
            <ParentFeatureCard
              title="See what your child is doing, right now"
              description="From wherever you are — mood, activity, hygiene, everything, logged as it happens. Not a summary later. The actual day, live."
            >
              <MomentAndLogMockup />
            </ParentFeatureCard>
          </StaggerItem>
          <StaggerItem>
            <ParentFeatureCard
              title="You get notified"
              description="The moment something's worth knowing, it reaches you. No calling to check. No waiting for pickup."
            >
              <NotificationsMockup />
            </ParentFeatureCard>
          </StaggerItem>
        </Stagger>

        {/* Row 2: three equal cards */}
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <StaggerItem>
            <ParentFeatureCard
              title="One conversation, everyone who needs to be in it"
              description="You, the other parent, the admin, and the caregiver — one thread, not four separate conversations to keep track of."
            >
              <SharedThreadMockup />
            </ParentFeatureCard>
          </StaggerItem>
          <StaggerItem>
            <ParentFeatureCard
              title="AI summary of your child's day"
              description="Ask for a read on mood, meals, or the whole day, and get a real answer back — not a scroll through old messages trying to piece it together."
            >
              <AiSummaryMockup />
            </ParentFeatureCard>
          </StaggerItem>
          <StaggerItem>
            <ParentFeatureCard
              title="Send a special request"
              description="Forgot to mention something at drop-off? Send it straight to the caregiver — medication, an errand, anything — no waiting till pickup to remember."
            >
              <SpecialRequestMockup />
            </ParentFeatureCard>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}

function ParentFeatureCard({
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

/* ─── Mockup: Moment post + structured daily log ─── */
function MomentAndLogMockup() {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-4 items-start">
      <div className="bg-white rounded-xl border border-[#E8DFD0] overflow-hidden flex-1 min-w-[160px] max-w-[220px]">
        <div className="relative h-[110px] bg-gradient-to-br from-[#f3d9c4] to-[#e8b98f] flex items-center justify-center">
          <span className="absolute top-2 left-2 rounded-full bg-[#3b2513] text-white text-[8px] font-semibold px-2 py-0.5">
            Playtime
          </span>
          <span className="text-3xl">🧸</span>
        </div>
        <div className="p-2.5">
          <p className="text-[10px] font-semibold text-[#1a1209] leading-snug mb-1">
            Esther had a wonderful time playing with her friends today!
          </p>
          <p className="text-[8px] text-[#9b9b9b] mb-1.5">2 hours ago · Posted by Sarah Johnson</p>
          <div className="flex items-center gap-2 text-[8px] text-[#6b7280]">
            <span>💬 Comment</span>
            <span>⤓ Save</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E8DFD0] overflow-hidden flex-1 min-w-[160px] text-[9px]">
        <div className="bg-[#3b2513] text-white px-3 py-2 flex items-center gap-1.5">
          <span>📅</span>
          <span className="font-semibold">Friday, 9 January</span>
        </div>
        <div className="flex flex-col divide-y divide-[#f3f4f6]">
          {[
            { icon: "💗", label: "Mood", value: "Playful, Happy" },
            { icon: "🍽", label: "Meals", value: "3" },
            { icon: "🌙", label: "Nap Time", value: "3h 35m + 40m" },
            { icon: "🚽", label: "Hygiene", value: "1 urine, 2 poop" },
            { icon: "⚠", label: "Health & Safety", value: "Nil" },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between px-3 py-1.5">
              <span className="flex items-center gap-1.5 text-[#6b7280]">
                <span>{row.icon}</span>
                {row.label}
              </span>
              <span className="font-semibold text-[#1a1209] text-right">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Mockup: Notification feed ─── */
function NotificationsMockup() {
  const notifications = [
    { icon: "🚪", text: "Esther checked in at 8:03am", time: "just now" },
    { icon: "📸", text: "New photo posted from Playtime", time: "12m ago" },
    { icon: "💊", text: "Medication given: Vitamin D drops", time: "1h ago" },
    { icon: "📋", text: "Daily report ready for Esther", time: "4h ago" },
  ];
  return (
    <div className="w-full bg-white rounded-xl border border-[#E8DFD0] overflow-hidden text-[10px]">
      <div className="px-3 py-2.5 border-b border-[#E8DFD0]">
        <span className="font-semibold text-[#1a1209] text-[11px]">Notifications</span>
      </div>
      <div className="flex flex-col">
        {notifications.map((n, i) => (
          <div key={i} className="flex items-start gap-2 px-3 py-2.5 border-b border-[#f3f4f6] last:border-b-0">
            <span className="shrink-0">{n.icon}</span>
            <div className="min-w-0">
              <p className="font-semibold text-[#1a1209] text-[9.5px] leading-tight">{n.text}</p>
              <p className="text-[8px] text-[#9b9b9b] mt-0.5">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Mockup: Shared thread (parent, second parent, admin, caregiver) ─── */
function SharedThreadMockup() {
  const participants = ["You", "Tunde (Dad)", "Admin", "Ms. Bello"];
  const messages = [
    { from: "Ms. Bello", text: "Esther had a great nap today!", mine: false },
    { from: "You", text: "That's great to hear, thank you!", mine: true },
    { from: "Tunde (Dad)", text: "Can she stay a bit later on Friday?", mine: false },
  ];
  return (
    <div className="w-full bg-white rounded-xl border border-[#E8DFD0] overflow-hidden text-[9px] flex flex-col">
      <div className="px-3 py-2 border-b border-[#E8DFD0]">
        <p className="font-semibold text-[#1a1209] text-[10px]">Esther's Circle</p>
        <div className="flex -space-x-1.5 mt-1">
          {participants.map((p) => (
            <div
              key={p}
              className="w-4 h-4 rounded-full bg-[#FAF2E1] border border-white flex items-center justify-center text-[6px] font-bold text-[#3b2513]"
              title={p}
            >
              {p[0]}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-1.5 p-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.mine ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-xl px-2 py-1.5 ${
                m.mine ? "bg-[#c47b2c] text-white rounded-tr-sm" : "bg-[#FAF6EF] text-[#1a1209] rounded-tl-sm"
              }`}
            >
              {!m.mine && <p className="text-[7px] font-semibold opacity-60 mb-0.5">{m.from}</p>}
              <p className="text-[9px] leading-snug">{m.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Mockup: AI summary suggestion chips ─── */
function AiSummaryMockup() {
  const prompts = [
    { icon: "📄", text: "Summarize today's report" },
    { icon: "📈", text: "Any health patterns this week?" },
    { icon: "😊", text: "How was my child's mood?" },
    { icon: "📖", text: "What learning activity was done?" },
  ];
  return (
    <div className="w-full bg-white rounded-xl border border-[#E8DFD0] overflow-hidden flex flex-col text-[10px]">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-[#E8DFD0]">
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg, #1e2d4a 0%, #3b2513 100%)" }}
        >
          <span className="text-[#ffd58f] text-[8px] font-bold">✦</span>
        </div>
        <div>
          <p className="font-bold text-[#1a1209] text-[10px]">Ada</p>
          <p className="text-[#27e2a4] text-[8px]">• Ask me anything</p>
        </div>
      </div>
      <div className="flex flex-col gap-1.5 p-3">
        {prompts.map((p) => (
          <div
            key={p.text}
            className="flex items-center gap-1.5 rounded-lg border border-[#E8DFD0] bg-[#FAF6EF] px-2.5 py-1.5"
          >
            <span className="text-[10px]">{p.icon}</span>
            <span className="text-[9px] text-[#3b2513] font-medium">{p.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Mockup: Send a special request ─── */
function SpecialRequestMockup() {
  return (
    <div className="w-full bg-white rounded-xl border border-[#E8DFD0] overflow-hidden text-[10px]">
      <div className="px-3 py-2.5 border-b border-[#E8DFD0] flex items-center justify-between">
        <span className="font-semibold text-[#1a1209] text-[11px]">Special Requests</span>
        <span className="rounded-lg border border-dashed border-[#c47b2c] text-[#c47b2c] text-[8px] font-semibold px-2 py-1">
          + New Request
        </span>
      </div>
      <div className="p-3 flex flex-col gap-2">
        <div className="rounded-lg border border-[#E8DFD0] p-2.5">
          <div className="flex items-center justify-between mb-1">
            <p className="font-semibold text-[#1a1209] text-[9.5px]">Give medicine to Tosin</p>
            <span className="rounded-full bg-[#FFF4E5] text-[#c47b2c] text-[8px] font-semibold px-1.5 py-0.5">
              Pending
            </span>
          </div>
          <p className="text-[8.5px] text-[#6b7280] leading-snug">Kindly give her the drugs when needed.</p>
          <p className="text-[8px] text-[#9b9b9b] mt-1">⏰ 10:00am · 🔔 09:00am</p>
        </div>
      </div>
    </div>
  );
}
