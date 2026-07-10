import Link from "next/link";
import Image from "next/image";
import { LandingNav } from "./nav";

export function HeroSection() {
  return (
    <section className="bg-[#FAF2E1] relative overflow-hidden">
      <LandingNav variant="light" />

      <div className="flex flex-col lg:flex-row items-start justify-between px-4 sm:px-8 lg:px-16 pt-4 pb-0 relative min-h-[auto] lg:min-h-[660px] gap-8">
        {/* Left: text content */}
        <div className="flex flex-col gap-4 max-w-[641px] pt-8 lg:pt-14 text-center lg:text-left w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[rgba(59,37,19,0.12)] border border-[rgba(255,195,68,0.5)] rounded-[6px] pl-1 pr-2 py-1 w-fit">
            <div className="bg-white rounded-[4px] px-2 py-1">
              <span className="font-[family-name:var(--font-plus-jakarta-sans)] font-medium text-sm text-black leading-5">
                For you:
              </span>
            </div>
            <span className="font-[family-name:var(--font-plus-jakarta-sans)] font-medium text-sm text-black leading-5">
              Childcare, Connected
            </span>
          </div>

          {/* Headline + subtitle */}
          <div className="flex flex-col gap-4">
            <h1
              className="font-[family-name:var(--font-fraunces)] font-semibold text-[#3b2513] leading-[1.1] text-[40px] sm:text-[56px] lg:text-[72px] xl:text-[80px]"
              style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
            >
              Show up at work.
              <br />
              <em
                className="font-[family-name:var(--font-fraunces)] italic text-[#c78c5f] not-italic"
                style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1', fontStyle: "italic" }}
              >
                Be present
              </em>{" "}
              at home
            </h1>

            <p className="font-[family-name:var(--font-plus-jakarta-sans)] font-normal text-[#3d444f] text-[18px] xl:text-[20px] leading-[1.6]">
              CEven provides real-time visibility into your child&apos;s daily
              experiences and wellbeing, enabling seamless communication between
              parents and caregivers.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-2">
            <Link
              href="#"
              className="relative flex items-center gap-1 pl-1.5 pr-4 py-0.5 rounded-[12px] bg-[#3b2513] shadow-[inset_0px_4px_12px_0px_rgba(255,255,255,0.12)] hover:bg-[#5b3921] transition-colors"
            >
              <div className="relative w-[46px] h-[46px] shrink-0">
                <Image
                  src="/google_play_icon.png.png"
                  alt="Google Play"
                  fill
                  sizes="46px"
                  className="object-contain"
                />
              </div>
              <span className="font-[family-name:var(--font-plus-jakarta-sans)] font-medium text-[#faf2e1] text-[16px] leading-5 whitespace-nowrap">
                Download on Google Play
              </span>
            </Link>

            <Link
              href="/for-parents"
              className="flex items-center justify-center gap-2 border border-[#3b2513] h-[50px] w-[162px] rounded-[12px] px-4 hover:bg-[#3b2513]/5 transition-colors"
            >
              <span className="font-[family-name:var(--font-plus-jakarta-sans)] font-semibold text-[#3b2513] text-[16px] leading-5">
                For Parents
              </span>
              <ArrowBendUpRight />
            </Link>
          </div>
        </div>

        {/* Right: phone mockup */}
        <div className="relative shrink-0 w-full max-w-[320px] sm:max-w-[400px] lg:w-[480px] lg:max-w-none xl:w-[540px] self-end mx-auto lg:mx-0 -mb-1">
          <Image
            src="/hero-phone-mockup.png"
            alt="CEven app on iPhone"
            width={563}
            height={800}
            className="object-contain w-full"
            priority
          />
        </div>
      </div>
    </section>
  );
}

function ArrowBendUpRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 3.5L14 7.5L10 11.5"
        stroke="#3b2513"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 12.5C2 12.5 2 7.5 7 7.5H14"
        stroke="#3b2513"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
