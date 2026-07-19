import Image from "next/image";
import Link from "next/link";

const CHECKLIST = [
  "Real-time push notifications for every update",
  "Full compiled day report waiting at pickup",
  "Two-way messaging with your child's caregiver",
  "Instant emergency alerts when seconds count",
];

export function CtaBanner() {
  return (
    <section className="bg-[#FAF2E1] px-4 sm:px-8 lg:px-16 pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-6 sm:gap-8">

        {/* ── Phone mockups floating above the pill ── */}
        <div className="relative flex items-end justify-center gap-2 sm:gap-6 z-10 -mb-24 sm:-mb-32 lg:-mb-40 px-4">
          <div className="relative w-[160px] sm:w-[210px] lg:w-[260px] aspect-[323/688] drop-shadow-xl">
            <Image
              src="/dl-phone-1.png"
              alt="CEven daily report screen"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 160px, (max-width: 1024px) 210px, 260px"
              priority
            />
          </div>
          <div className="relative w-[160px] sm:w-[210px] lg:w-[260px] aspect-[323/688] rotate-[7deg] drop-shadow-xl mb-6 sm:mb-10">
            <Image
              src="/dl-phone-2.png"
              alt="CEven arrivals and pickups screen"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 160px, (max-width: 1024px) 210px, 260px"
              priority
            />
          </div>
        </div>

        {/* ── White pill container ── */}
        <div className="bg-white rounded-[48px] sm:rounded-[72px] lg:rounded-[100px] pt-28 sm:pt-40 lg:pt-48 pb-12 sm:pb-16 px-6 sm:px-12 lg:px-16 flex flex-col items-center gap-6 sm:gap-8 text-center">

          {/* Heading */}
          <div className="flex flex-col gap-4 max-w-[739px]">
            <h2 className="font-[family-name:var(--font-merriweather-import)] font-bold text-black text-[28px] sm:text-[36px] lg:text-[46px] leading-[1.2]">
              Take CEven with you, wherever the day happens.
            </h2>
            <p className="font-[family-name:var(--font-plus-jakarta-sans)] font-medium text-[#6b7280] text-[16px] sm:text-[18px] lg:text-[24px] leading-normal max-w-[702px]">
              Available for parents and caregivers, on iOS and Android.
            </p>
          </div>

          {/* Download buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Google Play */}
            <Link
              href="#"
              className="relative flex items-center gap-1 pl-1.5 pr-4 py-0.5 rounded-[12px] bg-[#3b2513] shadow-[inset_0px_4px_12px_0px_rgba(255,255,255,0.12)] hover:opacity-90 transition-opacity"
            >
              <div className="relative w-[46px] h-[46px] shrink-0">
                <Image
                  src="/dl-google-play.png"
                  alt="Google Play"
                  fill
                  className="object-contain"
                  sizes="46px"
                />
              </div>
              <span className="font-[family-name:var(--font-plus-jakarta-sans)] font-medium text-[#faf2e1] text-[16px] leading-[20px] whitespace-nowrap">
                Google Play
              </span>
            </Link>

            {/* App Store */}
            <Link
              href="#"
              className="flex items-center gap-2 h-[50px] px-4 rounded-[12px] border border-[#3d444f] hover:bg-[#3d444f]/5 transition-colors"
            >
              <div className="relative w-6 h-6 shrink-0">
                <Image
                  src="/dl-apple-icon.png"
                  alt="Apple"
                  fill
                  className="object-contain"
                  sizes="24px"
                />
              </div>
              <span className="font-[family-name:var(--font-plus-jakarta-sans)] font-semibold text-[#3d444f] text-[16px] leading-[20px] whitespace-nowrap">
                App Store
              </span>
            </Link>
          </div>

          {/* Checklist */}
          <ul className="flex flex-col gap-4 items-start max-w-[391px] w-full">
            {CHECKLIST.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <div className="relative w-6 h-6 shrink-0">
                  <Image
                    src="/dl-check.png"
                    alt=""
                    fill
                    className="object-contain"
                    sizes="24px"
                  />
                </div>
                <span className="font-[family-name:var(--font-plus-jakarta-sans)] font-light text-black text-[16px] leading-[24px]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
