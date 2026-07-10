"use client";

import Link from "next/link";
import { FadeUp } from "@/components/animations/fade-up";
import { Stagger, StaggerItem } from "@/components/animations/stagger";

const WITHOUT = [
  "You leave and know nothing until pickup",
  "You call the crèche — they're busy, no answer",
  "You check a WhatsApp group with 47 messages",
  "You miss a meeting moment, distracted, worried",
  'Pickup: "How was she?" "Fine." That\'s all you get.',
];

const WITH = [
  { time: "7:03 AM", text: "She arrived. Mood: happy. You breathe." },
  { time: "10:47 AM", text: "Art class. She painted a butterfly." },
  { time: "12:21 PM", text: "Lunch eaten fully. Nap started." },
  { time: "3:15 PM", text: "Outdoor play. A minor scrape. Handled." },
  { time: "5:15 PM", text: "Full report ready. You walk in knowing everything." },
];

export function ParentsComparisonSection() {
  return (
    <section className="bg-white px-4 sm:px-8 lg:px-16 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto">
        <FadeUp className="text-center mb-14">
          <div className="inline-flex items-center border border-[#3B2513]/20 text-[#3B2513] text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            The Difference
          </div>
          <h2 className="font-[family-name:var(--font-fraunces)] text-[#1A1208] text-4xl font-semibold leading-[1.2] mb-3" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
            A day without CEven.<br />
            <em className="text-[#C8823A] italic">A day with</em> CEven.
          </h2>
          <p className="text-[#6B5744] text-base">The same day. Two very different experiences.</p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 sm:mb-12">
          <FadeUp delay={0}>
            <div>
              <h3 className="text-[#1A1208] text-xl font-bold mb-2">Without CEven</h3>
              <p className="text-[#9B9B9B] text-sm mb-6">You miss out on most moments of your child&apos;s life</p>
              <Stagger className="space-y-4">
                {WITHOUT.map((item) => (
                  <StaggerItem key={item}>
                    <li className="flex items-start gap-3 text-[#9B9B9B] text-sm line-through decoration-[#C8823A]/60 list-none">
                      <span className="text-[#C8823A]/60 mt-0.5 no-underline flex-shrink-0">✕</span>
                      {item}
                    </li>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="bg-[#F8F6F3] border border-[#E8E4DE] rounded-2xl p-8 h-full">
              <h3 className="text-[#1A1208] text-xl font-bold mb-2">With CEven</h3>
              <p className="text-[#9B9B9B] text-sm mb-6">You stay on the loop, without losing focus at work.</p>
              <Stagger className="space-y-5">
                {WITH.map((item) => (
                  <StaggerItem key={item.time}>
                    <li className="flex items-start gap-4 list-none">
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[#9A6033]">✓</span>
                        <span className="text-[#9A6033] font-semibold text-sm w-16">{item.time}</span>
                      </div>
                      <span className="text-[#3B2513] text-sm leading-relaxed">{item.text}</span>
                    </li>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={0.1} className="flex justify-center">
          <Link
            href="#"
            className="bg-[#3B2513] text-[#FAF2E1] text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-[#5B391E] hover:scale-[1.03] transition-all duration-150"
          >
            Become A Better Parent
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
