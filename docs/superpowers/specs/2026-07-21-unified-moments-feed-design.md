# Unified Moments feed (Twitter-style activity stream)

## Context

The Moments screen (`/parent/moments`, extracted from Home earlier today) currently shows only photo/video posts. The product direction is a Twitter-style unified feed: every update about the child and the creche flows into one chronological stream — medication administered, incidents, check-ins/check-outs, growth milestones, announcements, events, daily-report drops, and photo moments — with filter tabs by category and multi-image posts rendered as a swipeable carousel instead of a single static photo.

## Goals

- One chronological feed, newest first, grouped under day headers (Today / Yesterday / formatted date).
- Horizontally scrollable filter chips: **All · Moments · Health · Activity · Creche**.
  - Health = medication + incidents + growth milestones
  - Activity = check-in/check-out + daily-report-ready
  - Creche = announcements + events
  - Moments = photo/video posts
- Distinct card style per type, consistent Twitter-like rhythm (leading icon/avatar, content, timestamp).
- Multi-image moment posts render as a swipeable carousel (scroll-snap, dot indicators, "1/3" counter chip). Single-image posts render as today.
- Compact cards (all non-Moment types) navigate to that feature's own screen on tap.

## Out of scope

- Posting, commenting, or reacting (Comment/Save stay visual stubs on moment cards).
- Changing the source feature screens (medication, incidents, etc.) — the feed only reads.
- Push/real-time updates; the feed builds on read.
- The Home dashboard and its Moments tile — unchanged.

## Data layer

### `lib/shared/feed.ts` (new — aggregator, owns no data)

Normalized shape:

```ts
export type FeedCategory = "moments" | "health" | "activity" | "creche";
export type FeedItemType =
  | "moment" | "medication" | "incident" | "growth"
  | "check-in" | "check-out" | "report" | "announcement" | "event";

export type FeedItem = {
  id: string;            // "<type>-<sourceId>"
  type: FeedItemType;
  category: FeedCategory;
  timestamp: number;     // ms epoch, drives sort + day grouping
  title: string;
  body?: string;
  images?: string[];     // moments only; length > 1 → carousel
  hasVideo?: boolean;
  postedBy?: string;
  href?: string;         // compact cards: navigation target
  badge?: string;        // e.g. severity "minor", priority "urgent"
};

export function getFeedItems(): FeedItem[]; // sorted desc by timestamp
```

Sources (all existing modules, read-only):

| Source | Module / call | Mapping notes |
|---|---|---|
| Moments | `MOCK_FEED_POSTS` local to feed.ts (superset of `mockFeedPosts` with an added multi-image post) | `images` array; 3+ images on at least one post to demo the carousel |
| Medication | `lib/shared/medication.ts` — administered `MedicationLog`s | "Medication given" / "{medication} {dosage} administered by {administeredBy}", href `/parent/medication` |
| Incidents | `lib/shared/incidents.ts` | title + description snippet, badge = severity, href `/parent/incidents` |
| Growth | `lib/shared/growth.ts` — `Milestone`s | milestone title + description, href `/parent/child/growth` |
| Check-in/out | `lib/shared/check-in.ts` — `CheckInRecord`s | one item per check-in and one per check-out when times exist, href `/parent/attendance` |
| Reports | static single mock entry ("Liam's daily report is ready") | href `/parent/reports` |
| Announcements | `lib/shared/announcements.ts` | title + body snippet, badge when `priority === "urgent"`, href `/parent/announcements` |
| Events | `lib/shared/events.ts` | "{title} — {date} {startTime}", href `/parent/events` |

Timestamp derivation: sources that store `postedAt`/`recordedAt`/`createdAt` epoch values use them directly; sources with only date strings + display times (medication logs, check-ins) get timestamps composed from the date plus a parsed time-of-day; unparseable values fall back to the date at noon. Day grouping and relative-time formatting ("2 hours ago", "Yesterday") live in feed.ts as exported helpers.

## Components

### `components/parent/image-carousel.tsx` (new, reusable)

Props: `{ images: string[]; alt: string; heightClass?: string }`. Horizontal scroll-snap track (no library), dot indicators centered below, and a "n/N" counter chip overlaid top-right. Tracks the active index via scroll position. Renders a plain single `<img>` when `images.length === 1`.

### Feed cards (local to the Moments page)

- **MomentCard** — current rich card, with the image area swapped for `ImageCarousel` when `images.length > 1`. Keeps tag chip, video play badge, caption, "Posted by", Comment/Save stubs, tap → `/parent/gallery`.
- **CompactCard** — shared layout for every other type: colored icon circle (type-specific icon + tint), title, one-line body, optional badge chip, relative time, chevron; whole card taps to `item.href`. Icon/tint map: medication = Pill/blue, incident = AlertTriangle/amber, growth = TrendingUp/purple, check-in = LogIn/green, check-out = LogOut/gray, report = FileText/brown, announcement = Megaphone/rose, event = CalendarDays/teal.

## Screen: `/parent/moments` (rewrite)

Header unchanged (back + "Moments"). Below: sticky filter chip row (All active by default, brown fill on the active chip, scrollable). Content: day-grouped list — day header (small gray caps), then cards in timestamp order. Filter switches swap the visible set client-side with no refetch. Empty state per filter: icon + "No {category} updates yet". The page loads feed items once on mount (`useEffect` + `useState`, matching how other screens read the shared modules).

## Error handling / edge cases

- A source module returning nothing (cleared localStorage) simply contributes zero items; the feed renders whatever remains.
- Broken image URLs: cards keep layout via fixed-height image area with the existing quick-action background as placeholder.
- All-filter empty (everything cleared): overall empty state reuses the current "No Feed Available Yet!" block.

## Verification

`npx tsc --noEmit`, then manual dev-server pass: All shows every category interleaved with day headers; each chip filters correctly; the multi-image post swipes with dots + counter advancing; compact cards navigate to their feature screens; single-image moment cards unchanged.
