# Communication — Product Requirements Document

## 1. Purpose

The Communication module provides a messaging interface for parent-staff communication. It features a split-panel layout with a message list and conversation view, supporting real-time messaging with AI-assisted content creation and pre-built templates for common scenarios.

---

## 2. Screens

### 2.1 Main Layout

**Page Header:**
- Title: "Messages"
- "New Message" primary button

**Split-Panel Design:**

| Panel | Width | Content |
|---|---|---|
| Left Panel | 340px | Message list with search, filters, and conversations |
| Right Panel | Flexible | Active conversation or compose view |

---

### 2.2 Left Panel — Message List

**Search & Filters:**
- Search input ("Search messages...")
- Date filter button
- Filter tabs: All Messages, Read, Unread

**Message Items:**
Each message shows:
- Avatar circle with initials
- Sender name
- Message preview (truncated)
- Timestamp
- Unread indicator dot (gold/amber)
- Selected state: warm cream background with left border accent

**Empty State:**
- "No Message Yet" message when no results match the filter

---

### 2.3 Right Panel — Conversation View

Displayed when a message is selected from the list.

**Header:**
- Recipient avatar with initials
- Recipient name
- "Active Now" green indicator (when applicable)
- "Contact" button
- Three-dot menu

**Message Thread:**
- **Received messages:** Left-aligned, cream background, with sender avatar
- **Sent messages:** Right-aligned, brown background
- Messages displayed in chronological order

**Reply Area:**
- Textarea: "Write a message..."
- Action icons: Emoji, Camera, Attachment
- "Send Message" primary button

---

### 2.4 Right Panel — Compose View

Displayed when "New Message" is clicked.

**Header:** "Compose Message"

**Form Fields:**
- **Recipient:** Dropdown (Select recipient, individual parents, "All Parents")
- **Subject:** Text input
- **Message:** Textarea

**AI Create Row:**
- "AI Create" gradient pill button
- Quick action pills: "Create incident message", "Create quick reminder", "Button CTA"

**Footer:**
- Cancel button (outline)
- "Send Message" button (disabled/greyed when form is empty)

**Templates Section:**
- 4 template cards in a 2-column grid:
  - **Incident Report** — for notifying parents of incidents
  - **Payment Reminder** — for overdue payment reminders
  - **Absence Notice** — for child absence notifications
  - **General Update** — for general creche announcements
- Each card shows the template name and "Use template" link

---

## 3. User Actions Summary

| Action | Where | Result |
|---|---|---|
| Select conversation | Message list item | Opens conversation in right panel |
| Reply to message | Conversation reply area | Sends message to recipient |
| Compose new message | "New Message" button | Opens compose form |
| Use AI Create | Compose form | Generates AI-assisted message content |
| Use template | Templates section | Populates form with template content |
| Filter messages | Filter tabs | Shows All, Read, or Unread messages |
| Search messages | Search input | Filters by sender name or subject |
| Attach file | Attachment icon | Opens file picker (not implemented) |
| Take photo | Camera icon | Opens camera (not implemented) |
| Add emoji | Emoji icon | Opens emoji picker (not implemented) |

---

## 4. Message Templates

| Template | Use Case |
|---|---|
| Incident Report | Notify parents when an incident involving their child has occurred |
| Payment Reminder | Send reminders for overdue tuition payments |
| Absence Notice | Notify parents about unplanned child absences |
| General Update | Share general announcements about the crèche |

---

## 5. User Stories & Acceptance Criteria

### US-1: Admin Views Message List
**As a** crèche administrator,  
**I want to** see all my conversations with parents in a list,  
**so that** I can quickly find and respond to messages.

**Acceptance Criteria:**
- [ ] Left panel shows a list of conversations with: avatar, sender name, message preview, timestamp
- [ ] Unread messages show a gold/amber dot indicator
- [ ] Selected conversation is highlighted with warm cream background and left border accent
- [ ] Empty state shows "No Message Yet" when no results match
- [ ] List supports search by sender name or subject
- [ ] Filter tabs allow viewing: All Messages, Read, Unread

---

### US-2: Admin Reads a Conversation
**As a** crèche administrator,  
**I want to** open a conversation and read the full message thread,  
**so that** I can understand the context before responding.

**Acceptance Criteria:**
- [ ] Clicking a message opens the conversation in the right panel
- [ ] Header shows recipient avatar, name, "Active Now" indicator, Contact button
- [ ] Received messages are left-aligned with cream background and avatar
- [ ] Sent messages are right-aligned with brown background
- [ ] Messages are displayed in chronological order
- [ ] Message thread is scrollable for long conversations

---

### US-3: Admin Replies to a Message
**As a** crèche administrator,  
**I want to** reply to a parent's message directly in the conversation,  
**so that** I can communicate quickly without leaving the platform.

**Acceptance Criteria:**
- [ ] Reply area shows a textarea with "Write a message..." placeholder
- [ ] Action icons are available: Emoji, Camera, Attachment
- [ ] "Send Message" button sends the reply
- [ ] Sent message appears in the conversation thread
- [ ] Reply area clears after sending

---

### US-4: Admin Composes a New Message
**As a** crèche administrator,  
**I want to** compose a new message to a parent or all parents,  
**so that** I can proactively communicate important information.

**Acceptance Criteria:**
- [ ] "New Message" button opens the compose view
- [ ] Recipient dropdown allows selecting individual parents or "All Parents"
- [ ] Subject input and Message textarea are available
- [ ] "Send Message" button is disabled when the form is empty
- [ ] "Cancel" button closes the compose view without sending

---

### US-5: Admin Uses AI to Create Messages
**As a** crèche administrator,  
**I want to** use AI to help draft messages,  
**so that** I can write professional communications faster.

**Acceptance Criteria:**
- [ ] "AI Create" gradient pill button is visible in the compose form
- [ ] Quick action pills are available: "Create incident message", "Create quick reminder", "Button CTA"
- [ ] Clicking an AI action generates suggested message content
- [ ] Generated content populates the message textarea

---

### US-6: Admin Uses Message Templates
**As a** crèche administrator,  
**I want to** use pre-built message templates for common scenarios,  
**so that** I can send consistent, professional messages quickly.

**Acceptance Criteria:**
- [ ] Templates section shows 4 template cards: Incident Report, Payment Reminder, Absence Notice, General Update
- [ ] Each card shows the template name and "Use template" link
- [ ] Clicking "Use template" populates the compose form with template content
- [ ] Templates are displayed in a 2-column grid

---

### US-7: Admin Filters Messages
**As a** crèche administrator,  
**I want to** filter my messages by read/unread status,  
**so that** I can prioritize responding to unread messages.

**Acceptance Criteria:**
- [ ] Filter tabs show: All Messages, Read, Unread
- [ ] Clicking a tab filters the message list accordingly
- [ ] Active filter tab is visually highlighted
- [ ] Unread filter shows empty state when no unread messages exist

- No real messaging backend — no email or SMS integration
- No actual message sending or receiving
- No real-time messaging — no WebSocket or live updates
- No file upload or attachment functionality
- No emoji picker
- No message read receipts
- No message threading or reply chains
- No group messaging
- No notification for new messages
- No message search within conversation
- No message deletion or editing
- No rich text formatting
- No voice messages
- No translation or multilingual support
