"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cgSet } from "@/lib/caregiver/storage";

const SLIDES = [
  {
    heading: "Empowering your Parenting Journey",
    subtitle: "The ultimate tool to support parents and caregivers in raising happy, healthy children.",
  },
  {
    heading: "Stay in Sync with Their Growth",
    subtitle: "From playtime to learning moments, track your child's growth with ease.",
  },
  {
    heading: "Capture Every Moment",
    subtitle: "Create memories that last a lifetime with easy-to-use tools to capture and share moments.",
  },
];

export default function OnboardingPage() {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  function finish() {
    cgSet("onboarding", "true");
    router.replace("/caregiver/auth");
  }

  function next() {
    if (index < SLIDES.length - 1) {
      setIndex(index + 1);
    } else {
      finish();
    }
  }

  function prev() {
    if (index > 0) setIndex(index - 1);
  }

  const slide = SLIDES[index];
  const isLast = index === SLIDES.length - 1;
  const isFirst = index === 0;

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      {/* Photo background (amber overlay) */}
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundColor: "#B07D2A" }}
      >
        {/* Dark scrim at bottom for text legibility */}
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* CEven logo top-left */}
      <div className="relative z-10 flex items-center gap-2 px-6 pt-4">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="14" fill="white" fillOpacity="0.25" />
          <circle cx="10" cy="8" r="4" fill="white" />
          <circle cx="18" cy="7" r="3" fill="white" fillOpacity="0.7" />
        </svg>
        <span className="text-base font-bold text-white" style={{ fontFamily: "var(--font-merriweather)" }}>
          CEven
        </span>
      </div>

      {/* Slide content — bottom */}
      <div className="relative z-10 mt-auto px-6 pb-4">
        <h2 className="mb-2 text-2xl font-bold leading-tight text-white">
          {slide.heading}
        </h2>
        <p className="mb-4 text-sm text-white/80">{slide.subtitle}</p>

        {/* Progress dots */}
        <div className="mb-6 flex gap-1.5">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-white" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          {!isFirst && (
            <button
              onClick={prev}
              className="flex-1 rounded-xl border border-white/60 py-3 text-sm font-semibold text-white"
            >
              Prev
            </button>
          )}
          <button
            onClick={next}
            className="flex-1 rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white"
          >
            {isLast ? "Get Started" : "Next"}
          </button>
        </div>

        {!isLast && (
          <button
            onClick={finish}
            className="mt-3 w-full py-2 text-sm text-white/80"
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
}
