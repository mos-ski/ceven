import Image from "next/image";

const BULLET_POINTS = [
  "You leave before sunrise because the Third Mainland is already moving.",
  "The crèche on Victoria Island doesn't have a parent portal — just a WhatsApp group of 31 unread messages.",
  "You've called the crèche from a meeting bathroom in Lekki Phase 1.",
  "Your mother says you should work less. Your ambition says no.",
  "Pickup is at 5:30 PM and you're still in a client call at 5:00.",
];

const CALLOUTS = [
  {
    title: "The village has changed",
    body: "For new parents, the village has shifted from close-knit family and friends to caregivers and childcare providers.",
  },
  {
    title: "The crèche is not the enemy",
    body: "Providing for your child is an act of love. Hustle is not guilt. The distance between them is a communication gap.",
  },
  {
    title: "Crèches deserve better tools too",
    body: "The crèche families recommend isn't born by chance. It's built by digital trust.",
  },
];

export function AmbitionsSection() {
  return (
    <section className="bg-[#F5EFE4] px-4 sm:px-8 lg:px-16 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="/Frame 1686561190.png"
              alt="Children at a crèche"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="text-[#1A1208] text-2xl sm:text-3xl font-bold leading-snug mb-3">
              For the busy work mornings.<br />
              For your career and ambitions
            </h2>
            <p className="text-[#6B5744] text-sm leading-relaxed mb-8">
              CEven is built so your child is always seen, safe, and cared for
              — wherever you are.
            </p>

            <ul className="space-y-3 mb-10">
              {BULLET_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-[#3B2513] leading-relaxed">
                  <span className="text-[#9A6033] mt-0.5 flex-shrink-0">✓</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
          {CALLOUTS.map((callout) => (
            <div
              key={callout.title}
              className="bg-[#FFF9F0] border border-[#E8DDD0] rounded-2xl p-5 sm:p-6"
            >
              <h4 className="text-[#1A1208] text-base font-bold mb-2">
                {callout.title}
              </h4>
              <p className="text-[#6B5744] text-sm leading-relaxed">
                {callout.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
