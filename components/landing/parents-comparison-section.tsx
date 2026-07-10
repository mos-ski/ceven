import Link from "next/link";

const WITHOUT = [
  "You leave and know nothing until pickup",
  "You call the crèche — they're busy, no answer",
  "You check a WhatsApp group with 47 messages",
  "You miss a meeting moment, distracted, worried",
  'Pickup: "How was she?" "Fine." That\'s all you get.',
];

const WITH = [
  { time: "7:03 AM", text: "She arrived. Mood: happy. You breathe." },
  { time: "10:47 AM", text: "Art class. She painted a butterfly." },
  { time: "12:21 PM", text: "Lunch eaten fully. Nap started." },
  { time: "3:15 PM", text: "Outdoor play. A minor scrape. Handled." },
  { time: "5:15 PM", text: "Full report ready. You walk in knowing everything." },
];

export function ParentsComparisonSection() {
  return (
    <section className="bg-white px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center border border-[#3B2513]/20 text-[#3B2513] text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            The Difference
          </div>
          <h2 className="text-[#1A1208] text-4xl font-bold leading-[1.2] mb-3">
            A day without CEven.<br />
            <em className="text-[#C8823A] italic">A day with</em> CEven.
          </h2>
          <p className="text-[#6B5744] text-base">The same day. Two very different experiences.</p>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-12">
          <div>
            <h3 className="text-[#1A1208] text-xl font-bold mb-2">Without CEven</h3>
            <p className="text-[#9B9B9B] text-sm mb-6">You miss out on most moments of your child's life</p>
            <ul className="space-y-4">
              {WITHOUT.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[#9B9B9B] text-sm line-through decoration-[#C8823A]/60">
                  <span className="text-[#C8823A]/60 mt-0.5 no-underline flex-shrink-0">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#F8F6F3] border border-[#E8E4DE] rounded-2xl p-8">
            <h3 className="text-[#1A1208] text-xl font-bold mb-2">With CEven</h3>
            <p className="text-[#9B9B9B] text-sm mb-6">You stay on the loop, without losing focus at work.</p>
            <ul className="space-y-5">
              {WITH.map((item) => (
                <li key={item.time} className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[#9A6033]">✓</span>
                    <span className="text-[#9A6033] font-semibold text-sm w-16">{item.time}</span>
                  </div>
                  <span className="text-[#3B2513] text-sm leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-center">
          <Link
            href="#"
            className="bg-[#3B2513] text-[#FAF2E1] text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-[#5B391E] transition-colors"
          >
            Become A Better Parent
          </Link>
        </div>
      </div>
    </section>
  );
}
