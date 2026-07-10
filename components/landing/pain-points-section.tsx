"use client";

import Link from "next/link";
import Image from "next/image";
import { FadeUp } from "@/components/animations/fade-up";
import { Stagger, StaggerItem } from "@/components/animations/stagger";

const PAIN_POINTS = [
  {
    icon: "/HouseLine.png",
    title: "You can't be at work and at the crèche at the same time",
    description:
      "That tug between your career and being there for your child is real. CEven helps you stay connected and reassured.",
    bg: "bg-[rgba(59,37,19,0.12)]",
    border: "border-[#3b2513]",
    decoration: (
      <div className="absolute right-0 top-0 w-[205px] h-[205px] -translate-y-9 translate-x-6 pointer-events-none select-none opacity-50">
        <Image src="/Group 55326.png" alt="" fill className="object-contain" />
      </div>
    ),
  },
  {
    icon: "/Notepad.png",
    title: "End-of-day verbal reports aren't enough",
    description:
      "A tired caregiver summarising 10 hours in 30 seconds at pickup doesn't give you the full picture. You deserve more.",
    bg: "bg-[rgba(250,242,225,0.24)]",
    border: "border-[#ffe8b8]",
    decoration: (
      <div className="absolute right-0 top-0 w-[242px] h-[141px] pointer-events-none select-none opacity-30">
        <Image src="/Vector 3.png" alt="" fill className="object-contain object-right-top" />
      </div>
    ),
  },
  {
    icon: "/Users.png",
    title: "CEven adds a vital layer of peace of mind.",
    description:
      "For new parents, the village has shifted from close-knit family and friends to caregivers and childcare providers.",
    bg: "bg-[rgba(193,124,69,0.12)]",
    border: "border-[#c17c45]",
    decoration: (
      <div className="absolute right-0 top-0 w-[120px] pointer-events-none select-none opacity-70">
        <DotsDecoration />
      </div>
    ),
  },
];

export function PainPointsSection() {
  return (
    <section className="bg-white relative z-10 -mt-16 sm:-mt-20">
      <CloudWaveTop />

      <div className="px-4 sm:px-8 lg:px-16 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="max-w-2xl mb-10 sm:mb-14">
              <h2
                className="font-[family-name:var(--font-fraunces)] text-black text-2xl sm:text-3xl lg:text-4xl font-normal leading-[1.2] mb-4"
                style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
              >
                The gap between work and home<br className="hidden sm:block" />
                shouldn&apos;t cost you peace of mind
              </h2>
              <p className="font-[family-name:var(--font-plus-jakarta-sans)] text-[#6b7280] text-sm sm:text-base font-medium leading-relaxed">
                For the parents navigating early mornings and long days,
                we&apos;ve got you covered.
              </p>
            </div>
          </FadeUp>

          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10 sm:mb-12">
            {PAIN_POINTS.map((point, i) => (
              <StaggerItem key={i}>
                <div
                  className={`${point.bg} border ${point.border} rounded-[48px] p-6 sm:p-7 relative overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-200 cursor-default min-h-[320px]`}
                >
                  {point.decoration}

                  <div className="w-[72px] h-[72px] sm:w-[100px] sm:h-[100px] mt-4 mb-6 relative z-10">
                    <Image
                      src={point.icon}
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3
                    className="font-[family-name:var(--font-fraunces)] text-[#3b2513] text-lg sm:text-xl font-semibold leading-snug mb-4 relative z-10"
                    style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
                  >
                    {point.title}
                  </h3>
                  <p className="font-[family-name:var(--font-plus-jakarta-sans)] text-black text-sm leading-relaxed relative z-10 font-light">
                    {point.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <FadeUp delay={0.1} className="flex justify-center">
            <Link
              href="/for-parents"
              className="relative inline-flex items-center bg-[#3b2513] text-[#faf2e1] font-[family-name:var(--font-plus-jakarta-sans)] font-medium text-sm sm:text-base px-6 py-3 rounded-xl hover:bg-[#5b3921] hover:scale-[1.03] active:scale-[0.98] transition-all duration-150 shadow-[inset_0px_4px_12px_0px_rgba(255,255,255,0.12)]"
            >
              Become A Better Parent
            </Link>
          </FadeUp>
        </div>
      </div>

      <CloudWaveBottom />
    </section>
  );
}

function CloudWaveTop() {
  return (
    <div className="w-full overflow-hidden leading-none -mt-1">
      <svg
        viewBox="0 0 1280 80"
        preserveAspectRatio="none"
        className="w-full h-16 sm:h-20 block"
      >
        <path
          d="M0,0 L0,40 C80,15 160,65 240,40 C320,15 400,62 480,38 C560,14 640,60 720,36 C800,12 880,58 960,36 C1020,20 1100,62 1160,40 C1200,28 1240,52 1280,36 L1280,0 Z"
          fill="#FAF2E1"
        />
      </svg>
    </div>
  );
}

function CloudWaveBottom() {
  return (
    <div className="w-full overflow-hidden leading-none -mb-1">
      <svg
        viewBox="0 0 1280 80"
        preserveAspectRatio="none"
        className="w-full h-16 sm:h-20 block"
      >
        <path
          d="M0,80 L0,40 C80,65 160,15 240,40 C320,65 400,18 480,42 C560,66 640,20 720,44 C800,68 880,22 960,44 C1020,60 1100,18 1160,40 C1200,52 1240,28 1280,44 L1280,80 Z"
          fill="#FAF2E1"
        />
      </svg>
    </div>
  );
}

function DotsDecoration() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row) =>
        [0, 1, 2, 3, 4, 5, 6].map((col) => (
          <circle
            key={`${row}-${col}`}
            cx={8 + col * 15}
            cy={8 + row * 13}
            r="4"
            fill="#9A7055"
          />
        ))
      )}
    </svg>
  );
}
