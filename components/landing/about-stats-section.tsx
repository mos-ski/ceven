"use client";

import { FadeUp } from "@/components/animations/fade-up";
import { CountUp } from "@/components/animations/count-up";

const STATS = [
  {
    to: 100,
    suffix: "+",
    label: "Happy Children",
    description:
      "We've connected the parents of over 100 kids to a better way of parenting, while others still struggle to be part of their kids lives",
  },
  {
    to: 25,
    suffix: "k",
    label: "Registered Hours",
    description:
      "Over 25,000 hours of very detailed care and attention given to the beautiful kids in our crèches, while parents keep their careers going.",
  },
  {
    to: 12,
    suffix: "",
    label: "Registered Crèches",
    description:
      "We helped over 12 crèches build trust with parents, and offer detailed care and information to both parents and children",
  },
];

export function AboutStatsSection() {
  return (
    <section className="bg-[#F5EFE4] px-4 sm:px-8 lg:px-16 pt-10 sm:pt-12 pb-16 sm:pb-20">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <h2 className="font-[family-name:var(--font-fraunces)] text-[#3B2513] text-4xl font-semibold mb-8" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
            We&apos;ve achieved
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="bg-[#FFF9F0] rounded-3xl border border-[#E8DDD0] px-5 sm:px-10 lg:px-14 py-8 sm:py-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-16 text-center">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-6">
                  <CountUp
                    to={stat.to}
                    suffix={stat.suffix}
                    className="font-[family-name:var(--font-mogra-import)] text-[#3B2513] text-[64px] sm:text-[80px] lg:text-[100px] leading-none"
                  />
                  <div className="flex flex-col gap-2 items-center">
                    <p className="text-[#3B2513] font-semibold text-2xl">{stat.label}</p>
                    <p className="text-[#2C271C] text-base leading-relaxed max-w-[260px]">
                      {stat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
