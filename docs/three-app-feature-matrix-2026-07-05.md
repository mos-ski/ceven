# CEven — Feature Matrix: Creche Admin vs. Parent App vs. Caregiver App

**Date:** 2026-07-05
**Prepared for:** CEven product & engineering team

## How to read this

Every row is a specific feature. The three columns show whether that feature exists in each app today, so you can see at a glance where the three apps line up and where they don't.

**Status key:**
- ✅ **Built & working**
- ⚠️ **Built, but incomplete** — the screen/form exists, but it's stubbed, doesn't save, or isn't fully functional
- ❌ **Not built**
- **—** Not applicable to this app (the feature belongs to a different role)

---

## Module: Authentication & Onboarding

| Feature | Creche Admin | Parent App | Caregiver App |
|---|---|---|---|
| Login | ✅ | ✅ | ✅ |
| Sign up / register | ✅ | ✅ | — |
| Email/OTP verification | ✅ | ✅ | ✅ |
| Forgot password | ✅ | ✅ | — |
| Reset password | ✅ | ✅ | — |
| Terms of Service acceptance | ❌ | ✅ | ❌ |
| PIN setup (quick app-lock) | ❌ | ❌ | ✅ |
| Change PIN | ❌ | ❌ | ⚠️ (doesn't save) |
| Role selection (parent vs. caregiver) at login | — | ❌ | ✅ |
| First-time onboarding walkthrough / carousel | ❌ | ❌ | ✅ |
| Account setup wizard (first login) | ✅ | — | — |
| Logout | ✅ | ✅ | ✅ |

## Module: Home / Dashboard

| Feature | Creche Admin | Parent App | Caregiver App |
|---|---|---|---|
| KPI/stat overview cards | ✅ | ❌ | ⚠️ (basic classroom stats only) |
| Quick actions | ✅ | ❌ | ✅ |
| Customizable quick actions | ✅ | ❌ | ❌ |
| Onboarding checklist ("complete your setup") | ✅ | ❌ | ❌ |
| AI daily brief / summary | ⚠️ (currently missing/oversight) | ❌ | ❌ |
| Recent activity feed | ✅ | ✅ (photo/moments feed) | ❌ |
| Upcoming events preview | ✅ | ❌ | ❌ |

## Module: Child Profile & Health

| Feature | Creche Admin | Parent App | Caregiver App |
|---|---|---|---|
| Child list | ✅ | — (single/multi-child view only) | ✅ |
| Add a child | ✅ (admin-side enrolment) | ✅ (parent-side sign-up wizard) | — |
| Edit an existing child's profile | ✅ | ❌ (write-once at sign-up) | — |
| Child identity (name, DOB, photo) | ✅ | ✅ | ✅ (view only) |
| Health profile (allergies, medication, blood group) | ✅ | ✅ (collected once, not editable) | ✅ (view only) |
| Medical document upload | ✅ | ❌ | — |
| Growth log (height/weight) | ✅ | ❌ | ❌ |
| Development / milestones | ✅ | ✅ (collected once at sign-up) | ❌ (no ongoing logging) |
| Photo gallery per child | ✅ | ❌ (view own gallery, can't add) | ❌ (no upload) |
| Authorized pickup persons | ✅ (admin manages) | ❌ (no self-service) | — |
| Photo ID for pickup persons | ❌ | ❌ | — |

## Module: Parents & Guardians / Own Profile

| Feature | Creche Admin | Parent App | Caregiver App |
|---|---|---|---|
| Parent directory / list | ✅ | — | — |
| Parent profile detail view | ✅ | — | — |
| Edit own profile (name, contact, emergency contact) | — | ⚠️ (edits don't save) | ⚠️ (edits don't save) |
| App install/engagement status | ✅ (shown, not real data) | — | — |
| "Average app rating" metric | ⚠️ (placeholder, no real source) | — | — |
| Send app invite to parent | ✅ | — | — |
| Rate/review a caregiver | ❌ | ❌ | — |

## Module: Staff & Caregiver Management

| Feature | Creche Admin | Parent App | Caregiver App |
|---|---|---|---|
| Staff directory / list | ✅ | — | — |
| Staff profile detail view | ✅ | — | — |
| Add staff (ID docs, bank details, contract) | ✅ | — | ❌ (no self-service upload) |
| Self-service profile edit (caregiver's own info) | — | — | ⚠️ (edits don't save) |
| Compliance/certification documents | ✅ (admin-managed) | — | ❌ (no self-upload) |
| Payroll | ✅ | — | ❌ (no payslip view) |
| Leave request submission | ✅ (review only) | — | ❌ (no submission screen) |
| Leave request approval | ✅ | — | — |
| Staff leaderboard / compliance score | ✅ | — | — |
| "Lead Caregiver" role assignment | ✅ (but role undefined) | — | — |

## Module: Attendance & Check-in

| Feature | Creche Admin | Parent App | Caregiver App |
|---|---|---|---|
| Front-desk / reception check-in | ⚠️ (incomplete) | — | — |
| QR code check-in | ⚠️ (incomplete) | ❌ | ❌ |
| Manual check-in override | ✅ | — | — |
| Child check-in/out status toggle | — | — | ⚠️ (manual toggle, not a real scan, doesn't persist) |
| Exception logging (late pickup, no ID, unauthorized pickup) | ✅ | — | — |
| Attendance history/reports | ✅ | ❌ | ❌ |

## Module: Daily Logs & Reports

| Feature | Creche Admin | Parent App | Caregiver App |
|---|---|---|---|
| Submit daily log (mood, meals, naps, hygiene) | — (monitors submissions) | — | ⚠️ (form exists, doesn't save) |
| View daily log/report | ✅ | ⚠️ (view works; comment box doesn't send) | — |
| Log submission compliance tracking | ✅ | — | — |
| Remind caregivers to submit | ✅ | — | — |
| Activity/media log (photos, video, captions) | ✅ | ❌ (view gallery only) | ⚠️ (upload UI present, not functional) |

## Module: Incidents & Medication

| Feature | Creche Admin | Parent App | Caregiver App |
|---|---|---|---|
| Log an incident | ✅ | — | ⚠️ (form exists, doesn't save; also buggy in testing) |
| View incident history | ✅ | ❌ | ✅ |
| Mark parent as notified | ✅ | — | — |
| Parent acknowledgment/reply to incident | ❌ | ❌ | — |
| Medication schedule / standing order | ✅ | ❌ (no consent step) | ⚠️ (free-text note only, not tied to an order) |
| Confirm medication administered | ✅ (tracks who/when) | — | ⚠️ (not structured) |

## Module: Tasks

| Feature | Creche Admin | Parent App | Caregiver App |
|---|---|---|---|
| Assign/create tasks | ✅ | — | — |
| View assigned tasks | — | — | ✅ |
| Mark task complete | — | — | ⚠️ (resets on reload) |
| Task overdue escalation | ✅ (tracked as a stat) | — | ❌ |

## Module: Messaging / Chat

| Feature | Creche Admin | Parent App | Caregiver App |
|---|---|---|---|
| Chat list | ✅ | ✅ | ✅ |
| Send/receive messages | ✅ | ⚠️ (simulated, scripted replies) | ⚠️ (simulated, scripted replies) |
| Admin included on every chat thread | ❌ | ❌ | ❌ |
| Multi-parent thread (both guardians) | ❌ | ❌ | — |
| Participant list shown on thread | ❌ | ❌ | ❌ |
| Special request (parent → caregiver task) | — | ⚠️ (unconfirmed if it survived to v2) | ⚠️ (unconfirmed if it survived to v2) |
| File/photo attachment in chat | ❌ | ❌ (icon present, not wired) | ❌ (icon present, not wired) |

## Module: Announcements, Notifications & Events

| Feature | Creche Admin | Parent App | Caregiver App |
|---|---|---|---|
| Send announcement | ✅ | — | — |
| Announcement templates | ✅ | — | — |
| AI-assisted announcement creation | ⚠️ (incomplete) | — | — |
| View announcements | — | ⚠️ (view works, reply doesn't) | — |
| Read receipts on announcements | ❌ | ❌ | — |
| Notification center | ✅ | ✅ (view only) | ✅ (view only) |
| Mark notification as read | ❌ | ❌ | ❌ |
| Notification preferences | ✅ | ⚠️ (toggles don't save) | ⚠️ (toggles don't save) |
| Events / calendar | ⚠️ (approval flow only, no RSVP) | ❌ | ❌ |
| RSVP to an event | ❌ | ❌ | ❌ |

## Module: Finance & Payments

| Feature | Creche Admin | Parent App | Caregiver App |
|---|---|---|---|
| Invoice list / billing history | ✅ | ✅ (view only) | ✅ (view only, unusual for a caregiver app) |
| Pay an invoice online | — | ⚠️ (button present, not wired) | ⚠️ (button present, not wired) |
| Payment reminders | ✅ | — | — |
| Expenses tracking | ✅ | — | — |
| Financial reports | ✅ | — | — |
| Creche operator wallet (deposits/payouts) | ✅ | — | — |
| Parent-facing wallet/balance | ❌ | ❌ | — |

## Module: AI Assistant

| Feature | Creche Admin | Parent App | Caregiver App |
|---|---|---|---|
| AI chat assistant | ✅ | ✅ (separate assistant) | ❌ |
| Custom prompt / free-text questions | ✅ | ✅ | — |
| Prompt templates ("today's risk," "who's overdue") | ✅ | — | — |
| Adjustable AI tone/persona | ✅ (in settings) | — | — |
| Customizable AI name | ❌ (not yet exposed to end users) | — | — |
| Safeguards against misuse/jailbreaking | ⚠️ (ongoing hardening) | ⚠️ (has some refusal behavior) | — |

## Module: Reports & Analytics

| Feature | Creche Admin | Parent App | Caregiver App |
|---|---|---|---|
| Generate reports | ✅ | — | — |
| Export as CSV/Excel | ✅ | — | — |
| Export as PDF | ⚠️ (currently broken) | — | — |
| Send report to a recipient | ⚠️ (currently forced/bundled with generation) | — | — |
| Analytics dashboards (attendance, revenue, engagement) | ✅ | — | — |
| Audit trail of admin actions | ✅ (placement/retention still open questions) | — | — |

## Module: Settings & Account

| Feature | Creche Admin | Parent App | Caregiver App |
|---|---|---|---|
| Subscription / plan management | ✅ | — | — |
| Creche configuration | ❌ | — | — |
| Fee plan configuration | ❌ | — | — |
| Roles & permissions | ❌ | — | — |
| Notification rules configuration | ❌ | — | — |
| Language preference | — | ⚠️ (selection doesn't save) | — |
| Accessibility options (text size, contrast) | — | ⚠️ (controls don't actually change the UI) | — |
| Help & support / FAQ | ❌ | ⚠️ (static content, contact button non-functional) | ⚠️ (static content, non-functional) |
| About app / legal | — | ✅ | — |
| Find/browse creches | — | ✅ | — |
| Enrol at a creche | ✅ (receiving side) | ⚠️ (duplicates data already collected at sign-up) | — |

---

## Headline Takeaways

1. **Authentication is the most complete module across all three apps** — every app has working login and verification flows, though only the parent app captures Terms of Service, and only the caregiver app has PIN-based quick access.
2. **Almost nothing that should flow between apps actually connects yet.** Chat, daily logs, incidents, and payments all exist as UI on both ends but don't talk to each other — every cross-app feature in this matrix lands on ⚠️, not ✅.
3. **The admin app has by far the widest feature set** — most rows where Parent/Caregiver show ❌ are admin-only management tools (payroll, financial reports, compliance tracking) that were never meant to exist on the other two apps. That's expected and fine.
4. **The real risk areas** are the rows where a parent- or caregiver-facing counterpart clearly *should* exist but doesn't: authorized pickup persons, medication consent, admin-visible chat, and caregiver self-service (documents, leave requests). These are the gaps worth prioritizing, covered in more detail in the other gap-analysis documents in this folder.
