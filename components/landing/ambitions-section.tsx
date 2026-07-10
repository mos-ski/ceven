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
    <section className="bg-[#F5EFE4] px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 gap-16 items-start">
          <div>
            <div className="w-full h-[380px] rounded-2xl overflow-hidden bg-[#D4C4B0] mb-0 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[#8B7355]/40 text-sm">Photo placeholder</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-[#1A1208] text-3xl font-bold leading-snug mb-3">
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

        <div className="grid grid-cols-3 gap-5 mt-8">
          {CALLOUTS.map((callout) => (
            <div
              key={callout.title}
              className="bg-[#FFF9F0] border border-[#E8DDD0] rounded-2xl p-6"
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
