import Link from "next/link";

const FEATURE_PILLS = [
  "Daily Reports",
  "Attendance Tracking",
  "Parent Messaging",
  "Emergency Alerts",
  "AI Insights",
  "Visual Dashboard",
  "Development Tracking",
];

const PARENT_BULLETS = [
  "You never leave your child in the dark.",
  "Full completed day report waiting at pickup.",
  "2-way messaging with your child's caregiver.",
  "Instant emergency alerts when seconds count.",
];

const CRECHE_BULLETS = [
  "Professional daily reports that write themselves.",
  "Reduce anxious parent calls by 3x or more.",
  "Attendance tracking and incident logging.",
  "Build the reputation that fills your waiting list.",
];

export function FeaturesSection() {
  return (
    <section className="bg-[#F5EFE4] px-12 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-[#1A1208] text-4xl font-bold leading-[1.2] mb-3">
            Everything you need.<br />
            Nothing you don't.
          </h2>
          <p className="text-[#6B5744] text-base">
            Built around the moments that matter most.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2.5 mb-20">
          {FEATURE_PILLS.map((pill) => (
            <span
              key={pill}
              className="flex items-center gap-1.5 bg-[#FAF2E1] text-[#3B2513] text-sm font-medium px-4 py-2 rounded-full border border-[#D4C4B0]/60"
            >
              <span className="text-[#9A6033]">✓</span>
              {pill}
            </span>
          ))}
        </div>

        <div className="mb-10">
          <p className="text-[#9A6033] text-sm font-semibold uppercase tracking-widest mb-1">
            Built for both
          </p>
          <h3 className="text-[#1A1208] text-3xl font-bold">
            Two users. One platform.
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="bg-[#FFF9F0] rounded-2xl p-8 border border-[#E8DDD0]">
            <p className="text-[#9A6033] text-xs font-semibold uppercase tracking-widest mb-4">
              For parents
            </p>
            <h4 className="text-[#1A1208] text-2xl font-bold leading-snug mb-4">
              For working parents who love{" "}
              <em className="text-[#C8823A]">fiercely</em> and hustle hard
            </h4>
            <p className="text-[#6B5744] text-sm leading-relaxed mb-6">
              You don't leave your child in not-care. You left because the Third Mainland
              is already moving. CEven keeps the distance between you and them shorter.
            </p>
            <ul className="space-y-2.5 mb-8">
              {PARENT_BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-[#3B2513]">
                  <span className="text-[#9A6033] mt-0.5">✓</span>
                  {b}
                </li>
              ))}
            </ul>
            <Link
              href="/for-parents"
              className="inline-flex items-center gap-1.5 text-[#3B2513] text-sm font-semibold hover:text-[#9A6033] transition-colors"
            >
              Everything for parents →
            </Link>
          </div>

          <div className="bg-[#3B2513] rounded-2xl p-8">
            <p className="text-[#9A6033] text-xs font-semibold uppercase tracking-widest mb-4">
              For crèches
            </p>
            <h4 className="text-[#FAF2E1] text-2xl font-bold leading-snug mb-4">
              For crèches that want to be{" "}
              <em className="text-[#C8823A] not-italic font-extrabold">unforgettable</em>
            </h4>
            <p className="text-[#FAF2E1]/60 text-sm leading-relaxed mb-6">
              The crèche families recommend isn't born by chance. It's built by digital trust,
              consistent reporting, and communication that works.
            </p>
            <ul className="space-y-2.5 mb-8">
              {CRECHE_BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-[#FAF2E1]/80">
                  <span className="text-[#C8823A] mt-0.5">✓</span>
                  {b}
                </li>
              ))}
            </ul>
            <Link
              href="/for-creches"
              className="inline-flex items-center gap-1.5 text-[#C8823A] text-sm font-semibold hover:text-[#FAF2E1] transition-colors"
            >
              Everything for crèches →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
