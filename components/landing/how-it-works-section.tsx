"use client";

import { FadeUp } from "@/components/animations/fade-up";
import { Stagger, StaggerItem } from "@/components/animations/stagger";

const STEPS = [
  {
    number: "01",
    icon: <LogIcon />,
    title: "Crèche logs the day",
    description:
      "Caregivers use structured forms to record meals, activities, naps, and any incidents throughout the day. Fast. Guided. Professional.",
  },
  {
    number: "02",
    icon: <BellIcon />,
    title: "You get notified",
    description:
      "Push notifications reach you the moment something is logged. Real time. No calls. No WhatsApp voice notes. No wondering.",
  },
  {
    number: "03",
    icon: <BriefcaseIcon />,
    title: "You focus. Fully.",
    description:
      "With peace of mind in your pocket, you can be present at work without guilt. At pickup, you know the whole day. Not just the last five minutes.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="bg-[#1C2B3A] px-4 sm:px-8 lg:px-16 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <div className="mb-10 sm:mb-14">
            <div className="inline-flex items-center bg-[#FAF2E1] text-[#1A1208] text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
              How it works
            </div>
            <h2 className="font-[family-name:var(--font-fraunces)] text-[#FAF2E1] text-2xl sm:text-3xl lg:text-4xl font-semibold leading-[1.2] mb-4" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
              Simple by design.<br />
              <em className="not-italic text-[#C8823A]">Powerful</em> by outcome.
            </h2>
            <p className="text-[#FAF2E1]/50 text-sm sm:text-base max-w-lg leading-relaxed">
              Three steps. That&apos;s it. CEven is built for busy people
              — caregivers and parents alike.
            </p>
          </div>
        </FadeUp>

        <Stagger className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-8">
          {STEPS.map((step) => (
            <StaggerItem key={step.number}>
              <div>
                <p className="text-[#FAF2E1]/10 text-6xl sm:text-7xl font-black mb-4 sm:mb-6 leading-none select-none">
                  {step.number}
                </p>
                <div className="w-12 h-12 bg-[#FAF2E1]/10 border border-[#FAF2E1]/20 rounded-xl flex items-center justify-center mb-4 sm:mb-5 hover:scale-110 hover:bg-[#FAF2E1]/20 transition-all duration-200">
                  {step.icon}
                </div>
                <h3 className="text-[#FAF2E1] text-lg sm:text-xl font-bold mb-3">
                  {step.title}
                </h3>
                <p className="text-[#FAF2E1]/50 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function LogIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8823A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8823A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8823A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}
