# UI Component Library — Product Requirements Document

## 1. Purpose

CEven uses a consistent set of UI components and design tokens to ensure visual coherence across all modules. The component library follows the shadcn/ui convention — components are built on headless UI primitives and customized with CEven's warm earth-tone design system.

---

## 2. Design Tokens

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| Brand Dark | `#3B2513` | Sidebar, primary buttons, headings, accents |
| Brand Accent | `#9A6033` | Secondary accents |
| Brand Light | `#E0BFA0` | Primary CTA button fill, soft backgrounds |
| Button Border | `#D4A67F` | Warm gold borders on buttons |
| Content Background | `#FFF9F0` | Page background (warm off-white) |
| Table Header | `#EDD9C0` | Table header rows (warm tan) |
| Card Border | `#E6EBF3` | Card borders (cool grey) |
| Input Border | `#CCD2DC` | Form input borders |
| Heading Text | `#2D1810` | Primary text (very dark brown) |
| Muted Text | `#6B7280` | Secondary/label text |
| Success Green | `#009061` | Active states, success badges |
| Warning Amber | `#F59E0B` | Warning states, pending badges |
| Error Red | `#EF4444` | Error states, danger actions |
| AI Panel BG | `#FFFCF4` | AI chat panel background (warm cream) |
| Illustration BG | `#5B391E` | Auth illustration panels (rich dark brown) |

### Typography

| Font | Usage |
|---|---|
| **Mogra** | Brand logo wordmark ("CEven") in sidebar and auth pages |
| **Merriweather** (serif) | All page titles and prominent headings |
| **Urbanist** (sans-serif) | Buttons, labels, form fields, navigation items |
| **Nunito** (rounded sans-serif) | Body text, table content, stat values, descriptions |

### Spacing & Layout

| Element | Size |
|---|---|
| Sidebar width | 280px |
| AI panel width | 340px |
| Message list width | 340px |
| Content padding | 24px (desktop), 16px (mobile) |
| Card border radius | 12px–16px |
| Button border radius | 8px |

---

## 3. Component Inventory

### Buttons

| Variant | Appearance | Usage |
|---|---|---|
| Primary (tan fill) | Tan/peach background, dark text | Main CTAs: "Log in", "Get Started", "Enroll Child", "Send Message" |
| Primary (dark fill) | Dark brown background, light text | Secondary CTAs: "Add Staff", "Add Invoice", "Add New Role" |
| Outline | Border only, transparent background | Tertiary actions: "Enroll a Child" (secondary), "Subscribe", "Log Exception" |
| Ghost | No background, no border | Minimal actions, hover effects |
| Red | Red background | Danger actions: "Disable Account", "Yes, Remove" |
| Link | Underlined text | Inline navigation: "View", "Reminder", "Forgot Password?" |
| Icon-only | Square, no text | Icon buttons: close, edit, delete, three-dot menu |
| Toggle pill | Pill-shaped, active/inactive state | View switchers: QR Station / Daily Logs, Payment History / Expenses |

### Badges

| Variant | Color | Usage |
|---|---|---|
| Success | Green background, green text | Active status, Successful payments, Present |
| Warning | Amber background, amber text | Pending status, Overdue fees |
| Error | Red background, red text | Failed payments, Absent |
| Neutral | Grey background, grey text | Inactive, View Only |
| AI Alert | Grey/cream background | AI-generated notifications |

### Stat Cards

Cards displaying key metrics with:
- Label (muted text, small)
- Large value (serif bold)
- Trend indicator (colored text with optional arrow icon)

### Tables

Consistent table design across all modules:
- Tan header row with dark text
- White body rows with thin borders
- Left-aligned columns
- Action column with icon buttons or link text
- Horizontal scroll on mobile

### Modals

- Centered overlay with dark backdrop
- White card with rounded corners (16px)
- Scrollable body for long content
- Fixed header and footer
- Close button in top-right corner

### Forms

- Rounded input borders (8px)
- Brand-colored focus states (gold ring)
- Placeholder text in muted grey
- Labels in bold, dark text
- Required fields marked with red asterisk
- Error messages inline below fields

---

## 4. Responsive Behavior

The UI is responsive across screen sizes:

| Breakpoint | Behavior |
|---|---|
| Desktop (≥1024px) | Full sidebar visible, multi-column grids, side-by-side panels |
| Tablet (768px–1023px) | Sidebar collapses, grids adapt to 2 columns |
| Mobile (<768px) | Hamburger menu, stacked layouts, full-width panels, horizontally scrollable tables |

---

## 5. Design Patterns

### Split-Panel Layout
Used on auth pages and the communication module — two panels side by side, with one typically containing a form and the other an illustration or list.

### Stat Card Grid
Used on Dashboard, Children, and Staff pages — a row of cards showing key metrics with labels, values, and trends.

### Tab Navigation
Used on Child Profile, Staff Management, and Account Setup — horizontal tabs switching between content views within the same page.

### Pill Toggle
Used on Daily Operations and Finance — a pill-shaped switcher for toggling between two views.

### AI Panel
A slide-in or dedicated sidebar panel for the AI assistant "Ada" — cream background, chat bubbles, quick prompts, and input.

### Notification Panel
A floating overlay for notifications — filter tabs, color-coded items, and mark-all-read.

---

## 6. Gaps & Future Work

- No dark mode support
- No animation system beyond basic transitions
- No form validation library
- No toast/notification component (global)
- No tooltip component
- No date picker component
- No rich text editor
- No drag-and-drop component
- No chart/visualization components
- No skeleton loading states for all pages
