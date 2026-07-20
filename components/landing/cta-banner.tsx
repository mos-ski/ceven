"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building2, Users, HeartHandshake } from "lucide-react";

import { FadeUp } from "@/components/animations/fade-up";
import { Stagger, StaggerItem } from "@/components/animations/stagger";

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
import { AppDownloadHandoff } from "@/components/onboarding/app-download-handoff";

const ROLE_CARDS: { persona: Persona; label: string; icon: React.ReactNode }[] = [
  {
    persona: "admin",
    label: "I'm a crèche/daycare owner",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 21V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14" stroke="#c78c5f" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M1 21h22M9 21v-5h6v5" stroke="#c78c5f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="9" y="7" width="2.5" height="3" rx="0.5" fill="#c78c5f" />
        <rect x="12.5" y="7" width="2.5" height="3" rx="0.5" fill="#c78c5f" />
        <rect x="9" y="12" width="2.5" height="3" rx="0.5" fill="#c78c5f" />
        <rect x="12.5" y="12" width="2.5" height="3" rx="0.5" fill="#c78c5f" />
      </svg>
    ),
  },
  {
    persona: "caregiver",
    label: "I'm an independent caregiver",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="8" r="4" stroke="#c78c5f" strokeWidth="1.8" />
        <path d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6" stroke="#c78c5f" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    persona: "parent",
    label: "I'm a parent/guardian",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21C12 21 4 16.5 4 10a4 4 0 0 1 8 0 4 4 0 0 1 8 0c0 6.5-8 11-8 11Z" stroke="#c78c5f" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
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

export function CtaBanner() {
  const router = useRouter();
  const [phase, setPhase] = useState<"select" | "flow">("select");
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
    if (index <= 1) {
      setPhase("select");
      setAnswers(INITIAL_ANSWERS);
      setIndex(0);
      setSubmitted(false);
    } else {
      setIndex((i) => Math.max(0, i - 1));
    }
  }

  function selectRole(persona: Persona) {
    setAnswers((prev) => ({ ...prev, persona }));
    setIndex(1); // index 0 is persona-select; start at first track step
    setPhase("flow");
  }

  // ── SELECT PHASE ────────────────────────────────────────────
  if (phase === "select") {
    return (
      <section className="bg-[#c78c5f] py-8 min-h-screen px-4 sm:px-8 flex flex-col justify-center">
        <div className="max-w-[702px] mx-auto flex flex-col items-center gap-6 text-center">

          <FadeUp className="flex flex-col items-center gap-6 w-full">
            <p className="font-[family-name:var(--font-urbanist-import)] font-semibold text-[#f7f9ff]/80 text-[14px] sm:text-[16px] leading-[24px] uppercase tracking-widest">
              #1 childcare management software
            </p>
            <h2 className="font-[family-name:var(--font-merriweather-import)] font-bold text-white text-[32px] sm:text-[44px] lg:text-[48px] leading-[1.18] tracking-[-0.02em]">
              Ready to be the crèche<br className="hidden sm:block" /> that stands out?
            </h2>
            <p className="font-[family-name:var(--font-urbanist-import)] font-semibold text-[#faf2e1] text-[16px] sm:text-[18px] lg:text-[20px] leading-[24px]">
              Download CEven. Built for Nigerian crèches. Set up in 15 minutes.
            </p>
          </FadeUp>

          <FadeUp className="w-full max-w-[390px] flex flex-col gap-4 mt-2" delay={0.1}>
            <p className="font-[family-name:var(--font-urbanist-import)] font-semibold text-white text-[18px] sm:text-[20px] leading-[1.4]">
              First, tell us about yourself.
            </p>
            <Stagger className="flex flex-col gap-3">
              {ROLE_CARDS.map((role) => (
                <StaggerItem key={role.persona}>
                  <button
                    onClick={() => selectRole(role.persona)}
                    className="group w-full flex items-center gap-4 bg-[#f7f9ff] border-2 border-[#ebeff4] rounded-2xl px-4 sm:px-6 py-[17px] hover:border-[#c78c5f]/40 hover:shadow-md transition-all duration-150 cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#eef1ff] flex items-center justify-center shrink-0">
                      {role.icon}
                    </div>
                    <span className="font-[family-name:var(--font-urbanist-import)] font-semibold text-[#233243] text-[15px] sm:text-[18px] leading-[24px] flex-1 text-left">
                      {role.label}
                    </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-[#c78c5f] group-hover:translate-x-0.5 transition-transform">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </StaggerItem>
              ))}
            </Stagger>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="font-[family-name:var(--font-urbanist-import)] text-white text-[14px] sm:text-[16px] leading-[24px]">
              Already Joined CEven?{" "}
              <Link href="/login" className="underline underline-offset-2 hover:opacity-80 transition-opacity font-semibold">
                Login Now
              </Link>
            </p>
          </FadeUp>

        </div>
      </section>
    );
  }

  // ── FLOW PHASE ──────────────────────────────────────────────
  if (submitted) {
    return (
      <section className="bg-[#faf2e1] min-h-screen flex flex-col items-center justify-center">
        <AppDownloadHandoff
          email={answers.email}
          phone={answers.phone}
          sendToWhatsApp={answers.sendToWhatsApp}
          inline
        />
      </section>
    );
  }

  const renderStep = () => {
    if (stepId === "admin-capacity") {
      return (
        <QuestionShell heading="What's your creche's enrollment capacity?" current={index} total={total} onBack={back} inline>
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
        <QuestionShell heading="How many locations does your creche have?" current={index} total={total} onBack={back} inline>
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
        <QuestionShell heading="What are you using to run your creche today?" current={index} total={total} onBack={back} inline>
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
        <QuestionShell heading="How many staff/caregivers work at your creche?" current={index} total={total} onBack={back} inline>
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
        <QuestionShell heading="What's your email?" current={index} total={total} onBack={back} inline>
          <TextQuestion
            value={answers.email}
            onChange={(v) => update("email", v)}
            placeholder="you@example.com"
            type="email"
            onContinue={() => router.push(`/signup?email=${encodeURIComponent(answers.email)}`)}
            validate={(v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)}
          />
        </QuestionShell>
      );
    }

    if (stepId === "parent-intent") {
      return (
        <QuestionShell heading="What brings you to CEven?" current={index} total={total} onBack={back} inline>
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
        <QuestionShell heading="Find your child's creche" current={index} total={total} onBack={back} inline>
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
        <QuestionShell heading="How many children, and how old are they?" current={index} total={total} onBack={back} inline>
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
        <QuestionShell heading="Do you already have a caregiver in mind?" current={index} total={total} onBack={back} inline>
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
        <QuestionShell heading="What kind of care are you looking for?" current={index} total={total} onBack={back} inline>
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
        <QuestionShell heading="Where are you located?" current={index} total={total} onBack={back} inline>
          <TextQuestion
            value={answers.parentLocation}
            onChange={(v) => update("parentLocation", v)}
            placeholder="e.g. Lekki, Lagos"
            onContinue={next}
          />
        </QuestionShell>
      );
    }

    if (stepId === "parent-final") {
      return (
        <QuestionShell heading="What's your name and email?" current={index} total={total} onBack={back} inline>
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
        <QuestionShell heading="Do you already have a family you work with?" current={index} total={total} onBack={back} inline>
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
        <QuestionShell heading="How many years of experience do you have?" current={index} total={total} onBack={back} inline>
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
        <QuestionShell heading="Where are you located?" current={index} total={total} onBack={back} inline>
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
        <QuestionShell heading="What's your availability?" current={index} total={total} onBack={back} inline>
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
        <QuestionShell heading="What age groups are you comfortable with?" current={index} total={total} onBack={back} inline>
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

    if (stepId === "caregiver-final") {
      return (
        <QuestionShell heading="What's your name and email?" current={index} total={total} onBack={back} inline>
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

    return null;
  };

  return (
    <section className="bg-[#faf2e1] min-h-screen flex flex-col items-center justify-center">
      {renderStep()}
    </section>
  );
}
