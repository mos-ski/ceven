import Link from "next/link";
import { LandingNav } from "./nav";

export function AboutHeroSection() {
  return (
    <section className="bg-[#3B2513] min-h-[560px] relative overflow-hidden">
      <LandingNav />

      <div className="flex items-center justify-between px-12 pt-8 pb-16 relative z-10">
        <div className="max-w-[520px]">
          <div className="inline-flex items-center gap-2 bg-[#5B391E] text-[#FAF2E1]/70 text-xs font-medium px-4 py-1.5 rounded-full mb-8">
            Our Story
          </div>

          <h1 className="text-[#FAF2E1] text-5xl leading-[1.15] font-bold mb-6">
            Built from a quiet,<br />
            <em className="text-[#C8823A] italic">very familiar guilt.</em>
          </h1>

          <p className="text-[#FAF2E1]/60 text-base leading-relaxed mb-10 max-w-[420px]">
            CEven didn't start in a boardroom. It started with a new mother, a
            new job, and a question she couldn't stop asking herself.
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="flex items-center gap-2.5 bg-[#FAF2E1] text-[#3B2513] text-sm font-semibold px-5 py-3 rounded-full hover:bg-white transition-colors"
            >
              <PlayStoreIcon />
              Download on Google Play
            </Link>
            <Link
              href="/for-parents"
              className="text-[#FAF2E1]/70 text-sm font-medium hover:text-[#FAF2E1] transition-colors flex items-center gap-1"
            >
              For Parents <span>→</span>
            </Link>
          </div>
        </div>

        <div className="relative w-[420px] h-[380px] flex-shrink-0">
          <BlobShape />
          <div className="absolute inset-8 rounded-[40%_60%_55%_45%/40%_45%_55%_60%] overflow-hidden bg-[#5B391E]/60 flex items-center justify-center">
            <span className="text-[#FAF2E1]/20 text-xs">Family photo</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1280 60" preserveAspectRatio="none" className="w-full h-14 block">
          <path
            d="M0,60 L0,30 C50,5 100,55 150,30 C200,5 250,52 300,28 C350,4 400,50 450,28 C500,6 550,52 600,30 C650,8 700,54 750,32 C800,10 850,56 900,34 C950,12 1000,58 1050,36 C1100,14 1150,60 1200,38 C1230,27 1260,46 1280,36 L1280,60 Z"
            fill="#F5EFE4"
          />
        </svg>
      </div>
    </section>
  );
}

function BlobShape() {
  return (
    <svg
      viewBox="0 0 420 380"
      className="absolute inset-0 w-full h-full"
      fill="none"
    >
      <path
        d="M210,20 C290,10 380,60 400,150 C420,240 380,340 290,360 C200,380 100,350 60,260 C20,170 50,60 130,30 C160,18 185,22 210,20Z"
        fill="#5B391E"
        opacity="0.4"
      />
    </svg>
  );
}

function PlayStoreIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 20.5v-17c0-.83 1-.83 1.5-.5l14 8.5c.5.3.5 1.2 0 1.5L4.5 21c-.5.33-1.5.33-1.5-.5z" />
    </svg>
  );
}
