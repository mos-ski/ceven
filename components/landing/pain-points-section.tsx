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
    bg: "bg-[#F0E8DC]",
    iconBg: "bg-[#E8DDD0]",
    decoration: "circles",
  },
  {
    icon: "/Notepad.png",
    title: "End-of-day verbal reports aren't enough",
    description:
      "A tired caregiver summarising 10 hours in 30 seconds at pickup doesn't give you the full picture. You deserve more.",
    bg: "bg-[#FFF5E6]",
    iconBg: "bg-[#FFECD0]",
    decoration: "squiggle",
  },
  {
    icon: "/Users.png",
    title: "CEven adds a vital layer of peace of mind.",
    description:
      "For new parents, the village has shifted from close-knit family and friends to caregivers and childcare providers.",
    bg: "bg-[#EDE8E0]",
    iconBg: "bg-[#DDD4C8]",
    decoration: "dots",
  },
];

export function PainPointsSection() {
  return (
    <section className="bg-white relative">
      <CloudWaveTop />

      <div className="px-4 sm:px-8 lg:px-16 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="max-w-2xl mb-10 sm:mb-14">
              <h2
                className="font-[family-name:var(--font-fraunces)] text-[#1A1208] text-2xl sm:text-3xl lg:text-4xl font-semibold leading-[1.2] mb-4"
                style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
              >
                The gap between work and home<br className="hidden sm:block" />
                shouldn&apos;t cost you peace of mind
              </h2>
              <p className="text-[#6B5744] text-sm sm:text-base leading-relaxed">
                For the parents navigating early mornings and long days,
                we&apos;ve got you covered.
              </p>
            </div>
          </FadeUp>

          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10 sm:mb-12">
            {PAIN_POINTS.map((point, i) => (
              <StaggerItem key={i}>
                <div
                  className={`${point.bg} rounded-3xl p-6 sm:p-7 relative overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-200 cursor-default min-h-[280px]`}
                >
                  {point.decoration === "circles" && <ConcentricCircles />}
                  {point.decoration === "squiggle" && <SquiggleDecoration />}
                  {point.decoration === "dots" && <DotsDecoration />}

                  <div
                    className={`${point.iconBg} w-14 h-14 rounded-2xl flex items-center justify-center mb-5 sm:mb-6 relative z-10`}
                  >
                    <Image
                      src={point.icon}
                      alt=""
                      width={28}
                      height={28}
                      className="w-7 h-7 object-contain"
                    />
                  </div>
                  <h3 className="text-[#1A1208] text-base sm:text-lg font-bold leading-snug mb-3 relative z-10">
                    {point.title}
                  </h3>
                  <p className="text-[#6B5744] text-sm leading-relaxed relative z-10">
                    {point.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <FadeUp delay={0.1} className="flex justify-center">
            <Link
              href="/for-parents"
              className="bg-[#1A1208] text-[#FAF2E1] text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-[#3B2513] hover:scale-[1.03] active:scale-[0.98] transition-all duration-150"
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

function ConcentricCircles() {
  return (
    <div className="absolute right-0 top-0 w-40 h-40 -translate-y-4 translate-x-4 opacity-30">
      <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="80" r="75" stroke="#C4B09A" strokeWidth="2" />
        <circle cx="80" cy="80" r="60" stroke="#C4B09A" strokeWidth="2" />
        <circle cx="80" cy="80" r="45" stroke="#C4B09A" strokeWidth="2" />
        <circle cx="80" cy="80" r="30" stroke="#C4B09A" strokeWidth="2" />
        <circle cx="80" cy="80" r="15" stroke="#C4B09A" strokeWidth="2" />
      </svg>
    </div>
  );
}

function SquiggleDecoration() {
  return (
    <div className="absolute right-4 top-4 opacity-20">
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <path
          d="M10 40 Q25 10 40 40 Q55 70 70 40"
          stroke="#C8823A"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M10 55 Q25 25 40 55 Q55 85 70 55"
          stroke="#C8823A"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M10 25 Q25 -5 40 25 Q55 55 70 25"
          stroke="#C8823A"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function DotsDecoration() {
  return (
    <div className="absolute right-4 top-4 opacity-25">
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        {[0, 1, 2, 3, 4].map((row) =>
          [0, 1, 2, 3, 4].map((col) => (
            <circle
              key={`${row}-${col}`}
              cx={8 + col * 16}
              cy={8 + row * 16}
              r="3"
              fill="#9A7055"
            />
          ))
        )}
      </svg>
    </div>
  );
}
