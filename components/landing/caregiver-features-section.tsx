"use client";

import Image from "next/image";
import { FadeUp } from "@/components/animations/fade-up";
import { Stagger, StaggerItem } from "@/components/animations/stagger";

export function CaregiverFeaturesSection() {
  return (
    <section className="bg-[#faf2e1] py-16 sm:py-24 px-4 sm:px-8 lg:px-16">
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
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          <StaggerItem>
            <CaregiverFeatureCard
              title="Log everything, in seconds"
              description="Every activity, logged as it happens — so the work you do all day is visible, not invisible."
            >
              <LogMockup />
            </CaregiverFeatureCard>
          </StaggerItem>
          <StaggerItem>
            <CaregiverFeatureCard
              title="See every alert and need, the moment it comes in"
              description="Medication reminders, nap alerts, parent messages — nothing gets buried. It surfaces when it matters."
            >
              <HomeDashboardMockup />
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
              <PickupMockup />
            </CaregiverFeatureCard>
          </StaggerItem>
          <StaggerItem>
            <CaregiverFeatureCard
              title="Talk to parents directly"
              description="Message, send photos, or hop on a video call — without leaving the app for WhatsApp."
            >
              <ChatMockup />
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

/* ─── Quick actions grid screenshot ─── */
function LogMockup() {
  return (
    <div className="absolute inset-0 flex items-end justify-center pb-0">
      <div className="relative w-[82%] h-[88%] rounded-t-xl overflow-hidden shadow-lg">
        <Image
          src="/landing/caregiver-features/log-quick-actions.png"
          alt="Quick action logging grid"
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 80vw, 20vw"
        />
      </div>
    </div>
  );
}

/* ─── Home dashboard with alerts ─── */
function HomeDashboardMockup() {
  return (
    <div className="absolute inset-0 flex items-end justify-center pb-0">
      <div className="relative w-[82%] h-[88%] rounded-t-xl overflow-hidden shadow-lg">
        <Image
          src="/landing/caregiver-features/classroom-home-app.png"
          alt="Caregiver home dashboard with alerts"
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 80vw, 20vw"
        />
      </div>
    </div>
  );
}

/* ─── Classroom stats dashboard ─── */
function ClassroomStatsMockup() {
  return (
    <div className="absolute inset-0 flex items-end justify-center pb-0">
      <div className="relative w-[82%] h-[88%] rounded-t-xl overflow-hidden shadow-lg">
        <Image
          src="/landing/caregiver-features/classroom-stats-app.png"
          alt="Classroom and children overview stats"
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 80vw, 20vw"
        />
      </div>
    </div>
  );
}

/* ─── Tasks list screenshot ─── */
function TasksMockup() {
  return (
    <div className="absolute inset-0 flex items-end justify-center pb-0">
      <div className="relative w-[82%] h-[88%] rounded-t-xl overflow-hidden shadow-lg">
        <Image
          src="/landing/caregiver-features/tasks-app.png"
          alt="Task reminders and pending items"
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 80vw, 20vw"
        />
      </div>
    </div>
  );
}

/* ─── Pickup status list screenshot ─── */
function PickupMockup() {
  return (
    <div className="absolute inset-0 flex items-end justify-center pb-0">
      <div className="relative w-[82%] h-[88%] rounded-t-xl overflow-hidden shadow-lg">
        <Image
          src="/landing/caregiver-features/pickup-status-app.png"
          alt="Pickup status list for today"
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 80vw, 20vw"
        />
      </div>
    </div>
  );
}

/* ─── Parent chat screenshot ─── */
function ChatMockup() {
  return (
    <div className="absolute inset-0 flex items-end justify-center pb-0">
      <div className="relative w-[82%] h-[88%] rounded-t-xl overflow-hidden shadow-lg">
        <Image
          src="/landing/caregiver-features/parent-chat-app.png"
          alt="Direct chat with parent"
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 80vw, 20vw"
        />
      </div>
    </div>
  );
}
