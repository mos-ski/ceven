"use client";

import { useState } from "react";
import Image from "next/image";

const TYPES = [
  {
    label: "In-home child care",
    description: "from first enquiry to end-of-day report.",
  },
  {
    label: "Childcare centers",
    description: "All-in-one management for your centre and staff.",
  },
  {
    label: "Multisite centers",
    description: "Unified oversight across every location.",
  },
  {
    label: "Montessori",
    description: "Tools that respect your programme's unique rhythm.",
  },
  {
    label: "Preschools",
    description: "Designed around the way your educators work.",
  },
  {
    label: "Government & network partners",
    description: "Bring CEven to providers across your state or network.",
  },
];

export function FeaturesTypesSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-[#FAF2E1] px-4 sm:px-8 lg:px-[74px] py-8 sm:py-12">
      <div className="max-w-[1549px] mx-auto">
        <div className="bg-[#2f2720] rounded-[56px] sm:rounded-[80px] lg:rounded-[113px] px-8 sm:px-12 lg:px-[74px] pt-12 sm:pt-14 lg:pt-[64px] pb-0 overflow-hidden">
          <div className="flex flex-col lg:flex-row items-end gap-10 lg:gap-[64px]">

            {/* ── Left column ── */}
            <div className="flex flex-col gap-8 flex-1 min-w-0 pb-12 sm:pb-14 lg:pb-[64px]">

              {/* Heading + body */}
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

              {/* Tab list */}
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

            {/* ── Right column: photo (pre-cut organic shape, matches Figma) ── */}
            <div className="relative shrink-0 w-full lg:w-[420px] xl:w-[510px] h-[300px] sm:h-[400px] lg:h-[524px] self-end">
              <Image
                src="/features-types-photo-blob.png"
                alt="Children learning and playing together at a crèche"
                fill
                className="object-contain object-bottom"
                priority
                sizes="(max-width: 1024px) 100vw, 510px"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
