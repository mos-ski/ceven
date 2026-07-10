import Link from "next/link";
import { LandingNav } from "./nav";

export function ParentsHeroSection() {
  return (
    <section className="bg-[#F5EFE4] min-h-[560px]">
      <LandingNav variant="light" />

      <div className="px-12 pt-12 pb-20 text-center max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          <span className="inline-flex items-center bg-[#EDE8E0] text-[#3B2513] text-xs font-medium px-4 py-1.5 rounded-full border border-[#D4C4B0]">
            For working parents
          </span>
          <span className="inline-flex items-center bg-[#EDE8E0] text-[#3B2513] text-xs font-medium px-4 py-1.5 rounded-full border border-[#D4C4B0]">
            Let's make parenting easier for you
          </span>
        </div>

        <h1 className="font-[family-name:var(--font-merriweather-import)] text-[#1A1208] text-6xl leading-[1.1] font-bold mb-6">
          Let's make parenting<br />
          easier for you.
        </h1>

        <p className="text-[#6B5744] text-base leading-relaxed mb-10 max-w-xl mx-auto">
          You're doing your best. CEven makes sure your child's crèche is doing theirs too.
          You don't have to choose between your career and your child, you can chose both.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="#"
            className="flex items-center gap-2.5 bg-[#3B2513] text-[#FAF2E1] text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-[#5B391E] transition-colors"
          >
            <PlayStoreIcon />
            Download on Google Play
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-2 border border-[#3B2513]/30 text-[#3B2513] text-sm font-medium px-6 py-3.5 rounded-full hover:border-[#3B2513] hover:bg-[#3B2513]/5 transition-colors"
          >
            Reach Out <span>↗</span>
          </Link>
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
