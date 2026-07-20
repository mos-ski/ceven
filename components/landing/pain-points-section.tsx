import Image from "next/image";
import { FadeUp } from "@/components/animations/fade-up";

const CHECKLIST = [
  "Real-time push notifications for every update",
  "Full compiled day report waiting at pickup",
  "Two-way messaging with your child's caregiver",
  "Instant emergency alerts when seconds count",
];

const STARS = [0, 1, 2, 3, 4];

export function PainPointsSection() {
  return (
    <section className="bg-[#faf2e1] py-10 sm:py-12 min-h-screen px-4 sm:px-8 lg:px-[74px] overflow-hidden">
      <div className="max-w-[1549px] mx-auto flex flex-col gap-4 sm:gap-6">

        {/* ── Single frame: phones + white card ── */}
        <div className="relative">
          {/* Phone mockups — positioned to overflow above the white card */}
          <FadeUp>
            <div className="flex justify-center items-end px-6 h-[340px] sm:h-[420px] lg:h-[500px] relative z-10">
              {/* Left phone: upright */}
              <div className="relative w-[140px] sm:w-[190px] lg:w-[240px] h-[320px] sm:h-[400px] lg:h-[480px] shrink-0 z-10 -mr-4 sm:-mr-6">
                <Image
                  src="/landing/parents-app/phone-daily-report.png"
                  alt="CEven daily report screen"
                  fill
                  className="object-contain object-bottom drop-shadow-2xl"
                  sizes="(max-width: 640px) 140px, (max-width: 1024px) 190px, 240px"
                  priority
                />
              </div>
              {/* Right phone: rotated 7° */}
              <div
                className="relative w-[140px] sm:w-[190px] lg:w-[240px] h-[320px] sm:h-[400px] lg:h-[480px] shrink-0"
                style={{ transform: "rotate(7deg)" }}
              >
                <Image
                  src="/landing/parents-app/phone-arrivals-pickups.png"
                  alt="CEven arrivals and pickups screen"
                  fill
                  className="object-contain object-bottom drop-shadow-2xl"
                  sizes="(max-width: 640px) 140px, (max-width: 1024px) 190px, 240px"
                  priority
                />
              </div>
            </div>
          </FadeUp>

          {/* White pill card — overlaps bottom half of phones */}
          <div className="bg-white rounded-[56px] sm:rounded-[80px] lg:rounded-[113px] overflow-hidden -mt-24 sm:-mt-32 lg:-mt-40 relative z-0">
            <FadeUp delay={0.1}>
              <div className="flex flex-col items-center gap-6 sm:gap-8 px-6 sm:px-12 lg:px-16 pt-28 sm:pt-36 lg:pt-44 pb-10 sm:pb-12 lg:pb-14 text-center">

              <div className="flex flex-col gap-4 max-w-[740px]">
                <h2
                  className="font-[family-name:var(--font-merriweather-import)] font-bold text-black leading-[1.2]"
                  style={{ fontSize: "clamp(24px, 3.5vw, 46px)" }}
                >
                  You weren&apos;t there. Now you don&apos;t have to guess what happened.
                </h2>
                <p
                  className="font-[family-name:var(--font-urbanist-import)] font-medium text-[#6b7280]"
                  style={{ fontSize: "clamp(15px, 1.8vw, 24px)" }}
                >
                  No more piecing the day together from a tired handoff at pickup.
                </p>
              </div>

              {/* App store buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <div className="flex items-center gap-1 pl-1.5 pr-4 py-0.5 rounded-[12px] bg-[#3b2513] shadow-[inset_0px_4px_12px_0px_rgba(255,255,255,0.12)]">
                  <div className="relative w-[46px] h-[46px] shrink-0">
                    <Image
                      src="/landing/parents-app/google-play-icon.png"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-[family-name:var(--font-urbanist-import)] font-medium text-[#faf2e1] text-[16px] leading-[20px] whitespace-nowrap">
                    Google Play
                  </span>
                </div>
                <a
                  href="#"
                  className="flex items-center gap-2 h-[50px] px-4 rounded-[12px] border border-[#3d444f] text-[#3d444f] hover:bg-[#3d444f]/5 transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.18 1.27-2.16 3.8.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.84M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <span className="font-[family-name:var(--font-urbanist-import)] font-semibold text-[16px] leading-[20px] whitespace-nowrap">
                    App Store
                  </span>
                </a>
              </div>

              {/* Checklist */}
              <ul className="flex flex-col gap-3 items-start max-w-[400px] w-full">
                {CHECKLIST.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 shrink-0">
                      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                        <circle cx="12" cy="12" r="12" fill="#3b2513" opacity="0.08" />
                        <path d="M7 12.5L10 15.5L17 8.5" stroke="#3b2513" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="font-[family-name:var(--font-urbanist-import)] font-light text-black text-[15px] sm:text-[16px] leading-[24px] text-left">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

            </div>
          </FadeUp>
          </div>
        </div>

        {/* ── Testimonial ── */}
        <FadeUp delay={0.15}>
          <div className="pb-10 sm:pb-14 lg:pb-20 px-4 sm:px-8 lg:px-[12%] mt-10 sm:mt-16 lg:mt-24">
            <div className="bg-[#233243] rounded-[24px] overflow-hidden flex flex-col md:flex-row">

              {/* Left: quote */}
              <div className="flex-1 p-8 sm:p-12 lg:p-16 flex flex-col gap-8 justify-center">
                <div className="flex gap-1">
                  {STARS.map((i) => (
                    <svg key={i} width="20" height="20" viewBox="0 0 20 20" fill="#FEC84B">
                      <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.02l-4.94 2.68.94-5.49-4-3.9 5.53-.8L10 1.5z" />
                    </svg>
                  ))}
                </div>
                <p
                  className="font-[family-name:var(--font-urbanist-import)] font-medium text-white tracking-[-0.02em]"
                  style={{ fontSize: "clamp(20px, 2.6vw, 36px)", lineHeight: "1.22" }}
                >
                  I used to call the creche just to check my son had eaten lunch. Now I just&hellip; know. That&apos;s the whole thing.
                </p>
                <div className="flex flex-col gap-1">
                  <p className="font-[family-name:var(--font-urbanist-import)] font-semibold text-white text-[18px] leading-[28px]">
                    — Renee Wells
                  </p>
                  <p className="font-[family-name:var(--font-urbanist-import)] font-normal text-[#e4e7ec] text-[16px] leading-[24px]">
                    Product Designer, Quotient
                  </p>
                </div>
              </div>

              {/* Right: photo + play button */}
              <div className="relative w-full md:w-[420px] lg:w-[480px] shrink-0 min-h-[320px] md:min-h-[448px]">
                <div className="absolute inset-3 md:inset-4 rounded-2xl overflow-hidden">
                  <Image
                    src="/landing/parents-app/testimonial-photo.png"
                    alt="Parent holding child"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 480px"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src="/landing/parents-app/play-button.svg"
                      alt="Play video"
                      width={96}
                      height={96}
                      style={{ backdropFilter: "blur(9.6px)" }}
                      className="w-24 h-24"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}
