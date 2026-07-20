"use client";

import { INITIAL_ANSWERS, type OnboardingAnswers } from "@/lib/onboarding/types";
import { resolveFullPath } from "@/lib/onboarding/steps";

const SCENARIOS: { label: string; answers: OnboardingAnswers }[] = [
  { label: "Admin", answers: { ...INITIAL_ANSWERS, persona: "admin" } },
  { label: "Parent — creche only", answers: { ...INITIAL_ANSWERS, persona: "parent", parentIntent: "creche" } },
  { label: "Parent — caregiver only", answers: { ...INITIAL_ANSWERS, persona: "parent", parentIntent: "caregiver" } },
  { label: "Parent — both", answers: { ...INITIAL_ANSWERS, persona: "parent", parentIntent: "both" } },
  { label: "Caregiver — has family", answers: { ...INITIAL_ANSWERS, persona: "caregiver", hasFamily: true } },
  { label: "Caregiver — discovery", answers: { ...INITIAL_ANSWERS, persona: "caregiver", hasFamily: false } },
];

export default function GetStartedDebugPage() {
  return (
    <pre style={{ padding: 24, fontSize: 13, whiteSpace: "pre-wrap" }}>
      {SCENARIOS.map((s) => {
        const path = resolveFullPath(s.answers);
        return `${s.label}: ${path.length} steps\n  ${path.join(" -> ")}`;
      }).join("\n\n")}
    </pre>
  );
}
