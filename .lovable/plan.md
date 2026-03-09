
## AI-Generated Image for Host CTA Section + Replace All Placeholders

### Problem Identified

**Placeholder Images Found:**
1. **HostCTASection.tsx** (Line 47): `/api/placeholder/500/400` - Professional earning with car sharing
2. **TestimonialsSection.tsx** (Lines 20, 28, 36, 44, 52, 60): 6× `/api/placeholder/80/80` - Testimonial avatars

These development placeholders need to be replaced with brand-compliant assets.

---

### Brand Image Guidelines (from mobirides-brand-guide-2025-10-27.md)

**Photography Style Requirements:**
- ✅ Feature real Botswana people (diverse representation)
- ✅ Professional quality but approachable feel
- ✅ Natural lighting, authentic moments
- ✅ Show clean, well-maintained vehicles
- ❌ No generic international stock photos
- ❌ Not overly staged or heavily filtered

**Reference Images from Brand:**
- `hero-professional.jpg` - Professional, aspirational style
- `gaborone-business.jpg` - Urban professionals, real community members

**Color Palette Context:**
- Mobi Purple: `#be30ff` (innovation, transformation, premium)
- Renter Green: `#16A34A` (growth, trust, prosperity)
- Modern, clean aesthetic with Botswana context

---

### Solution Plan

#### 1. Generate AI Image for Host CTA Section

**Image Prompt (Nano Banana Pro for higher quality):**
```
A professional African businessperson smiling warmly while sitting in the driver's seat of a clean, modern car in Gaborone, Botswana. Natural daylight streaming through the windshield. The person is holding a smartphone showing earning statistics. The car interior is pristine with a purple accent visible on the dashboard. Shot from outside the car through the window, capturing both the person and the vehicle interior. Professional photography style, authentic and approachable, not overly staged. Warm, natural lighting. 16:9 aspect ratio, 3:2 crop safe.
```

**Technical Specs:**
- Model: `google/gemini-3-pro-image-preview` (higher quality)
- Aspect ratio: 4:3 to match existing `aspect-[4/3]` container
- Output format: Base64 → Upload to project assets
- File path: `src/assets/host-earning-professional.jpg`

#### 2. Replace Testimonial Avatars

**Strategy:** Remove avatar images entirely and use gradient initials (already implemented)

**Current Code (Lines 90-100 in TestimonialsSection.tsx):**
```tsx
<div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center mr-4">
  <span className="text-white font-bold text-sm">
    {testimonial.name.split(' ').map(n => n[0]).join('')}
  </span>
</div>
```

This gradient circle with initials is already implemented and looks professional—no image needed. Simply remove the unused `avatar` property from the testimonials data array.

---

### Implementation Changes

| File | Lines | Change |
|------|-------|--------|
| `src/components/sections/HostCTASection.tsx` | 1 | Add import: `import hostEarningImage from '@/assets/host-earning-professional.jpg';` |
| `src/components/sections/HostCTASection.tsx` | 47 | Replace `src="/api/placeholder/500/400"` with `src={hostEarningImage}` |
| `src/components/sections/TestimonialsSection.tsx` | 20, 28, 36, 44, 52, 60 | Remove `avatar: "/api/placeholder/80/80"` lines (6 instances) |
| `src/assets/host-earning-professional.jpg` | NEW | Upload AI-generated image |

---

### AI Image Generation Workflow

1. **Generate**: Call Nano Banana Pro with brand-aligned prompt
2. **Receive**: Base64-encoded image data
3. **Upload**: Save to `src/assets/host-earning-professional.jpg`
4. **Integrate**: Import and use in HostCTASection component
5. **Verify**: Image loads correctly and matches brand aesthetic

---

### Brand Alignment Verification

**Host CTA Context:**
- Section message: "Own a car? Put it to work!"
- Target: Part-time hosts earning P4,500–15,000/month
- Tone: Empowering, aspirational, professional yet approachable
- Image should show: Success, earnings potential, professionalism, Botswana context

**Generated Image Will:**
- Feature an African professional (Botswana representation)
- Show smartphone with earnings (tangible benefit)
- Include clean, modern vehicle (quality signal)
- Use natural lighting (authentic feel)
- Match brand's professional-yet-approachable tone
