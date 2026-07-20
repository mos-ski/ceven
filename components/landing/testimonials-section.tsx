import Image from "next/image";

const STARS = [0, 1, 2, 3, 4];

export function TestimonialsSection() {
  return (
    <section className="bg-[#faf2e1] py-12 sm:py-16 lg:py-24 px-4 sm:px-8">
      <div className="max-w-[1280px] mx-auto px-0 sm:px-8">
        <div className="bg-[#233243] rounded-[24px] overflow-hidden flex flex-col md:flex-row">

          {/* Left: quote */}
          <div className="flex-1 p-8 sm:p-12 lg:p-16 flex flex-col gap-8 justify-center">
            {/* Stars */}
            <div className="flex gap-1">
              {STARS.map((i) => (
                <svg key={i} width="20" height="20" viewBox="0 0 20 20" fill="#FEC84B">
                  <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.02l-4.94 2.68.94-5.49-4-3.9 5.53-.8L10 1.5z" />
                </svg>
              ))}
            </div>

            {/* Quote */}
            <p
              className="font-['Inter'] font-medium text-white tracking-[-0.02em]"
              style={{ fontSize: "clamp(20px, 2.6vw, 36px)", lineHeight: "1.22" }}
            >
              I used to call the creche just to check my son had eaten lunch. Now I just&hellip; know. That&apos;s the whole thing.
            </p>

            {/* Attribution */}
            <div className="flex flex-col gap-1">
              <p className="font-['Inter'] font-semibold text-white text-[18px] leading-[28px]">
                — Renee Wells
              </p>
              <p className="font-['Inter'] font-normal text-[#e4e7ec] text-[16px] leading-[24px]">
                Product Designer, Quotient
              </p>
            </div>
          </div>

          {/* Right: photo with play button */}
          <div className="relative w-full md:w-[420px] lg:w-[480px] shrink-0 min-h-[320px] md:min-h-[448px]">
            <Image
              src="/landing/parents-app/testimonial-photo.png"
              alt="Parent holding child"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 480px"
            />
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-24 h-24" style={{ backdropFilter: "blur(9.6px)" }}>
                <Image
                  src="/landing/parents-app/play-button.png"
                  alt="Play video"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
