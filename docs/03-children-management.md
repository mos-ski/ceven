# Child Management — Product Requirements Document

## 1. Purpose

The Child Management module provides a comprehensive system for managing enrolled children — from the initial enrollment through daily activity tracking, health monitoring, payment management, development milestones, and parent contacts. It is the core operational module of the CEven platform.

---

## 2. Screens

### 2.1 Children List Page

**Page Header:**
- Title: "Children"
- Action buttons: "Enroll a Child" (outline), "Log Activity" (dropdown with options: Log Daily Report, New Picture/Video, Log Incident)

**Stat Cards (4):**

| Stat | What It Shows |
|---|---|
| Total Enrolled | Number of children in the system |
| Active | Currently active enrollments |
| New This Month | Children enrolled in the current month |
| Average Activity Log | Log completion rate per child |

**Children Table ("Children Log"):**

| Column | Content |
|---|---|
| Checkbox | Bulk selection |
| Child | Name + gender/blood group |
| Age | Computed from date of birth |
| Room | Current room assignment |
| Parent Name | Guardian name and email |
| Status | Present (green), Late (amber), or Absent (red) |
| Health Flag | Red flag icon if allergies/conditions exist |
| Fee Status | Paid (green), Overdue (red), or Pending (amber) badge |
| Action | "Log" dropdown + three-dot menu |

**Row Actions:**
- **Log dropdown:** Log Daily Report, New Picture/Video, Log Incident
- **More menu:** View Profile, Reassign Caregiver, Change Room, Contact Guardian

**Filters:**
- Room filter (All Rooms, Lion, Panda, Owl, Bear)
- Status filter (All Status, Present, Late, Absent)
- Search by child name or parent name

---

### 2.2 Child Profile Page

A detailed profile for an individual child, accessed by clicking "View Profile" from the children list.

**Header:**
- "Back to Children" navigation link
- "Log Activity" outline button
- "AI Parent Update" gradient button (generates AI-powered parent update)

**Profile Banner:**
- Dark brown gradient background with decorative circles
- Large initials avatar with gold border
- Child ID (e.g., CEV-2024-0018)
- Full name
- Demographics: gender, age, blood group
- Active status badge and room assignment

**AI Observations Banner:**
- Dismissible amber card with Ada's AI-generated observations about the child's progress
- Example: "King has shown improved social engagement this week. His mood score is trending up at 4.2/5."

**Tab Navigation (6 tabs):**

---

#### Tab 1: Overview

**Info Cards (3×2 grid):**

| Card | Shows |
|---|---|
| Room | Current room assignment |
| Subscription Plan | Plan type and price |
| Gender | Child's gender |
| Status | Active/Inactive |
| Blood Group | Blood type |
| Guardian | Primary guardian name |

**Primary Parent Card:**
- Parent avatar with initials
- Name and email
- "Message" and "Call" action buttons

**Mood Trend Chart:**
- 7-day bar chart showing daily mood scores (1–5 scale)
- Average mood score for the week

**Health Status Card:**
- Allergies (e.g., "Peanuts" in red)
- Last checkup date
- Health flag status

---

#### Tab 2: Activity Log

**Today's Log Card:**
- 6 data points displayed in a grid:
  - Morning Mood (e.g., "Happy 😊")
  - Breakfast (e.g., "Ate well")
  - Nap (e.g., "1hr 20min")
  - Play (e.g., "Active")
  - Afternoon Mood (e.g., "Calm 😌")
  - Departure (e.g., "3:45 PM")

**Caregiver Note:**
- Amber callout card with a personal note from the caregiver
- Includes caregiver name and timestamp

**Log History Table:**
- Columns: Date, Mood, Meals, Nap, Activity, Caregiver, Notes
- Historical records of daily activity logs

---

#### Tab 3: Health Status

**Health Information Card:**
- Height, Weight, Blood Group
- Allergies, Medications, Medical Notes
- Displayed as key-value pairs

**Prescriptions & Documents Card:**
- List of uploaded medical documents (PDFs)
- Each shows file icon, name, date, and "View" button

---

#### Tab 4: Payment History

**Filter Toolbar:**
- Date filter, Status filter (All/Successful/Failed), Search

**Payment Table:**
- Columns: Room Plan (plan name + amount), Reference ID, Amount, Date, Invoice, Status (Successful/Failed badge), Action (Download Receipt)

---

#### Tab 5: Development & Behaviour

**Development Milestones Card:**
- Checklist of developmental milestones
- Each shows achieved (green checkmark) or not achieved (grey circle)
- Examples: Walks independently, Says 10+ words, Follows 2-step instructions

**Photo Gallery:**
- 3×2 grid of photo placeholders
- Upload capability for new photos

---

#### Tab 6: Contact

**Authorized Persons Table:**
- Columns: Name, Relationship, Phone, Email, Access Level, Action
- Access levels shown as colored badges: Primary (dark), Secondary (outlined), Emergency (amber)
- "Add Contact" button in header
- Edit action per row

---

## 3. User Actions Summary

| Action | Where | Result |
|---|---|---|
| Enroll a child | Children list header or Dashboard | Opens enrollment modal |
| Log activity | Children list header or row action | Opens activity logging form |
| View profile | Row "More" menu | Navigates to child profile |
| Reassign caregiver | Row "More" menu | Opens reassignment form |
| Change room | Row "More" menu | Opens room change form |
| Contact guardian | Row "More" menu | Opens messaging or dialer |
| AI Parent Update | Profile header button | Generates AI-written parent update |
| Message parent | Profile Overview tab | Opens message composition |
| Call parent | Profile Overview tab | Initiates phone call |
| Add contact | Profile Contact tab | Opens contact form |
| Download receipt | Profile Payment History | Downloads payment receipt |
| Dismiss AI banner | Profile page | Hides AI observations banner |

---

## 4. Data Displayed Per Child

| Category | Data Points |
|---|---|
| Identity | Name, gender, blood group, age, child ID |
| Enrollment | Room, subscription plan, enrollment date, status |
| Parent/Guardian | Name, email, phone, relationship, access level |
| Health | Allergies, medications, height, weight, medical notes, documents |
| Activity | Daily mood, meals, nap, play, departure, caregiver notes |
| Financial | Payment history, fee status, outstanding balance |
| Development | Milestones achieved, photos |
| AI Insights | Mood trend, behavioral observations, welfare flags |

---

## 5. User Stories & Acceptance Criteria

### US-1: Admin Views Children Roster
**As a** crèche administrator,  
**I want to** see a list of all enrolled children with key details,  
**so that** I can quickly find and manage any child.

**Acceptance Criteria:**
- [ ] Children page displays 4 stat cards: Total Enrolled, Active, New This Month, Average Activity Log
- [ ] Children table shows: checkbox, child name/gender/blood group, age, room, parent name/email, status, health flag, fee status, actions
- [ ] Status is color-coded: Present (green), Late (amber), Absent (red)
- [ ] Fee status shows as badge: Paid (green), Overdue (red), Pending (amber)
- [ ] Health flag shows a red flag icon when allergies/conditions exist
- [ ] Table supports search by child name or parent name
- [ ] Table supports filtering by Room and Status

---

### US-2: Admin Filters Children by Room or Status
**As a** crèche administrator,  
**I want to** filter the children list by room or attendance status,  
**so that** I can focus on a specific subset of children.

**Acceptance Criteria:**
- [ ] Room filter dropdown includes: All Rooms, Lion, Panda, Owl, Bear
- [ ] Status filter dropdown includes: All Status, Present, Late, Absent
- [ ] Filters update the table results immediately
- [ ] Multiple filters can be applied simultaneously
- [ ] Search input filters by child name or parent name

---

### US-3: Admin Logs an Activity for a Child
**As a** crèche administrator,  
**I want to** log a daily report, picture/video, or incident for a specific child,  
**so that** I can maintain accurate activity records.

**Acceptance Criteria:**
- [ ] Each row has a "Log" dropdown with options: Log Daily Report, New Picture/Video, Log Incident
- [ ] Selecting an option opens the corresponding logging form
- [ ] The "Log Activity" button in the page header provides the same options

---

### US-4: Admin Views Child Profile
**As a** crèche administrator,  
**I want to** view a detailed profile for any child,  
**so that** I can see their complete history and current status.

**Acceptance Criteria:**
- [ ] Clicking "View Profile" from the row menu navigates to the child's profile page
- [ ] Profile page shows a banner with child's initials, ID, name, demographics, status, and room
- [ ] "Back to Children" link returns to the children list
- [ ] Profile has 6 tabs: Overview, Activity Log, Health Status, Payment History, Development & Behaviour, Contact

---

### US-5: Admin Views Child Overview Tab
**As a** crèche administrator,  
**I want to** see a summary of a child's key information on their Overview tab,  
**so that** I can quickly assess their status.

**Acceptance Criteria:**
- [ ] Overview tab shows 6 info cards: Room, Subscription Plan, Gender, Status, Blood Group, Guardian
- [ ] Primary Parent card shows parent avatar, name, email, and Message/Call buttons
- [ ] Mood Trend chart shows a 7-day bar chart with average mood score
- [ ] Health Status card shows allergies, last checkup date, and health flag

---

### US-6: Admin Views Child Activity Log
**As a** crèche administrator,  
**I want to** see today's activity log and historical logs for a child,  
**so that** I can track their daily routine and identify patterns.

**Acceptance Criteria:**
- [ ] Today's Log card shows 6 data points: Morning Mood, Breakfast, Nap, Play, Afternoon Mood, Departure
- [ ] Caregiver Note displays a personal message with caregiver name and timestamp
- [ ] Log History table shows: Date, Mood, Meals, Nap, Activity, Caregiver, Notes
- [ ] Table supports filtering by date

---

### US-7: Admin Views Child Health Status
**As a** crèche administrator,  
**I want to** see a child's health information and medical documents,  
**so that** I can ensure their safety and well-being.

**Acceptance Criteria:**
- [ ] Health Information card shows: Height, Weight, Blood Group, Allergies, Medications, Medical Notes
- [ ] Prescriptions & Documents card lists uploaded medical documents with file icon, name, date, and View button
- [ ] Allergies are highlighted in red when present

---

### US-8: Admin Views Child Payment History
**As a** crèche administrator,  
**I want to** see a child's payment history,  
**so that** I can track their financial status.

**Acceptance Criteria:**
- [ ] Payment table shows: Room Plan, Reference ID, Amount, Date, Invoice, Status, Action
- [ ] Status shows as badge: Successful (green) or Failed (red)
- [ ] Action column has a Download Receipt button
- [ ] Table supports filtering by date and status
- [ ] Table supports search

---

### US-9: Admin Tracks Child Development Milestones
**As a** crèche administrator,  
**I want to** track a child's developmental milestones,  
**so that** I can monitor their growth and share progress with parents.

**Acceptance Criteria:**
- [ ] Development Milestones card shows a checklist of milestones
- [ ] Each milestone shows achieved (green checkmark) or not achieved (grey circle)
- [ ] Photo Gallery shows a 3×2 grid of photo placeholders
- [ ] Upload capability is available for new photos

---

### US-10: Admin Manages Child Contacts
**As a** crèche administrator,  
**I want to** manage authorized persons for a child,  
**so that** I know who is allowed to pick up or make decisions for the child.

**Acceptance Criteria:**
- [ ] Authorized Persons table shows: Name, Relationship, Phone, Email, Access Level, Action
- [ ] Access levels are color-coded: Primary (dark), Secondary (outlined), Emergency (amber)
- [ ] "Add Contact" button opens a contact form
- [ ] Edit action is available per row

---

### US-11: Admin Generates AI Parent Update
**As a** crèche administrator,  
**I want to** generate an AI-written update for a child's parent,  
**so that** I can communicate progress efficiently.

**Acceptance Criteria:**
- [ ] "AI Parent Update" button is visible in the profile header
- [ ] Clicking it triggers AI generation of a parent update message
- [ ] Generated message is ready to send or copy

---

### US-12: Admin Dismisses AI Observations Banner
**As a** crèche administrator,  
**I want to** dismiss the AI observations banner on a child's profile,  
**so that** I can clear my view after reviewing the insights.

**Acceptance Criteria:**
- [ ] AI Observations Banner appears at the top of the child profile
- [ ] Banner shows Ada's observations about the child's progress
- [ ] Close (X) button dismisses the banner
- [ ] Dismissed banner does not reappear during the same session

- No real CRUD operations — cannot actually create, update, or delete children
- No file upload for photos or medical documents
- No real health record management or medical document storage
- No development milestone tracking persistence
- No parent portal integration
- No export functionality (CSV, PDF)
- No bulk operations beyond checkbox selection
- No pagination for large rosters
- No real-time status updates
