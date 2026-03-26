

## Fix: Logo Not Displaying — Incorrect Path

### Problem
The Header and Footer reference the logo as `/public/mobirides-logo.png`. In Vite projects, files in the `public/` folder are served at the root — so the correct path is `/mobirides-logo.png` (without the `/public/` prefix). The current path results in a 404, so the browser shows nothing or a broken image.

### Changes

**`src/components/Header.tsx`** (line 63):
- Change `src="/public/mobirides-logo.png"` → `src="/mobirides-logo.png"`

**`src/components/Footer.tsx`** (line 54):
- Change `src="/public/mobirides-logo.png"` → `src="/mobirides-logo.png"`

That's it — two one-line fixes. The new wordmark file is already in `public/mobirides-logo.png`, it just needs the correct reference path.

