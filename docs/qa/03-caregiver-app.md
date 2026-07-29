# Caregiver App — Go-Live Test Plan

**Total test cases:** 189 · **Modules covered:** 19 · **High priority:** 7

How to use this doc: work through it module by module, screen by screen. For each row, perform the Test Case and compare against Expected Result, then fill in **Status** (Pass / Fail / Blocked) and **Comment**.

---

## Global / Shell

### MobileShell (all screens)

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Responsive check | Load app at a desktop viewport width | App is mobile-only by design — confirm desktop is either blocked or acceptable | Medium | Not Tested |  |
| Bottom nav presence | Check which screens show/hide BottomNav and LogSheet | Should match intended design across all screens | Low | Not Tested |  |

## Splash / Auth / Onboarding

### Splash

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Timer | Load splash screen | Auto-redirects to home after 1500ms with no interaction possible | Medium | Not Tested |  |

### OTP Login

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Role selector sheet | On load, toggle Parent/Caregiver, click Continue | Sets role and closes sheet; Caregiver selected by default | Medium | Not Tested |  |
| OTP screen | Click Back arrow | Returns to previous screen | Medium | Not Tested |  |
| OTP screen | Enter 6 digits | Auto-submits and routes to home depending on selected role | Medium | Not Tested |  |
| OTP screen | Let countdown (10 min) reach 0 | 'Resend Code' link appears; clicking resets OTP and timer | Medium | Not Tested |  |
| OTP screen | Click 'Forgot PIN?' | Navigates to reset-pin | Medium | Not Tested |  |

### PIN Setup

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Modal | Click X close | Returns to previous screen | Medium | Not Tested |  |
| PIN fields | Enter mismatched New PIN / Confirm PIN | 'Set PIN' stays disabled | Medium | Not Tested |  |
| PIN fields | Enter matching 6-digit PINs | 'Set PIN' enables | Medium | Not Tested |  |
| Keypad | Tap non-numeric/backspace on active field | Only digits accepted; backspace works; auto-advances New→Confirm at 6 digits | Medium | Not Tested |  |
| Submit | Tap 'Set PIN' with valid match | Writes pin flag + userName/userRole to storage, shows success modal | Medium | Not Tested |  |
| Success modal | Tap X or 'Login' | Both route to home | Medium | Not Tested |  |

### Reset PIN

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Step 1 (OTP) | Enter 6 digits, Continue disabled until 6 digits entered | Advances to step 2 | Medium | Not Tested |  |
| Step 1 (OTP) | Let countdown expire, Resend | Resets code and timer | Medium | Not Tested |  |
| Step 1 | Click Back arrow | Returns to previous screen | Medium | Not Tested |  |
| Step 2 (New PIN) | Enter mismatched New/Confirm PIN | 'Reset PIN' stays disabled | Medium | Not Tested |  |
| Step 2 | Click Back arrow | Returns to step 1 | Medium | Not Tested |  |
| Step 2 | Enter matching PINs, Reset PIN | Shows success modal | Medium | Not Tested |  |
| Success modal | Tap X or 'Login' | Both route to auth (not home) — verify this destination is intentional vs PIN Setup's home | Medium | Not Tested |  |

### Onboarding

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Carousel | Swipe/click through all 3 slides | Progress dots match index | Medium | Not Tested |  |
| Carousel | Verify 'Prev' hidden on slide 1 | Correct | Medium | Not Tested |  |
| Carousel | Verify 'Next' becomes 'Get Started' on last slide | Label changes correctly | Medium | Not Tested |  |
| Carousel | Verify 'Skip' hidden on last slide | Correct | Medium | Not Tested |  |
| Carousel | Click 'Skip' or 'Get Started' | Both call finish(), set onboarding flag, route to auth | Medium | Not Tested |  |

## Invite (Independent Caregiver)

### Invite — Landing

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Problem state | Visit with a bogus code | Shows 'missing' state + 'Go to caregiver login' CTA | Medium | Not Tested |  |
| Problem state | Visit with the seeded 'expired-demo' code | Shows 'expired' state with expiry banner text | Medium | Not Tested |  |
| Problem state | Visit with the seeded 'used-demo' code | Shows 'used' state | Medium | Not Tested |  |
| Problem state | Visit with a revoked invite code | Shows 'revoked' state | Medium | Not Tested |  |
| Happy path | Visit with a valid, unused invite code | Shows parent/child names, expiry banner, 'Continue to phone verification' CTA | Medium | Not Tested |  |
| Happy path | Click Back button | Returns to previous screen | Medium | Not Tested |  |

### Invite — Phone Verification

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Problem states | Re-check each of the 4 problem states here | Message shown but no 'back to login' CTA — verify this inconsistency vs landing page is acceptable | Medium | Not Tested |  |
| OTP entry | Type letters+digits into the 6-box alphanumeric input | Auto-uppercases, accepts alphanumeric | Medium | Not Tested |  |
| OTP entry | Paste a full 6-char code | Fills all boxes correctly | Medium | Not Tested |  |
| OTP entry | Use backspace and arrow keys across boxes | Navigation works correctly | Medium | Not Tested |  |
| OTP entry | Enter the correct prototype code (shown on-screen for this demo build) | otpVerified becomes true, CTAs enable | Low | Not Tested |  |
| Existing account match | Enter a phone matching a seeded existing caregiver account | Helper text shows match; primary CTA label changes to 'Log in and attach invite'; 'Create caregiver account' disables | Medium | Not Tested |  |
| New account path | Enter a phone with no existing match, verify OTP, click 'Create caregiver account' | Both CTAs behave correctly per match state | Medium | Not Tested |  |
| Acceptance | Complete acceptance | Success screen shows '{child} is now in your care list', 'View My Families' routes to children | Medium | Not Tested |  |
| Re-visit used invite | Re-visit the same invite link after accepting | Shows 'used' problem state | Medium | Not Tested |  |
| Cross-check | Verify accepted child appears in Children page 'My Families' section and is chat-reachable | Data flows correctly across screens | Medium | Not Tested |  |

## Home

### Home

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header | Tap Bell icon | Navigates to notifications | Medium | Not Tested |  |
| Stat card row | Tap Total Classroom(s)/Total Children row | Entire row navigates to children | Medium | Not Tested |  |
| Quick Actions | Tap 'Scan Code' | Navigates to scan | Medium | Not Tested |  |
| Quick Actions | Tap 'Log Activity' | Opens Log sheet in-page (no navigation) | Medium | Not Tested |  |
| Quick Actions | Tap 'Log Report' | Navigates to report | Medium | Not Tested |  |
| Quick Actions | Tap 'Attendance' | Navigates to attendance | Medium | Not Tested |  |
| Quick Actions | Tap 'Fees' | Navigates to fees | Medium | Not Tested |  |
| Quick Actions | Tap 'Gallery' | Navigates to gallery | Medium | Not Tested |  |
| Quick Actions | Tap 'Medication' | Navigates to medication | Medium | Not Tested |  |
| Quick Actions | Tap 'Incidents' | Navigates to incidents | Medium | Not Tested |  |
| Quick Actions | Tap 'Growth' | Should navigate to the current child's growth page | High | Not Tested |  |
| Quick Actions | Tap 'Ratings' | Navigates to ratings | Medium | Not Tested |  |
| Quick Actions | Tap 'Events' | Navigates to events | Medium | Not Tested |  |
| Quick Actions | Tap 'Announce' | Navigates to announcements | Medium | Not Tested |  |
| Quick Actions | Verify 'New' badges appear only on the 7 intended actions | Badge placement matches design | Medium | Not Tested |  |

## Tasks

### Tasks

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Tabs | Switch 'Pending Tasks (n)' / 'Completed Tasks (n)' | Counts correct; Completed tab includes both completed and undone statuses | Medium | Not Tested |  |
| Filter | Tap 'Filter by date', select a date | Task list should filter by that date | High | Not Tested |  |
| Empty state | View Pending tab with 0 tasks | 'No Task Available Yet!' + copy shows | Medium | Not Tested |  |
| Empty state | View Completed tab with 0 tasks | Verify copy is tab-appropriate, not identical to Pending's empty copy | Low | Not Tested |  |
| Task Detail Sheet | Tap a pending task row | Opens detail sheet: info step with read-only fields + 'Proceed to Treat' button | Medium | Not Tested |  |
| Task Detail Sheet | Tap a completed task row | Info step shows Image Upload row with 'View Images' link (completed status only) | Medium | Not Tested |  |
| Treat step | Tap 'Proceed to Treat' | Advances to treat step: textarea + photo upload | Medium | Not Tested |  |
| Treat step | Upload a photo (.png/.jpg/.jpeg) | Shows filename card with fake 100% progress, 'Add more photos' link | Low | Not Tested |  |
| Treat step | Tap 'Done' | Marks task done, shows success modal 'marked as done', closing returns to task list | Medium | Not Tested |  |
| Treat step | Tap 'Undone' | Marks task undone, shows success modal, closing returns to task list | Medium | Not Tested |  |
| Tab counts | After marking a task Done/Undone, check tab counts | Pending count decreases, Completed count increases correctly | Medium | Not Tested |  |
| Images viewer modal | Open images viewer on a completed task | View single image with dot pagination | Low | Not Tested |  |
| Sheet | Tap X at every step | Closes sheet correctly from any step | Medium | Not Tested |  |

## Attendance

### Attendance

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header | Tap Back arrow | Returns to previous screen | Medium | Not Tested |  |
| Scan CTA | Tap 'Scan attendance code' | Navigates to scan | Medium | Not Tested |  |
| Summary chips | Verify Present/Absent/Late counts derived from records | Match actual list state | Medium | Not Tested |  |
| Status pill | Tap a status pill repeatedly and note the cycle order | Should match the on-page instructional text | Medium | Not Tested |  |
| Status pill | Tap to set status to Present | Auto-stamps checkInTime (AM) and clears checkOutTime | Medium | Not Tested |  |
| Check-out link | Tap 'Check out' (visible only when present, not yet checked out) | Stamps checkOutTime (PM) | Medium | Not Tested |  |
| Legend | Verify 'QR verified' (blue) vs 'Manual' (gray) dot legend | Confirm this has no functional effect on any record field | Low | Not Tested |  |
| Pickup verify card | Embedded OneTimeCode verify — enter correct 8-digit code | Shows successful verification with pickup details | Medium | Not Tested |  |
| Pickup verify card | Enter incorrect code | Shows inline error, code stays enterable (no auto-reset) | Medium | Not Tested |  |

## Children

### Children — List

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header | Verify title 'Children (n)' matches data total | Matches expected behavior, no errors | Medium | Not Tested |  |
| My Families section | View with 0 family invites | 'No family invites yet' dashed card shows | Medium | Not Tested |  |
| My Families section | Accept an invite in another tab, watch this section update | Auto-refreshes via storage events | Medium | Not Tested |  |
| Creche classrooms section | Use Classroom filter dropdown | Filters children list by room correctly, check mark shows on active selection | Medium | Not Tested |  |
| ChildCard | Tap chevron to expand/collapse | Toggles independently of the name-link tap target, no mis-tap overlap | Medium | Not Tested |  |
| ChildCard | Tap child name | Navigates to child profile | Medium | Not Tested |  |
| ChildCard (expanded) | Tap chat icon on Parent Contact row | Navigates to chat thread | Medium | Not Tested |  |

### Children — Child Profile

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Nav presence | Verify no BottomNav shows on this drill-in screen | Confirm intentional | Medium | Not Tested |  |
| Invalid id handling | Visit with a nonexistent/garbage child id | Should show a not-found or error state | High | Not Tested |  |
| Conditional sections | Verify Notes / Alerts & Needs cards hide when empty for a given child | Sections conditionally render correctly | Medium | Not Tested |  |
| Parent Contact | Tap chat icon | Navigates to chat thread | Medium | Not Tested |  |

### Children — Growth & Milestones

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header | Tap '+ Log' | Opens Growth modal (Growth tab) or Milestone modal (Milestones tab), context-sensitive | Medium | Not Tested |  |
| Tabs | Switch Growth/Milestones | Preserves correct empty/filled state per tab | Medium | Not Tested |  |
| Log Growth modal | Leave all fields blank, click 'Save Measurement' | Should be blocked | Medium | Not Tested |  |
| Log Growth modal | Fill Height/Weight/HeadCircumference/Notes, Save | New entry appears at top of reverse-chronological list | Medium | Not Tested |  |
| Log Milestone modal | Leave Title blank, try Save Milestone | Disabled until Title is non-empty | Medium | Not Tested |  |
| Log Milestone modal | Fill Title + Description, Save | New milestone appears at top of list | Medium | Not Tested |  |
| Persistence | Reload the page after logging an entry | Data persists via storage | Medium | Not Tested |  |

## Scan

### Scan

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Scan button | Tap 'Scan attendance code' | Simulated 'Scanning...' overlay, then auto-resolves via staff scan handler | Low | Not Tested |  |
| Manual entry | Tap 'Enter code instead', type wrong 8-digit code | Error sheet 'Invalid code...' + 'Try Again' resets flow | Medium | Not Tested |  |
| Manual entry | Type correct 8-digit code | Success sheet 'Successfully signed in/out!' toggling on current state | Medium | Not Tested |  |
| Success sheet | Tap 'Done' | Resets flow to idle | Medium | Not Tested |  |
| Pickup verify card | Tap 'Enter pickup code', enter valid code | Success view shows who's picking up whom | Medium | Not Tested |  |
| Pickup verify card | Enter invalid/expired code | Error state 'Invalid or expired code…' shown, code remains enterable | Medium | Not Tested |  |
| Randomization check | Trigger multiple pickup verifications and note outcome consistency | Results may vary run-to-run | Medium | Not Tested |  |

## Chat

### Chat — List

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Search | Type a partial/case-varied contact name | Live-filters chat threads correctly | Medium | Not Tested |  |
| Search | Search to zero matches | Verify what renders | Low | Not Tested |  |
| Thread row | Tap a thread | Navigates to chat thread | Medium | Not Tested |  |

### Chat — Thread

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header | Tap Video icon button | Should start a video call | Low | Not Tested |  |
| Input bar | Tap Paperclip icon | Should open file picker | Low | Not Tested |  |
| Input bar | Type a message, press Enter or tap Send | Appends new sent message with current time | Medium | Not Tested |  |
| Input bar | Try sending empty/whitespace-only input | No-op, nothing sent | Medium | Not Tested |  |
| Invalid thread id | Visit with a garbage thread id | Should show error/not-found | Medium | Not Tested |  |

## Events

### Events

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header | Tap '+ Create' | Opens Create Event modal | Medium | Not Tested |  |
| Create Event modal | Leave Title/Date/Start Time blank, try Create Event | Disabled until all 3 required fields filled | Medium | Not Tested |  |
| Create Event modal | Enter arbitrary text in Start/End Time (free-text, not a real time picker) | Should validate time format | Medium | Not Tested |  |
| Create Event modal | Toggle 'Require RSVP' | Visual state toggles correctly | Medium | Not Tested |  |
| Create Event modal | Fill valid form, Create Event | New event appears live in list without reload | Medium | Not Tested |  |
| Event card | Tap 'Cancel Event' | Should visually mark event as cancelled or remove it | High | Not Tested |  |
| Empty state | View with 0 events | 'No upcoming events.' shows | Medium | Not Tested |  |

## Gallery

### Gallery

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Tabs | Switch 'All Photos' (masonry grid) / 'Folders' (grouped by date) | Both render correctly | Medium | Not Tested |  |
| Broken image | Load a photo with a broken/invalid URL | SafeImage shows fallback icon + 'Image unavailable' | Medium | Not Tested |  |
| StoryViewer | Tap a thumbnail in either tab | Opens full-screen Stories-style viewer with segmented progress bar | Medium | Not Tested |  |
| StoryViewer | Wait 5s without interacting | Auto-advances to next photo, closes viewer after last photo's timer | Medium | Not Tested |  |
| StoryViewer | Swipe left/right on a touch device (threshold 48px) | Navigates to next/previous photo correctly | Medium | Not Tested |  |
| StoryViewer | Tap left-third / right-third zones | Previous/Next navigation triggers without overlapping the close button | Medium | Not Tested |  |
| StoryViewer | Use keyboard arrows/Escape (desktop fallback) | Navigates/closes correctly | Medium | Not Tested |  |
| StoryViewer | Tap 'Previous' on the first photo | Disabled/no-op as expected | Medium | Not Tested |  |

## Incidents

### Incidents

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header | Tap '+ Log' | Opens Log sheet in Incident mode | Medium | Not Tested |  |
| Incident cards | Verify severity pill (minor/moderate/severe), status pill (Open/Under Review/Resolved), parent-notified bell indicator | Matches expected behavior, no errors | Medium | Not Tested |  |
| Incident cards | Verify 'Action/Resolution' box label changes to 'Resolution' once status is Resolved | Matches expected behavior, no errors | Medium | Not Tested |  |
| IncidentForm | Leave Child/Severity/Description blank, try 'Log Incident' | Disabled until all 3 required fields set | Medium | Not Tested |  |
| IncidentForm | Open Child dropdown | Verify it includes family-invited children, not just creche roster | Medium | Not Tested |  |
| IncidentForm | Verify 'Notify parent' toggle default state | Defaults to checked/true; can be unchecked | Medium | Not Tested |  |
| IncidentForm | Fill required fields, tap 'Log Incident' | New incident appears at top of list | Medium | Not Tested |  |
| Persistence | Log an incident, then reload the page | Incident should still be present | Medium | Not Tested |  |

## Medication

### Medication

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Summary chips | Verify Scheduled/Given/Missed counts | Matches expected behavior, no errors | Medium | Not Tested |  |
| Scheduled dose | Tap 'Administered' | Marks dose administered, stamps administeredBy/administeredAt | Low | Not Tested |  |
| Scheduled dose | Tap 'Missed' | Opens reason modal (optional textarea) | Medium | Not Tested |  |
| Missed reason modal | Tap 'Cancel' | Discards, dose remains scheduled | Medium | Not Tested |  |
| Missed reason modal | Leave reason blank, tap 'Confirm Missed' | Marks missed with default note 'No reason given.' | Medium | Not Tested |  |
| Missed reason modal | Enter a reason, Confirm Missed | Marks missed with that note, clears administered fields | Medium | Not Tested |  |
| State transition | After marking Administered or Missed, look for an undo path | No undo exists — one-way transition, confirm intentional | Low | Not Tested |  |

## Fees

### Fees

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Summary card | Manually recompute balance from invoice list and compare to displayed 'Outstanding Balance' | Should match | Medium | Not Tested |  |
| Screen | Look for any pay/settle CTA | None present — confirm caregivers can only view, not pay fees (unlike parent app) | Low | Not Tested |  |
| Status pills | Verify paid/pending/overdue color coding per invoice | Matches data | Medium | Not Tested |  |

## Announcements

### Announcements

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header | Tap '+ Post' | Opens Create Announcement modal | Medium | Not Tested |  |
| Create Announcement modal | Leave Title/Message blank, try 'Post Announcement' | Disabled until both required fields set | Medium | Not Tested |  |
| Create Announcement modal | Toggle 'Mark as Urgent' | Preview badge+border styling should reflect urgency | Medium | Not Tested |  |
| Create Announcement modal | Fill valid form, Post Announcement | New announcement appears live in list without reload | Medium | Not Tested |  |
| Empty state | View with 0 announcements | 'No announcements yet.' shows | Medium | Not Tested |  |
| Persistence | Post an announcement, reload the page | Persists correctly via storage | Medium | Not Tested |  |
| Nav presence | Verify LogSheet is NOT mounted on this page (only BottomNav) | Confirm intentional vs Events/Incidents/Medication which do mount LogSheet | Medium | Not Tested |  |

## Notifications

### Notifications

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Sections | Verify 'New' (unread) and 'Earlier' (read) sections each hide when empty | Matches expected behavior, no errors | Medium | Not Tested |  |
| Empty overall state | View with 0 notifications in both sections | Should show an empty-state message | Medium | Not Tested |  |
| Row interaction | Tap a notification row | Should navigate to source or mark read | Low | Not Tested |  |
| Nav dead-end | Arrive here via Home's Bell icon, then try to leave without the header back button | No BottomNav/LogSheet present — only the header back button provides an exit | Medium | Not Tested |  |

## Ratings

### Ratings

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Average card | Verify average number, star fill rounding, distribution bars (5→1 stars) with percentages | Matches expected behavior, no errors | Medium | Not Tested |  |
| Empty state | View with 0 ratings | 'No ratings yet.' shows; average shows '—' instead of a number | Medium | Not Tested |  |
| Feedback list | Verify parent initials, 'Parent of {childId}' formatting, star rating, feedback text, date | No raw ids leak in the formatted text | Medium | Not Tested |  |
| Read-only check | Look for any respond/dispute action | None present — confirm intentional (caregiver cannot respond to ratings) | Low | Not Tested |  |
| Multi-caregiver check | Verify data is scoped to the logged-in caregiver, not always 'cg-1' | Should reflect the actual logged-in caregiver | Medium | Not Tested |  |

## Report

### Report

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Filter | Tap 'Filter by date', select a date | Child list should filter by that date | High | Not Tested |  |
| Tabs | Switch Children/Pending/Sent Report stat-chips | Each shows correct icon+count and active-tab styling | Medium | Not Tested |  |
| Child row (pending) | Tap a pending child | Opens Log sheet in Report mode | Medium | Not Tested |  |
| Child row (sent) | Tap a 'sent' child | Opens Daily Report Viewer read-only | Medium | Not Tested |  |
| LogReportForm | Leave Mood/Meal/Nap/Hygiene (all marked required) completely blank, tap 'Log Report' | Should be blocked | High | Not Tested |  |
| LogReportForm | Enter letters into the Meal field (numeric-only intended) | Should reject non-numeric input | Medium | Not Tested |  |
| LogReportForm | Use Nap Time 'Add More' button to add multiple time ranges | Each confirmed range becomes a removable chip | Medium | Not Tested |  |
| LogReportForm | Fill all fields and submit | Success screen '...successfully logged and sent to the parent.' + Close | Medium | Not Tested |  |
| Report status sync | After submitting a report for a Pending child, check the Report page's Pending/Sent tab for that child | Child should move from Pending to Sent | High | Not Tested |  |

## Settings

### Settings — Home

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Rows | Tap Edit Profile / Notifications / Change PIN / Help & Support | Each navigates to correct sub-page | Medium | Not Tested |  |
| Logout | Tap 'Log Out' | Clears pin/userName/userRole from storage, redirects to auth | Medium | Not Tested |  |
| Logout | Log back in after logout | Onboarding screen should be skipped (onboarding flag persists post-logout) — confirm intentional | Medium | Not Tested |  |

### Settings — Edit Profile

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Avatar | Tap 'Change Photo' | Should open a file picker | Low | Not Tested |  |
| Form | Enter a malformed email address, Save | Should be rejected | Medium | Not Tested |  |
| Form | Leave Full Name blank, Save Changes | Should be blocked | Medium | Not Tested |  |
| Save Changes | Tap Save Changes, wait, then reload the page | Should persist changes | Medium | Not Tested |  |

### Settings — Notifications

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Toggles | Toggle each of 5 notification rows (all default enabled), navigate away and back | Should persist toggle state | Medium | Not Tested |  |

### Settings — Change PIN

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Step 1 (Current PIN) | Enter anything other than the demo PIN (123456) | Shows 'Incorrect PIN. Use 123456 for demo.' and auto-clears after 800ms | Medium | Not Tested |  |
| Step 1 | Enter 123456 | Advances to New PIN step | Medium | Not Tested |  |
| Step 2 (New PIN) | Enter any 6 digits | Auto-advances to Confirm step | Medium | Not Tested |  |
| Step 3 (Confirm) | Enter a mismatched PIN | Shows 'PINs don't match. Try again.' and auto-clears after 800ms | Medium | Not Tested |  |
| Step 3 (Confirm) | Enter matching PIN | Success screen 'PIN Changed!' shows | Medium | Not Tested |  |
| Step 3 edge case | Attempt to reach Confirm step with an empty newPin state | Should not be possible to bypass validation | Low | Not Tested |  |
| Header back arrow | Tap back arrow at each step | Step-aware: returns to previous step (clearing that step's value), except step 1 which returns to previous screen | Medium | Not Tested |  |
| Success screen | Tap 'Back to Settings' | Returns to settings | Medium | Not Tested |  |

### Settings — Help & Support

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Rows | Tap each of 5 rows (Chat Support/FAQs/Call Us/Email Us/Rate the App) | Should perform the described action | Medium | Not Tested |  |
| Footer | Verify version string matches actual release version at go-live | Should match real version | Low | Not Tested |  |
