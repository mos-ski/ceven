# CEven — Parent Membership & External Account Management Rework

**Type:** Product Change Proposal · **Status:** Proposed · **Priority:** P0 (Apple Submission Blocker) · **Date:** 2026-07-24

|                |                                                    |
| -------------- | -------------------------------------------------- |
| **Owner**      | Product                                             |
| **Stakeholders** | Engineering, Design, COO, Compliance, Customer Success |

## Background

The iOS application has been rejected multiple times during App Store Review due to concerns around subscription handling.

The current experience exposes premium functionality inside the application in a way that may be interpreted as selling digital features without using Apple's In-App Purchase system.

At the same time, CEven also supports real-world childcare payments such as:

- School fees
- Acceptance fees
- Feeding
- Extra lessons
- Other crèche charges

These are legitimate real-world services that are managed between parents and the childcare provider.

The objective is to redesign the account management experience so the application is clearly positioned as a childcare management platform first, while moving account management outside the mobile app.

## Objectives

The redesigned experience should:

- Position CEven primarily as a childcare management platform.
- Make the web portal the primary destination for account management.
- Reduce App Store rejection risk.
- Preserve the ability to monetize Parent Membership.
- Keep the in-app experience compliant and non-promotional.

## Product Principles

The application should never appear to exist primarily for selling subscriptions.

The application exists to help parents:

- Manage their children.
- Communicate with caregivers.
- View reports.
- Receive updates.
- Pay childcare-related fees.

Membership should feel secondary.

## New Information Architecture

### Mobile App

**Purpose:** Manage your childcare experience.

Users should not be encouraged to purchase anything from inside the app. The app should simply indicate whether features are available on the account.

### Web Portal

**Purpose:** Manage your account.

The web portal becomes the destination for:

- Membership
- Billing
- Payment methods
- School fees
- Acceptance fees
- Payment history
- Receipts
- Family account management

### Manage Account

Selecting **Manage Account** should securely authenticate the parent into `ceven.app/me` using an existing authenticated token.

The web portal becomes the single place for:

- Membership management
- Payment methods
- Receipts
- School fees
- Acceptance fees
- Family billing
- Account settings

## Mobile Copy Guidelines

Avoid language such as:

- Subscribe
- Upgrade
- Buy
- Unlock
- Premium
- Purchase Now

Instead use:

- Manage Account
- Membership Status
- Trial Status
- Account Status
- Feature unavailable on your account

## Feature Limitation Messaging

Instead of:
> Subscribe to unlock AI

Use:
> This feature isn't currently available on your account.
> **Button:** Manage Account

Instead of:
> Upgrade to Premium

Use:
> Your trial has ended. Some family features are unavailable.
> **Button:** Manage Account

## Parent Membership Positioning

Do not market AI as a standalone subscription. Instead position it as one feature included within Parent Membership.

Example benefits:

- AI Family Assistant
- Extended report history
- Advanced family insights
- Additional family members
- Priority support
- Enhanced communication features

AI should never appear to be the primary item being purchased.

## Manage Account Web Experience

The first screen should resemble a traditional account portal rather than a subscription sales page.

Suggested navigation:

- Membership
- School Fees
- Acceptance Fees
- Payment History
- Receipts
- Payment Methods
- Family Profiles
- Authorized Pickups
- Security

Pricing and plan comparison should not be the landing experience.

## Mobile Navigation Changes

```
Settings
  ↓
Manage Account
  ↓
Launch external web portal
```

No pricing should be displayed before leaving the application.

## AI Trial

New users may continue receiving a free trial. When the trial ends:

Do not present pricing. Display:
> Your trial has ended. Some family features are unavailable.
> **Button:** Manage Account

## Design Requirements

The account management screen inside iOS should look like an account settings page rather than a purchase page.

Avoid:

- Price cards
- Upgrade banners
- Promotional graphics
- Feature comparison tables
- Countdown timers encouraging purchase

Prefer:

- Simple navigation
- Neutral language
- Settings-style UI
- Account management terminology

## Engineering Tasks

### Mobile

- Remove all subscription and pricing references.
- Replace upgrade messaging with account-status messaging.
- Replace all "Upgrade" buttons with "Manage Account."
- Pass authenticated token into `ceven.app/me`.
- Ensure seamless login to the web portal.

### Web

Build a dedicated Parent Account Portal including:

- Membership
- Billing
- Payment methods
- School fees
- Acceptance fees
- Payment history
- Receipts
- Family account management

### UX

Rewrite all subscription-related copy to follow the new messaging guidelines. Review every paywall to ensure it uses neutral account-management language.

### QA

Review the entire parent experience and verify:

- No pricing appears inside the mobile application.
- No "Upgrade" language remains.
- Every restricted feature routes to Manage Account.
- Account deep-linking functions correctly.
- Trial messaging is consistent.

## Success Metrics

- Successful App Store approval.
- Reduced App Review feedback related to payments.
- Parents can manage both childcare payments and membership from a single account portal.
- No disruption to existing subscription or billing flows.
