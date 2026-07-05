# CEven — Feature Matrix: Creche Admin vs. Parent App vs. Caregiver App

**Date:** 2026-07-05
**Prepared for:** CEven product & engineering team

## How to read this

Every row is a specific feature. The three columns show its status in each app, judged against what was actually **designed/specified** for that app — not just what happens to be coded today.

**Status key:**
- **Available** — designed and working end to end
- **Not available** — doesn't exist in this app
- **Not in design** — no product spec anywhere calls for this feature in this app; it was never planned for this app on paper
- **Not wired** — it was designed and built visually, but isn't functionally connected (a stub)
- **Doesn't connect to V2** — this exists on the V1 side (parent/caregiver) but has no path into the V2 admin
- **Missing in V1** — this is a V2 admin feature with no V1 (parent/caregiver) counterpart at all — net-new, nothing to migrate

## Important context before the table

Three things came out of reviewing the actual product specs (not just the code) that change how this matrix should be read:

1. **There is no written spec for the Parent App.** The only document that touches parent-facing screens is the Caregiver Mobile App design spec — and it explicitly states that Parent and Caregiver share the *identical* screen set in V1, with any role-specific differences listed as **"NOT in V1."** That means most of what the built Parent App actually does today (the child health/feeding/development sign-up wizard, the AI assistant, creche discovery, in-app payments) was built beyond any written spec. Anywhere this matters, it's called out below as "Not in design" rather than treated as a bug.
2. **The Admin spec has gone through three generations** (an early prototype pass, a 32-screen v1.0 PRD, and the current Master PRD), and they don't fully agree with each other. The clearest example: the Master PRD states as a hard rule that CEven "never takes custody of parent funds" and will not run a wallet — but the Wallet feature is fully specified in its own document and already listed in the admin navigation. That contradiction is still unresolved and is called out again in the Finance section.
3. **Several admin features are specified only on the "sending" side, with the "receiving" screen never designed.** For example: daily logs and invoices both have a "note to parent" field, incidents have a 4-hour parent-notification requirement, and announcements/events expect parent replies/RSVPs — but no document anywhere specifies what the parent app actually shows when any of this arrives. These are marked "Not in design" on the Parent App side, since it's a genuine documentation gap, not just an unbuilt feature.

---

## Module: Authentication & Onboarding

| Feature | Creche Admin | Parent App | Caregiver App |
|---|---|---|---|
| Login | Available | Available | Available |
| Sign up / register | Available | Available | Not in design (caregiver spec treats sign-up as caregiver-only) |
| Email/OTP verification | Available | Available | Available |
| Forgot password | Available | Available | Not in design |
| Reset password | Available | Available | Not in design |
| Terms of Service acceptance | Not in design | Available | Not in design |
| PIN setup (quick app-lock) | Not in design | Not in design | Available |
| Change PIN | Not in design | Not in design | Not wired |
| Role selection (parent vs. caregiver) at login | Not in design | Not wired (same screen used for both, no differentiated content) | Not wired (same screen used for both, no differentiated content) |
| First-time onboarding walkthrough / carousel | Not in design | Not available | Available |
| Account setup wizard (first login) | Available | Not in design | Not in design |
| Logout | Available | Available | Available |

## Module: Home / Dashboard

| Feature | Creche Admin | Parent App | Caregiver App |
|---|---|---|---|
| KPI/stat overview cards | Available | Not in design | Available (basic classroom counts only — this was in the caregiver spec) |
| Quick actions | Available | Not in design | Available |
| Customizable quick actions | Available | Not in design | Not in design |
| Onboarding checklist ("complete your setup") | Available (disappearing-item behavior not yet built) | Not in design | Not in design |
| AI daily brief / summary | Not wired (built into spec, currently missing from the live build) | Not in design | Not in design |
| Recent activity/photo feed | Available | Not in design (built anyway) | Not in design |
| Upcoming events preview | Available | Not in design | Not in design |

## Module: Child Profile & Health

| Feature | Creche Admin | Parent App | Caregiver App |
|---|---|---|---|
| Child list | Available | Not in design | Not in design (built anyway, view-only) |
| Add a child (admin-side enrolment) | Available | — | — |
| Add a child (parent-side sign-up) | — | Not in design (built anyway — no spec covers this wizard) | — |
| Edit an existing child's profile | Available | Not in design | — |
| Health profile (allergies, medication, blood group) | Available | Not in design (built anyway, write-once, not editable after) | Not in design |
| Medical document upload | Available | Not in design | — |
| Growth log (height/weight) | Available | Not in design | Not in design |
| Development / milestones | Available | Not in design (built anyway, collected once at sign-up) | Not in design |
| Photo gallery per child | Available | Not in design (view-only, can't add) | Not in design (no upload) |
| Authorized pickup persons | Available | Not in design | — |
| Photo ID for pickup persons | Not in design (not in any spec, admin or parent) | Not in design | — |

## Module: Parents & Guardians / Own Profile

| Feature | Creche Admin | Parent App | Caregiver App |
|---|---|---|---|
| Parent directory / list | Available | — | — |
| Parent profile detail view | Available | — | — |
| Edit own profile (name, contact, emergency contact) | — | Not wired | Not wired |
| App install/engagement status | Available | — | — |
| "Average app rating" metric | Not in design (no spec defines how this is measured; shown with no real data behind it) | Not in design | — |
| Send app invite to parent | Available | — | — |
| Rate/review a caregiver | Not in design (referenced only indirectly, via a staff leaderboard field with no submission mechanism specified anywhere) | Not in design | — |

## Module: Staff & Caregiver Management

| Feature | Creche Admin | Parent App | Caregiver App |
|---|---|---|---|
| Staff directory / list | Available | — | — |
| Staff profile detail view | Available | — | — |
| Add staff (ID docs, bank details, contract) | Available | — | Not in design |
| Self-service profile edit (caregiver's own info) | — | — | Not wired |
| Compliance/certification documents | Available (admin-managed) | — | Not in design |
| Payroll | Available | — | Not in design |
| Leave request submission | Not in design (spec implies self-service but never states the actual screen) | — | Not in design |
| Leave request approval | Available | — | — |
| Staff leaderboard / compliance score | Available | — | — |
| "Lead Caregiver" role assignment | Available in UI, but the role itself is undefined in any spec | — | — |

## Module: Attendance & Check-in

| Feature | Creche Admin | Parent App | Caregiver App |
|---|---|---|---|
| QR code check-in station | Not wired (specified, incomplete in build) | Not in design (spec says parents scan with "their own phone," but no parent-side scan screen is designed) | Not in design |
| Manual check-in override | Available | — | — |
| Child check-in/out status | — | — | Not wired (manual toggle only, not a real scan) |
| Exception logging (late pickup, no ID, unauthorized pickup) | Not in design (this exists only as a single user story with no acceptance criteria or screen spec anywhere) | Not in design | — |
| Attendance history/reports | Available | Not in design | Not in design |

## Module: Daily Logs & Reports

| Feature | Creche Admin | Parent App | Caregiver App |
|---|---|---|---|
| Submit daily log (mood, meals, naps, hygiene) | — | — | Not wired |
| "Note to parent" field on a daily log | Available (writing side only) | Not in design (no receiving screen specified anywhere) | — |
| View daily log/report | Available | Not wired (view works, reply/comment doesn't send) | — |
| Log submission compliance tracking | Available | — | — |
| Remind caregivers to submit | Available | — | — |
| Activity/media log (photos, video, captions) | Available | Not in design (view-only) | Not wired (upload UI present, not functional) |

## Module: Incidents & Medication

| Feature | Creche Admin | Parent App | Caregiver App |
|---|---|---|---|
| Log an incident | Available | — | Not wired |
| View incident history | Available | Not in design | Available |
| 4-hour parent-notification requirement | Available (tracked as a countdown) | Not in design (no receiving screen ever specified) | — |
| Parent acknowledgment/reply to incident | Not in design | Not in design | — |
| Medication standing order / schedule | Available | Not in design (no consent step designed anywhere) | Not wired (free-text note only, not tied to an order) |
| Confirm medication administered | Available (tracks who/when) | Not in design | Not wired (not structured against an order) |

## Module: Tasks

| Feature | Creche Admin | Parent App | Caregiver App |
|---|---|---|---|
| Assign/create tasks | Available | — | — |
| View assigned tasks | — | — | Available |
| Mark task complete | — | — | Not wired (resets on reload) |
| Task overdue escalation | Available (specified, auto-escalation not yet built) | — | Not in design |

## Module: Messaging / Chat

| Feature | Creche Admin | Parent App | Caregiver App |
|---|---|---|---|
| Chat list | Not in design (no admin-side spec for chat at all) | Available | Available |
| Send/receive messages | Not in design | Not wired (simulated, scripted replies) | Not wired (simulated, scripted replies) |
| Admin included on every chat thread | Not in design (new requirement, raised verbally in a product meeting — not yet written into any spec) | Not in design | Not in design |
| Multi-parent thread (both guardians) | Not in design | Not in design | — |
| Special request (parent → caregiver task) | Not in design | Doesn't connect to V2 (existed in an earlier version, unconfirmed if carried forward) | Doesn't connect to V2 |
| File/photo attachment in chat | Not in design | Not wired (icon present, not functional) | Not wired (icon present, not functional) |
| Messages: in-app push + SMS fallback delivery | Available (specified as a requirement) | Not in design (receiving side never specified) | — |

## Module: Announcements, Notifications & Events

| Feature | Creche Admin | Parent App | Caregiver App |
|---|---|---|---|
| Send announcement | Available | — | — |
| Announcement templates | Available | — | — |
| AI-assisted announcement creation | Not wired (specified, incomplete in build) | — | — |
| View announcements | — | Not wired (view works, reply doesn't) | — |
| Read receipts on announcements | Not in design (only aggregate delivery counts are specified) | Not in design | — |
| Notification center (staff-facing) | Available | — | — |
| Notification center (parent/caregiver-facing) | — | Not in design (no spec for this screen exists, despite nearly every admin module sending notifications to parents) | Not in design |
| Mark notification as read | Not in design | Not in design | Not in design |
| Notification preferences | Available | Not wired | Not wired |
| Events / calendar | Available (RSVP tracking specified) | Not in design (parent-side RSVP screen never specified) | Not in design |
| RSVP to an event | Not in design (only the admin's aggregation view is specified) | Not in design | Not in design |

## Module: Finance & Payments

| Feature | Creche Admin | Parent App | Caregiver App |
|---|---|---|---|
| Invoice list / billing history | Available | Available (view only) | Not in design (built anyway, view only) |
| "Note to parent" field on an invoice | Available (writing side only) | Not in design (no receiving screen specified anywhere) | — |
| Pay an invoice online | — | Not wired | Not in design (built anyway, not wired) |
| Payment reminders (SMS) | Available | Not in design (receiving side not specified) | — |
| Expenses tracking | Available | — | — |
| Financial reports | Available | — | — |
| Creche operator wallet (deposits/payouts) | Available (though this directly contradicts a separate "CEven never holds funds" rule stated elsewhere in the same product spec — unresolved) | — | — |
| Parent-facing wallet/balance | Not in design | Not in design | — |
| Parent app access as a paid add-on | Available (this is literally the toggle that is supposed to unlock parent app features) | Not in design (the add-on billing exists on admin, but nothing on the parent side reflects being gated by it) | — |

## Module: AI Assistant

| Feature | Creche Admin | Parent App | Caregiver App |
|---|---|---|---|
| AI chat assistant | Available | Not in design (built anyway, as a separate assistant) | Not in design |
| Custom prompt / free-text questions | Available | Not in design (built anyway) | — |
| Prompt templates ("today's risk," "who's overdue") | Available | — | — |
| Adjustable AI tone/persona | Available | Not in design | — |
| Customizable AI name shown to end users | Not wired (specified, not yet exposed) | Not in design | — |
| Whether AI branding appears in parent-facing messages | Not in design (spec never states this either way) | Not in design | — |

## Module: Reports & Analytics

| Feature | Creche Admin | Parent App | Caregiver App |
|---|---|---|---|
| Generate reports | Available | — | — |
| Export as CSV/Excel | Available | — | — |
| Export as PDF | Not wired (specified, currently broken) | — | — |
| Send report to a recipient | Not wired (currently bundled into generation rather than a separate action, contrary to how it should work) | Not in design (receiving screen never specified) | — |
| Analytics dashboards (attendance, revenue, engagement) | Available | — | — |
| Audit trail of admin actions | Available (retention policy and correct placement in the navigation still undecided) | — | — |

## Module: Settings & Account

| Feature | Creche Admin | Parent App | Caregiver App |
|---|---|---|---|
| Subscription / plan management | Available | — | — |
| Creche configuration | Not wired (specified, not yet built) | — | — |
| Fee plan configuration | Not wired (specified, not yet built) | — | — |
| Roles & permissions | Not wired (specified, not yet built) | — | — |
| Notification rules configuration | Not wired (specified, not yet built) | — | — |
| Language preference | — | Not wired | — |
| Accessibility options (text size, contrast) | — | Not wired (controls don't actually change anything) | — |
| Help & support / FAQ | Not wired (specified, not yet built) | Not wired (static content only) | Not wired (static content only) |
| About app / legal | — | Available | — |
| Find/browse creches | — | Not in design (built anyway) | — |
| Enrol at a creche | Available (receiving side) | Not in design (built anyway; duplicates data already collected at sign-up instead of reusing it) | — |

---

## Headline Takeaways

1. **The Parent App has effectively been built without a spec.** Whole sections of it — the child health/feeding/development wizard, the AI assistant, creche discovery, in-app "special requests," settings — have no corresponding design document anywhere in this repository. That's not automatically wrong, but it means none of it has been product-reviewed against written acceptance criteria, and there's a real risk of scope drifting further from what leadership actually agreed to.
2. **Where the Admin spec is explicit about sending something to a parent, the receiving side was never designed.** Daily-log notes, invoice notes, incident notifications, announcement replies, and event RSVPs are all specified as things a parent should receive or respond to — but no document specifies what that looks like on the parent's side. This is the single most common "Not in design" pattern in this matrix.
3. **The admin spec itself isn't fully internally consistent.** Three generations of admin documentation exist, and at least one direct contradiction (whether CEven operates a Wallet at all) hasn't been resolved between them.
4. **Very little that should connect between apps actually does yet.** Chat, daily logs, incidents, and payments all have UI on both ends, but none of them are functionally wired together — every genuinely cross-app row in this matrix lands on "Not wired," not "Available."
