"use client";

import Link from "next/link";
import Image from "next/image";
import { LandingNav } from "./nav";
import { FadeUp } from "@/components/animations/fade-up";
import { Stagger, StaggerItem } from "@/components/animations/stagger";

export function ParentsHeroSection() {
  return (
    <section className="bg-[#F5EFE4]">
      <LandingNav variant="light" />

      <div className="px-4 sm:px-8 lg:px-16 pt-10 sm:pt-12 pb-16 sm:pb-20 text-center max-w-4xl mx-auto">
        <Stagger className="flex items-center justify-center gap-2 mb-6 sm:mb-8 flex-wrap">
          <StaggerItem>
            <span className="inline-flex items-center bg-[#EDE8E0] text-[#3B2513] text-xs font-medium px-4 py-1.5 rounded-full border border-[#D4C4B0]">
              For working parents
            </span>
          </StaggerItem>
          <StaggerItem>
            <span className="inline-flex items-center bg-[#EDE8E0] text-[#3B2513] text-xs font-medium px-4 py-1.5 rounded-full border border-[#D4C4B0]">
              Let&apos;s make parenting easier for you
            </span>
          </StaggerItem>
        </Stagger>

        <FadeUp delay={0.1}>
          <h1 className="font-[family-name:var(--font-merriweather-import)] text-[#1A1208] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] font-bold mb-5 sm:mb-6">
            Let&apos;s make parenting<br />
            easier for you.
          </h1>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="text-[#6B5744] text-sm sm:text-base leading-relaxed mb-8 sm:mb-10 max-w-xl mx-auto">
            You&apos;re doing your best. CEven makes sure your child&apos;s crèche is doing theirs too.
            You don&apos;t have to choose between your career and your child — you can have both.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="#"
              className="flex items-center gap-2.5 bg-[#3B2513] text-[#FAF2E1] text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-[#5B391E] hover:scale-[1.03] transition-all duration-150"
            >
              <Image src="/google-play-icon.png" alt="" width={16} height={16} className="w-4 h-4" />
              Download on Google Play
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 border border-[#3B2513]/30 text-[#3B2513] text-sm font-medium px-6 py-3.5 rounded-full hover:border-[#3B2513] hover:bg-[#3B2513]/5 hover:scale-[1.03] transition-all duration-150"
            >
              Reach Out <span>↗</span>
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
