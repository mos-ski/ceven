# V2 Creche Admin — Go-Live Test Plan

**Total test cases:** 432 · **Modules covered:** 11 · **High priority:** 31

How to use this doc: work through it module by module, screen by screen. For each row, perform the Test Case and compare against Expected Result, then fill in **Status** (Pass / Fail / Blocked) and **Comment**.

---

## Auth

### Login

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Login | Log in with valid email + password | Redirects to dashboard | High | Not Tested |  |
| Login | Log in with invalid/garbage credentials | Should show 'Invalid email or password' error | High | Not Tested |  |
| Login | Submit with blank email/password | Blocked by required-field validation | Medium | Not Tested |  |
| Login | Toggle password show/hide eye icon | Password visibility toggles | Medium | Not Tested |  |
| Login | Toggle 'Remember Me' checkbox | Checkbox state toggles | Medium | Not Tested |  |
| Login | Click 'Forgot Password' | Navigates to reset password flow | Medium | Not Tested |  |
| Login | Click Google / Apple buttons | Verify behavior (may be decorative) | Low | Not Tested |  |
| Login | Click 'Get Started' footer link | Navigates to signup | Medium | Not Tested |  |
| Login | Throttle network and reload | Loading skeleton renders correctly | Low | Not Tested |  |

### Signup

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Signup | Submit with Creche Name + Email + matching passwords + ToS checked | Redirects to verify-email with email param | Medium | Not Tested |  |
| Signup | Submit with mismatched Password / Confirm Password | Should block submission | High | Not Tested |  |
| Signup | Type password and observe strength meter | 3-bar meter reflects length/uppercase/digit rules | Medium | Not Tested |  |
| Signup | Submit with ToS checkbox unchecked | Blocked by required checkbox | Medium | Not Tested |  |
| Signup | Click 'Log in' footer link | Navigates to login | Medium | Not Tested |  |

### Verify Email

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Verify Email | Enter 6-digit OTP and submit | Should validate the code | High | Not Tested |  |
| Verify Email | Let countdown reach 0:00 | Resend option should become available | Medium | Not Tested |  |
| Verify Email | Click Back button | Returns to previous screen | Medium | Not Tested |  |

### Reset Password

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Reset Password (request) | Submit with valid email | Redirects to reset-password verification | Medium | Not Tested |  |
| Reset Password OTP | Enter OTP and continue | Redirects to new-password screen | Medium | Not Tested |  |
| New Password | Submit mismatched new/confirm password | Should block submission | High | Not Tested |  |
| New Password | Submit weak password | Strength meter reflects weakness; verify if weak passwords are blocked | Medium | Not Tested |  |
| New Password | Click Back button | Returns to previous screen | Medium | Not Tested |  |

## Onboarding (Marketing Lead Funnel)

### Get Started

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Persona select | Click 'creche admin/director' | Advances into Admin branch | Medium | Not Tested |  |
| Admin branch | Step through Capacity slider → Locations → Current tools → Staff count → Email | Each step auto-advances; final email step is regex-validated | Medium | Not Tested |  |
| Admin branch | Submit invalid email format on final step | Continue button blocked | Medium | Not Tested |  |
| Admin branch | Submit valid email on final step | Routes to signup flow | Medium | Not Tested |  |
| Any branch | Click Back at each step | Returns to prior step correctly | Medium | Not Tested |  |
| Any branch | Refresh mid-flow | Resets to step 1 (no persistence) — confirm expected | Medium | Not Tested |  |
| Persona select | Click 'Already have an account? Log in' | Navigates to login | Medium | Not Tested |  |
| Parent/Caregiver branches | Complete a non-admin branch to the end | Shows handoff screen (does not create a real account) | Low | Not Tested |  |

## Dashboard

### Main Dashboard

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header | Click notification bell | Opens notification panel with badge count | Medium | Not Tested |  |
| Header | Click 'AI Reports' toggle | Opens AI chat panel; layout swaps Quick Actions bar in, Room Occupancy replaces Upcoming Events, Activity Feed hides | Medium | Not Tested |  |
| Header | Click 'Enroll' banner button | Opens Enroll Child modal | Medium | Not Tested |  |
| Quick Actions (AI panel open) | Click Add Child | Opens Enroll modal | Medium | Not Tested |  |
| Quick Actions | Click QR Station | Routes to Daily Operations | Medium | Not Tested |  |
| Quick Actions | Click New Log | Opens Log Activity modal (daily-report mode) | Medium | Not Tested |  |
| Quick Actions | Click New Invoice | Opens New Invoice modal | Medium | Not Tested |  |
| Quick Actions | Click View Reports | Routes to Intelligence → Reports section | Medium | Not Tested |  |
| Quick Actions | Click Customize → add a 6th action | Should be capped; verify only 5 render on dashboard bar | Medium | Not Tested |  |
| Quick Actions | Customize → Cancel vs Save Changes | Cancel discards selection changes, Save persists | Medium | Not Tested |  |
| Onboarding checklist | Interact with Onboarding Checklist widget | Dismiss/complete states behave correctly | Medium | Not Tested |  |
| Stat cards | Wait 30s and observe | Values refresh via polling, 'Last updated' timestamp updates, 'Refreshing…' indicator shows | Medium | Not Tested |  |
| Stat cards | Resize to mobile width | Cards become horizontally scrollable/snap | Medium | Not Tested |  |
| AI Daily Brief | Click 'Open AI Center' | Navigates to Intelligence section | Medium | Not Tested |  |
| AI Daily Brief | Click 'Take Action' on Health/Finance/Performance insights | Routes to the correct tag-specific page | Medium | Not Tested |  |
| Upcoming Events panel | Click 'Go to Calendar' | Routes to Communication → Events Calendar | Medium | Not Tested |  |
| Room Occupancy panel (AI panel open) | Click 'View All' | Routes to Children → Rooms & Classes | Medium | Not Tested |  |
| Activity Feed | Click 'Go to Daily Operations' | Navigates correctly (hidden when AI panel open) | Medium | Not Tested |  |
| Outstanding Payments table | Click 'View All' | Routes to Finance | Medium | Not Tested |  |
| Outstanding Payments table | Click per-row 'Reminder/Send' button | Verify behavior (may be decorative) | Medium | Not Tested |  |
| Pending Enrollments table | Click 'View All' | Routes to Children → Enrolment & Waitlist | Medium | Not Tested |  |
| Pending Enrollments table | Click per-row 'View' button | Verify behavior (may be decorative) | Medium | Not Tested |  |
| Both bottom tables | Resize to mobile width | Desktop table swaps for mobile card layout correctly | Medium | Not Tested |  |
| AI Chat Panel (Ada) | Send a quick-prompt chip | Canned reply appears | Medium | Not Tested |  |
| AI Chat Panel (Ada) | Type a custom/unscripted message | Fallback reply still returned, no crash | Medium | Not Tested |  |
| AI Chat Panel (Ada) | Close panel via X | Panel closes, layout reverts | Medium | Not Tested |  |

## Children

### Children — Main List

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header actions | Click 'Enroll a Child' | Opens Enroll Child modal | Medium | Not Tested |  |
| Header actions | Click 'Log Activity' → Log Daily Report / New Picture-Video / Log Incident | Opens Log Activity modal in respective mode | Medium | Not Tested |  |
| Stat cards | Verify Total Enrolled / Active / New This Month / Avg Activity Log values | Match underlying data | Medium | Not Tested |  |
| Children Log table | Search by child name | Table filters live, case-insensitive | Medium | Not Tested |  |
| Children Log table | Search by parent name | Table filters live | Medium | Not Tested |  |
| Children Log table | Filter by Room (Lion/Panda/Owl/Bear) | Table filters correctly | Medium | Not Tested |  |
| Children Log table | Filter by Status (Present/Late/Absent) | Table filters correctly | Medium | Not Tested |  |
| Children Log table | Search/filter to zero results | Empty state 'No children match your search or filters.' shows | Medium | Not Tested |  |
| Children Log table | Click a child row | Navigates to child profile | High | Not Tested |  |
| Children Log table | Per-row Log dropdown → each of 3 modes | Opens Log Activity modal pre-filled with that child | Medium | Not Tested |  |
| Children Log table | Kebab → View Profile | Navigates to child profile page | High | Not Tested |  |
| Children Log table | Kebab → Reassign Caregiver | Opens modal, select required, Cancel/Reassign → success 'Caregiver Reassigned' | Medium | Not Tested |  |
| Children Log table | Kebab → Change Room | Opens modal excluding current room, Cancel/Move Child → success 'Room Updated' | Medium | Not Tested |  |
| Children Log table | Kebab → Contact Guardian | Opens modal, message required, Cancel/Send Message → success 'Message Sent' | Medium | Not Tested |  |
| Log Activity Modal | Submit 'Log Daily Report' completely blank | Should be blocked | Medium | Not Tested |  |
| Log Activity Modal | Fill and submit 'Log Daily Report' (Mood/Breakfast/Nap/Lunch/Activity/Diaper/Note) | Success 'Daily Report Logged' | Medium | Not Tested |  |
| Log Activity Modal | Submit 'New Picture/Video' with file + caption | Success 'Media Uploaded' (upload may be simulated) | Low | Not Tested |  |
| Log Activity Modal | Fill and submit 'Log Incident' (Type/Severity/Time/Description/Notify checkbox) | Success 'Incident Logged' | Medium | Not Tested |  |
| Children Log table | Resize to mobile width | Card list variant renders with same click-through behavior | Medium | Not Tested |  |

### Children — Enrolment & Waitlist

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Overview stats | Verify Active Enquiries / Waitlisted / Total Enrolled / Leavers counts | Matches expected data, no errors | Medium | Not Tested |  |
| AI Predicts banner | Dismiss banner (X) | Banner hides | Medium | Not Tested |  |
| Quick Actions | Click 'New Enquiry' | Opens New Enquiry modal | Medium | Not Tested |  |
| Enrolment table | Use Sort by / Filter Status / Filter Room / Search | Verify each is functional | Medium | Not Tested |  |
| Enrolment table | Select rows via checkbox → bulk bar appears | 'N children selected' bar shows Decline all / Approve all | Medium | Not Tested |  |
| Enrolment table | Click 'Approve all N' in bulk bar | Records should change to Approved status | High | Not Tested |  |
| Enrolment table | Click per-row 'View Details' | Should open a details view | Medium | Not Tested |  |
| Enrolment table | Click pagination Previous/Next | Should page through records | Low | Not Tested |  |
| New Enquiry modal | Submit blank form | Should be blocked | Medium | Not Tested |  |
| New Enquiry modal | Fill Child Name/DOB/Gender/Allergies/Room + Parent Name/Email, submit | Success 'Enquiry Added' | Medium | Not Tested |  |

### Children — Enquiry Pipeline (Kanban)

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Kanban board | Drag a card between all 4 columns (Enquiry Received/Visit Scheduled/Trial Booked/Offer Made) | Card moves and stage updates | Medium | Not Tested |  |
| Kanban board | Drag to an empty column | 'Drop here' placeholder shows | Medium | Not Tested |  |
| Kanban board | Verify urgency badges (overdue/high-priority flame icon) | Render per urgency data | Medium | Not Tested |  |
| Card preview modal | Click a card in 'Enquiry Received' | Preview opens with Request Info + Schedule Visit actions | Medium | Not Tested |  |
| Schedule Visit modal | Fill Date/Time (required) + Staff/Notes, submit | Moves enquiry to 'Visit Scheduled' + success modal | Medium | Not Tested |  |
| Book Trial modal (from Visit Scheduled) | Fill Date/Time/Room/Duration/Staff/Notes, submit | Moves to 'Trial Booked' + success | Medium | Not Tested |  |
| Make Offer modal (from Trial Booked) | Fill Room/Start Date/Plan (required) + notes, submit | Moves to 'Offer Made' + success | Medium | Not Tested |  |
| Decline Reason modal | Select a reason checkbox + notes, submit | Moves to 'Declined' + success 'Request Declined' | Medium | Not Tested |  |
| Request Info modal | Fill textarea, submit | Success 'Request Sent'; stage unchanged | Medium | Not Tested |  |
| Approve action (from Offer Made) | Click Approve directly | Moves to 'Enrolled' + success 'Request Approved' | Medium | Not Tested |  |

### Children — Waitlist

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Filters | Filter by Status (Waiting/Offered/Expired) + Search by child name | List filters correctly | Medium | Not Tested |  |
| Filters | Filter/search to zero results | Empty state message shows | Medium | Not Tested |  |
| Row detail | Click a row or kebab | Row Detail modal opens read-only (Child/Room Requested/Date Added/Wait Period/Siblings/Status) | Medium | Not Tested |  |

### Children — Trial Sessions

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header action | Click 'Schedule Trial' | Modal opens: Child select (waitlist only)/Room/Date/Period/Assigned To/Notes | Medium | Not Tested |  |
| Schedule Trial modal | Submit valid form | Success 'Trial Scheduled' | Medium | Not Tested |  |
| Filters | Filter by Room/Status (Upcoming/Successful/Not Suitable/No Show/Rescheduled) + Search | List filters correctly | Medium | Not Tested |  |
| Row detail | Click a row | Row Detail modal opens read-only (Child/Room/Trial Date/Period/Assigned To/Notes) | Medium | Not Tested |  |

### Children — Leavers

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Filters | Filter by Room/Survey Status (Completed/Pending/Not Sent) + Search | List filters correctly | Medium | Not Tested |  |
| Row detail | Click a row | Row Detail modal opens read-only (Child/Room/Reason/Last Day/Notice/Exit Survey/Data Archived) | Medium | Not Tested |  |
| Add leaver | Look for an 'Add Leaver' CTA | None present — confirm this is intentional | Low | Not Tested |  |

### Children — Caregivers

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header action | Click 'Add Caregiver' | Modal opens: Select Caregiver + Assign Room (required), Backup Room (optional) | Medium | Not Tested |  |
| Add Caregiver modal | Submit valid form | Success 'Caregiver Added' | Medium | Not Tested |  |
| Caregivers table | Search box | Filters caregiver list | Medium | Not Tested |  |
| Caregivers table | Click per-row 'Reassign' button | Should open reassignment flow | Medium | Not Tested |  |
| Caregivers table | Resize to mobile width | Card list variant renders | Medium | Not Tested |  |

### Children — Rooms & Classes

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header action | Click 'New Room' | Modal opens: Room Name + emoji picker, Age Range, Capacity (required), Assign Caregiver, 'Enable Waitlist' toggle | Medium | Not Tested |  |
| New Room modal | Toggle 'Enable Waitlist' on | Reveals Waitlist Hold Period select | Medium | Not Tested |  |
| New Room modal | Submit valid form | Success 'Room Created' | Medium | Not Tested |  |
| Room cards grid | Verify enrolled/capacity progress bar % per room | Matches data; confirm no per-card edit action exists (view-only) | Low | Not Tested |  |

### Children — Parents

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Stat cards | Verify Registered/Active In-app/New This Month/Avg App Rating | Values render correctly | Medium | Not Tested |  |
| Parents table | Use search box | Should filter list | Medium | Not Tested |  |
| Parents table | Verify 'Emergency Contact' column | Should show distinct emergency contact data | Medium | Not Tested |  |
| Parents table | Click 'Send App Invite' link on a non-installed parent | Should send/trigger invite | Medium | Not Tested |  |
| Parents table | Click kebab → View Profile | Navigates to parent profile | High | Not Tested |  |
| Parents table | Resize to mobile width | Card list variant renders with same click-through | Medium | Not Tested |  |

### Children — Child Profile

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Routing | Visit profile with an invalid/bogus child id | Shows 404 page | Medium | Not Tested |  |
| Header | Click 'Back to Children' | Returns to children list | Medium | Not Tested |  |
| Header | Click 'Log Activity' dropdown → each of 3 modes | Opens Log Activity modal correctly, same as list-level | Medium | Not Tested |  |
| Header | Click '✦ AI Parent Update' | Verify behavior (may be decorative) | Low | Not Tested |  |
| Profile banner | Dismiss 'Ada AI Observations' banner | Hides; verify behavior on reload | Medium | Not Tested |  |
| Tabs | Click through Overview / Activity Log / Health Status / Payment History / Development & Behaviour / Contact | Each tab renders correct content, no crash | Medium | Not Tested |  |
| Overview tab | Click Message/Call on Primary Parent card | Verify behavior (may be decorative) | Low | Not Tested |  |
| Health Status tab | Click 'Log Growth' | Opens Log Growth modal (Previous Weight read-only, New Weight, Height, BMI, Note) | Medium | Not Tested |  |
| Log Growth modal | Submit completely blank | Should be blocked | Medium | Not Tested |  |
| Log Growth modal | Fill and submit valid values | Success 'Growth Record Logged' | Medium | Not Tested |  |
| Health Status tab | Click 'View' on a prescription/document | Should open/download document | Low | Not Tested |  |
| Payment History tab | Use Filter (Date/Status) and Search | Should filter table | Low | Not Tested |  |
| Payment History tab | Click 'Receipt' download on a row | Should download a file | Low | Not Tested |  |
| Development & Behaviour tab | Verify milestone checklist and photo gallery placeholder | Read-only, confirm expected for this build stage | Low | Not Tested |  |
| Contact tab | Click 'Add Contact' | Should open a modal to add an authorized person | Medium | Not Tested |  |
| Contact tab | Click per-row 'Edit' on Authorized Persons table | Should allow editing | Medium | Not Tested |  |

## Staff

### Staff — Members List

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header action | Click 'Add Staff' | Opens Add Staff modal choice screen (Manual Entry vs Bulk Upload) | Medium | Not Tested |  |
| Stat cards | Verify Total Staff / On Duty Today / Absent / Avg Log Compliance | Matches expected data, no errors | Medium | Not Tested |  |
| Ada AI Flags banner | Dismiss (X) | Banner hides | Medium | Not Tested |  |
| Toolbar | Sort Newest First / Oldest First | List re-sorts by date correctly | Medium | Not Tested |  |
| Toolbar | Filter Status (All/Active/Absent/Pending/Suspended) | List filters correctly | Medium | Not Tested |  |
| Toolbar | Search by name/email | List filters correctly | Medium | Not Tested |  |
| Toolbar | Search/filter to zero results | Empty state 'No staff match your search or filters.' shows | Medium | Not Tested |  |
| Table | Click a staff row | Navigates to staff profile | High | Not Tested |  |
| Table | Kebab → View Profile | Navigates to profile | High | Not Tested |  |
| Table | Kebab → Edit Member | Opens Edit Member modal | Medium | Not Tested |  |
| Table | Kebab → Deactivate | Opens Deactivate Member modal | Low | Not Tested |  |
| Table | Resize to mobile width | Card list variant renders with same interactions | Medium | Not Tested |  |

### Staff — Add Staff (Manual Entry)

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Step 1 (Staff Info) | Leave Name/Email/Phone/Role blank and try Continue | Continue disabled/blocked | Medium | Not Tested |  |
| Step 1 (Staff Info) | Fill Name/Email/Phone + select Role + Class, Continue | Advances to Step 2 | Medium | Not Tested |  |
| Step 2 (Salary Details) | Toggle Tax/Pension/Other deductions on/off, switch %/₦ mode | Net-pay calculation updates live correctly | Medium | Not Tested |  |
| Step 2 (Salary Details) | Leave Employment Type/Salary/Bank Name/Account Number blank and try Continue | Continue disabled/blocked | Medium | Not Tested |  |
| Step 2 (Salary Details) | Fill all required fields, Continue | Advances to Step 3 | Medium | Not Tested |  |
| Step 3 (Documents) | Upload ID Verification / Work Experience docs (simulated) | File shows with delete/trash icon | Medium | Not Tested |  |
| Step 3 (Documents) | Click 'Save & Add Another' | Should reset form to Step 1 for a new entry | High | Not Tested |  |
| Step 3 (Documents) | Click 'Add Staff' | Closes modal, staff member is added | Medium | Not Tested |  |
| Any step | Navigate back through all sub-steps | Back button returns to correct prior step | Medium | Not Tested |  |

### Staff — Add Staff (Bulk Upload)

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Step 1 | Select/drag an Excel file (simulated) | File shows as selected; 'Extract & Review' enables | Medium | Not Tested |  |
| Step 2 (Extract & Review) | Review extracted rows, toggle Select All/Deselect All | Selection state updates correctly | Medium | Not Tested |  |
| Step 2 (Extract & Review) | Deselect all rows and try 'Confirm & Add' | Button disabled at 0 selected | Medium | Not Tested |  |
| Step 3 | Confirm with N rows selected | Success screen shows correct count | Medium | Not Tested |  |
| Choice screen | Verify both Manual Entry and Bulk Upload are reachable, and Back returns to choice screen | Navigation works both directions | Medium | Not Tested |  |

### Staff — Edit / Deactivate Modals

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Edit Member | Edit Name/Email/Phone, change Role, toggle permission matrix, toggle 'Send invite', Save Changes | Changes save correctly | Medium | Not Tested |  |
| Deactivate Member | Select a reason (or 'Others' + free text), Cancel | Modal closes, no change | Medium | Not Tested |  |
| Deactivate Member | Select a reason, Confirm Action | Staff member status updates to deactivated/suspended | Medium | Not Tested |  |

### Staff — Attendance Log

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Toolbar | Week filter / Status filter | Should filter grid | Low | Not Tested |  |
| Toolbar | Search by name/email | Filters correctly | Medium | Not Tested |  |
| Weekly grid | Verify Mon–Sat ✓/✗ icons and Compliance Score color thresholds (≥80% green, ≥50% amber, else red) | Colors match thresholds | Medium | Not Tested |  |
| Table | Search to zero results | Empty state shows | Medium | Not Tested |  |
| Table | Select checkboxes | Should trigger a bulk action bar | Low | Not Tested |  |

### Staff — Role Management

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Toolbar | Date Created filter | Should filter table | Low | Not Tested |  |
| Toolbar | Access Level filter dropdown | Filters correctly | Medium | Not Tested |  |
| Header action | Click 'Add New Role' | Opens Role Form modal (create mode) | Medium | Not Tested |  |
| RoleFormModal (create) | Fill Role Name/Description/Invite Staff/Permissions grid, Save | Should create new role row | High | Not Tested |  |
| Table | Click Edit pencil on a role | Opens Role Form modal (edit mode) pre-filled | Medium | Not Tested |  |
| RoleFormModal (edit) | Change permissions, Save Changes | Should update the table row | High | Not Tested |  |
| Table | Click Delete trash icon | Opens Delete Role modal confirmation | Medium | Not Tested |  |
| DeleteRoleModal | Click 'Yes, Remove' | Should remove role from table | High | Not Tested |  |
| DeleteRoleModal | Click 'No, Cancel' | Modal closes, no change | Medium | Not Tested |  |

### Staff — Leaderboard

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Top-3 cards | Verify medal-colored rank badges, Trophy icon, points | Render correctly | Medium | Not Tested |  |
| Filter | Click 'This Month' filter button | Should open a dropdown menu | Medium | Not Tested |  |
| Ranking table | Verify Rank/Compliance bar/Attendance %/Incidents/Parent Rating stars/Points columns | Data renders correctly with color thresholds | Medium | Not Tested |  |

### Staff — Leave Management

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header action | Click 'Create Leave Preference' | Modal opens: Leave Type, Days Per Year, Applies To | Medium | Not Tested |  |
| Create Leave Preference modal | Fill and Save Preference | Should persist new preference | Medium | Not Tested |  |
| Stat cards | Verify Pending/Approved/Rejected/On Leave Today counts | Match data | Medium | Not Tested |  |
| Leave Request sub-tab | Click ✓ Approve on a pending row | Opens Leave Decision modal confirmation | Medium | Not Tested |  |
| LeaveDecisionModal | Confirm 'Yes, Approve' or 'Yes, Reject' | Should update request status | High | Not Tested |  |
| Leave Balances sub-tab | Filter by Type (All/Annual/Sick/Others) | Column groups show/hide correctly per filter | Medium | Not Tested |  |
| Calendar sub-tab | Verify month grid, leave entries, 'Blocked' days | Renders correctly | Medium | Not Tested |  |
| Calendar sub-tab | Click Prev/Next month | Should navigate months | Medium | Not Tested |  |
| Calendar sub-tab | Click 'View All' on Upcoming Leave | Should show full list | Low | Not Tested |  |
| Copy check | Verify tab label spelling | Tab should be spelled 'Calendar' correctly | Low | Not Tested |  |

### Staff — Compliance & Safety

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header action | Click 'Record New' on each sub-tab (DBS/Fire Drill/Food Hygiene/Risk Assessment) | Opens Record New modal with fields matching that sub-tab | Medium | Not Tested |  |
| RecordNewModal | Fill and Save Record | Should persist new record | Medium | Not Tested |  |
| Stat cards | Verify Compliant Materials/Due This Month/Overdue/Next Inspection per sub-tab | Match data | Medium | Not Tested |  |
| DBS/Police Checks | Verify status badges Valid/Renew Soon/Expired; click kebab menu | No action wired on kebab — confirm | Low | Not Tested |  |
| Fire & Safety Drill | Click 'Schedule New Drill' | Verify behavior (may be decorative) | Medium | Not Tested |  |
| Food Hygiene | Verify pass/fail temp status rendering | Matches data | Medium | Not Tested |  |
| Risk Assessment | Verify risk-level dot + action-taken badge | Matches data | Medium | Not Tested |  |

### Staff — Staff Profile

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Routing | Visit profile with invalid staff id | Shows 404 page | Medium | Not Tested |  |
| Header | Click 'Suspend Account' | Should suspend the staff account | High | Not Tested |  |
| Header | Click 'Disable Account' | Should disable the staff account | High | Not Tested |  |
| Header | Click 'Export Log' | Should export activity log | High | Not Tested |  |
| Documents card | Click 'View' on a document | Should open document | Low | Not Tested |  |
| Documents card | Use drag-drop upload area | Should upload a new document | Low | Not Tested |  |
| Log History | Use Date Range/Activity Type filter buttons | Should filter log | Low | Not Tested |  |

## Parents

### Parents — Parent Profile

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Routing | Visit profile with invalid parent id | Shows 404 page | Medium | Not Tested |  |
| Header | Click 'Back' | Returns to Children → Parents tab | High | Not Tested |  |
| Header | Click '✦ AI Parent Update' | Verify behavior (may be decorative) | Low | Not Tested |  |
| Profile banner | Click 'Send App Invite' (if not installed) | Should send invite | Medium | Not Tested |  |
| Tabs | Switch between Activity Log and Payment History | Both render correctly | Medium | Not Tested |  |
| Activity Log tab | Click 'Filter by: Date' | Should filter log | Low | Not Tested |  |
| Payment History tab | Click 'Payslips' download per row | Should download file | Low | Not Tested |  |

## Finance

### Finance — Wallet (empty/first-run state)

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Empty state | Trigger empty wallet state | 'Set Up Your Wallet' card shows, Get Started button visible | Medium | Not Tested |  |
| Wallet Wizard Step 1 (Business Info) | Leave Business Name/BVN blank, try Continue | Continue blocked | Medium | Not Tested |  |
| Wallet Wizard Step 1 | Toggle Account Type Business/Personal | Personal shows warning note | Medium | Not Tested |  |
| Wallet Wizard Step 1 | Fill Business Name + valid 11-digit BVN, Continue | Advances to Step 2 | Medium | Not Tested |  |
| Wallet Wizard Step 2 (Bank Details) | Select Bank + enter 10-digit Account Number, blur field | Spinner, then fetched account name + name-match banner (green match / amber mismatch) | Medium | Not Tested |  |
| Wallet Wizard Step 2 | Try Continue before account fetched | Continue blocked | Medium | Not Tested |  |
| Wallet Wizard Step 3 (Verify) | Send OTP, enter any 6 digits, Verify | Verifies successfully | Medium | Not Tested |  |
| Wallet Wizard Step 3 | Complete verification | 'Wallet Activated!' success → 'Go to Wallet' switches to funded dashboard | Medium | Not Tested |  |
| Wallet Wizard | Refresh mid-wizard | Resets to empty state (progress not persisted, only completion is) — confirm expected | Medium | Not Tested |  |
| Wallet Wizard | Close via X before completing | Returns to empty state without marking complete | Medium | Not Tested |  |
| Wallet Wizard Step 1 | Click Back on step 1 | Back button disabled on first step | Medium | Not Tested |  |

### Finance — Wallet (funded/complete state)

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Balance card | Verify Available/Pending In/Pending Out amounts | Match data | Medium | Not Tested |  |
| Balance card | Click 'Withdraw' | Opens Withdrawal Request modal | Medium | Not Tested |  |
| Balance card | Click 'Deposit' | Opens Deposit Info modal | Medium | Not Tested |  |
| Pending Approvals | Click Approve/Reject on a pending withdrawal | Should update approval status | Medium | Not Tested |  |
| Transaction History | Filter by Type (Credit/Debit) | Filters correctly | Medium | Not Tested |  |
| Transaction History | Filter by Category (8 options) | Filters correctly | Medium | Not Tested |  |
| Transaction History | Search by description | Filters correctly | Medium | Not Tested |  |
| Transaction History | Filter to zero results | Empty state 'No transactions match your filters.' shows | Medium | Not Tested |  |
| Transaction History | Click per-row 'Details' | Should show transaction details | Low | Not Tested |  |
| Bank Account card | Click 'Update' | Opens Bank Account Update modal | Medium | Not Tested |  |

### Finance — Withdrawal Request

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Amount step | Enter amount below ₦100 minimum | Shows below-minimum error, Continue blocked | Medium | Not Tested |  |
| Amount step | Enter amount exceeding available balance | Shows insufficient-funds error, Continue blocked | Medium | Not Tested |  |
| Amount step | Enter exactly ₦100 (boundary) | Passes validation, fee (₦50 flat) calculated correctly | Medium | Not Tested |  |
| Amount step | Enter non-numeric characters | Automatically stripped from input | Medium | Not Tested |  |
| Amount step | Personal account type | Shows approval-required warning | Medium | Not Tested |  |
| Review step | Verify full breakdown before 'Verify & Withdraw' | Amounts match amount step | Medium | Not Tested |  |
| OTP step | Enter any 6 digits | Verifies successfully | Medium | Not Tested |  |
| Success step | Click 'Done' | Modal resets and closes, request marked pending approval | Medium | Not Tested |  |

### Finance — Deposit Info / Bank Account Update

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Deposit Info | Click 'Copy' on account number | Copies to clipboard, shows checkmark for 2s | Medium | Not Tested |  |
| Deposit Info | Enter deposit amount | Live fee calc (₦50 flat, ₦100 min) updates correctly | Medium | Not Tested |  |
| Bank Account Update | Select new bank + 10-digit account, blur | Auto-fetch + name-match check runs | Medium | Not Tested |  |
| Bank Account Update | Complete OTP step (any 6 digits) | Success 'Bank Account Updated' | Medium | Not Tested |  |

### Finance — Billing & Payments

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header actions | Click 'New Invoice' | Opens New Invoice modal | Medium | Not Tested |  |
| Header actions | Click 'Record Payment' | Opens Record Payment modal | Medium | Not Tested |  |
| Header actions | Click 'Export' | Should export data | Low | Not Tested |  |
| Collection chart | Click filter button | Should change chart period | Low | Not Tested |  |
| Invoice Tracking table | Filter 'All Status' | Should filter table | Low | Not Tested |  |
| Invoice Tracking table | Search box | Should filter table | Medium | Not Tested |  |
| Invoice Tracking table | Click per-row kebab menu | Should show row actions | Low | Not Tested |  |
| Invoice Tracking table | Verify risk-level colored dot (Low/Medium/High) | Renders correctly per row | Medium | Not Tested |  |
| NewInvoiceModal | Select Child → verify Parent Name auto-populates | Read-only field fills correctly | Medium | Not Tested |  |
| NewInvoiceModal | Leave any of 4 fields blank, try Create Invoice | Button disabled/blocked | Medium | Not Tested |  |
| NewInvoiceModal | Fill all 4 fields, click Create Invoice | Should create a new invoice in the list | Medium | Not Tested |  |
| RecordPaymentModal | Select Child → verify Parent Name auto-populates, fill Amount/Next Payment/Status, submit | Should record payment | Medium | Not Tested |  |

### Finance — Expenses

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header action | Click 'New Expense' | Opens New Expense modal | Medium | Not Tested |  |
| NewExpenseModal | Leave Date/Category/Description/Amount blank, try Submit | Button disabled/blocked | Medium | Not Tested |  |
| NewExpenseModal | Fill required fields + upload receipt, Submit | Should create expense entry | Medium | Not Tested |  |
| Expense Log table | Filter Category/Status/Date + Search | Should filter table | Low | Not Tested |  |
| Expense Log table | Click per-row kebab | Should show row actions | Low | Not Tested |  |
| Reoccurring Bills / Budget vs Actual / Expense Breakdown | Verify charts render correctly with data | Matches expected data, no errors | Medium | Not Tested |  |

### Finance — Payroll

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header action | Click 'New Salary Setup' | Opens modal with staff/employment/salary/bank fields | Medium | Not Tested |  |
| New Salary Setup modal | Fill and Save Setup | Should persist setup | Medium | Not Tested |  |
| This Month sub-tab | Select staff via checkboxes (and select-all) | Floating bar 'N staff selected — [total]' appears with Pay Selected button | Medium | Not Tested |  |
| This Month sub-tab | Select 0 staff | Floating bar/Pay Selected not shown | Medium | Not Tested |  |
| RunPayrollModal | Select a pay-for-month that's already paid | Option is disabled in the select | Medium | Not Tested |  |
| RunPayrollModal | Select enough staff to exceed wallet balance | Shows red 'Insufficient Balance' warning + 'Top Up Wallet' link routing to Finance | Medium | Not Tested |  |
| RunPayrollModal | With sufficient balance, Confirm & Pay → OTP (any 6 digits) → Done | Success 'Payroll Processed' summary shows correct totals | Medium | Not Tested |  |
| Payroll History sub-tab | Filter by Month | Should filter table | Low | Not Tested |  |
| Payroll History sub-tab | Click 'View Details' | Should show payroll detail | Low | Not Tested |  |
| Salary Setup sub-tab | Click 'Edit' on an existing entry | Should open edit modal | Medium | Not Tested |  |

### Finance — Financial Reports

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header action | Click 'Export Report' | Should download a report | Low | Not Tested |  |
| Stat cards | Verify Report Summary values with up/down trend icons | Match data | Medium | Not Tested |  |
| P&L breakdown | Click 'This Month' filter | Should change period shown | Low | Not Tested |  |
| Revenue by Room Plan table | Filter by Category + Search | Should filter table | Low | Not Tested |  |
| Revenue by Room Plan table | Click through pagination pages | Should show different rows per page | Medium | Not Tested |  |
| Cash Flow Insight | Verify Cash In/Out bar chart and summary cards | Match data with correct trend colors | Medium | Not Tested |  |

## Daily Operations

### Daily Operations — Reception/QR Station

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Action buttons | Click 'Simulate Parent Scan' | Dispatches a random parent+child attendance log to Live Feed | Medium | Not Tested |  |
| Action buttons | Click 'Simulate Staff Scan' | Dispatches a staff attendance log to Live Feed | Medium | Not Tested |  |
| Action buttons | Click 'Log Exception' | Opens Log Exception modal | Medium | Not Tested |  |
| Action buttons | Click 'Manual Check-In' | Opens Manual Check-In modal | Medium | Not Tested |  |
| QRDisplay panel | Verify live QR code renders and matches current backup numeric code | Matches expected data, no errors | Medium | Not Tested |  |
| QRDisplay panel | Click Download / Print | Should download/print QR | Low | Not Tested |  |
| QRDisplay panel | Click 'Regenerate now' → Cancel the native confirm dialog | QR code should NOT regenerate | Medium | Not Tested |  |
| QRDisplay panel | Click 'Regenerate now' → Accept the native confirm dialog | Old QR code invalidates, new code generated | Medium | Not Tested |  |
| LiveFeed panel | Trigger a scan, verify it appears in feed | Real scan appears; without any scans, example rows show with disclaimer | Medium | Not Tested |  |
| LiveFeed panel | Trigger an exception | Exception row is highlighted red | Medium | Not Tested |  |
| AttendanceGrid panel | Filter by Room | Grid filters correctly | Medium | Not Tested |  |
| AttendanceGrid panel | Use search box / 'All Users' filter | Should filter grid | Low | Not Tested |  |
| AttendanceGrid panel | Verify status colors (IN=green, Absent=red, Pending=amber) | Colors correct for both staff and children cards | Medium | Not Tested |  |
| ManualCheckInModal | Select Action (Check In/Check Out) + Name + Time + Reason, Confirm and Record | Should record the check-in/out | High | Not Tested |  |
| LogExceptionModal | Toggle Person Type Staff/Child | Name dropdown source switches accordingly | Medium | Not Tested |  |
| LogExceptionModal | Fill fields, click 'Log Exception' | Should record exception | High | Not Tested |  |

### Daily Operations — Daily Logs

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header action | Click 'Remind Caregivers' | Should send reminders | Medium | Not Tested |  |
| Stat cards | Verify Submitted Today/Pending Today (with room breakdown)/Today's Compliance % | Matches expected data, no errors | Medium | Not Tested |  |
| AI Insights banner | Dismiss (X) | Should hide banner | Low | Not Tested |  |
| Table | Filter by Status/Room/Date + Search | Should filter table | Low | Not Tested |  |
| Table | Click 'View' on a Done/AI Flag row | Opens Daily Report Details modal (read-only) | Medium | Not Tested |  |
| Table | Click 'Log Now' on a Pending/blank row | Should open a logging flow | Medium | Not Tested |  |
| Table | Click through pagination pages 2–10 | Should show different rows | Medium | Not Tested |  |
| Table | Select checkboxes | Should trigger bulk action bar | Low | Not Tested |  |

### Daily Operations — Health & Incidents

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header action | Click 'Raise Incident' | Opens Report Incident modal | Medium | Not Tested |  |
| ReportIncidentModal | Fill Child/Type/Severity/Time/Description/Notify checkbox, Submit Report | Should confirm submission | Medium | Not Tested |  |
| Stat cards | Verify Open/This Month/Resolved/Parent Notified | Values render correctly | Medium | Not Tested |  |
| AI Insights banner | Dismiss (X) | Should hide | Medium | Not Tested |  |
| Table | Filter by Severity/Status and Date, Search by child name/type | Filters apply correctly per field | Medium | Not Tested |  |
| Table | Click a row or kebab | Opens View Incident modal (read-only: Type/Severity/Time/Actions Taken/Raised By/Note/Witness/Parent Notified) | Medium | Not Tested |  |

### Daily Operations — Medication

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header action | Click 'Log Medication' | Opens Log Medication modal (Child/Medication/Dosage/Time/Status/Notes) | Medium | Not Tested |  |
| LogMedicationModal | Submit blank/partial form | Should be blocked | Medium | Not Tested |  |
| LogMedicationModal | Fill and Save Log | Should record without confirmation screen — verify expected UX | Medium | Not Tested |  |
| Table | Filter Status + Date + Search | Filters apply correctly per field | Medium | Not Tested |  |
| Table | Click a row | Opens View Medication modal read-only | Medium | Not Tested |  |
| ViewMedicationModal | Click 'View/Close Past Medications' toggle | Reveals history sub-table if entry has history | Medium | Not Tested |  |

### Daily Operations — Inventory & Supplies

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Stock Levels sub-tab | Click 'Add Item' | Opens Add/Restock modal | Medium | Not Tested |  |
| Add/Restock modal | Fill and Save Item | Should persist new stock item | Medium | Not Tested |  |
| Stock Levels sub-tab | Filter Category + Search | Should filter list | Low | Not Tested |  |
| Stock Levels sub-tab | Click a row/kebab | Opens Update Item modal pre-filled | Medium | Not Tested |  |
| UpdateItemModal | Edit fields, Save & Update | Should persist changes | Medium | Not Tested |  |
| Equipment Register sub-tab | Click 'Register New Equipment' | Opens Register Equipment modal | Medium | Not Tested |  |
| Register Equipment modal | Fill and Save Equipment | Should persist | Medium | Not Tested |  |
| Equipment Register sub-tab | Filter Status/Room + Search, click Update/View link | Should filter and open detail | Low | Not Tested |  |
| Orders sub-tab | Click 'New Order' | Opens New Order modal (Supplier/Items/Quantity/Total Cost) | Medium | Not Tested |  |
| New Order modal | Fill and Place Order | Should persist order | Medium | Not Tested |  |
| Orders sub-tab | Filter Status + click 'Update' on Pending row | Should filter and allow update | Low | Not Tested |  |
| Stat cards | Verify Low Stock Alerts/Total Items/Pending Orders | Values render correctly | Low | Not Tested |  |

### Daily Operations — Facilities

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Maintenance sub-tab | Click 'New Maintenance Request' | Opens modal (Area/Issue/Priority/Assigned To) | Medium | Not Tested |  |
| New Maintenance Request modal | Fill and Submit Request | Should persist request | Medium | Not Tested |  |
| Maintenance sub-tab | Filter Priority/Status + Search, click 'View' | Should filter and show detail | Low | Not Tested |  |
| Cleaning Schedule sub-tab | Click a checkbox card to mark cleaning done | Badge/status should update to reflect completion | High | Not Tested |  |
| Cleaning Schedule sub-tab | Click 'Schedule Cleaning' | Opens modal (Room/Area, Frequency) | Medium | Not Tested |  |
| Schedule Cleaning modal | Fill and Save Schedule | Should persist | Medium | Not Tested |  |
| Stat cards | Verify Open Request/Resolved This Month/Ongoing Maintenance | Values render correctly | Low | Not Tested |  |

### Daily Operations — Tasks

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header action | Click 'Add Task' | Opens modal (Task title/Assigned To/Due Date/Priority) | Medium | Not Tested |  |
| Add Task modal | Fill and Save Task | Should persist new task | Medium | Not Tested |  |
| Sub-tabs | Switch between 'Assigned Tasks' and 'Special Request' | Should show different content per tab | High | Not Tested |  |
| Table | Filter Priority/Status + Search | Should filter table | Low | Not Tested |  |
| Table | Select checkboxes / click kebab | Should trigger bulk bar / row actions | Low | Not Tested |  |
| Stat cards | Verify Assigned Task/Special Request/Pending/Completed counts | Values render correctly | Medium | Not Tested |  |

## Communication

### Communication — Messages

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header action | Click 'New Message' | Clears selection, shows Compose view | Medium | Not Tested |  |
| Left panel | Use Search box | Should filter conversation list | Medium | Not Tested |  |
| Left panel | Click Date filter button | Should filter by date | Low | Not Tested |  |
| Left panel | Switch filter tabs All Messages/Read/Unread | List filters correctly | Medium | Not Tested |  |
| Left panel | Filter to Unread with none unread | Empty state 'No Message Yet' shows | Medium | Not Tested |  |
| Left panel | Click a message row | Selects conversation, shows unread-dot/active-highlight styling | Medium | Not Tested |  |
| ComposeView | Fill Recipient/Subject/Message and click a quick-prompt chip/template card | Should populate or send message | Medium | Not Tested |  |
| ComposeView | Click 'Cancel' | Should discard and return | Low | Not Tested |  |
| ComposeView | Fill all fields and click 'Send Message' | Message should send | High | Not Tested |  |
| ConversationView | Click Contact button / kebab menu | Should show contact info / options | Low | Not Tested |  |
| ConversationView | Type a reply and click emoji/camera/paperclip icons | Should attach/insert content | Low | Not Tested |  |
| ConversationView | Type a reply and click 'Send Message' | Reply should append to thread | High | Not Tested |  |

### Communication — Announcements

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header action | Click 'New Announcement' | Should open a composer | High | Not Tested |  |
| Announcement Log (left) | Use Search / Date Filter | Should filter log | Low | Not Tested |  |
| Send Announcement form (right) | Select Audience + Type, fill Subject/Message | Fields accept input correctly | Medium | Not Tested |  |
| Send Announcement form | Click a quick-prompt chip | Message textarea populates with prompt text (functional) | Medium | Not Tested |  |
| Send Announcement form | Click a Templates grid card | Message textarea populates with template excerpt (functional) | Medium | Not Tested |  |
| Send Announcement form | Click '✦ AI Create' pill | Verify behavior (may be decorative) | Low | Not Tested |  |
| Send Announcement form | Fill form and click 'Send Announcement' | Announcement should send and appear in log | High | Not Tested |  |

### Communication — Events Calendar

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header action | Click 'New Event' | Should open event creation | High | Not Tested |  |
| Month grid | Click Prev/Next month | Should navigate months | Medium | Not Tested |  |
| Month grid | Verify event chips show title/time/status badge | Renders correctly (Approved/Pending/Cancelled) | Medium | Not Tested |  |
| Upcoming Events panel | Search by event title | Filters correctly | Medium | Not Tested |  |
| Upcoming Events panel | Click Date Filter button | Should filter by date | Low | Not Tested |  |
| Upcoming Events panel | Search to zero results | Empty state 'No Upcoming Events' with helper text shows | Medium | Not Tested |  |

## Intelligence

### Intelligence — AI Command Center

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header | Click Date filter / '✦ Refresh Analysis' / 'Export Report' | Should each perform their action | Low | Not Tested |  |
| Top grid | Verify Recent Incidents & Flags and AI Analysis & Recommendations panels render read-only content | Matches expected data, no errors | Medium | Not Tested |  |
| Staff & Finance panel | Verify Staff Compliance progress bars and Outstanding Payments list | Matches expected data, no errors | Medium | Not Tested |  |
| Staff & Finance panel | Click Quick Templates cards (Incident Report/Parent Notice) | Should use template | Low | Not Tested |  |
| Ada chat panel (desktop) | Send a message and a quick-prompt chip | Typing indicator then reply | Medium | Not Tested |  |
| Ada chat panel (desktop) | Click 'Personalize' link | Verify behavior (may be decorative) | Low | Not Tested |  |
| Ada chat panel (mobile) | Resize to mobile, tap FAB | Opens fullscreen Ada Chat overlay | Medium | Not Tested |  |
| Ada chat panel (mobile) | Tap X to close overlay | Returns to AI Command Center | Medium | Not Tested |  |
| Ada chat panel | Navigate away and back to this tab | Chat history should NOT persist (local component state only) — confirm expected | Medium | Not Tested |  |

### Intelligence — Analytics

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Sub-tabs | Switch Overview/Attendance/Revenue/Staff | Each renders correct charts/content, no crash | Medium | Not Tested |  |
| Overview sub-tab | Verify 4 stat cards, mini Attendance/Revenue charts, Room Engagement bars | Matches expected data, no errors | Medium | Not Tested |  |
| Overview sub-tab | Fill embedded Send Announcement form and click 'Send Announcement' | Should send | Medium | Not Tested |  |
| Header button | Click 'Announcement' (Overview/Attendance/Revenue tabs) or '✦ Refresh' (Staff tab) | Should perform action | Low | Not Tested |  |
| Staff sub-tab | Verify Staff Compliance & Rating list with highlighted flagged rows | Renders correctly | Medium | Not Tested |  |

### Intelligence — Reports

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Header action | Click 'Generate Report' | Should open report generation | Medium | Not Tested |  |
| Generated Reports table | Filter by Type/Status | Should filter table | Low | Not Tested |  |
| Generated Reports table | Click 'Download' on a Ready-status row | Should download file | Low | Not Tested |  |
| Generated Reports table | Verify Scheduled/Generating rows show no action | Correct, matches status | Medium | Not Tested |  |

### Intelligence — Audit Trail

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Filters | Use 'All Actors' and Date filters | Should filter log | Low | Not Tested |  |
| Log list | Verify AI entries show bot icon/dark badge, human entries show user icon/tan badge | Icons differ correctly by actor type | Medium | Not Tested |  |

## Account & Setup

### Account & Setup — Plans & Access

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Step 1 (Choose Plan) | Toggle Billing cycle Monthly/Quarterly(-15%)/Yearly(-20%) | All 3 plan card prices recalculate live and correctly | Medium | Not Tested |  |
| Step 1 | Click 'Subscribe' on Nuture | Advances to Step 2 with that plan selected (no add-ons flow) | Medium | Not Tested |  |
| Step 1 | Click 'Upgrade' on Nuture Max | Advances to Step 2 with that plan (add-ons flow) | Medium | Not Tested |  |
| Step 1 | Click 'Current Plan' button on Nuture Pro | Should be inert/non-clickable since already subscribed — confirm intentional | Medium | Not Tested |  |
| Step 1 | Verify Feature Comparison table ✓/✗ cells | Matches plan feature lists | Medium | Not Tested |  |
| Step 2 (Nuture, no add-ons) | Toggle billing-cycle radio | Totals recalculate live | Medium | Not Tested |  |
| Step 2 (Nuture) | Fill Billing Info + Card Info with garbage/alphabetic characters in Card Number/CVV/Expiry | Should be rejected | Medium | Not Tested |  |
| Step 2 (Nuture) | Click Back | Returns to Step 1 | Medium | Not Tested |  |
| Step 2 (Nuture) | Click 'Pay ₦X.00' with all fields empty | Should be blocked | Medium | Not Tested |  |
| Step 2 (Nuture Pro/Max, add-ons) | Toggle 'Add to Plan'/'Remove From Plan' on each of 5 add-ons | Summary Total Amount and VAT should recompute based on selection | High | Not Tested |  |
| Step 2 (add-ons) | Deselect all add-ons and click Continue | Continue remains enabled; helper text 'No add-ons selected yet' shows | Medium | Not Tested |  |
| Step 3 (add-ons plans) | Verify extra 'Add-ons' line item in base charges summary | Line item appears and reflects selected add-ons | Medium | Not Tested |  |
| Any step | Switch plans mid-flow | Add-on selections reset correctly for the new plan type | Medium | Not Tested |  |

### Account & Setup — Help & Training

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Setup Progress card | Verify % complete and checklist ✓ states | Read-only, matches actual completion | Medium | Not Tested |  |
| FAQ Accordion | Click multiple questions in sequence | Only one FAQ item open at a time; first item open by default | Medium | Not Tested |  |
| Role Based Guides | Search box | Filters guide list by title | Medium | Not Tested |  |
| Role Based Guides | Click a guide | Opens Article view with sections + embedded image placeholder | Medium | Not Tested |  |
| ArticleView | Click 'Back' (circular arrow) | Returns to guides list | Medium | Not Tested |  |
| ArticleView | Use search while inside an open article | Guide sidebar list still filters correctly, can switch articles without leaving | Medium | Not Tested |  |
| Ask Ada panel | Send a message, click quick-prompt chips | Reply appears; scripted initial conversation shows by default | Medium | Not Tested |  |
| Ask Ada panel | Click 'Personalize' link | Verify behavior (may be decorative) | Low | Not Tested |  |

### Account & Setup — Settings: Branch Profile

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Branch Profile | Edit Creche Name/Email/Phone/Address, click 'Save Changes' | Should persist changes with confirmation | Medium | Not Tested |  |

### Account & Setup — Settings: Notification Preferences

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Notification prefs | Toggle Email/SMS checkboxes per preference row | Each toggles independently (local state, no persistence/Save button) | Medium | Not Tested |  |

### Account & Setup — Settings: Security

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Security | Edit Branch Name/Email/Phone, click 'Save Changes' | Should persist | Medium | Not Tested |  |
| Security | Toggle 'Activity Status' checkbox | Toggles correctly (local state) | Medium | Not Tested |  |
| Security | Look for password-change fields under 'Change password access' label | Should show password input fields | Medium | Not Tested |  |

### Account & Setup — Settings: Fee Plans

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Fee Plans table | Verify Plan/Amount/Billing Cycle/Applies To/Status columns render correctly | Matches expected data, no errors | Medium | Not Tested |  |
| Fee Plans | Click 'Add Plan' | Opens New Plan modal (Plan Name/Amount required, Duration select) | Medium | Not Tested |  |
| NewPlanModal | Leave Plan Name/Amount blank, try Create Plan | Button disabled/blocked | Medium | Not Tested |  |
| NewPlanModal | Fill required fields, click 'Create Plan' | New row appears in the table with status 'Draft' | Medium | Not Tested |  |

### Account & Setup — Settings: Admissions

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Admissions form | Toggle each field's enabled/disabled switch | Toggles correctly (local state) | Medium | Not Tested |  |
| Admissions form | Try toggling off a field marked 'Required' | Should be prevented/locked | Medium | Not Tested |  |

### Account & Setup — Settings: Role Access

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Role Access table | Click 'Add Role' | Opens Role Access modal (create mode) | Medium | Not Tested |  |
| Role Access table | Click Edit pencil on a role | Opens Role Access modal (edit mode) pre-filled | Medium | Not Tested |  |
| RoleAccessModal | Toggle 'Full Access' master switch | All 7 permission groups + children toggle on/off together | Medium | Not Tested |  |
| RoleAccessModal | Toggle a parent permission group checkbox | Cascades correctly to child checkboxes | Medium | Not Tested |  |
| RoleAccessModal | Toggle individual child checkboxes | Parent checkbox auto-derives correct checked/indeterminate state | Medium | Not Tested |  |
| RoleAccessModal | Click Invite Staff custom dropdown | Opens click-to-open list (not native select) | Medium | Not Tested |  |
| RoleAccessModal | Fill form, click 'Save Changes' | Should create/update the role row in the table | High | Not Tested |  |

### Account & Setup — Settings: AI Settings

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| AI Settings | Select Personality & Tone card (2 options) | Selection updates visually | Medium | Not Tested |  |
| AI Settings | Pick Display Gradient swatch (4 colors) | Selection updates visually | Medium | Not Tested |  |
| AI Settings | Select Alert Frequency option | Selection updates visually | Medium | Not Tested |  |
| AI Settings | Toggle AI Feature Controls rows | Toggles correctly | Medium | Not Tested |  |
| AI Settings | Change settings, switch tabs, switch back | Changes should be lost (no Save button, local-state only) — confirm expected | Medium | Not Tested |  |

### Account & Setup — Settings: Other Apps

| Feature / Flow | Test Case | Expected Result | Priority | Status | Comment |
|---|---|---|---|---|---|
| Integration cards | Click 'Manage' on a connected integration | Should open management flow | Low | Not Tested |  |
| Integration cards | Click 'Connect' on a non-connected integration | Should start connection flow | Low | Not Tested |  |
