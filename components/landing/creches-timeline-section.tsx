const TIMELINE = [
  {
    time: "7:30 AM",
    title: "Morning Check-In",
    description:
      "Caregiver logs each child's arrival, temperature, and mood. Takes 30 seconds per child. Parents receive instant arrival notification.",
    notification: {
      message: 'CEven sends: "Tolu has arrived. Mood: cheerful. Temperature normal."',
      label: "7:34 AM · Arrival notification",
    },
  },
  {
    time: "9:00 AM",
    title: "Breakfast Logged",
    description:
      "Meals are recorded with a single tap — portions, what was eaten, any allergic reactions noted immediately.",
    notification: null,
  },
  {
    time: "10:30 AM",
    title: "Activity Logged",
    description:
      "Art, play, storytime, outdoor — caregivers log activities as they happen. Short, structured, fast.",
    notification: {
      message: 'CEven sends: "Art session — Tolu painted a sun. Very proud of herself!"',
      label: "10:48 AM · Activity update",
    },
  },
  {
    time: "12:00 PM",
    title: "Lunch & Nap Logged",
    description:
      "Lunch is recorded. Nap time is tracked with start and end times. Parents see it in real time.",
    notification: {
      message: 'CEven sends: "Tolu ate lunch well. Nap started at 12:20 PM. 💛"',
      label: "12:22 PM · Meal + nap logged",
    },
  },
  {
    time: "3:00 PM",
    title: "Afternoon Activity",
    description:
      "Outdoor play, storytime, or any activity. Each logged. Each visible. Nothing disappears into a verbal summary.",
    notification: null,
  },
  {
    time: "5:30 PM",
    title: "Parent arrives. Calm. Informed. Loyal.",
    description:
      "By the time they walk in, they've already lived the day with their child. They don't ask how was she — they already know. That trust? That's your referral engine.",
    notification: null,
  },
];

export function CrechesTimelineSection() {
  return (
    <section className="bg-white px-16 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-14">
          <div className="inline-flex items-center border border-[#3B2513]/20 text-[#3B2513] text-xs font-medium px-4 py-1.5 rounded-full mb-6">
            A full day with CEven
          </div>
          <h2 className="text-[#1A1208] text-4xl font-bold leading-[1.2]">
            Sunrise to sunset.<br />
            Every moment is accounted for.
          </h2>
        </div>

        <div className="space-y-10">
          {TIMELINE.map((entry) => (
            <div key={entry.time}>
              <p className="text-[#9A6033] text-sm font-semibold mb-1">{entry.time}</p>
              <h3 className="text-[#1A1208] font-bold text-lg mb-2">{entry.title}</h3>
              <p className="text-[#6B5744] text-sm leading-relaxed mb-3 max-w-2xl">
                {entry.description}
              </p>
              {entry.notification && (
                <div className="bg-[#F8F6F3] border border-[#E8E4DE] rounded-xl px-5 py-3.5 flex items-start gap-3 max-w-2xl">
                  <span className="text-lg">📱</span>
                  <div>
                    <p className="text-[#1A1208] text-sm">{entry.notification.message}</p>
                    <p className="text-[#9A6033] text-xs mt-1">{entry.notification.label}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
