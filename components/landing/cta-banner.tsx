"use client";

import Image from "next/image";
import { FadeUp } from "@/components/animations/fade-up";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/3b109c5ee8eaa69ab9b1eea0de7680e0edffd7c5.jpg"
        alt=""
        fill
        className="object-cover"
        priority={false}
      />
      <div className="absolute inset-0 bg-[#9A6033]/70" />
      <FadeUp>
        <div className="relative z-10 px-4 sm:px-8 lg:px-16 py-20 sm:py-24 text-center max-w-3xl mx-auto">
          <h2 className="text-[#FAF2E1] text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.2] mb-5">
            Childcare support is now in<br />
            your pocket
          </h2>
          <p className="text-[#FAF2E1]/70 text-sm sm:text-base leading-relaxed mb-10 max-w-xl mx-auto">
            Be part of every aspect of your child&apos;s life, while building your dreams.
            Whether it&apos;s their first steps, or their first words, you can be part of those
            special moments without your career taking the hit. CEven connects intentional
            parents to the best crèche services there is.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2.5 bg-[#FAF2E1] text-[#3B2513] text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-white hover:scale-[1.04] transition-all duration-150"
          >
            <PlayStoreIcon />
            Download on Google Play
          </a>
        </div>
      </FadeUp>
    </section>
  );
}

function PlayStoreIcon() {
  return (
    <Image
      src="/google_play_icon.png.png"
      alt=""
      width={16}
      height={16}
      className="w-4 h-4"
    />
  );
}
