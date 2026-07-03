# Parent App & Caregiver App vs. Creche Admin (v2) — Data Gap Analysis

**Date:** 2026-07-03
**Prepared for:** CEven product & engineering team

## Why this document exists

CEven today is three applications:

- **Parent App** — live, used by parents.
- **Caregiver App (v1)** — live, used by creche staff/caregivers.
- **Creche Admin** — the newly rebuilt **version 2**, still in prototype, significantly more advanced than the live v1 admin it replaces.

Because the new Creche Admin was designed and built independently, it now models a lot of data — health records, structured medication schedules, authorized pickup lists, compliance documents, leave requests, parent ratings, and more — that the live Parent App and Caregiver App have **no way to produce or feed into it.**

This document answers one question: **for everything Creche Admin v2 expects to have data for, where is that data supposed to come from — and does that entry point exist today on the Parent App or Caregiver App?** The goal is to give engineering a concrete list of what needs to be added to the Parent App and Caregiver App so that Creche Admin v2's features are actually backed by real data once it goes live, rather than shipping a more advanced admin tool that has nothing feeding it.

**A note on how to read "gap":** two different situations get called a "gap" below, and they need different kinds of work:

- **Not captured at all** — there is no screen, field, or workflow anywhere today for a parent or caregiver to provide this information. This needs new product design and new screens.
- **Captured, but not connected** — a parent or caregiver can already enter this information in the app today, but it doesn't reach the Creche Admin record (either because the app doesn't save it permanently, or because the two apps simply aren't wired together yet). This is faster to close — it's an integration/engineering task, not a new design problem.

---

## Executive Summary

| Area | Status |
|---|---|
| Child health profile (allergies, medication, blood group, medical history) | **Captured, but not connected** |
| Authorized pickup persons (with photo ID) | **Not captured at all** |
| Daily logs (mood, meals, naps, hygiene) | **Captured, but not connected** |
| Medication administration & parent consent | **Partially not captured** |
| Incident reporting & parent acknowledgment | **Partially not captured** |
| Announcements & message read receipts | **Not captured at all** |
| Events / calendar with RSVP | **Not captured at all (any app)** |
| Parent-facing wallet / balance & online payment | **Not captured at all** |
| Parent engagement score & caregiver ratings | **Not captured at all** |
| Caregiver self-service (profile, documents, leave requests) | **Not captured at all** |
| Enrolment / admission intake form | **Partially connected** |

---

## Detailed Findings

### 1. Child Health Profile
Creche Admin expects a full structured health profile for every child: allergies, chronic conditions, blood group, current medications, medical notes, and supporting documents (e.g. prescriptions, medical clearance letters).

The good news: the Parent App **already has a step in its child sign-up process that collects almost exactly this** — allergies, chronic conditions, blood group, medications (with dosage and schedule), the child's paediatrician, and immunization history.

The problem: this information is only ever captured **once**, at the moment a parent adds a child. It isn't shown back to the parent afterward, can't be edited or updated later, and doesn't flow through to the record that Creche Admin displays.

**Verdict:** This is a connection problem, not a missing-feature problem. The data already being collected matches what admin needs almost field-for-field — it needs a permanent home, an edit path for parents, and a link to the admin record.

### 2. Authorized Pickup Persons
Creche Admin has a concept of "authorized persons" per child — people other than the parent allowed to pick the child up, each with a name, relationship, and contact details. Today, only admin staff can add or edit this list.

Separately, Creche Admin's front-desk check-in process already anticipates scenarios like "unauthorized pickup attempted" and "no ID presented" — meaning the product is designed around the assumption that pickup persons are verified, ideally with a photo on file.

**Verdict:** Not captured at all. There is currently no way for a parent to build or maintain their own list of authorized pickup persons, and no photo-ID capability exists anywhere in either app. This needs new design and new screens in the Parent App.

### 3. Daily Logs (Mood, Meals, Naps, Hygiene, Activities)
Creche Admin is explicitly built around caregivers submitting a daily log for each child — it tracks how many logs are submitted vs. pending each day, calculates a compliance percentage, and can send reminders to caregivers who haven't submitted.

The Caregiver App already has the matching forms for this — a caregiver can fill in mood, meals, nap times, hygiene, and general notes for a child. The issue is these forms don't currently save anywhere; when a caregiver fills one out and submits it, the information is simply discarded rather than being sent to the admin system.

**Verdict:** Connection problem. The right form already exists on the caregiver side; it needs to be wired up so submissions actually reach and persist in the shared record.

### 4. Medication Administration & Parent Consent
Creche Admin tracks the administration side of medication — who gave a scheduled medication and when, whether it was given on time, and a history log. What it does **not** have is any field for a parent's consent or standing authorization to give a specific medication in the first place.

On the caregiver side, "medications" is currently just a free-text note inside the daily report, not tied to any specific authorized order for that child.

**Verdict:** Two gaps here. First, there's no way for a parent to formally authorize a medication (not captured at all — new feature needed). Second, the caregiver's confirmation of giving medication is a loose note rather than a structured "confirm against an authorized order" action (a design + connection gap).

### 5. Incident Reporting & Parent Acknowledgment
Creche Admin can flag whether a parent has been notified about an incident (a one-way flag set by staff), but has no way to know if the parent actually saw it, acknowledged it, or wants to respond.

The Caregiver App already has an incident-reporting form (child, severity, description, action taken) — but like the daily logs, it isn't wired up to save or forward this information anywhere yet.

**Verdict:** The caregiver-side reporting needs to be connected (same fix as daily logs). Parent-side acknowledgment of an incident is not captured at all on either app and needs new design.

### 6. Announcements & Message Read Receipts
Creche Admin can send announcements and see only aggregate numbers — how many people it went out to, and how many opened it. There's no way to know which specific parent read it, and no built-in way for a parent to reply.

The Parent App has a comment box on daily reports that looks like it works, but pressing send doesn't actually deliver the comment anywhere — it just clears the box.

**Verdict:** Not captured at all. A real per-parent read/reply model doesn't exist on either side today; this needs new design work.

### 7. Events / Calendar with RSVP
Creche Admin has a basic events/calendar workflow with an approval step, but no RSVP tracking. Neither the Parent App nor the Caregiver App has an events screen of any kind.

**Verdict:** Missing across all three apps. Lower priority, since even the admin side isn't fully built out for this yet.

### 8. Parent-Facing Wallet / Balance & Online Payment
Creche Admin has a wallet system, but it's built for the **creche's own** finances — deposits, payouts, bank account linkage. There is no equivalent parent-facing wallet or running balance.

Separately, the Parent App has a fees & invoices screen and a billing history screen, both with "Pay Now" buttons — but neither button currently does anything when tapped.

**Verdict:** Not captured at all. The idea of a parent-facing balance/wallet doesn't exist yet as a concept, and even the payment buttons that are visually present aren't functional.

### 9. Parent Engagement Score & Caregiver Ratings
Creche Admin's parent-management screen shows metrics like "Average App Rating" and "Active in-app," and its staff leaderboard shows a "parent rating" for each caregiver — but none of these numbers are backed by any real data source. They are currently placeholder values.

**Verdict:** Not captured at all. These admin-facing metrics can't become real until the Parent App has a way for parents to actually rate/review caregivers, and until basic app-engagement activity (logins, opens, session activity) is tracked somewhere.

### 10. Caregiver Self-Service (Profile, Documents, Leave Requests)
Creche Admin's staff-management features — onboarding documents (ID, work history, compliance certificates), emergency contact info, and leave request review — are entirely admin-entered and admin-managed today.

The Caregiver App is otherwise fairly full-featured (it already has chat, tasks, attendance, and incident-reporting screens), but it has **no self-service screen at all** for a caregiver to manage their own profile, upload their own documents, or submit a leave request.

**Verdict:** Not captured at all. This is a fully missing category of functionality on the caregiver side, despite the admin side already being built to review/manage this exact data.

### 11. Enrolment / Admission Intake
Creche Admin lets a creche configure exactly what an admission/intake form should ask for (including medical history and emergency contact), and has a status for "more information requested" from a prospective family — implying there should be a way to send that request back to the parent and have them respond.

However, no screen in the Parent App actually reads or uses that configuration. Separately, the Parent App's own "enrol now" flow (from the creche-browsing screen) asks for medical information again in a plain text box, rather than reusing what was already collected during child sign-up.

**Verdict:** Partially connected. The intake requirements already exist on the admin side, and some of the collection UI exists on the parent side (from child sign-up) — but the two aren't linked, there's duplicate data entry, and there's no way for a parent to respond to a "more information requested" status.

---

## Recommended Build Order

**Phase 1 — Connect what already exists (fastest wins):**
1. Connect the Parent App's child health/feeding/development data into the shared child record Creche Admin reads from, and let parents edit it after initial entry.
2. Connect the Caregiver App's daily-log, activity-log, and incident-report forms so submissions actually reach Creche Admin.
3. Wire up the "Pay Now" buttons in both apps to a real payment flow.

**Phase 2 — New parent-facing capabilities Creche Admin assumes exist:**
4. Authorized pickup-person management with photo ID.
5. Medication consent / standing-authorization submission.
6. Per-parent read receipts and replies on announcements and incident notifications.
7. A screen for parents to respond to an admission "information requested" status, reusing existing child sign-up data instead of re-asking.

**Phase 3 — New caregiver-facing capabilities Creche Admin assumes exist:**
8. Caregiver self-service profile and document upload.
9. Caregiver leave-request submission.
10. Parent-rates-caregiver feedback, to make the "average rating" figures in admin real.
11. Events/calendar with RSVP.

**Why this order:** Phase 1 items require no new product design — the data being asked for already exists in the apps, it just isn't connected. That makes it the highest-value, lowest-effort place to start. Phases 2 and 3 require genuinely new screens and workflows and should be scoped as proper design tasks once Phase 1 is underway.
