# Communication Module - PRD

## 1. Overview

The Communication module provides a messaging interface for parent-staff communication. It features a split-panel layout with a message list and conversation view, supporting message composition with AI-assisted content creation and pre-built templates.

**Route:** `/communication`
**File:** `app/(admin)/communication/page.tsx` (446 lines, client component)

---

## 2. Layout

**Split Panel Design:**

| Panel | Width | Content |
|---|---|---|
| Left Panel | 340px | Message list with search and filters |
| Right Panel | Flex | Conversation view or compose view |

---

## 3. Left Panel — Message List

### 3.1 Header

| Element | Description |
|---|---|
| Search Bar | Search by sender name or subject |
| Date Filter | Filter by date |
| Filter Tabs | All Messages, Read, Unread |

### 3.2 Message Items

Each message item displays:

| Element | Description |
|---|---|
| Avatar | Sender avatar or initials |
| Sender Name | Parent/staff name |
| Subject | Message subject line |
| Preview | First line of message |
| Timestamp | Time/date sent |
| Unread Indicator | Blue dot for unread messages |
| Selected State | Left border highlight when active |

---

## 4. Right Panel — Conversation View

### 4.1 Conversation Header

| Element | Description |
|---|---|
| Recipient Name | Parent/staff name |
| Status | "Active Now" indicator (green dot) |
| Actions | Contact button (phone/email) |

### 4.2 Message Thread

**Message Bubble Layout:**

| Direction | Style |
|---|---|
| Received | Left-aligned, light background |
| Sent | Right-aligned, brown/amber background |

Each message shows:
- Message text
- Timestamp
- Read receipt indicator

### 4.3 Reply Interface

| Element | Description |
|---|---|
| Textarea | Multi-line message input |
| Emoji Button | Emoji picker (not implemented) |
| Camera Button | Photo attachment (not implemented) |
| Attachment Button | File attachment (not implemented) |
| Send Button | Send message |

---

## 5. Right Panel — Compose View

**Trigger:** "Compose" button or "New Message" action

### 5.1 Compose Form

| Field | Type | Description |
|---|---|---|
| Recipient | Dropdown | Select parent or "All Parents" |
| Subject | Text input | Message subject |
| Message | Textarea | Message body |

### 5.2 AI Create Button

**Trigger:** Button in compose interface

**Quick Actions:**

| Action | Description |
|---|---|
| Create incident message | AI generates incident notification message |
| Create quick reminder | AI generates payment/event reminder |
| Button CTA | AI suggests call-to-action content |

### 5.3 Send Actions

| Action | Description |
|---|---|
| Send Message | Send to selected recipient(s) |

### 5.4 Templates Section

Pre-built message templates:

| Template | Use Case |
|---|---|
| Incident Report | Notify parents of incidents |
| Payment Reminder | Reminder for overdue payments |
| Absence Notice | Notification about child absence |
| General Update | General creche update/announcement |

---

## 6. Data Model

### 6.1 Implicit Models

```typescript
type Message = {
  id: string;
  senderName: string;
  senderAvatar?: string;
  subject: string;
  preview: string;
  body: string;
  timestamp: string;
  isRead: boolean;
  direction: "received" | "sent";
};

type Conversation = {
  id: string;
  participantName: string;
  participantAvatar?: string;
  isActive: boolean;
  messages: Message[];
  lastMessage: string;
  unreadCount: number;
};

type MessageTemplate = {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: string;
};
```

---

## 7. Filter & Search Behavior

| Filter | Behavior |
|---|---|
| All Messages | Shows all conversations |
| Read | Shows only read conversations |
| Unread | Shows only unread conversations |
| Search | Filters by sender name or subject text |
| Date | Filters by message date |

---

## 8. Gaps & Future Work

- No real messaging backend (no email/SMS integration)
- No actual message sending or receiving
- No real-time messaging (no WebSocket)
- No file upload/attachment functionality
- No emoji picker
- No message read receipts
- No message threading/replies
- No group messaging
- No notification for new messages
- No message search within conversation
- No message deletion/editing
- No rich text formatting
- No voice messages
- No translation/multilingual support
