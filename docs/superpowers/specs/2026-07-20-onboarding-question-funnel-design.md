# Pre-signup onboarding question funnel

## Context

CEven's landing site currently sends every visitor straight to a plain, single-screen email/password form:
- `/signup` (admin/director — creche name, email, password)
- `/parent/auth/signup` (parent — email/phone, password)

There is no qualification or persona-branching step, unlike brightwheel's multi-step "tell us about yourself" funnel (persona select → intent → org-specific questions → email → account).

This spec designs an equivalent multi-step **marketing-site funnel** that sits in front of signup. It does not replace the existing signup forms — it feeds into them (admin) or into an app-download handoff (parent, caregiver).

This also formalizes a new persona CEven is extending to: the **independent caregiver** — someone who works for a family directly, without being tied to a creche. This flow is the first entry point for that persona.

## Goals

- Qualify and route visitors into the right persona track before they hit a signup form.
- Capture useful context per persona (creche size, parent intent, caregiver situation) without over-asking.
- Respect that parents and caregivers live in the **mobile app**, not the web — their track ends in an app-download handoff, not a web signup form. Admin lives on the **web dashboard** — their track ends by handing off into the existing `/signup` form.
- Provide an escape hatch for returning users who land on the funnel by mistake.

## Out of scope

- Redesigning the existing `/signup`, `/parent/auth/signup`, or caregiver invite flows themselves.
- Building the actual caregiver discovery/matching feature (location/availability/experience data is captured now for future use, per product direction — "we will expand the caregiver module as time goes on").
- Backend/API work to persist funnel answers — this spec covers the question flow and UI; persistence approach is a follow-up implementation concern.

## Flow structure

### Step 1 (shared) — Persona select

**"First, tell us about yourself."**

- I'm a creche admin/director
- I'm a parent/guardian
- I'm an independent caregiver
- *(secondary link, not a card)* "Already have an account? Log in" → `/login`

Each persona branches into its own track below. Step count differs per track, so the progress indicator shows a dynamic "Step X of Y" recalculated once a persona (and, where relevant, a sub-branch) is chosen — not a faked fixed total.

---

### Track A — Admin/Director

1. **"What's your creche's enrollment capacity?"**
   Number input + slider, range 1–100+ (mirrors brightwheel's pattern).

2. **"How many locations does your creche have?"**
   Single-select: `1 location` / `2+ locations`

3. **"What are you using to run your creche today?"**
   Single-select cards: `Paper & WhatsApp groups` / `Spreadsheets` / `Another software` / `Nothing yet — just started`

4. **"How many staff/caregivers work at your creche?"**
   Single-select ranges: `1–5` / `6–15` / `16–30` / `30+`

5. **"What's your email?"**
   Text input, email validation.

**Ending:** "Continue" redirects to `/signup?email=<value>` — the existing admin signup form, pre-filled with email, where the creche name and password are set and the account is actually created. This is a web-native flow end to end, so there's no app-download step.

Total: 6 steps (persona-select + 4 qualifying + email).

---

### Track B — Parent/Guardian

2. **"What brings you to CEven?"**
   Single-select: `My child's creche uses CEven` / `I want to find/manage an independent caregiver` / `Both`

   Depending on the answer, run one or both of the sub-branches below, in this order: creche sub-branch, then caregiver sub-branch.

**Creche sub-branch:**
- **"Find your child's creche"** — search input against known creches. If no match, flag softly as "not yet on CEven" (this becomes a lead for creche acquisition, not a blocking error).
- **"How many children, and how old are they?"** — count selector + age range per child.

**Caregiver sub-branch:**
- **"Do you already have a caregiver in mind?"** — Yes / No
- **"How many children, and how old are they?"** — count selector + age range per child (skip if already answered in the creche sub-branch under "Both").
- **"What kind of care are you looking for?"** — single-select: `Full-time` / `Part-time` / `Occasional`
- **"Where are you located?"** — Nigeria city/area picker.

**Final step — "What's your name and email?"**
Name + email (required), with an inline option: **"Also send this to my WhatsApp"** — reveals a phone number field if not already collected.

**Ending:** Submitting shows an **app-download handoff screen**, not a web account. This screen:
- Shows Google Play / App Store badges.
- Confirms "We've sent the download link to your email."
- If a phone number was given (or added via the WhatsApp toggle), also confirms "...and to your WhatsApp."

Actual account creation (password/OTP) happens inside the mobile app after install, using the existing `/parent/auth/signup` → `/parent/auth/verify` OTP pattern.

---

### Track C — Independent Caregiver

2. **"Do you already have a family you work with?"**
   - **Yes** → skip directly to the final step. Kept minimal because the parent's in-app invite is what actually connects them — no need to duplicate profile questions here.
   - **No** → continue to the discovery/profile questions below.

**Discovery sub-branch (if "No"):**
- **"How many years of experience do you have?"** — single-select ranges: `<1` / `1–3` / `3–5` / `5+`
- **"Where are you located?"** — Nigeria city/area picker.
- **"What's your availability?"** — single-select: `Full-time` / `Part-time` / `Occasional`
- **"What age groups are you comfortable with?"** — multi-select: `Infants (0–1)` / `Toddlers (1–3)` / `Preschool (3–5)` / `School-age (5+)`

**Final step — "What's your name and email?"**
Same pattern as the parent track: name + email + optional WhatsApp phone.

**Ending:** Same app-download handoff screen as the parent track (Google Play / App Store badges, email confirmation, optional WhatsApp confirmation).

---

## Open items for a follow-up round

These weren't nailed down in this pass and should be resolved before/while writing the implementation plan:

- Exact copy for the "not yet on CEven" soft-lead state in the parent creche sub-branch.
- Whether funnel answers get persisted anywhere before the final step (e.g., analytics, partial-lead capture on drop-off) or only submitted at the very end.
- Visual/component design of the funnel screens (this spec only covers flow and question content, not layout/styling).
- Whether "How did you hear about us?" or similar growth-attribution questions should be added — raised but not decided in this round.

## Summary of step counts

| Track | Steps (incl. persona-select) |
|---|---|
| Admin/Director | 6 |
| Parent — creche only | 5 |
| Parent — caregiver only | 7 |
| Parent — both | 8 |
| Caregiver — has family | 3 |
| Caregiver — discovery | 7 |
