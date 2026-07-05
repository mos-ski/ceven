# CEven — Complete V1 → V2 Gap Analysis (Admin, Parent, Caregiver)

**Date:** 2026-07-05
**Prepared for:** CEven product & engineering team
**Target go-live:** 15 July

## Purpose

This is the consolidated gap analysis requested to answer one question before go-live: **for everything the new Creche Admin (v2) has, does the live Parent App and live Caregiver App (v1) actually feed it real data — and is v2 itself complete enough to launch?**

It combines two sources:
1. A full walkthrough of every module in Creche Admin v2, checked field-by-field against what the Parent App and Caregiver App currently do.
2. Findings from the most recent product demo/standup, where the admin app was tested live and a number of bugs, unfinished modules, and undefined specs surfaced.

**Status key used throughout:**
- ✅ **Connected / working**
- ⚠️ **Exists, not connected** — a matching screen/field exists on the app in question, but it doesn't reach the admin record yet (an engineering wiring task, not a design gap)
- ❌ **Missing** — no screen or workflow for this exists at all
- 🐞 **Bug** — built, but not working correctly, found during testing
- ❓ **Undefined** — nobody has actually specified what this should do yet; needs a product decision before it can be built
- **N/A** — admin-internal; no reason a parent or caregiver app would need this

---

## Part A — Cross-App Data & Feature Gap Table

One row per module/data point in Creche Admin v2, with its status on the Parent App and Caregiver App.

### Children & People

| Feature / Data Point | Parent App (v1) | Caregiver App (v1) | Notes |
|---|---|---|---|
| Child identity (name, DOB, photo) | ⚠️ Exists, not connected | N/A | Collected at child sign-up, never reused elsewhere |
| Health profile (allergies, medication, blood group, medical notes) | ⚠️ Exists, not connected | N/A | Already collected almost field-for-field at sign-up; just needs a permanent, editable home |
| Prescriptions & medical documents (upload) | ❌ Missing | N/A | Only a generic profile photo upload exists |
| Growth log (height/weight) | ❌ Missing | ❌ Missing | No entry point on either app |
| Development milestones | ⚠️ Exists, not connected | ❌ Missing | Collected once at sign-up; no ongoing logging by caregivers |
| Authorized pickup persons | ❌ Missing | N/A | No self-service list; no photo-ID capability anywhere |
| Daily activity log (mood/meals/naps/hygiene) | N/A (view only) | ⚠️ Exists, not connected | Caregiver's log forms exist, don't persist |
| Parent contact info / profile | ⚠️ Exists, not connected | N/A | Edit screen exists but doesn't save |
| Parent app-engagement rating | ❌ Missing | N/A | Admin shows "Average App Rating" as a placeholder — no real data behind it |
| Enrolment intake (medical/emergency contact fields admin requires) | ⚠️ Exists, not connected | N/A | Duplicate collection — parent re-asked for info already given at sign-up |
| **Trial → Enrolled conversion step** | ❌ Missing (admin-side gap) | N/A | New finding: no way to move a child from "Trial" to actually enrolled — pipeline dead-ends |

### Staff / Caregiver

| Feature / Data Point | Parent App (v1) | Caregiver App (v1) | Notes |
|---|---|---|---|
| Caregiver ID / document upload | N/A | ❌ Missing | Entirely admin-entered today |
| Caregiver profile self-service (emergency contact, bank details) | N/A | ❌ Missing | No self-service screen |
| Leave request submission | N/A | ❌ Missing | Admin has a review screen; no submission screen |
| Compliance document upload/renewal | N/A | ❌ Missing | Admin-managed only |
| **Caregiver Compliance module** | N/A | ❓ Undefined | New finding: spec was never actually agreed — screen is blank |
| **"Lead Caregiver" role** | N/A | ❓ Undefined | New finding: role/responsibilities never defined; rooms can be created with no caregiver assigned |
| Parent-rates-caregiver feedback | ❌ Missing | N/A | Feeds a "parent rating" stat admin already displays with no real data |
| Response time to parent chat/requests (feeds compliance score) | N/A | ⚠️ Unconfirmed | New finding: this endpoint is believed to have migrated from v1, but nobody has verified it still works in v2 |

### Daily Operations

| Feature / Data Point | Parent App (v1) | Caregiver App (v1) | Notes |
|---|---|---|---|
| Check-in / check-out (Attendance & QR) | N/A | 🐞 Incomplete | New finding: confirmed unfinished core module — all stats show 0/placeholder |
| Pickup exception handling ("unauthorized pickup," "no ID") | ❌ Missing | N/A | Presupposes the authorized-pickup-persons feature, which doesn't exist |
| Incident reporting | N/A | ⚠️ Exists, not connected | Form exists, doesn't save; also 🐞 currently returning "unavailable/empty" in testing |
| Parent acknowledgment of incidents | ❌ Missing | N/A | No read/reply loop |
| Medication administration confirmation | N/A | ⚠️ Exists, not connected | Free-text note only, not tied to a specific authorized order |
| Medication consent / standing authorization | ❌ Missing | N/A | No consent-capture screen anywhere |
| Task completion | N/A | ⚠️ Exists, not connected | Marks complete in-session only, resets on reload |

### Communication

| Feature / Data Point | Parent App (v1) | Caregiver App (v1) | Notes |
|---|---|---|---|
| Chat (parent ↔ caregiver) | ⚠️ Exists, not connected | ⚠️ Exists, not connected | Both apps simulate chat locally with scripted replies |
| **Admin visibility into every chat thread** | ❌ Missing | ❌ Missing | New requirement from the standup: every thread should include Admin + both parents (if two guardians) + Caregiver, with admin able to see all conversations facility-wide, plus a participant list at the top of each thread |
| Special Requests (parent → caregiver task) | ❓ Unconfirmed | ❓ Unconfirmed | New finding: existed in v1; nobody has confirmed whether it survived the move to v2 on either app |
| Announcement read receipts / replies | ❌ Missing | N/A | Only aggregate counts exist on admin side |
| Events / RSVP | ❌ Missing | ❌ Missing | No events screen on either app; admin itself only has a partial version |

### Finance

| Feature / Data Point | Parent App (v1) | Caregiver App (v1) | Notes |
|---|---|---|---|
| Online payment ("Pay Now") | ⚠️ Exists, not connected | ⚠️ Exists, not connected | Button present on both, not wired to a real payment flow |
| Parent-facing wallet / balance | ❌ Missing | N/A | Only a creche-operator wallet exists; no parent equivalent |

---

## Part B — Admin V2 Internal Gaps (from the July 3 demo/standup)

These aren't parent/caregiver connection gaps — they're issues within the admin app itself, found while testing it live.

### Unfinished modules
- Attendance & QR check-in — not complete
- Account & Settings — 0 of 4 sub-sections built/reviewed (includes the Wallet system)
- Enrolment pipeline — missing the Trial → Enrolled conversion step
- Caregiver Compliance — undefined and empty

### Bugs found in testing
- PDF report export fails every time (CSV and Excel both work)
- Caregiver app throws an error logging an activity for a child whose enrollment status is "rejected"
- Standard/expected payments not displaying in one place on the AI/analytics view despite the underlying data existing
- Incident reporting returning "unavailable/empty" mid-test
- Room creation has no field to set a room's price
- Renaming a room can silently mark it "inactive" — unexplained
- A historical bug from v1 (deleting a room while children are still enrolled in it) is believed fixed in v2's front end, but hasn't actually been verified
- Dashboard's "AI Daily Brief" component was never wired in — an accidental omission

### Undefined specs (need a product decision, not just engineering)
- Caregiver Compliance — what should it actually measure?
- "Lead Caregiver" — what is this role, and should a room be allowed to exist without one?
- Audit Trail retention — expire after a fixed period (e.g. 90 days) or keep indefinitely?
- AI assistant default name and how much creches can customize it

### Smaller UX/product feedback
- Onboarding checklist should drop completed steps from view instead of just checking them off
- Report generation should not force picking a recipient — should be possible to just generate/view a report, with a separate "send to" action afterward
- Remove the "Generated by [AI]" label from reports
- Move Audit Trail out from under the AI/Intelligence section into Account & Settings
- Add filtering (action type, user, pass/fail), sorting, and export to Audit Trail
- Keep search scoped to the current page rather than one global search bar
- Fix an outdated product logo appearing in the UI
- Explore a less monochrome color scheme
- Continue hardening the AI assistant against being "tricked" into giving restricted information

---

## Part C — Priority Roadmap to Go-Live

**P0 — must resolve before 15 July:**
1. Finish Attendance & QR check-in
2. Build out Account & Settings, including the Wallet system
3. Fix the Trial → Enrolled conversion gap
4. Fix PDF export
5. Confirm whether Special Requests and the caregiver response-time endpoint actually made it into v2 — if not, decide whether that's acceptable for launch or must be restored
6. Get a decision on Caregiver Compliance and "Lead Caregiver," even if the actual build slips past launch

**P1 — connect what already exists (parent/caregiver data → admin):**
7. Persist the parent app's child health/sign-up data into the record admin reads, with an edit path
8. Persist caregiver daily-log, incident, and task-completion submissions
9. Wire up "Pay Now" in both apps to a real payment flow

**P2 — net-new features, can follow launch:**
10. Admin-visible, multi-party chat (Admin + both parents + caregiver)
11. Authorized pickup persons with photo ID
12. Medication consent from parents
13. Per-parent read receipts/replies on announcements and incidents
14. Caregiver self-service (profile, documents, leave requests)
15. Parent-rates-caregiver feedback
16. Events/RSVP

**Ongoing, not launch-blocking:**
- Audit Trail placement, filters, retention policy
- Visual/branding polish (logo, color scheme)
- AI hardening against manipulation
- Search UX improvements

---

## Open Decisions Log

Items that need a product/business call, not more engineering, before they can be closed out:

- What exactly should "Caregiver Compliance" measure?
- What is a "Lead Caregiver," and is a room without one a valid state?
- How long should Audit Trail data be retained?
- What's the default AI assistant name, and how much can a creche customize it?
- Is the admin-visible multi-party chat redesign happening before or after launch?
- Should report generation ever require a mandatory recipient, or always be optional?
