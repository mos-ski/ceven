import Link from "next/link";

const PAIN_POINTS = [
  {
    icon: <HomeIcon />,
    title: "You can't be at work and at the crèche at the same time",
    description:
      "That tug between your career and being there for your child is real. CEven helps you stay connected and reassured.",
    bg: "bg-[#F0E8DC]",
    iconBg: "bg-[#E8DDD0]",
  },
  {
    icon: <ReportIcon />,
    title: "End-of-day verbal reports aren't enough",
    description:
      "A tired caregiver summarising 10 hours in 30 seconds at pickup doesn't give you the full picture. You deserve more.",
    bg: "bg-[#FFF5E6]",
    iconBg: "bg-[#FFF0D6]",
  },
  {
    icon: <PeopleIcon />,
    title: "CEven adds a vital layer of peace of mind.",
    description:
      "For new parents, the village has shifted from close-knit family and friends to caregivers and childcare providers.",
    bg: "bg-[#F0E8DC]",
    iconBg: "bg-[#E8DDD0]",
  },
];

export function PainPointsSection() {
  return (
    <section className="bg-[#F5EFE4] px-12 pt-20 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-14">
          <h2 className="text-[#1A1208] text-4xl font-bold leading-[1.2] mb-4">
            The gap between work and home<br />
            shouldn't cost you peace of mind
          </h2>
          <p className="text-[#6B5744] text-base leading-relaxed">
            For the parents navigating early mornings and long days,<br />
            we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-5 mb-12">
          {PAIN_POINTS.map((point, i) => (
            <div
              key={i}
              className={`${point.bg} rounded-2xl p-7 relative overflow-hidden`}
            >
              <DecorativeCircle />
              <div className={`${point.iconBg} w-14 h-14 rounded-xl flex items-center justify-center mb-6 relative z-10`}>
                {point.icon}
              </div>
              <h3 className="text-[#1A1208] text-lg font-bold leading-snug mb-3 relative z-10">
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

function HomeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7A5230" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </svg>
  );
}

function ReportIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8823A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="9" y1="7" x2="15" y2="7" />
      <line x1="9" y1="11" x2="15" y2="11" />
      <line x1="9" y1="15" x2="13" y2="15" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9A6033" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
