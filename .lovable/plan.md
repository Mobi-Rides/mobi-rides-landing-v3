

## Migrate All @mobirides.com Emails to @mobirides.africa (Excluding Auth/Admin/Edge Functions)

### Scope

Replace `@mobirides.com` → `@mobirides.africa` in all files **except**:
- `src/pages/AdminLoginPage.tsx` (placeholder text)
- `src/contexts/AuthContext.tsx` (admin domain check)
- `supabase/functions/import-blog-posts/index.ts` (edge function author emails)

### Files to Update

1. **`src/config/site.ts`** — department emails (safety, partnerships, media, careers, gaborone, francistown, maun)
2. **`src/data/contact-info.json`** — office emails, department emails
3. **`src/data/legal-content.json`** — privacy@, legal@, dpo@
4. **`src/data/press-releases.json`** — press@
5. **`src/data/team-members.json`** — individual team member emails
6. **`src/data/faq.json`** — drivers@
7. **`src/pages/TermsPage.tsx`** — legal@
8. **`src/pages/PrivacyPage.tsx`** — privacy@
9. **`src/pages/BusinessSolutionsPage.tsx`** — partnerships@
10. **`src/pages/HostProtectionPage.tsx`** — claims@
11. **Public markdown docs** (`public/*.md`) — any @mobirides.com references

### Approach

Simple string replacement `@mobirides.com` → `@mobirides.africa` in each file listed above.

