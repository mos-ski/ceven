"use client";

import Link from "next/link";
import Image from "next/image";
import { FadeUp } from "@/components/animations/fade-up";
import { Stagger, StaggerItem } from "@/components/animations/stagger";

const FEATURES = [
  {
    title: "Morning Dashboard",
    description:
      "Live KPIs: enrolled children present today, absent, staff on duty, outstanding fees, open incidents.",
  },
  {
    title: "Full Staff Oversight",
    description:
      "Track attendance, compliance notes and payroll — with AI flags for anyone falling below threshold.",
  },
  {
    title: "Financial Control",
    description:
      "Outstanding fees, invoices, and AI-driven cost tracking. Your revenue picture stays clear.",
  },
  {
    title: "AI-Powered Intelligence",
    description:
      "IDA surfaces what needs your attention before you even ask — and drafts responses so you never start from blank.",
  },
];

export function CrechesPlatformSection() {
  return (
    <section className="bg-[#F5EFE4] px-4 sm:px-8 lg:px-16 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto">
        <FadeUp className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-merriweather-import)] font-bold text-[#1A1208] text-4xl leading-[1.2] mb-3">
            One platform. Every role.<br />
            Nobody left behind.
          </h2>
          <p className="text-[#6B5744] text-base">
            Built around the moments that matter most.
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <span className="bg-[#3B2513] text-[#FAF2E1] text-xs font-semibold px-4 py-1.5 rounded-full">
              Owner/Manager
            </span>
            <span className="bg-transparent text-[#3B2513] text-xs font-semibold px-4 py-1.5 rounded-full border border-[#D4C4B0]">
              Caregiver
            </span>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-start">
          <FadeUp delay={0}>
            <div>
              <div className="bg-white rounded-2xl border border-[#E8DDD0] shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-md transition-all duration-200">
                <div className="bg-[#F8F5F0] px-4 py-3 flex items-center gap-2 border-b border-[#E8DDD0]">
                  <div className="w-2 h-2 rounded-full bg-[#E8DDD0]" />
                  <div className="w-2 h-2 rounded-full bg-[#E8DDD0]" />
                  <div className="w-2 h-2 rounded-full bg-[#E8DDD0]" />
                </div>
                <div className="bg-[#F5EFE4]">
                  <Image
                    src="/3b0c2300f6f2a4506b35c6b411f0f4972f61b6e9.png"
                    alt="CEven owner dashboard shown inside a laptop mockup"
                    width={3846}
                    height={2344}
                    className="h-auto w-full object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
              </div>
              <div className="mt-5">
                <h3 className="text-[#1A1208] font-bold text-lg mb-2">
                  CEven run the whole operation from a single screen.
                </h3>
                <p className="text-[#6B5744] text-sm leading-relaxed">
                  The crèche owner or manager gets a comprehensive web dashboard. Every morning
                  starts with an AI-generated briefing — what needs attention, who&apos;s at risk,
                  what&apos;s outstanding. The big picture, always in focus.
                </p>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div>
              <p className="text-[#3B2513] font-bold text-lg mb-6">
                Everything your crèche needs.
              </p>
              <Stagger className="space-y-6">
                {FEATURES.map((f) => (
                  <StaggerItem key={f.title}>
                    <div className="flex gap-4">
                      <span className="text-[#9A6033] mt-0.5 flex-shrink-0">✦</span>
                      <div>
                        <p className="text-[#1A1208] font-semibold text-sm mb-1">{f.title}</p>
                        <p className="text-[#6B5744] text-sm leading-relaxed">{f.description}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-[#3B2513] text-sm font-semibold hover:text-[#9A6033] transition-colors"
                >
                  Everything for crèches →
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
