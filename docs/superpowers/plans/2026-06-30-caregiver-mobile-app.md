# Caregiver Mobile App Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Caregiver/Parent mobile companion app as a new `app/(caregiver)/` route group — mobile-only, bottom-tab navigation, OTP + PIN auth, with 5 main screens (Home, Tasks, Report, Chat, Settings) and a Children detail view, all backed by static mock data.

**Architecture:** New `app/(caregiver)/` route group with its own `layout.tsx` (MobileShell wrapper, 390 px centred). Auth state lives in `localStorage`. A React context (`LogSheetContext`) controls the Report sheet overlay so it can be triggered from the bottom nav without a page navigation. All data is in `lib/caregiver/mock-data.ts` — no API calls.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Lucide React icons. No test framework in project — each task's verification step runs the dev server and checks the UI manually.

## Global Constraints

- Mobile viewport: 390 × 844 px. MobileShell centres the 390 px container on wider screens.
- All caregiver routes are under `/caregiver/…` — no URL segment collision with `/(admin)/` routes.
- `"use client"` required on every interactive component (this is a fully client-side prototype).
- Next.js 16: dynamic route `params` is a `Promise` — always `await params` in async components.
- Tailwind v4: use `@theme inline` to extend tokens; no `tailwind.config.js`.
- No new npm packages unless unavoidable. Use existing: `lucide-react`, `clsx`, `tailwind-merge`.
- Design tokens: use CSS custom properties defined in `globals.css` (existing + new ones added in Task 1).
- Copy must match Figma exactly for labels, placeholder text, and button names.
- `localStorage` keys: `cg_onboarding_seen`, `cg_pin_configured`, `cg_user_name`, `cg_user_role`.

---

## File Map

**New files to create:**

```
app/(caregiver)/
  layout.tsx
  caregiver/
    page.tsx                       ← redirect logic
    splash/page.tsx
    onboarding/page.tsx
    auth/page.tsx
    auth/pin/page.tsx
    home/page.tsx
    children/page.tsx
    tasks/page.tsx
    report/page.tsx
    chat/page.tsx
    chat/[id]/page.tsx
    settings/page.tsx

components/caregiver/
  mobile-shell.tsx                 ← 390px container
  bottom-nav.tsx                   ← 5-tab nav
  log-sheet-context.tsx            ← context + provider
  otp-input.tsx                    ← 6-box OTP + numeric keypad
  pin-input.tsx                    ← 6-box PIN input
  stat-card.tsx                    ← KPI tile (icon, label, value)
  quick-action-card.tsx            ← icon + label action tile
  task-card.tsx                    ← single task row
  child-card.tsx                   ← expandable accordion child row
  log-sheet.tsx                    ← bottom sheet orchestrator
  log-activity-form.tsx            ← activity log form
  daily-report-card.tsx            ← daily report viewer
  chat-list-item.tsx               ← conversation preview row
  message-bubble.tsx               ← sent / received chat bubble

lib/caregiver/
  mock-data.ts                     ← all static data + TypeScript types
  storage.ts                       ← localStorage read/write helpers
```

**Modified files:**

```
app/globals.css                    ← add caregiver CSS custom properties
```

---

## Task 1: Design Tokens + Mock Data

**Files:**
- Modify: `app/globals.css`
- Create: `lib/caregiver/mock-data.ts`
- Create: `lib/caregiver/storage.ts`

**Interfaces:**
- Produces:
  - CSS tokens: `--color-cg-bg`, `--color-cg-surface`, `--color-cg-brand`, `--color-cg-accent`, `--color-cg-accent-muted`, `--color-cg-onboarding-bg`, `--color-cg-stat-pink`, `--color-cg-stat-teal`, `--color-cg-quick-action`, `--color-cg-sent-bubble`, `--color-cg-pending-badge`
  - Types: `CaregiverUser`, `Classroom`, `Child`, `Alert`, `Contact`, `Task`, `ChatThread`, `Message`, `DailyReport`, `NapEntry`, `Photo`
  - Data: `mockUser`, `mockClassrooms`, `mockChildren`, `mockTasks`, `mockChatThreads`, `mockDailyReport`
  - Storage helpers: `cgGet(key)`, `cgSet(key, value)`, `cgRemove(key)`

- [ ] **Step 1: Add caregiver CSS tokens to `app/globals.css`**

Open `app/globals.css`. Find the second `:root { }` block (the one with `--color-sidebar-bg`). Add these tokens inside it, after the last existing entry:

```css
  /* Caregiver app tokens */
  --color-cg-bg: #F5F0E8;
  --color-cg-surface: #FFFFFF;
  --color-cg-brand: #3B2513;
  --color-cg-accent: #C9956A;
  --color-cg-accent-muted: #E0BFA0;
  --color-cg-onboarding-bg: #B07D2A;
  --color-cg-stat-pink: #FCE8F3;
  --color-cg-stat-teal: #E4F5F3;
  --color-cg-quick-action: #F5ECD9;
  --color-cg-sent-bubble: #007AFF;
  --color-cg-pending-badge: #E5E7EB;
```

Then find the second `@theme inline { }` block. Add inside it:

```css
  --color-cg-bg: var(--color-cg-bg);
  --color-cg-surface: var(--color-cg-surface);
  --color-cg-brand: var(--color-cg-brand);
  --color-cg-accent: var(--color-cg-accent);
  --color-cg-accent-muted: var(--color-cg-accent-muted);
  --color-cg-onboarding-bg: var(--color-cg-onboarding-bg);
  --color-cg-stat-pink: var(--color-cg-stat-pink);
  --color-cg-stat-teal: var(--color-cg-stat-teal);
  --color-cg-quick-action: var(--color-cg-quick-action);
  --color-cg-sent-bubble: var(--color-cg-sent-bubble);
  --color-cg-pending-badge: var(--color-cg-pending-badge);
```

- [ ] **Step 2: Create `lib/caregiver/mock-data.ts`**

```typescript
export type CaregiverUser = {
  name: string;
  role: "parent" | "caregiver";
  avatarInitials: string;
};

export type Alert = {
  type: "info" | "warning";
  label: string;
  detail: string;
};

export type Contact = {
  id: string;
  name: string;
  avatarInitials: string;
};

export type Classroom = {
  id: string;
  name: string;
};

export type Child = {
  id: string;
  name: string;
  age: string;
  room: string;
  alerts: Alert[];
  parentContact: Contact;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  dueTime: string;
  reminderTime: string;
  status: "pending" | "completed";
};

export type Message = {
  id: string;
  body: string;
  sentAt: string;
  direction: "sent" | "received";
};

export type ChatThread = {
  id: string;
  contact: Contact;
  lastMessage: string;
  lastMessageTime: string;
  dateGroup: string;
  messages: Message[];
};

export type NapEntry = {
  start: string;
  end: string;
  duration: string;
};

export type Photo = {
  src: string;
  caption: string;
  label: string;
};

export type DailyReport = {
  date: string;
  mood: string[];
  meals: number;
  naps: NapEntry[];
  hygiene: string;
  healthSafety: string;
  medications: string;
  photos: Photo[];
};

export const mockUser: CaregiverUser = {
  name: "Ms Anu",
  role: "caregiver",
  avatarInitials: "MA",
};

export const mockClassrooms: Classroom[] = [
  { id: "cls-1", name: "Toddler Room" },
  { id: "cls-2", name: "Nursery Room" },
];

export const mockChildren: Child[] = [
  {
    id: "child-1",
    name: "Liam Smith",
    age: "3 Years",
    room: "Toddler",
    alerts: [{ type: "info", label: "Nap Time", detail: "Needs nap at 1:00 PM" }],
    parentContact: { id: "contact-1", name: "James Miller", avatarInitials: "JM" },
  },
  {
    id: "child-2",
    name: "Olivia Brown",
    age: "2 Years",
    room: "Toddler",
    alerts: [],
    parentContact: { id: "contact-2", name: "Sarah Brown", avatarInitials: "SB" },
  },
  {
    id: "child-3",
    name: "Noah Davies",
    age: "4 Years",
    room: "Nursery",
    alerts: [{ type: "warning", label: "Allergy", detail: "Peanut allergy — EpiPen in bag" }],
    parentContact: { id: "contact-3", name: "Tom Davies", avatarInitials: "TD" },
  },
  {
    id: "child-4",
    name: "Johnson Emma",
    age: "3 Years",
    room: "Toddler",
    alerts: [],
    parentContact: { id: "contact-4", name: "Kate Johnson", avatarInitials: "KJ" },
  },
  {
    id: "child-5",
    name: "Tosin Adeyemi",
    age: "2 Years",
    room: "Nursery",
    alerts: [{ type: "info", label: "Medication", detail: "Calpol at 10:00 AM if needed" }],
    parentContact: { id: "contact-5", name: "Mercy Itom", avatarInitials: "MI" },
  },
];

export const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Give medicine to Tosin",
    description: "Kindly give her the drugs when needed.",
    dueTime: "10:00am",
    reminderTime: "09:00am",
    status: "pending",
  },
  {
    id: "task-2",
    title: "Give medicine to Tosin",
    description: "Kindly give her the drugs when needed.",
    dueTime: "10:00am",
    reminderTime: "09:00am",
    status: "pending",
  },
  {
    id: "task-3",
    title: "Give medicine to Tosin",
    description: "Kindly give her the drugs when needed.",
    dueTime: "10:00am",
    reminderTime: "09:00am",
    status: "pending",
  },
  {
    id: "task-4",
    title: "Give medicine to Tosin",
    description: "Kindly give her the drugs when needed.",
    dueTime: "10:30am",
    reminderTime: "09:30am",
    status: "completed",
  },
];

export const mockChatThreads: ChatThread[] = [
  {
    id: "thread-1",
    contact: { id: "contact-5", name: "Mercy Itom", avatarInitials: "MI" },
    lastMessage: "Good afternoon Ma, how can I help you?",
    lastMessageTime: "16:50",
    dateGroup: "October 05, 2024",
    messages: [
      { id: "m1", body: "Hi, Mrs Itom", sentAt: "16:50", direction: "sent" },
      { id: "m2", body: "Good afternoon Ma, how can I help you?", sentAt: "16:50", direction: "received" },
    ],
  },
  {
    id: "thread-2",
    contact: { id: "contact-6", name: "Mark James", avatarInitials: "MJ" },
    lastMessage: "Lorem ipsum dolor sit amet consectetur…",
    lastMessageTime: "14:30",
    dateGroup: "October 05, 2024",
    messages: [
      { id: "m3", body: "Lorem ipsum dolor sit amet consectetur", sentAt: "14:30", direction: "received" },
    ],
  },
  {
    id: "thread-3",
    contact: { id: "contact-7", name: "Jane Udenyi", avatarInitials: "JU" },
    lastMessage: "Lorem ipsum dolor sit amet consectetur…",
    lastMessageTime: "13:00",
    dateGroup: "October 05, 2024",
    messages: [],
  },
  {
    id: "thread-4",
    contact: { id: "contact-8", name: "Peace Matthew", avatarInitials: "PM" },
    lastMessage: "Lorem ipsum dolor sit amet consectetur…",
    lastMessageTime: "11:45",
    dateGroup: "October 05, 2024",
    messages: [],
  },
  {
    id: "thread-5",
    contact: { id: "contact-9", name: "Chris Irabour", avatarInitials: "CI" },
    lastMessage: "Lorem ipsum dolor sit amet consectetur…",
    lastMessageTime: "09:20",
    dateGroup: "October 12, 2024",
    messages: [],
  },
];

export const mockDailyReport: DailyReport = {
  date: "Friday, 9 January, 2026",
  mood: ["🤩 Playful", "😄 Happy"],
  meals: 3,
  naps: [
    { start: "09:00am", end: "12:35pm", duration: "3hr 35mins" },
    { start: "14:20pm", end: "15:00pm", duration: "40mins" },
  ],
  hygiene: "1 urine, 2 poop",
  healthSafety: "Nil",
  medications: "Nil",
  photos: [
    {
      src: "/caregiver/placeholder-playtime.jpg",
      caption: "Esther had a wonderful time playing with her friends today!",
      label: "Playtime",
    },
  ],
};
```

- [ ] **Step 3: Create `lib/caregiver/storage.ts`**

```typescript
const KEYS = {
  onboarding: "cg_onboarding_seen",
  pin: "cg_pin_configured",
  userName: "cg_user_name",
  userRole: "cg_user_role",
} as const;

export type StorageKey = keyof typeof KEYS;

export function cgGet(key: StorageKey): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(KEYS[key]);
}

export function cgSet(key: StorageKey, value: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEYS[key], value);
}

export function cgRemove(key: StorageKey): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEYS[key]);
}

export function cgClearAll(): void {
  if (typeof window === "undefined") return;
  Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
}
```

- [ ] **Step 4: Verify**

Run `npm run build` — should compile with no errors. No UI to check yet.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css lib/caregiver/mock-data.ts lib/caregiver/storage.ts
git commit -m "feat(caregiver): add design tokens, mock data, and storage helpers"
```

---

## Task 2: MobileShell + Route Group Layout + LogSheetContext

**Files:**
- Create: `components/caregiver/mobile-shell.tsx`
- Create: `components/caregiver/log-sheet-context.tsx`
- Create: `components/caregiver/bottom-nav.tsx`
- Create: `app/(caregiver)/layout.tsx`

**Interfaces:**
- Consumes: CSS tokens from Task 1
- Produces:
  - `<MobileShell>` — wraps any caregiver screen with 390 px container
  - `LogSheetContext` — `{ mode, openLog, openActivity, openReport, close }` where `mode: "idle" | "chooser" | "activity" | "report"`
  - `useLogSheet()` — hook to consume the context
  - `<BottomNav>` — 5-tab persistent nav, calls `openLog()` for Report tab
  - `<CaregiverLayout>` — layout.tsx wrapping component

- [ ] **Step 1: Create `components/caregiver/log-sheet-context.tsx`**

```typescript
"use client";

import { createContext, useContext, useState } from "react";

type LogMode = "idle" | "chooser" | "activity" | "report";

type LogSheetContextType = {
  mode: LogMode;
  openLog: () => void;
  openActivity: () => void;
  openReport: () => void;
  close: () => void;
};

const LogSheetContext = createContext<LogSheetContextType | null>(null);

export function LogSheetProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<LogMode>("idle");

  return (
    <LogSheetContext.Provider
      value={{
        mode,
        openLog: () => setMode("chooser"),
        openActivity: () => setMode("activity"),
        openReport: () => setMode("report"),
        close: () => setMode("idle"),
      }}
    >
      {children}
    </LogSheetContext.Provider>
  );
}

export function useLogSheet(): LogSheetContextType {
  const ctx = useContext(LogSheetContext);
  if (!ctx) throw new Error("useLogSheet must be used inside LogSheetProvider");
  return ctx;
}
```

- [ ] **Step 2: Create `components/caregiver/mobile-shell.tsx`**

```typescript
"use client";

import { LogSheetProvider } from "./log-sheet-context";

export function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <LogSheetProvider>
      <div className="flex min-h-dvh items-center justify-center bg-gray-200">
        <div
          className="relative flex h-dvh w-full max-w-[390px] flex-col overflow-hidden bg-cg-bg"
          style={{ fontFamily: "var(--font-nunito)" }}
        >
          {/* Simulated status bar */}
          <div className="flex shrink-0 items-center justify-between px-6 pt-3 pb-1">
            <span className="text-xs font-semibold text-[#1a1a1a]">9:41</span>
            <div className="flex items-center gap-1">
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <rect x="0" y="4" width="3" height="8" rx="1" fill="#1a1a1a" />
                <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" fill="#1a1a1a" />
                <rect x="9" y="1" width="3" height="11" rx="1" fill="#1a1a1a" />
                <rect x="13.5" y="0" width="2.5" height="12" rx="1" fill="#1a1a1a" />
              </svg>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <rect x="1" y="1" width="12" height="10" rx="2" stroke="#1a1a1a" strokeWidth="1.5" />
                <rect x="13.5" y="3.5" width="2" height="5" rx="1" fill="#1a1a1a" />
                <rect x="2.5" y="2.5" width="8" height="7" rx="1" fill="#1a1a1a" />
              </svg>
            </div>
          </div>

          {/* Page content */}
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        </div>
      </div>
    </LogSheetProvider>
  );
}
```

- [ ] **Step 3: Create `components/caregiver/bottom-nav.tsx`**

```typescript
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Clock, FileText, MessageSquare, Settings } from "lucide-react";
import { useLogSheet } from "./log-sheet-context";

const NAV_ITEMS = [
  { label: "Home", icon: Home, href: "/caregiver/home" },
  { label: "Tasks", icon: Clock, href: "/caregiver/tasks" },
  { label: "Report", icon: FileText, href: null }, // opens sheet
  { label: "Chat", icon: MessageSquare, href: "/caregiver/chat" },
  { label: "Settings", icon: Settings, href: "/caregiver/settings" },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  const { openLog } = useLogSheet();

  return (
    <nav className="shrink-0 border-t border-gray-100 bg-cg-surface pb-safe">
      <div className="flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map(({ label, icon: Icon, href }) => {
          const isActive = href ? pathname.startsWith(href) : false;

          const content = (
            <div className="flex flex-col items-center gap-0.5">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                  isActive ? "bg-cg-brand" : "bg-transparent"
                }`}
              >
                <Icon
                  size={20}
                  className={isActive ? "text-white" : "text-gray-400"}
                />
              </div>
              <span
                className={`text-[10px] font-medium ${
                  isActive ? "text-cg-brand" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
          );

          if (!href) {
            return (
              <button key={label} onClick={openLog} className="flex-1">
                {content}
              </button>
            );
          }

          return (
            <Link key={label} href={href} className="flex-1 flex justify-center">
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

- [ ] **Step 4: Create `app/(caregiver)/layout.tsx`**

```typescript
import { MobileShell } from "@/components/caregiver/mobile-shell";

export default function CaregiverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MobileShell>{children}</MobileShell>;
}
```

- [ ] **Step 5: Verify**

Run `npm run dev`. Navigate to any `/caregiver/…` path — you should see a centred 390 px cream-coloured container with the simulated status bar, even if the child page is blank.

- [ ] **Step 6: Commit**

```bash
git add components/caregiver/mobile-shell.tsx components/caregiver/log-sheet-context.tsx components/caregiver/bottom-nav.tsx app/\(caregiver\)/layout.tsx
git commit -m "feat(caregiver): add MobileShell, BottomNav, LogSheetContext, and route group layout"
```

---

## Task 3: Splash Screen + Root Redirect

**Files:**
- Create: `app/(caregiver)/caregiver/page.tsx`
- Create: `app/(caregiver)/caregiver/splash/page.tsx`

**Interfaces:**
- Consumes: `cgGet` from `lib/caregiver/storage.ts`
- Produces: `/caregiver` → redirects based on `localStorage` state; `/caregiver/splash` → shows logo, then navigates

- [ ] **Step 1: Create root redirect `app/(caregiver)/caregiver/page.tsx`**

```typescript
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { cgGet } from "@/lib/caregiver/storage";

export default function CaregiverRoot() {
  const router = useRouter();

  useEffect(() => {
    const onboardingSeen = cgGet("onboarding");
    if (onboardingSeen) {
      router.replace("/caregiver/auth");
    } else {
      router.replace("/caregiver/splash");
    }
  }, [router]);

  return null;
}
```

- [ ] **Step 2: Create `app/(caregiver)/caregiver/splash/page.tsx`**

```typescript
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cgGet } from "@/lib/caregiver/storage";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      const onboardingSeen = cgGet("onboarding");
      router.replace(onboardingSeen ? "/caregiver/auth" : "/caregiver/onboarding");
    }, 1500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-cg-bg">
      <div className="flex flex-col items-center gap-3">
        {/* Logo mark — placeholder SVG matching Figma icon */}
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          <circle cx="36" cy="36" r="36" fill="#3B2513" />
          <circle cx="28" cy="20" r="8" fill="#C9956A" />
          <circle cx="44" cy="18" r="6" fill="#8FA89A" />
          <circle cx="50" cy="28" r="5" fill="#4A7C7C" />
          <path d="M18 52 Q36 30 54 52" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
        <span
          className="text-3xl font-bold tracking-tight text-cg-brand"
          style={{ fontFamily: "var(--font-merriweather)" }}
        >
          CEven
        </span>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify**

Go to `/caregiver`. After 1.5 s, it should auto-navigate to `/caregiver/onboarding` (first visit). Clear `localStorage` and try again to confirm.

- [ ] **Step 4: Commit**

```bash
git add app/\(caregiver\)/caregiver/page.tsx app/\(caregiver\)/caregiver/splash/page.tsx
git commit -m "feat(caregiver): add splash screen and root redirect"
```

---

## Task 4: Onboarding (3-slide)

**Files:**
- Create: `app/(caregiver)/caregiver/onboarding/page.tsx`

**Interfaces:**
- Consumes: `cgSet` from `lib/caregiver/storage.ts`
- Produces: `/caregiver/onboarding` — 3-slide full-screen onboarding; on complete sets `cg_onboarding_seen=true` and navigates to `/caregiver/auth`

- [ ] **Step 1: Create `app/(caregiver)/caregiver/onboarding/page.tsx`**

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cgSet } from "@/lib/caregiver/storage";

const SLIDES = [
  {
    heading: "Empowering your Parenting Journey",
    subtitle: "The ultimate tool to support parents and caregivers in raising happy, healthy children.",
  },
  {
    heading: "Stay in Sync with Their Growth",
    subtitle: "From playtime to learning moments, track your child's growth with ease.",
  },
  {
    heading: "Capture Every Moment",
    subtitle: "Create memories that last a lifetime with easy-to-use tools to capture and share moments.",
  },
];

export default function OnboardingPage() {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  function finish() {
    cgSet("onboarding", "true");
    router.replace("/caregiver/auth");
  }

  function next() {
    if (index < SLIDES.length - 1) {
      setIndex(index + 1);
    } else {
      finish();
    }
  }

  function prev() {
    if (index > 0) setIndex(index - 1);
  }

  const slide = SLIDES[index];
  const isLast = index === SLIDES.length - 1;
  const isFirst = index === 0;

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      {/* Photo background (amber overlay) */}
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundColor: "#B07D2A" }}
      >
        {/* Dark scrim at bottom for text legibility */}
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* CEven logo top-left */}
      <div className="relative z-10 flex items-center gap-2 px-6 pt-4">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="14" fill="white" fillOpacity="0.25" />
          <circle cx="10" cy="8" r="4" fill="white" />
          <circle cx="18" cy="7" r="3" fill="white" fillOpacity="0.7" />
        </svg>
        <span className="text-base font-bold text-white" style={{ fontFamily: "var(--font-merriweather)" }}>
          CEven
        </span>
      </div>

      {/* Slide content — bottom */}
      <div className="relative z-10 mt-auto px-6 pb-4">
        <h2 className="mb-2 text-2xl font-bold leading-tight text-white">
          {slide.heading}
        </h2>
        <p className="mb-4 text-sm text-white/80">{slide.subtitle}</p>

        {/* Progress dots */}
        <div className="mb-6 flex gap-1.5">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-white" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          {!isFirst && (
            <button
              onClick={prev}
              className="flex-1 rounded-xl border border-white/60 py-3 text-sm font-semibold text-white"
            >
              Prev
            </button>
          )}
          <button
            onClick={next}
            className="flex-1 rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white"
          >
            {isLast ? "Get Started" : "Next"}
          </button>
        </div>

        {!isLast && (
          <button
            onClick={finish}
            className="mt-3 w-full py-2 text-sm text-white/80"
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Navigate to `/caregiver/onboarding`. Check:
- Slide 1 shows "Empowering your Parenting Journey", no Prev button, Next + Skip visible
- Clicking Next advances to Slide 2 — Prev button appears
- Clicking Next on Slide 3 (or Skip on any) navigates to `/caregiver/auth`
- `localStorage` should have `cg_onboarding_seen = "true"` after completion

- [ ] **Step 3: Commit**

```bash
git add app/\(caregiver\)/caregiver/onboarding/page.tsx
git commit -m "feat(caregiver): add 3-slide onboarding screen"
```

---

## Task 5: OTP Input Component + Sign In Screen

**Files:**
- Create: `components/caregiver/otp-input.tsx`
- Create: `app/(caregiver)/caregiver/auth/page.tsx`

**Interfaces:**
- Consumes: nothing from earlier tasks
- Produces:
  - `<OtpInput value={string} onChange={(v: string) => void} length={6} />` — 6-box OTP with numeric keypad
  - `/caregiver/auth` — sign-in screen; on submit (any 6-digit code) navigates to `/caregiver/auth/pin`

- [ ] **Step 1: Create `components/caregiver/otp-input.tsx`**

```typescript
"use client";

type Props = {
  value: string;
  onChange: (v: string) => void;
  length?: number;
};

export function OtpInput({ value, onChange, length = 6 }: Props) {
  function handleKey(key: string) {
    if (key === "backspace") {
      onChange(value.slice(0, -1));
      return;
    }
    if (value.length < length && /^\d$/.test(key)) {
      onChange(value + key);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Boxes */}
      <div className="flex gap-2">
        {Array.from({ length }).map((_, i) => (
          <div
            key={i}
            className="flex h-12 flex-1 items-center justify-center rounded-lg border border-gray-200 bg-white text-lg font-bold text-cg-brand"
          >
            {value[i] ?? <span className="text-gray-300">–</span>}
          </div>
        ))}
      </div>

      {/* Numeric keypad */}
      <div className="mt-2 rounded-t-3xl bg-gray-100 px-4 pt-4 pb-2">
        {/* Display row */}
        <div className="mb-2 flex h-10 items-center justify-center rounded-lg bg-white text-base font-mono text-gray-500">
          {value || ""}
        </div>
        {/* Keys */}
        {[["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"], ["", "0", "backspace"]].map(
          (row, ri) => (
            <div key={ri} className="mb-2 flex gap-2">
              {row.map((k) => (
                <button
                  key={k}
                  onClick={() => k && handleKey(k)}
                  className={`flex h-14 flex-1 items-center justify-center rounded-xl text-lg font-medium ${
                    k ? "bg-white text-cg-brand shadow-sm active:bg-gray-200" : "bg-transparent"
                  }`}
                  disabled={!k}
                >
                  {k === "backspace" ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 9L15 15M15 9L9 15M3 12L7 5H21V19H7L3 12Z"
                        stroke="#3B2513"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    k
                  )}
                </button>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `app/(caregiver)/caregiver/auth/page.tsx`**

```typescript
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Users } from "lucide-react";
import { OtpInput } from "@/components/caregiver/otp-input";
import { cgGet } from "@/lib/caregiver/storage";

type Role = "parents" | "caregivers";

export default function AuthPage() {
  const [role, setRole] = useState<Role>("caregivers");
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(600); // 10 min in seconds
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          setCanResend(true);
          clearInterval(timerRef.current!);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, []);

  function formatCountdown(s: number) {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  }

  function handleLogin() {
    if (otp.length !== 6) return;
    const pinConfigured = cgGet("pin");
    router.push(pinConfigured ? "/caregiver/home" : "/caregiver/auth/pin");
  }

  const greeting = role === "parents" ? "Welcome Parent 👋" : "Welcome Caregiver 👋";

  return (
    <div className="flex flex-1 flex-col bg-white">
      {/* Back arrow */}
      <button className="m-4 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200">
        <ArrowLeft size={16} className="text-gray-600" />
      </button>

      <div className="flex flex-1 flex-col px-6">
        <h1 className="mb-1 text-2xl font-bold text-cg-brand" style={{ fontFamily: "var(--font-merriweather)" }}>
          {greeting}
        </h1>
        <p className="mb-6 text-sm text-gray-500">
          We&apos;ve sent a one time OTP to your email/phone number.
        </p>

        {/* Role toggle */}
        <div className="mb-6 flex rounded-full border border-gray-200 p-0.5">
          <button
            onClick={() => setRole("parents")}
            className={`flex-1 rounded-full py-2 text-sm font-medium transition-colors ${
              role === "parents" ? "bg-cg-brand text-white" : "text-gray-500"
            }`}
          >
            Parents
          </button>
          <button
            onClick={() => setRole("caregivers")}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-sm font-medium transition-colors ${
              role === "caregivers" ? "bg-cg-brand text-white" : "text-gray-500"
            }`}
          >
            <Users size={14} />
            Caregivers
          </button>
        </div>

        {/* OTP label */}
        <p className="mb-3 text-sm font-semibold text-gray-700">OTP</p>

        <OtpInput value={otp} onChange={setOtp} length={6} />

        {/* Countdown */}
        <p className="my-4 text-center text-sm text-gray-500">
          {canResend ? (
            <button
              className="font-semibold text-cg-accent underline"
              onClick={() => {
                setCountdown(600);
                setCanResend(false);
                setOtp("");
              }}
            >
              Resend Code
            </button>
          ) : (
            <>Resend Code in <span className="font-bold text-gray-700">{formatCountdown(countdown)}</span></>
          )}
        </p>

        {/* Login button */}
        <button
          onClick={handleLogin}
          disabled={otp.length !== 6}
          className="w-full rounded-xl bg-cg-accent-muted py-3.5 text-base font-semibold text-cg-brand disabled:opacity-40"
        >
          Login
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify**

Navigate to `/caregiver/auth`. Check:
- "Welcome Caregiver 👋" heading (toggle to Parents to see it change)
- OTP boxes show "–" when empty, fill in as you tap the numeric keypad
- Countdown ticks from 10:00
- Login button is disabled until 6 digits entered; on tap navigates to `/caregiver/auth/pin`

- [ ] **Step 4: Commit**

```bash
git add components/caregiver/otp-input.tsx app/\(caregiver\)/caregiver/auth/page.tsx
git commit -m "feat(caregiver): add OTP input component and sign-in screen"
```

---

## Task 6: PIN Input Component + PIN Screen

**Files:**
- Create: `components/caregiver/pin-input.tsx`
- Create: `app/(caregiver)/caregiver/auth/pin/page.tsx`

**Interfaces:**
- Consumes: `cgSet`, `cgGet` from `lib/caregiver/storage.ts`; `mockUser` from `lib/caregiver/mock-data.ts`
- Produces:
  - `<PinInput value={string} onChange={(v: string) => void} label={string} />` — 6-box PIN
  - `/caregiver/auth/pin` — Setup PIN modal; on submit sets `cg_pin_configured=true` and navigates to `/caregiver/home`

- [ ] **Step 1: Create `components/caregiver/pin-input.tsx`**

```typescript
"use client";

type Props = {
  value: string;
  onChange: (v: string) => void;
  label: string;
  length?: number;
};

export function PinInput({ value, onChange, label, length = 6 }: Props) {
  function handleKey(key: string) {
    if (key === "backspace") {
      onChange(value.slice(0, -1));
    } else if (value.length < length && /^\d$/.test(key)) {
      onChange(value + key);
    }
  }

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-gray-700">{label}</p>
      <div className="flex gap-2">
        {Array.from({ length }).map((_, i) => (
          <div
            key={i}
            className="flex h-11 flex-1 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-lg font-bold text-cg-brand"
          >
            {value[i] ? "●" : <span className="text-gray-300">–</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `app/(caregiver)/caregiver/auth/pin/page.tsx`**

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { PinInput } from "@/components/caregiver/pin-input";
import { cgSet } from "@/lib/caregiver/storage";
import { mockUser } from "@/lib/caregiver/mock-data";

const KEYPAD_ROWS = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["", "0", "backspace"],
];

export default function PinPage() {
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [activeField, setActiveField] = useState<"new" | "confirm">("new");
  const router = useRouter();

  function handleKey(key: string) {
    if (activeField === "new") {
      if (key === "backspace") setNewPin((p) => p.slice(0, -1));
      else if (newPin.length < 6 && /^\d$/.test(key)) {
        const next = newPin + key;
        setNewPin(next);
        if (next.length === 6) setActiveField("confirm");
      }
    } else {
      if (key === "backspace") setConfirmPin((p) => p.slice(0, -1));
      else if (confirmPin.length < 6 && /^\d$/.test(key)) {
        setConfirmPin((p) => p + key);
      }
    }
  }

  function handleSetPin() {
    if (newPin.length !== 6 || confirmPin.length !== 6 || newPin !== confirmPin) return;
    cgSet("pin", "true");
    cgSet("userName", mockUser.name);
    cgSet("userRole", mockUser.role);
    router.replace("/caregiver/home");
  }

  const canSubmit = newPin.length === 6 && confirmPin.length === 6 && newPin === confirmPin;

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-black/40 p-6">
      <div className="w-full rounded-2xl bg-white p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-cg-brand">Setup Login PIN</h2>
          <button onClick={() => router.back()}>
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <div onClick={() => setActiveField("new")}>
            <PinInput value={newPin} onChange={setNewPin} label="New PIN" />
          </div>
          <div onClick={() => setActiveField("confirm")}>
            <PinInput value={confirmPin} onChange={setConfirmPin} label="Confirm PIN" />
          </div>
        </div>

        {/* Keypad */}
        <div className="mt-6 grid grid-cols-3 gap-2">
          {KEYPAD_ROWS.flat().map((k, i) => (
            <button
              key={i}
              onClick={() => k && handleKey(k)}
              disabled={!k}
              className={`flex h-12 items-center justify-center rounded-xl text-base font-medium ${
                k ? "bg-gray-100 text-cg-brand active:bg-gray-200" : "bg-transparent"
              }`}
            >
              {k === "backspace" ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 9L15 15M15 9L9 15M3 12L7 5H21V19H7L3 12Z" stroke="#3B2513" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : k}
            </button>
          ))}
        </div>

        <button
          onClick={handleSetPin}
          disabled={!canSubmit}
          className="mt-6 w-full rounded-xl bg-cg-accent-muted py-3.5 text-base font-semibold text-cg-brand disabled:opacity-40"
        >
          Set PIN
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify**

Navigate to `/caregiver/auth/pin`. Check:
- 6-box "New PIN" and "Confirm PIN" inputs visible
- Entering 6 digits in New PIN auto-focuses Confirm PIN
- "Set PIN" disabled until both match; on success → `/caregiver/home`
- `localStorage` has `cg_pin_configured=true` after completion

- [ ] **Step 4: Commit**

```bash
git add components/caregiver/pin-input.tsx app/\(caregiver\)/caregiver/auth/pin/page.tsx
git commit -m "feat(caregiver): add PIN input component and setup PIN screen"
```

---

## Task 7: Home Screen

**Files:**
- Create: `components/caregiver/stat-card.tsx`
- Create: `components/caregiver/quick-action-card.tsx`
- Create: `app/(caregiver)/caregiver/home/page.tsx`

**Interfaces:**
- Consumes: `BottomNav`, `mockUser`, `mockChildren`, `mockClassrooms`, `useLogSheet`
- Produces:
  - `<StatCard icon={LucideIcon} label={string} value={string|number} bgColor={string} />` 
  - `<QuickActionCard icon={LucideIcon} label={string} onClick={() => void} />`
  - `/caregiver/home` — dashboard page with header, 2 stat cards, 3 quick action tiles, bottom nav

- [ ] **Step 1: Create `components/caregiver/stat-card.tsx`**

```typescript
import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  label: string;
  value: string | number;
  bgColor: string;
};

export function StatCard({ icon: Icon, label, value, bgColor }: Props) {
  return (
    <div
      className="flex flex-1 flex-col gap-2 rounded-2xl p-4"
      style={{ backgroundColor: bgColor }}
    >
      <Icon size={22} className="text-gray-600" />
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-cg-brand">{value}</p>
    </div>
  );
}
```

- [ ] **Step 2: Create `components/caregiver/quick-action-card.tsx`**

```typescript
import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
};

export function QuickActionCard({ icon: Icon, label, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl bg-cg-quick-action py-5 active:brightness-95"
    >
      <Icon size={24} className="text-cg-brand" />
      <span className="text-xs font-medium text-cg-brand">{label}</span>
    </button>
  );
}
```

- [ ] **Step 3: Create `app/(caregiver)/caregiver/home/page.tsx`**

```typescript
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Monitor, Users, ClipboardList, FileText, MessageSquare, Bell } from "lucide-react";
import { BottomNav } from "@/components/caregiver/bottom-nav";
import { StatCard } from "@/components/caregiver/stat-card";
import { QuickActionCard } from "@/components/caregiver/quick-action-card";
import { useLogSheet } from "@/components/caregiver/log-sheet-context";
import { LogSheet } from "@/components/caregiver/log-sheet";
import { mockUser, mockClassrooms, mockChildren } from "@/lib/caregiver/mock-data";

export default function HomePage() {
  const { mode, openActivity, openReport, close } = useLogSheet();
  const router = useRouter();

  return (
    <div className="flex flex-1 flex-col bg-cg-bg">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pt-2 pb-4">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cg-brand text-xs font-bold text-white">
              {mockUser.avatarInitials}
            </div>
            <div>
              <p className="text-[10px] text-gray-400">Welcome Back,</p>
              <p className="text-xs font-semibold text-cg-brand">{mockUser.name}</p>
            </div>
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
            <Bell size={18} className="text-gray-500" />
          </button>
        </div>

        {/* Stat cards */}
        <Link href="/caregiver/children">
          <div className="mb-5 flex gap-3">
            <StatCard
              icon={Monitor}
              label="Total Classroom(s)"
              value={mockClassrooms.length}
              bgColor="var(--color-cg-stat-pink)"
            />
            <StatCard
              icon={Users}
              label="Total Children"
              value={mockChildren.length}
              bgColor="var(--color-cg-stat-teal)"
            />
          </div>
        </Link>

        {/* Quick Actions */}
        <p className="mb-3 text-sm font-semibold text-gray-600">Quick Actions</p>
        <div className="flex gap-3">
          <QuickActionCard icon={ClipboardList} label="Log Activity" onClick={openActivity} />
          <QuickActionCard icon={FileText} label="Log Daily Report" onClick={openReport} />
          <QuickActionCard
            icon={MessageSquare}
            label="Chat"
            onClick={() => router.push("/caregiver/chat")}
          />
        </div>
      </div>

      {/* Log sheet overlay */}
      <LogSheet />

      <BottomNav />
    </div>
  );
}
```

- [ ] **Step 4: Verify**

Navigate to `/caregiver/home`. Check:
- "Welcome Back, Ms Anu" header chip, bell icon
- Two stat cards: "Total Classroom(s): 2" and "Total Children: 5"
- Three quick action tiles: Log Activity, Log Daily Report, Chat
- Tapping stat cards navigates to `/caregiver/children`
- Bottom nav shows Home tab as active
- Log Activity and Log Daily Report tiles will open the sheet (stubbed for now)

- [ ] **Step 5: Commit**

```bash
git add components/caregiver/stat-card.tsx components/caregiver/quick-action-card.tsx app/\(caregiver\)/caregiver/home/page.tsx
git commit -m "feat(caregiver): add stat card, quick action card, and home screen"
```

---

## Task 8: Children Screen

**Files:**
- Create: `components/caregiver/child-card.tsx`
- Create: `app/(caregiver)/caregiver/children/page.tsx`

**Interfaces:**
- Consumes: `Child`, `mockChildren`, `mockClassrooms` from mock-data
- Produces:
  - `<ChildCard child={Child} />` — expandable accordion row
  - `/caregiver/children` — children list with classroom filter dropdown

- [ ] **Step 1: Create `components/caregiver/child-card.tsx`**

```typescript
"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, AlertCircle, MessageSquare } from "lucide-react";
import type { Child } from "@/lib/caregiver/mock-data";

type Props = { child: Child };

export function ChildCard({ child }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-4 py-3.5"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">🐻</span>
          <span className="text-sm font-semibold text-cg-brand">{child.name}</span>
        </div>
        {expanded ? (
          <ChevronUp size={18} className="text-gray-400" />
        ) : (
          <ChevronDown size={18} className="text-gray-400" />
        )}
      </button>

      {expanded && (
        <div className="border-t border-gray-100 px-4 pb-4">
          {/* Age + Room chips */}
          <div className="mt-3 flex gap-3">
            <div className="flex-1 rounded-xl bg-gray-50 p-3">
              <p className="text-[10px] text-gray-400">Age</p>
              <p className="text-sm font-bold text-cg-brand">{child.age}</p>
            </div>
            <div className="flex-1 rounded-xl bg-cg-quick-action p-3">
              <p className="text-[10px] text-gray-400">Room</p>
              <p className="text-sm font-bold text-cg-brand">{child.room}</p>
            </div>
          </div>

          {/* Alerts */}
          {child.alerts.length > 0 && (
            <div className="mt-3">
              <p className="mb-2 text-xs font-semibold text-gray-500">Alerts &amp; Needs</p>
              {child.alerts.map((alert, i) => (
                <div key={i} className="flex items-start gap-2 rounded-xl bg-blue-50 p-3">
                  <AlertCircle size={14} className="mt-0.5 shrink-0 text-blue-500" />
                  <div>
                    <p className="text-xs font-semibold text-blue-700">{alert.label}</p>
                    <p className="text-xs text-blue-600">{alert.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Parent contact */}
          <div className="mt-3">
            <p className="mb-1 text-xs text-gray-400">Parent Contact</p>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-cg-brand">{child.parentContact.name}</p>
              <Link href={`/caregiver/chat/${child.parentContact.id}`}>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cg-quick-action">
                  <MessageSquare size={16} className="text-cg-brand" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create `app/(caregiver)/caregiver/children/page.tsx`**

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { ChildCard } from "@/components/caregiver/child-card";
import { mockChildren, mockClassrooms } from "@/lib/caregiver/mock-data";

export default function ChildrenPage() {
  const [selectedClassroom, setSelectedClassroom] = useState("all");
  const router = useRouter();

  const filtered = selectedClassroom === "all"
    ? mockChildren
    : mockChildren.filter((c) => c.room === selectedClassroom);

  return (
    <div className="flex flex-1 flex-col bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <button onClick={() => router.back()}>
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200">
            <ArrowLeft size={16} className="text-gray-600" />
          </div>
        </button>
        <h1 className="text-lg font-bold text-cg-brand" style={{ fontFamily: "var(--font-merriweather)" }}>
          Children
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6">
        {/* Classroom filter */}
        <div className="mb-4 flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-base">🐻</span>
            <span className="text-sm font-medium text-cg-brand">
              {selectedClassroom === "all" ? "Total Classroom(s)" : selectedClassroom}
            </span>
          </div>
          <ChevronDown size={18} className="text-gray-400" />
        </div>

        {/* Children list */}
        <div className="flex flex-col gap-3">
          {filtered.map((child) => (
            <ChildCard key={child.id} child={child} />
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify**

Navigate to `/caregiver/children` (or tap the stat cards on Home). Check:
- 5 children listed (collapsed by default)
- Tapping a child expands to show Age, Room, Alerts, Parent Contact
- Tapping the chat icon on a child navigates to `/caregiver/chat/[contactId]`

- [ ] **Step 4: Commit**

```bash
git add components/caregiver/child-card.tsx app/\(caregiver\)/caregiver/children/page.tsx
git commit -m "feat(caregiver): add child card component and children list screen"
```

---

## Task 9: Tasks Screen

**Files:**
- Create: `components/caregiver/task-card.tsx`
- Create: `app/(caregiver)/caregiver/tasks/page.tsx`

**Interfaces:**
- Consumes: `Task`, `mockTasks` from mock-data; `BottomNav`
- Produces:
  - `<TaskCard task={Task} />` — single task row with status badge
  - `/caregiver/tasks` — tasks screen with Pending/Completed tab switcher

- [ ] **Step 1: Create `components/caregiver/task-card.tsx`**

```typescript
import type { Task } from "@/lib/caregiver/mock-data";
import { Clock, Bell } from "lucide-react";

type Props = { task: Task };

export function TaskCard({ task }: Props) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-gray-100 py-4 last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-cg-brand">{task.title}</p>
        <p className="mt-0.5 line-clamp-2 text-xs text-gray-500">{task.description}</p>
        <div className="mt-1.5 flex items-center gap-4">
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <Clock size={11} />
            {task.dueTime}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <Bell size={11} />
            {task.reminderTime}
          </span>
        </div>
      </div>
      <span
        className={`mt-0.5 shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
          task.status === "completed"
            ? "bg-green-100 text-green-700"
            : "bg-cg-pending-badge text-gray-500"
        }`}
      >
        {task.status === "completed" ? "Completed" : "Pending"}
      </span>
    </div>
  );
}
```

- [ ] **Step 2: Create `app/(caregiver)/caregiver/tasks/page.tsx`**

```typescript
"use client";

import { useState } from "react";
import { Bell, CalendarDays } from "lucide-react";
import { BottomNav } from "@/components/caregiver/bottom-nav";
import { TaskCard } from "@/components/caregiver/task-card";
import { LogSheet } from "@/components/caregiver/log-sheet";
import { mockTasks, mockUser } from "@/lib/caregiver/mock-data";

type Tab = "pending" | "completed";

export default function TasksPage() {
  const [tab, setTab] = useState<Tab>("pending");

  const pending = mockTasks.filter((t) => t.status === "pending");
  const completed = mockTasks.filter((t) => t.status === "completed");
  const displayed = tab === "pending" ? pending : completed;

  return (
    <div className="flex flex-1 flex-col bg-cg-bg">
      <div className="flex-1 overflow-y-auto px-4 pt-2 pb-4">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cg-brand text-xs font-bold text-white">
              {mockUser.avatarInitials}
            </div>
            <div>
              <p className="text-[10px] text-gray-400">Welcome Back,</p>
              <p className="text-xs font-semibold text-cg-brand">{mockUser.name}</p>
            </div>
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
            <Bell size={18} className="text-gray-500" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="mb-4 flex rounded-full bg-gray-100 p-0.5">
          <button
            onClick={() => setTab("pending")}
            className={`flex-1 rounded-full py-2.5 text-xs font-semibold transition-colors ${
              tab === "pending" ? "bg-cg-brand text-white" : "text-gray-500"
            }`}
          >
            Pending Tasks ({pending.length})
          </button>
          <button
            onClick={() => setTab("completed")}
            className={`flex-1 rounded-full py-2.5 text-xs font-semibold transition-colors ${
              tab === "completed" ? "bg-cg-brand text-white" : "text-gray-500"
            }`}
          >
            Completed Tasks ({completed.length})
          </button>
        </div>

        {/* Filter */}
        <div className="mb-2 flex justify-end">
          <button className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
            <CalendarDays size={14} />
            Filter by date
          </button>
        </div>

        {/* Task list */}
        <div className="rounded-2xl bg-white px-4">
          {displayed.length > 0 ? (
            displayed.map((task) => <TaskCard key={task.id} task={task} />)
          ) : (
            <p className="py-8 text-center text-sm text-gray-400">No tasks here.</p>
          )}
        </div>
      </div>

      <LogSheet />
      <BottomNav />
    </div>
  );
}
```

- [ ] **Step 3: Verify**

Navigate to `/caregiver/tasks` (or tap Tasks in bottom nav). Check:
- "Pending Tasks (3)" tab active, shows 3 task cards each with title, description, times, "Pending" badge
- Tapping "Completed Tasks (1)" switches to show 1 task with "Completed" badge

- [ ] **Step 4: Commit**

```bash
git add components/caregiver/task-card.tsx app/\(caregiver\)/caregiver/tasks/page.tsx
git commit -m "feat(caregiver): add task card and tasks screen with pending/completed tabs"
```

---

## Task 10: Log Sheet (Report Screen)

**Files:**
- Create: `components/caregiver/log-activity-form.tsx`
- Create: `components/caregiver/daily-report-card.tsx`
- Create: `components/caregiver/log-sheet.tsx`
- Create: `app/(caregiver)/caregiver/report/page.tsx`

**Interfaces:**
- Consumes: `useLogSheet()`, `mockDailyReport`
- Produces:
  - `<LogActivityForm />` — activity tag + description + media upload
  - `<DailyReportCard report={DailyReport} />` — full daily report view
  - `<LogSheet />` — overlay bottom sheet orchestrator; rendered inside each main page
  - `/caregiver/report` — redirect to open log sheet over home

- [ ] **Step 1: Create `components/caregiver/log-activity-form.tsx`**

```typescript
"use client";

import { useState } from "react";
import { ChevronDown, Upload } from "lucide-react";
import { useLogSheet } from "./log-sheet-context";

const ACTIVITY_TAGS = ["Medication", "Meal", "Nap", "Play", "Incident", "Other"];

export function LogActivityForm() {
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const { close } = useLogSheet();

  return (
    <div className="flex flex-col gap-4">
      {/* Activity Tag */}
      <div>
        <p className="mb-1.5 text-sm font-medium text-gray-700">
          Activity Tag <span className="text-red-500">*</span>
        </p>
        <div className="relative">
          <button
            onClick={() => setShowTagDropdown(!showTagDropdown)}
            className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-400"
          >
            <span className={tag ? "text-cg-brand" : ""}>{tag || "Select activity tag"}</span>
            <ChevronDown size={16} className="text-gray-400" />
          </button>
          {showTagDropdown && (
            <div className="absolute z-10 mt-1 w-full rounded-xl border border-gray-100 bg-white shadow-lg">
              {ACTIVITY_TAGS.map((t) => (
                <button
                  key={t}
                  onClick={() => { setTag(t); setShowTagDropdown(false); }}
                  className="w-full px-4 py-3 text-left text-sm text-cg-brand hover:bg-gray-50"
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <p className="mb-1.5 text-sm font-medium text-gray-700">
          Description <span className="text-red-500">*</span>
        </p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add details about the activity..."
          rows={4}
          className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-cg-brand placeholder:text-gray-300 focus:border-cg-accent focus:outline-none"
        />
      </div>

      {/* Media upload */}
      <div className="flex flex-col items-center gap-2 rounded-xl border-2 border-dashed border-gray-200 bg-white py-6">
        <Upload size={22} className="text-gray-400" />
        <p className="text-xs text-gray-500">
          <span className="font-semibold text-cg-brand">Tap to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-400">PNG, JPG or MP4 (max. 10mb)</p>
      </div>

      {/* Submit */}
      <button
        onClick={close}
        className="w-full rounded-xl bg-cg-accent-muted py-3.5 text-sm font-semibold text-cg-brand"
      >
        Log Activity
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Create `components/caregiver/daily-report-card.tsx`**

```typescript
import type { DailyReport } from "@/lib/caregiver/mock-data";
import { CalendarDays, Heart, UtensilsCrossed, Moon, Droplets, AlertTriangle, Pill } from "lucide-react";

type Props = { report: DailyReport };

type RowProps = {
  icon: React.ReactNode;
  label: string;
  color: string;
  children: React.ReactNode;
};

function ReportRow({ icon, label, color, children }: RowProps) {
  return (
    <div className="flex items-start gap-3 rounded-xl p-3" style={{ backgroundColor: color }}>
      <div className="mt-0.5 shrink-0">{icon}</div>
      <div>
        <p className="text-xs font-medium text-gray-500">{label}</p>
        <div className="mt-0.5 text-sm font-semibold text-cg-brand">{children}</div>
      </div>
    </div>
  );
}

export function DailyReportCard({ report }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {/* Date header */}
      <div className="flex items-center gap-2 rounded-xl bg-cg-brand px-4 py-3">
        <CalendarDays size={16} className="text-white" />
        <p className="text-sm font-semibold text-white">{report.date}</p>
      </div>

      <ReportRow icon={<Heart size={16} className="text-pink-400" />} label="Mood" color="#FFF0F8">
        <span>{report.mood.join("  ")}</span>
      </ReportRow>

      <ReportRow icon={<UtensilsCrossed size={16} className="text-amber-500" />} label="Meals" color="#FFF8EC">
        <span>{report.meals}</span>
      </ReportRow>

      <ReportRow icon={<Moon size={16} className="text-indigo-400" />} label="Nap Time" color="#F3F0FF">
        <div className="flex flex-col gap-1">
          {report.naps.map((nap, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <span>{nap.start} – {nap.end}</span>
              <span className="text-gray-400">≈</span>
              <span>{nap.duration}</span>
            </div>
          ))}
        </div>
      </ReportRow>

      <ReportRow icon={<Droplets size={16} className="text-teal-400" />} label="Hygiene" color="#EDFAF8">
        <span>{report.hygiene}</span>
      </ReportRow>

      <ReportRow icon={<AlertTriangle size={16} className="text-orange-400" />} label="Health &amp; Safety" color="#FFF6EC">
        <span>{report.healthSafety}</span>
      </ReportRow>

      <ReportRow icon={<Pill size={16} className="text-purple-400" />} label="Medications" color="#F8F0FF">
        <span>{report.medications}</span>
      </ReportRow>

      {/* Photos */}
      {report.photos.map((photo, i) => (
        <div key={i} className="overflow-hidden rounded-xl">
          <div className="relative h-44 w-full bg-gray-200">
            <div className="absolute left-2 top-2 rounded-md bg-cg-brand px-2 py-0.5 text-xs font-semibold text-white">
              {photo.label}
            </div>
            {/* Placeholder image area */}
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
              📸 Playtime photo
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500">{photo.caption}</p>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Create `components/caregiver/log-sheet.tsx`**

```typescript
"use client";

import { X, ClipboardList, FileText } from "lucide-react";
import { useLogSheet } from "./log-sheet-context";
import { LogActivityForm } from "./log-activity-form";
import { DailyReportCard } from "./daily-report-card";
import { mockDailyReport } from "@/lib/caregiver/mock-data";

export function LogSheet() {
  const { mode, close, openActivity, openReport } = useLogSheet();

  if (mode === "idle") return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="absolute inset-0 z-40 bg-black/40"
        onClick={close}
      />
      {/* Sheet */}
      <div className="absolute inset-x-0 bottom-0 z-50 max-h-[90%] overflow-y-auto rounded-t-3xl bg-white">
        <div className="sticky top-0 z-10 flex items-center justify-between bg-gray-50 px-5 py-4">
          <h3 className="text-base font-bold text-cg-brand">
            {mode === "chooser" ? "Log" : mode === "activity" ? "Log Activity" : "Daily Report"}
          </h3>
          <button onClick={close}>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200">
              <X size={14} className="text-gray-600" />
            </div>
          </button>
        </div>

        <div className="px-5 pb-8 pt-2">
          {mode === "chooser" && (
            <div className="flex flex-col gap-1">
              <button
                onClick={openActivity}
                className="flex items-center justify-between rounded-xl px-2 py-4 text-sm font-medium text-cg-brand hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cg-quick-action">
                    <ClipboardList size={18} className="text-cg-accent" />
                  </div>
                  Log Activity
                </div>
                <span className="text-gray-300">›</span>
              </button>
              <button
                onClick={openReport}
                className="flex items-center justify-between rounded-xl px-2 py-4 text-sm font-medium text-cg-brand hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cg-quick-action">
                    <FileText size={18} className="text-cg-accent" />
                  </div>
                  Log Daily Report
                </div>
                <span className="text-gray-300">›</span>
              </button>
            </div>
          )}

          {mode === "activity" && <LogActivityForm />}

          {mode === "report" && <DailyReportCard report={mockDailyReport} />}
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 4: Create `app/(caregiver)/caregiver/report/page.tsx`**

```typescript
"use client";

import { useEffect } from "react";
import { useLogSheet } from "@/components/caregiver/log-sheet-context";

export default function ReportPage() {
  const { openLog } = useLogSheet();

  useEffect(() => {
    openLog();
  }, [openLog]);

  return null;
}
```

- [ ] **Step 5: Verify**

Tap "Report" in the bottom nav. The Log chooser sheet slides up. Check:
- "Log Activity ›" row and "Log Daily Report ›" row visible
- Tapping "Log Activity" shows the activity form (tag dropdown, description textarea, upload area)
- Tapping "Log Daily Report" shows the report viewer (date header, mood, meals, nap, hygiene, health, medications, photo placeholder)
- Tapping the backdrop or × dismisses the sheet

- [ ] **Step 6: Commit**

```bash
git add components/caregiver/log-activity-form.tsx components/caregiver/daily-report-card.tsx components/caregiver/log-sheet.tsx app/\(caregiver\)/caregiver/report/page.tsx
git commit -m "feat(caregiver): add log sheet, log activity form, daily report card, and report screen"
```

---

## Task 11: Chat List Screen

**Files:**
- Create: `components/caregiver/chat-list-item.tsx`
- Create: `app/(caregiver)/caregiver/chat/page.tsx`

**Interfaces:**
- Consumes: `ChatThread`, `mockChatThreads`; `BottomNav`
- Produces:
  - `<ChatListItem thread={ChatThread} />` — conversation preview row
  - `/caregiver/chat` — chat list with search and date groups

- [ ] **Step 1: Create `components/caregiver/chat-list-item.tsx`**

```typescript
import Link from "next/link";
import type { ChatThread } from "@/lib/caregiver/mock-data";

type Props = { thread: ChatThread };

export function ChatListItem({ thread }: Props) {
  return (
    <Link href={`/caregiver/chat/${thread.id}`}>
      <div className="flex items-center gap-3 px-4 py-3 active:bg-gray-50">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-300 text-sm font-bold text-white">
          {thread.contact.avatarInitials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-cg-brand">{thread.contact.name}</p>
          <p className="truncate text-xs text-gray-400">{thread.lastMessage}</p>
        </div>
        <span className="shrink-0 text-xs text-gray-400">{thread.lastMessageTime}</span>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Create `app/(caregiver)/caregiver/chat/page.tsx`**

```typescript
"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { BottomNav } from "@/components/caregiver/bottom-nav";
import { ChatListItem } from "@/components/caregiver/chat-list-item";
import { LogSheet } from "@/components/caregiver/log-sheet";
import { mockChatThreads } from "@/lib/caregiver/mock-data";

export default function ChatPage() {
  const [query, setQuery] = useState("");

  const filtered = query
    ? mockChatThreads.filter((t) =>
        t.contact.name.toLowerCase().includes(query.toLowerCase())
      )
    : mockChatThreads;

  // Group by dateGroup
  const groups = filtered.reduce<Record<string, typeof mockChatThreads>>(
    (acc, thread) => {
      const g = thread.dateGroup;
      if (!acc[g]) acc[g] = [];
      acc[g].push(thread);
      return acc;
    },
    {}
  );

  return (
    <div className="flex flex-1 flex-col bg-cg-bg">
      <div className="flex-1 overflow-y-auto pb-4">
        {/* Search bar */}
        <div className="px-4 pt-3 pb-2">
          <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 shadow-sm">
            <Search size={16} className="text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="flex-1 bg-transparent text-sm text-cg-brand placeholder:text-gray-300 focus:outline-none"
            />
          </div>
        </div>

        {/* Grouped threads */}
        {Object.entries(groups).map(([dateGroup, threads]) => (
          <div key={dateGroup}>
            <p className="px-4 py-2 text-xs font-medium text-gray-400">{dateGroup}</p>
            <div className="bg-white">
              {threads.map((thread) => (
                <ChatListItem key={thread.id} thread={thread} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <LogSheet />
      <BottomNav />
    </div>
  );
}
```

- [ ] **Step 3: Verify**

Tap Chat in the bottom nav. Check:
- Search bar at top
- Two date groups: "October 05, 2024" (4 threads) and "October 12, 2024" (1 thread)
- Each row shows avatar initials, name, message preview, time
- Tapping a row navigates to `/caregiver/chat/[id]`
- Typing in search filters threads by name

- [ ] **Step 4: Commit**

```bash
git add components/caregiver/chat-list-item.tsx app/\(caregiver\)/caregiver/chat/page.tsx
git commit -m "feat(caregiver): add chat list item component and chat list screen"
```

---

## Task 12: Active Chat Screen

**Files:**
- Create: `components/caregiver/message-bubble.tsx`
- Create: `app/(caregiver)/caregiver/chat/[id]/page.tsx`

**Interfaces:**
- Consumes: `ChatThread`, `Message`, `mockChatThreads`; Next.js 16 `params` is a `Promise`
- Produces:
  - `<MessageBubble message={Message} />` — sent (blue/right) or received (white/left) bubble
  - `/caregiver/chat/[id]` — individual chat thread

- [ ] **Step 1: Create `components/caregiver/message-bubble.tsx`**

```typescript
import type { Message } from "@/lib/caregiver/mock-data";

type Props = { message: Message };

export function MessageBubble({ message }: Props) {
  const isSent = message.direction === "sent";

  return (
    <div className={`flex ${isSent ? "justify-end" : "justify-start"} mb-3`}>
      <div className={`max-w-[75%] ${isSent ? "items-end" : "items-start"} flex flex-col gap-1`}>
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
            isSent
              ? "rounded-tr-sm bg-cg-sent-bubble text-white"
              : "rounded-tl-sm bg-white text-cg-brand shadow-sm"
          }`}
        >
          {message.body}
        </div>
        <div className={`flex items-center gap-1 ${isSent ? "flex-row-reverse" : ""}`}>
          <span className="text-[10px] text-gray-400">{message.sentAt}</span>
          {isSent && (
            <span className="text-[10px] text-blue-400">✓✓</span>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `app/(caregiver)/caregiver/chat/[id]/page.tsx`**

```typescript
"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Video, Paperclip, SendHorizontal } from "lucide-react";
import { MessageBubble } from "@/components/caregiver/message-bubble";
import { mockChatThreads } from "@/lib/caregiver/mock-data";
import type { Message } from "@/lib/caregiver/mock-data";

export default function ActiveChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [input, setInput] = useState("");

  const thread = mockChatThreads.find((t) => t.id === id) ?? mockChatThreads[0];
  const [messages, setMessages] = useState<Message[]>(thread.messages);

  function handleSend() {
    const body = input.trim();
    if (!body) return;
    const msg: Message = {
      id: `m${Date.now()}`,
      body,
      sentAt: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      direction: "sent",
    };
    setMessages((prev) => [...prev, msg]);
    setInput("");
  }

  return (
    <div className="flex flex-1 flex-col bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()}>
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-300 text-xs font-bold text-white">
            {thread.contact.avatarInitials}
          </div>
          <p className="text-sm font-semibold text-cg-brand">{thread.contact.name}</p>
        </div>
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
          <Video size={18} className="text-gray-500" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Session start */}
        <div className="mb-4 flex justify-center">
          <span className="rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-500">
            Session Start
          </span>
        </div>

        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </div>

      {/* Input bar */}
      <div className="border-t border-gray-100 bg-white px-3 py-3">
        <div className="flex items-center gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400">
            <Paperclip size={20} />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message…"
            className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-cg-brand placeholder:text-gray-300 focus:border-cg-accent focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-cg-brand"
          >
            <SendHorizontal size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify**

Navigate to a chat thread (tap any thread in the chat list). Check:
- Header shows avatar initials, contact name, video icon
- "Session Start" label and existing messages rendered correctly
- Sent messages appear right-aligned with blue bubble
- Received messages appear left-aligned with white bubble
- Typing in the input and pressing Enter (or tapping Send) adds a new sent message
- Back arrow returns to the chat list

- [ ] **Step 4: Commit**

```bash
git add components/caregiver/message-bubble.tsx app/\(caregiver\)/caregiver/chat/\[id\]/page.tsx
git commit -m "feat(caregiver): add message bubble component and active chat screen"
```

---

## Task 13: Settings Screen (Shell)

**Files:**
- Create: `app/(caregiver)/caregiver/settings/page.tsx`

**Interfaces:**
- Consumes: `mockUser`, `cgClearAll` from storage, `BottomNav`
- Produces: `/caregiver/settings` — settings shell with profile section and list rows

- [ ] **Step 1: Create `app/(caregiver)/caregiver/settings/page.tsx`**

```typescript
"use client";

import { useRouter } from "next/navigation";
import { User, Bell, Lock, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { BottomNav } from "@/components/caregiver/bottom-nav";
import { LogSheet } from "@/components/caregiver/log-sheet";
import { cgClearAll } from "@/lib/caregiver/storage";
import { mockUser } from "@/lib/caregiver/mock-data";

const SETTINGS_ROWS = [
  { icon: User, label: "Edit Profile" },
  { icon: Bell, label: "Notifications" },
  { icon: Lock, label: "Change PIN" },
  { icon: HelpCircle, label: "Help & Support" },
] as const;

export default function SettingsPage() {
  const router = useRouter();

  function handleLogOut() {
    cgClearAll();
    router.replace("/caregiver/auth");
  }

  return (
    <div className="flex flex-1 flex-col bg-cg-bg">
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-4">
        <h1
          className="mb-6 text-xl font-bold text-cg-brand"
          style={{ fontFamily: "var(--font-merriweather)" }}
        >
          Settings
        </h1>

        {/* Profile section */}
        <div className="mb-6 flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cg-brand text-lg font-bold text-white">
            {mockUser.avatarInitials}
          </div>
          <div>
            <p className="font-bold text-cg-brand">{mockUser.name}</p>
            <span className="inline-block rounded-full bg-cg-quick-action px-2 py-0.5 text-xs font-medium capitalize text-cg-accent">
              {mockUser.role}
            </span>
          </div>
        </div>

        {/* Settings rows */}
        <div className="rounded-2xl bg-white shadow-sm">
          {SETTINGS_ROWS.map(({ icon: Icon, label }, i) => (
            <button
              key={label}
              className={`flex w-full items-center justify-between px-4 py-4 text-sm font-medium text-cg-brand ${
                i < SETTINGS_ROWS.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} className="text-gray-400" />
                {label}
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </button>
          ))}
        </div>

        {/* Log Out */}
        <button
          onClick={handleLogOut}
          className="mt-4 flex w-full items-center gap-3 rounded-2xl bg-white px-4 py-4 text-sm font-medium text-red-500 shadow-sm"
        >
          <LogOut size={18} />
          Log Out
        </button>
      </div>

      <LogSheet />
      <BottomNav />
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Navigate to `/caregiver/settings` (tap Settings in bottom nav). Check:
- Profile card shows "MA" avatar, "Ms Anu", "caregiver" badge
- 4 settings rows with icons and chevrons
- "Log Out" in red; tapping it clears localStorage and redirects to `/caregiver/auth`

- [ ] **Step 3: Commit**

```bash
git add app/\(caregiver\)/caregiver/settings/page.tsx
git commit -m "feat(caregiver): add settings screen shell with profile and log-out"
```

---

## Task 14: Full-Flow Verification + Polish

**Files:**
- Modify: `app/(caregiver)/caregiver/home/page.tsx` (add `LogSheet` import if missed)
- Modify: `app/(caregiver)/caregiver/tasks/page.tsx` (verify `LogSheet` included)

**Goal:** Walk the full user journey end-to-end and fix any regressions or visual gaps.

- [ ] **Step 1: Full journey smoke test**

Open `http://localhost:3000/caregiver` and walk through:
1. Splash screen displays for 1.5 s, then auto-advances to Onboarding
2. Swipe through all 3 onboarding slides; tap "Get Started"
3. Sign In screen: enter any 6-digit OTP, tap Login
4. Setup PIN: enter matching 6-digit PIN, tap Set PIN
5. Home: see 2 stat cards and 3 quick action tiles
6. Tap "Log Activity" → sheet opens → form renders
7. Tap backdrop → closes; tap "Log Daily Report" → report renders
8. Tap stat cards → Children screen with 5 cards; expand one
9. Tap Tasks in bottom nav → 3 pending tasks
10. Tap Chat → 5 threads grouped by date; tap thread → chat opens; send a message
11. Tap Settings → profile visible; tap Log Out → back to auth
12. Revisit `/caregiver` — since `onboarding` is in localStorage, should skip to auth

- [ ] **Step 2: Fix any layout issues**

Common issues to check:
- BottomNav is cut off: ensure `MobileShell` does not have `overflow-hidden` on the inner content div without `pb-safe`. If bottom nav is clipped, add `pb-4` to BottomNav or `pb-[env(safe-area-inset-bottom)]`.
- LogSheet backdrop doesn't cover BottomNav: the `absolute inset-0 z-40` backdrop is relative to `MobileShell`'s inner container — ensure `MobileShell`'s inner `div` has `position: relative` (it does via Tailwind `relative` class which should be on the outer container).
- Onboarding doesn't fill height: the `flex-1` on the onboarding page requires the `MobileShell` content div to be `flex flex-col` — which it is. If the photo bg doesn't fill, add `min-h-0` to the content wrapper.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat(caregiver): complete caregiver mobile app — all screens wired and verified"
```
