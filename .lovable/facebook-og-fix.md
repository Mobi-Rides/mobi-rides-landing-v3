# Fix Facebook Open Graph Issues

## Problem Analysis

The Facebook Sharing Debugger reports:
1. **Missing fb:app_id**: Required property for Facebook sharing
2. **Wrong Canonical URL**: Shows root URL instead of page-specific URL
3. **Wrong og:url**: Same issue - falling back to root URL

### Root Cause
MobiRides is a client-side React SPA. Facebook's crawler only sees static HTML from `index.html` - it doesn't execute JavaScript, so `react-helmet-async` dynamic tags are never rendered for the crawler.

---

## Phase 1: Add fb:app_id (Quick Fix)

### File: `index.html`

**Location**: After line 24 (after the og:url tag)

**Add this line**:
```html
<meta property="fb:app_id" content="YOUR_FACEBOOK_APP_ID" />
```

### How to get a Facebook App ID:
1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Create a new App or use an existing one
3. Copy the App ID from the app dashboard

**Alternative**: Meta Business Suite → Settings → Business Assets → Apps

---

## Phase 2: Fix Per-Page OG Tags (Long-term)

For proper per-page `og:url` and `canonical` detection by crawlers, implement one of these solutions:

### Option A: Prerender.io (Recommended - SaaS)
- Sign up at prerender.io
- Add middleware to detect bot traffic
- Service returns pre-rendered static HTML to crawlers

### Option B: Cloudflare Workers
- If using Cloudflare, create a Worker
- Intercept crawler requests (based on User-Agent)
- Return pre-rendered pages to bots

### Option C: React Snap (Build-time)
- Add `react-snap` to build process
- Generates static HTML at build time
- Limited to routes known at build time

---

## Summary

| Issue | Cause | Solution | Status |
|-------|-------|----------|--------|
| Missing fb:app_id | Tag not added | Add to `index.html` | ⏳ Needs App ID |
| Wrong canonical URL | SPA - crawler doesn't run JS | Pre-rendering service | ⏳ Future |
| Wrong og:url | SPA - crawler doesn't run JS | Pre-rendering service | ⏳ Future |

---

## Execution Checklist

- [ ] Obtain Facebook App ID from Meta Business Suite
- [ ] Add `fb:app_id` meta tag to `index.html`
- [ ] Publish changes
- [ ] Re-scrape URL in Facebook Sharing Debugger
- [ ] Evaluate pre-rendering service for Phase 2
