# Restore Parent/Caregiver v3 Real Code Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the iframe-only Parent/Caregiver v3 routes with the prior real Next/React prototype so the app can be iterated as normal code.

**Architecture:** Restore the typed v3 route groups, mobile shells, bottom navs, and mock data from the earlier standalone React prototype commit. Keep the downloaded/bundled HTML under `public/prototypes/parent-caregiver-v3/index.html` as the visual reference only, while `/parent/v3` and `/caregiver/v3` route into real pages.

**Tech Stack:** Next.js 16 App Router, React 19 client components, Tailwind CSS v4, local typed mock data.

## Global Constraints

- Scope edits to Parent/Caregiver v3 files only.
- Preserve unrelated uncommitted work in the repository.
- Use the existing CEven fonts, warm surfaces, and mobile shell conventions.
- Keep the iframe prototype available at `/parentv3` and `/caregiverv3` for reference unless a route conflict requires removal.
- Verify with `npm run build`; use lint only if the repo baseline makes that practical.

---

### Task 1: Restore v3 source files

**Files:**
- Restore: `app/(parentv3)/layout.tsx`
- Restore: `app/(parentv3)/parentv3/page.tsx`
- Restore: `app/(parentv3)/parentv3/home/page.tsx`
- Restore: `app/(parentv3)/parentv3/food-timetable/page.tsx`
- Restore: `app/(parentv3)/parentv3/calendar/page.tsx`
- Restore: `app/(parentv3)/parentv3/chat/page.tsx`
- Restore: `app/(caregiverv3)/layout.tsx`
- Restore: `app/(caregiverv3)/caregiverv3/page.tsx`
- Restore: `app/(caregiverv3)/caregiverv3/today/page.tsx`
- Restore: `app/(caregiverv3)/caregiverv3/calendar/page.tsx`
- Restore: `app/(caregiverv3)/caregiverv3/chat/page.tsx`
- Restore: `app/(caregiverv3)/caregiverv3/daily-report/page.tsx`
- Restore: `components/parentv3/mobile-shell.tsx`
- Restore: `components/parentv3/bottom-nav.tsx`
- Restore: `components/caregivev3/mobile-shell.tsx`
- Restore: `components/caregivev3/bottom-nav.tsx`
- Restore: `lib/parentv3/mock-data.ts`
- Restore: `lib/caregivev3/mock-data.ts`

**Interfaces:**
- Produces real route groups at `/parentv3/*` and `/caregiverv3/*`.
- Produces reusable components and mock-data modules consumed by v3 pages.

- [ ] **Step 1: Restore the files from commit `7b0064c`**

Run a scoped restore for only the files listed above.

- [ ] **Step 2: Inspect the restored diff**

Confirm the restore only touches the listed v3 source files.

### Task 2: Route `/parent/v3` and `/caregiver/v3` into real code

**Files:**
- Modify: `app/parent/v3/page.tsx`
- Modify: `app/caregiver/v3/page.tsx`

**Interfaces:**
- Consumes the restored route pages from `app/(parentv3)/parentv3/page.tsx` and `app/(caregiverv3)/caregiverv3/page.tsx`.
- Produces clean canonical routes `/parent/v3` and `/caregiver/v3` without iframe wrappers.

- [ ] **Step 1: Replace iframe page bodies with re-exports**

Make `app/parent/v3/page.tsx` export the restored Parent v3 entry component, and make `app/caregiver/v3/page.tsx` export the restored Caregiver v3 entry component.

- [ ] **Step 2: Keep HTML reference routes unchanged**

Leave `/parentv3` and `/caregiverv3` iframe pages in place as visual references.

### Task 3: Verify the restored prototype

**Files:**
- Read: all touched v3 files

**Interfaces:**
- Produces verification evidence for the conversion.

- [ ] **Step 1: Run TypeScript/build verification**

Run `npm run build`.

- [ ] **Step 2: Address v3-specific failures**

If the build fails because of restored v3 code, patch those files and rerun the build.

- [ ] **Step 3: Summarize remaining unrelated baseline issues**

If the build fails outside v3 files, report the exact blocker without touching unrelated files.
