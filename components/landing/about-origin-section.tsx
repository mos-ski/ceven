"use client";

import Link from "next/link";
import Image from "next/image";
import { FadeUp } from "@/components/animations/fade-up";

export function AboutOriginSection() {
  return (
    <section className="bg-[#F5EFE4] px-4 sm:px-8 lg:px-16 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto">
        <FadeUp className="text-center mb-10 sm:mb-14">
          <h2 className="text-[#1A1208] text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
            Where CEven came from?
          </h2>
          <p className="text-[#6B5744] text-sm sm:text-base">Let&apos;s walk through a quick story.</p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
          <FadeUp delay={0.1} amount={0.1} className="relative w-full max-w-[420px] mx-auto md:mx-0">
            <Image
              src="/Frame 1686561188.png"
              alt="Mother and child"
              width={420}
              height={420}
              className="w-full h-auto object-contain"
            />
          </FadeUp>

          <FadeUp delay={0.15}>
            <div>
              <p className="text-[#3B2513] text-sm sm:text-base leading-relaxed mb-5">
                Njijiwe has just given birth to a beautiful baby girl. There were
                celebrations and loads of joy in her household, as it was their first child.
                But the joy didn&apos;t settle in before reality really hit.
              </p>
              <p className="text-[#3B2513] text-sm sm:text-base leading-relaxed mb-7">
                She&apos;d go back to work six weeks after her baby was born — because the bills
                don&apos;t care about maternity leave. She would, and didn&apos;t, evaporate with a
                birth announcement. Every morning she left the house, she carried something
                heavier than her laptop bag.
              </p>

              <blockquote className="bg-[#FFF9F0] border border-[#E8DDD0] rounded-2xl p-5 sm:p-6 mb-7 relative">
                <p className="text-[#1A1208] text-base sm:text-lg font-semibold leading-snug italic">
                  &ldquo;What is she doing right now? Is she okay?<br />
                  Does she know I&apos;m coming back?&rdquo;
                </p>
              </blockquote>

              <p className="text-[#3B2513] text-sm sm:text-base leading-relaxed mb-5">
                She would call the crèche. Sometimes they picked up. Sometimes she got a
                hurried &ldquo;she&apos;s fine&rdquo; and had to trust that. The end-of-day verbal debrief
                rarely covered what she actually experienced.
              </p>
              <p className="text-[#3B2513] text-sm sm:text-base leading-relaxed mb-5">
                CEven is the answer to that question. A childcare management platform built
                to close the visibility gap between working parents and the crèches they
                entrust their children to — not through surveillance, but through
                communication, structure, and trust.
              </p>
              <p className="text-[#6B5744] text-sm leading-relaxed mb-8">
                We are part of Swayosoo, a technology company building digital ecosystems
                for African families.
              </p>

              <Link
                href="/for-parents"
                className="inline-block bg-[#3B2513] text-[#FAF2E1] text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-[#5B391E] hover:scale-[1.03] transition-all duration-150"
              >
                Become A Better Parent
              </Link>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
