# UI Component Library - PRD

## 1. Overview

CEven uses **shadcn/ui v4** (base-nova style) built on `@base-ui/react` primitives. Components are located in `components/ui/` and follow the shadcn convention of being copied into the project rather than installed as a package.

**Config:** `components.json`

---

## 2. Component Inventory

### 2.1 Button

**File:** `components/ui/button.tsx`

| Variant | Description |
|---|---|
| `default` | Primary brown/amber button |
| `outline` | Bordered, transparent background |
| `secondary` | Secondary styling |
| `ghost` | No background, hover effect |
| `destructive` | Red/danger styling |
| `link` | Inline link-styled button |

**Features:**
- Loading spinner state
- Size variants: `default`, `sm`, `lg`, `icon`
- Built on `@base-ui/react/button`

---

### 2.2 Table

**File:** `components/ui/table.tsx`

**Exports:**
- `Table` — Main table container
- `TableHeader` — `<thead>` wrapper
- `TableBody` — `<tbody>` wrapper
- `TableFooter` — `<tfoot>` wrapper
- `TableHead` — `<th>` wrapper
- `TableRow` — `<tr>` wrapper
- `TableCell` — `<td>` wrapper
- `TableCaption` — Table caption

---

### 2.3 Badge

**File:** `components/ui/badge.tsx`

| Variant | Description |
|---|---|
| `default` | Primary badge |
| `secondary` | Secondary styling |
| `destructive` | Red/danger badge |
| `outline` | Bordered badge |
| `ghost` | Minimal styling |
| `link` | Link-styled badge |

Built on `@base-ui/react/badge`.

---

### 2.4 Separator

**File:** `components/ui/separator.tsx`

- Horizontal or vertical separator line
- Built on `@base-ui/react/separator`

---

### 2.5 Avatar

**File:** `components/ui/avatar.tsx`

**Exports:**
- `Avatar` — Main avatar container
- `AvatarImage` — Image element
- `AvatarFallback` — Fallback initials/icon
- `AvatarBadge` — Status indicator badge
- `AvatarGroup` — Grouped avatars
- `AvatarGroupCount` — "+N" count indicator

Built on `@base-ui/react/avatar`.

---

### 2.6 Dropdown Menu

**File:** `components/ui/dropdown-menu.tsx`

**Exports:**
- `DropdownMenu` — Root container
- `DropdownMenuTrigger` — Trigger element
- `DropdownMenuContent` — Menu panel
- `DropdownMenuItem` — Menu item
- `DropdownMenuCheckboxItem` — Checkbox menu item
- `DropdownMenuRadioItem` — Radio menu item
- `DropdownMenuLabel` — Menu label
- `DropdownMenuSeparator` — Divider
- `DropdownMenuGroup` — Item group
- `DropdownMenuPortal` — Portal wrapper
- `DropdownMenuSub` — Sub-menu
- `DropdownMenuSubTrigger` — Sub-menu trigger
- `DropdownMenuSubContent` — Sub-menu content

Built on `@base-ui/react/menu`.

---

### 2.7 Checkbox

**File:** `components/ui/checkbox.tsx`

- Checkbox with check indicator
- Built on `@base-ui/react/checkbox`

---

### 2.8 Label

**File:** `components/ui/label.tsx`

- Form label component
- Integrates with form controls

---

### 2.9 Input

**File:** `components/ui/input.tsx`

- Text input component
- Built on `@base-ui/react/input`

---

## 3. Design Tokens

### 3.1 Color System

| Token | Usage |
|---|---|
| Brown/Earth tones | Primary UI colors |
| Amber/Gold | Accents, highlights, current plan |
| Green | Success states |
| Red | Error/danger states |
| Amber (warning) | Warning/pending states |

### 3.2 Typography

| Font | Usage |
|---|---|
| Mogra | Logo/branding |
| Merriweather | Headings |
| Urbanist | UI elements |
| Nunito | Body text |

### 3.3 Spacing & Layout

- Sidebar width: 280px
- AI panel width: 340px
- Message list width: 340px
- Content area: Flex remaining

---

## 4. Utilities

**File:** `lib/utils.ts`

```typescript
function cn(...inputs: ClassValue[]): string
```

Merges `clsx` and `tailwind-merge` for conditional class name composition.

---

## 5. Dependencies

| Package | Purpose |
|---|---|
| `@base-ui/react` | Headless UI primitives |
| `clsx` | Conditional class names |
| `tailwind-merge` | Tailwind class deduplication |
| `class-variance-authority` | Component variant management |
| `lucide-react` | Icon library |
| `tw-animate-css` | Tailwind animation utilities |

---

## 6. Gaps & Future Work

- No dark mode support
- No responsive breakpoints for mobile
- No animation system beyond basic transitions
- No form validation library (no Zod, Yup, etc.)
- No toast/notification component
- No modal/dialog component (uses custom implementations)
- No tooltip component
- No tabs component (uses custom implementations)
- No select/dropdown component (uses custom implementations)
- No date picker component
- No rich text editor
