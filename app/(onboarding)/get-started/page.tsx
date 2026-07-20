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
import { CrecheSearchQuestion } from "@/components/onboarding/creche-search-question";
import { ChildrenQuestion } from "@/components/onboarding/children-question";
import { FinalContactStep } from "@/components/onboarding/final-contact-step";
import { MultiSelectList } from "@/components/onboarding/multi-select-list";

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

const PARENT_INTENT_OPTIONS: OnboardingOption[] = [
  { value: "creche", label: "My child's creche uses CEven" },
  { value: "caregiver", label: "I want to find/manage an independent caregiver" },
  { value: "both", label: "Both" },
];

const HAS_CAREGIVER_OPTIONS: OnboardingOption[] = [
  { value: "yes", label: "Yes, I already have someone in mind" },
  { value: "no", label: "No, I'm still looking" },
];

const CARE_TYPE_OPTIONS: OnboardingOption[] = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "occasional", label: "Occasional" },
];

const HAS_FAMILY_OPTIONS: OnboardingOption[] = [
  { value: "yes", label: "Yes, I already work with a family" },
  { value: "no", label: "No, I'm looking to get discovered" },
];

const EXPERIENCE_OPTIONS: OnboardingOption[] = [
  { value: "<1", label: "Less than 1 year" },
  { value: "1-3", label: "1–3 years" },
  { value: "3-5", label: "3–5 years" },
  { value: "5+", label: "5+ years" },
];

const AGE_GROUP_OPTIONS: OnboardingOption[] = [
  { value: "infants", label: "Infants (0–1)" },
  { value: "toddlers", label: "Toddlers (1–3)" },
  { value: "preschool", label: "Preschool (3–5)" },
  { value: "school-age", label: "School-age (5+)" },
];

export default function GetStartedPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<OnboardingAnswers>(INITIAL_ANSWERS);
  const [index, setIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

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

  if (stepId === "parent-intent") {
    return (
      <QuestionShell heading="What brings you to CEven?" current={index + 1} total={total} onBack={back}>
        <OptionList
          options={PARENT_INTENT_OPTIONS}
          selected={answers.parentIntent}
          onSelect={(v) => {
            update("parentIntent", v as OnboardingAnswers["parentIntent"]);
            next();
          }}
        />
      </QuestionShell>
    );
  }

  if (stepId === "parent-creche-search") {
    return (
      <QuestionShell heading="Find your child's creche" current={index + 1} total={total} onBack={back}>
        <CrecheSearchQuestion
          value={answers.crecheQuery}
          onChange={(v) => update("crecheQuery", v)}
          onContinue={(found) => {
            update("crecheFound", found);
            next();
          }}
        />
      </QuestionShell>
    );
  }

  if (stepId === "parent-creche-children" || stepId === "parent-caregiver-children") {
    return (
      <QuestionShell
        heading="How many children, and how old are they?"
        current={index + 1}
        total={total}
        onBack={back}
      >
        <ChildrenQuestion
          count={answers.parentChildrenCount}
          onCountChange={(v) => update("parentChildrenCount", v)}
          ages={answers.parentChildrenAges}
          onAgesChange={(v) => update("parentChildrenAges", v)}
          onContinue={next}
        />
      </QuestionShell>
    );
  }

  if (stepId === "parent-caregiver-has-one") {
    return (
      <QuestionShell
        heading="Do you already have a caregiver in mind?"
        current={index + 1}
        total={total}
        onBack={back}
      >
        <OptionList
          options={HAS_CAREGIVER_OPTIONS}
          selected={answers.hasCaregiverInMind}
          onSelect={(v) => {
            update("hasCaregiverInMind", v as OnboardingAnswers["hasCaregiverInMind"]);
            next();
          }}
        />
      </QuestionShell>
    );
  }

  if (stepId === "parent-caregiver-care-type") {
    return (
      <QuestionShell
        heading="What kind of care are you looking for?"
        current={index + 1}
        total={total}
        onBack={back}
      >
        <OptionList
          options={CARE_TYPE_OPTIONS}
          selected={answers.careType}
          onSelect={(v) => {
            update("careType", v as OnboardingAnswers["careType"]);
            next();
          }}
        />
      </QuestionShell>
    );
  }

  if (stepId === "parent-caregiver-location") {
    return (
      <QuestionShell heading="Where are you located?" current={index + 1} total={total} onBack={back}>
        <TextQuestion
          value={answers.parentLocation}
          onChange={(v) => update("parentLocation", v)}
          placeholder="e.g. Lekki, Lagos"
          onContinue={next}
        />
      </QuestionShell>
    );
  }

  if (stepId === "parent-final" && !submitted) {
    return (
      <QuestionShell
        heading="What's your name and email?"
        current={index + 1}
        total={total}
        onBack={back}
      >
        <FinalContactStep
          name={answers.name}
          onNameChange={(v) => update("name", v)}
          email={answers.email}
          onEmailChange={(v) => update("email", v)}
          phone={answers.phone}
          onPhoneChange={(v) => update("phone", v)}
          sendToWhatsApp={answers.sendToWhatsApp}
          onSendToWhatsAppChange={(v) => update("sendToWhatsApp", v)}
          onSubmit={() => setSubmitted(true)}
        />
      </QuestionShell>
    );
  }

  if (stepId === "caregiver-has-family") {
    return (
      <QuestionShell
        heading="Do you already have a family you work with?"
        current={index + 1}
        total={total}
        onBack={back}
      >
        <OptionList
          options={HAS_FAMILY_OPTIONS}
          selected={answers.hasFamily === null ? null : answers.hasFamily ? "yes" : "no"}
          onSelect={(v) => {
            update("hasFamily", v === "yes");
            next();
          }}
        />
      </QuestionShell>
    );
  }

  if (stepId === "caregiver-experience") {
    return (
      <QuestionShell
        heading="How many years of experience do you have?"
        current={index + 1}
        total={total}
        onBack={back}
      >
        <OptionList
          options={EXPERIENCE_OPTIONS}
          selected={answers.experience}
          onSelect={(v) => {
            update("experience", v as OnboardingAnswers["experience"]);
            next();
          }}
        />
      </QuestionShell>
    );
  }

  if (stepId === "caregiver-location") {
    return (
      <QuestionShell heading="Where are you located?" current={index + 1} total={total} onBack={back}>
        <TextQuestion
          value={answers.caregiverLocation}
          onChange={(v) => update("caregiverLocation", v)}
          placeholder="e.g. Lekki, Lagos"
          onContinue={next}
        />
      </QuestionShell>
    );
  }

  if (stepId === "caregiver-availability") {
    return (
      <QuestionShell heading="What's your availability?" current={index + 1} total={total} onBack={back}>
        <OptionList
          options={CARE_TYPE_OPTIONS}
          selected={answers.availability}
          onSelect={(v) => {
            update("availability", v as OnboardingAnswers["availability"]);
            next();
          }}
        />
      </QuestionShell>
    );
  }

  if (stepId === "caregiver-age-groups") {
    return (
      <QuestionShell
        heading="What age groups are you comfortable with?"
        current={index + 1}
        total={total}
        onBack={back}
      >
        <MultiSelectList
          options={AGE_GROUP_OPTIONS}
          selected={answers.ageGroups}
          onToggle={(v) => {
            const group = v as OnboardingAnswers["ageGroups"][number];
            update(
              "ageGroups",
              answers.ageGroups.includes(group)
                ? answers.ageGroups.filter((g) => g !== group)
                : [...answers.ageGroups, group]
            );
          }}
          onContinue={next}
        />
      </QuestionShell>
    );
  }

  if (stepId === "caregiver-final" && !submitted) {
    return (
      <QuestionShell
        heading="What's your name and email?"
        current={index + 1}
        total={total}
        onBack={back}
      >
        <FinalContactStep
          name={answers.name}
          onNameChange={(v) => update("name", v)}
          email={answers.email}
          onEmailChange={(v) => update("email", v)}
          phone={answers.phone}
          onPhoneChange={(v) => update("phone", v)}
          sendToWhatsApp={answers.sendToWhatsApp}
          onSendToWhatsAppChange={(v) => update("sendToWhatsApp", v)}
          onSubmit={() => setSubmitted(true)}
        />
      </QuestionShell>
    );
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf2e1] px-6 text-center font-[family-name:var(--font-urbanist)] text-heading">
        Submitted — app download handoff screen arrives in Task 6.
      </div>
    );
  }

  return null;
}
