"use client";

import Link from "next/link";
import Image from "next/image";
import { LandingNav } from "./nav";
import { FadeUp } from "@/components/animations/fade-up";

export function AboutHeroSection() {
  return (
    <section className="bg-[#3B2513] relative overflow-hidden">
      <LandingNav />

      <div className="px-4 sm:px-8 lg:px-16 pt-8 pb-12 sm:pb-16 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-[520px] text-center md:text-left">
            <FadeUp delay={0}>
              <div className="inline-flex items-center gap-2 bg-[#5B391E] text-[#FAF2E1]/70 text-xs font-medium px-4 py-1.5 rounded-full mb-6 sm:mb-8">
                Our Story
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className="text-[#FAF2E1] text-3xl sm:text-4xl lg:text-5xl leading-[1.15] font-bold mb-5 sm:mb-6">
                Built from a quiet,<br />
                <em className="text-[#C8823A] italic">very familiar guilt.</em>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-[#FAF2E1]/60 text-sm sm:text-base leading-relaxed mb-8 sm:mb-10 max-w-[420px] mx-auto md:mx-0">
                CEven didn&apos;t start in a boardroom. It started with a new mother, a
                new job, and a question she couldn&apos;t stop asking herself.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4">
                <Link
                  href="#"
                  className="flex items-center gap-2.5 bg-[#FAF2E1] text-[#3B2513] text-sm font-semibold px-5 py-3 rounded-full hover:bg-white hover:scale-[1.03] transition-all duration-150"
                >
                  <Image src="/google-play-icon.png" alt="" width={16} height={16} className="w-4 h-4" />
                  Download on Google Play
                </Link>
                <Link
                  href="/for-parents"
                  className="text-[#FAF2E1]/70 text-sm font-medium hover:text-[#FAF2E1] hover:scale-[1.03] transition-all duration-150 flex items-center gap-1"
                >
                  For Parents <span>→</span>
                </Link>
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={0.15} amount={0.1} className="relative w-full max-w-[380px] h-[320px] sm:h-[380px] flex-shrink-0">
            <Image
              src="/Frame 1686561190.png"
              alt="Children at a crèche"
              fill
              className="object-contain"
            />
          </FadeUp>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1280 60" preserveAspectRatio="none" className="w-full h-12 sm:h-14 block">
          <path
            d="M0,60 L0,30 C50,5 100,55 150,30 C200,5 250,52 300,28 C350,4 400,50 450,28 C500,6 550,52 600,30 C650,8 700,54 750,32 C800,10 850,56 900,34 C950,12 1000,58 1050,36 C1100,14 1150,60 1200,38 C1230,27 1260,46 1280,36 L1280,60 Z"
            fill="#F5EFE4"
          />
        </svg>
      </div>
    </section>
  );
}
