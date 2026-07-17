# Agent Reference — CEven Prototype

Orientation doc for any agent picking up work in this repo cold. This describes what
actually exists in the code right now, not what any single session originally intended —
several parts of this app have been reworked by different sessions in parallel, so treat
this as the source of truth over any prior chat summary.

## What this repo is

A **frontend-only, AI-generated prototype** (Next.js App Router, no real backend — mock
data throughout, no database, no persisted state beyond a single auth cookie). It's built
from Figma exports and PRD text by feeding them through Claude, separate from CEven's
official backend-connected build (owned by a different dev team). Its purpose is fast,
accurate UI/flow iteration and hand-off reference — not production logic. Don't over-invest
in backend-grade correctness (real auth, validation, persistence) unless asked.

Read `node_modules/next/dist/docs/` before assuming Next.js conventions — this project
pins a version with breaking changes from older Next.js knowledge (see root `AGENTS.md`).
Notably: `middleware.ts` is renamed **`proxy.ts`** (exports a `proxy()` function, not
`middleware()`), and dynamic route `params` are a `Promise` you must `await`.

## The 5 apps and their URL paths

| App | Path prefix | Platform | Status |
|---|---|---|---|
| Parent | `/parent/*` | Mobile-only (390px shell) | Built, actively maintained |
| Caregiver | `/caregiver/*` | Mobile-only (390px shell) | Built, actively maintained |
| Creche Admin v2 | `/admin/v2/*` | Web dashboard | Built (this is the original/main admin build — see note below) |
| Creche Admin v1 | `/admin/v1/*` | Web dashboard | Partially built — see "V1's actual purpose" below |
| Super Admin | `/super-admin/*` | Web dashboard (internal/platform team) | Actively being built out — nav has drifted from initial routes, see below |

Route groups `app/(parent)/parent/`, `app/(caregiver)/caregiver/`, and folders under
`app/admin/v1/`, `app/admin/v2/`, `app/super-admin/` correspond directly to these prefixes.
`app/(auth)/`, `app/(landing)/` hold shared/public pages (login, signup, marketing site).

## Auth model — read this before testing any admin route

`proxy.ts` (repo root) gates every path except `/parent/*`, `/caregiver/*`, and a short
`PUBLIC_PATHS` list (landing pages). **Current behavior is not a real login gate**: if a
request has no `ceven_admin_session` cookie, `proxy.ts` auto-sets that cookie to `"active"`
and redirects straight into `/admin/v1/dashboard` — it does not send unauthenticated users
to `/login`. In practice this means the first hit to any gated path silently bootstraps a
session and lands you on `/admin/v1/dashboard`; every request after that passes straight
through. The `/login` form (`lib/auth/actions.ts` → `login()`) still works and also lands
on `/admin/v1/dashboard` on success, but it's not required to reach any admin screen.
`lib/auth/session.ts` holds the cookie get/set/clear helpers if you need to touch this.

If you need to test `/admin/v2/*` or `/super-admin/*` fresh, visit them directly once a
session exists (any admin path establishes one) — don't expect a redirect loop back to v2.

## Creche Admin v2 (`/admin/v2/*`)

The original, fuller-featured Creche Admin build. Nav config: `components/admin/nav-items.ts`
(8 groups: Dashboard, Child Management, Staff Management, Daily Operations, Finance,
Communication, Intelligence, Account & Setup). Shell: `components/admin/sidebar.tsx`,
`components/admin/topbar.tsx`. Mock data: `lib/mock-data/*.ts` (one file per module —
`children.ts`, `staff.ts`, `finance.ts`, `daily-operations.ts`, `intelligence.ts`,
`account-setup.ts`, `communication.ts`, `wallet.ts`, `admin-user.ts`). Color system: warm
brown/cream (`--color-sidebar-bg: #3B2513`, `--color-content-bg: #FFF9F0`, etc., defined
in `app/globals.css`). Per `docs/PRD-gap-analysis-2026-06-22.md`, most v2 screens are
"shell built, behavior not" — no real AI system exists yet despite an AI button in the
topbar, and Settings is mostly missing. Check that gap-analysis doc before assuming a v2
screen is complete just because its nav entry and page file exist.

## Creche Admin v1 (`/admin/v1/*`) — purpose has shifted, read carefully

This was originally scoped (by an earlier session) as a **from-scratch build of the
legacy IA and dashboard described in `docs/PRD-v1.md`** — an older-generation, ERP-style
crèche dashboard with its own ~32-screen structure, a persistent AI panel, and a trial
banner, deliberately styled differently from v2 (slate/indigo) so the two "eras" of the
product stayed visually distinguishable for comparison purposes.

**That is no longer what the Dashboard screen shows.** A later session repurposed
`/admin/v1/dashboard` into something narrower: a **creche enrollment/verification status
view** — "Pending / Approved / Declined Request" stat cards, a request-trend chart
(`lib/admin-v1/dashboard-data.ts` → `CRECHE_REQUEST_DATA`, `DASHBOARD_STATS_V1`), and a
"Complete Creche Account Setup" / "Creche Account Verification" banner
(`components/admin-v1/setup-banner.tsx`, `verification-banner.tsx`) that opens a
multi-step `CrecheSetupModal` (`components/admin-v1/creche-setup-modal.tsx`, using
`CRECHE_FEATURES`, `NIGERIAN_STATES`, `DEFAULT_OPERATING_HOURS` from the same data file).
The visual style also moved to v2's brown palette (`#3B2513`) rather than the original
distinct indigo/slate scheme. `lib/auth/actions.ts`'s `login()` now redirects here, making
this the de facto landing screen post-login.

**The sidebar nav** (`lib/admin-v1/nav-items.ts`, `components/admin-v1/sidebar.tsx`) still
reflects the original 7-group PRD-v1 IA (Overview, Children & People, Daily Operations,
Finance, Communication, Intelligence, Account & Setup) with 31 routes. Only `dashboard`,
`children`, `staff`, and a handful of others have had any real content built; the rest
(~26 screens) are still `PlaceholderSectionV1` stubs pointing at their `docs/PRD-v1.md`
screen ID — check `components/admin-v1/placeholder-section.tsx` usage per route before
assuming a nav entry has real content.

**If you're picking up work here**: the "is this the old ERP dashboard or the
enrollment-status page" tension is unresolved. Confirm current intent with the user before
building out more of the 26 remaining placeholder screens — building toward the original
PRD-v1 ERP interpretation and building toward the enrollment-status interpretation are not
the same feature.

## Super Admin (`/super-admin/*`) — nav has drifted from route files on disk

No PRD exists for this app; it was scoped ad hoc as CEven's internal platform-ops console.
It has since been substantially reworked and the **nav no longer matches the full set of
route folders on disk** — treat the nav as authoritative for what's "current":

**Current nav** (`lib/super-admin/nav-items.ts`, 2 groups):
- Main: Dashboard (`/dashboard`), Creche Enrollment (`/enrollment`), Creches (`/creches`)
- Management: Subscription Mgt (`/subscriptions`), Notifications (`/notifications`)

**Orphaned routes** — files exist under `app/super-admin/` but nothing in the nav links
to them: `tenants/`, `tenants/[id]/`, `platform-billing/`, `plan-configuration/`,
`growth-usage/`, `support-tickets/`, `audit-log/`, `admin-users/`, `platform-settings/`,
`onboarding-requests/`. These were an earlier iteration's scope (tenant list split by
`ownerType: "organization" | "individual"`, directly modeling the Creche-vs-independent-
caregiver split from `docs/strategy/workspace-ownership-2026-07-13.md`). They still render
correctly if you navigate to them directly, but a fresh agent should assume they're
**dead code pending cleanup**, not active spec, unless the user says otherwise.

Mock data lives in one growing file, `lib/super-admin/mock-data.ts` — check `grep "^export"
lib/super-admin/mock-data.ts` before adding a new type, since it already covers tenants,
enrollment requests (`ENROLLMENT_REQUESTS` — creche applications with business docs, ID,
address proof, staff-screening flags), approved creches, subscription plans/subscribers,
caregivers, assigned children, child profiles, platform notifications, and growth/financial/
engagement chart data. `app/super-admin/dashboard/page.tsx` is now tabbed (Growth /
Financials / Engagement via `components/super-admin/dashboard/*-tab.tsx`), not the flat
KPI-grid layout from the first iteration.

Auth note: Super Admin currently shares the same `ceven_admin_session` cookie gate as the
Creche apps — there is no separate internal-staff-only auth domain. Do not treat this as
production-ready access control if this ever needs to hold real tenant data.

## Where the docs are

- `docs/CEven-Master-PRD.md` — source of truth for the **v2** build (PRD-v1.md is the
  legacy spec v1 was originally meant to implement, kept for provenance/reference).
- `docs/PRD-v1.md` — the legacy IA/screen spec `/admin/v1` was originally scaffolded from.
- `docs/PRD-gap-analysis-2026-06-22.md` — what's actually missing vs. the v2 PRD; check
  before assuming any v2 screen is feature-complete.
- `docs/strategy/workspace-ownership-2026-07-13.md` — PM strategy analysis on supporting
  independent (non-creche) caregivers as first-class tenants; informed the Super Admin
  tenant model (`ownerType`) and the invite-flow ticket below.
- `docs/tickets/independent-caregiver-01-invite-flow.md` — shardable ticket for a
  parent-invites-caregiver flow (Phase 1 of the strategy doc above), not yet built.
- `docs/pm-notes.md`, `docs/Sprints.md` — team/process context, not implementation detail.

## Deployment

Vercel project `moski/ceven` (already linked — `.vercel/project.json` present). Production
aliases: `ceven-seven.vercel.app` (primary), `ceven-moski.vercel.app`,
`ceven-mos-ski-moski.vercel.app`. Deploy with `vercel --prod` from repo root; it uploads
the local working tree as-is (uncommitted changes included), so commit first if you want a
clean rollback point. No monorepo tooling (no `turbo.json`/`pnpm-workspace.yaml`) — it's a
single Next.js app.

## General conventions worth reusing

- Each app has its own `nav-items.ts` (or equivalent) driving both the sidebar and a
  `useScreenTitle()`-style topbar title lookup — follow that pattern rather than
  hardcoding titles per page.
- Placeholder/stub screens use a per-app `PlaceholderSection[V1|SA]` component so nav
  links never 404 even before real content exists — check for one before writing a new
  "coming soon" block from scratch.
- Mock data is grouped by module in `lib/mock-data/*.ts` (v2), `lib/admin-v1/*.ts` (v1),
  `lib/super-admin/mock-data.ts` (super admin) — grep the relevant file for existing
  types/constants before adding new ones; there's real overlap risk (e.g. children/staff
  data) across v1, v2, and super-admin already.
