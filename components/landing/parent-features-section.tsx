"use client";

import Image from "next/image";
import { FadeUp } from "@/components/animations/fade-up";
import { Stagger, StaggerItem } from "@/components/animations/stagger";

export function ParentFeaturesSection() {
  return (
    <section className="bg-[#faf2e1] py-16 min-h-screen px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <div className="text-center mb-10 sm:mb-14">
            <h2
              className="font-[family-name:var(--font-merriweather-import)] font-bold text-[30px] sm:text-[38px] lg:text-[46px] leading-[1.15] mb-4"
            >
              <span className="text-[#c17c45]">For Parent,</span>{" "}
              <span className="text-[#1a1209]">
                you&apos;re never in the dark, and you can still reach in when you need to
              </span>
            </h2>
            <p className="font-[family-name:var(--font-urbanist-import)] text-[#5a6170] text-[16px] sm:text-[17px] leading-[1.6] max-w-2xl mx-auto">
              You&apos;re not checking in on your child. You&apos;re checking in on the day.
            </p>
          </div>
        </FadeUp>

        {/* Row 1: large "see what your child is doing" + "you get notified" */}
        <Stagger className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5 mb-5">
          <StaggerItem className="h-full">
            <Card1 />
          </StaggerItem>
          <StaggerItem className="h-full">
            <Card2 />
          </StaggerItem>
        </Stagger>

        {/* Row 2: three equal cards */}
        <Stagger className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <StaggerItem className="h-full">
            <Card3 />
          </StaggerItem>
          <StaggerItem className="h-full">
            <Card4 />
          </StaggerItem>
          <StaggerItem className="h-full">
            <Card5 />
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}

/* ─── Shared card shell ─── */
function CardShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative bg-[#fbfaf9] rounded-2xl border border-[#E8DFD0] overflow-hidden w-full ${className}`}>
      {children}
    </div>
  );
}

/* ─── Card 1: "See what your child is doing, right now" (2fr large) ───
   Figma: text top-left (max-w ~48%), moment photo lower-left, daily log right column */
function Card1() {
  return (
    <CardShell className="h-[440px] sm:h-[460px]">
      {/* Text — top-left, z above images */}
      <div className="absolute top-0 left-0 z-10 pt-7 px-7 max-w-[52%]">
        <h3 className="font-[family-name:var(--font-urbanist-import)] font-bold text-[#1c1917] text-[15px] sm:text-[17px] leading-snug tracking-[-0.02em] mb-2">
          See what your child is doing, right now
        </h3>
        <p className="font-[family-name:var(--font-urbanist-import)] text-[#6a7074] text-[13px] sm:text-[14px] leading-[1.55] tracking-[-0.02em]">
          From wherever you are — mood, activity, hygiene, everything, logged as it happens. Not a summary later. The actual day, live.
        </p>
      </div>

      {/* Moment post photo — lower left */}
      <div className="absolute rounded-xl overflow-hidden"
        style={{ left: '4%', top: '37%', width: '36%', bottom: '2%' }}>
        <Image
          src="/landing/parent-features/moment-photo.png"
          alt="Child playtime moment post"
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 36vw, 18vw"
        />
      </div>

      {/* Daily log app — right column, starts from near top */}
      <div className="absolute rounded-xl overflow-hidden"
        style={{ left: '57%', top: '7%', width: '36%', bottom: 0 }}>
        <Image
          src="/landing/parent-features/daily-log-app.png"
          alt="Daily activity log app"
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 36vw, 18vw"
        />
      </div>
    </CardShell>
  );
}

/* ─── Card 2: "You get notified" (1fr small) ─── */
function Card2() {
  return (
    <CardShell className="h-[440px] sm:h-[460px]">
      <div className="pt-7 px-7">
        <h3 className="font-[family-name:var(--font-urbanist-import)] font-bold text-[#1c1917] text-[15px] sm:text-[17px] leading-snug tracking-[-0.02em] mb-2">
          You get notified
        </h3>
        <p className="font-[family-name:var(--font-urbanist-import)] text-[#6a7074] text-[13px] sm:text-[14px] leading-[1.55] tracking-[-0.02em]">
          The moment something&apos;s worth knowing, it reaches you. No calling to check. No waiting for pickup.
        </p>
      </div>

      {/* Notifications feed — centered, lower */}
      <div className="absolute rounded-xl overflow-hidden"
        style={{ left: '14%', top: '38%', right: '14%', bottom: '2%' }}>
        <Image
          src="/landing/parent-features/notifications-app.png"
          alt="Real-time notifications feed"
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 70vw, 18vw"
        />
      </div>
    </CardShell>
  );
}

/* ─── Card 3: "One conversation, everyone who needs to be in it" ─── */
function Card3() {
  return (
    <CardShell className="h-[440px] sm:h-[460px]">
      <div className="pt-7 px-7">
        <h3 className="font-[family-name:var(--font-urbanist-import)] font-bold text-[#1c1917] text-[15px] sm:text-[17px] leading-snug tracking-[-0.02em] mb-2">
          One conversation, everyone who needs to be in it
        </h3>
        <p className="font-[family-name:var(--font-urbanist-import)] text-[#6a7074] text-[13px] sm:text-[14px] leading-[1.55] tracking-[-0.02em]">
          You, the other parent, the admin, and the caregiver — one thread, not four separate conversations to keep track of.
        </p>
      </div>

      {/* Chat thread — centered horizontally */}
      <div className="absolute rounded-xl overflow-hidden"
        style={{ left: '50%', transform: 'translateX(-50%)', top: '40%', width: '68%', bottom: '2%' }}>
        <Image
          src="/landing/parent-features/shared-thread-app.png"
          alt="Shared family conversation thread"
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 68vw, 22vw"
        />
      </div>
    </CardShell>
  );
}

/* ─── Card 4: "AI summary of your child's day" ─── */
function Card4() {
  return (
    <CardShell className="h-[440px] sm:h-[460px]">
      <div className="pt-7 px-7">
        <h3 className="font-[family-name:var(--font-urbanist-import)] font-bold text-[#1c1917] text-[15px] sm:text-[17px] leading-snug tracking-[-0.02em] mb-2">
          AI summary of your child&apos;s day
        </h3>
        <p className="font-[family-name:var(--font-urbanist-import)] text-[#6a7074] text-[13px] sm:text-[14px] leading-[1.55] tracking-[-0.02em]">
          Ask for a read on mood, meals, or the whole day, and get a real answer back — not a scroll through old messages trying to piece it together.
        </p>
      </div>

      {/* AI prompts list — lower left, matching Figma (left-aligned) */}
      <div className="absolute rounded-xl overflow-hidden"
        style={{ left: '8%', top: '58%', width: '52%', bottom: '4%' }}>
        <Image
          src="/landing/parent-features/ai-summary-app.png"
          alt="AI day summary quick prompts"
          fill
          className="object-contain object-top"
          sizes="(max-width: 768px) 52vw, 18vw"
        />
      </div>
    </CardShell>
  );
}

/* ─── Card 5: "Send a special request" ─── */
function Card5() {
  return (
    <CardShell className="h-[440px] sm:h-[460px]">
      <div className="pt-7 px-7">
        <h3 className="font-[family-name:var(--font-urbanist-import)] font-bold text-[#1c1917] text-[15px] sm:text-[17px] leading-snug tracking-[-0.02em] mb-2">
          Send a special request
        </h3>
        <p className="font-[family-name:var(--font-urbanist-import)] text-[#6a7074] text-[13px] sm:text-[14px] leading-[1.55] tracking-[-0.02em]">
          Forgot to mention something at drop-off? Send it straight to the caregiver — medication, an errand, anything — no waiting till pickup to remember.
        </p>
      </div>

      {/* Special requests screen — centered */}
      <div className="absolute rounded-xl overflow-hidden"
        style={{ left: '50%', transform: 'translateX(-50%)', top: '38%', width: '64%', bottom: '2%' }}>
        <Image
          src="/landing/parent-features/special-request-app.png"
          alt="Special requests screen"
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 64vw, 22vw"
        />
      </div>
    </CardShell>
  );
}
