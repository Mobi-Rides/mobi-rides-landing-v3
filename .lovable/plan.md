

## New VIP & Executive Services Page

### Overview
Create a dedicated `/vip` page showcasing MobiRides' premium chauffeur, shuttle, and executive transport services. This page positions MobiRides as a trusted provider for diplomats, corporate executives, and high-profile events — leveraging real social proof (Austrian & Ireland Ambassadors, Techstars Programme managers).

### Page Structure

**1. Hero Section** — Full-width with premium dark overlay, gold/purple accent
- Headline: "Executive & VIP Transport Services"
- Subtitle: "Trusted by ambassadors, global programme leaders, and Botswana's most discerning travellers"
- CTA: "Request a Quote" (scrolls to contact form)

**2. Services Grid** — 6 service cards with icons
- **Airport Transfers** — Meet & greet, flight tracking, luxury vehicles
- **Executive Chauffeur** — Professional drivers, corporate accounts, hourly/daily hire
- **VIP Shuttle Service** — Group transport, multi-stop routes, branded vehicles
- **Events & Conferences** — Delegate transport, logistics coordination, on-site management
- **Safari & Tour Drives** — Guided safari transfers, scenic tours, 4x4 vehicles
- **Diplomatic & Protocol Transport** — Security-cleared drivers, protocol-trained, confidential service

**3. Social Proof / Trust Section**
- Notable clients banner: "Trusted by the Austrian Embassy, Irish Embassy, Techstars Botswana, and leading corporates"
- Testimonial quotes (can start with placeholder quotes attributed to roles, e.g. "Programme Director, Techstars")

**4. Why Choose MobiRides VIP** — 4 value props
- Professional, vetted chauffeurs
- Premium & luxury vehicle fleet
- 24/7 availability & real-time coordination
- Discreet, protocol-aware service

**5. Fleet Showcase** — Visual grid of vehicle categories (luxury sedan, SUV, safari 4x4, shuttle van) using existing car images

**6. Contact / Quote Request Form**
- Fields: Name, Email, Phone, Service Type (dropdown), Event Date, Number of Guests, Special Requirements
- Submit sends to existing contact form pattern

### Technical Plan

| Task | Detail |
|------|--------|
| New file | `src/pages/VIPServicesPage.tsx` — follows `BusinessSolutionsPage` pattern with PageLayout, sections, form |
| Route | Add `/vip` route in `App.tsx` |
| Navigation | Add "VIP Services" to header nav array |
| Footer | Add link under appropriate footer column |
| Assets | Use existing car/professional images from `src/assets/` |
| No new dependencies | Uses existing components: PageLayout, Button, Card, Input, Textarea, Select |

### Estimated Scope
- 1 new page file (~400-500 lines)
- 2 minor edits (App.tsx route, Header.tsx nav link)
- 1 footer edit

