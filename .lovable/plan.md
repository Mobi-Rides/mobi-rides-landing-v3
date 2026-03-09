

## Fix: Transparent Dropdown Background on Rent2Buy Calculator

### Problem

The `SelectContent` dropdown uses `bg-popover` but `--popover` CSS variable is **not defined** in the light theme (only in dark theme at line 110). This causes an undefined/transparent background, making dropdown options blend with form elements behind them.

### Solution

Add `--popover` and `--popover-foreground` variables to the light theme in `src/index.css`. This ensures dropdowns have a solid white background.

### Change

**File: `src/index.css`**

Add these two lines after line 45 (`--ring: 281 100% 59%;`):

```css
--popover: 0 0% 100%;
--popover-foreground: 222 47% 11%;
```

This gives dropdowns a solid white background (`#fff`) with proper dark text, matching the `--background` and `--foreground` values.

### Result

- Dropdown menus will have a **solid white background**
- No more text bleed-through from underlying form elements
- Consistent with existing card/background styling

