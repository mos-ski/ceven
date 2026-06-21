# Intelligence — Product Requirements Document

## 1. Purpose

The Intelligence module is the AI Command Center — a dedicated space where administrators can view AI-powered analytics, health and welfare insights, staff compliance data, and financial intelligence. It includes a dedicated ADA chat interface for natural-language queries and quick actions.

---

## 2. Screens

### 2.1 Page Header

- Title: "AI Command Center"
- Date filter (e.g., "June 2026")
- "Refresh Analysis" gradient button
- "Export Report" outline button

---

### 2.2 Main Layout

Split into two sections:
- **Left Content Area** (flexible width) — analytics and insights
- **Right ADA Panel** (340px) — AI chat interface

---

### 2.3 Left Content — Top Two-Column Grid

#### Panel 1: Recent Incidents & Flags
- "Health & Welfare" gradient pill badge
- 4 incident cards, each with:
  - Title (e.g., "Minor Fall — Tiger Room")
  - Description (e.g., "Ade B., 9:14am. Caregiver notified parent.")

**Example Incidents:**
| Incident | Description |
|---|---|
| Minor Fall — Tiger Room | Ade B., 9:14am. Caregiver notified parent. |
| Allergy Alert — Lion Class | Leo A., peanut exposure suspected. Under observation. |
| Absence Pattern — Zara M. | 3 consecutive absences. Follow-up call recommended. |
| Medical Note Updated | Mia T.'s allergy list updated by Mrs. Amaka. |

#### Panel 2: AI Analysis & Recommendations
- "Health & Welfare Intelligence" gradient pill badge
- 4 AI insight cards, each with:
  - Title (e.g., "Attendance anomaly detected")
  - Description (e.g., "3 children in Lion Class have >40% absence rate this month.")

**Example Insights:**
| Insight | Description |
|---|---|
| Attendance anomaly detected | 3 children in Lion Class have >40% absence rate this month. |
| Health trend flagged | Uptick in minor injuries in Tiger Room — review play area. |
| Wellness check recommended | Zara M. showing behavioral changes — recommend parent consult. |
| Compliance gap identified | 2 children with outdated vaccination records. |

---

### 2.4 Left Content — Bottom Full-Width Card

#### Staff & Finance Intelligence
- "Staff & Finance Intelligence" gradient pill badge
- Date filter button

**Three-Column Grid:**

**Column 1: Staff Compliance**
- 4 staff members with:
  - Avatar with initials
  - Name and role
  - Compliance percentage (color-coded)
  - Progress bar (green for compliant, red for non-compliant)

| Staff | Role | Compliance |
|---|---|---|
| Mrs. Sarah | Caregiver | 92% (green) |
| Mr. James | Marketer | 12% (red) |
| Mrs. Ngozi | Caregiver | 87% (green) |
| Mrs. Anita | Admin | 52% (red) |

**Column 2: Outstanding Payments**
- 3 families with:
  - Family name
  - Overdue duration (in red)
  - Amount owed

| Family | Amount | Overdue |
|---|---|---|
| Okafor Family | ₦40,000 | 7 days overdue |
| Bello Family | ₦110,000 | 14 days overdue |
| Eze Family | ₦40,000 | 3 days overdue |

**Column 3: Quick Templates**
- 2 clickable template cards:
  - **Incident Report** — "Use template" link
  - **Parent Notice** — "Use template" link

---

### 2.5 Right ADA Panel

A dedicated AI chat interface for the Intelligence module.

**Header:**
- Star icon (gradient circle)
- "ADA" name in gold
- Green online indicator dot
- "Professional & Warm" mode label
- "Personalize" link

**Chat Messages:**
- Full multi-turn conversation demonstrating Ada's capabilities
- AI messages: cream background, left-aligned
- User messages: brown background, right-aligned
- Typing indicator with bouncing dots animation

**Pre-loaded Conversation Topics:**
1. Overnight data analysis summary (health, finance, compliance)
2. Full brief request and detailed response
3. Drafting a parent message about a child's absences

**Quick Prompts:**
- "Who hasn't paid?"
- "At-risk children?"
- "Draft announcement"

**Input:**
- Text input: "Ask Ada anything…"
- Send button (gradient circle)

---

## 3. User Actions Summary

| Action | Where | Result |
|---|---|---|
| Refresh Analysis | Header button | Reloads AI insights and data |
| Export Report | Header button | Downloads analytics report (not implemented) |
| Change date range | Date filter | Updates insights for selected period |
| Chat with Ada | ADA panel input | Sends natural-language query |
| Use quick prompt | Quick prompt buttons | Sends pre-filled query to Ada |
| Personalize Ada | "Personalize" link | Opens Ada configuration (not implemented) |
| Use template | Quick Templates | Opens template for use |
| View incident details | Incident cards | Opens incident detail view |

---

## 4. AI Assistant Capabilities

| Capability | Current Status |
|---|---|
| Natural language queries | Mock — hardcoded responses |
| Attendance analysis | Mock — static data |
| Health trend detection | Mock — static data |
| Financial intelligence | Mock — static data |
| Report generation | Not implemented |
| Announcement drafting | Not implemented |
| Real-time analysis | Not implemented |
| Parent message drafting | Mock — hardcoded response |

---

## 5. User Stories & Acceptance Criteria

### US-1: Admin Views Health & Welfare Incidents
**As a** crèche administrator,  
**I want to** see recent health and welfare incidents flagged by the AI,  
**so that** I can respond to safety concerns promptly.

**Acceptance Criteria:**
- [ ] Recent Incidents & Flags panel shows at least 4 incident cards
- [ ] Each card has a title (e.g., "Minor Fall — Tiger Room") and description
- [ ] Incidents cover categories: falls, allergy alerts, absence patterns, medical updates
- [ ] Panel is labeled with "Health & Welfare" gradient pill badge

---

### US-2: Admin Views AI Analysis & Recommendations
**As a** crèche administrator,  
**I want to** see AI-generated analysis and recommendations,  
**so that** I can make data-informed decisions about welfare and compliance.

**Acceptance Criteria:**
- [ ] AI Analysis panel shows at least 4 insight cards
- [ ] Each card has a title and description
- [ ] Insights cover: attendance anomalies, health trends, wellness checks, compliance gaps
- [ ] Panel is labeled with "Health & Welfare Intelligence" gradient pill badge

---

### US-3: Admin Monitors Staff Compliance
**As a** crèche administrator,  
**I want to** see staff compliance scores with visual progress bars,  
**so that** I can identify staff who need support or intervention.

**Acceptance Criteria:**
- [ ] Staff Compliance column shows each staff member with avatar, name, role
- [ ] Compliance percentage is displayed with color coding: green (compliant), red (non-compliant)
- [ ] Progress bar visually represents the compliance score
- [ ] At least 4 staff members are shown

---

### US-4: Admin Views Outstanding Payments
**As a** crèche administrator,  
**I want to** see which families have overdue payments,  
**so that** I can follow up on outstanding balances.

**Acceptance Criteria:**
- [ ] Outstanding Payments column shows family name, amount owed, and overdue duration
- [ ] Overdue duration is displayed in red text
- [ ] Amounts are in Nigerian Naira (₦)
- [ ] At least 3 families are shown

---

### US-5: Admin Uses Quick Templates from Intelligence
**As a** crèche administrator,  
**I want to** quickly access common templates from the Intelligence page,  
**so that** I can act on insights without navigating away.

**Acceptance Criteria:**
- [ ] Quick Templates section shows clickable template cards
- [ ] Templates include: Incident Report, Parent Notice
- [ ] Each card shows "Use template" link
- [ ] Clicking a template opens it for use

---

### US-6: Admin Chats with Ada
**As a** crèche administrator,  
**I want to** ask Ada natural-language questions about my crèche data,  
**so that** I can get instant insights without running reports.

**Acceptance Criteria:**
- [ ] ADA panel is visible on the right side of the Intelligence page
- [ ] Panel shows Ada's avatar, name, "Online" status, and "Professional & Warm" mode
- [ ] Chat area shows a multi-turn conversation with AI and user messages
- [ ] Typing indicator with bouncing dots appears when Ada is "thinking"
- [ ] User can type a message and send it
- [ ] Quick prompt buttons are available: "Who hasn't paid?", "At-risk children?", "Draft announcement"
- [ ] "Personalize" link is available for Ada configuration

---

### US-7: Admin Refreshes Analysis
**As a** crèche administrator,  
**I want to** refresh the AI analysis to get the latest insights,  
**so that** I'm always working with current data.

**Acceptance Criteria:**
- [ ] "Refresh Analysis" button is visible in the page header
- [ ] Clicking it reloads all AI insights and data
- [ ] Loading state is shown while data refreshes

---

### US-8: Admin Changes Date Range
**As a** crèche administrator,  
**I want to** change the date range for the intelligence view,  
**so that** I can analyze trends over different time periods.

**Acceptance Criteria:**
- [ ] Date filter is visible in the page header
- [ ] Default shows current month (e.g., "June 2026")
- [ ] Changing the date updates all insights and data on the page

---

### US-9: Admin Exports Intelligence Report
**As a** crèche administrator,  
**I want to** export the intelligence data as a report,  
**so that** I can share insights with stakeholders or keep records.

**Acceptance Criteria:**
- [ ] "Export Report" button is visible in the page header
- [ ] Clicking it generates and downloads a report (not yet implemented)

- No real AI/ML integration — all responses are hardcoded
- No actual data analysis or trend detection
- No real-time monitoring or alerts
- No alert configuration or threshold management
- No report export (PDF, CSV)
- No custom dashboard or widget configuration
- No historical trend charts or visualizations
- No predictive analytics
- No health/welfare system integration
- No natural language processing for incident classification
- No automated compliance scoring
