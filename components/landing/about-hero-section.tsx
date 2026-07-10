"use client";

import Link from "next/link";
import Image from "next/image";
import { LandingNav } from "./nav";
import { FadeUp } from "@/components/animations/fade-up";

export function AboutHeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#FAF2E1]">
      <LandingNav variant="light" />

      <div className="relative z-10 px-4 pb-14 pt-10 sm:px-8 sm:pb-20 lg:px-12 lg:pb-20 lg:pt-[72px]">
        <div className="mx-auto flex max-w-[1184px] flex-col items-center justify-between gap-10 lg:flex-row lg:items-start">
          <div className="w-full max-w-[618px] text-center lg:text-left">
            <FadeUp delay={0}>
              <div className="mb-5 inline-flex items-center rounded-[6px] border border-[rgba(255,195,68,0.5)] bg-[rgba(59,37,19,0.12)] px-2 py-2 font-[family-name:var(--font-plus-jakarta-sans)] text-sm font-medium leading-5 text-black sm:mb-6">
                Our Story
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1
                className="mb-5 font-[family-name:var(--font-fraunces)] text-[44px] font-semibold leading-[1.08] text-[#3B2513] sm:text-[58px] lg:text-[72px] lg:leading-[88px]"
                style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
              >
                Built from a quiet,<br />
                <em
                  className="font-[family-name:var(--font-fraunces)] font-bold italic text-[#C78C5F]"
                  style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
                >
                  very familiar guilt.
                </em>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="mx-auto mb-8 max-w-[618px] font-[family-name:var(--font-plus-jakarta-sans)] text-base leading-7 text-[#3D444F] lg:mx-0 lg:mb-10">
                CEven didn&apos;t start in a boardroom, it started with a new mother, a new job, and a question she couldn&apos;t stop asking herself.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                <Link
                  href="#"
                  className="relative flex h-[50px] items-center gap-1 rounded-[12px] bg-[#3B2513] pl-1.5 pr-4 font-[family-name:var(--font-plus-jakarta-sans)] text-base font-medium leading-5 text-[#FAF2E1] shadow-[inset_0px_4px_12px_0px_rgba(255,255,255,0.12)] transition-all duration-150 hover:scale-[1.03] hover:bg-[#5B391E]"
                >
                  <Image src="/google_play_icon.png.png" alt="" width={46} height={46} className="size-[46px]" />
                  Download on Google Play
                </Link>
                <Link
                  href="/for-parents"
                  className="flex h-[50px] w-[162px] items-center justify-center gap-2 rounded-[12px] border border-[#3B2513] px-4 font-[family-name:var(--font-plus-jakarta-sans)] text-base font-semibold leading-5 text-[#3B2513] transition-all duration-150 hover:scale-[1.03] hover:bg-[#3B2513]/5"
                >
                  For Parents <span>→</span>
                </Link>
              </div>
            </FadeUp>
          </div>

          <FadeUp
            delay={0.15}
            amount={0.1}
            className="relative h-[210px] w-full max-w-[410px] flex-shrink-0 sm:h-[270px] lg:mt-[27px] lg:h-[329px] lg:max-w-[639px]"
          >
            <Image
              src="/Frame 1686561190.png"
              alt="Children at a crèche"
              fill
              sizes="(max-width: 1024px) 90vw, 639px"
              className="object-contain"
            />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
