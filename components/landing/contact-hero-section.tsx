"use client";

import Link from "next/link";
import { LandingNav } from "./nav";
import { FadeUp } from "@/components/animations/fade-up";
import { Stagger, StaggerItem } from "@/components/animations/stagger";

export function ContactHeroSection() {
  return (
    <section className="bg-[#F5EFE4] min-h-[520px]">
      <LandingNav variant="light" />

      <div className="px-4 sm:px-8 lg:px-16 pt-10 sm:pt-12 pb-16 sm:pb-20 text-center max-w-4xl mx-auto">
        <Stagger className="flex items-center justify-center gap-2 mb-8">
          <StaggerItem>
            <span className="inline-flex items-center bg-[#EDE8E0] text-[#3B2513] text-xs font-medium px-4 py-1.5 rounded-full border border-[#D4C4B0]">
              We&apos;re here
            </span>
          </StaggerItem>
          <StaggerItem>
            <span className="inline-flex items-center bg-[#EDE8E0] text-[#3B2513] text-xs font-medium px-4 py-1.5 rounded-full border border-[#D4C4B0]">
              Reach out for better childcare
            </span>
          </StaggerItem>
        </Stagger>

        <FadeUp delay={0.1}>
          <h1 className="font-[family-name:var(--font-fraunces)] text-[#1A1208] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] font-semibold mb-5 sm:mb-6" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
            Say hello!<br />
            Let&apos;s get you started
          </h1>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="text-[#6B5744] text-base leading-relaxed mb-10 max-w-xl mx-auto">
            Whether you&apos;re a parent, a crèche operator, a journalist, or just curious —
            we&apos;d love to hear from you.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="#"
              className="flex items-center gap-2.5 bg-[#3B2513] text-[#FAF2E1] text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-[#5B391E] hover:scale-[1.03] transition-all duration-150"
            >
              <PlayStoreIcon />
              Download on Google Play
            </Link>
            <Link
              href="/for-parents"
              className="flex items-center gap-2 border border-[#3B2513]/30 text-[#3B2513] text-sm font-medium px-6 py-3.5 rounded-full hover:border-[#3B2513] hover:bg-[#3B2513]/5 hover:scale-[1.03] transition-all duration-150"
            >
              For Parents <span>↗</span>
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function PlayStoreIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 20.5v-17c0-.83 1-.83 1.5-.5l14 8.5c.5.3.5 1.2 0 1.5L4.5 21c-.5.33-1.5.33-1.5-.5z" />
    </svg>
  );
}
