# Enrollment System + Unified Moments Feed Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (inline execution) to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the real enrollment flow (wizard, enrollments list with withdraw + timeline details, transaction history, navigation wiring) per `docs/superpowers/specs/2026-07-21-enrollment-and-transactions-design.md`, then rewrite Moments as a unified activity feed per `docs/superpowers/specs/2026-07-21-unified-moments-feed-design.md`.

**Architecture:** New `lib/shared/` data modules follow the existing localStorage pattern (`sharedGetList`/`sharedSet`, seed-on-first-read, `addNotification` on writes). Screens follow the parent app's established idioms (client components, `cg-*` tokens, `ParentBottomNav`, bottom-sheet modals).

**Tech Stack:** Next.js 16 App Router, Tailwind v4, lucide-react, existing `lib/shared/storage.ts` helpers.

## Global Constraints

- No payment initiation anywhere (App Store compliance, commit `f9fe31d`). `lib/shared/transactions.ts` exports read functions only.
- Multi-child roster is enrollment-scoped; the rest of the app keeps `mockChild`.
- `npx tsc --noEmit` clean after every task; manual browser verification per the specs' Verification sections.
- Commit per task.

### Task 1: Enrollment data layer
Create `lib/shared/enrollment-children.ts` (3 kids: Zain ~6mo, Philip "Bobo" ~2y, Joy "Jay" ~6y; `getEnrollmentChildren`, `getAgeInMonths`, `formatAge`), `lib/shared/enrollments.ts` (`Enrollment` with statusHistory; `getEnrollments`, `createEnrollment`, `withdrawEnrollment`; seeds covering pending/active/cancelled), `lib/shared/transactions.ts` (`getTransactions` only; 3 tuition payments). Age-range parser `parseAgeRange(range: string): { minMonths, maxMonths } | null` lives in enrollment-children.ts and handles "6-12 months", "1-2 years", "3-5 years" formats; null on unparseable.

### Task 2: Enrollment wizard on creche detail
Rewrite the "Enrol Now" flow in `app/(parent)/parent/creche/[id]/page.tsx`: replace `AdditionalInfoModal` with a 3-step bottom-sheet wizard (Select Child Profile → Select Room → Enrollment Details with red age-validation banner + disabled submit) ending in a success modal whose "View Enrollments" navigates to `/parent/enrollments`. Room step reuses `creche.rooms`.

### Task 3: Enrollments list + details, retire old application screen
Create `app/(parent)/parent/enrollments/page.tsx` (search, status-chip cards, two-tap Withdraw, details bottom sheet with status timeline). Delete `app/(parent)/parent/application/page.tsx` and `lib/shared/application.ts`. Update home tile: "Application/Waitlist" → "Enrollments" → `/parent/enrollments` (keep `FileText`, add `isNew`).

### Task 4: Transaction History + Settings rows
Create `app/(parent)/parent/settings/payments/page.tsx` (view-only ledger per spec). Add Settings rows: Enrollments (GraduationCap) after Find Creche; Payment History (Receipt) after Billing History.

### Task 5: Feed aggregator + carousel component
Create `lib/shared/feed.ts` (FeedItem type, `getFeedItems()` aggregating moments/medication/incidents/growth/check-ins/report/announcements/events with timestamp derivation + day-group/relative-time helpers) and `components/parent/image-carousel.tsx` (scroll-snap, dots, n/N chip).

### Task 6: Rewrite Moments as unified feed
Rewrite `app/(parent)/parent/moments/page.tsx`: filter chips (All/Moments/Health/Activity/Creche), day-grouped stream, MomentCard (carousel for multi-image) + CompactCard (icon/tint map per spec, taps navigate to `item.href`), per-filter empty states.

### Task 7: Verify + ship
Full `npm run build`; browser walkthrough of both specs' verification lists; commit any fixes; offer push.
