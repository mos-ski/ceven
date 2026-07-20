"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// px of scroll consumed per tab step (desktop only)
const SCROLL_STEP = 220;

const TYPES = [
  {
    label: "In-home child care",
    description: "from first enquiry to end-of-day report.",
    image: "/Vector-5.png",
    alt: "Teacher with children at a table using an abacus",
  },
  {
    label: "Childcare centers",
    description: "All-in-one management for your centre and staff.",
    image: "/Vector-4.png",
    alt: "Children gathered around a teacher reading a book",
  },
  {
    label: "Multisite centers",
    description: "Unified oversight across every location.",
    image: "/Vector-2.png",
    alt: "Modern childcare classroom with green floor and play equipment",
  },
  {
    label: "Montessori",
    description: "Tools that respect your programme's unique rhythm.",
    image: "/Vector-3.png",
    alt: "Child sitting at a wooden desk, thinking with a pencil",
  },
  {
    label: "Preschools",
    description: "Designed around the way your educators work.",
    image: "/Vector-1.png",
    alt: "Bright preschool reading nook with colourful decor",
  },
  {
    label: "Government & network partners",
    description: "Bring CEven to providers across your state or network.",
    image: "/Vector6.png",
    alt: "Teacher doing arts and crafts with a diverse group of children",
  },
];

export function FeaturesTypesSection() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current || window.innerWidth < 1024) return;
      const top = sectionRef.current.getBoundingClientRect().top;
      if (top > 0) { setActive(0); return; }
      const scrolledIn = -top;
      setActive(Math.min(Math.floor(scrolledIn / SCROLL_STEP), TYPES.length - 1));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const card = (
    <div className="bg-[#2f2720] rounded-[56px] sm:rounded-[80px] lg:rounded-[113px] px-8 sm:px-12 lg:px-[74px] pt-12 sm:pt-14 lg:pt-[64px] pb-0 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-end gap-10 lg:gap-[64px]">

        {/* ── Left column ── */}
        <div className="flex flex-col gap-8 flex-1 min-w-0 pb-12 sm:pb-14 lg:pb-[64px]">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <p className="text-[#b1ae89] text-[16px] font-semibold leading-[24px]">
                Features
              </p>
              <h2 className="font-[family-name:var(--font-merriweather-import)] font-bold text-white text-[28px] sm:text-[32px] lg:text-[36px] leading-[1.22] tracking-[-0.02em] max-w-[580px]">
                Whatever shape your childcare takes, this fits it.
              </h2>
            </div>
            <p className="font-[family-name:var(--font-urbanist-import)] text-white/65 text-[16px] sm:text-[18px] lg:text-[20px] leading-[30px] max-w-[570px]">
              Built for the ways care actually happens — not just the biggest, best-funded version of it.
            </p>
          </div>

          <div className="flex flex-col gap-1">
            {TYPES.map((t, i) => {
              const isActive = i === active;
              return (
                <button
                  key={t.label}
                  onClick={() => setActive(i)}
                  className={[
                    "text-left flex flex-col gap-[8px] px-6 py-4 border-l-4 w-full",
                    "bg-white/[0.04] transition-colors duration-150",
                    isActive
                      ? "border-[#b1ae89]"
                      : "border-[#f2f4f7]/30 hover:border-[#f2f4f7]/60",
                  ].join(" ")}
                >
                  <span className="font-[family-name:var(--font-urbanist-import)] font-bold text-white text-[18px] sm:text-[20px] leading-[30px]">
                    {t.label}
                  </span>
                  {isActive && (
                    <span className="font-[family-name:var(--font-urbanist-import)] text-white/65 text-[14px] sm:text-[16px] leading-[24px]">
                      {t.description}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Right column: crossfading images ── */}
        <div className="relative shrink-0 w-full lg:w-[420px] xl:w-[510px] h-[300px] sm:h-[400px] lg:h-[524px] self-end">
          {TYPES.map((t, i) => (
            <Image
              key={t.image}
              src={t.image}
              alt={t.alt}
              fill
              className={[
                "object-contain object-bottom transition-opacity duration-500",
                i === active ? "opacity-100" : "opacity-0",
              ].join(" ")}
              sizes="(max-width: 1024px) 100vw, 510px"
              priority={i === 0}
            />
          ))}
        </div>

      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="bg-[#FAF2E1] relative">

      {/* ── Desktop: sticky scroll-driven layout ── */}
      <div className="hidden lg:flex lg:sticky lg:top-0 lg:h-screen items-center px-[74px]">
        <div className="max-w-[1549px] mx-auto w-full py-16">
          {card}
        </div>
      </div>

      {/* Extra runway on desktop — scroll through here to advance tabs */}
      <div
        className="hidden lg:block"
        style={{ height: `${(TYPES.length - 1) * SCROLL_STEP}px` }}
        aria-hidden="true"
      />

      {/* ── Mobile: normal flow, click to switch ── */}
      <div className="lg:hidden px-4 sm:px-8 py-16 min-h-screen">
        <div className="max-w-[1549px] mx-auto">
          {card}
        </div>
      </div>

    </section>
  );
}
