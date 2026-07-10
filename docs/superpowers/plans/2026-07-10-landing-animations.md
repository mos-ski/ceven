# Landing Page Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add soft scroll-reveal, hover, mouse-parallax, and stagger animations across all 4 landing pages using Framer Motion.

**Architecture:** Install `framer-motion`, create shared client-side animation primitives in `components/animations/`, then wrap existing section content with those primitives. No existing component logic changes — only wrapping and class additions.

**Tech Stack:** Next.js 16 App Router, React 19, Framer Motion, Tailwind CSS 4

## Global Constraints

- All animation primitives must be `"use client"` (Framer Motion requires browser context)
- Parent server components stay as-is — they just render client animation wrappers
- Animations must respect `prefers-reduced-motion` (Framer Motion handles this automatically via `useReducedMotion`)
- `whileInView` must use `{ once: true }` — elements only animate in once, never re-trigger on scroll-up
- No new deps beyond `framer-motion`
- Keep bundle impact minimal: import only what you use (`motion`, `useInView`, `useMotionValue`, `useSpring`, `useTransform`)

---

## File Map

**Create:**
- `components/animations/fade-up.tsx` — `<FadeUp>` wrapper: fade + slide-up on scroll
- `components/animations/stagger.tsx` — `<Stagger>` + `<StaggerItem>` for sequenced children
- `components/animations/mouse-parallax.tsx` — `<MouseParallax>` for hero phone drift
- `components/animations/count-up.tsx` — `<CountUp>` for About stats numbers

**Modify (wrap content, no logic changes):**
- `components/landing/hero-section.tsx`
- `components/landing/pain-points-section.tsx`
- `components/landing/features-section.tsx`
- `components/landing/how-it-works-section.tsx`
- `components/landing/ambitions-section.tsx`
- `components/landing/testimonials-section.tsx`
- `components/landing/cta-banner.tsx`
- `components/landing/parents-hero-section.tsx`
- `components/landing/parents-gap-section.tsx`
- `components/landing/parents-comparison-section.tsx`
- `components/landing/parents-photo-cta-section.tsx`
- `components/landing/parents-faq-section.tsx`
- `components/landing/creches-hero-section.tsx`
- `components/landing/creches-platform-section.tsx`
- `components/landing/creches-transparency-section.tsx`
- `components/landing/creches-timeline-section.tsx`
- `components/landing/creches-getting-started-section.tsx`
- `components/landing/creches-cta-section.tsx`
- `components/landing/creches-testimonials-section.tsx`
- `components/landing/about-hero-section.tsx`
- `components/landing/about-stats-section.tsx`
- `components/landing/about-origin-section.tsx`
- `components/landing/about-swayosoo-section.tsx`
- `components/landing/about-mission-section.tsx`
- `components/landing/contact-hero-section.tsx`
- `components/landing/contact-form-section.tsx`
- `components/landing/nav.tsx`
- `components/landing/footer.tsx`
- `components/landing/cta-banner.tsx`

---

## Task 1: Install Framer Motion

**Files:**
- Modify: `package.json` (via npm install)

- [ ] **Install framer-motion**

```bash
npm install framer-motion
```

Expected: `framer-motion` appears in `package.json` dependencies. No errors.

- [ ] **Verify import works**

```bash
node -e "require('framer-motion'); console.log('ok')"
```

Expected output: `ok`

---

## Task 2: Animation Primitives

**Files:**
- Create: `components/animations/fade-up.tsx`
- Create: `components/animations/stagger.tsx`
- Create: `components/animations/mouse-parallax.tsx`
- Create: `components/animations/count-up.tsx`

**Produces:**
- `<FadeUp delay? amount? className?>` — wraps any children in a scroll-triggered fade+slide-up
- `<Stagger className?>` + `<StaggerItem className?>` — parent sets stagger timing, children animate in sequence
- `<MouseParallax strength? className?>` — children shift ±Npx tracking cursor with spring lag
- `<CountUp to suffix? duration?>` — animates a number from 0 to `to` when scrolled into view

- [ ] **Create `components/animations/fade-up.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  amount?: number;
  className?: string;
}

export function FadeUp({ children, delay = 0, amount = 0.2, className }: FadeUpProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Create `components/animations/stagger.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const itemVariantsReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4 } },
};

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div className={className} variants={reduced ? itemVariantsReduced : itemVariants}>
      {children}
    </motion.div>
  );
}
```

- [ ] **Create `components/animations/mouse-parallax.tsx`**

```tsx
"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";

interface MouseParallaxProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export function MouseParallax({ children, strength = 12, className }: MouseParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 60, damping: 20 });
  const y = useSpring(rawY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const rect = document.documentElement.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      rawX.set(((e.clientX - cx) / cx) * strength);
      rawY.set(((e.clientY - cy) / cy) * strength);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [rawX, rawY, strength]);

  return (
    <motion.div ref={ref} style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
}
```

- [ ] **Create `components/animations/count-up.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CountUpProps {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({ to, suffix = "", duration = 1.8, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) { setValue(to); return; }
    const start = performance.now();
    const ms = duration * 1000;
    const raf = (now: number) => {
      const t = Math.min((now - start) / ms, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease out cubic
      setValue(Math.round(eased * to));
      if (t < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [inView, to, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {value}{suffix}
    </span>
  );
}
```

- [ ] **Verify TypeScript compiles cleanly**

```bash
npx tsc --noEmit
```

Expected: no errors.

---

## Task 3: Homepage Animations

**Files:**
- Modify: `components/landing/hero-section.tsx`
- Modify: `components/landing/pain-points-section.tsx`
- Modify: `components/landing/features-section.tsx`
- Modify: `components/landing/how-it-works-section.tsx`
- Modify: `components/landing/ambitions-section.tsx`
- Modify: `components/landing/testimonials-section.tsx`
- Modify: `components/landing/cta-banner.tsx`

**Consumes:** `FadeUp`, `Stagger`, `StaggerItem`, `MouseParallax` from Task 2

### 3a — Hero Section

Add "use client" at top. Wrap badge + headline + subtitle + CTAs in `<FadeUp>` with staggered delays. Wrap phone mockup in `<MouseParallax strength={10}>`.

- [ ] **Edit `components/landing/hero-section.tsx`**

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { LandingNav } from "./nav";
import { FadeUp } from "@/components/animations/fade-up";
import { MouseParallax } from "@/components/animations/mouse-parallax";

export function HeroSection() {
  return (
    <section className="bg-[#FAF2E1] relative overflow-hidden">
      <LandingNav variant="light" />

      <div className="flex flex-col lg:flex-row items-start justify-between px-4 sm:px-8 lg:px-16 pt-4 pb-0 relative min-h-[auto] lg:min-h-[660px] gap-8">
        <div className="flex flex-col gap-4 max-w-[641px] pt-8 lg:pt-14 text-center lg:text-left w-full">
          <FadeUp delay={0}>
            <div className="inline-flex items-center gap-2 bg-[rgba(59,37,19,0.12)] border border-[rgba(255,195,68,0.5)] rounded-[6px] pl-1 pr-2 py-1 w-fit">
              <div className="bg-white rounded-[4px] px-2 py-1">
                <span className="font-[family-name:var(--font-plus-jakarta-sans)] font-medium text-sm text-black leading-5">For you:</span>
              </div>
              <span className="font-[family-name:var(--font-plus-jakarta-sans)] font-medium text-sm text-black leading-5">Childcare, Connected</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1
              className="font-[family-name:var(--font-fraunces)] font-semibold text-[#3b2513] leading-[1.1] text-[40px] sm:text-[56px] lg:text-[72px] xl:text-[80px]"
              style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}
            >
              Show up at work.
              <br />
              <em
                className="font-[family-name:var(--font-fraunces)] italic text-[#c78c5f] not-italic"
                style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1', fontStyle: "italic" }}
              >
                Be present
              </em>{" "}
              at home
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="font-[family-name:var(--font-plus-jakarta-sans)] font-normal text-[#3d444f] text-[18px] xl:text-[20px] leading-[1.6]">
              CEven provides real-time visibility into your child&apos;s daily
              experiences and wellbeing, enabling seamless communication between
              parents and caregivers.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-2">
              <Link
                href="#"
                className="relative flex items-center gap-1 pl-1.5 pr-4 py-0.5 rounded-[12px] bg-[#3b2513] shadow-[inset_0px_4px_12px_0px_rgba(255,255,255,0.12)] hover:bg-[#5b3921] transition-colors hover:scale-[1.03] active:scale-[0.98] duration-150"
              >
                <div className="relative w-[46px] h-[46px] shrink-0">
                  <Image src="/google_play_icon.png.png" alt="Google Play" fill sizes="46px" className="object-contain" />
                </div>
                <span className="font-[family-name:var(--font-plus-jakarta-sans)] font-medium text-[#faf2e1] text-[16px] leading-5 whitespace-nowrap">
                  Download on Google Play
                </span>
              </Link>
              <Link
                href="/for-parents"
                className="flex items-center justify-center gap-2 border border-[#3b2513] h-[50px] w-[162px] rounded-[12px] px-4 hover:bg-[#3b2513]/5 hover:scale-[1.03] active:scale-[0.98] transition-all duration-150"
              >
                <span className="font-[family-name:var(--font-plus-jakarta-sans)] font-semibold text-[#3b2513] text-[16px] leading-5">For Parents</span>
                <ArrowBendUpRight />
              </Link>
            </div>
          </FadeUp>
        </div>

        <MouseParallax strength={10} className="relative shrink-0 w-full max-w-[320px] sm:max-w-[400px] lg:w-[480px] lg:max-w-none xl:w-[540px] self-end mx-auto lg:mx-0 -mb-1">
          <FadeUp delay={0.15} amount={0.1}>
            <Image src="/hero-phone-mockup.png" alt="CEven app on iPhone" width={563} height={800} className="object-contain w-full" priority />
          </FadeUp>
        </MouseParallax>
      </div>
    </section>
  );
}

function ArrowBendUpRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 3.5L14 7.5L10 11.5" stroke="#3b2513" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 12.5C2 12.5 2 7.5 7 7.5H14" stroke="#3b2513" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
```

### 3b — Pain Points Section

Wrap heading in `<FadeUp>`, grid of 3 cards in `<Stagger>` / `<StaggerItem>`. Add hover lift to cards via Tailwind: `hover:-translate-y-1 hover:shadow-lg transition-all duration-200`.

- [ ] **Edit `components/landing/pain-points-section.tsx`**

Replace the section content with stagger + hover on each card. Add these imports at the top:

```tsx
import { FadeUp } from "@/components/animations/fade-up";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
```

Change the heading block:
```tsx
<FadeUp className="max-w-2xl mb-10 sm:mb-14">
  <h2 ...>The gap between work...</h2>
  <p ...>For the parents navigating...</p>
</FadeUp>
```

Change the grid:
```tsx
<Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10 sm:mb-12">
  {PAIN_POINTS.map((point, i) => (
    <StaggerItem key={i}>
      <div className={`${point.bg} rounded-2xl p-6 sm:p-7 relative overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-200 cursor-default`}>
        {/* existing card content unchanged */}
      </div>
    </StaggerItem>
  ))}
</Stagger>
```

Wrap the CTA link:
```tsx
<FadeUp delay={0.1} className="flex justify-center">
  <Link ...>Become A Better Parent</Link>
</FadeUp>
```

### 3c — Features Section

Wrap headline in `<FadeUp>`. Stagger the feature pills. Wrap the two-column blocks in `<FadeUp>` with slight left/right offsets using Framer Motion's `x` initial.

- [ ] **Edit `components/landing/features-section.tsx`**

Add imports:
```tsx
import { FadeUp } from "@/components/animations/fade-up";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
```

Wrap headline:
```tsx
<FadeUp className="text-center mb-10">
  <h2 ...>Everything you need...</h2>
  <p ...>Built around...</p>
</FadeUp>
```

Wrap pills in Stagger (pills are inline elements — wrap the container div):
```tsx
<Stagger className="flex flex-wrap justify-center gap-3 mb-20">
  {FEATURE_PILLS.map((pill) => (
    <StaggerItem key={pill.label}>
      <span className="... hover:scale-105 hover:shadow-sm transition-all duration-150 cursor-default">
        {pill.emoji} {pill.label}
      </span>
    </StaggerItem>
  ))}
</Stagger>
```

Wrap section label:
```tsx
<FadeUp className="mb-8">
  <p ...>Built for both</p>
  <h3 ...>Two users. One platform.</h3>
</FadeUp>
```

Wrap two column layout — left with delay 0, right with delay 0.15:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
  <FadeUp delay={0}>{/* For parents column */}</FadeUp>
  <FadeUp delay={0.15}>{/* For crèches column */}</FadeUp>
</div>
```

### 3d — How It Works Section

Stagger the 3 steps with a slight bounce. Use `<Stagger>` + `<StaggerItem>` on the steps grid.

- [ ] **Edit `components/landing/how-it-works-section.tsx`**

Add imports:
```tsx
import { FadeUp } from "@/components/animations/fade-up";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
```

Wrap the header block:
```tsx
<FadeUp className="mb-10 sm:mb-14">
  <div className="inline-flex ...">How it works</div>
  <h2 ...>Simple by design...</h2>
  <p ...>Three steps...</p>
</FadeUp>
```

Change grid to Stagger (keep existing className):
```tsx
<Stagger className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-8">
  {STEPS.map((step) => (
    <StaggerItem key={step.number}>
      <div>
        <p className="text-[#FAF2E1]/10 ...">{step.number}</p>
        <div className="w-12 h-12 ... hover:scale-110 hover:bg-[#FAF2E1]/20 transition-all duration-200">
          {step.icon}
        </div>
        <h3 ...>{step.title}</h3>
        <p ...>{step.description}</p>
      </div>
    </StaggerItem>
  ))}
</Stagger>
```

### 3e — Testimonials Section

Stagger the 3 testimonial cards. Add hover lift.

- [ ] **Edit `components/landing/testimonials-section.tsx`**

Add imports:
```tsx
import { FadeUp } from "@/components/animations/fade-up";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
```

Wrap heading:
```tsx
<FadeUp className="mb-10 sm:mb-12">
  <p ...>What People Say</p>
  <h2 ...>The proof is in...</h2>
</FadeUp>
```

Change grid to Stagger:
```tsx
<Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
  {TESTIMONIALS.map((t) => (
    <StaggerItem key={t.name}>
      <div className="bg-[#F8F6F3] border border-[#E8E4DE] rounded-2xl p-6 sm:p-7 hover:-translate-y-1 hover:shadow-md transition-all duration-200">
        {/* existing card content */}
      </div>
    </StaggerItem>
  ))}
</Stagger>
```

### 3f — CTA Banner

Fade up the headline and CTA button.

- [ ] **Edit `components/landing/cta-banner.tsx`**

Add import:
```tsx
import { FadeUp } from "@/components/animations/fade-up";
```

Wrap the inner content div:
```tsx
<FadeUp className="relative z-10 px-4 sm:px-8 lg:px-16 py-20 sm:py-24 text-center max-w-3xl mx-auto">
  <h2 ...>Childcare support...</h2>
  <p ...>Be part of every aspect...</p>
  <a href="#" className="... hover:scale-[1.04] transition-transform duration-150">
    <PlayStoreIcon />
    Download on Google Play
  </a>
</FadeUp>
```

### 3g — Ambitions Section

- [ ] **Read current file to understand structure, then wrap in `<FadeUp>`**

```bash
cat /Users/theoneglobal/Documents/Projects/Ceven/components/landing/ambitions-section.tsx
```

Add `import { FadeUp } from "@/components/animations/fade-up"` and wrap the main heading block and content in `<FadeUp>` with appropriate delays.

- [ ] **Verify TypeScript**

```bash
npx tsc --noEmit
```

---

## Task 4: For Parents Page Animations

**Files:**
- Modify: `components/landing/parents-hero-section.tsx`
- Modify: `components/landing/parents-gap-section.tsx`
- Modify: `components/landing/parents-comparison-section.tsx`
- Modify: `components/landing/parents-photo-cta-section.tsx`
- Modify: `components/landing/parents-faq-section.tsx`

**Consumes:** `FadeUp`, `Stagger`, `StaggerItem` from Task 2

- [ ] **`parents-hero-section.tsx`** — add `"use client"`, wrap badge pills in `<Stagger>/<StaggerItem>`, wrap h1 in `<FadeUp delay={0.1}>`, wrap paragraph in `<FadeUp delay={0.2}>`, wrap CTA buttons in `<FadeUp delay={0.3}>`.

- [ ] **`parents-gap-section.tsx`** — read file, then wrap heading in `<FadeUp>`, wrap any list/cards in `<Stagger>/<StaggerItem>`.

- [ ] **`parents-comparison-section.tsx`** — read file, then wrap left column in `<FadeUp delay={0}>` and right column in `<FadeUp delay={0.15}>`.

- [ ] **`parents-photo-cta-section.tsx`** — read file, then wrap content in `<FadeUp>`.

- [ ] **`parents-faq-section.tsx`** — read file, wrap heading in `<FadeUp>`, wrap FAQ items in `<Stagger>/<StaggerItem>`. Add hover lift (`hover:-translate-y-0.5 transition-transform`) to each accordion item.

- [ ] **Verify TypeScript**

```bash
npx tsc --noEmit
```

---

## Task 5: For Crèches Page Animations

**Files:**
- Modify: `components/landing/creches-hero-section.tsx`
- Modify: `components/landing/creches-platform-section.tsx`
- Modify: `components/landing/creches-transparency-section.tsx`
- Modify: `components/landing/creches-timeline-section.tsx`
- Modify: `components/landing/creches-getting-started-section.tsx`
- Modify: `components/landing/creches-cta-section.tsx`
- Modify: `components/landing/creches-testimonials-section.tsx`

**Consumes:** `FadeUp`, `Stagger`, `StaggerItem` from Task 2

- [ ] **`creches-hero-section.tsx`** — add `"use client"`, wrap badge pills in `<Stagger>/<StaggerItem>`, wrap h1 + paragraph in `<FadeUp>`, wrap CTAs in `<FadeUp delay={0.2}>`.

- [ ] **`creches-platform-section.tsx`** — read file, then wrap heading in `<FadeUp>`, wrap feature list/cards in `<Stagger>/<StaggerItem>`.

- [ ] **`creches-transparency-section.tsx`** — read file, wrap heading in `<FadeUp>`, wrap content blocks in `<FadeUp delay={0.1}>`.

- [ ] **`creches-timeline-section.tsx`** — read file. This is the most interesting: wrap each timeline step in `<StaggerItem>` inside a `<Stagger>`. The step numbers and connector lines animate in sequence.

- [ ] **`creches-getting-started-section.tsx`** — read file, wrap steps/cards in `<Stagger>/<StaggerItem>`, heading in `<FadeUp>`.

- [ ] **`creches-cta-section.tsx`** — read file, wrap content in `<FadeUp>`, add hover scale to CTA button.

- [ ] **`creches-testimonials-section.tsx`** — read file, wrap testimonial cards in `<Stagger>/<StaggerItem>` with hover lift.

- [ ] **Verify TypeScript**

```bash
npx tsc --noEmit
```

---

## Task 6: About Page Animations (with Count-Up)

**Files:**
- Modify: `components/landing/about-hero-section.tsx`
- Modify: `components/landing/about-stats-section.tsx`
- Modify: `components/landing/about-origin-section.tsx`
- Modify: `components/landing/about-swayosoo-section.tsx`
- Modify: `components/landing/about-mission-section.tsx`

**Consumes:** `FadeUp`, `Stagger`, `StaggerItem`, `CountUp` from Task 2

- [ ] **`about-hero-section.tsx`** — add `"use client"`, wrap badge + h1 in `<FadeUp delay={0.1}>`, paragraph in `<FadeUp delay={0.2}>`, CTAs in `<FadeUp delay={0.3}>`.

- [ ] **`about-stats-section.tsx`** — This has the count-up. Add `"use client"`. Import `CountUp`. The STATS array has values `"100+"`, `"25k"`, `"12"`. Replace the static value display with `<CountUp>`:

```tsx
import { CountUp } from "@/components/animations/count-up";
import { FadeUp } from "@/components/animations/fade-up";

// In the stats grid — the stat card section:
// For "100+":
<CountUp to={100} suffix="+" className="font-[family-name:var(--font-mogra-import)] text-[#3B2513] text-[64px] sm:text-[80px] lg:text-[100px] leading-none" />

// For "25k":
<CountUp to={25} suffix="k" className="font-[family-name:var(--font-mogra-import)] text-[#3B2513] text-[64px] sm:text-[80px] lg:text-[100px] leading-none" />

// For "12":
<CountUp to={12} suffix="" className="font-[family-name:var(--font-mogra-import)] text-[#3B2513] text-[64px] sm:text-[80px] lg:text-[100px] leading-none" />
```

Wrap the heading in `<FadeUp>` and the stats card in `<FadeUp delay={0.1}>`.

- [ ] **`about-origin-section.tsx`** — read file, wrap content blocks in `<FadeUp>` with staggered delays.

- [ ] **`about-swayosoo-section.tsx`** — read file, wrap content in `<FadeUp>`.

- [ ] **`about-mission-section.tsx`** — read file, wrap content in `<FadeUp>`.

- [ ] **Verify TypeScript**

```bash
npx tsc --noEmit
```

---

## Task 7: Contact Page + Nav + Footer

**Files:**
- Modify: `components/landing/contact-hero-section.tsx`
- Modify: `components/landing/contact-form-section.tsx`
- Modify: `components/landing/nav.tsx`
- Modify: `components/landing/footer.tsx`

**Consumes:** `FadeUp`, `Stagger`, `StaggerItem` from Task 2

- [ ] **`contact-hero-section.tsx`** — read file, add `"use client"`, wrap h1 + paragraph in `<FadeUp>`, CTAs in `<FadeUp delay={0.2}>`.

- [ ] **`contact-form-section.tsx`** — read file. Wrap heading in `<FadeUp>`. Wrap form fields in `<Stagger>/<StaggerItem>` so they appear one-by-one. Add `focus:scale-[1.01] transition-transform duration-150` to input fields for a subtle focus animation (pure Tailwind, no Framer needed here).

- [ ] **`nav.tsx`** — Already "use client". Add hover animations to nav links using Framer Motion's `motion.a` or keep pure Tailwind. The simplest approach: add `hover:scale-[1.05] transition-transform duration-150` to each nav link, and `hover:scale-[1.03]` to the Download button. This is already a client component so no "use client" needed.

- [ ] **`footer.tsx`** — Read file, add `import { FadeUp } from "@/components/animations/fade-up"` and wrap the footer content in `<FadeUp amount={0.05}>` (low amount threshold since footer is tall).

- [ ] **Final TypeScript check**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Final smoke test — visit all 4 pages**

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ && \
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/for-parents && \
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/for-creches && \
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/about && \
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/contact
```

Expected: `200200200200200`
