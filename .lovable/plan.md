
# Fix Canonical URL Mismatches and Remaining Insurance References

## Problem Summary
Canonical URLs in several pages don't match the actual routes defined in App.tsx. This causes 404 errors when sharing links on social media because platforms use the canonical URL for link previews.

## Phase 1: Fix Canonical URLs in Host Pages

### File: `src/pages/HostProtectionPage.tsx`
- Line 231: Change `buildCanonicalUrl('/host/protection')` to `buildCanonicalUrl('/host-protection')`
- Line 206-207: Update JSON-LD description from "insurance coverage" to "damage protection coverage"
- Line 208: Update JSON-LD URL from `/host-protection` to match canonical
- Line 228: Update page title from "Vehicle Insurance & Safety" to "Vehicle Damage Protection & Safety"
- Line 229: Update description from "P1M insurance coverage" to "P1M damage protection coverage"
- Line 259: Change button text "Learn About Insurance" to "Learn About Protection"
- Line 272: Change tab label "Insurance Coverage" to "Damage Protection"

### File: `src/pages/HostRequirementsPage.tsx`
- Line 126: Change `buildCanonicalUrl('/host/requirements')` to `buildCanonicalUrl('/host-requirements')`

### File: `src/pages/HostBenefitsPage.tsx`
- Line 99: Change `buildCanonicalUrl('/host/benefits')` to `buildCanonicalUrl('/host-benefits')`

### File: `src/pages/HostSupportPage.tsx`
- Line 138: Change `buildCanonicalUrl('/host/support')` to `buildCanonicalUrl('/host-support')`

## Phase 2: Fix Other Page Canonical URLs

### File: `src/pages/BusinessSolutionsPage.tsx`
- Line 211: Change `buildCanonicalUrl('/business')` to `buildCanonicalUrl('/business-solutions')`

### File: `src/pages/PressPage.tsx`
- Line 170: Change `canonical="/press"` to `canonical={buildCanonicalUrl('/press')}`
- Ensure `buildCanonicalUrl` is imported from `@/config/site`

## Summary of Changes

| File | Line | Current Value | New Value |
|------|------|---------------|-----------|
| HostProtectionPage.tsx | 231 | `/host/protection` | `/host-protection` |
| HostRequirementsPage.tsx | 126 | `/host/requirements` | `/host-requirements` |
| HostBenefitsPage.tsx | 99 | `/host/benefits` | `/host-benefits` |
| HostSupportPage.tsx | 138 | `/host/support` | `/host-support` |
| BusinessSolutionsPage.tsx | 211 | `/business` | `/business-solutions` |
| PressPage.tsx | 170 | `"/press"` | `buildCanonicalUrl('/press')` |

## Additional Fixes in HostProtectionPage.tsx
- Update remaining "insurance" references to "damage protection" terminology
- Align JSON-LD schema description with page content

## Technical Notes
- After deployment, you may need to use Facebook's Sharing Debugger and Twitter Card Validator to refresh cached social media previews
- Consider adding redirects for the incorrect canonical paths (e.g., `/host/protection` to `/host-protection`) to handle any existing indexed links

## Files Modified: 6
## Estimated Lines Changed: ~15
