# Intelligence Module - PRD

## 1. Overview

The Intelligence module serves as the AI Command Center, providing analytics, health/welfare monitoring, staff compliance tracking, and financial intelligence. It includes an AI chat assistant "Ada" for natural language queries and quick actions.

**Route:** `/intelligence`
**File:** `app/(admin)/intelligence/page.tsx` (380 lines, client component)

---

## 2. Page Header

| Element | Description |
|---|---|
| Title | "Intelligence" or "AI Command Center" |
| Date Filter | Month/year selector (e.g., "June 2026") |
| Refresh Analysis | Button to refresh AI insights |
| Export Report | Button to export analytics (not implemented) |

---

## 3. Main Content (3 panels)

### 3.1 Health & Welfare Panel

**Purpose:** Monitor child health incidents and welfare concerns

#### Recent Incidents & Flags

| Incident | Type | Severity | Timestamp |
|---|---|---|---|
| Minor Fall — Chidinma | Incident | Minor | Today, 10:30 AM |
| Allergy Alert — Obinna | Health Flag | Alert | Today, 9:15 AM |
| Absence Pattern — Adaeze | Pattern Flag | Warning | This week |
| Medical Note Updated — Emeka | Record Update | Info | Yesterday |

Each incident card has:
- Icon (based on type)
- Title and description
- Severity badge
- Timestamp
- Action button

### 3.2 AI Analysis & Recommendations

**Purpose:** AI-generated insights and actionable recommendations

| Insight | Category | Recommendation |
|---|---|---|
| Attendance anomaly detected | Attendance | Review attendance patterns for flagged children |
| Health trend alert | Health | Schedule wellness check for at-risk children |
| Wellness check recommended | Wellness | Initiate wellness protocol |
| Compliance gap identified | Compliance | Address missing documentation |

Each recommendation card has:
- Insight title
- Category tag
- Description
- Action button

### 3.3 Staff & Finance Intelligence

**Purpose:** Staff compliance monitoring and financial intelligence

#### Staff Compliance

Per-staff compliance progress bars:

| Staff Member | Compliance Score | Status |
|---|---|---|
| Amina Bello | 95% | Green (Compliant) |
| Chioma Eze | 72% | Amber (Needs Attention) |
| Fatima Abubakar | 45% | Red (Non-Compliant) |

#### Outstanding Payments

Per-family outstanding payment tracking:

| Family | Child | Amount | Days Overdue |
|---|---|---|---|
| Okonkwo | Chidinma | ₦45,000 | 14 days |
| Eze | Obinna | ₦18,500 | 7 days |

#### Quick Templates

| Template | Description |
|---|---|
| Incident Report | Generate incident report |
| Parent Notice | Generate parent notification |

---

## 4. ADA AI Chat Panel

**Toggle:** Via button in page header or topbar

### 4.1 Panel Layout

| Element | Description |
|---|---|
| Width | 340px right sidebar |
| Header | "ADA" with close button |
| Messages | Chat-style bubble layout |
| Input | Text input with send button |

### 4.2 Quick Prompts

Pre-defined prompt buttons:

| Prompt | Expected Response |
|---|---|
| "Who hasn't paid?" | List of families with overdue payments |
| "At-risk children?" | Children with health/attendance concerns |
| "Draft announcement" | AI-drafted general announcement |

### 4.3 AI Message Types

| Type | Style |
|---|---|
| User message | Right-aligned bubble |
| AI response | Left-aligned bubble with typing indicator |
| System message | Centered, muted text |

### 4.4 Typing Indicator

Animated dots (3 bouncing dots) shown while AI is "generating" a response.

---

## 5. Data Model

### 5.1 Implicit Models

```typescript
type Incident = {
  id: string;
  childName: string;
  type: "Fall" | "Allergy" | "Absence" | "Medical";
  severity: "Minor" | "Major" | "Critical";
  description: string;
  timestamp: string;
  resolved: boolean;
};

type AIInsight = {
  id: string;
  category: "Attendance" | "Health" | "Wellness" | "Compliance";
  title: string;
  description: string;
  recommendation: string;
  priority: "low" | "medium" | "high";
};

type StaffCompliance = {
  staffId: string;
  staffName: string;
  score: number; // 0-100
  status: "Compliant" | "Needs Attention" | "Non-Compliant";
};

type OutstandingPayment = {
  familyName: string;
  childName: string;
  amount: number;
  daysOverdue: number;
};
```

---

## 6. AI Assistant ("Ada") Capabilities

| Capability | Status |
|---|---|
| Natural language queries | Mock — hardcoded responses |
| Attendance analysis | Mock — static data |
| Health trend detection | Mock — static data |
| Financial intelligence | Mock — static data |
| Report generation | Not implemented |
| Announcement drafting | Not implemented |
| Real-time analysis | Not implemented |

---

## 7. Gaps & Future Work

- No real AI/ML integration (all responses are hardcoded)
- No actual data analysis or trend detection
- No real-time monitoring
- No alert configuration/thresholds
- No report export (PDF, CSV)
- No custom dashboard/widgets
- No historical trend charts
- No predictive analytics
- No integration with health/welfare systems
- No NLP for incident classification
- No automated compliance scoring
