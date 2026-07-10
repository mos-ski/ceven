import Link from "next/link";
import Image from "next/image";

const PAIN_POINTS = [
  {
    icon: "/HouseLine.png",
    title: "You can't be at work and at the crèche at the same time",
    description:
      "That tug between your career and being there for your child is real. CEven helps you stay connected and reassured.",
    bg: "bg-[#F0E8DC]",
    iconBg: "bg-[#E8DDD0]",
  },
  {
    icon: "/Notepad.png",
    title: "End-of-day verbal reports aren't enough",
    description:
      "A tired caregiver summarising 10 hours in 30 seconds at pickup doesn't give you the full picture. You deserve more.",
    bg: "bg-[#FFF5E6]",
    iconBg: "bg-[#FFF0D6]",
  },
  {
    icon: "/Users.png",
    title: "CEven adds a vital layer of peace of mind.",
    description:
      "For new parents, the village has shifted from close-knit family and friends to caregivers and childcare providers.",
    bg: "bg-[#F0E8DC]",
    iconBg: "bg-[#E8DDD0]",
  },
];

export function PainPointsSection() {
  return (
    <section className="bg-[#F5EFE4] px-4 sm:px-8 lg:px-16 pt-16 sm:pt-20 pb-20 sm:pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-10 sm:mb-14">
          <h2 className="text-[#1A1208] text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.2] mb-4">
            The gap between work and home<br className="hidden sm:block" />
            shouldn't cost you peace of mind
          </h2>
          <p className="text-[#6B5744] text-sm sm:text-base leading-relaxed">
            For the parents navigating early mornings and long days, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10 sm:mb-12">
          {PAIN_POINTS.map((point, i) => (
            <div
              key={i}
              className={`${point.bg} rounded-2xl p-6 sm:p-7 relative overflow-hidden`}
            >
              <DecorativeCircle />
              <div className={`${point.iconBg} w-14 h-14 rounded-xl flex items-center justify-center mb-5 sm:mb-6 relative z-10`}>
                <Image
                  src={point.icon}
                  alt=""
                  width={28}
                  height={28}
                  className="w-7 h-7 object-contain"
                />
              </div>
              <h3 className="text-[#1A1208] text-base sm:text-lg font-bold leading-snug mb-3 relative z-10">
                {point.title}
              </h3>
              <p className="text-[#6B5744] text-sm leading-relaxed relative z-10">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="/for-parents"
            className="bg-[#1A1208] text-[#FAF2E1] text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-[#3B2513] transition-colors"
          >
            Become A Better Parent
          </Link>
        </div>
      </div>
    </section>
  );
}

function DecorativeCircle() {
  return (
    <div className="absolute right-4 top-4 w-32 h-32 rounded-full border-[12px] border-[#D4C4B0]/30 opacity-50" />
  );
}
