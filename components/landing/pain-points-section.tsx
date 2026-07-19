import Image from "next/image";

const FEATURES = [
  "Real-time push notifications for every update",
  "Full compiled day report waiting at pickup",
  "Two-way messaging with your child's caregiver",
  "Instant emergency alerts when seconds count",
];

export function PainPointsSection() {
  return (
    <section className="bg-[#FAF2E1] overflow-hidden">
      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">

        {/* Phones — absolutely overlapping card top */}
        <div className="absolute top-0 inset-x-0 flex justify-center z-10 pointer-events-none px-4">
          <div className="flex items-start justify-center gap-3 sm:gap-6 lg:gap-8">
            {/* Phone 1 — Daily Report */}
            <div className="w-[120px] sm:w-[180px] lg:w-[240px] shrink-0 mt-2 sm:mt-4">
              <Image
                src="/pain-points/phone-1.png"
                alt="CEven daily report screen"
                width={323}
                height={688}
                className="w-full h-auto drop-shadow-xl"
              />
            </div>
            {/* Phone 2 — Arrivals & Pickups, rotated */}
            <div className="w-[120px] sm:w-[180px] lg:w-[240px] shrink-0 rotate-[7.01deg] -translate-y-1 sm:-translate-y-2">
              <Image
                src="/pain-points/phone-2.png"
                alt="CEven arrivals and pickups screen"
                width={323}
                height={688}
                className="w-full h-auto drop-shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* White card — sits below phone tops, content below phone bottoms */}
        <div
          className="relative z-0 bg-white rounded-[40px] sm:rounded-[60px] lg:rounded-[80px] text-center pb-16 px-4 sm:px-12 lg:px-20"
          style={{ marginTop: "80px", paddingTop: "clamp(220px, 38vw, 540px)" }}
        >
          {/* Headline */}
          <div className="max-w-[740px] mx-auto">
            <h2
              className="font-[family-name:var(--font-merriweather-import)] font-bold text-black leading-[1.2]"
              style={{ fontSize: "clamp(24px, 3.5vw, 46px)" }}
            >
              You weren&apos;t there. Now you don&apos;t have to guess what happened.
            </h2>
            <p
              className="font-[family-name:var(--font-plus-jakarta-sans)] font-medium text-[#6b7280] mt-4"
              style={{ fontSize: "clamp(15px, 1.8vw, 24px)" }}
            >
              No more piecing the day together from a tired handoff at pickup.
            </p>
          </div>

          {/* App store buttons */}
          <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
            {/* Google Play */}
            <div className="relative inline-flex items-center gap-1 pl-[6px] pr-4 py-[2px] rounded-[12px] bg-[#3b2513] shadow-[inset_0px_4px_12px_0px_rgba(255,255,255,0.12)] cursor-pointer hover:opacity-90 transition-opacity">
              <div className="relative w-[46px] h-[46px] shrink-0">
                <Image
                  src="/pain-points/google-play-icon.png"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-[family-name:var(--font-plus-jakarta-sans)] font-medium text-[#faf2e1] text-[16px] leading-[20px] whitespace-nowrap">
                Google Play
              </span>
            </div>

            {/* App Store */}
            <div className="inline-flex items-center gap-2 h-[50px] px-4 rounded-[12px] border border-[#3d444f] cursor-pointer hover:bg-[#3d444f]/5 transition-colors">
              <div className="relative w-[24px] h-[24px] shrink-0">
                <Image
                  src="/pain-points/apple-icon.png"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-[family-name:var(--font-plus-jakarta-sans)] font-semibold text-[#3d444f] text-[16px] leading-[20px] whitespace-nowrap">
                App Store
              </span>
            </div>
          </div>

          {/* Feature bullets */}
          <div className="flex flex-col items-center gap-4 mt-10">
            {FEATURES.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#3b2513]">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-[family-name:var(--font-plus-jakarta-sans)] font-light text-black text-[16px] leading-[24px] whitespace-nowrap">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
