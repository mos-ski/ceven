# Design System Handoff

Prompts for the refactor agent, one per component update. Newest at the top.
Paste the whole block under a heading to the agent that's doing the page-level refactors.

---

## Table padding architecture changed: cells own it, not the wrapper (2026-08-05)

Superseded the previous fix (the "px-4 pb-4 on the wrapper div" approach) with a better one, per direct feedback: padding on an outer wrapper div creates a visible gap between the card edge and where the row's hover highlight starts — the hover background should reach the card edge directly, only the cell *content* should be inset.

**`components/ui/table.tsx` now bakes horizontal inset into the cells themselves:** the `<table>` element carries `[&_td:first-child]:pl-4 [&_th:first-child]:pl-4 [&_td:last-child]:pr-4 [&_th:last-child]:pr-4`. This means every `<Table>` needs to sit inside a `<Card padding="none">` (or an equivalent zero-padding container) — if it sits inside a default-padding `<Card>` (p-5), you get double inset (card's p-5 + table's pl-4) and the first column shifts too far right.

**Established pattern, used consistently in `leave`, `billing`, `children`, `compliance`, `development`, `expenses`, `financial-reports`, `parents`, `payroll`, `reports`, `daily-logs`, and all five Daily Operations views:**
```tsx
<Card padding="none">
  <div className="flex items-center justify-between p-5 pb-3"> {/* or p-4 for daily-operations */}
    <p className="text-sm font-bold text-[#2D1810]">Section Title</p>
    {/* filters/buttons */}
  </div>
  <Table className="pb-5"> {/* pb-4 for daily-operations, to match their p-4 */}
    ...
  </Table>
</Card>
```
The `pb-5`/`pb-4` on `<Table>` gives bottom breathing room before the card's rounded corner (padding on `<table>` itself renders fine despite `border-collapse`, verified in-browser). For multi-tab cards (like `compliance`'s 4 sub-tabs), each tab's own table wrapper div gets `px-5 pb-5 pt-4` since the tab-nav strip needs its own `px-5 pt-5` separately.

**Known remaining gap, intentionally not fixed (out of scope):** `components/admin/children/children-table.tsx` has the same `border-none bg-table-header-bg hover:bg-table-header-bg` header override as the Daily Operations views did, but it's only used by `app/admin/v2/children/page.tsx` — admin v2 is out of scope for this project, left as-is.

---

## Table needs its own horizontal padding when inside `Card padding="none"` (2026-08-05)

`components/ui/table.tsx`'s `TableCell`/`TableHead` only carry `pr-3` (no left padding) — they were designed assuming the outer `Card`'s own `p-5`/`p-4` supplies the left/right inset (works fine on `leave`, `billing`, etc.). But every table in `components/admin/daily-operations/*` uses `<Card padding="none">` so its header/filter row can span full width, then wraps `<Table>` in a bare `<div className="hidden overflow-x-auto lg:block">` with zero padding — so the first column's checkbox/text was touching the card's left edge with no inset at all.

Fixed by adding `px-4 pb-4` to that wrapper div in `health-incidents-view.tsx`, `inventory-view.tsx` (3 tables), `facilities-view.tsx`, `tasks-view.tsx`, and `medication-view.tsx`.

**Rule going forward:** if a page uses `<Card padding="none">` around a `<Table>`, the immediate wrapper div around `<Table>` must carry `px-4 pb-4` (matching the `p-4` used on that card's own header/filter row) so content doesn't touch the card edges. Pages that use the default `<Card>` (with its own `p-5`) don't need this — don't add it there, it would double up the inset.

---

## Do not override TableRow header className (2026-08-05)

Found and fixed a recurring violation: several Daily Operations views imported the shared `Table` correctly but then overrode the header `<TableRow>` with `className="border-none bg-[#F5EDD8]/40 hover:bg-[#F5EDD8]/40"` — this cancels the bordered-header standard and adds an unwanted hover state on the header row itself. Fixed in `components/admin/daily-operations/{inventory-view,facilities-view,tasks-view,health-incidents-view}.tsx` and converted a legacy hand-rolled `<table>` (medication history sub-table) in `medication-view.tsx` to the shared component.

**Rule going forward: never pass a custom `className` to the header `<TableRow>` that touches `border`, `bg`, or `hover:bg`.** If a page appears to need a different header look, that's a sign the design system decision needs revisiting — flag it, don't override it locally. Plain `<TableRow>` with no className inside `<TableHeader>` always inherits the correct standard from `components/ui/table.tsx`.

Note: these Daily Operations views (`components/admin/daily-operations/*`) are shared between admin v2 and admin v3. Fixing the header override doesn't touch anything else and is safe for both, but any further table restructuring here needs to stay v2-safe since v2 is out of scope for this project.

---

## Table + Card (components/ui/table.tsx, components/ui/card.tsx)

The design system's `components/ui/table.tsx` and `components/ui/card.tsx` have been updated to the new CEven admin-v3 standard. Please refactor pages to use them instead of hand-rolled markup.

**Table** (`components/ui/table.tsx`): exports `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`, `TableFooter`, `TableCaption`. Standard: bordered header row (`border-black/[0.08]`), body rows separated by a light divider (`border-black/[0.05]`, no border on last row), and each body row now highlights fully on hover (`hover:bg-[#FAF2E1]`) — header rows do not get the hover effect. See `app/admin/v3/leave/page.tsx` for a working reference conversion (already done, use as the template).

**Card** (`components/ui/card.tsx`): exports `Card` with `variant` (`default` | `highlight`) and `padding` (`default` | `compact` | `none`) props. `default` = white, `border-black/[0.07]`, `p-5`. `padding="compact"` = `p-4` for stat/tight cards. `variant="highlight"` = amber border (`border-[#C47B2C]/40`) for AI callout cards.

Scope: only admin-v3, parent v2, caregiver v2, and the `/library` design-system showcase page. Do not touch admin v1/v2, parent v1, caregiver v1, or super-admin — those are explicitly out of scope for this pass.

Every admin-v3 page currently hand-rolls its own `<table>`/`<thead>`/`<tr>`/`<th>` markup and its own `rounded-2xl border ... bg-white` card divs — swap those for the shared components above, keeping each page's existing cell content/logic unchanged. Files with tables: `daily-logs`, `billing`, `children`, `development`, `payroll`, `compliance`, `reports`, `dashboard`, `expenses`, `financial-reports`, `plans`, `parents` (leave already done).
