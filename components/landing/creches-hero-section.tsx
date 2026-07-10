import Link from "next/link";
import Image from "next/image";
import { LandingNav } from "./nav";

export function CrechesHeroSection() {
  return (
    <section className="bg-[#F5EFE4] relative overflow-hidden">
      <LandingNav variant="light" />

      <div className="px-4 sm:px-8 lg:px-16 pt-8 pb-14 sm:pb-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-[600px] mb-8 sm:mb-10">
            <div className="flex items-center gap-2 mb-6 sm:mb-8 flex-wrap">
              <span className="inline-flex items-center bg-[#EDE8E0] text-[#3B2513] text-xs font-medium px-4 py-1.5 rounded-full border border-[#D4C4B0]">
                For crèche operators
              </span>
              <span className="inline-flex items-center bg-[#EDE8E0] text-[#3B2513] text-xs font-medium px-4 py-1.5 rounded-full border border-[#D4C4B0]">
                Let us help you build parents&apos; trust
              </span>
            </div>

            <h1 className="text-[#1A1208] text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] mb-5 sm:mb-6">
              Be one of the crèches<br />
              parents recommend
            </h1>

            <p className="text-[#6B5744] text-sm sm:text-base leading-relaxed mb-8 sm:mb-10 max-w-[460px]">
              You&apos;re doing your best. CEven makes sure your child&apos;s crèche is doing theirs
              too. You don&apos;t have to choose between your career and your child; you can have
              both.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <Link
                href="#"
                className="flex items-center gap-2.5 bg-[#3B2513] text-[#FAF2E1] text-sm font-semibold px-5 py-3 rounded-full hover:bg-[#5B391E] transition-colors"
              >
                <Image src="/google-play-icon.png" alt="" width={16} height={16} className="w-4 h-4" />
                Download on Google Play
              </Link>
              <Link
                href="/for-parents"
                className="text-[#3B2513]/70 text-sm font-medium hover:text-[#3B2513] transition-colors flex items-center gap-1"
              >
                For Parents <span>→</span>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8DDD0] shadow-sm overflow-hidden max-w-5xl">
            <div className="bg-[#F8F5F0] px-5 py-3 flex items-center gap-2 border-b border-[#E8DDD0]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#E8DDD0]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#E8DDD0]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#E8DDD0]" />
            </div>
            <div className="h-40 sm:h-56 bg-gradient-to-br from-[#F5EFE4] to-[#EDE8E0] flex items-center justify-center">
              <p className="text-[#8B7355]/40 text-sm">Dashboard screenshot</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
