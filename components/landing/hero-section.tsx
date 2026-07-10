import Link from "next/link";
import Image from "next/image";
import { LandingNav } from "./nav";

export function HeroSection() {
  return (
    <section className="bg-[#3B2513] min-h-[700px] relative overflow-hidden">
      <LandingNav />

      <div className="flex items-center justify-between px-12 pt-10 pb-0 relative z-10">
        <div className="max-w-[560px]">
          <div className="inline-flex items-center gap-2 bg-[#5B391E] text-[#FAF2E1]/80 text-xs font-medium px-4 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9A6033]" />
            For you · Children Connected
          </div>

          <h1 className="text-[#FAF2E1] text-5xl leading-[1.15] font-bold mb-6">
            Show up at work.<br />
            <em className="not-italic text-[#C8823A]">Be present</em>{" "}
            at home
          </h1>

          <p className="text-[#FAF2E1]/60 text-base leading-relaxed mb-10 max-w-[440px]">
            CEven provides real-time visibility into your child's daily
            experiences and wellbeing, enabling seamless communication between
            parents and caregivers.
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
              className="text-[#FAF2E1]/80 text-sm font-medium hover:text-[#FAF2E1] transition-colors flex items-center gap-1"
            >
              For Parents <span>→</span>
            </Link>
          </div>
        </div>

        <div className="relative w-[380px] h-[520px] flex-shrink-0">
          <div className="absolute inset-0 flex items-end justify-center">
            <div className="w-[240px] h-[480px] bg-[#5B391E]/40 rounded-[40px] border border-[#FAF2E1]/10 flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-[#5B391E]/60 to-[#3B2513]/80 flex items-center justify-center">
                <span className="text-[#FAF2E1]/20 text-xs text-center px-6">Phone mockup</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1280 60" preserveAspectRatio="none" className="w-full h-16 block">
          <path
            d="M0,60 L0,30 C50,5 100,55 150,30 C200,5 250,52 300,28 C350,4 400,50 450,28 C500,6 550,52 600,30 C650,8 700,54 750,32 C800,10 850,56 900,34 C950,12 1000,58 1050,36 C1100,14 1150,60 1200,38 C1230,27 1260,46 1280,36 L1280,60 Z"
            fill="#F5EFE4"
          />
        </svg>
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
