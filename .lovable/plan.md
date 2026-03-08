

## Update Hamburger Menu Button Colors

The purple pill on a purple-heavy hero doesn't stand out. Use a complementary accent color for the button background and change the icon lines for better contrast.

### Color Choice

Burnt orange works well as a complement to purple. A warm orange like `bg-orange-500/80` (or a custom amber-orange) will pop against purple hero backgrounds while feeling energetic and on-brand for a mobility company.

### Changes

| File | Change |
|------|--------|
| `src/components/Header.tsx` | Line ~112: Change unscrolled button classes from `text-white hover:text-gray-200 bg-primary/30 backdrop-blur-sm` to `text-foreground hover:text-primary bg-orange-500/80 backdrop-blur-sm` — burnt orange pill with dark/purple hamburger lines |

The hamburger lines will use `text-foreground` (dark) for strong contrast against the orange pill. On scroll, behavior stays the same.

