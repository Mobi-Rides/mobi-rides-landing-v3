

## Replace All Blue Accents with Primary Purple — Global Full Sweep

### Scope
Replace all hardcoded Tailwind `blue-*` utility classes with `primary` tokens or purple equivalents across ~44 files. The design system already defines `--primary: 281 100% 59%` (Mobi Purple) with light/dark variants.

### Color Mapping Strategy

| Current Blue Class | Replacement |
|-------------------|-------------|
| `bg-blue-600` | `bg-primary` |
| `bg-blue-500` | `bg-primary` |
| `bg-blue-700` | `bg-primary-dark` or `bg-primary/90` |
| `bg-blue-100` | `bg-primary/10` or `bg-purple-100` |
| `bg-blue-50` | `bg-primary/5` or `bg-purple-50` |
| `text-blue-600` | `text-primary` |
| `text-blue-700` | `text-primary` |
| `text-blue-800` | `text-primary-dark` |
| `border-blue-*` | `border-primary` or `border-primary/20` |
| `ring-blue-*` | `ring-primary` |
| `focus:ring-blue-*` | `focus:ring-primary` |
| `hover:bg-blue-*` | `hover:bg-primary/90` |
| Gradients: `from-blue-600 to-purple-600` | `from-primary to-primary-light` or keep purple destination |

### Files to Update (~44 total)

**High-Impact Pages:**
- `CTASection.tsx` — CTA backgrounds and button styles
- `HostCTASection.tsx` — gradient background
- `AboutPage.tsx` — mission section, icon backgrounds
- `PressPage.tsx` — stats, newsletter, category badges
- `FAQPage.tsx` — gradient backgrounds, search focus
- `SupportPage.tsx` — search input, action links
- `PrivacyPage.tsx` — sidebar active states, notices
- `HostProtectionPage.tsx` — tabs, tips sections
- `HostSupportPage.tsx` — hero overlay, CTA
- `DamageProtectionPage.tsx` — hero, tier highlights
- `LocationsPage.tsx` — step indicators, service badges
- `BusinessSolutionsPage.tsx` — tabs, form focus, pricing
- `HostRequirementsPage.tsx` — step colors, location selector
- `HostBenefitsPage.tsx` — icon backgrounds, quote border
- `SafetyPage.tsx` — alert styling
- `BlogPage.tsx` — filter focus states
- `AdminBlogPage.tsx` — loading spinner, scheduled badges

**Components:**
- `ContactForm.tsx` — submit button
- `ImageUpload.tsx` — drag active state
- `CoverageMap.tsx` — input focus states
- `SupportTicketForm.tsx` — priority selector

### Implementation Approach

1. **Global find/replace** with these patterns:
   - `bg-blue-600` → `bg-primary`
   - `bg-blue-500` → `bg-primary`
   - `bg-blue-100` → `bg-primary/10`
   - `bg-blue-50` → `bg-primary/5`
   - `text-blue-600` → `text-primary`
   - `text-blue-700` → `text-primary`
   - `border-blue-600` → `border-primary`
   - `border-blue-500` → `border-primary`
   - `border-blue-200` → `border-primary/20`
   - `ring-blue-500` → `ring-primary`
   - `focus:ring-blue-500` → `focus:ring-primary`
   - `focus:border-blue-500` → `focus:border-primary`
   - `hover:bg-blue-700` → `hover:bg-primary/90`
   - `hover:text-blue-600` → `hover:text-primary`

2. **Gradient updates:**
   - `from-blue-600 to-purple-600` → `from-primary to-primary-light`
   - `from-blue-50 to-purple-50` → `from-primary/5 to-primary/10`
   - `from-blue-50 to-green-50` → `from-primary/5 to-secondary/5`
   - `from-blue-50 to-indigo-100` → `from-primary/5 to-primary/10`

3. **Color function mappings** in pages with `getColorClasses`:
   - Update `blue` key to use `primary` token variants

### Estimated Changes
- ~1,700+ class instances across 44 files
- Most are simple string replacements
- Some require context-aware adjustment (e.g., gradient endpoints)

