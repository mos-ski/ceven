import Link from "next/link";

const FEATURES = [
  {
    title: "Morning Dashboard",
    description:
      "Live KPIs: enrolled children present today, absent, staff on duty, outstanding fees, open incidents.",
  },
  {
    title: "Full Staff Oversight",
    description:
      "Track attendance, compliance notes and payroll — with AI flags for anyone falling below threshold.",
  },
  {
    title: "Financial Control",
    description:
      "Outstanding fees, invoices, and AI-driven cost tracking. Your revenue picture stays clear.",
  },
  {
    title: "AI-Powered Intelligence",
    description:
      "IDA surfaces what needs your attention before you even ask — and drafts responses so you never start from blank.",
  },
];

export function CrechesPlatformSection() {
  return (
    <section className="bg-[#F5EFE4] px-4 sm:px-8 lg:px-16 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-[#1A1208] text-4xl font-bold leading-[1.2] mb-3">
            One platform. Every role.<br />
            Nobody left behind.
          </h2>
          <p className="text-[#6B5744] text-base">
            Built around the moments that matter most.
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <span className="bg-[#3B2513] text-[#FAF2E1] text-xs font-semibold px-4 py-1.5 rounded-full">
              Owner/Manager
            </span>
            <span className="bg-transparent text-[#3B2513] text-xs font-semibold px-4 py-1.5 rounded-full border border-[#D4C4B0]">
              Caregiver
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-start">
          <div>
            <div className="bg-white rounded-2xl border border-[#E8DDD0] shadow-sm overflow-hidden">
              <div className="bg-[#F8F5F0] px-4 py-3 flex items-center gap-2 border-b border-[#E8DDD0]">
                <div className="w-2 h-2 rounded-full bg-[#E8DDD0]" />
                <div className="w-2 h-2 rounded-full bg-[#E8DDD0]" />
                <div className="w-2 h-2 rounded-full bg-[#E8DDD0]" />
              </div>
              <div className="h-72 bg-gradient-to-br from-[#F5EFE4] to-[#EDE8E0] flex items-center justify-center">
                <p className="text-[#8B7355]/40 text-sm">Owner dashboard</p>
              </div>
            </div>
            <div className="mt-5">
              <h3 className="text-[#1A1208] font-bold text-lg mb-2">
                CEven run the whole operation from a single screen.
              </h3>
              <p className="text-[#6B5744] text-sm leading-relaxed">
                The crèche owner or manager gets a comprehensive web dashboard. Every morning
                starts with an AI-generated briefing — what needs attention, who's at risk,
                what's outstanding. The big picture, always in focus.
              </p>
            </div>
          </div>

          <div>
            <p className="text-[#3B2513] font-bold text-lg mb-6">
              Everything your crèche needs.
            </p>
            <div className="space-y-6">
              {FEATURES.map((f) => (
                <div key={f.title} className="flex gap-4">
                  <span className="text-[#9A6033] mt-0.5 flex-shrink-0">✦</span>
                  <div>
                    <p className="text-[#1A1208] font-semibold text-sm mb-1">{f.title}</p>
                    <p className="text-[#6B5744] text-sm leading-relaxed">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-[#3B2513] text-sm font-semibold hover:text-[#9A6033] transition-colors"
              >
                Everything for crèches →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
