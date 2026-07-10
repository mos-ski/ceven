"use client";

import { FadeUp } from "@/components/animations/fade-up";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { useInView, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

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
        <FadeUp className="mb-14">
          <div className="inline-flex items-center border border-[#3B2513]/20 text-[#3B2513] text-xs font-medium px-4 py-1.5 rounded-full mb-6">
            A full day with CEven
          </div>
          <h2 className="font-[family-name:var(--font-fraunces)] text-[#1A1208] text-4xl font-semibold leading-[1.2]" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
            Sunrise to sunset.<br />
            Every moment is accounted for.
          </h2>
        </FadeUp>

        <Stagger className="space-y-10">
          {TIMELINE.map((entry) => (
            <StaggerItem key={entry.time}>
              <div>
                <p className="text-[#9A6033] text-sm font-semibold mb-1">{entry.time}</p>
                <h3 className="text-[#1A1208] font-bold text-lg mb-2">{entry.title}</h3>
                <p className="text-[#6B5744] text-sm leading-relaxed mb-3 max-w-2xl">
                  {entry.description}
                </p>
                {entry.notification && (
                  <TypewriterNotification
                    message={entry.notification.message}
                    label={entry.notification.label}
                  />
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function TypewriterNotification({ message, label }: { message: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInReadingZone = useInView(ref, {
    once: true,
    amount: 0.5,
    margin: "-42% 0px -42% 0px",
  });
  const reducedMotion = useReducedMotion();
  const [hasStarted, setHasStarted] = useState(false);
  const [displayed, setDisplayed] = useState("");

  const startTyping = useCallback(() => {
    setHasStarted(true);
  }, []);

  useEffect(() => {
    if (!isInReadingZone) return;

    const frame = requestAnimationFrame(startTyping);
    return () => cancelAnimationFrame(frame);
  }, [isInReadingZone, startTyping]);

  useEffect(() => {
    if (!hasStarted) return;

    if (reducedMotion) {
      const frame = requestAnimationFrame(() => setDisplayed(message));
      return () => cancelAnimationFrame(frame);
    }

    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setDisplayed(message.slice(0, index));

      if (index >= message.length) {
        window.clearInterval(interval);
      }
    }, 26);

    return () => window.clearInterval(interval);
  }, [hasStarted, message, reducedMotion]);

  const isTyping = hasStarted && displayed.length < message.length && !reducedMotion;

  return (
    <div
      ref={ref}
      tabIndex={0}
      onFocus={startTyping}
      onMouseEnter={startTyping}
      className="group relative max-w-2xl overflow-hidden rounded-xl border border-[#E8E4DE] bg-[#F8F6F3] px-5 py-3.5 shadow-[0_12px_28px_rgba(59,37,19,0.04)] outline-none transition-colors duration-300 hover:border-[#D5B89B] focus-visible:border-[#9A6033] focus-visible:ring-2 focus-visible:ring-[#9A6033]/25"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-[#9A6033] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="flex items-start gap-3">
        <span
          className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-[6px] bg-[#3B2513] text-[13px] text-[#FAF2E1]"
          aria-hidden="true"
        >
          📱
        </span>
        <div>
          <p className="min-h-[1.5rem] text-sm leading-6 text-[#1A1208]" aria-label={message}>
            {displayed}
            {isTyping && (
              <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 animate-pulse bg-[#9A6033]" />
            )}
          </p>
          <p className="mt-1 text-xs text-[#9A6033]">{label}</p>
        </div>
      </div>
    </div>
  );
}
