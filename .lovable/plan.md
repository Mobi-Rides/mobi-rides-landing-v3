

## Problem

On mobile, the hero section uses `min-h-screen` with generous padding and spacing, causing the search widget to be cut off or require scrolling. The text block and search card have large margins, padding, and font sizes that push the widget below the fold.

## Plan — Mobile-only spacing reductions

All changes scoped to mobile only (default / below `sm:` breakpoint), preserving desktop/tablet layout.

**File: `src/components/sections/HeroSection.tsx`**

1. **Reduce top padding**: `pt-36` → `pt-28` (keep `sm:pt-20`)
2. **Reduce heading bottom margin & size**: `text-4xl` → `text-3xl`, `mb-6` → `mb-3 sm:mb-6`
3. **Reduce tagline margin**: `mb-8` → `mb-4 sm:mb-8` on the tagline `<p>`
4. **Remove or shrink "Unlock cars" badge block**: `mb-8` → `mb-4 sm:mb-8`
5. **Compact search card padding**: `p-8` → `p-5 sm:p-8`
6. **Reduce inner spacing**: `space-y-6` → `space-y-4 sm:space-y-6`
7. **Reduce input heights**: `py-4` → `py-3 sm:py-4` and `text-lg` → `text-base sm:text-lg` on all three inputs
8. **Reduce search button padding**: `py-4` → `py-3 sm:py-4`, `text-xl` → `text-lg sm:text-xl`

These cumulative reductions (~100-120px saved) should keep the entire search widget visible on mobile without scrolling.

