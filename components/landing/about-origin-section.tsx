import Link from "next/link";

export function AboutOriginSection() {
  return (
    <section className="bg-[#F5EFE4] px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-[#1A1208] text-4xl font-bold mb-2">
            Where CEven came from?
          </h2>
          <p className="text-[#6B5744] text-base">Let's walk through a quick story.</p>
        </div>

        <div className="grid grid-cols-2 gap-16 items-start">
          <div className="relative">
            <div className="relative h-[380px]">
              <svg viewBox="0 0 420 380" className="absolute inset-0 w-full h-full" fill="none">
                <path
                  d="M200,15 C280,5 370,55 395,145 C420,235 385,335 295,358 C205,381 105,348 62,258 C18,168 48,62 128,28 C158,16 178,20 200,15Z"
                  fill="#D4C4B0"
                />
              </svg>
              <div
                className="absolute inset-10 flex items-center justify-center"
                style={{ clipPath: "ellipse(45% 48% at 50% 50%)" }}
              >
                <div className="w-full h-full bg-[#C4B4A0] flex items-center justify-center rounded-full">
                  <span className="text-[#8B7355]/40 text-xs">Mother & child photo</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[#3B2513] text-base leading-relaxed mb-5">
              Njijiwe has just given birth to a beautiful baby girl. There were
              celebrations and loads of joy in her household, as it was their first child.
              But the joy didn't settle in before reality really hit.
            </p>
            <p className="text-[#3B2513] text-base leading-relaxed mb-7">
              She'd go back to work six weeks after her baby was born — because the bills
              don't care about maternity leave. She would, and didn't, evaporate with a
              birth announcement. Every morning she left the house, she carried something
              heavier than her laptop bag.
            </p>

            <blockquote className="bg-[#FFF9F0] border border-[#E8DDD0] rounded-2xl p-6 mb-7 relative">
              <p className="text-[#1A1208] text-lg font-semibold leading-snug italic">
                "What is she doing right now? Is she okay?<br />
                Does she know I'm coming back?"
              </p>
            </blockquote>

            <p className="text-[#3B2513] text-base leading-relaxed mb-5">
              She would call the crèche. Sometimes they picked up. Sometimes she got a
              hurried "she's fine" and had to trust that. The end-of-day verbal debrief
              rarely covered what she actually experienced. She started to wonder: why
              doesn't technology solve this?
            </p>
            <p className="text-[#3B2513] text-base leading-relaxed mb-5">
              CEven is the answer to that question. A childcare management platform built
              to close the visibility gap between working parents and the crèches they
              entrust their children to — not through surveillance, but through
              communication, structure, and trust.
            </p>
            <p className="text-[#6B5744] text-sm leading-relaxed mb-8">
              We are part of Swayosoo, a technology company building digital ecosystems
              for African families.
            </p>

            <Link
              href="/for-parents"
              className="inline-block bg-[#3B2513] text-[#FAF2E1] text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-[#5B391E] transition-colors"
            >
              Become A Better Parent
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
