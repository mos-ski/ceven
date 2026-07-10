"use client";

import { FadeUp } from "@/components/animations/fade-up";

export function CrechesTransparencySection() {
  return (
    <section className="bg-white px-4 sm:px-8 lg:px-16 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
        <FadeUp delay={0} className="space-y-8">
          <div>
            <p className="text-[#1A1208] text-6xl font-black mb-2">3x</p>
            <p className="text-[#6B5744] text-base">more likely to be recommended</p>
          </div>
          <div>
            <p className="text-[#1A1208] text-6xl font-black mb-2">60%</p>
            <p className="text-[#6B5744] text-base">drop in anxious parent calls</p>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <h2 className="font-[family-name:var(--font-fraunces)] text-[#1A1208] text-4xl font-semibold leading-[1.2] mb-6" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
            Transparency is your{" "}
            <em className="text-[#C8823A] italic">competitive advantage.</em>
          </h2>
          <p className="text-[#6B5744] text-base leading-relaxed mb-5">
            In a city where word-of-mouth fills waiting lists, the crèche that communicates
            is the crèche that wins. Parents who trust you refer others. Parents who don&apos;t,
            leave quietly and tell everyone why.
          </p>
          <p className="text-[#6B5744] text-base leading-relaxed">
            CEven doesn&apos;t just improve parent satisfaction — it restructures your reputation.
            Every report sent is a proof point. Every notification is a trust deposit. Every
            calm parent at pickup is a future referral.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
