# Super Admin — Go-Live Test Plan

**Total test cases:** 77 · **Modules covered:** 6 · **High priority:** 10

How to use this doc: work through it module by module, screen by screen. For each row, perform the Test Case and compare against Expected Result, then fill in **Status** (Pass / Fail / Blocked) and **Comment**.

---

## Global Shell

### Sidebar / Topbar

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Sidebar | Click each of 5 nav links (Dashboard/Creche Enrollment/Creches/Subscription Mgt/Notifications) | Navigates correctly, active state highlights on exact pathname match | Medium | Not Tested |  |
| Sidebar | Navigate to a nested detail route (e.g. creches/child/[id]) | Sidebar active-highlight should still show 'Creches' as active | Medium | Not Tested |  |
| Topbar | Navigate to an unmatched detail route | Page title should reflect the actual section | Medium | Not Tested |  |
| Topbar | Click the Bell/Notifications icon | Should open a notification panel | Medium | Not Tested |  |
| Root route | Visit bare root admin path | Hard-redirects to dashboard | Medium | Not Tested |  |

## Dashboard

### Dashboard

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Tabs | Switch Growth/Financials/Engagement | Each renders correct stat cards + chart | Medium | Not Tested |  |
| Tabs | Switch tabs then reload the page | Tab selection should persist | Low | Not Tested |  |
| Month selector | Change the month dropdown | Displayed data in all 3 tabs should update | High | Not Tested |  |
| Growth tab | Verify 4 stat cards + Platform Growth Trends line chart (creches/parents/children series) | Matches data | Medium | Not Tested |  |
| Financials tab | Verify MRR/ARPC/Churn Rate/Subscription Tiers stat cards | Values render correctly | Medium | Not Tested |  |
| Financials tab | Verify Revenue Growth Trend chart (MRR vs ARPC, ₦-formatted) | Renders correctly | Medium | Not Tested |  |
| Engagement tab | Verify Daily/Weekly/Monthly Login stat cards (Parents % / Caregivers % split) + Login Frequency bar chart | Matches expected behavior, no errors | Medium | Not Tested |  |

## Creches

### Creches — List

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header stat | Verify 'Total Creches' count matches data | Matches expected behavior, no errors | Medium | Not Tested |  |
| Search | Search by creche name or email | Filters live, case-insensitive | Medium | Not Tested |  |
| Toolbar | Click Sort by / Export as / Print buttons | Should perform their described action | Low | Not Tested |  |
| Table | Click a Creche Name link | Navigates to creche detail page | Medium | Not Tested |  |
| Table | Kebab menu → 'View Details' | Should show creche detail | Medium | Not Tested |  |
| Table | Kebab menu → 'Caregivers' | Navigates to creche caregivers page | Medium | Not Tested |  |
| Table | Kebab menu → 'Rooms' | Should show the creche's rooms | High | Not Tested |  |
| Empty state | Search to zero matches | 'No creches found.' row shows spanning all columns | Medium | Not Tested |  |
| Pagination | Click Prev/Next/numbered pages | Should page through records | Low | Not Tested |  |

### Creches — Assigned Children Caregiver

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header | Click '← Back to Creches' | Navigates to creches list | Medium | Not Tested |  |
| Header card | Visit with an invalid caregiver id | Caregiver name subtitle should be omitted gracefully, no crash | Medium | Not Tested |  |
| Toolbar | Type in the Search box | Should filter the assigned-children table | High | Not Tested |  |
| Toolbar | Click Sort by / Export as / Print | Should perform action | Low | Not Tested |  |
| Table | Click 'View Details' on a child row | Navigates to child profile | Medium | Not Tested |  |
| Pagination | Click Prev/Next chevrons | Should page | Low | Not Tested |  |

### Creches — Caregivers

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header card | Verify Total Caregivers count + creche name subtitle (looked up by id) | Matches expected behavior, no errors | Medium | Not Tested |  |
| Toolbar | Type in the Search box | Should filter the caregivers table | High | Not Tested |  |
| Table | Click 'View Details' on a caregiver row | Navigates to caregiver detail | Medium | Not Tested |  |
| Empty state | Test with an empty caregivers dataset | Should show an explicit empty-state message | Medium | Not Tested |  |

### Creches — Child Profile

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Invalid id handling | Visit with a nonexistent child id | Should show a not-found state | High | Not Tested |  |
| Tabs | Switch Personal Information / Medical History / Dietary & Feeding / Development & Behavior / Activity Log | Each renders correct read-only content | Medium | Not Tested |  |
| Personal Information tab | Click 'View Image' on photo | Should open full image | Low | Not Tested |  |
| Activity Log tab | Click 'View Details' on a log row | Should show log detail | Low | Not Tested |  |
| Activity Log tab | View with 0 activity logs | 'No activity logs yet.' shows | Low | Not Tested |  |
| Overall screen | Look for any edit capability on this 'profile' page | None exists — entirely read-only display, confirm with PM if edit capability is expected in scope | Medium | Not Tested |  |

## Enrollment

### Enrollment — List

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header stats | Verify Total/Pending/Approved/Declined Enrollment cards | Values reflect the entire dataset, not the current filter | Low | Not Tested |  |
| Search | Search by creche name or email | Filters live (wired) | Medium | Not Tested |  |
| Filter | Filter by Status (All/Pending/Approved/Declined) | Filters correctly (wired) | Medium | Not Tested |  |
| Toolbar | Click Sort by / Export as / Print | Should perform action | Low | Not Tested |  |
| Table | Click 'View Details' on a row | Navigates to enrollment detail | Medium | Not Tested |  |
| Empty state | Search+filter to zero matches | 'No enrollment requests found.' shows | Medium | Not Tested |  |
| Pagination | Click through pages | Fully wired prev/next + numbered pages | Medium | Not Tested |  |

### Enrollment — Application Review

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Not-found state | Visit with an invalid id | Shows 'Enrollment request not found.' + back link | Medium | Not Tested |  |
| Header actions | Click 'Request More Details' | Opens Request Info modal | Medium | Not Tested |  |
| Header actions | Click 'Reject' | Should reject the application | High | Not Tested |  |
| Header actions | Click 'Approve' | Should approve the application | High | Not Tested |  |
| Left rail tabs | Switch Basic Information / Rooms / Time Schedule / Creche Documents | Each renders correct content | Medium | Not Tested |  |
| Basic Information tab | Click 'View Images' / 'View Document' | Should open the assets | Low | Not Tested |  |
| Rooms tab | Click 'View Pricing' on a room | Opens Pricing Modal with per-tier breakdown (Full day/Half day/Hourly/Weekly/Monthly) | Medium | Not Tested |  |
| Pricing Modal | Verify values match data per room, close (X) | Modal closes correctly | Medium | Not Tested |  |
| Time Schedule tab | Verify each day Sun–Sat, including 'Closed' days rendered in red | Matches schedule data | Medium | Not Tested |  |
| Creche Documents tab | Verify 'View Document' vs 'Not Uploaded' states per document | Not-uploaded shows correct static state; 'View Document' has no onClick even when uploaded | Medium | Not Tested |  |
| Request More Details modal | Type text into the textarea, click 'Request' | Should send/persist the request | Medium | Not Tested |  |
| Request More Details modal | Click 'Cancel' | Closes modal, discards input | Medium | Not Tested |  |

## Subscriptions

### Subscriptions — Plans List

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header stats | Verify Total Creches/Monthly Revenue/Active Subscriptions/Expired-Overdue cards | Matches expected behavior, no errors | Medium | Not Tested |  |
| Search | Search by plan name | Filters live | Medium | Not Tested |  |
| Toolbar | Click 'Sort by: Most recent' / Export as / Print | Should perform action | Low | Not Tested |  |
| Table | Verify all 4 seeded plans render correctly (Pro/Starter/Premium for Parents-inactive/Premium Test-hourly) | Data matches, including the one inactive plan | Medium | Not Tested |  |
| Table | Click 'View' on a plan row | Navigates to plan detail | Medium | Not Tested |  |
| Empty state | Search to zero matches | 'No subscription plans found.' shows | Medium | Not Tested |  |
| Pagination | Click Prev/Next | Should page | Low | Not Tested |  |

### Subscriptions — Subscribers

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Not-found state | Visit with an invalid plan id | Shows 'Plan not found.' + back link | Medium | Not Tested |  |
| Header stats | Verify the 4 stat cards repeat platform-wide (not plan-scoped) values | Confirm this is intentional and not confusing to reviewers | Low | Not Tested |  |
| Section header | Verify 'Subscribers — {plan.planName}' updates per plan | Matches expected behavior, no errors | Medium | Not Tested |  |
| Toolbar | Type in Search box | Should filter subscribers to this plan | High | Not Tested |  |
| Table | Click 'View' on a subscriber row | Should show subscriber detail | Low | Not Tested |  |
| Empty state | Test with 0 subscribers | 'No Data Available Yet!' icon+message shows | Low | Not Tested |  |

## Notifications

### Notifications

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header | Click 'New Notification' | Should open a compose flow | High | Not Tested |  |
| Stat card | Verify 'Total Activity Logs' count matches the 5 visible notifications | Should show 5, or the real count | High | Not Tested |  |
| Search | Type in the search box | Should filter the notifications table | Medium | Not Tested |  |
| Toolbar | Click 'Sort by: Most recent' / Export as / Print | Should perform action | Low | Not Tested |  |
| Table | Verify 'Recipients' column | Should reflect actual recipient scope per notification | Low | Not Tested |  |
| Table | Click 'View' on a notification row | Should show notification detail | Low | Not Tested |  |
| Empty state | Test with 0 notifications | 'No Data Available Yet!' shows | Low | Not Tested |  |
| Verify seeded data | Check all 5 seeded notifications render with correct title/recipient/amount details | Matches data (New Creche Enrollment ×2, Creche Approved, Payment Received ₦3,000, Subscription Expiring Soon) | Medium | Not Tested |  |
