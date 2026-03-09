

## Fix: Desktop Navigation Shows Hamburger Menu

### Problem
The Header uses `lg:` (1024px) as the breakpoint for showing the full navigation. This means on screens between 768px–1023px (tablets and smaller desktops), users see a hamburger menu instead of the full nav. More importantly, your `App.css` has `#root { max-width: 1280px }` which constrains the layout, but the real issue is the `lg:` breakpoint is too high for a nav with only 5 links + 1 button.

### Fix
Change the desktop nav breakpoint from `lg:` (1024px) to `md:` (768px) across the Header component. The nav has only 5 links + a CTA button, which fits comfortably at 768px+.

### Changes in `src/components/Header.tsx`

Replace all `lg:` breakpoint references with `md:`:

- Line 34: Promo banner `lg:py-3` → `md:py-3`
- Line 36: Desktop promo `hidden lg:block` → `hidden md:block`
- Line 43: Mobile promo `lg:hidden` → `md:hidden`
- Line 57: Logo height `lg:h-16` → `md:h-16`
- Line 64: Nav container height `lg:h-20` → `md:h-20`
- Line 73: Desktop nav `hidden lg:flex` → `hidden md:flex`
- Line 90: Desktop actions `hidden lg:flex` → `hidden md:flex`
- Line 108: Mobile menu button `lg:hidden` → `md:hidden`
- Line 126: Mobile nav panel `lg:hidden` → `md:hidden`

Also update `PageLayout.tsx` line 82: `pt-[136px] sm:pt-[124px]` — verify padding still works at `md` breakpoint.

