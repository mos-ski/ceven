import Link from "next/link";

const FEATURE_PILLS = [
  { emoji: "📋", label: "Daily Reports" },
  { emoji: "✅", label: "Attendance Tracking" },
  { emoji: "💬", label: "Parent Messaging" },
  { emoji: "🚨", label: "Emergency Alerts" },
  { emoji: "🤖", label: "AI Insights" },
  { emoji: "📊", label: "Visual Dashboard" },
  { emoji: "📈", label: "Development Tracking" },
];

const PARENT_BULLETS = [
  "Real-time push notifications for every update",
  "Full compiled day report waiting at pickup",
  "Two-way messaging with your child's caregiver",
  "Instant emergency alerts when seconds count",
];

const CRECHE_BULLETS = [
  "Professional daily reports that write themselves",
  "Reduce anxious parent calls by 3× or more",
  "Attendance tracking and incident logging",
  "Build the reputation that fills your waiting list",
];

function CheckIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M20 6L9 17L4 12"
        stroke="#C78C5F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7 17L17 7M17 7H7M17 7V17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FeaturesSection() {
  return (
    <section className="bg-[#FAF2E1] px-4 sm:px-8 lg:px-16 pt-16 sm:pt-24 pb-20 sm:pb-28">
      <div className="max-w-6xl mx-auto">

        {/* Headline */}
        <div className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-fraunces)] text-black text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.2] mb-4">
            Everything you need.<br />
            Nothing you don't.
          </h2>
          <p className="text-[#6b7280] text-xl font-medium">
            Built around the moments that matter most.
          </p>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-20">
          {FEATURE_PILLS.map((pill) => (
            <span
              key={pill.label}
              className="flex items-center gap-2 bg-[rgba(89,61,0,0.08)] text-[#3b2513] text-[15px] px-4 py-2 rounded-full border border-[#3b2513]"
            >
              <span className="text-lg leading-none">{pill.emoji}</span>
              {pill.label}
            </span>
          ))}
        </div>

        {/* Section label */}
        <div className="mb-8">
          <p className="text-black text-xl font-normal mb-3">
            Built for both
          </p>
          <h3 className="text-black text-4xl font-semibold">
            Two users. One platform.
          </h3>
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* For parents — no card */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <p className="text-[#3b2513] text-[28px] font-semibold leading-tight">
                  For parents
                </p>
                <p className="text-[#6b7280] text-base">
                  For the parents who care
                </p>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <h4 className="font-[family-name:var(--font-fraunces)] text-[#3b2513] text-[28px] font-normal leading-snug">
                    For working parents who{" "}
                    <em className="text-[#c78c5f] font-semibold">love fiercely</em>{" "}
                    and hustle hard
                  </h4>
                  <p className="text-[#6b7280] text-base leading-relaxed">
                    You didn't leave your child to not care. You left because
                    providing matters. CEven lets you do both.
                  </p>
                </div>

                <ul className="flex flex-col gap-4">
                  {PARENT_BULLETS.map((b) => (
                    <li key={b} className="flex items-center gap-3">
                      <CheckIcon />
                      <span className="text-black text-base font-light">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Link
              href="/for-parents"
              className="inline-flex items-center gap-2 border border-[#3b2513] text-[#3b2513] text-base font-semibold px-5 py-3 rounded-xl hover:bg-[#3b2513] hover:text-[#faf2e1] transition-colors w-fit"
            >
              Everything for parents
              <ArrowUpRight />
            </Link>
          </div>

          {/* For crèches — translucent card with golden shadow */}
          <div className="bg-[rgba(56,38,22,0.08)] border border-[#3b2513] rounded-[40px] overflow-hidden shadow-[0px_4px_32px_0px_rgba(255,195,68,0.24)]">
            <div className="p-8 flex flex-col gap-10">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <p className="text-[#3b2513] text-[28px] font-semibold leading-tight">
                    For crèches
                  </p>
                  <p className="text-[#6b7280] text-base">
                    For the organizations ready for growth
                  </p>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-3">
                    <h4 className="font-[family-name:var(--font-fraunces)] text-black text-[28px] font-normal leading-snug">
                      For crèches that want to be{" "}
                      <em className="text-[#c78c5f] font-semibold">unforgettable</em>
                    </h4>
                    <p className="text-[#6b7280] text-base leading-relaxed">
                      The crèches families recommend are the ones that communicate.
                      CEven makes that effortless.
                    </p>
                  </div>

                  <ul className="flex flex-col gap-4">
                    {CRECHE_BULLETS.map((b) => (
                      <li key={b} className="flex items-center gap-3">
                        <CheckIcon />
                        <span className="text-black text-base font-light">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link
                href="/for-creches"
                className="relative inline-flex items-center gap-2 bg-[#3b2513] text-[#faf2e1] text-base font-medium px-6 py-3 rounded-xl hover:bg-[#2a1a0d] transition-colors w-fit shadow-[inset_0px_4px_12px_0px_rgba(255,255,255,0.12)]"
              >
                Everything for crèches
                <ArrowUpRight />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
