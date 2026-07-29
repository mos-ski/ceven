# Parent App — Go-Live Test Plan

**Total test cases:** 290 · **Modules covered:** 20 · **High priority:** 9

How to use this doc: work through it module by module, screen by screen. For each row, perform the Test Case and compare against Expected Result, then fill in **Status** (Pass / Fail / Blocked) and **Comment**.

---

## Auth / Onboarding

### Sign In

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header | Click Back button | Returns to previous screen | Medium | Not Tested |  |
| Tabs | Switch to 'Caregivers' tab | Navigates to caregiver auth | Medium | Not Tested |  |
| Form | Enter email/phone + password, click Sign In (disabled until both filled) | Routes to home | Medium | Not Tested |  |
| Form | Toggle password show/hide eye icon | Visibility toggles | Medium | Not Tested |  |
| Form | Toggle 'Remember Me' checkbox | Toggles correctly | Medium | Not Tested |  |
| Form | Click 'Forgot Password' | Navigates to forgot password flow | Medium | Not Tested |  |
| Form | Click Google/Apple buttons | Verify behavior (may be decorative) | Low | Not Tested |  |
| Footer | Click 'Sign up' link | Navigates to signup | Medium | Not Tested |  |

### Sign Up

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Form | Type password, watch live rule checklist (8+ chars/uppercase/number-symbol) | Icons flip gray→brand check as rules pass | Medium | Not Tested |  |
| Form | Type confirm password not matching password | Continue stays disabled | Medium | Not Tested |  |
| Form | Leave ToS checkbox unchecked, try Continue | Blocked until checked | Medium | Not Tested |  |
| Form | Click 'Privacy Policy' text | Should link to Privacy Policy page | Medium | Not Tested |  |
| Form | Fill all fields correctly + accept ToS, click Continue | Routes to email verification | Medium | Not Tested |  |
| Footer | Click 'Sign in' link | Navigates to login | Medium | Not Tested |  |

### Email Verification

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Display | Check displayed email matches the one entered at signup | Should show the real signup email | Medium | Not Tested |  |
| OTP | Enter 6 digits, click Sign up | Routes to home | Low | Not Tested |  |
| OTP | Let countdown reach 0:00 | 'Resend Code' link appears; clicking resets timer and clears OTP | Medium | Not Tested |  |

### Forgot Password

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Form | Enter email, click Continue | Routes to forgot-password verification | Medium | Not Tested |  |
| OTP | Enter 6 digits, Continue | Routes to forgot-password success screen | Medium | Not Tested |  |
| OTP | Let countdown expire, click Resend | Resets timer and OTP | Medium | Not Tested |  |
| Success screen | Click 'Sign in' | Returns to login | Medium | Not Tested |  |

### Terms of Service

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Banner | Verify 'We've recently changed our T&Cs!' banner and Back button | Matches expected behavior, no errors | Medium | Not Tested |  |
| Search | Type in search box | Should filter ToS sections | Medium | Not Tested |  |
| Accept flow | Check Accept checkbox | Reveals 'Accept & Continue' button | Medium | Not Tested |  |
| Accept flow | Click 'Accept & Continue' | Returns to previous screen | Medium | Not Tested |  |

### Get Started — Marketing Quiz (Parent branch)

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Persona select | Click 'Parent/Guardian' | Advances into parent branch | Medium | Not Tested |  |
| Parent branch | Step through intent → creche-search (found/not-found toggle) OR caregiver path → children count/ages → final contact form | Each step transitions correctly; back button returns to prior step at every step | Medium | Not Tested |  |
| Parent branch | Toggle 'send to WhatsApp' on final contact step | Toggles correctly | Medium | Not Tested |  |
| Parent branch | Submit final contact form | Shows handoff screen (not a real account) | Low | Not Tested |  |
| Any step | Click 'Already have an account? Log in' | Navigates to login | Medium | Not Tested |  |

### Add Child

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Gated state | Set membership to trial_ended with child count at/above free limit | Only Trial Gate Banner shows, form is hidden | High | Not Tested |  |
| Form | Leave First/Last Name, DOB, or Gender blank, try Continue | Continue disabled/blocked | Medium | Not Tested |  |
| Form | Open Date of Birth picker, navigate months, select a day | Calendar picker modal works correctly | Medium | Not Tested |  |
| Form | Open Gender picker, select Male/Female/Other | Gender picker modal works, radio-style selection | Medium | Not Tested |  |
| Form | Upload a photo (drag or tap) | Shows upload progress bar, filename+size display | Low | Not Tested |  |
| Form | Fill all required fields, Continue | Success modal 'profile created' → Continue routes to health setup | Medium | Not Tested |  |

### Health Setup (1/3)

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Allergies | Open multi-select modal, choose multiple (incl. 'Others') | Chips render below field with remove (×) | Medium | Not Tested |  |
| Chronic Conditions | Same multi-select pattern | Chips render with remove | Medium | Not Tested |  |
| Blood Group | Open Radio Select modal, select one of 8 types | Single selection persists | Medium | Not Tested |  |
| Medication | Click 'Add Medication' | Opens Medication modal (Name/Dosage required, Schedule Type dropdown) | Medium | Not Tested |  |
| Medication modal | Select Schedule Type 'Specific Days' | Reveals day-of-week chip picker | Medium | Not Tested |  |
| Medication modal | Select Schedule Type 'Every X Hours/Days' | Reveals interval value+unit inputs | Medium | Not Tested |  |
| Medication modal | Select Schedule Type 'As Needed', leave Notes blank | Should require Notes for As Needed | Medium | Not Tested |  |
| Medication modal | Fill Name+Dosage, click 'Add medication' | Adds a removable chip for the medication | Medium | Not Tested |  |
| Paediatrician | Fill Name/Phone/Clinic free text fields | Accepts input, no validation | Medium | Not Tested |  |
| Immunization History | Open modal, search a vaccine, set Done/Pending/N-A per vaccine | Search filters live; selections save on Continue | Medium | Not Tested |  |
| Bottom Continue | Leave Allergies/Conditions empty (marked required), click Continue | Should block progression | Medium | Not Tested |  |
| Bottom Continue | Fill required fields, Continue | Routes to feeding setup | Medium | Not Tested |  |

### Feeding Setup (2/3)

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Feeding Type | Multi-select modal w/ search | Chips render with remove | Medium | Not Tested |  |
| Dietary Restriction | Multi-select modal w/ search | Chips render with remove | Medium | Not Tested |  |
| Feeding Schedule | Single-select modal | Selection persists | Medium | Not Tested |  |
| Schedule row | Click 'Add New Schedule' button | Should add a new schedule row | Medium | Not Tested |  |
| Bottom Continue | Fill fields, Continue | Routes to development setup | Medium | Not Tested |  |

### Development Setup (3/3)

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Multi-selects | Sleep Pattern / Comfort Items / Toilet Training / Milestone / Communication Style — each w/ search | Chips render with remove | Medium | Not Tested |  |
| Sleep Time row | Click 'Add Time' button | Should add a time entry | Medium | Not Tested |  |
| Behaviour Note | Fill textarea | Accepts input | Medium | Not Tested |  |
| Bottom Continue | Click Continue | Opens Warning modal ('about to share child's profile') | Medium | Not Tested |  |
| WarningModal | Click 'Proceed' | Opens Success modal 'You're all done!' | Medium | Not Tested |  |
| SuccessModal | Click 'Go to Home' | Routes to home | Medium | Not Tested |  |

## Home

### Home

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Top bar | Click Mood chip (😊 score) | Navigates to mood | Medium | Not Tested |  |
| Top bar | Click Bell icon | Navigates to notifications | Medium | Not Tested |  |
| Top bar | Click pulsing Scan icon | Navigates to scan | Medium | Not Tested |  |
| Tabs | Switch 'Moments' vs 'Special Requests' | Special Requests renders Special Requests panel inline | Medium | Not Tested |  |
| Tabs | Switch tabs, verify tab bar stays sticky on scroll | Sticky positioning correct | Medium | Not Tested |  |
| Check-in toast | Swipe left (touch) or drag (mouse) to dismiss | Dismisses past threshold | Medium | Not Tested |  |
| Check-in toast | Tap × button | Dismisses toast | Medium | Not Tested |  |
| Check-in toast | Tap banner body (not ×) | Navigates to attendance | Medium | Not Tested |  |
| Moments feed | Click a tag chip on a post | Feed filters by tag; 'Clear filter' appears | Medium | Not Tested |  |
| Moments feed | Filter to a tag with no matches, click 'Clear filter' | Empty state 'No posts with this tag' shows, then clears back to full feed | Medium | Not Tested |  |
| Moments feed | Click 'see more/show less' on a long caption | Expands/collapses correctly | Medium | Not Tested |  |
| Moments feed | Swipe/scroll image strip on a multi-image post | Dot indicators track position correctly | Medium | Not Tested |  |
| Moments feed | Double-tap an image | Heart animation plays, like registers | Medium | Not Tested |  |
| Moments feed | Tap an image | Opens Full Screen viewer with swipe/arrow nav and dot indicators | Medium | Not Tested |  |
| Moments feed | Click Like button | Opens Reaction picker (8 emoji), sets liked state + custom emoji | Medium | Not Tested |  |
| Moments feed | Click Comment / Save buttons | Verify behavior (may be decorative) | Low | Not Tested |  |
| Floating Action Button | Scroll past threshold | FAB switches from menu icon to 'scroll to top' chevron | Medium | Not Tested |  |
| FAB Menu | Open Menu Overlay, click items in My Family / Health & Care / Creche Life sections | Each item routes correctly | Medium | Not Tested |  |
| FAB Menu | Click 'Special Requests' item | Switches Home's tab instead of navigating away | Medium | Not Tested |  |
| FAB Menu | Trigger a gated item (if reachable) | Should show Membership Gate sheet | Medium | Not Tested |  |
| MembershipGateSheet | Click 'Manage Account' (if reachable) | Routes to settings/account | Medium | Not Tested |  |

## CEvenAI Chat

### AI Chat

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Empty state | Click one of 4 suggested-prompt buttons | Sends that prompt as first message | Medium | Not Tested |  |
| Input bar | Type a message, click Send | Message appears, typing indicator (3 dots), then AI reply | Medium | Not Tested |  |
| Input bar | Click Mic button | Verify behavior (may be decorative) | Low | Not Tested |  |
| AI messages | Click Thumbs Up / Thumbs Down / Copy on an AI reply | Verify behavior (may be decorative) | Low | Not Tested |  |
| Trial gate | Send messages until reaching message limit while membership inactive | Next send triggers system message + disables input/send/mic, placeholder changes to 'Manage your account to keep chatting' | High | Not Tested |  |
| Trial gate | After limit reached, click 'Clear' (refresh icon) | Conversation resets to empty state | Medium | Not Tested |  |
| Membership active | Set membership to active, retest trial gate | Trial gate should not trigger; full messaging works | Medium | Not Tested |  |

## Children

### Children — List

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header | Click '+' button | Navigates to add child | Medium | Not Tested |  |
| Child card | Tap card | Navigates to child profile | Medium | Not Tested |  |
| Quick links | Tap Feeding icon | Navigates to feeding | Medium | Not Tested |  |
| Quick links | Tap Health icon | Navigates to health | Medium | Not Tested |  |
| Quick links | Tap 'Growth' icon | Should navigate to growth page | High | Not Tested |  |
| Add another child | Tap dashed 'Add another child' CTA | Navigates to add child | Medium | Not Tested |  |
| Independent caregiver badge | Verify shows assigned caregiver name or 'No independent caregiver' | Matches actual assignment state | Medium | Not Tested |  |

### Children — Profile

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header | Tap Notifications bell | Navigates to notifications | Medium | Not Tested |  |
| Banner | Accept an independent caregiver invite, revisit profile | Success banner shows conditionally | Medium | Not Tested |  |
| Quick tiles | Tap 'Today' tile | Navigates to attendance, shows check-in time or 'Not checked in yet' | Medium | Not Tested |  |
| Quick tiles | Tap 'Incidents' tile | Navigates to incidents, shows count or 'None reported' | Medium | Not Tested |  |
| Today's medication | Verify status pill (administered/missed/scheduled) per dose | Matches data; empty state 'No medication scheduled today' when none | Medium | Not Tested |  |
| Independent Caregiver | Tap 'Invite' button | Opens invite modal (Name + Phone, validated digits≥7) | Medium | Not Tested |  |
| Invite modal | Leave Name/Phone invalid, try Generate | Button disabled until valid | Medium | Not Tested |  |
| Invite modal | Fill valid Name+Phone, click 'Generate invite link' | Shows invite link with Copy/Share/Done | Medium | Not Tested |  |
| Invite modal | Click 'Copy' | Copies link to clipboard | Medium | Not Tested |  |
| Invite modal | Click 'Share' | Uses navigator.share if available, else clipboard fallback | Medium | Not Tested |  |
| Accepted caregiver row | Click Trash/remove icon | Removes the caregiver relationship | Medium | Not Tested |  |
| Pending Invites | Click 'Revoke' on a pending invite | Revokes the invite | Medium | Not Tested |  |
| Cross-tab sync | Accept/revoke an invite in another tab, watch this page live-refresh | Updates via storage events without manual reload | Medium | Not Tested |  |

### Children — Growth & Milestones

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header | Click 'Log' button | Opens Growth modal (on Growth tab) or Milestone modal (on Milestones tab) contextually | Medium | Not Tested |  |
| Growth tab | Verify latest stat cards + bar charts (Height/Weight over time) + Measurement History list | Matches expected behavior, no errors | Medium | Not Tested |  |
| Log Growth modal | Submit completely blank | Should be blocked | Medium | Not Tested |  |
| Log Growth modal | Fill Height/Weight/Head/Notes, Save Measurement | New entry appears at top of history | Medium | Not Tested |  |
| Milestones tab | View with no milestones | Empty state 'No Milestones Yet' shows | Medium | Not Tested |  |
| Log Milestone modal | Leave Title blank, try Save Milestone | Disabled until title non-empty | Medium | Not Tested |  |
| Log Milestone modal | Fill Title (+ optional Description), Save | New milestone appears in timeline | Medium | Not Tested |  |

## Attendance

### Attendance

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Today status | Verify checked-in/out times or 'Not yet'/'Still at creche' text | Matches data | Medium | Not Tested |  |
| CTA | Click 'Scan attendance code' | Navigates to scan | Medium | Not Tested |  |
| History list | Verify past 7 days: date, status pill (present/late/absent), in/out times, pickedUpBy | Colors and data correct | Medium | Not Tested |  |
| History list | Verify exception callout box on a day with exception set | Red callout renders correctly | Medium | Not Tested |  |

### Scan

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| ScanFlow | Click 'Scan attendance code' | Simulated scanning spinner, then opens Child Selector | Medium | Not Tested |  |
| ChildSelector | Select 0 children, try Confirm | Disabled until ≥1 selected | Medium | Not Tested |  |
| ChildSelector | Select ≥1 child, Confirm | Dispatches attendance log, shows success sheet, Done resets | Medium | Not Tested |  |
| ScanFlow | Click 'Enter code instead' | Opens manual 8-digit code entry modal | Medium | Not Tested |  |
| Manual code entry | Enter wrong code | Error sheet with 'Try Again' shows | Medium | Not Tested |  |
| Manual code entry | Enter correct code | Proceeds to child selector/success | Medium | Not Tested |  |
| Authorize pickup | Tap 'Authorize a pickup', enter name (required), 'Generate Code' | Disabled until name filled; generates 8-digit code | Medium | Not Tested |  |
| Authorize pickup | Click 'Copy Code' | Copies to clipboard, shows 'Copied!' for 2s | Medium | Not Tested |  |
| Authorize pickup | Verify code display shows authorized name/child/expiry ('end of day') | Correct info shown | Medium | Not Tested |  |

## Fees

### Fees

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Summary card | Verify Outstanding Balance total and pending count | Should be computed correctly from data | Medium | Not Tested |  |
| Invoice list | Verify term/status pill/amount/due date per invoice | Matches data; confirm no Pay Now CTA exists on this screen (read-only) | Medium | Not Tested |  |

## Events

### Events

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Calendar | Navigate Prev/Next month | Month changes correctly, event-dot indicators update | Medium | Not Tested |  |
| Calendar | Tap a day with events | Filters list to 'Events on {date}' | Medium | Not Tested |  |
| Calendar | Navigate months away from selection | Reverts to 'Upcoming Events' (first 5) | Medium | Not Tested |  |
| Event card | Tap 'Attending'/'Not Attending' (RSVP-required event) | Toggle persists, live-updates on other views | Medium | Not Tested |  |
| Empty state | View with no events | 'No events scheduled.' shows | Medium | Not Tested |  |

## Gallery

### Gallery

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Tabs | Switch 'All Photos' (masonry) vs 'Folders' (grouped by date) | Both render correctly with variable aspect ratios / date chips | Medium | Not Tested |  |
| StoryViewer | Tap a photo in either tab | Opens full-screen Instagram-Stories style viewer | Medium | Not Tested |  |
| StoryViewer | Wait 5s without interacting | Auto-advances to next photo | Medium | Not Tested |  |
| StoryViewer | Swipe left/right (touch) or use arrow keys (desktop) | Navigates photos correctly | Medium | Not Tested |  |
| StoryViewer | Reach last photo, let it auto-advance/swipe forward | Viewer auto-closes | Medium | Not Tested |  |
| StoryViewer | Press Escape (desktop) | Closes viewer | Medium | Not Tested |  |

## Moments

### Moments

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Tabs | Switch All/Moments/Health/Activity/Creche line tabs | Feed filters by category correctly (only image items shown) | Medium | Not Tested |  |
| Feed interactions | Repeat Home-feed interaction tests: swipe image strip, double-tap like, Like→reaction picker, Comment/Save decorative, caption expand | Same behavior as Home feed | Medium | Not Tested |  |
| Empty state | Filter to a category with 0 posts | 'No posts yet' + 'Tap the camera to share a moment.' shows | Medium | Not Tested |  |
| Camera FAB | Tap floating camera button | Opens Moment Creator sheet | Medium | Not Tested |  |
| MomentCreatorSheet | Select 'Posting as' child from dropdown | Selection updates | Medium | Not Tested |  |
| MomentCreatorSheet | Tap Camera/Gallery/Video tiles | Triggers native file input with correct accept/capture attribute | Medium | Not Tested |  |
| MomentCreatorSheet | Select media, view preview, tap remove (×) | Preview clears correctly | Medium | Not Tested |  |
| MomentCreatorSheet | Leave caption blank or media unselected, try 'Post Moment' | Disabled until both media AND caption are set | Medium | Not Tested |  |
| MomentCreatorSheet | Fill both, click 'Post Moment' | Should add new post to feed | High | Not Tested |  |

## Mood

### Mood

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Accordion | Tap a child card to expand | Only one card open at a time, chevron rotates | Medium | Not Tested |  |
| Expanded card | Verify info chips (Height/Age/Health) and animated weekly mood bar chart | Bars animate in with staggered delay | Medium | Not Tested |  |
| Screen | Look for any edit/logging affordance | None present — confirm this screen is intentionally view-only | Medium | Not Tested |  |

## Medication

### Medication

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header | Click 'Request' button | Opens Medication Request modal | Medium | Not Tested |  |
| Summary | Verify Scheduled/Given/Missed stat tiles | Match data | Medium | Not Tested |  |
| Tabs | Switch Today/History/Active Meds | Each renders correct content and empty states | Medium | Not Tested |  |
| Today tab | Verify status badges (scheduled/administered/missed/delayed) with correct colors/icons | Matches expected behavior, no errors | Medium | Not Tested |  |
| Request modal | Select Schedule Type 'Daily' | Reveals Time input | Medium | Not Tested |  |
| Request modal | Select Schedule Type 'Interval' | Reveals 'Every how many hours?' numeric input | Medium | Not Tested |  |
| Request modal | Leave Name/Dosage blank, try Submit | Disabled until both filled | Medium | Not Tested |  |
| Request modal | Fill Name+Dosage, Submit Request | Adds request marked authorized, live-refreshes Active Meds tab | Medium | Not Tested |  |

## Incidents

### Incidents

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Empty state | View with 0 incidents | 'No Incidents Reported' + reassurance copy shows | Medium | Not Tested |  |
| Incident cards | Verify severity pill (minor/moderate/severe) + status pill (Open/Under Review/Resolved) + action-taken callout | Matches expected behavior, no errors | Medium | Not Tested |  |
| Screen | Look for acknowledge/reply/escalate actions | None present — confirm read-only is intentional | Medium | Not Tested |  |

## Announcements

### Announcements

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Empty state | View with 0 announcements | 'No Announcements' shows | Medium | Not Tested |  |
| Cards | Verify urgent (⚠️) vs normal (📣) icon, unread indicator (border+dot), 'Urgent' pill | Matches expected behavior, no errors | Medium | Not Tested |  |
| Cards | Tap card to expand/collapse | Accordion toggles (line-clamp-2 when collapsed) | Medium | Not Tested |  |
| Cards | Tap an unread card | Mark read fires, unread dot clears and does not reappear on refresh | Medium | Not Tested |  |

## Notifications

### Notifications

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Tabs | Switch All (n) / Unread (n) | Counts computed live and correct | Medium | Not Tested |  |
| List | Verify grouping by Today/Yesterday/other with type-specific icons + unread red-dot overlay | Matches expected behavior, no errors | Medium | Not Tested |  |
| List | Tap an individual notification row | Should mark read or open detail | Medium | Not Tested |  |
| Auto notifications | Accept an independent caregiver invite | Auto-injected 'Caregiver accepted' notification appears, live-updates via storage events | Medium | Not Tested |  |
| Empty state | View with 0 notifications | 'No Notifications Yet!' shows | Medium | Not Tested |  |

## Reports

### Reports

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| AppBar | Click Bell icon | Verify behavior (may be decorative) | Low | Not Tested |  |
| Date pill | Tap date pill, select a different date in Calendar modal, Confirm | Should filter/change the report shown | Medium | Not Tested |  |
| Ask CEvenAI pill | Tap pill | Navigates to AI chat | Medium | Not Tested |  |
| Child selector | On first load with no child param | Child Picker sheet auto-opens | Medium | Not Tested |  |
| Child selector | Select a child | Routes to reports with child param | Medium | Not Tested |  |
| Report paging | Tap prev/next chevrons around circular progress indicator | Pages through that child's daily reports, disabled at bounds | Medium | Not Tested |  |
| Stat tiles | Verify Mood/Meals/Nap/Activities tiles match report data | Matches expected behavior, no errors | Medium | Not Tested |  |
| Photo carousel | Tap dot indicators | Should advance photo | Low | Not Tested |  |
| Comment box | Type a comment, click Send (disabled until non-empty) | Should persist comment | Medium | Not Tested |  |
| Caregiver row | Tap row | Opens Caregiver Action sheet (Rate Caregiver / Report Caregiver menu) | Medium | Not Tested |  |
| CaregiverActionSheet — Rate | Select stars, add feedback, Submit Rating (disabled until rating>0) | Auto-closes after 800ms | Medium | Not Tested |  |
| CaregiverActionSheet — Report | Select reason (required), description, 'Request termination' checkbox, Submit Report | Shows 'Report Submitted' confirmation, auto-closes | Medium | Not Tested |  |

## Rate Caregiver

### Rate Caregiver

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header | Click 'Rate' button | Opens submit modal | Medium | Not Tested |  |
| Average summary | Verify big average number, star row, distribution bars (5→1) only shown when count>0 | Matches expected behavior, no errors | Medium | Not Tested |  |
| My Ratings list | View with 0 ratings | 'You haven't rated yet.' shows | Medium | Not Tested |  |
| Submit modal | Hover/click stars, verify dynamic label (Poor/Fair/Good/Very Good/Excellent) | Matches expected behavior, no errors | Medium | Not Tested |  |
| Submit modal | Leave rating at 0, try Submit | Disabled until rating>0 | Medium | Not Tested |  |
| Submit modal | Select rating + feedback, Submit Rating | Persists — appears in My Ratings list | Medium | Not Tested |  |

## Special Requests

### Special Requests

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Trial gate | Set membership inactive + trial used flag true | Trial Gate Banner shows instead of 'New Request' CTA | High | Not Tested |  |
| New Request | Tap dashed 'New Request' CTA | Opens Create Task modal | Medium | Not Tested |  |
| CreateTaskModal | Leave Title/Description/Scheduled Time blank, try Create Task | Disabled until all 3 filled | Medium | Not Tested |  |
| CreateTaskModal | Fill required fields + optional comment, Create Task | Simulated loading, then success screen 'successfully created' | Medium | Not Tested |  |
| CreateTaskModal | Close success screen via × or 'Done' | Both close and trigger refresh | Medium | Not Tested |  |
| Trial state | Create first request while on trial | Trial used flag flips true — verify persists across remounts this session but resets on full reload | Medium | Not Tested |  |
| Task list | Tap a task | Opens Task Details modal (read-only detail) | Medium | Not Tested |  |
| Empty state | View with 0 requests | 'No Special Requests Yet!' shows | Medium | Not Tested |  |

## Creche Discovery & Enrollment

### Creche Discovery

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Search | Type a creche name/location | Filters list client-side | Medium | Not Tested |  |
| Loading | Load the page fresh | Simulated loading shows skeleton placeholders before real list | Medium | Not Tested |  |
| See all | Click 'See all' button | Should show full list | Low | Not Tested |  |
| Creche row | Tap a row | Navigates to creche detail | Medium | Not Tested |  |

### Creche Detail

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Tabs | Switch Overview/Rooms/Pricing/Policies | Each renders correct content | Medium | Not Tested |  |
| Overview | Click 'Open Location' button | Should open maps | Low | Not Tested |  |
| Rooms tab | Tap a room card | Opens Room modal with pricing breakdown | Medium | Not Tested |  |
| Pricing tab | Switch age sub-tabs Infant/Toddler/Preschool | Pricing table filters by selected age group | Medium | Not Tested |  |
| Enrol Now | Tap sticky 'Enrol Now' button | Opens 3-step Enrollment Wizard | Medium | Not Tested |  |
| Wizard Step 1 | Select a child profile, try Continue without selecting | Disabled until child chosen | Medium | Not Tested |  |
| Wizard Step 2 | Select a room, try Continue without selecting | Disabled until room chosen | Medium | Not Tested |  |
| Wizard Step 3 | Select a child whose age is outside the room's age range | Warning banner blocks submission (age validation) | Medium | Not Tested |  |
| Wizard Step 3 | Select valid age-range child, fill optional Start Date/Notes, Enroll Child | Success → Success modal → 'View Enrollments' routes to enrollments | Medium | Not Tested |  |
| Wizard | Use Back arrow at each step, and × to close entirely | Back moves to prior step; × closes wizard fully | Medium | Not Tested |  |

### Enrollments

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Search | Filter by child name | List filters correctly | Medium | Not Tested |  |
| Withdraw | Tap 'Withdraw Child' once | Shows 'Tap again to confirm' for 2.5s | Medium | Not Tested |  |
| Withdraw | Tap again within 2.5s | Executes withdraw, button hides once status is cancelled | Medium | Not Tested |  |
| Card body | Tap card (not withdraw button) | Opens Details sheet with full detail + timestamped status timeline | Medium | Not Tested |  |
| Empty states | Search to zero matches | 'No children match your search' shows | Medium | Not Tested |  |
| Empty states | View with 0 enrollments | 'No enrollments yet' + 'Find a creche to get started' CTA routes to creche discovery | Medium | Not Tested |  |

## Settings

### Settings — Home

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Rows | Click each of 11 settings rows (Find Creche, Enrollments, Manage Account, Family Profiles, Authorized Pickups, Change Password, Language, Notifications, Accessibility, FAQs, About) | Each navigates to correct sub-page | Medium | Not Tested |  |
| Avatar edit | Tap pencil overlay on avatar | Should allow photo edit | Low | Not Tested |  |
| Logout | Click 'Logout' | Clears session keys, routes to login | High | Not Tested |  |

### Settings — Manage Account

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Banner | Click 'Go to account' | Navigates to account page | Medium | Not Tested |  |
| Billing links | Click Membership/Creche Fees/Acceptance Fee/Payment History/Receipts/Payment Methods | Each routes to the correct billing page | Medium | Not Tested |  |

### Settings — Family Profiles

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Owner card | Click 'Edit' | Opens Edit Profile sheet | Medium | Not Tested |  |
| EditProfileSheet | Change Full Name/Relationship/Email/Phone/Language/Emergency Contact, Save Changes | Local state updates, 'Profile Updated!' confirmation auto-closes | Medium | Not Tested |  |
| Other members grid | Tap a member | Opens Member Detail sheet | Medium | Not Tested |  |
| MemberDetailSheet (non-owner) | Click 'Reset Password' | Shows 'Reset link sent!' then auto-closes | Medium | Not Tested |  |
| MemberDetailSheet (non-owner) | Click 'Remove from Family' | Should remove the member | Medium | Not Tested |  |
| Invite tile | Tap dashed 'Invite' tile | Opens Invite sheet (Email/Phone + Role select) | Medium | Not Tested |  |
| InviteSheet | Leave fields blank, try Send Invitation | Disabled until both set | Medium | Not Tested |  |
| InviteSheet | Fill fields, Send Invitation | Shows 'Invitation Sent!' → Done | Medium | Not Tested |  |

### Settings — Profile Edit

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Fields | Verify First/Last Name are prefilled from real user | Should reflect actual user | Medium | Not Tested |  |
| Selects | Choose Relationship/Language/Time Zone via custom dropdown | Selection persists, check icon on selected item | Medium | Not Tested |  |
| Submit | Click 'Update Details' with fields blank | Should be blocked | Medium | Not Tested |  |
| Submit | Click 'Update Details' | Success modal shows, × closes and returns to previous screen | Medium | Not Tested |  |

### Settings — Authorized Pickups

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Pickup cards | Verify verified checkmark (conditional), Call button (tel: link) | Matches expected behavior, no errors | Medium | Not Tested |  |
| Add Pickup | Tap dashed 'Add Pickup Person' CTA | Opens Add Pickup sheet | Medium | Not Tested |  |
| AddPickupSheet | Fill Name/Role/Phone/Security Question/Answer, leave one blank, try Add Person | Disabled until all 5 fields set | Medium | Not Tested |  |
| AddPickupSheet | Fill all fields, Add Person | Adds unverified person, 'Added Successfully!' auto-closes | Medium | Not Tested |  |

### Settings — Change Password

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Form | Enter current password (<6 chars) or mismatched new/confirm | Update Password stays disabled | Medium | Not Tested |  |
| Form | Enter valid current + matching new password (passes all 3 rules) | Update Password enables | Medium | Not Tested |  |
| Submit | Click 'Update Password' | Full-screen success 'Password Updated!' → 'Back to Settings' returns to settings | Medium | Not Tested |  |

### Settings — Language

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| List | Select a language from the 6-option radio list | Checkmark moves to selected item | Medium | Not Tested |  |
| Submit | Click 'Save Language' | Returns to previous screen | Low | Not Tested |  |

### Settings — Notifications

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Toggles | Toggle each of 7 notification preference rows | Each toggles independently; no Save button, no persistence — confirm expected local-only state | Medium | Not Tested |  |

### Settings — Accessibility

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Text Size | Select Small/Default/Large/X-Large | Segmented control updates progress bar visual | Medium | Not Tested |  |
| Toggles | Toggle High Contrast / Reduce Motion / Bold Text | Should visually change app rendering | Medium | Not Tested |  |

### Settings — FAQs

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Accordion | Click multiple FAQ items in sequence | Only one open at a time (single open index state) | Medium | Not Tested |  |
| Contact | Click 'Contact Support' button | Should open support channel | Low | Not Tested |  |

### Settings — About

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Info | Verify Version/Build/Platform/Last Updated rows render correctly | Matches expected behavior, no errors | Medium | Not Tested |  |
| Links | Click 'Terms of Service' | Navigates to ToS page | Medium | Not Tested |  |
| Links | Click 'Privacy Policy' / 'Open Source Licenses' | Should navigate to real pages | Medium | Not Tested |  |

### Settings — Billing

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Route reachability | Check if this page is reachable from any nav | Should be linked from Settings home or removed | Medium | Not Tested |  |
| Invoice list | Click 'Download Receipt' on a paid invoice | Should download receipt | Low | Not Tested |  |

### Settings — Payments

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Route reachability | Check if this page is reachable from any nav | Should be linked or removed | Medium | Not Tested |  |
| Empty state | View with 0 transactions | 'No transactions yet.' shows | Medium | Not Tested |  |

### Settings — Find Creche (redirect)

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Redirect | Visit this route directly | Immediately redirects to creche discovery with no content flash | Medium | Not Tested |  |

## Manage Account Portal

### Account Portal — Layout

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Sidebar (mobile <1024px) | Tap hamburger toggle | Opens/closes overlay drawer | Medium | Not Tested |  |
| Sidebar | Click 'Back to app' | Navigates to home | Medium | Not Tested |  |
| Sidebar | Click each of 8 nav items (Overview/Membership/Creche Fees/Acceptance Fees/Payment History/Receipts/Payment Methods/Family/Pickups) | Active-state highlighting correct, routes correctly | Medium | Not Tested |  |

### Account Portal — Overview

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Membership card | Click 'Manage membership' | Routes to membership | Medium | Not Tested |  |
| Outstanding Payments card | Click 'View fees' | Routes to creche-fees | Medium | Not Tested |  |
| Quick Links grid | Click each of the 8 auto-generated links | All route correctly | Medium | Not Tested |  |

### Account Portal — Membership

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Premium Plan card | Toggle Monthly/Yearly billing cycle | Price display updates live | Medium | Not Tested |  |
| Premium Plan card | Click 'Purchase Plan' | Opens Membership Checkout modal | Medium | Not Tested |  |
| Checkout modal | Fill Card Number/Expiry/CVV/Cardholder Name with garbage/alphabetic input | Should be rejected | Medium | Not Tested |  |
| Checkout modal | Fill all 4 card fields, click 'Pay {total}' | Success screen shows transaction ID/receipt/unlocked features | Medium | Not Tested |  |
| Checkout modal | Close success screen | Membership status flips to active | High | Not Tested |  |
| Active membership | Click 'Cancel Membership' | Opens Cancel Confirm modal (Keep vs Cancel It) | Medium | Not Tested |  |
| CancelConfirmModal | Click 'Cancel It' | Sets status back to trial_ended — verify trial banners reappear across the app | Medium | Not Tested |  |

### Account Portal — Creche Fees

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Invoice list | Click 'Pay Now' on an unpaid invoice | Opens Payment Flow modal | Medium | Not Tested |  |
| PaymentFlowModal | Select a payment method, click Pay | 'Processing...' spinner, then success, 'Done' | Medium | Not Tested |  |
| Persistence check | Reload page after paying | Fee reverts to unpaid | Medium | Not Tested |  |

### Account Portal — Acceptance Fees

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Fee cards | Repeat Creche Fees payment flow per-child | Same Payment Flow modal reused correctly | Medium | Not Tested |  |

### Account Portal — Payment History

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Search | Filter transactions by title | Filters live | Medium | Not Tested |  |
| Empty state | Search to zero matches | 'No transactions match your search.' shows | Medium | Not Tested |  |

### Account Portal — Receipts

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| List | Click 'Download' per row | Should download receipt | Low | Not Tested |  |
| Empty state | View with 0 receipts | 'No receipts yet.' shows | Medium | Not Tested |  |

### Account Portal — Payment Methods

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Method cards | Click 'Set default' on a non-default method | Reassigns default correctly, 'Default' badge moves | Medium | Not Tested |  |
| Method cards | Click 'Remove' on a method | Removes immediately | Medium | Not Tested |  |
| Add Method | Tap dashed 'Add Payment Method' CTA | Opens Add Method modal (Type toggle card/bank/ussd) | Medium | Not Tested |  |
| AddMethodModal | Leave Label/Detail blank, try Add Method | Disabled until both filled | Medium | Not Tested |  |

### Account Portal — Family

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Invite tile | Tap dashed 'Invite Family' tile | Opens Invite modal (Email/Phone + Role select) | Medium | Not Tested |  |
| InviteModal | Fill and Send Invitation | 'Invitation Sent!' confirmation shows | Medium | Not Tested |  |
| SecuritySection | Change Password: fill Current (non-empty) + New (≥8 chars) + Confirm (match), Update Password | Button shows 'Password Updated!' for 2s, then reverts and clears all 3 fields | Medium | Not Tested |  |

### Account Portal — Pickups

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Add Pickup | Fill Name/Role/Phone (no security question here), Add Person | Disabled until all 3 filled; adds correctly | Medium | Not Tested |  |
| Call button | Tap Call icon on a pickup person | Opens tel: link | Medium | Not Tested |  |
