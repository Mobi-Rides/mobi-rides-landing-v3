

## Plan: Create Implementation Tracker for PageHero Banner Images

Create a single markdown file `public/20260308_MobiRides_PageHero_Banner_Images.md` documenting the implementation of background images for all pages currently missing them.

Based on the earlier audit, these 7 pages need banner images:

| Page | File | Theme for Image |
|------|------|----------------|
| Host | `HostPage.tsx` | Car keys handover / car sharing |
| About | `AboutPage.tsx` | Team / community / Botswana cityscape |
| Pricing | `PricingPage.tsx` | Cars lineup / value / pricing |
| Safety | `SafetyPage.tsx` | Seatbelt / shield / safe driving |
| Careers | `CareersPage.tsx` | Office / teamwork / growth |
| Press | `PressPage.tsx` | News / media / press conference |
| Rent2Buy | `Rent2BuyPage.tsx` | Car purchase / keys / ownership |

The markdown will follow the project's existing JIRA-style format (matching files like `blog-editor-enhancement-jira-2025-10-30.md`) with:
- Epic overview and acceptance criteria
- Individual tickets per page with Unsplash image URLs
- Implementation steps (add `backgroundImage` prop to each `<PageHero>`)
- Testing checklist

Each ticket will include a recommended Unsplash URL using their source API format (`https://images.unsplash.com/photo-XXXXX?w=1920&q=80`) for high-quality, free-to-use images themed to each page's content.

### Files

| File | Action |
|------|--------|
| `public/20260308_MobiRides_PageHero_Banner_Images.md` | Create — full implementation tracker |

