const TESTIMONIALS = [
  {
    quote:
      "I used to call the crèche twice before noon. Now I don't. I see everything before they could even pick up.",
    name: "Chiamaka O.",
    role: "Working mother, Ikeja · Mother of two",
  },
  {
    quote:
      "Our parents stopped worrying because they stopped wondering. Our reviews changed. Our referrals doubled.",
    name: "Mrs. Adeyemi",
    role: "Owner, Sunflower Crèche · Lekki Phase 1",
  },
  {
    quote:
      "The first time I got a lunch report in the middle of a meeting, I almost cried. I felt like I was there.",
    name: "Emeka N.",
    role: "Father, first-time parent · Victoria Island",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-white px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-[#9B9B9B] text-xs font-semibold uppercase tracking-widest mb-4">
            What People Say
          </p>
          <h2 className="text-[#1A1208] text-4xl font-bold leading-[1.2]">
            The proof is in<br />
            the peace of mind.
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-[#F8F6F3] border border-[#E8E4DE] rounded-2xl p-7"
            >
              <QuoteIcon />
              <p className="text-[#1A1208] text-base leading-relaxed mt-4 mb-6">
                "{t.quote}"
              </p>
              <div>
                <p className="text-[#9A6033] font-semibold text-sm">{t.name}</p>
                <p className="text-[#9B9B9B] text-xs mt-0.5">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuoteIcon() {
  return (
    <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
      <path
        d="M0 20V12C0 8.667 0.833 5.917 2.5 3.75 4.167 1.583 6.583 0.333 9.75 0L11 2.25C9.167 2.583 7.75 3.375 6.75 4.625 5.75 5.875 5.25 7.333 5.25 9H10V20H0ZM17 20V12C17 8.667 17.833 5.917 19.5 3.75 21.167 1.583 23.583 0.333 26.75 0L28 2.25C26.167 2.583 24.75 3.375 23.75 4.625 22.75 5.875 22.25 7.333 22.25 9H27V20H17Z"
        fill="#D4C4B0"
      />
    </svg>
  );
}
