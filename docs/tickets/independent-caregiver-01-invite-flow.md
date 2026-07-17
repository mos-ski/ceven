# Invite Caregiver (Parent → Caregiver)

**Type:** Story · **Component:** Child Management (cross-app: Parent + Caregiver) · **Screen ID:** TBD · **Plan tier:** All Plans

## Summary
Let a parent invite an independent caregiver directly from their child's profile, generating a link/code the caregiver uses to sign up (or attach to her existing account) and establish a direct reporting relationship — no Creche intermediary required.

## Background / Why
Reference: `docs/strategy/workspace-ownership-2026-07-13.md`. Independent caregivers break CEven's "Creche owns everything" assumption. Rather than have the caregiver create a workspace and invite parents (which pushes CEven into being a discovery/marketplace layer — a much bigger trust/liability lift, per the strategy doc), we invert the direction: **the parent already has the caregiver relationship** (referral, private hire) and just wants CEven for daily updates and accountability. CEven never introduces the parent to the caregiver, so no matchmaking, no background-check obligation, no marketplace liability. This is the lean, low-risk entry point into the broader workspace-ownership strategy — it intentionally defers billing, business-config onboarding, and trust/verification infrastructure until they're actually asked for.

## User Stories
- As a parent, I want to invite my child's caregiver directly from their profile so I can start receiving daily updates without needing a Creche.
- As a parent, I want to clearly see when a child has no caregiver assigned, so I know I need to send an invite.
- As an independent caregiver, I want to accept a parent's invite and land directly on the child I'm now responsible for, without a business-setup wizard.
- As an independent caregiver already on CEven, I want a new parent's invite to attach to my existing account rather than creating a duplicate profile.
- As a parent, I want the invite link to be single-use and expiring, so a stranger can't intercept it and pose as my caregiver.
- As a parent, I want to revoke a pending invite or remove an active caregiver later.

## Flow
1. **Parent → Child Profile** (`app/(parent)/parent/child/page.tsx`): the existing "Caregiver" row (currently always shows `mockChild.caregiver`, line ~48-56) needs an empty state — "No caregiver assigned" — with an **"Invite Caregiver"** CTA, shown independently of any Creche-assigned caregiver (a child can have both a Creche caregiver and an independent one).
2. Tapping "Invite Caregiver" opens an invite modal: caregiver's name + phone number (phone doubles as the OTP anchor) → generates a unique, single-use, expiring invite link.
3. Parent shares the link via the device share sheet (SMS/WhatsApp/etc).
4. Caregiver taps the link:
   - **New to CEven:** lands on caregiver signup, phone number pre-filled and OTP-verified against the number the parent entered → account created, invite auto-accepted into it.
   - **Existing CEven caregiver:** prompted to log in (or auto-matched by phone) → the new relationship is added to her existing account; no duplicate profile is created.
5. On accept: caregiver's app shows this child under a "My Families"/"My Children" list (aggregating all her accepted invites across unrelated parents); parent's child profile shows the caregiver as assigned.
6. Parent gets a notification confirming the caregiver accepted.

## Acceptance Criteria
- [ ] Child profile shows an explicit "No caregiver assigned" empty state when no independent-caregiver relationship exists, independent of Creche-assignment status.
- [ ] "Invite Caregiver" CTA is always available on the child profile (parent can invite a replacement/additional caregiver at any time).
- [ ] Invite modal captures caregiver name + phone number and generates a unique link/code.
- [ ] Invite link is single-use and expires if unaccepted (default 7 days — confirm with Lola).
- [ ] Accepting the link requires OTP verification against the phone number the parent entered, before signup/attach completes.
- [ ] If the verified phone number matches an existing caregiver account, the invite attaches as a new relationship to that account — never creates a duplicate caregiver profile.
- [ ] If the phone number is new, the caregiver completes standard signup and lands directly in the accepted relationship — no generic "set up your business" step.
- [ ] Caregiver app shows a "My Families"/"My Children" list aggregating every accepted invite, across different parents.
- [ ] Parent receives a notification when the caregiver accepts.
- [ ] Parent can revoke a pending (unaccepted) invite.
- [ ] Parent can remove an active independent-caregiver relationship after the fact.
- [ ] A child can simultaneously show a Creche-assigned caregiver and a parent-invited independent caregiver as distinct entries — the two are not mutually exclusive.
- [ ] Expired or already-used links show a clear error state on tap, not a silent failure or generic 404.

## Out of Scope (v1)
- Billing/payment requests between parent and independent caregiver.
- Any identity/background-check verification beyond phone OTP.
- Independent-caregiver "workspace" business settings (staff management, plan tiers, admin dashboard) — she only needs her families list and the existing daily-update tools.
- Caregiver-initiated invites (caregiver inviting a parent) — this ticket is parent-initiated only; that direction is the original Creche-style flow and isn't part of this scope.

## Definition of Done
- Full flow verified end-to-end at mobile breakpoint (390px) on both the parent and caregiver apps: invite → link share → accept (both new-signup and existing-account paths) → relationship visible on both sides.
- Expired/reused link states verified, not just the happy path.
- No duplicate caregiver accounts produced when the same phone number accepts invites from two different parents.
- No console errors; invite modal and OTP inputs are functionally wired (not decorative), consistent with this repo's mock-data-only scope.

## Notes / Risks
- This repo is frontend-only (no backend, per `docs/pm-notes.md`) — build here as a clickable mock-data reference (fake link generation, static OTP acceptance), then hand to the official V2 dev team for real backend wiring (actual link issuance, OTP delivery, account linkage, duplicate-detection).
- Open question for Lola/leadership: is phone-OTP alone a sufficient trust bar at launch, or should stronger verification be layered in before this ships broadly?
- Open question: default invite-link expiry window (proposed 7 days above, needs confirmation).
- This ticket is Phase 1 of the broader strategy in `docs/strategy/workspace-ownership-2026-07-13.md`; billing, the generalized Workspace Dashboard, and trust/safety hardening are later phases, not prerequisites for this one.

**Story points:** TBD
