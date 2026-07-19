import Image from "next/image";

export function FamiliesCtaSection() {
  return (
    <section className="bg-[#FAF2E1] py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-16">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-12 lg:gap-16 items-center">

        {/* ── Heading ── */}
        <div className="flex flex-col gap-4 items-center text-center max-w-[895px]">
          <h2 className="font-[family-name:var(--font-merriweather-import)] font-bold text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.2] text-black">
            <span className="text-[#c17c45]">For Caregivers, </span>
            the work you&apos;re already doing becomes visible, and easier to do
          </h2>
          <p className="font-[family-name:var(--font-plus-jakarta-sans)] font-medium text-[#6b7280] text-[16px] sm:text-[20px] lg:text-[24px] leading-normal max-w-[702px]">
            This isn&apos;t more paperwork. It&apos;s proof of the work you&apos;re already doing.
          </p>
        </div>

        {/* ── Feature grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">

          {/* Card 1 — Log everything */}
          <div className="bg-[#fbfaf9] rounded-[12px] overflow-hidden flex flex-col">
            <div className="p-6 sm:p-7 flex flex-col gap-3">
              <h3 className="font-bold text-[#1c1917] text-[16px] sm:text-[17px] leading-[1.4] tracking-[-0.02em]">
                Log everything, in seconds
              </h3>
              <p className="font-medium text-[#6a7074] text-[13px] sm:text-[14px] leading-[1.5] tracking-[-0.02em]">
                Every activity, logged as it happens — so the work you do all day is visible, not invisible.
              </p>
            </div>
            <div className="mt-auto px-6 pb-0 flex justify-center">
              <div className="relative w-full max-w-[285px] h-[200px]">
                <Image
                  src="/caregiver-log.png"
                  alt="Log activity quick actions"
                  fill
                  className="object-contain object-bottom"
                  sizes="285px"
                />
              </div>
            </div>
          </div>

          {/* Card 2 — Manage children dashboard */}
          <div className="bg-[#fbfaf9] rounded-[12px] overflow-hidden flex flex-col">
            <div className="p-6 sm:p-7 flex flex-col gap-3">
              <h3 className="font-bold text-[#1c1917] text-[16px] sm:text-[17px] leading-[1.4] tracking-[-0.02em] max-w-[240px]">
                Manage every child and every classroom, in one app
              </h3>
              <p className="font-medium text-[#6a7074] text-[13px] sm:text-[14px] leading-[1.5] tracking-[-0.02em]">
                Multiple kids, multiple rooms — one place to track it all, not six different notebooks.
              </p>
            </div>
            <div className="mt-auto px-6 pb-0 flex justify-center">
              <div className="relative w-full max-w-[325px] h-[130px]">
                <Image
                  src="/caregiver-manage.png"
                  alt="Manage children dashboard"
                  fill
                  className="object-contain object-bottom"
                  sizes="325px"
                />
              </div>
            </div>
          </div>

          {/* Card 3 — Phone home screen mockup */}
          <div className="bg-[#fbfaf9] rounded-[12px] overflow-hidden flex flex-col">
            <div className="p-6 sm:p-7 flex flex-col gap-3">
              <h3 className="font-bold text-[#1c1917] text-[16px] sm:text-[17px] leading-[1.4] tracking-[-0.02em] max-w-[240px]">
                Manage every child and every classroom, in one app
              </h3>
              <p className="font-medium text-[#6a7074] text-[13px] sm:text-[14px] leading-[1.5] tracking-[-0.02em]">
                Multiple kids, multiple rooms — one place to track it all, not six different notebooks.
              </p>
            </div>
            <div className="mt-auto flex justify-center px-6 pb-0">
              <PhoneHomeMockup />
            </div>
          </div>

          {/* Card 4 — Tasks */}
          <div className="bg-[#fbfaf9] rounded-[12px] overflow-hidden flex flex-col">
            <div className="p-6 sm:p-7 flex flex-col gap-3">
              <h3 className="font-bold text-[#1c1917] text-[16px] sm:text-[17px] leading-[1.4] tracking-[-0.02em]">
                Tasks that don&apos;t let you forget
              </h3>
              <p className="font-medium text-[#6a7074] text-[13px] sm:text-[14px] leading-[1.5] tracking-[-0.02em]">
                Medication, reminders, requests from parents — they land here and stay until done. Nothing depends on memory.
              </p>
            </div>
            <div className="mt-auto px-6 pb-6 flex flex-col gap-2">
              <TaskCard />
              <TaskCard />
            </div>
          </div>

          {/* Card 5 — Know who's picking up */}
          <div className="bg-[#fbfaf9] rounded-[12px] overflow-hidden flex flex-col">
            <div className="p-6 sm:p-7 flex flex-col gap-3">
              <h3 className="font-bold text-[#1c1917] text-[16px] sm:text-[17px] leading-[1.4] tracking-[-0.02em] max-w-[276px]">
                Know who&apos;s picking up, before they arrive
              </h3>
              <p className="font-medium text-[#6a7074] text-[13px] sm:text-[14px] leading-[1.5] tracking-[-0.02em]">
                When a parent arranges pickup, you&apos;re told ahead of time — never caught off guard at the door.
              </p>
            </div>
            <div className="mt-auto px-6 pb-6 flex flex-col gap-2.5">
              <PickupCard name="Noah Davies" status="pending" />
              <PickupCard name="Johnson Emma" status="sent" />
            </div>
          </div>

          {/* Card 6 — Talk to parents */}
          <div className="bg-[#fbfaf9] rounded-[12px] overflow-hidden flex flex-col">
            <div className="p-6 sm:p-7 flex flex-col gap-3">
              <h3 className="font-bold text-[#1c1917] text-[16px] sm:text-[17px] leading-[1.4] tracking-[-0.02em]">
                Talk to parents directly
              </h3>
              <p className="font-medium text-[#6a7074] text-[13px] sm:text-[14px] leading-[1.5] tracking-[-0.02em]">
                Message, send photos, or hop on a video call — without leaving the app for WhatsApp.
              </p>
            </div>
            <div className="mt-auto px-6 pb-0">
              <ChatMockup />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function PhoneHomeMockup() {
  return (
    <div className="w-[200px] h-[240px] bg-[#fffefa] border-[4px] border-[#f3f3f3] rounded-[8px] overflow-hidden relative flex flex-col text-[6px]">
      {/* Status bar */}
      <div className="flex items-center justify-between px-3 py-1.5 shrink-0">
        <span className="text-black font-medium">9:41</span>
        <div className="flex gap-0.5 items-center">
          <div className="w-3 h-2 bg-black/80 rounded-sm" />
        </div>
      </div>
      {/* App bar */}
      <div className="flex items-center justify-between px-3 py-1 shrink-0">
        <div className="bg-[#f4f5f6] rounded-full flex items-center gap-1 px-2 py-1">
          <div className="w-3 h-3 rounded-full bg-[#d1d5db]" />
          <div>
            <p className="text-[5px] text-[#1f2937]">Welcome Back,</p>
            <p className="text-[6px] font-medium text-[#1f2937]">Ms Anu</p>
          </div>
        </div>
        <div className="w-5 h-5 rounded-full bg-[#f4f5f6] flex items-center justify-center">
          <div className="w-2.5 h-2.5 border border-[#6b7280] rounded-sm" />
        </div>
      </div>
      {/* Stats row */}
      <div className="flex gap-1.5 px-3 py-1 shrink-0">
        <div className="flex-1 bg-[#fff2f8] rounded p-1.5">
          <p className="text-[5px] text-[#343a40]">Total Classrooms</p>
          <p className="text-[7px] font-medium text-[#1f2937]">1</p>
        </div>
        <div className="flex-1 bg-[#ecfff8] rounded p-1.5">
          <p className="text-[5px] text-[#343a40]">Total Children</p>
          <p className="text-[7px] font-medium text-[#1f2937]">5</p>
        </div>
      </div>
      {/* Quick actions label */}
      <p className="px-3 text-[5px] text-[#6b7280] mb-1">Quick Actions</p>
      {/* Quick actions */}
      <div className="flex gap-1.5 px-3 shrink-0">
        {["Log Activity", "Log Daily Report", "Chat"].map((a) => (
          <div key={a} className="flex-1 bg-[#faf2e1] rounded flex flex-col items-center py-1.5 gap-0.5">
            <div className="w-3 h-3 bg-[#c17c45]/30 rounded-sm" />
            <p className="text-[4.5px] text-[#3b2513] text-center leading-tight">{a}</p>
          </div>
        ))}
      </div>
      {/* Bottom nav */}
      <div className="mt-auto flex items-center justify-around border-t border-[#f3f3f3] px-2 py-1.5 bg-white shrink-0">
        {["Home", "Tasks", "Report", "Chat", "Settings"].map((n, i) => (
          <div key={n} className="flex flex-col items-center gap-0.5">
            <div className={`w-3 h-3 rounded-sm ${i === 0 ? "bg-[#faf2e1]" : "bg-[#f3f3f3]"}`} />
            <p className={`text-[4px] ${i === 0 ? "text-[#1f2937]" : "text-[#6b7280]"}`}>{n}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TaskCard() {
  return (
    <div className="bg-white rounded-[6px] shadow-[3px_6px_7.5px_rgba(29,58,88,0.05)] p-3 relative">
      <div className="absolute top-2.5 right-2.5 bg-[#858c98] text-white text-[9px] font-semibold px-2 py-0.5 rounded-[6px]">
        Pending
      </div>
      <p className="font-[family-name:var(--font-merriweather-import)] font-semibold text-[#1f2937] text-[11px] leading-tight max-w-[150px] mb-1">
        Give medicine to Tosin
      </p>
      <p className="text-[#6b7280] text-[10px] leading-snug mb-2">
        Kindly give her the drugs when needed....
      </p>
      <div className="flex items-center gap-3 text-[#6b7280] text-[10px]">
        <span>🕙 10:00am</span>
        <span>🔔 09:00am</span>
      </div>
    </div>
  );
}

function PickupCard({ name, status }: { name: string; status: "pending" | "sent" }) {
  return (
    <div className="bg-white rounded-[8px] shadow-[3.7px_7.4px_9.2px_rgba(29,58,88,0.05)] px-3 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-[14px]">👦</span>
        <span className="text-[#1f2937] text-[13px] font-medium">{name}</span>
      </div>
      <span
        className={[
          "text-white text-[9px] font-semibold px-2.5 py-1 rounded-[7px]",
          status === "sent" ? "bg-[#006745]" : "bg-[#858c98]",
        ].join(" ")}
      >
        {status === "sent" ? "Sent" : "Pending"}
      </span>
    </div>
  );
}

function ChatMockup() {
  return (
    <div className="flex flex-col gap-2 pb-4">
      {/* Chat header */}
      <div className="bg-[#fbfbfb] border-b border-[#dce0e4] px-3 py-2 flex items-center justify-between rounded-t-[6px]">
        <div className="w-5 h-5 rounded-full border border-[#edf1f5] flex items-center justify-center">
          <div className="w-2 h-2 border-l border-b border-[#595a5b] rotate-45 translate-x-0.5" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[#d1d5db]" />
          <span className="text-[10.5px] font-medium text-[#2d2e2e]">Mercy Itom</span>
        </div>
        <div className="w-5 h-5 rounded-full border border-[#edf1f5]" />
      </div>
      {/* Date badge */}
      <div className="flex justify-center">
        <span className="bg-[#edf1f5] text-[#2d2e2e] text-[7px] px-2 py-0.5 rounded-[6px]">
          Session Start
        </span>
      </div>
      {/* Received message */}
      <div className="self-start max-w-[80%] bg-[#dce0e4] rounded-tr-[9px] rounded-br-[9px] rounded-tl-[9px] px-2 py-1.5 ml-3">
        <p className="text-[#2d2e2e] text-[10px] leading-snug">Good afternoon Ma, how can I help you?</p>
        <p className="text-[#595a5b] text-[7px] mt-0.5">16.50</p>
      </div>
      {/* Sent message */}
      <div className="self-end max-w-[80%] bg-[#0167ff] rounded-tl-[9px] rounded-bl-[9px] rounded-tr-[9px] px-2 py-1.5 mr-3">
        <p className="text-white text-[10px]">Hi, Mrs Itom</p>
        <div className="flex items-center justify-end gap-0.5 mt-0.5">
          <span className="text-[#dce0e4] text-[7px]">16.50</span>
          <span className="text-[#dce0e4] text-[8px]">✓✓</span>
        </div>
      </div>
      {/* Typing indicator */}
      <div className="self-start bg-[#dce0e4] rounded-tr-[9px] rounded-br-[9px] rounded-tl-[9px] px-3 py-1.5 ml-3">
        <p className="text-[#2d2e2e] text-[12px] tracking-widest">•••</p>
      </div>
    </div>
  );
}
