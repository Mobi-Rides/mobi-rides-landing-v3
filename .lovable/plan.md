

## Problem

The promo banner (lines 262-270 in `Index.tsx`) has two issues:

1. **Desktop:** Banner height is too short — doesn't align cleanly with the header's logo/nav height (`h-16 lg:h-20`).
2. **Mobile:** The banner text collides with the logo, creating a chaotic layout. The user wants a marquee/ticker-style scrolling text effect on mobile to keep it compact and clean.

## Plan

### 1. Move the promo banner into the Header component

Instead of a separate sticky div in `Index.tsx`, integrate the promo strip as a top bar **inside** `Header.tsx`. This ensures it appears on all pages and avoids z-index/stacking conflicts between the fixed header and sticky banner.

### 2. Desktop: Increase banner height by 25%

- Current implicit height is roughly `py-2` (~32px). Increase to `py-2.5 lg:py-3` for desktop, giving ~25% more vertical space.
- Keep the full text visible and centered.

### 3. Mobile: CSS marquee scrolling text

- On mobile (`lg:` breakpoint), replace static centered text with a horizontal scrolling marquee animation.
- Use a CSS `@keyframes marquee` animation that translates the text from right to left continuously.
- The text sits in a single line inside an `overflow-hidden` container, with `whitespace-nowrap` and `animate-marquee`.

### Technical Changes

**`src/components/Header.tsx`:**
- Add the promo banner as a top bar above the main nav row.
- Desktop: static centered text with `py-2.5 lg:py-3`.
- Mobile: wrap text in a `<div>` with marquee animation class, inside an `overflow-hidden` container.

**`tailwind.config.ts`:**
- Add `marquee` keyframe: `{ "0%": { transform: "translateX(100%)" }, "100%": { transform: "translateX(-100%)" } }`
- Add animation: `"marquee": "marquee 15s linear infinite"`

**`src/pages/Index.tsx`:**
- Remove the standalone sticky promo banner div (lines 262-270).

