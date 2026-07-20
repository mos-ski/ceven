"use client";

import { useState } from "react";
import { Building2 } from "lucide-react";
import { INITIAL_ANSWERS, type OnboardingAnswers } from "@/lib/onboarding/types";
import { resolveFullPath } from "@/lib/onboarding/steps";
import { QuestionShell } from "@/components/onboarding/question-shell";
import { OptionList, type OnboardingOption } from "@/components/onboarding/option-list";
import { MultiSelectList } from "@/components/onboarding/multi-select-list";
import { SliderQuestion } from "@/components/onboarding/slider-question";
import { TextQuestion } from "@/components/onboarding/text-question";

const SCENARIOS: { label: string; answers: OnboardingAnswers }[] = [
  { label: "Admin", answers: { ...INITIAL_ANSWERS, persona: "admin" } },
  { label: "Parent — creche only", answers: { ...INITIAL_ANSWERS, persona: "parent", parentIntent: "creche" } },
  { label: "Parent — caregiver only", answers: { ...INITIAL_ANSWERS, persona: "parent", parentIntent: "caregiver" } },
  { label: "Parent — both", answers: { ...INITIAL_ANSWERS, persona: "parent", parentIntent: "both" } },
  { label: "Caregiver — has family", answers: { ...INITIAL_ANSWERS, persona: "caregiver", hasFamily: true } },
  { label: "Caregiver — discovery", answers: { ...INITIAL_ANSWERS, persona: "caregiver", hasFamily: false } },
];

const SAMPLE_OPTIONS: OnboardingOption[] = [
  { value: "a", label: "Option A", icon: <Building2 size={20} /> },
  { value: "b", label: "Option B" },
];

export default function GetStartedDebugPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [multi, setMulti] = useState<string[]>([]);
  const [sliderValue, setSliderValue] = useState(30);
  const [text, setText] = useState("");

  return (
    <>
      <pre style={{ padding: 24, fontSize: 13, whiteSpace: "pre-wrap" }}>
        {SCENARIOS.map((s) => {
          const path = resolveFullPath(s.answers);
          return `${s.label}: ${path.length} steps\n  ${path.join(" -> ")}`;
        }).join("\n\n")}
      </pre>

      <QuestionShell heading="Component showcase" current={1} total={1} onBack={() => {}}>
        <p className="mb-2 font-[family-name:var(--font-urbanist)] text-sm">OptionList</p>
        <OptionList options={SAMPLE_OPTIONS} onSelect={setSelected} selected={selected} />

        <p className="mt-8 mb-2 font-[family-name:var(--font-urbanist)] text-sm">MultiSelectList</p>
        <MultiSelectList
          options={SAMPLE_OPTIONS}
          selected={multi}
          onToggle={(v) =>
            setMulti((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]))
          }
          onContinue={() => {}}
        />

        <p className="mt-8 mb-2 font-[family-name:var(--font-urbanist)] text-sm">SliderQuestion</p>
        <SliderQuestion value={sliderValue} onChange={setSliderValue} min={1} max={100} unit="children" onContinue={() => {}} />

        <p className="mt-8 mb-2 font-[family-name:var(--font-urbanist)] text-sm">TextQuestion</p>
        <TextQuestion value={text} onChange={setText} placeholder="Type something" onContinue={() => {}} />
      </QuestionShell>
    </>
  );
}
