import Link from "next/link";
import { LandingNav } from "./nav";

export function CrechesHeroSection() {
  return (
    <section className="bg-[#F5EFE4] min-h-[600px] relative overflow-hidden">
      <LandingNav variant="light" />

      <div className="px-12 pt-8 pb-20 relative z-10">
        <div className="max-w-[600px] mb-10">
          <div className="flex items-center gap-2 mb-8 flex-wrap">
            <span className="inline-flex items-center bg-[#EDE8E0] text-[#3B2513] text-xs font-medium px-4 py-1.5 rounded-full border border-[#D4C4B0]">
              For crèche operators
            </span>
            <span className="inline-flex items-center bg-[#EDE8E0] text-[#3B2513] text-xs font-medium px-4 py-1.5 rounded-full border border-[#D4C4B0]">
              Let us help you build parents' trust
            </span>
          </div>

          <h1 className="text-[#1A1208] text-5xl font-bold leading-[1.15] mb-6">
            Be one of the crèches<br />
            parents recommend
          </h1>

          <p className="text-[#6B5744] text-base leading-relaxed mb-10 max-w-[460px]">
            You're doing your best. CEven makes sure your child's crèche is doing theirs
            too. You don't have to choose between your career and your child; you can have
            both.
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="flex items-center gap-2.5 bg-[#3B2513] text-[#FAF2E1] text-sm font-semibold px-5 py-3 rounded-full hover:bg-[#5B391E] transition-colors"
            >
              <PlayStoreIcon />
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
          <div className="h-56 bg-gradient-to-br from-[#F5EFE4] to-[#EDE8E0] flex items-center justify-center">
            <p className="text-[#8B7355]/40 text-sm">Dashboard screenshot</p>
          </div>
        </div>
      </div>
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
