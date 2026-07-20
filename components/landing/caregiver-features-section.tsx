"use client";

import Image from "next/image";
import { FadeUp } from "@/components/animations/fade-up";
import { Stagger, StaggerItem } from "@/components/animations/stagger";

export function CaregiverFeaturesSection() {
  return (
    <section className="bg-[#faf2e1] py-16 min-h-screen px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <div className="text-center mb-10 sm:mb-14">
            <h2
              className="font-[family-name:var(--font-fraunces)] font-semibold text-[30px] sm:text-[38px] lg:text-[46px] leading-[1.15] mb-4"
              style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
            >
              <span className="text-[#c17c45]">For Caregivers,</span>{" "}
              <span className="text-[#1a1209]">
                the work you&apos;re already doing becomes visible, and easier to do
              </span>
            </h2>
            <p className="font-[family-name:var(--font-plus-jakarta-sans)] text-[#5a6170] text-[16px] sm:text-[17px] leading-[1.6] max-w-2xl mx-auto">
              This isn&apos;t more paperwork. It&apos;s proof of the work you&apos;re already doing.
            </p>
          </div>
        </FadeUp>

        {/* Row 1: three equal cards */}
        <Stagger className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
          <StaggerItem className="h-full">
            <Card1 />
          </StaggerItem>
          <StaggerItem className="h-full">
            <Card2 />
          </StaggerItem>
          <StaggerItem className="h-full">
            <Card3 />
          </StaggerItem>
        </Stagger>

        {/* Row 2: three equal cards */}
        <Stagger className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <StaggerItem className="h-full">
            <Card4 />
          </StaggerItem>
          <StaggerItem className="h-full">
            <Card5 />
          </StaggerItem>
          <StaggerItem className="h-full">
            <Card6 />
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}

function CardShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative bg-[#fbfaf9] rounded-2xl border border-[#E8DFD0] overflow-hidden w-full ${className}`}>
      {children}
    </div>
  );
}

/* ─── Card 1: Log everything, in seconds (2035:1416) ───
   image9: left 42px, top 169px, 285×245px in 377×458px
   → left 11%, top 37%, width 76%, bottom 10% */
function Card1() {
  return (
    <CardShell className="h-[440px] sm:h-[460px]">
      <div className="pt-7 px-7">
        <h3 className="font-[family-name:var(--font-plus-jakarta-sans)] font-bold text-[#1c1917] text-[15px] sm:text-[17px] leading-snug tracking-[-0.02em] mb-2">
          Log everything, in seconds
        </h3>
        <p className="font-[family-name:var(--font-plus-jakarta-sans)] text-[#6a7074] text-[13px] sm:text-[14px] leading-[1.55] tracking-[-0.02em]">
          Every activity, logged as it happens — so the work you do all day is visible, not invisible.
        </p>
      </div>

      {/* Quick-actions grid */}
      <div className="absolute overflow-hidden rounded-xl"
        style={{ left: '11%', top: '37%', width: '76%', bottom: '10%' }}>
        <Image
          src="/landing/caregiver-features/log-quick-actions.png"
          alt="Quick action logging grid"
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 76vw, 20vw"
        />
      </div>
    </CardShell>
  );
}

/* ─── Card 2: See every alert and need (2049:1431) ───
   image20: left 30px, top 200px, 313×264px in 377×458px
   → left 8%, top 44%, width 83%, bottom 0 */
function Card2() {
  return (
    <CardShell className="h-[440px] sm:h-[460px]">
      <div className="pt-7 px-7">
        <h3 className="font-[family-name:var(--font-plus-jakarta-sans)] font-bold text-[#1c1917] text-[15px] sm:text-[17px] leading-snug tracking-[-0.02em] mb-2">
          See every alert and need, the moment it comes in
        </h3>
        <p className="font-[family-name:var(--font-plus-jakarta-sans)] text-[#6a7074] text-[13px] sm:text-[14px] leading-[1.55] tracking-[-0.02em]">
          Medication reminders, nap alerts, parent messages — nothing gets buried. It surfaces when it matters.
        </p>
      </div>

      {/* Home dashboard with alerts */}
      <div className="absolute overflow-hidden rounded-xl"
        style={{ left: '8%', top: '44%', width: '83%', bottom: 0 }}>
        <Image
          src="/landing/caregiver-features/classroom-home-app.png"
          alt="Caregiver home dashboard with alerts"
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 83vw, 20vw"
        />
      </div>
    </CardShell>
  );
}

/* ─── Card 3: Manage every child and every classroom (2035:1424) ───
   image21: -translate-x-1/2 left calc(50%+0.16px), top 192px, 292×272px in 377×458px
   → effective left 11%, top 42%, width 78%, bottom 0 */
function Card3() {
  return (
    <CardShell className="h-[440px] sm:h-[460px]">
      <div className="pt-7 px-7">
        <h3 className="font-[family-name:var(--font-plus-jakarta-sans)] font-bold text-[#1c1917] text-[15px] sm:text-[17px] leading-snug tracking-[-0.02em] mb-2">
          Manage every child and every classroom, in one app
        </h3>
        <p className="font-[family-name:var(--font-plus-jakarta-sans)] text-[#6a7074] text-[13px] sm:text-[14px] leading-[1.55] tracking-[-0.02em]">
          Multiple kids, multiple rooms — one place to track it all, not six different notebooks.
        </p>
      </div>

      {/* Classroom stats overview */}
      <div className="absolute overflow-hidden rounded-xl"
        style={{ left: '11%', top: '42%', width: '78%', bottom: 0 }}>
        <Image
          src="/landing/caregiver-features/classroom-stats-app.png"
          alt="Classroom and children overview stats"
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 78vw, 20vw"
        />
      </div>
    </CardShell>
  );
}

/* ─── Card 4: Tasks that don't let you forget (2035:1431) ───
   image22: -translate-x-1/2 left calc(50%-0.4px), top 198.88px, 275.5×220.5px in 377×458px
   → effective left 13%, top 43%, width 73%, bottom 8% */
function Card4() {
  return (
    <CardShell className="h-[440px] sm:h-[460px]">
      <div className="pt-7 px-7">
        <h3 className="font-[family-name:var(--font-plus-jakarta-sans)] font-bold text-[#1c1917] text-[15px] sm:text-[17px] leading-snug tracking-[-0.02em] mb-2">
          Tasks that don&apos;t let you forget
        </h3>
        <p className="font-[family-name:var(--font-plus-jakarta-sans)] text-[#6a7074] text-[13px] sm:text-[14px] leading-[1.55] tracking-[-0.02em]">
          Medication, reminders, requests from parents — they land here and stay until done. Nothing depends on memory.
        </p>
      </div>

      {/* Task list */}
      <div className="absolute overflow-hidden rounded-xl"
        style={{ left: '13%', top: '43%', width: '73%', bottom: '8%' }}>
        <Image
          src="/landing/caregiver-features/tasks-app.png"
          alt="Task reminders and pending items"
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 73vw, 20vw"
        />
      </div>
    </CardShell>
  );
}

/* ─── Card 5: Know who's picking up (2035:1438) ───
   image23: -translate-x-1/2 left-1/2, top 181.63px, 357×146px in 377×458px
   → effective left 3%, top 40%, width 95%, height 32% */
function Card5() {
  return (
    <CardShell className="h-[440px] sm:h-[460px]">
      <div className="pt-7 px-7">
        <h3 className="font-[family-name:var(--font-plus-jakarta-sans)] font-bold text-[#1c1917] text-[15px] sm:text-[17px] leading-snug tracking-[-0.02em] mb-2">
          Know who&apos;s picking up, before they arrive
        </h3>
        <p className="font-[family-name:var(--font-plus-jakarta-sans)] text-[#6a7074] text-[13px] sm:text-[14px] leading-[1.55] tracking-[-0.02em]">
          When a parent arranges pickup, you&apos;re told ahead of time — never caught off guard at the door.
        </p>
      </div>

      {/* Pickup status list — wide, short banner */}
      <div className="absolute overflow-hidden rounded-xl"
        style={{ left: '3%', top: '40%', width: '95%', height: '32%' }}>
        <Image
          src="/landing/caregiver-features/pickup-status-app.png"
          alt="Pickup status list for today"
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 95vw, 20vw"
        />
      </div>
    </CardShell>
  );
}

/* ─── Card 6: Talk to parents directly (2035:1451 — empty in Figma) ───
   Keeping existing parent-chat-app.png, centered below text */
function Card6() {
  return (
    <CardShell className="h-[440px] sm:h-[460px]">
      <div className="pt-7 px-7">
        <h3 className="font-[family-name:var(--font-plus-jakarta-sans)] font-bold text-[#1c1917] text-[15px] sm:text-[17px] leading-snug tracking-[-0.02em] mb-2">
          Talk to parents directly
        </h3>
        <p className="font-[family-name:var(--font-plus-jakarta-sans)] text-[#6a7074] text-[13px] sm:text-[14px] leading-[1.55] tracking-[-0.02em]">
          Message, send photos, or hop on a video call — without leaving the app for WhatsApp.
        </p>
      </div>

      {/* Chat thread — centered */}
      <div className="absolute overflow-hidden rounded-xl"
        style={{ left: '50%', transform: 'translateX(-50%)', top: '42%', width: '80%', bottom: 0 }}>
        <Image
          src="/landing/caregiver-features/parent-chat-app.png"
          alt="Direct chat with parent"
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 80vw, 20vw"
        />
      </div>
    </CardShell>
  );
}
