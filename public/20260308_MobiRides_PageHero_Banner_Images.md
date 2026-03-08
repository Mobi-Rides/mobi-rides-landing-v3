# MobiRides — PageHero Banner Images Implementation

**Date:** 2026-03-08
**Epic:** MOBI-BANNER-001
**Priority:** Medium
**Status:** To Do

---

## Epic Overview

Add themed background images to all `PageHero` components currently missing them. Images will be sourced from Unsplash (free, high-quality, no attribution required for web use). The `PageHero` component already supports `backgroundImage` prop with automatic overlay and text contrast — no component changes needed.

## Acceptance Criteria

- [ ] All 7 pages listed below have a `backgroundImage` prop on their `<PageHero>` component
- [ ] Images are high-resolution (≥1920px wide), landscape orientation
- [ ] Hero text remains legible over each image (overlay handled by `PageHero`)
- [ ] Pages render correctly on mobile (375px), tablet (768px), and desktop (1440px)
- [ ] No broken image URLs — fallback gracefully if image fails to load
- [ ] Lighthouse performance score not degraded (images loaded via CSS `background-image`)

---

## Tickets

### MOBI-BANNER-002 — Host Page Banner Image

**File:** `src/pages/HostPage.tsx`
**Status:** To Do
**Current State:** References non-existent `/images/host-hero-bg.jpg`

**Implementation:**
Replace the broken `backgroundImage` prop value with a working Unsplash URL.

```tsx
<PageHero
  backgroundImage="https://images.unsplash.com/photo-1449965408869-ebd13bc7d0e6?w=1920&q=80"
  // Theme: Car keys handover / car sharing
  ...
/>
```

**Recommended Images (pick one):**
| Option | URL | Theme |
|--------|-----|-------|
| A | `https://images.unsplash.com/photo-1449965408869-ebd13bc7d0e6?w=1920&q=80` | Car keys handover |
| B | `https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1920&q=80` | Cars parked in row |
| C | `https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=1920&q=80` | Person with car keys |

---

### MOBI-BANNER-003 — About Page Banner Image

**File:** `src/pages/AboutPage.tsx`
**Status:** To Do
**Current State:** No `backgroundImage` prop

**Implementation:**
Add `backgroundImage` prop to the `<PageHero>` component.

```tsx
<PageHero
  backgroundImage="https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=1920&q=80"
  // Theme: African cityscape / community
  ...
/>
```

**Recommended Images (pick one):**
| Option | URL | Theme |
|--------|-----|-------|
| A | `https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=1920&q=80` | African city skyline |
| B | `https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=1920&q=80` | Diverse team collaboration |
| C | `https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1920&q=80` | Team meeting / community |

---

### MOBI-BANNER-004 — Pricing Page Banner Image

**File:** `src/pages/PricingPage.tsx`
**Status:** To Do
**Current State:** No `backgroundImage` prop

**Implementation:**
```tsx
<PageHero
  backgroundImage="https://images.unsplash.com/photo-1493238792000-8113da705763?w=1920&q=80"
  // Theme: Cars lineup / value
  ...
/>
```

**Recommended Images (pick one):**
| Option | URL | Theme |
|--------|-----|-------|
| A | `https://images.unsplash.com/photo-1493238792000-8113da705763?w=1920&q=80` | Row of cars |
| B | `https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1920&q=80` | Modern car showroom |
| C | `https://images.unsplash.com/photo-1542362567-b07e54358753?w=1920&q=80` | Car fleet aerial view |

---

### MOBI-BANNER-005 — Safety Page Banner Image

**File:** `src/pages/SafetyPage.tsx`
**Status:** To Do
**Current State:** No `backgroundImage` prop

**Implementation:**
```tsx
<PageHero
  backgroundImage="https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=1920&q=80"
  // Theme: Safe driving / protection
  ...
/>
```

**Recommended Images (pick one):**
| Option | URL | Theme |
|--------|-----|-------|
| A | `https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=1920&q=80` | Seatbelt / car safety |
| B | `https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1920&q=80` | Road driving safely |
| C | `https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80` | Car on open road |

---

### MOBI-BANNER-006 — Careers Page Banner Image

**File:** `src/pages/CareersPage.tsx`
**Status:** To Do
**Current State:** No `backgroundImage` prop

**Implementation:**
```tsx
<PageHero
  backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
  // Theme: Teamwork / office / growth
  ...
/>
```

**Recommended Images (pick one):**
| Option | URL | Theme |
|--------|-----|-------|
| A | `https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80` | Team collaborating |
| B | `https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80` | Modern office space |
| C | `https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80` | Team brainstorming |

---

### MOBI-BANNER-007 — Press Page Banner Image

**File:** `src/pages/PressPage.tsx`
**Status:** To Do
**Current State:** No `backgroundImage` prop

**Implementation:**
```tsx
<PageHero
  backgroundImage="https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=1920&q=80"
  // Theme: News / media / press
  ...
/>
```

**Recommended Images (pick one):**
| Option | URL | Theme |
|--------|-----|-------|
| A | `https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=1920&q=80` | News / journalism |
| B | `https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1920&q=80` | Newspaper / media |
| C | `https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80` | Conference / presentation |

---

### MOBI-BANNER-008 — Rent2Buy Page Banner Image

**File:** `src/pages/Rent2BuyPage.tsx`
**Status:** To Do
**Current State:** No `backgroundImage` prop

**Implementation:**
```tsx
<PageHero
  backgroundImage="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80"
  // Theme: Car ownership / keys / purchase
  ...
/>
```

**Recommended Images (pick one):**
| Option | URL | Theme |
|--------|-----|-------|
| A | `https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80` | Keys in hand (ownership) |
| B | `https://images.unsplash.com/photo-1542362567-b07e54358753?w=1920&q=80` | New car purchase |
| C | `https://images.unsplash.com/photo-1494976388531-d1058494ceb8?w=1920&q=80` | Driving into sunset (freedom) |

---

## Implementation Steps

For each ticket:

1. Open the target `.tsx` file
2. Add or update the `backgroundImage` prop on the `<PageHero>` component with the chosen Unsplash URL
3. Verify the hero renders correctly with the overlay and text contrast
4. Test on mobile, tablet, and desktop viewports

**Example change:**
```diff
  <PageHero
    variant="default"
    title="About Mobirides"
    subtitle="Our Story"
+   backgroundImage="https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=1920&q=80"
  />
```

## Testing Checklist

- [ ] All 7 pages load with visible banner background images
- [ ] Text is legible over every banner (dark overlay applied)
- [ ] Images are responsive and cover the hero section properly
- [ ] No layout shift (CLS) when images load
- [ ] Mobile: hero section not excessively tall, image crops well
- [ ] Tablet: proper scaling between mobile and desktop
- [ ] Desktop: full-width, high-quality image display
- [ ] Fallback: pages still render gracefully if an Unsplash URL becomes unavailable
- [ ] Performance: no significant increase in LCP (Largest Contentful Paint)

## Notes

- Unsplash images are free for commercial use (no attribution required)
- The `?w=1920&q=80` parameters ensure optimal resolution and compression
- The `PageHero` component automatically applies a `bg-black/50` overlay when `backgroundImage` is set
- Consider future migration to locally-hosted or AI-generated images for full reliability
- The `description` prop on `PageHero` is used for subtitle text below the title (separate from the `subtitle` prop which renders as an uppercase label above the title)
