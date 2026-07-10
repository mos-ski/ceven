"use client";

import { FadeUp } from "@/components/animations/fade-up";

export function AboutSwayosooSection() {
  return (
    <section className="bg-[#C8823A] px-4 sm:px-8 lg:px-16 py-16 sm:py-24 text-center">
      <div className="max-w-3xl mx-auto">
        <FadeUp delay={0}>
          <p className="text-[#FAF2E1]/70 text-xs font-semibold uppercase tracking-widest mb-4">
            The Company
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2 className="text-[#FAF2E1] text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">
            Swayosoo™
          </h2>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="text-[#FAF2E1]/80 text-base leading-relaxed mb-4">
            Swayosoo is a Nigerian technology company building digital ecosystems for African
            families. We believe that the infrastructure modern African life requires — the
            tools that match the ambition, the pace, the reality of raising families while
            building futures — is ours to build.
          </p>
          <p className="text-[#FAF2E1]/80 text-base leading-relaxed">
            CEven is our first product. It is the result of listening closely to working
            parents and the crèches they trust. We built it because nobody else was building
            it for us.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
