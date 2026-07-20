"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Users, HeartHandshake } from "lucide-react";

import { INITIAL_ANSWERS, type OnboardingAnswers, type Persona } from "@/lib/onboarding/types";
import { resolveFullPath } from "@/lib/onboarding/steps";
import { QuestionShell } from "@/components/onboarding/question-shell";
import { OptionList, type OnboardingOption } from "@/components/onboarding/option-list";
import { SliderQuestion } from "@/components/onboarding/slider-question";
import { TextQuestion } from "@/components/onboarding/text-question";

const PERSONA_OPTIONS: OnboardingOption[] = [
  {
    value: "admin",
    label: (
      <>
        I&apos;m a creche <strong>admin</strong> or <strong>director</strong>
      </>
    ),
    icon: <Building2 size={20} />,
  },
  {
    value: "parent",
    label: (
      <>
        I&apos;m a <strong>parent</strong> or <strong>guardian</strong>
      </>
    ),
    icon: <Users size={20} />,
  },
  {
    value: "caregiver",
    label: (
      <>
        I&apos;m an <strong>independent caregiver</strong>
      </>
    ),
    icon: <HeartHandshake size={20} />,
  },
];

const LOCATIONS_OPTIONS: OnboardingOption[] = [
  { value: "1", label: "1 location" },
  { value: "2+", label: "2 or more locations" },
];

const CURRENT_TOOLS_OPTIONS: OnboardingOption[] = [
  { value: "paper", label: "Paper & WhatsApp groups" },
  { value: "spreadsheets", label: "Spreadsheets" },
  { value: "other-software", label: "Another software" },
  { value: "nothing-yet", label: "Nothing yet — just started" },
];

const STAFF_COUNT_OPTIONS: OnboardingOption[] = [
  { value: "1-5", label: "1–5 staff" },
  { value: "6-15", label: "6–15 staff" },
  { value: "16-30", label: "16–30 staff" },
  { value: "30+", label: "30+ staff" },
];

export default function GetStartedPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<OnboardingAnswers>(INITIAL_ANSWERS);
  const [index, setIndex] = useState(0);

  const path = resolveFullPath(answers);
  const stepId = path[index];
  const total = path.length;

  function update<K extends keyof OnboardingAnswers>(key: K, value: OnboardingAnswers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function next() {
    setIndex((i) => i + 1);
  }

  function back() {
    setIndex((i) => Math.max(0, i - 1));
  }

  function selectPersona(value: string) {
    update("persona", value as Persona);
    next();
  }

  if (stepId === "persona-select") {
    return (
      <QuestionShell heading="First, tell us about yourself." current={index + 1} total={total}>
        <OptionList options={PERSONA_OPTIONS} onSelect={selectPersona} selected={answers.persona} />
        <p className="mt-6 text-center font-[family-name:var(--font-urbanist)] text-sm text-muted-text">
          Already have an account?{" "}
          <a href="/login" className="font-semibold text-brand-dark">
            Log in
          </a>
        </p>
      </QuestionShell>
    );
  }

  if (stepId === "admin-capacity") {
    return (
      <QuestionShell
        heading="What's your creche's enrollment capacity?"
        current={index + 1}
        total={total}
        onBack={back}
      >
        <SliderQuestion
          value={answers.capacity}
          onChange={(v) => update("capacity", v)}
          min={1}
          max={100}
          unit="children"
          onContinue={next}
        />
      </QuestionShell>
    );
  }

  if (stepId === "admin-locations") {
    return (
      <QuestionShell
        heading="How many locations does your creche have?"
        current={index + 1}
        total={total}
        onBack={back}
      >
        <OptionList
          options={LOCATIONS_OPTIONS}
          selected={answers.locations}
          onSelect={(v) => {
            update("locations", v as OnboardingAnswers["locations"]);
            next();
          }}
        />
      </QuestionShell>
    );
  }

  if (stepId === "admin-current-tools") {
    return (
      <QuestionShell
        heading="What are you using to run your creche today?"
        current={index + 1}
        total={total}
        onBack={back}
      >
        <OptionList
          options={CURRENT_TOOLS_OPTIONS}
          selected={answers.currentTools}
          onSelect={(v) => {
            update("currentTools", v as OnboardingAnswers["currentTools"]);
            next();
          }}
        />
      </QuestionShell>
    );
  }

  if (stepId === "admin-staff-count") {
    return (
      <QuestionShell
        heading="How many staff/caregivers work at your creche?"
        current={index + 1}
        total={total}
        onBack={back}
      >
        <OptionList
          options={STAFF_COUNT_OPTIONS}
          selected={answers.staffCount}
          onSelect={(v) => {
            update("staffCount", v as OnboardingAnswers["staffCount"]);
            next();
          }}
        />
      </QuestionShell>
    );
  }

  if (stepId === "admin-email") {
    return (
      <QuestionShell heading="What's your email?" current={index + 1} total={total} onBack={back}>
        <TextQuestion
          value={answers.email}
          onChange={(v) => update("email", v)}
          placeholder="you@example.com"
          type="email"
          onContinue={() => router.push(`/signup?email=${encodeURIComponent(answers.email)}`)}
        />
      </QuestionShell>
    );
  }

  return null;
}
