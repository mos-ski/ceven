# Design System Handoff

Prompts for the refactor agent, one per component update. Newest at the top.
Paste the whole block under a heading to the agent that's doing the page-level refactors.

---

## Table + Card (components/ui/table.tsx, components/ui/card.tsx)

The design system's `components/ui/table.tsx` and `components/ui/card.tsx` have been updated to the new CEven admin-v3 standard. Please refactor pages to use them instead of hand-rolled markup.

**Table** (`components/ui/table.tsx`): exports `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`, `TableFooter`, `TableCaption`. Standard: bordered header row (`border-black/[0.08]`), body rows separated by a light divider (`border-black/[0.05]`, no border on last row), and each body row now highlights fully on hover (`hover:bg-[#FAF2E1]`) — header rows do not get the hover effect. See `app/admin/v3/leave/page.tsx` for a working reference conversion (already done, use as the template).

**Card** (`components/ui/card.tsx`): exports `Card` with `variant` (`default` | `highlight`) and `padding` (`default` | `compact` | `none`) props. `default` = white, `border-black/[0.07]`, `p-5`. `padding="compact"` = `p-4` for stat/tight cards. `variant="highlight"` = amber border (`border-[#C47B2C]/40`) for AI callout cards.

Scope: only admin-v3, parent v2, caregiver v2, and the `/library` design-system showcase page. Do not touch admin v1/v2, parent v1, caregiver v1, or super-admin — those are explicitly out of scope for this pass.

Every admin-v3 page currently hand-rolls its own `<table>`/`<thead>`/`<tr>`/`<th>` markup and its own `rounded-2xl border ... bg-white` card divs — swap those for the shared components above, keeping each page's existing cell content/logic unchanged. Files with tables: `daily-logs`, `billing`, `children`, `development`, `payroll`, `compliance`, `reports`, `dashboard`, `expenses`, `financial-reports`, `plans`, `parents` (leave already done).
