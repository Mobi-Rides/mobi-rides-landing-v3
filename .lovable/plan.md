

## Problem: Hamburger Menu Icon Not Visible

The hamburger icon uses `text-white` when the page hasn't been scrolled (`isScrolled === false`). This works on pages with dark hero backgrounds, but on pages where the hero has a light background (no `backgroundImage`, or a gradient that's not dark enough), the white icon is invisible against the light/transparent header.

**Root Cause (Header.tsx, lines 109-112):**
```tsx
isScrolled
  ? 'text-foreground hover:text-primary'   // After scroll: dark text ✓
  : 'text-white hover:text-gray-200'        // Before scroll: white text ✗ (invisible on light backgrounds)
```

This same logic applies to the desktop nav links (lines 76-82), so they're also invisible on light-background pages — but that's less noticeable since desktop hides the hamburger.

**This affects ALL pages** — the Header is global. On pages with dark hero images (Host, About, Safety, etc.), white works. On pages without dark backgrounds or before images load, the icon is invisible.

### Affected Pages
Every page uses the same Header. The visibility depends on whether the hero beneath is dark enough for white text to contrast.

### Solution

Make the header background and text color adapt based on scroll position **and** ensure the hamburger is always visible regardless of hero background:

1. **Always give the header a semi-transparent background on mobile** — even before scrolling — so the hamburger icon contrasts against it, OR
2. **Change the unscrolled icon color** from `text-white` to something universally visible (e.g., `text-foreground`), OR  
3. **Add a subtle background to the hamburger button** so it's visible on any background (e.g., a small rounded pill with `bg-black/20` or `bg-white/20`).

**Recommended approach:** Option 3 — add a subtle backdrop to the mobile menu button. This preserves the transparent header aesthetic while ensuring the hamburger is always tappable and visible. For the desktop nav links, keep current behavior since they're hidden on mobile.

### Implementation

| File | Change |
|------|--------|
| `src/components/Header.tsx` | Add `bg-black/20 backdrop-blur-sm rounded-lg` to the mobile menu button when not scrolled, ensuring visibility on any hero background |

