import Image from "next/image";

const NOTIFICATIONS = [
  {
    avatar: "/features/avatar-1.png",
    name: "Olivia Rhye",
    rest: "followed you!",
    sub: "@oliviarhye",
    opacity: 1,
  },
  {
    avatar: "/features/avatar-2.png",
    name: "Candice Wu",
    rest: "and 2 other gave you kudos on ",
    highlight: "Clubhouse 101",
    rest2: " post",
    sub: "",
    opacity: 1,
  },
  {
    avatar: "/features/avatar-3.png",
    name: "Phoenix Baker",
    rest: "joined your team ",
    highlight: "Melbourne Startups Growth",
    sub: "",
    opacity: 0.75,
  },
  {
    avatar: "/features/avatar-4.png",
    name: "Lana Steiner",
    rest: "just launched ",
    highlight: "The 10k users challenge workbook",
    sub: "",
    opacity: 0.5,
  },
];

const AI_QUERIES = [
  "Summarize today's report",
  "Any health patterns this week?",
  "How was my child's mood?",
  "What learning activity was done?",
];

export function FeaturesSection() {
  return (
    <section className="bg-[#FAF2E1] py-20 sm:py-28 px-4 sm:px-8">
      <div className="max-w-[1280px] mx-auto">
        {/* Section header */}
        <div className="text-center mb-14 max-w-[740px] mx-auto">
          <h2
            className="font-[family-name:var(--font-merriweather-import)] font-bold text-black leading-[1.2] mb-4"
            style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
          >
            <span className="text-[#c17c45]">For Parent, </span>
            you&apos;re never in the dark, and you can still reach in when you need to
          </h2>
          <p
            className="font-[family-name:var(--font-urbanist-import)] font-medium text-[#6b7280]"
            style={{ fontSize: "clamp(16px, 1.8vw, 24px)" }}
          >
            You&apos;re not checking in on your child. You&apos;re checking in on the day.
          </p>
        </div>

        {/* Bento grid */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
            {/* Card 1 — See what your child is doing */}
            <div className="lg:col-span-2 bg-[#fbfaf9] rounded-[12px] overflow-hidden relative min-h-[460px]">
              <div className="p-7 pb-3 max-w-[52%]">
                <h3 className="font-[family-name:var(--font-urbanist-import)] font-bold text-[#1c1917] text-[17px] leading-[1.2] tracking-[-0.02em] mb-2">
                  See what your child is doing, right now
                </h3>
                <p className="font-[family-name:var(--font-urbanist-import)] font-medium text-[#6a7074] text-[14px] leading-[1.47] tracking-[-0.02em]">
                  From wherever you are — mood, activity, hygiene, everything, logged as it happens. Not a summary later. The actual day, live.
                </p>
              </div>

              {/* Social post — bottom left */}
              <div className="absolute bottom-6 left-6" style={{ width: "258px" }}>
                <div className="bg-white rounded-[7px] overflow-hidden shadow-[4px_8px_20px_rgba(29,58,88,0.05)]">
                  <div className="relative h-[130px]">
                    <Image
                      src="/features/playground.png"
                      fill
                      alt="Playtime"
                      className="object-cover object-center"
                    />
                    <div className="absolute top-2 left-2 bg-[#3b2513] text-white text-[8px] font-[family-name:var(--font-urbanist-import)] px-2 py-0.5 rounded-[2px]">
                      Playtime
                    </div>
                    <div className="absolute bottom-2 left-2 flex gap-1">
                      <span className="w-[7px] h-[7px] rounded-full bg-white block" />
                      <span className="w-[7px] h-[7px] rounded-full bg-white/50 block" />
                      <span className="w-[7px] h-[7px] rounded-full bg-white/50 block" />
                    </div>
                  </div>
                  <div className="bg-white px-2.5 py-2">
                    <p className="font-[family-name:var(--font-urbanist-import)] font-normal text-[#1f2937] text-[11px] leading-[1.4] mb-1">
                      Esther had a wonderful time playing with her friends today!
                    </p>
                    <div className="flex justify-between text-[8px] text-[#6b7280] font-[family-name:var(--font-urbanist-import)] mb-2">
                      <span>2 hours ago</span>
                      <span>Posted by Sarah Johnson</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-100 pt-1.5">
                      <span className="text-[9px] text-[#6b7280] font-[family-name:var(--font-urbanist-import)]">💬 Comment</span>
                      <span className="text-[9px] text-[#6b7280] font-[family-name:var(--font-urbanist-import)]">🔖 Save</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Daily report app — right side */}
              <div className="absolute top-6 right-6" style={{ width: "230px" }}>
                <div className="rounded-[6px] overflow-hidden shadow-[3px_6px_7.5px_rgba(29,58,88,0.05)]">
                  <div className="bg-[#3b2513] px-3 py-2 flex items-center gap-2">
                    <span className="text-white text-[9px]">📅</span>
                    <span className="font-[family-name:var(--font-urbanist-import)] font-normal text-white text-[9px]">Friday, 9 January, 2026</span>
                  </div>
                  <div className="bg-[#f4f5f6] p-2 space-y-2">
                    <DailyCard bg="bg-[#fff2f8]" iconBg="bg-[#ffe6f4]" emoji="❤️" label="Mood" value="🤭 Playful  😂 Happy" />
                    <DailyCard bg="bg-[#fff6e6]" iconBg="bg-[#ffe5bb]" emoji="🍽️" label="Meals" value="3" />
                    <DailyCard bg="bg-[#edf2ff]" iconBg="bg-[#dee7ff]" emoji="🌙" label="Nap Time" value="09:00am – 12:35pm  ≈  3hr 35mins" />
                    <DailyCard bg="bg-[#ecfff8]" iconBg="bg-[#caffed]" emoji="🚿" label="Hygiene" value="1 urine, 2 poop" />
                    <div className="grid grid-cols-2 gap-2">
                      <SmallCard emoji="⚠️" label="Health & Safety" value="Nil" />
                      <SmallCard emoji="💊" label="Medications" value="Nil" />
                    </div>
                    <div className="bg-white border border-[#ccd2dc] rounded-[9px] p-2 h-[40px]">
                      <p className="font-[family-name:var(--font-urbanist-import)] text-[7px] text-[#858c98]">Any additional comments ...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 — You get notified */}
            <div className="bg-[#fbfaf9] rounded-[12px] overflow-hidden p-7">
              <h3 className="font-[family-name:var(--font-urbanist-import)] font-bold text-[#1c1917] text-[17px] leading-[1.2] tracking-[-0.02em] mb-2">
                You get notified
              </h3>
              <p className="font-[family-name:var(--font-urbanist-import)] font-medium text-[#6a7074] text-[14px] leading-[1.47] tracking-[-0.02em] mb-8">
                The moment something&apos;s worth knowing, it reaches you. No calling to check. No waiting for pickup.
              </p>
              <div className="flex flex-col gap-3">
                {NOTIFICATIONS.map((n, i) => (
                  <div
                    key={i}
                    className="backdrop-blur-[6px] bg-white/90 border border-white rounded-[6px] p-3 flex items-start gap-2.5"
                    style={{ opacity: n.opacity }}
                  >
                    <div className="relative w-[30px] h-[30px] rounded-full overflow-hidden shrink-0">
                      <Image src={n.avatar} fill alt={n.name} className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-[family-name:var(--font-urbanist-import)] font-medium text-[#344054] text-[10.5px] leading-[15px]">
                        <span className="text-[#c17c45]">{n.name}</span>
                        {" "}{n.rest}
                        {"highlight" in n && <span className="text-[#c17c45]">{n.highlight}</span>}
                        {"rest2" in n && n.rest2}
                      </p>
                      {n.sub && (
                        <p className="font-[family-name:var(--font-urbanist-import)] font-normal text-[#475467] text-[10.5px] leading-[15px]">{n.sub}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
            {/* Card 3 — One conversation */}
            <div className="bg-[#fbfaf9] rounded-[12px] overflow-hidden p-7 min-h-[460px]">
              <h3 className="font-[family-name:var(--font-urbanist-import)] font-bold text-[#1c1917] text-[17px] leading-[1.2] tracking-[-0.02em] mb-2">
                One conversation, everyone who needs to be in it
              </h3>
              <p className="font-[family-name:var(--font-urbanist-import)] font-medium text-[#6a7074] text-[14px] leading-[1.47] tracking-[-0.02em] mb-6">
                You, the other parent, the admin, and the caregiver — one thread, not four separate conversations to keep track of.
              </p>
              <div className="flex flex-col gap-3 max-w-[245px] mx-auto">
                <div className="flex justify-end">
                  <div className="bg-[#3b2513] text-white font-[family-name:var(--font-urbanist-import)] font-normal text-[10.5px] px-2.5 py-2 rounded-tl-[9px] rounded-bl-[9px] rounded-tr-[9px]">
                    Hello there
                  </div>
                </div>
                <div>
                  <div className="bg-[#f5f5f5] text-[#212121] font-[family-name:var(--font-urbanist-import)] font-normal text-[10.5px] px-4 py-3 rounded-br-[15px] rounded-bl-[15px] rounded-tl-[3px] rounded-tr-[15px] max-w-[214px]">
                    Hello! How may I assist you today?
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-[#3b2513] text-white font-[family-name:var(--font-urbanist-import)] font-normal text-[10.5px] px-2.5 py-2 rounded-tl-[9px] rounded-bl-[9px] rounded-tr-[9px]">
                    Summarize today&apos;s report
                  </div>
                </div>
                <div>
                  <div className="bg-[#f5f5f5] text-[#212121] font-[family-name:var(--font-urbanist-import)] font-normal text-[10.5px] px-4 py-3 rounded-br-[15px] rounded-bl-[15px] rounded-tl-[3px] rounded-tr-[15px] max-w-[214px] leading-[1.4]">
                    Of course! As an AI language model, I am designed to assist with a variety of tasks. Here are some examples of what I can do:
                    <ul className="list-disc pl-4 mt-1">
                      <li>Answer questions: Just ask me anything!</li>
                      <li>Generate text: I can write |</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4 — AI summary */}
            <div className="bg-[#fbfaf9] rounded-[12px] overflow-hidden p-7 min-h-[460px]">
              <h3 className="font-[family-name:var(--font-urbanist-import)] font-bold text-[#1c1917] text-[17px] leading-[1.2] tracking-[-0.02em] mb-2">
                AI summary of your child&apos;s day
              </h3>
              <p className="font-[family-name:var(--font-urbanist-import)] font-medium text-[#6a7074] text-[14px] leading-[1.47] tracking-[-0.02em] mb-6">
                Ask for a read on mood, meals, or the whole day, and get a real answer back — not a scroll through old messages trying to piece it together.
              </p>
              {/* St. Greg card */}
              <div className="bg-white rounded-[8px] shadow-[4px_8px_10px_rgba(29,58,88,0.05)] p-3 flex gap-3 mb-4">
                <div className="relative w-[80px] h-[80px] rounded-[6px] overflow-hidden shrink-0">
                  <Image src="/features/child-photo.png" fill alt="Child at creche" className="object-cover object-center" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-[family-name:var(--font-merriweather-import)] font-semibold text-[#1f2937] text-[13px] leading-[1.3] mb-0.5">St. Greg Creche</p>
                  <p className="font-[family-name:var(--font-urbanist-import)] font-normal text-[#6b7280] text-[12px] mb-2">Victoria Island, Lagos</p>
                  <div className="flex items-center gap-3 text-[11px] text-[#6b7280] font-[family-name:var(--font-urbanist-import)]">
                    <span>📍 0.7 km</span>
                    <span>⭐ 4.0</span>
                    <span>👥 5 spots</span>
                  </div>
                </div>
              </div>
              {/* AI query chips */}
              <div className="flex flex-col gap-1.5">
                {AI_QUERIES.map((q) => (
                  <div key={q} className="bg-[#ecfff8] flex items-center gap-1.5 px-2 py-1.5 rounded-[6px]">
                    <span className="text-[10px]">📄</span>
                    <span className="font-[family-name:var(--font-urbanist-import)] font-normal text-[#006745] text-[10.5px] whitespace-nowrap">{q}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 5 — Send a special request */}
            <div className="bg-[#fbfaf9] rounded-[12px] overflow-hidden min-h-[460px] relative">
              <div className="p-7">
                <h3 className="font-[family-name:var(--font-urbanist-import)] font-bold text-[#1c1917] text-[17px] leading-[1.2] tracking-[-0.02em] mb-2">
                  Send a special request
                </h3>
                <p className="font-[family-name:var(--font-urbanist-import)] font-medium text-[#6a7074] text-[14px] leading-[1.47] tracking-[-0.02em]">
                  Forgot to mention something at drop-off? Send it straight to the caregiver — medication, an errand, anything — no waiting till pickup to remember.
                </p>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[220px]">
                <Image
                  src="/features/request-ui.png"
                  alt="Special request UI"
                  width={220}
                  height={235}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DailyCard({
  bg,
  iconBg,
  emoji,
  label,
  value,
}: {
  bg: string;
  iconBg: string;
  emoji: string;
  label: string;
  value: string;
}) {
  return (
    <div className={`${bg} rounded-[6px] p-1.5 flex gap-1.5 items-start`}>
      <div className={`${iconBg} rounded-[2px] p-1 shrink-0 text-[10px]`}>{emoji}</div>
      <div className="min-w-0">
        <p className="font-[family-name:var(--font-urbanist-import)] font-normal text-[#343a40] text-[8px]">{label}</p>
        <p className="font-[family-name:var(--font-urbanist-import)] font-medium text-[#1f2937] text-[9px] leading-[1.3]">{value}</p>
      </div>
    </div>
  );
}

function SmallCard({ emoji, label, value }: { emoji: string; label: string; value: string }) {
  return (
    <div className="flex gap-1.5 items-start">
      <div className="bg-orange-50 rounded-[2px] p-1 shrink-0 text-[10px]">{emoji}</div>
      <div>
        <p className="font-[family-name:var(--font-urbanist-import)] font-normal text-[#343a40] text-[8px]">{label}</p>
        <p className="font-[family-name:var(--font-urbanist-import)] font-medium text-[#080730] text-[9px]">{value}</p>
      </div>
    </div>
  );
}
