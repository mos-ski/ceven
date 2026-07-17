# Strategy: Workspace Ownership for Independent Caregivers

**Type:** Strategy / Architecture Brief · **Component:** Cross-cutting (Auth, Permissions, Onboarding, Admin Dashboard, Finance) · **Date:** 2026-07-13

## Summary

A customer wants to use CEven as an **independent caregiver** with no Creche above her — she'd own her own workspace, invite parents directly, and manage multiple children solo. This breaks the product's foundational assumption that every caregiver belongs to a Creche. The proposed fix — "Workspace Ownership," where a workspace can be owned by a Creche or an Independent Caregiver — is **directionally right, but incomplete as framed.**

**The core reframe:** the assumption that actually breaks isn't "who owns the workspace." It's that **owner and worker are always different people.** Today, Creche = owner/admin role, Caregiver = staff/operator role, and they're cleanly separate — different people, different apps (web vs. mobile), different permissions. The independent caregiver collapses both into one human. If we patch this by adding a third hardcoded "owner type" without addressing *that*, the model breaks again at the next edge case — a two-person team, a Creche owner who also floors, a caregiver who later hires help. Fix the underlying shape once: move from **role-as-identity** to **capability-based, additive permissions.**

Grounded in what's actually in this repo today (relevant since it's the fastest way to sanity-check the current model): there is **no role enum, no `crecheId`/`organizationId`/`workspaceId` field anywhere in the codebase.** Roles are purely implicit via route groups (`app/(admin)`, `app/(caregiver)`, `app/(parent)`), the admin nav is one static unconditional list, and the only "onboarding" that exists is a 3-slide marketing carousel with no role or org questions. This is good news: **there's no real backend data model yet, so there's no migration debt.** This is a green-field moment to get the entity model right before the official V2 team builds it, not a retrofit.

---

## 1. Is "Workspace Ownership" the right architectural direction?

Yes — but as currently scoped it only solves "who owns the workspace," not "who can do what inside it." An independent caregiver isn't just a workspace with a different owner *type*; she's a person holding two roles simultaneously (owner + operator) that the product currently assumes are always separate people. Ship Workspace Ownership, but pair it with a capability layer (see Q6) or it will need a second rework the moment a second edge case shows up — which, per Q9, it will.

## 2. Is there a better approach?

Not a *replacement* — a sharper frame for the same idea, borrowed from patterns like Stripe Connect accounts (`individual` vs `company`) or Slack/Notion (personal vs team workspace):

- Model a **Provider** entity with `ownerType: organization | individual`, instead of thinking of it as "Creche vs Caregiver." This decouples the entity type from any specific vertical's naming and will matter directly for Q9.
- Model **permissions as additive capabilities** (`ManageBilling`, `InviteParents`, `AssignCaregivers`, `RecordDailyUpdates`, `ManageStaff`, …) that any user in a workspace can hold some combination of — not a fixed enum of roles. An independent caregiver is simply a user holding the full set. A Creche's floor staff hold only the operational subset. A hybrid owner-operator Creche admin holds both.

This is the same direction you proposed, just naming the actual primitive (capabilities) rather than stopping at the container (workspace owner type).

## 3. What assumptions are missing?

- **Growth path.** A solo caregiver may hire help and become a 2-3 person team. The model must let a workspace grow from individual → small team without re-onboarding or a data migration. If "individual" and "organization" are hardcoded as separate, incompatible schemas, this breaks immediately.
- **Billing model mismatch.** Per confirmed team decisions, Creche billing is **room/class-based** (a fixed fee tied to the room a child is enrolled in). An independent caregiver has no "rooms." This isn't a detail — it's a structural break in the Finance module's current data model, which needs a generalized rate-plan abstraction (room-based, flat per-child, hourly) before independent caregivers can bill anyone.
- **Parents may have multiple simultaneous providers** (a Creche for daytime + an independent caregiver for evenings/backup), not one provider for life. The parent-side data model should support multiple concurrent provider relationships, not one.
- **The big one: CEven becomes a two-sided trust marketplace.** A Creche carries institutional trust — business registration, a physical premises, staff who were vetted by the Creche before CEven ever saw them. An independent caregiver has none of that scaffolding; she IS the whole business. The moment CEven lets a parent discover and engage her directly, CEven becomes the party vouching for her — background checks, ID verification, insurance, dispute resolution. This is a liability and business-model question, not just a data-model one, and it's bigger than anything else in this list.
- **Ownership isn't always singular.** Two partners co-running a Creche, or a small collective of independent caregivers pooling clients, don't fit a single-owner-per-workspace model either.

## 4. What are the risks?

- **Permission-complexity explosion.** Every feature, nav item, and access check now has to reason about workspace type. Per the current gap analysis, the product already has significant unfinished surface (no real AI system, Settings mostly missing, Finance in progress) — adding a new variability axis before the core single-Creche product is functionally complete compounds an already-behind roadmap.
- **Billing rework** is not optional — it's a prerequisite, not a nice-to-have, the moment an independent caregiver needs to invoice anyone.
- **Marketplace liability exposure.** If CEven is now matching parents to unvetted individuals, an incident involving an independent caregiver found via CEven is a materially different risk than an incident at a Creche CEven merely provides software to.
- **Scope creep from one customer.** One anecdote isn't a segment. Committing a multi-quarter architecture shift on one data point risks building for a market that may be tiny, or may need something quite different than what one customer described.
- **Roadmap collision.** This is foundational work competing for the same engineering time as finishing Finance, Settings, and the AI system. It needs explicit sequencing, not silent absorption into the current sprint.

## 5. One product, or split into separate products?

**One product, one backend.** The operational value — daily updates, feeding/sleep/medication logs, photos, messaging — is ~80% of the product and 100% shared between a Creche caregiver and an independent one. Splitting into separate products duplicates that 80% to differentiate a 20% management/billing layer. Differentiate via workspace type + capabilities and configuration-driven UI, the way you originally proposed — that instinct was correct. The one caveat: package and price it as a distinct **plan/tier** ("CEven Solo") for go-to-market and trust-messaging clarity, even though the codebase stays unified.

## 6. How should permissions be redesigned?

Three orthogonal axes, not one role enum:

1. **Workspace type** — `organization | individual` (extensible later).
2. **Membership role** — Owner, Admin, Staff/Caregiver (who's formally in the workspace).
3. **Capability set** — additive, not exclusive: `ManageBilling`, `InviteParents`, `AssignCaregivers`, `ManageStaff`, `RecordDailyUpdates`, `MessageParents`, etc.

A user's access = the union of capabilities granted by their membership role in that workspace. An independent caregiver is a user with the full capability set in an `individual` workspace. A Creche's floor staff hold only the operational subset. A Creche admin who also does hands-on care holds both — which is exactly the case today's role-as-surface model can't express. This also directly answers Q9: new verticals get new capabilities added to the same primitive, not new role systems built from scratch.

## 7. Should caregivers get a web dashboard?

Gate by **capability**, not identity. Don't branch on "is this user a Caregiver or a Creche Admin" — branch on "does this user hold admin-type capabilities in this workspace." Anyone who does (an independent caregiver, or a Creche admin who also floors) sees the generalized Workspace Dashboard; anyone who only holds operational capabilities stays mobile-only, unchanged from today. Your instinct to generalize the Creche Admin dashboard into a capability-driven Workspace Dashboard is correct — validate it against exactly this rule rather than "is this a caregiver."

Practically: ship the management surface **web-first** (it reuses the existing admin dashboard almost as-is) and treat a slim mobile "my business" tab as a fast-follow, not a v1 blocker — independent caregivers will want some of this on the go, but building full admin parity on mobile shouldn't gate launch.

## 8. How should onboarding be redesigned?

Keep it lean — 2-3 questions, not a Jira-style wizard:

- **"What best describes you?"** — Parent / Independent Caregiver / Creche or Daycare Business.
- For provider types, one follow-up that's really doing double duty: team size (solo vs. multiple staff) — this can *derive* workspace type rather than asking it as a separate abstract question.
- Everything else — inviting staff, setting up billing, configuring rooms — should be **progressive disclosure inside the product**, triggered by the moment it's needed (e.g., "Invite your first staff member" appears the instant a solo caregiver tries to add a second person), not front-loaded.
- Critically: **workspace type must be changeable after onboarding**, not a one-time fork. A solo caregiver who grows into a team should upgrade in place, not redo onboarding or migrate data. This is the direct product consequence of the growth-path assumption in Q3.

## 9. Does this scale to tutors, nannies, therapists, elderly caregivers, pet sitters?

Only if one more thing is fixed alongside Workspace Ownership: **the domain-specific update types are currently modeled as if "child" is baked into the core**, not just into a plugin. Feeding/Sleeping/Medication/Bathroom logs are child-specific; elder care needs some overlapping fields (medication) but not others (feeding); tutoring needs sessions/homework, not any of the above; pet sitting needs neither. Workspace ownership + capability-based permissions generalize cleanly across verticals — but the update-log schema won't unless it's abstracted into a pluggable **"care-domain template"** that each vertical defines, sitting behind the generic scaffolding (workspace, permissions, billing, messaging, which stay identical across verticals).

**Recommendation: don't build this abstraction now.** Just don't let the workspace-ownership refactor bake "child" any deeper into the core data model than it already is, so the door stays open when/if this expansion is actually pursued.

## 10. High-level roadmap

- **Phase 0 — Validate.** Confirm this is a real segment, not one anecdote — how many prospective independent caregivers exist? Decide the business model implication head-on: subscription tier vs. marketplace take-rate, and whether CEven is willing to take on trust/verification obligations (background checks, insurance) that come with directly connecting parents to individuals.
- **Phase 1 — Backend data model foundation** (official V2 team, invisible to users). Introduce a Workspace/Provider entity with `ownerType`; migrate existing Creche records into it as `organization`-type (no existing records to break, per the code survey); introduce capability primitives decoupled from role labels; generalize the billing model beyond room/class into rate plans (room-based, flat-per-child, hourly), coordinated with the in-progress Finance module.
- **Phase 2 — Branching onboarding.** The 2-3 question flow from Q8, plus in-workspace settings to let a solo caregiver add staff and grow into team mode without migration.
- **Phase 3 — Generalize the Admin dashboard → Workspace Dashboard.** Conditionally render nav/features by capability set (not hardcoded role); ship the independent-caregiver-relevant subset first (invite parents, manage assigned children, reports, messaging, billing) since it's the smallest surface.
- **Phase 4 — Parent-side changes.** Support parent relationships with either an organization or an individual provider in discovery and in-app; surface trust/verification signals differently for independent providers.
- **Phase 5 — Trust & safety hardening.** Background-check integration, dispute/support process for the now-marketplace-shaped relationship, updated insurance/liability terms.

**Sequencing note:** this should run *after or alongside, but not ahead of*, closing the core single-Creche gaps already identified (no real AI system, Settings mostly missing, Finance in progress) — unless the independent-caregiver customer is a committed, paying deal with a real deadline forcing the order. Given this repo is a frontend-only prototype separate from the official backend build, it's a reasonable place to *prototype* the branching onboarding and capability-gated dashboard UI to hand to the dev team — the actual entity modeling work belongs on their side, ideally before they've hardcoded the Creche-owns-everything assumption into a real schema.
