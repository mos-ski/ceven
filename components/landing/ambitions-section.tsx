import Image from "next/image";
import { FadeUp } from "@/components/animations/fade-up";
import { Stagger, StaggerItem } from "@/components/animations/stagger";

const BULLET_POINTS = [
  "You leave before sunrise because the Third Mainland is already moving",
  "The crèche on Victoria Island doesn't have a parent portal — just a WhatsApp group",
  "You've called the crèche from a meeting bathroom in Lekki Phase 1",
  "Your mother says you should work less. Your ambition says otherwise.",
  "Pickup is at 5:30 PM and you're still in a client call at 5:00",
];

const CALLOUTS = [
  {
    title: "The village has changed",
    body: "It takes a village to raise a child — but in Lagos, the village is a WhatsApp group with 47 unread messages. CEven is infrastructure for the modern Nigerian family.",
  },
  {
    title: "Your career is not the enemy",
    body: "Providing for your child is an act of love. Hustle is not guilt. CEven exists so you don't have to choose between presence at work and presence at home.",
  },
  {
    title: "Crèches deserve better tools too",
    body: "Nigerian crèche operators are running serious businesses with paper registers and verbal handovers. CEven professionalises their work — and their reputation.",
  },
];

export function AmbitionsSection() {
  return (
    <section className="bg-[#F5EFE4] px-4 sm:px-8 lg:px-16 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto">
        {/* Centered heading */}
        <FadeUp className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <h2
            className="font-[family-name:var(--font-fraunces)] text-[#1A1208] text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.15] mb-4 sm:mb-5"
            style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
          >
            For the busy work mornings.<br />
            For your career and ambitions
          </h2>
          <p className="text-[#6B5744] text-sm sm:text-base leading-relaxed">
            CEven is built so your child is always seen, safe, and cared for
            <br className="hidden sm:block" />
            — wherever you are.
          </p>
        </FadeUp>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left: circular photo + bullet list */}
          <FadeUp delay={0.05}>
            <div className="flex flex-col gap-8">
              <div className="relative w-[200px] sm:w-[220px] aspect-square rounded-full overflow-hidden shrink-0 mx-auto lg:mx-0">
                <Image
                  src="/Frame 1686561188.png"
                  alt="Mother and child"
                  fill
                  className="object-cover"
                />
              </div>

              <ul className="space-y-4">
                {BULLET_POINTS.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-sm text-[#3B2513] leading-relaxed"
                  >
                    <span className="text-[#9A6033] mt-0.5 flex-shrink-0 text-base leading-none">
                      →
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>

          {/* Right: 3 stacked bordered cards */}
          <Stagger className="flex flex-col gap-4">
            {CALLOUTS.map((callout, i) => (
              <StaggerItem key={callout.title}>
                <div className="bg-[#FFF9F0] border border-[#E8DDD0] rounded-2xl p-5 sm:p-6 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-150">
                  <h4 className="text-[#1A1208] text-base font-bold mb-2">
                    {callout.title}
                  </h4>
                  <p className="text-[#6B5744] text-sm leading-relaxed">
                    {callout.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
