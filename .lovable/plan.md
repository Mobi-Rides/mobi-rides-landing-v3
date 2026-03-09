

## Fix Team Photo Cropping — Use Adaptive Image Container

### Problem
Line 110: `object-cover` crops images to fill the `h-64` container, cutting off parts of headshots. The user wants images to **fit** within the container without cropping, with a background color filling any empty space.

### Solution
Change the image container to use `object-contain` with a neutral background, and wrap in an `AspectRatio` container for consistent sizing across cards.

### Changes

**`src/components/TeamGrid.tsx`** (lines 106-112):
- Replace the image container `div` with a fixed-height wrapper using a dark/neutral background (`bg-gray-100` or `bg-gray-900`)
- Change `object-cover` → `object-contain` so the full image is always visible
- Keep the fixed height (`h-64`) so all cards align consistently
- The background color fills any letterbox space (using `bg-gray-100` for a clean look rather than black)

```tsx
<div className="relative overflow-hidden bg-gray-100">
  <img
    src={member.image}
    alt={member.name}
    className="w-full h-64 object-contain group-hover:scale-105 transition-transform duration-300"
    loading="lazy"
  />
```

This ensures every team photo is fully visible regardless of its aspect ratio, with a subtle gray fill on any empty edges.

