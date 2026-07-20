"use client";

import Link from "next/link";
import { FadeUp } from "@/components/animations/fade-up";
import { Stagger, StaggerItem } from "@/components/animations/stagger";

const TESTIMONIALS = [
  {
    quote:
      "I just want to know she's okay. That's it. I don't need photos every hour — I just need to know she's okay.",
    name: "Chiamaka O.",
    role: "Working mother of a toddler · Chevron",
  },
  {
    quote:
      "I switched crèches because the old one never told me anything. My new one sends me updates. I feel like I'm still there.",
    name: "Mrs. Nelson",
    role: "Father of 18months old · Surulere",
  },
  {
    quote:
      "The crèche I recommend to people? The one that makes me feel like a good parent even when I'm at work. That's the bar.",
    name: "Queen C.",
    role: "Mother of two · Ajah",
  },
];

export function CrechesTestimonialsSection() {
  return (
    <section className="relative z-10 bg-white px-4 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-16">
      <div className="max-w-6xl mx-auto relative z-10">
        <FadeUp className="mb-12">
          <div className="inline-flex items-center border border-[#3B2513]/20 text-[#3B2513] text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            What Your Parents Need
          </div>
          <h2 className="font-[family-name:var(--font-merriweather-import)] font-bold text-[#1A1208] text-4xl leading-[1.2]">
            Before they even walk through<br />
            your door, this is{" "}
            <em className="text-[#C8823A] italic">what parents say.</em>
          </h2>
          <p className="text-[#6B5744] text-base mt-4">
            Know what working parents need — and show them you already provide it.
          </p>
        </FadeUp>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8 sm:mb-10">
          {TESTIMONIALS.map((t) => (
            <StaggerItem key={t.name}>
              <div className="bg-[#F8F6F3] border border-[#E8E4DE] rounded-2xl p-7 hover:-translate-y-1 hover:shadow-md transition-all duration-200">
                <QuoteIcon />
                <p className="text-[#1A1208] text-base leading-relaxed mt-4 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="text-[#9A6033] font-semibold text-sm">{t.name}</p>
                  <p className="text-[#9B9B9B] text-xs mt-0.5">{t.role}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Link
          href="/contact"
          className="inline-block bg-[#3B2513] text-[#FAF2E1] text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-[#5B391E] hover:scale-[1.03] transition-all duration-150"
        >
          Reach Out To Us
        </Link>
      </div>
    </section>
  );
}

function QuoteIcon() {
  return (
    <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
      <path
        d="M0 20V12C0 8.667 0.833 5.917 2.5 3.75 4.167 1.583 6.583 0.333 9.75 0L11 2.25C9.167 2.583 7.75 3.375 6.75 4.625 5.75 5.875 5.25 7.333 5.25 9H10V20H0ZM17 20V12C17 8.667 17.833 5.917 19.5 3.75 21.167 1.583 23.583 0.333 26.75 0L28 2.25C26.167 2.583 24.75 3.375 23.75 4.625 22.75 5.875 22.25 7.333 22.25 9H27V20H17Z"
        fill="#D4C4B0"
      />
    </svg>
  );
}
