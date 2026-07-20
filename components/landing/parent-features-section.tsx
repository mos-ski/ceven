"use client";

import Image from "next/image";
import { FadeUp } from "@/components/animations/fade-up";
import { Stagger, StaggerItem } from "@/components/animations/stagger";

export function ParentFeaturesSection() {
  return (
    <section className="bg-[#faf2e1] py-16 sm:py-24 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <div className="text-center mb-10 sm:mb-14">
            <h2
              className="font-[family-name:var(--font-fraunces)] font-semibold text-[30px] sm:text-[38px] lg:text-[46px] leading-[1.15] mb-4"
              style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
            >
              <span className="text-[#c17c45]">For Parent,</span>{" "}
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
    <div className="bg-[#fbfaf9] rounded-2xl overflow-hidden flex flex-col h-full border border-[#E8DFD0]">
      <div className="p-5 sm:p-6">
        <h3 className="font-[family-name:var(--font-plus-jakarta-sans)] font-bold text-[#1c1917] text-[15px] sm:text-[16px] leading-snug mb-2">
          {title}
        </h3>
        <p className="font-[family-name:var(--font-plus-jakarta-sans)] text-[#6a7074] text-[13px] sm:text-[14px] leading-[1.55]">
          {description}
        </p>
      </div>
      <div className="relative flex-1 min-h-[240px] overflow-hidden">
        {children}
      </div>
    </div>
  );
}

/* ─── Moment photo (left) + daily log screenshot (right) ─── */
function MomentAndLogMockup() {
  return (
    <div className="absolute inset-0 flex items-end justify-center gap-3 px-5 pb-0">
      <div className="relative w-[46%] h-[90%] rounded-t-xl overflow-hidden shadow-lg flex-shrink-0">
        <Image
          src="/landing/parent-features/moment-photo.jpg"
          alt="Child playing at crèche"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 40vw, 20vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <span className="absolute top-2.5 left-2.5 rounded-full bg-[#3b2513] text-white text-[8px] font-semibold px-2 py-0.5">
          Playtime
        </span>
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-white text-[9px] font-semibold leading-snug">
            Esther had a wonderful time playing with her friends today!
          </p>
          <p className="text-white/60 text-[8px] mt-0.5">2 hours ago · Posted by Sarah Johnson</p>
        </div>
      </div>
      <div className="relative w-[44%] h-[96%] rounded-t-xl overflow-hidden shadow-lg flex-shrink-0">
        <Image
          src="/landing/parent-features/daily-log-app.png"
          alt="Structured daily activity log"
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 40vw, 20vw"
        />
      </div>
    </div>
  );
}

/* ─── Notification feed screenshot ─── */
function NotificationsMockup() {
  return (
    <div className="absolute inset-0 flex items-end justify-center pb-0">
      <div className="relative w-[82%] h-[88%] rounded-t-xl overflow-hidden shadow-lg">
        <Image
          src="/landing/parent-features/notifications-app.png"
          alt="Real-time push notifications"
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 80vw, 22vw"
        />
      </div>
    </div>
  );
}

/* ─── Shared conversation thread screenshot ─── */
function SharedThreadMockup() {
  return (
    <div className="absolute inset-0 flex items-end justify-center pb-0">
      <div className="relative w-[82%] h-[88%] rounded-t-xl overflow-hidden shadow-lg">
        <Image
          src="/landing/parent-features/shared-thread-app.png"
          alt="Shared family conversation thread"
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 80vw, 20vw"
        />
      </div>
    </div>
  );
}

/* ─── AI summary screenshot ─── */
function AiSummaryMockup() {
  return (
    <div className="absolute inset-0 flex items-end justify-center pb-0">
      <div className="relative w-[82%] h-[88%] rounded-t-xl overflow-hidden shadow-lg">
        <Image
          src="/landing/parent-features/ai-summary-app.png"
          alt="AI-powered day summary"
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 80vw, 20vw"
        />
      </div>
    </div>
  );
}

/* ─── Special request screenshot ─── */
function SpecialRequestMockup() {
  return (
    <div className="absolute inset-0 flex items-end justify-center pb-0">
      <div className="relative w-[82%] h-[88%] rounded-t-xl overflow-hidden shadow-lg">
        <Image
          src="/landing/parent-features/special-request-app.png"
          alt="Send a special request to caregiver"
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 80vw, 20vw"
        />
      </div>
    </div>
  );
}
