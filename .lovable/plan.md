

# Fix Facebook Open Graph Errors - Complete Implementation Plan

## Problem Summary

Facebook's Sharing Debugger reports two issues when scraping `https://www.mobirides.com/host-protection`:

1. **Invalid og:image URL**: Showing `/og-image.png` (relative path) instead of an absolute URL
2. **Incorrect og:url**: Showing `https://mobirides.com/` (wrong domain, missing `www`, wrong path)

## Root Cause Analysis

### Issue 1: Relative Image Paths
- `index.html` (lines 22, 30) uses relative paths: `content="/og-image.png"`
- `PageLayout` component only renders `og:image` if the `ogImage` prop is explicitly passed
- Most pages don't pass `ogImage` prop, so the fallback from `index.html` is used
- Facebook cannot resolve relative paths

### Issue 2: Incorrect og:url
- `index.html` (line 23) has hardcoded: `content="https://mobirides.com"` (missing `www`)
- `PageLayout` only renders `og:url` if `ogUrl` prop is passed
- Most pages don't pass `ogUrl` prop

### Affected Pages: 20+ pages
All pages using `PageLayout` without `ogImage` and `ogUrl` props are affected.

---

## Solution Architecture

Rather than updating all 20+ pages individually, we'll make two targeted fixes:

### Fix 1: Update `index.html` fallback tags
Fix the static fallback tags to use correct absolute URLs with `www` subdomain.

### Fix 2: Update `PageLayout` component  
Add automatic defaults for `ogImage` and `ogUrl` that derive from `canonical` and `siteConfig`, so pages don't need to pass these props explicitly.

---

## Phase 1: Fix `index.html` Fallback Tags

**File: `index.html`**

| Line | Current Value | New Value |
|------|---------------|-----------|
| 22 | `content="/og-image.png"` | `content="https://www.mobirides.com/og-image.png"` |
| 23 | `content="https://mobirides.com"` | `content="https://www.mobirides.com"` |
| 30 | `content="/og-image.png"` | `content="https://www.mobirides.com/og-image.png"` |

---

## Phase 2: Update `PageLayout` Component

**File: `src/components/layouts/PageLayout.tsx`**

Add logic to automatically provide default values:

1. Import `siteConfig` from `@/config/site`
2. Create computed defaults:
   - `defaultOgImage`: Always use `${siteConfig.url}${siteConfig.seo.ogImage}` (absolute URL)
   - `defaultOgUrl`: Use `canonical` if provided, otherwise undefined
3. Use defaults when props not provided

```text
Changes:
- Line 1: Add import for siteConfig
- Lines 39-41: Add computed defaults
- Line 50: Use ogUrl || canonical instead of conditional
- Lines 52-59: Always render og:image with default fallback
```

### Updated Logic
```text
// Computed defaults
const resolvedOgImage = ogImage || `${siteConfig.url}${siteConfig.seo.ogImage}`;
const resolvedOgUrl = ogUrl || canonical;
const resolvedOgImageAlt = ogImageAlt || description;

// Always render og:image (no conditional)
<meta property="og:image" content={resolvedOgImage} />

// Always render og:url when canonical is available
{resolvedOgUrl && <meta property="og:url" content={resolvedOgUrl} />}
```

---

## Expected Results After Fix

When Facebook scrapes `https://www.mobirides.com/host-protection`:

| Meta Tag | Current Value | Fixed Value |
|----------|---------------|-------------|
| og:image | `/og-image.png` | `https://www.mobirides.com/og-image.png` |
| og:url | `https://mobirides.com/` | `https://www.mobirides.com/host-protection` |
| canonical | ✓ Already correct | `https://www.mobirides.com/host-protection` |

---

## Files Modified

| File | Changes |
|------|---------|
| `index.html` | 3 lines - absolute URLs for og:image and og:url |
| `src/components/layouts/PageLayout.tsx` | ~10 lines - add siteConfig import and default resolution logic |

**Total: 2 files, ~13 lines changed**

---

## Post-Deployment Steps

After publishing these changes:

1. **Clear Facebook cache**: Visit [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) and click "Scrape Again" for affected URLs
2. **Clear Twitter cache**: Use [Twitter Card Validator](https://cards-dev.twitter.com/validator) to refresh previews
3. **Test multiple pages**: Verify og:image and og:url are correct across different pages

---

## Technical Notes

- This fix benefits all 20+ pages automatically without individual page updates
- The `PageLayout` component becomes the single source of truth for OG defaults
- Pages can still override with explicit `ogImage` and `ogUrl` props when needed (e.g., blog posts with custom images)

