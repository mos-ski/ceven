# Pre-signup Onboarding Question Funnel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a multi-step, persona-branching question funnel at `/get-started` that sits in front of CEven's existing signup forms, matching the design in `docs/superpowers/specs/2026-07-20-onboarding-question-funnel-design.md`.

**Architecture:** A single client-rendered route (`app/(onboarding)/get-started/page.tsx`) holds all funnel state (`persona`, `answers`, current step index) in `useState`. A pure function (`resolveFullPath`) in `lib/onboarding/steps.ts` computes the ordered list of step IDs for the current answers, so branching (parent intent, caregiver has-family, etc.) is just data, not scattered conditionals. The page renders one step at a time through a shared `QuestionShell` chrome and a small set of reusable input primitives (single-select list, multi-select list, slider, text field). Admin track ends by redirecting into the existing `/signup` form (pre-filled email); parent/caregiver tracks end in an in-page "download the app" handoff screen.

**Tech Stack:** Next.js 16 App Router, React client components, Tailwind CSS (existing `brand-dark`/`heading`/`muted-text` theme tokens + Merriweather/Urbanist font vars already loaded in the root layout), `lucide-react` icons (already a dependency, used throughout the app).

## Global Constraints

- This repo is a frontend-only prototype with no backend and no test framework (confirmed: no jest/vitest/testing-library in `package.json`). Every task's verification step is manual: run `npm run dev`, visit the route in a browser, and check the described behavior. Do not add a test framework as part of this plan.
- Next.js in this repo is v16. `searchParams` on a Server Component page is a `Promise` (per `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/page.md`) — must be `await`ed, not read synchronously.
- Match existing code conventions: client components (`"use client"`) with local `useState`, no external state management library, Tailwind utility classes (not CSS modules), `lucide-react` for icons.
- Use the existing design tokens already defined in `app/globals.css` / used by `components/auth/*`: `bg-brand-dark` / `text-brand-dark` (#3B2513), `text-heading` (#1F2937), `text-muted-text` (#6B7280), `font-[family-name:var(--font-merriweather)]`, `font-[family-name:var(--font-urbanist)]`. Use `#faf2e1` (raw hex, matching the landing page's cream background) for full-bleed screen backgrounds.
- No new npm dependencies.
- No backend/API calls — funnel answers live only in component state for the duration of the session (matches how `app/(parent)/parent/child/add/page.tsx` and other existing "multi-field form" pages in this repo already work).

---

## File Structure

| File | Responsibility |
|---|---|
| `lib/onboarding/types.ts` | `Persona`, `StepId`, `OnboardingAnswers` types + `INITIAL_ANSWERS` default |
| `lib/onboarding/steps.ts` | Pure `resolveFullPath(answers)` branching engine |
| `components/onboarding/progress-bar.tsx` | Segmented "step X of Y" progress bar |
| `components/onboarding/question-shell.tsx` | Shared screen chrome: heading, progress bar, subtext, back link, centered content well |
| `components/onboarding/option-list.tsx` | Single-select card list (persona select + every single-select question) |
| `components/onboarding/multi-select-list.tsx` | Multi-select card list (caregiver age groups) |
| `components/onboarding/slider-question.tsx` | Number input + range slider (admin capacity) |
| `components/onboarding/text-question.tsx` | Generic single text/email input + continue button |
| `components/onboarding/children-question.tsx` | Number stepper (child count) + text field (ages) combined question |
| `components/onboarding/creche-search-question.tsx` | Search input with found/not-found soft-lead states |
| `components/onboarding/final-contact-step.tsx` | Shared name + email + optional WhatsApp phone step (parent & caregiver tracks) |
| `components/onboarding/app-download-handoff.tsx` | Ending screen for parent/caregiver: app store badges + email/WhatsApp confirmation |
| `app/(onboarding)/layout.tsx` | Minimal chrome-less layout (no nav/footer), matching `app/(auth)/layout.tsx` |
| `app/(onboarding)/get-started/page.tsx` | The funnel itself — state machine wiring everything above together |
| `app/(auth)/signup/page.tsx` | Modified: read `?email=` search param, pass to `SignUpForm` |
| `components/auth/signup-form.tsx` | Modified: accept `defaultEmail` prop, pre-fill the email field |
| `components/landing/nav.tsx` | Modified: point the two "Download CEven" CTAs at `/get-started` |

---

### Task 1: Onboarding types, flow engine, and a verification harness

**Files:**
- Create: `lib/onboarding/types.ts`
- Create: `lib/onboarding/steps.ts`
- Create: `app/(onboarding)/layout.tsx`
- Create: `app/(onboarding)/get-started/page.tsx` (temporary verification version — fully replaced in Task 3)

**Interfaces:**
- Produces: `Persona`, `StepId`, `OnboardingAnswers`, `INITIAL_ANSWERS` (from `types.ts`); `resolveFullPath(answers: OnboardingAnswers): StepId[]` (from `steps.ts`) — every later task imports these.

- [ ] **Step 1: Write `lib/onboarding/types.ts`**

```ts
export type Persona = "admin" | "parent" | "caregiver";

export type ParentIntent = "creche" | "caregiver" | "both";
export type CareType = "full-time" | "part-time" | "occasional";
export type ExperienceRange = "<1" | "1-3" | "3-5" | "5+";
export type AgeGroup = "infants" | "toddlers" | "preschool" | "school-age";
export type LocationsAnswer = "1" | "2+";
export type StaffCountAnswer = "1-5" | "6-15" | "16-30" | "30+";
export type CurrentToolsAnswer = "paper" | "spreadsheets" | "other-software" | "nothing-yet";

export interface OnboardingAnswers {
  persona: Persona | null;

  // admin track
  capacity: number;
  locations: LocationsAnswer | null;
  currentTools: CurrentToolsAnswer | null;
  staffCount: StaffCountAnswer | null;

  // parent track
  parentIntent: ParentIntent | null;
  crecheQuery: string;
  crecheFound: boolean | null;
  parentChildrenCount: number;
  parentChildrenAges: string;
  hasCaregiverInMind: "yes" | "no" | null;
  careType: CareType | null;
  parentLocation: string;

  // caregiver track
  hasFamily: boolean | null;
  experience: ExperienceRange | null;
  caregiverLocation: string;
  availability: CareType | null;
  ageGroups: AgeGroup[];

  // shared final step (parent + caregiver)
  name: string;
  email: string;
  phone: string;
  sendToWhatsApp: boolean;
}

export const INITIAL_ANSWERS: OnboardingAnswers = {
  persona: null,
  capacity: 30,
  locations: null,
  currentTools: null,
  staffCount: null,
  parentIntent: null,
  crecheQuery: "",
  crecheFound: null,
  parentChildrenCount: 1,
  parentChildrenAges: "",
  hasCaregiverInMind: null,
  careType: null,
  parentLocation: "",
  hasFamily: null,
  experience: null,
  caregiverLocation: "",
  availability: null,
  ageGroups: [],
  name: "",
  email: "",
  phone: "",
  sendToWhatsApp: false,
};

export type StepId =
  | "persona-select"
  | "admin-capacity"
  | "admin-locations"
  | "admin-current-tools"
  | "admin-staff-count"
  | "admin-email"
  | "parent-intent"
  | "parent-creche-search"
  | "parent-creche-children"
  | "parent-caregiver-has-one"
  | "parent-caregiver-children"
  | "parent-caregiver-care-type"
  | "parent-caregiver-location"
  | "parent-final"
  | "caregiver-has-family"
  | "caregiver-experience"
  | "caregiver-location"
  | "caregiver-availability"
  | "caregiver-age-groups"
  | "caregiver-final";
```

- [ ] **Step 2: Write `lib/onboarding/steps.ts`**

```ts
import type { OnboardingAnswers, StepId } from "./types";

function resolveTrackSteps(answers: OnboardingAnswers): StepId[] {
  if (answers.persona === "admin") {
    return [
      "admin-capacity",
      "admin-locations",
      "admin-current-tools",
      "admin-staff-count",
      "admin-email",
    ];
  }

  if (answers.persona === "parent") {
    const steps: StepId[] = ["parent-intent"];
    const wantsCreche = answers.parentIntent === "creche" || answers.parentIntent === "both";
    const wantsCaregiver = answers.parentIntent === "caregiver" || answers.parentIntent === "both";

    if (wantsCreche) {
      steps.push("parent-creche-search", "parent-creche-children");
    }
    if (wantsCaregiver) {
      steps.push("parent-caregiver-has-one");
      if (!wantsCreche) {
        // "how many children" is only asked once; the creche sub-branch already covers it under "both"
        steps.push("parent-caregiver-children");
      }
      steps.push("parent-caregiver-care-type", "parent-caregiver-location");
    }
    steps.push("parent-final");
    return steps;
  }

  if (answers.persona === "caregiver") {
    if (answers.hasFamily === true) {
      return ["caregiver-has-family", "caregiver-final"];
    }
    if (answers.hasFamily === false) {
      return [
        "caregiver-has-family",
        "caregiver-experience",
        "caregiver-location",
        "caregiver-availability",
        "caregiver-age-groups",
        "caregiver-final",
      ];
    }
    return ["caregiver-has-family"];
  }

  return [];
}

export function resolveFullPath(answers: OnboardingAnswers): StepId[] {
  if (!answers.persona) return ["persona-select"];
  return ["persona-select", ...resolveTrackSteps(answers)];
}
```

- [ ] **Step 3: Write `app/(onboarding)/layout.tsx`**

```tsx
export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

- [ ] **Step 4: Write a temporary verification page at `app/(onboarding)/get-started/page.tsx`**

This dumps the engine's output for the 6 branch permutations from the design spec's step-count table, so we can check the engine against the spec before any UI is built on top of it. It is fully replaced in Task 3.

```tsx
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
```

- [ ] **Step 5: Run the dev server and verify the engine output**

Run: `npm run dev`, then open `http://localhost:3000/get-started` in a browser (use the `mcp__Claude_Browser__preview_start` / `navigate` / `get_page_text` tools).

Expected output (step counts must match exactly — this is the spec's step-count table):

```
Admin: 6 steps
  persona-select -> admin-capacity -> admin-locations -> admin-current-tools -> admin-staff-count -> admin-email

Parent — creche only: 5 steps
  persona-select -> parent-intent -> parent-creche-search -> parent-creche-children -> parent-final

Parent — caregiver only: 7 steps
  persona-select -> parent-intent -> parent-caregiver-has-one -> parent-caregiver-children -> parent-caregiver-care-type -> parent-caregiver-location -> parent-final

Parent — both: 8 steps
  persona-select -> parent-intent -> parent-creche-search -> parent-creche-children -> parent-caregiver-has-one -> parent-caregiver-care-type -> parent-caregiver-location -> parent-final

Caregiver — has family: 3 steps
  persona-select -> caregiver-has-family -> caregiver-final

Caregiver — discovery: 7 steps
  persona-select -> caregiver-has-family -> caregiver-experience -> caregiver-location -> caregiver-availability -> caregiver-age-groups -> caregiver-final
```

If any count or ordering is off, fix `resolveTrackSteps` before moving on — every later task depends on this being correct.

- [ ] **Step 6: Commit**

```bash
git add lib/onboarding/types.ts lib/onboarding/steps.ts "app/(onboarding)/layout.tsx" "app/(onboarding)/get-started/page.tsx"
git commit -m "Add onboarding funnel types and branching engine"
```

---

### Task 2: Shared question UI primitives

**Files:**
- Create: `components/onboarding/progress-bar.tsx`
- Create: `components/onboarding/question-shell.tsx`
- Create: `components/onboarding/option-list.tsx`
- Create: `components/onboarding/multi-select-list.tsx`
- Create: `components/onboarding/slider-question.tsx`
- Create: `components/onboarding/text-question.tsx`
- Modify: `app/(onboarding)/get-started/page.tsx` (append a component showcase below the scenario dump, to visually verify each primitive)

**Interfaces:**
- Consumes: nothing from Task 1 directly (these are presentational components).
- Produces: `ProgressBar`, `QuestionShell`, `OptionList` (+ exported `OnboardingOption` type), `MultiSelectList`, `SliderQuestion`, `TextQuestion` — every later task renders steps using these.

- [ ] **Step 1: Write `components/onboarding/progress-bar.tsx`**

```tsx
interface ProgressBarProps {
  current: number; // 1-indexed
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex w-full max-w-[420px] gap-1.5">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full ${
              i < current ? "bg-brand-dark" : "bg-[#E5E1D8]"
            }`}
          />
        ))}
      </div>
      <p className="font-[family-name:var(--font-urbanist)] text-sm text-muted-text">
        {current} of {total}
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Write `components/onboarding/question-shell.tsx`**

```tsx
import { ProgressBar } from "./progress-bar";

interface QuestionShellProps {
  heading: string;
  subtext?: string;
  current: number;
  total: number;
  onBack?: () => void;
  children: React.ReactNode;
}

export function QuestionShell({
  heading,
  subtext,
  current,
  total,
  onBack,
  children,
}: QuestionShellProps) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-[#faf2e1] px-6 py-14">
      <div className="w-full max-w-[560px]">
        <h1 className="text-center font-[family-name:var(--font-merriweather)] text-[28px] font-bold leading-tight text-heading sm:text-[34px]">
          {heading}
        </h1>
        <div className="mt-6 flex justify-center">
          <ProgressBar current={current} total={total} />
        </div>
        {subtext && (
          <p className="mt-4 text-center font-[family-name:var(--font-urbanist)] text-base text-muted-text">
            {subtext}
          </p>
        )}
        <div className="mt-8">{children}</div>
        {onBack && (
          <div className="mt-8 text-center">
            <button
              onClick={onBack}
              className="font-[family-name:var(--font-urbanist)] text-sm font-medium text-brand-dark"
            >
              ‹ Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Write `components/onboarding/option-list.tsx`**

```tsx
import { ArrowRight } from "lucide-react";

export interface OnboardingOption {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

interface OptionListProps {
  options: OnboardingOption[];
  onSelect: (value: string) => void;
  selected?: string | null;
}

export function OptionList({ options, onSelect, selected }: OptionListProps) {
  return (
    <div className="flex flex-col gap-4">
      {options.map((option) => {
        const isSelected = option.value === selected;
        return (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`flex items-center gap-4 rounded-2xl border px-5 py-5 text-left transition-colors ${
              isSelected
                ? "border-brand-dark bg-brand-dark/5"
                : "border-[#E5E1D8] bg-white hover:border-brand-dark/40"
            }`}
          >
            {option.icon && (
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-dark/10 text-brand-dark">
                {option.icon}
              </div>
            )}
            <span className="flex-1 font-[family-name:var(--font-urbanist)] text-base text-heading">
              {option.label}
            </span>
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                isSelected ? "bg-brand-dark text-white" : "bg-[#F4F1EA] text-brand-dark"
              }`}
            >
              <ArrowRight size={16} />
            </div>
          </button>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 4: Write `components/onboarding/multi-select-list.tsx`**

```tsx
import { Check } from "lucide-react";
import type { OnboardingOption } from "./option-list";

interface MultiSelectListProps {
  options: OnboardingOption[];
  selected: string[];
  onToggle: (value: string) => void;
  onContinue: () => void;
  continueLabel?: string;
}

export function MultiSelectList({
  options,
  selected,
  onToggle,
  onContinue,
  continueLabel = "Continue",
}: MultiSelectListProps) {
  return (
    <div className="flex flex-col gap-4">
      {options.map((option) => {
        const isSelected = selected.includes(option.value);
        return (
          <button
            key={option.value}
            onClick={() => onToggle(option.value)}
            className={`flex items-center gap-4 rounded-2xl border px-5 py-5 text-left transition-colors ${
              isSelected
                ? "border-brand-dark bg-brand-dark/5"
                : "border-[#E5E1D8] bg-white hover:border-brand-dark/40"
            }`}
          >
            <span className="flex-1 font-[family-name:var(--font-urbanist)] text-base text-heading">
              {option.label}
            </span>
            <div
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                isSelected
                  ? "border-brand-dark bg-brand-dark text-white"
                  : "border-[#C9C2B3] bg-white"
              }`}
            >
              {isSelected && <Check size={14} />}
            </div>
          </button>
        );
      })}
      <button
        onClick={onContinue}
        disabled={selected.length === 0}
        className={`mt-2 h-12 w-full rounded-xl font-[family-name:var(--font-urbanist)] text-sm font-semibold text-white transition-opacity ${
          selected.length === 0 ? "bg-brand-dark/40" : "bg-brand-dark hover:opacity-90"
        }`}
      >
        {continueLabel}
      </button>
    </div>
  );
}
```

- [ ] **Step 5: Write `components/onboarding/slider-question.tsx`**

```tsx
interface SliderQuestionProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  unit: string;
  onContinue: () => void;
}

export function SliderQuestion({
  value,
  onChange,
  min,
  max,
  unit,
  onContinue,
}: SliderQuestionProps) {
  const ticks = [
    min,
    Math.round(min + (max - min) * 0.25),
    Math.round(min + (max - min) * 0.5),
    Math.round(min + (max - min) * 0.75),
    `${max}+`,
  ];

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-3">
        <input
          type="number"
          min={min}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-16 w-32 rounded-xl border-2 border-brand-dark text-center font-[family-name:var(--font-urbanist)] text-2xl font-bold text-heading outline-none"
        />
        <span className="font-[family-name:var(--font-urbanist)] text-lg text-muted-text">
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={Math.min(value, max)}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#3B2513]"
      />
      <div className="flex w-full justify-between font-[family-name:var(--font-urbanist)] text-xs text-muted-text">
        {ticks.map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
      <button
        onClick={onContinue}
        className="mt-2 h-12 w-full rounded-xl bg-brand-dark font-[family-name:var(--font-urbanist)] text-sm font-semibold text-white hover:opacity-90"
      >
        Continue
      </button>
    </div>
  );
}
```

- [ ] **Step 6: Write `components/onboarding/text-question.tsx`**

```tsx
interface TextQuestionProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: "text" | "email";
  onContinue: () => void;
  continueLabel?: string;
  helperText?: string;
}

export function TextQuestion({
  value,
  onChange,
  placeholder,
  type = "text",
  onContinue,
  continueLabel = "Continue",
  helperText,
}: TextQuestionProps) {
  const canContinue = value.trim().length > 0;
  return (
    <div className="flex flex-col gap-4">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-14 w-full rounded-xl border border-[#E5E1D8] bg-white px-4 font-[family-name:var(--font-urbanist)] text-base text-heading outline-none focus:border-brand-dark"
      />
      {helperText && (
        <p className="font-[family-name:var(--font-urbanist)] text-xs text-muted-text">
          {helperText}
        </p>
      )}
      <button
        onClick={onContinue}
        disabled={!canContinue}
        className={`h-12 w-full rounded-xl font-[family-name:var(--font-urbanist)] text-sm font-semibold text-white transition-opacity ${
          canContinue ? "bg-brand-dark hover:opacity-90" : "bg-brand-dark/40"
        }`}
      >
        {continueLabel}
      </button>
    </div>
  );
}
```

- [ ] **Step 7: Append a component showcase to the debug page**

In `app/(onboarding)/get-started/page.tsx`, add imports and render each primitive with sample data below the existing `<pre>` block, using local `useState` in the debug page just to make the showcase interactive:

```tsx
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
```

- [ ] **Step 8: Verify in the browser**

Run: `npm run dev`, open `/get-started`. Confirm:
- The scenario `<pre>` dump still shows the same 6 counts as Task 1.
- Below it, the "Component showcase" heading renders with a progress bar and a working "‹ Back" link.
- Clicking an OptionList row highlights it (brown border/background).
- Clicking MultiSelectList rows toggles a checkmark, and the "Continue" button enables once at least one is selected.
- Dragging the SliderQuestion's range input updates the number box, and vice versa.
- Typing in TextQuestion enables its "Continue" button.

- [ ] **Step 9: Commit**

```bash
git add components/onboarding/progress-bar.tsx components/onboarding/question-shell.tsx components/onboarding/option-list.tsx components/onboarding/multi-select-list.tsx components/onboarding/slider-question.tsx components/onboarding/text-question.tsx "app/(onboarding)/get-started/page.tsx"
git commit -m "Add shared onboarding question UI primitives"
```

---

### Task 3: Real funnel page + Admin/Director track end-to-end

**Files:**
- Modify: `app/(onboarding)/get-started/page.tsx` (full rewrite — replaces the debug/showcase version)
- Modify: `app/(auth)/signup/page.tsx`
- Modify: `components/auth/signup-form.tsx`

**Interfaces:**
- Consumes: `INITIAL_ANSWERS`, `OnboardingAnswers`, `Persona`, `StepId` (Task 1); `resolveFullPath` (Task 1); `QuestionShell`, `OptionList`, `OnboardingOption`, `SliderQuestion`, `TextQuestion` (Task 2).
- Produces: the real `GetStartedPage` component structure that Tasks 4–7 extend with more `if (stepId === ...)` branches.

- [ ] **Step 1: Rewrite `app/(onboarding)/get-started/page.tsx`**

```tsx
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
```

- [ ] **Step 2: Modify `app/(auth)/signup/page.tsx` to accept and forward a pre-filled email**

```tsx
import { AuthSplitPanel } from "@/components/auth/auth-split-panel";
import { SignupIllustration } from "@/components/auth/illustration-scenes";
import { SignUpForm } from "@/components/auth/signup-form";

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <AuthSplitPanel illustrationSide="left" illustration={<SignupIllustration />}>
      <SignUpForm defaultEmail={email} />
    </AuthSplitPanel>
  );
}
```

- [ ] **Step 3: Modify `components/auth/signup-form.tsx` to accept `defaultEmail`**

Change the function signature and the email `AuthField`:

```tsx
export function SignUpForm({ defaultEmail }: { defaultEmail?: string }) {
  const [state, formAction, isPending] = useActionState(signupAction, {});
```

And on the email field, add `defaultValue={defaultEmail}`:

```tsx
        <AuthField
          id="email"
          name="email"
          type="email"
          label="Email Address"
          placeholder="Enter your official email address"
          autoComplete="email"
          defaultValue={defaultEmail}
          disabled={isPending}
        />
```

- [ ] **Step 4: Verify the admin track end-to-end in the browser**

Run: `npm run dev`, open `/get-started`.

1. Click "I'm a creche admin or director" → advances to "What's your creche's enrollment capacity?" showing "2 of 6".
2. Adjust the slider or type a number, click Continue → "How many locations does your creche have?" ("3 of 6").
3. Select "1 location" → advances automatically to "What are you using to run your creche today?" ("4 of 6").
4. Select any option → advances to "How many staff/caregivers work at your creche?" ("5 of 6").
5. Select any option → advances to "What's your email?" ("6 of 6").
6. Type `test@example.com`, click Continue.

Expected: browser navigates to `/signup?email=test%40example.com`, and the "Email Address" field on that page is pre-filled with `test@example.com`.

Also click "‹ Back" at least once mid-flow and confirm it returns to the previous question with the previously-selected option still highlighted.

- [ ] **Step 5: Commit**

```bash
git add "app/(onboarding)/get-started/page.tsx" "app/(auth)/signup/page.tsx" components/auth/signup-form.tsx
git commit -m "Build admin/director onboarding track end-to-end"
```

---

### Task 4: Parent/Guardian track end-to-end

**Files:**
- Create: `components/onboarding/creche-search-question.tsx`
- Create: `components/onboarding/children-question.tsx`
- Create: `components/onboarding/final-contact-step.tsx`
- Modify: `app/(onboarding)/get-started/page.tsx` (add parent-track step branches)

**Interfaces:**
- Consumes: same primitives as Task 3, plus the three new components this task creates.
- Produces: `CrecheSearchQuestion`, `ChildrenQuestion`, `FinalContactStep` — `FinalContactStep` is reused as-is by Task 5's caregiver track.

- [ ] **Step 1: Write `components/onboarding/creche-search-question.tsx`**

```tsx
"use client";

import { useState } from "react";

const KNOWN_CRECHES = [
  "Sunshine Creche",
  "Little Stars Creche",
  "Bright Beginnings Creche",
  "Rainbow Kids Creche",
];

interface CrecheSearchQuestionProps {
  value: string;
  onChange: (value: string) => void;
  onContinue: (found: boolean) => void;
}

export function CrecheSearchQuestion({ value, onChange, onContinue }: CrecheSearchQuestionProps) {
  const [checked, setChecked] = useState(false);
  const trimmed = value.trim();
  const found =
    trimmed.length > 0 &&
    KNOWN_CRECHES.some((c) => c.toLowerCase().includes(trimmed.toLowerCase()));

  function handleClick() {
    if (!checked) {
      setChecked(true);
      return;
    }
    onContinue(found);
  }

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setChecked(false);
        }}
        placeholder="Search your child's creche"
        className="h-14 w-full rounded-xl border border-[#E5E1D8] bg-white px-4 font-[family-name:var(--font-urbanist)] text-base text-heading outline-none focus:border-brand-dark"
      />
      {checked && trimmed.length > 0 && !found && (
        <p className="rounded-xl bg-[#FDF3E7] px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm text-muted-text">
          We couldn&apos;t find that creche yet — no worries, we&apos;ve noted your interest and
          we&apos;ll reach out to them too.
        </p>
      )}
      {checked && found && (
        <p className="rounded-xl bg-[#EAF3EA] px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm text-[#2F6B2F]">
          Found it! {value} is already on CEven.
        </p>
      )}
      <button
        onClick={handleClick}
        disabled={trimmed.length === 0}
        className={`h-12 w-full rounded-xl font-[family-name:var(--font-urbanist)] text-sm font-semibold text-white transition-opacity ${
          trimmed.length === 0 ? "bg-brand-dark/40" : "bg-brand-dark hover:opacity-90"
        }`}
      >
        {checked ? "Continue" : "Search"}
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Write `components/onboarding/children-question.tsx`**

```tsx
interface ChildrenQuestionProps {
  count: number;
  onCountChange: (count: number) => void;
  ages: string;
  onAgesChange: (ages: string) => void;
  onContinue: () => void;
}

export function ChildrenQuestion({
  count,
  onCountChange,
  ages,
  onAgesChange,
  onContinue,
}: ChildrenQuestionProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 font-[family-name:var(--font-urbanist)] text-sm font-medium text-heading">
          Number of children
        </p>
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => onCountChange(Math.max(1, count - 1))}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E1D8] text-xl text-brand-dark"
          >
            −
          </button>
          <span className="font-[family-name:var(--font-urbanist)] text-2xl font-bold text-heading">
            {count}
          </span>
          <button
            onClick={() => onCountChange(count + 1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E1D8] text-xl text-brand-dark"
          >
            +
          </button>
        </div>
      </div>
      <div>
        <p className="mb-2 font-[family-name:var(--font-urbanist)] text-sm font-medium text-heading">
          How old are they?
        </p>
        <input
          type="text"
          value={ages}
          onChange={(e) => onAgesChange(e.target.value)}
          placeholder="e.g. 2 years, 4 years"
          className="h-14 w-full rounded-xl border border-[#E5E1D8] bg-white px-4 font-[family-name:var(--font-urbanist)] text-base text-heading outline-none focus:border-brand-dark"
        />
      </div>
      <button
        onClick={onContinue}
        disabled={ages.trim().length === 0}
        className={`h-12 w-full rounded-xl font-[family-name:var(--font-urbanist)] text-sm font-semibold text-white transition-opacity ${
          ages.trim().length === 0 ? "bg-brand-dark/40" : "bg-brand-dark hover:opacity-90"
        }`}
      >
        Continue
      </button>
    </div>
  );
}
```

- [ ] **Step 3: Write `components/onboarding/final-contact-step.tsx`**

```tsx
interface FinalContactStepProps {
  name: string;
  onNameChange: (v: string) => void;
  email: string;
  onEmailChange: (v: string) => void;
  phone: string;
  onPhoneChange: (v: string) => void;
  sendToWhatsApp: boolean;
  onSendToWhatsAppChange: (v: boolean) => void;
  onSubmit: () => void;
}

export function FinalContactStep({
  name,
  onNameChange,
  email,
  onEmailChange,
  phone,
  onPhoneChange,
  sendToWhatsApp,
  onSendToWhatsAppChange,
  onSubmit,
}: FinalContactStepProps) {
  const canSubmit =
    name.trim().length > 0 && email.trim().length > 0 && (!sendToWhatsApp || phone.trim().length > 0);

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="Your name"
        className="h-14 w-full rounded-xl border border-[#E5E1D8] bg-white px-4 font-[family-name:var(--font-urbanist)] text-base text-heading outline-none focus:border-brand-dark"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        placeholder="you@example.com"
        className="h-14 w-full rounded-xl border border-[#E5E1D8] bg-white px-4 font-[family-name:var(--font-urbanist)] text-base text-heading outline-none focus:border-brand-dark"
      />
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={sendToWhatsApp}
          onChange={(e) => onSendToWhatsAppChange(e.target.checked)}
          className="h-4 w-4 accent-[#3B2513]"
        />
        <span className="font-[family-name:var(--font-urbanist)] text-sm text-muted-text">
          Also send this to my WhatsApp
        </span>
      </label>
      {sendToWhatsApp && (
        <input
          type="tel"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          placeholder="WhatsApp phone number"
          className="h-14 w-full rounded-xl border border-[#E5E1D8] bg-white px-4 font-[family-name:var(--font-urbanist)] text-base text-heading outline-none focus:border-brand-dark"
        />
      )}
      <button
        onClick={onSubmit}
        disabled={!canSubmit}
        className={`h-12 w-full rounded-xl font-[family-name:var(--font-urbanist)] text-sm font-semibold text-white transition-opacity ${
          canSubmit ? "bg-brand-dark hover:opacity-90" : "bg-brand-dark/40"
        }`}
      >
        Get the CEven app
      </button>
    </div>
  );
}
```

- [ ] **Step 4: Add parent-track branches to `app/(onboarding)/get-started/page.tsx`**

Add these imports at the top:

```tsx
import { CrecheSearchQuestion } from "@/components/onboarding/creche-search-question";
import { ChildrenQuestion } from "@/components/onboarding/children-question";
import { FinalContactStep } from "@/components/onboarding/final-contact-step";
```

Add these option constants near the other `*_OPTIONS` constants:

```tsx
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
```

Add a `submitted` state (used by this task's final step and Task 6's handoff screen) right after the existing `index` state:

```tsx
  const [submitted, setSubmitted] = useState(false);
```

Insert these branches after the `admin-email` block and before `return null;`:

```tsx
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

  if (stepId === "parent-final") {
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
```

Note: the `submitted` block above is intentionally temporary scaffolding for this task only — Task 6 replaces it with the real `AppDownloadHandoff` component. It must render something so the "Get the CEven app" button is verifiably wired before Task 6 exists.

- [ ] **Step 5: Verify all three parent branches in the browser**

Run: `npm run dev`, open `/get-started` for each of these paths:

*Creche only:* Persona → Parent → Intent "My child's creche uses CEven" → search "Sunshine" (shows green "Found it!" message, click Continue again) → children count/ages → final step (fill name, email, click "Get the CEven app") → see the temporary "Submitted" message.

*Caregiver only:* Persona → Parent → Intent "I want to find/manage an independent caregiver" → "Yes, I already have someone in mind" → children count/ages → care type → location → final step → submitted message.

*Both:* Persona → Parent → Intent "Both" → creche search → children count/ages → has-caregiver-in-mind → care type → location (note: children question is NOT asked a second time) → final step → submitted message.

Confirm the progress bar's total matches Task 1's verified counts (5, 7, 8 respectively) at every step.

- [ ] **Step 6: Commit**

```bash
git add components/onboarding/creche-search-question.tsx components/onboarding/children-question.tsx components/onboarding/final-contact-step.tsx "app/(onboarding)/get-started/page.tsx"
git commit -m "Build parent/guardian onboarding track end-to-end"
```

---

### Task 5: Independent Caregiver track end-to-end

**Files:**
- Modify: `app/(onboarding)/get-started/page.tsx` (add caregiver-track step branches)

**Interfaces:**
- Consumes: `OptionList`, `MultiSelectList`, `TextQuestion`, `FinalContactStep` (Tasks 2 & 4).
- Produces: nothing new for later tasks — this completes the third and final track.

- [ ] **Step 1: Add caregiver-track option constants**

Add near the other `*_OPTIONS` constants in `app/(onboarding)/get-started/page.tsx`:

```tsx
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
```

Add this import:

```tsx
import { MultiSelectList } from "@/components/onboarding/multi-select-list";
```

- [ ] **Step 2: Add caregiver-track branches**

Insert after the `parent-final` block and before the `if (submitted)` block:

```tsx
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

  if (stepId === "caregiver-final") {
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
```

- [ ] **Step 3: Verify both caregiver branches in the browser**

*Has family:* Persona → Independent caregiver → "Yes, I already work with a family" → jumps straight to final step ("3 of 3") → submit → temporary "Submitted" message.

*Discovery:* Persona → Independent caregiver → "No, I'm looking to get discovered" → experience → location → availability → age groups (select at least one, then Continue) → final step ("7 of 7") → submit → temporary "Submitted" message.

- [ ] **Step 4: Commit**

```bash
git add "app/(onboarding)/get-started/page.tsx"
git commit -m "Build independent caregiver onboarding track end-to-end"
```

---

### Task 6: App-download handoff screen

**Files:**
- Create: `components/onboarding/app-download-handoff.tsx`
- Modify: `app/(onboarding)/get-started/page.tsx` (replace the temporary "Submitted" placeholder with the real component)

**Interfaces:**
- Consumes: `answers.email`, `answers.phone`, `answers.sendToWhatsApp` from page state.
- Produces: `AppDownloadHandoff` — final piece of the parent/caregiver ending.

- [ ] **Step 1: Write `components/onboarding/app-download-handoff.tsx`**

```tsx
interface AppDownloadHandoffProps {
  email: string;
  phone: string;
  sendToWhatsApp: boolean;
}

export function AppDownloadHandoff({ email, phone, sendToWhatsApp }: AppDownloadHandoffProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#faf2e1] px-6 py-14 text-center">
      <div className="w-full max-w-[440px]">
        <h1 className="font-[family-name:var(--font-merriweather)] text-[28px] font-bold text-heading">
          You&apos;re all set. Get the CEven app.
        </h1>
        <p className="mt-3 font-[family-name:var(--font-urbanist)] text-base text-muted-text">
          We&apos;ve sent the download link to{" "}
          <span className="font-semibold text-heading">{email}</span>
          {sendToWhatsApp && phone && (
            <>
              {" "}
              and to your WhatsApp at <span className="font-semibold text-heading">{phone}</span>
            </>
          )}
          .
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="#"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#3B2513] px-6 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1] sm:w-auto"
          >
            Google Play
          </a>
          <a
            href="#"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#3d444f] px-6 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#3d444f] sm:w-auto"
          >
            App Store
          </a>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Wire it into `app/(onboarding)/get-started/page.tsx`**

Add the import:

```tsx
import { AppDownloadHandoff } from "@/components/onboarding/app-download-handoff";
```

Replace the temporary block from Task 4:

```tsx
  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf2e1] px-6 text-center font-[family-name:var(--font-urbanist)] text-heading">
        Submitted — app download handoff screen arrives in Task 6.
      </div>
    );
  }
```

with:

```tsx
  if (submitted) {
    return (
      <AppDownloadHandoff
        email={answers.email}
        phone={answers.phone}
        sendToWhatsApp={answers.sendToWhatsApp}
      />
    );
  }
```

- [ ] **Step 3: Verify in the browser**

Repeat one parent-track run and one caregiver-track run through to the final step. On submit, confirm the real handoff screen renders: "You're all set. Get the CEven app.", the entered email in the confirmation sentence, Google Play / App Store buttons, and — if "Also send this to my WhatsApp" was checked with a phone number — the "...and to your WhatsApp at {phone}" clause appears; if not checked, that clause is absent.

- [ ] **Step 4: Commit**

```bash
git add components/onboarding/app-download-handoff.tsx "app/(onboarding)/get-started/page.tsx"
git commit -m "Add app-download handoff screen for parent/caregiver tracks"
```

---

### Task 7: Wire the funnel into the site and do a full regression pass

**Files:**
- Modify: `components/landing/nav.tsx`

**Interfaces:**
- Consumes: the completed `/get-started` route from Tasks 1–6.
- Produces: nothing further downstream — this is the last task.

- [ ] **Step 1: Point both "Download CEven" CTAs at `/get-started`**

In `components/landing/nav.tsx`, there are two `<Link href="#">Download CEven</Link>` instances (desktop nav and mobile menu — currently placeholder `#` links). Change both `href="#"` to `href="/get-started"`.

- [ ] **Step 2: Verify the nav wiring in the browser**

Run: `npm run dev`, open `/`. Click "Download CEven" in the desktop nav → lands on `/get-started` showing the persona-select screen. Resize to mobile width, open the mobile menu, click "Download CEven" there too → same result.

- [ ] **Step 3: Full regression pass across all six branch permutations**

Using the browser, click all the way through each of these six paths from `/`, confirming no console errors (`read_console_messages`) and that the ending matches the design:

1. Admin → ends by navigating to `/signup?email=...` with the email field pre-filled.
2. Parent, creche only → ends on the app-download handoff screen.
3. Parent, caregiver only → ends on the app-download handoff screen.
4. Parent, both → ends on the app-download handoff screen, and the "how many children" question is asked exactly once.
5. Caregiver, has family → 3 total steps, ends on the app-download handoff screen.
6. Caregiver, discovery → 7 total steps, ends on the app-download handoff screen.

For each, also verify "‹ Back" from the first question-track step returns to persona-select, and re-selecting a different persona correctly recomputes the total step count.

- [ ] **Step 4: Commit**

```bash
git add components/landing/nav.tsx
git commit -m "Wire landing page CTAs into the onboarding funnel"
```
