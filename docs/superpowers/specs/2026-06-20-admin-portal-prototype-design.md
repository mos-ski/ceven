# CEven Admin Portal — End-to-End Prototype Design

## Context

CEven is a digital childcare/family-care coordination platform (parent company Swayosoo). The full PRD describes three portals: Parent, Caregiver, and Admin. A Figma file (`89BtJn2sqWP4eVWTW12R89`, internally named "Cresh Super Admin") exists with designs, but it covers **only the Admin web portal** — there are no parent-app or caregiver-app screens in this file.

This spec scopes the **first end-to-end prototype to the Admin Portal only**, built to closely match the Figma designs. Parent and Caregiver portals are separate future sub-projects, to be spec'd once their designs exist.

## Goals

- Ship a clickable, visually-faithful prototype of the Admin web portal the user can iterate on.
- Match Figma colors, spacing, typography, and layout per section as it's built — not generic component-library defaults.
- Keep the data layer swappable: mock now, real DB later, without UI rewrites.

## Non-Goals

- Parent portal, Caregiver portal (no designs exist yet; separate future spec).
- Real authentication (password hashing, email delivery, sessions backed by a DB).
- Persistent storage across reloads.
- Automated test suite beyond typecheck/lint/build.

## Architecture & Stack

- **Framework:** Next.js 15, App Router, TypeScript.
- **Styling:** Tailwind v4 + shadcn/ui, themed to match Figma tokens (not default shadcn palette).
- **Deployment target:** Vercel.
- **Route groups:**
  - `(auth)` — login, password reset, email verification.
  - `(admin)` — main app, wrapped in a persistent sidebar/topbar layout.
- **Data layer:** `lib/mock-data/` — typed TS fixtures and in-memory mutation functions standing in for a database (Child, Staff, Attendance, Incident, Invoice, Message, etc.). Structured so a later swap to Postgres/Prisma (or Neon via Vercel Marketplace) touches only data-access functions, not components.

## Figma Source

- File key: `89BtJn2sqWP4eVWTW12R89`
- Single page: "Design System" (root canvas node `1786:11724`, named "Cresh Super Admin")
- Relevant top-level nodes:
  - Side Menu / Sidebar — `9019:7140` / `9019:7141` (default symbol) / `9006:3037` (instance)
  - Dashboard Section — `9004:6585` (dashboard overview + modals: AI chat, notifications, profile, add child, log activity, raise incident, new invoice, announcement, customize quick actions, confirm approval)
  - Children Management — `9021:9968`, `9031:4357`, `9407:28299`
  - Staff Management — `9103:5246`
  - Daily Operations — `9180:8308`, `10266:32517` (QR reception check-in)
  - Finance — `10299:23750`
  - Communication — `10600:23812`
  - AI/Intelligence Center — `10707:22722`
  - Account & Setup — `10707:25477`
  - Old Admin (legacy, contains the **only** auth screens in the file: login, password reset, email verification) — `9281:27280`

Known design tokens (sidebar, pulled directly from Figma):
- Sidebar background: `#3B2513`
- Active nav item text: `#FAF2E1`
- Inactive nav item text: `#6B7280`
- Brand accent ("Primary Dark Coffee 700"): `#9A6033`

Additional tokens (typography, spacing, other section palettes, component states) will be pulled per-section via `get_design_context`/`get_screenshot` as each section is implemented — not all extracted upfront.

## Navigation & Routes

Sidebar order (exact match to Figma), each mapped to a route and PRD feature area:

| # | Sidebar item | Route | PRD mapping |
|---|---|---|---|
| 1 | Dashboard | `/dashboard` | Reporting dashboard (overview) |
| 2 | Child Management | `/children` | Child profile management |
| 3 | Staff Management | `/staff` | Staff management |
| 4 | Daily Operations | `/daily-operations` | Attendance (QR/manual check-in) |
| 5 | Finance | `/finance` | Billing management |
| 6 | Communication | `/communication` | Parent communication hub (admin side) |
| 7 | Intelligence | `/intelligence` | AI-generated insights (PRD Phase 3, UI shell built now since Figma already designed it) |
| 8 | Account & Setup | `/account-setup` | Center/user management, settings |

Sidebar footer (non-nav): "Need Help?" support card, then admin profile block (name/email).

Each section page is a list/table view plus the relevant modals from Figma, built as shadcn `Dialog` components (Add Child, Log Activity, Raise Incident, New Invoice, Announcement, etc.).

## Auth & Data Behavior

- **Auth screens** are visually based on the legacy "Old Admin" Figma flow (only existing reference) — login, password reset, email verification — restyled with the current design tokens where they conflict with the rest of the app's look.
- **Auth logic** is stubbed: login checks credentials against a single in-memory mock admin user, sets a simple session cookie, redirects to `/dashboard`. No password hashing, no real email delivery — password reset shows a toast confirmation instead of sending mail.
- **CRUD actions** (add child, log activity, raise incident, create invoice, etc.) mutate mock data in memory via React state / server actions. Changes persist for the session and reset on reload — no database.

## Build Order

Each step should be independently viewable/clickable in the dev server before moving to the next:

1. Design tokens + shell layout (sidebar, topbar, route group skeletons)
2. Auth screens (login, reset, verify) — first full vertical slice, end-to-end
3. Dashboard / overview
4. Children Management
5. Staff Management
6. Daily Operations (check-in / QR)
7. Finance
8. Communication
9. Intelligence
10. Account & Setup

## Verification

Primarily manual/visual: after each section, run the dev server and click through that section's flows (list view, modals, sidebar active-state) against the Figma screenshot for that section. Automated checks are limited to `tsc --noEmit`, `eslint`, and a production `build` — no broader test suite at this stage, since the priority is fast visual iteration over long-term correctness guarantees.

## Open Items / Future Work

- Parent Portal and Caregiver Portal: no Figma designs exist yet; scope and spec separately once available.
- Real database, real auth, multi-tenant/multi-center support, billing integration, AI features: deferred per PRD roadmap (Phase 2+), built on top of this prototype's structure once validated.
