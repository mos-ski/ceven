"use client";

import Link from "next/link";
import { FadeUp } from "@/components/animations/fade-up";

export function CrechesCTASection() {
  return (
    <section className="bg-[#C8823A] px-4 sm:px-8 lg:px-16 py-16 sm:py-24 text-center">
      <FadeUp className="max-w-2xl mx-auto">
        <h2 className="font-[family-name:var(--font-merriweather-import)] font-bold text-[#FAF2E1] text-4xl leading-[1.2] mb-4">
          Ready to be the crèche<br />
          that stands out?
        </h2>
        <p className="text-[#FAF2E1]/80 text-base mb-10">
          Download CEven. Built for Nigerian crèches. Set up in 15 minutes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="#"
            className="flex items-center gap-2.5 bg-[#FAF2E1] text-[#3B2513] text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-white hover:scale-[1.03] transition-all duration-150"
          >
            <PlayStoreIcon />
            Download on Google Play
          </Link>
          <Link
            href="/for-parents"
            className="flex items-center gap-2 border border-[#FAF2E1]/60 text-[#FAF2E1] text-sm font-medium px-6 py-3.5 rounded-full hover:border-[#FAF2E1] hover:bg-[#FAF2E1]/10 hover:scale-[1.03] transition-all duration-150"
          >
            For Parents <span>↗</span>
          </Link>
        </div>
      </FadeUp>
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
