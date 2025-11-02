# Blog Editor Enhancement - JIRA Implementation Plan
**Date:** 2025-10-30  
**Project:** MobiRides Blog Platform  
**Epic:** Blog Editor Spacing & Typography Enhancement

---

## 🎯 Epic Overview

**Epic ID:** BLOG-100  
**Epic Name:** Blog Editor Spacing & Typography Enhancement  
**Epic Owner:** Development Team  
**Priority:** High  
**Target Release:** Sprint 1-3

**Epic Description:**  
Enhance the blog editor to support comprehensive spacing controls, additional typography features, and ensure consistent rendering between editor preview and published posts. Currently, bullet point numbering, paragraph spacing, and list formatting do not carry over properly to published content.

**Business Value:**  
- Improved content creator experience
- Professional-looking blog posts with proper formatting
- Reduced editing time and frustration
- Better content readability for end users

**Success Metrics:**
- 100% spacing consistency between editor and published view
- Support for 1.0x, 1.15x, 1.5x, and 2.0x line spacing
- Zero formatting loss during publish
- Editor feature parity with common blog platforms

---

## 📋 Epics & Stories Breakdown

### EPIC-1: Foundation & Critical Fixes (Sprint 1)
**Priority:** Critical  
**Story Points:** 21

---

#### STORY BLOG-101: Install and Configure Tailwind Typography Plugin
**Type:** Task  
**Priority:** Critical  
**Story Points:** 3  
**Sprint:** 1

**Description:**  
Install `@tailwindcss/typography` plugin to provide a consistent prose styling system for blog content rendering.

**Acceptance Criteria:**
- [ ] `@tailwindcss/typography` package installed via dependency manager
- [ ] `tailwind.config.ts` updated with typography plugin configuration
- [ ] Default prose styles render correctly in all three views (editor, preview, published)
- [ ] Typography plugin documentation reviewed for customization options

**Technical Notes:**
```typescript
// tailwind.config.ts
plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")]
```

**Files to Modify:**
- `package.json` (via dependency tool)
- `tailwind.config.ts`

**Dependencies:** None  
**Blocks:** BLOG-102, BLOG-103, BLOG-104

---

#### STORY BLOG-102: Create Custom Line-Height Extension
**Type:** Feature  
**Priority:** Critical  
**Story Points:** 5  
**Sprint:** 1

**Description:**  
Create a custom Tiptap extension to control line-height for paragraphs and list items. Provide toolbar buttons for common spacing: 1.0x (single), 1.15x, 1.5x, and 2.0x (double).

**Acceptance Criteria:**
- [ ] Custom `LineHeight` extension created in `src/lib/tiptap/LineHeight.ts`
- [ ] Extension supports values: `1`, `1.15`, `1.5`, `2`
- [ ] Line-height persists when content is saved and republished
- [ ] Toolbar includes 4 buttons for line-height selection
- [ ] Active line-height button highlighted in toolbar
- [ ] Line-height can be applied to selected text or paragraph

**Technical Implementation:**
```typescript
// Create extension based on TextStyle
import { Extension } from '@tiptap/core';

export const LineHeight = Extension.create({
  name: 'lineHeight',
  addGlobalAttributes() {
    return [
      {
        types: ['paragraph', 'listItem'],
        attributes: {
          lineHeight: {
            default: null,
            parseHTML: element => element.style.lineHeight || null,
            renderHTML: attributes => {
              if (!attributes.lineHeight) return {};
              return { style: `line-height: ${attributes.lineHeight}` };
            },
          },
        },
      },
    ];
  },
});
```

**Files to Create:**
- `src/lib/tiptap/LineHeight.ts`

**Files to Modify:**
- `src/components/RichTextEditor.tsx` (add extension and toolbar buttons)

**Dependencies:** BLOG-101  
**Blocks:** BLOG-105

---

#### STORY BLOG-103: Fix List and Paragraph Spacing Configuration
**Type:** Bug Fix  
**Priority:** Critical  
**Story Points:** 5  
**Sprint:** 1

**Description:**  
Update StarterKit configuration in RichTextEditor to remove fixed spacing classes and make spacing customizable per item. Fix the core issue where list spacing doesn't carry over to published posts.

**Acceptance Criteria:**
- [ ] Remove hardcoded `mb-2` class from listItem configuration
- [ ] List items support custom margin-bottom values
- [ ] Numbered lists maintain proper spacing in published view
- [ ] Bullet lists maintain proper spacing in published view
- [ ] Nested lists preserve spacing correctly
- [ ] Spacing controls work for both `<ul>` and `<ol>` elements

**Technical Implementation:**
```typescript
// RichTextEditor.tsx - Update StarterKit config
StarterKit.configure({
  listItem: {
    HTMLAttributes: {
      class: 'leading-relaxed',
      style: 'margin-bottom: var(--list-item-spacing, 0.5rem)'
    }
  },
  bulletList: {
    HTMLAttributes: {
      class: 'list-disc ml-6 space-y-2'
    }
  },
  orderedList: {
    HTMLAttributes: {
      class: 'list-decimal ml-6 space-y-2'
    }
  }
})
```

**Files to Modify:**
- `src/components/RichTextEditor.tsx` (lines 30-45, editor configuration)

**Dependencies:** BLOG-101  
**Related:** BLOG-104

---

#### STORY BLOG-104: Synchronize Editor, Preview, and Published Views
**Type:** Bug Fix  
**Priority:** Critical  
**Story Points:** 8  
**Sprint:** 1

**Description:**  
Ensure all three content views (RichTextEditor, AdminBlogPreviewPage, BlogPostPage) use identical CSS classes and rendering logic so spacing appears consistently across all states.

**Acceptance Criteria:**
- [ ] Editor preview matches published output 100%
- [ ] Admin preview page matches published output 100%
- [ ] Line-height settings persist across all views
- [ ] List spacing is identical in all views
- [ ] Paragraph spacing is identical in all views
- [ ] No visual regression in existing published posts
- [ ] Dark mode spacing remains consistent

**Technical Implementation:**
Create unified content class:
```css
/* index.css */
@layer components {
  .blog-content-display {
    @apply prose prose-lg max-w-none
           prose-headings:font-black prose-headings:text-foreground
           prose-p:text-foreground prose-p:leading-relaxed
           prose-ul:space-y-2 prose-ol:space-y-2
           prose-li:leading-relaxed
           prose-strong:text-foreground prose-strong:font-bold
           prose-a:text-primary prose-a:no-underline hover:prose-a:underline;
  }
}
```

Apply to all views:
- `RichTextEditor.tsx` line 105: `className="blog-content-display"`
- `AdminBlogPreviewPage.tsx` line 154: `className="blog-content-display"`
- `BlogPostPage.tsx` line 210-220: `className="blog-content-display"`

**Files to Modify:**
- `src/index.css` (add `.blog-content-display` class)
- `src/components/RichTextEditor.tsx` (update className)
- `src/pages/BlogPostPage.tsx` (update className)
- `src/pages/AdminBlogPreviewPage.tsx` (update className)

**Dependencies:** BLOG-101, BLOG-102, BLOG-103  
**Blocks:** All Phase 2 stories

**Testing Checklist:**
- [ ] Create post with single-spaced lists
- [ ] Create post with 1.5x spaced lists
- [ ] Create post with double-spaced paragraphs
- [ ] View in editor - spacing correct
- [ ] View in admin preview - spacing matches editor
- [ ] Publish post - spacing matches editor
- [ ] Test on mobile - spacing consistent
- [ ] Test in dark mode - spacing consistent

---

### EPIC-2: Advanced Spacing Controls (Sprint 2)
**Priority:** High  
**Story Points:** 13

---

#### STORY BLOG-201: Create Custom Paragraph Spacing Extension
**Type:** Feature  
**Priority:** High  
**Story Points:** 5  
**Sprint:** 2

**Description:**  
Create a Tiptap extension that allows users to control spacing before and after paragraphs with preset options: None, Small (0.5rem), Medium (1rem), Large (2rem).

**Acceptance Criteria:**
- [ ] Custom `Spacing` extension created
- [ ] Extension supports margin-top and margin-bottom
- [ ] Spacing options: None (0), Small (0.5rem), Medium (1rem), Large (2rem)
- [ ] Spacing persists in HTML output
- [ ] Toolbar includes spacing controls
- [ ] Can apply different spacing to different paragraphs

**Technical Implementation:**
```typescript
// src/lib/tiptap/Spacing.ts
export const Spacing = Extension.create({
  name: 'spacing',
  addGlobalAttributes() {
    return [
      {
        types: ['paragraph'],
        attributes: {
          marginTop: {
            default: null,
            parseHTML: element => element.style.marginTop || null,
            renderHTML: attributes => {
              if (!attributes.marginTop) return {};
              return { style: `margin-top: ${attributes.marginTop}` };
            },
          },
          marginBottom: {
            default: null,
            parseHTML: element => element.style.marginBottom || null,
            renderHTML: attributes => {
              if (!attributes.marginBottom) return {};
              return { style: `margin-bottom: ${attributes.marginBottom}` };
            },
          },
        },
      },
    ];
  },
});
```

**Files to Create:**
- `src/lib/tiptap/Spacing.ts`

**Files to Modify:**
- `src/components/RichTextEditor.tsx`

**Dependencies:** BLOG-104  
**Story Points Breakdown:**
- Extension creation: 2 points
- Toolbar integration: 2 points
- Testing: 1 point

---

#### STORY BLOG-202: Add Spacing Toolbar Controls
**Type:** Feature  
**Priority:** High  
**Story Points:** 5  
**Sprint:** 2

**Description:**  
Add toolbar controls for line-height, list spacing, and paragraph spacing with intuitive UI for content creators.

**Acceptance Criteria:**
- [ ] Line-height dropdown with visual preview (1.0x, 1.15x, 1.5x, 2.0x)
- [ ] List spacing increase/decrease buttons
- [ ] Paragraph spacing controls (before/after)
- [ ] Tooltips explain each spacing option
- [ ] Controls appear contextually based on selected content
- [ ] Visual feedback shows current spacing values

**UI/UX Requirements:**
- Use dropdown for line-height (similar to heading level dropdown)
- Use +/- buttons for incremental spacing adjustments
- Show current spacing value in toolbar when element selected
- Disable controls when not applicable (e.g., list spacing when paragraph selected)

**Files to Modify:**
- `src/components/RichTextEditor.tsx` (toolbar section, lines 110-250)

**Dependencies:** BLOG-102, BLOG-201

---

#### STORY BLOG-203: Update List Item Default Spacing
**Type:** Enhancement  
**Priority:** Medium  
**Story Points:** 3  
**Sprint:** 2

**Description:**  
Update list item configuration to use CSS variables for spacing, allowing dynamic control while maintaining sensible defaults.

**Acceptance Criteria:**
- [x] List items use CSS variable for margin-bottom
- [x] Default spacing is `0.5rem`
- [x] Spacing can be overridden per list
- [x] Nested lists maintain proper visual hierarchy
- [x] Works with both bullet and numbered lists

**Technical Implementation:**
```typescript
listItem: {
  HTMLAttributes: {
    class: 'leading-relaxed',
    style: 'margin-bottom: var(--list-item-spacing, 0.5rem)'
  }
}
```

```css
/* index.css */
.blog-content-display ul[data-spacing="tight"] {
  --list-item-spacing: 0.25rem;
}
.blog-content-display ul[data-spacing="normal"] {
  --list-item-spacing: 0.5rem;
}
.blog-content-display ul[data-spacing="relaxed"] {
  --list-item-spacing: 1rem;
}
.blog-content-display ul[data-spacing="loose"] {
  --list-item-spacing: 1.5rem;
}
```

**Files to Modify:**
- `src/components/RichTextEditor.tsx`
- `src/index.css`

**Dependencies:** BLOG-201

---

### EPIC-3: Missing Typography Features (Sprint 2-3)
**Priority:** Medium  
**Story Points:** 18

---

#### STORY BLOG-301: Add Font Size Controls
**Type:** Feature  
**Priority:** Medium  
**Story Points:** 3  
**Sprint:** 2

**Description:**  
Add font size controls to toolbar with preset options: Small, Normal, Large, Extra Large.

**Acceptance Criteria:**
- [ ] Font size dropdown in toolbar
- [ ] Options: Small (0.875rem), Normal (1rem), Large (1.25rem), XL (1.5rem)
- [ ] Font size persists in published posts
- [ ] Can apply to selected text or entire paragraphs
- [ ] Works with existing text styles (bold, italic)

**Files to Modify:**
- `src/components/RichTextEditor.tsx`

**Dependencies:** BLOG-104

---

#### STORY BLOG-302: Add H4-H6 Heading Levels
**Type:** Feature  
**Priority:** Medium  
**Story Points:** 2  
**Sprint:** 2

**Description:**  
Extend heading levels to include H4, H5, and H6 for better content hierarchy.

**Acceptance Criteria:**
- [ ] H4, H5, H6 options added to heading dropdown
- [ ] Proper semantic HTML output (`<h4>`, `<h5>`, `<h6>`)
- [ ] Consistent styling in editor and published view
- [ ] Proper typography hierarchy maintained
- [ ] Keyboard shortcuts work for all levels

**Technical Notes:**
```typescript
// StarterKit already supports H1-H6, just need to add UI
heading: {
  levels: [1, 2, 3, 4, 5, 6]
}
```

**Files to Modify:**
- `src/components/RichTextEditor.tsx`
- `src/index.css` (if custom H4-H6 styles needed)

**Dependencies:** BLOG-104

---

#### STORY BLOG-303: Add Underline Support
**Type:** Feature  
**Priority:** Medium  
**Story Points:** 2  
**Sprint:** 2

**Description:**  
Install and configure `@tiptap/extension-underline` to support underlined text.

**Acceptance Criteria:**
- [ ] `@tiptap/extension-underline` installed
- [ ] Underline button added to toolbar
- [ ] Keyboard shortcut works (Cmd+U / Ctrl+U)
- [ ] Underline persists in published posts
- [ ] Works with other text styles

**Files to Modify:**
- `src/components/RichTextEditor.tsx`

**Dependencies:** BLOG-104

---

#### STORY BLOG-304: Add Horizontal Rule Support
**Type:** Feature  
**Priority:** Low  
**Story Points:** 2  
**Sprint:** 3

**Description:**  
Add horizontal rule (divider) support for visual content separation.

**Acceptance Criteria:**
- [ ] `@tiptap/extension-horizontal-rule` installed
- [ ] Divider button in toolbar
- [ ] Keyboard shortcut works
- [ ] Proper styling in editor and published view
- [ ] Mobile-responsive

**Files to Modify:**
- `src/components/RichTextEditor.tsx`
- `src/index.css`

**Dependencies:** BLOG-104

---

#### STORY BLOG-305: Add Table Support
**Type:** Feature  
**Priority:** Medium  
**Story Points:** 5  
**Sprint:** 3

**Description:**  
Add comprehensive table support for structured data presentation in blog posts.

**Acceptance Criteria:**
- [ ] Table extensions installed (table, table-row, table-cell, table-header)
- [ ] Table creation UI in toolbar
- [ ] Add/remove rows and columns
- [ ] Merge cells support
- [ ] Responsive table styling
- [ ] Proper rendering in all views

**Dependencies to Install:**
```
@tiptap/extension-table
@tiptap/extension-table-row
@tiptap/extension-table-cell
@tiptap/extension-table-header
```

**Files to Modify:**
- `src/components/RichTextEditor.tsx`
- `src/index.css`

**Dependencies:** BLOG-104

---

#### STORY BLOG-306: Add Indentation Controls
**Type:** Feature  
**Priority:** Medium  
**Story Points:** 4  
**Sprint:** 3

**Description:**  
Add indent and outdent functionality for paragraphs and list items.

**Acceptance Criteria:**
- [ ] Indent button increases left margin
- [ ] Outdent button decreases left margin
- [ ] Works with Tab/Shift+Tab keyboard shortcuts
- [ ] Visual indicators show indentation level
- [ ] Indentation persists in published view
- [ ] Works with nested lists

**Technical Notes:**
Consider using `@tiptap/extension-text-align` with indent capabilities or create custom extension.

**Files to Modify:**
- `src/components/RichTextEditor.tsx`

**Dependencies:** BLOG-104

---

### EPIC-4: Enhanced CSS System (Sprint 3)
**Priority:** Medium  
**Story Points:** 8

---

#### STORY BLOG-401: Create Unified Blog Content Styles
**Type:** Enhancement  
**Priority:** Medium  
**Story Points:** 5  
**Sprint:** 3

**Description:**  
Create a comprehensive `.blog-content` CSS class in `index.css` with all necessary prose styling and spacing variants.

**Acceptance Criteria:**
- [ ] `.blog-content` class created with full prose configuration
- [ ] Paragraph spacing variants defined
- [ ] List spacing variants defined (tight, normal, relaxed, loose)
- [ ] All typography elements styled consistently
- [ ] Dark mode styles included
- [ ] Mobile-responsive

**Technical Implementation:**
```css
@layer components {
  .blog-content {
    @apply prose prose-lg max-w-none;
    
    /* Paragraph spacing */
    @apply prose-p:my-6 prose-p:leading-relaxed;
    
    /* List spacing variants */
    @apply prose-ul:my-6 prose-ul:space-y-2;
    @apply prose-ol:my-6 prose-ol:space-y-2;
    @apply prose-li:leading-relaxed;
    
    /* Custom spacing classes */
    & .spacing-tight { @apply space-y-1; }
    & .spacing-normal { @apply space-y-2; }
    & .spacing-relaxed { @apply space-y-4; }
    & .spacing-loose { @apply space-y-6; }
    
    /* Headings */
    @apply prose-headings:font-black prose-headings:mb-4;
    
    /* Links */
    @apply prose-a:text-primary prose-a:no-underline hover:prose-a:underline;
    
    /* Code blocks */
    @apply prose-pre:bg-muted prose-pre:border prose-pre:border-border;
    
    /* Quotes */
    @apply prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground;
  }
}
```

**Files to Modify:**
- `src/index.css`

**Dependencies:** BLOG-104  
**Blocks:** BLOG-402

---

#### STORY BLOG-402: Apply Consistent Class Across All Views
**Type:** Refactor  
**Priority:** Medium  
**Story Points:** 3  
**Sprint:** 3

**Description:**  
Replace all inline prose classes with the unified `.blog-content` class across editor, preview, and published views.

**Acceptance Criteria:**
- [ ] RichTextEditor uses `.blog-content`
- [ ] AdminBlogPreviewPage uses `.blog-content`
- [ ] BlogPostPage uses `.blog-content`
- [ ] No visual regressions
- [ ] Existing published posts render correctly

**Files to Modify:**
- `src/components/RichTextEditor.tsx`
- `src/pages/BlogPostPage.tsx`
- `src/pages/AdminBlogPreviewPage.tsx`

**Dependencies:** BLOG-401

---

### EPIC-5: Editor UX Improvements (Sprint 4 - Optional)
**Priority:** Low  
**Story Points:** 13

---

#### STORY BLOG-501: Add Spacing Visual Indicators
**Type:** Enhancement  
**Priority:** Low  
**Story Points:** 3  
**Sprint:** 4

**Description:**  
Add subtle visual guides to show spacing between elements while editing.

**Acceptance Criteria:**
- [x] Dotted lines show paragraph spacing
- [x] Different colors for different spacing values
- [x] Toggle on/off via toolbar button
- [x] Non-intrusive visual design
- [x] Helps users understand spacing while editing

---

#### STORY BLOG-502: Add Format Painter Tool
**Type:** Feature  
**Priority:** Low  
**Story Points:** 5  
**Sprint:** 4

**Description:**  
Add format painter functionality to copy formatting from one section to another.

**Acceptance Criteria:**
- [x] Format painter button in toolbar
- [x] Copy font size, spacing, colors, line-height
- [x] Apply to selected text or paragraph
- [x] Visual feedback shows format painter is active
- [x] ESC key cancels format painter mode

---

#### STORY BLOG-503: Add Block Spacing Panel
**Type:** Feature  
**Priority:** Low  
**Story Points:** 3  
**Sprint:** 4

**Description:**  
Add a sidebar panel showing current element spacing with direct input controls.

**Acceptance Criteria:**
- [x] Sidebar panel shows selected element properties
- [x] Direct input for margin-top/margin-bottom
- [x] Numeric inputs with rem/px units
- [x] Real-time preview of changes
- [x] Panel collapses when not needed

---

#### STORY BLOG-504: Reorganize Toolbar with Grouping
**Type:** Enhancement  
**Priority:** Low  
**Story Points:** 2  
**Sprint:** 4

**Description:**  
Organize toolbar buttons into logical groups with visual separators.

**Acceptance Criteria:**
- [x] Groups: Text formatting | Headings | Lists | Alignment | Media | Spacing | Advanced
- [x] Visual separators between groups
- [x] Responsive toolbar (collapse to dropdown on mobile)
- [x] Tooltips show keyboard shortcuts
- [x] Consistent icon design

---

### EPIC-6: Content Export & Quality (Sprint 3)
**Priority:** Medium  
**Story Points:** 8

---

#### STORY BLOG-601: Ensure HTML Export Preserves All Formatting
**Type:** Bug Fix  
**Priority:** High  
**Story Points:** 5  
**Sprint:** 3

**Description:**  
Ensure all custom spacing and formatting is preserved in HTML output using inline styles or data attributes, not relying solely on CSS classes.

**Acceptance Criteria:**
- [ ] Line-height saved as inline style
- [ ] Paragraph spacing saved as inline style
- [ ] List spacing saved as data attributes + styles
- [ ] Font sizes saved as inline styles
- [ ] All formatting survives copy/paste
- [ ] HTML validates correctly

**Technical Approach:**
Use `renderHTML` methods in extensions to ensure inline styles are generated:
```typescript
renderHTML: attributes => {
  if (!attributes.lineHeight) return {};
  return { 
    style: `line-height: ${attributes.lineHeight}`,
    'data-line-height': attributes.lineHeight // Fallback
  };
}
```

**Files to Modify:**
- `src/lib/tiptap/LineHeight.ts`
- `src/lib/tiptap/Spacing.ts`

**Dependencies:** BLOG-201, BLOG-202

---

#### STORY BLOG-602: Add HTML Sanitization
**Type:** Enhancement  
**Priority:** Medium  
**Story Points:** 3  
**Sprint:** 3

**Description:**  
Clean up generated HTML by removing empty tags and normalizing spacing before saving.

**Acceptance Criteria:**
- [ ] Remove empty `<p>` tags
- [ ] Remove unnecessary whitespace
- [ ] Normalize nested list structure
- [ ] Remove invalid HTML
- [ ] Maintain semantic correctness
- [ ] Don't break existing content

**Technical Approach:**
Add sanitization in `handleSave` function before database insert:
```typescript
const sanitizeHTML = (html: string) => {
  return html
    .replace(/<p><\/p>/g, '') // Remove empty paragraphs
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
};
```

**Files to Modify:**
- `src/pages/AdminBlogEditPage.tsx` (handleSave function)

**Dependencies:** BLOG-601

---

## 📊 Sprint Planning Summary

### Sprint 1: Critical Foundation (21 points)
**Duration:** 2 weeks  
**Goal:** Fix core spacing issues and synchronize views

Stories:
- BLOG-101: Install Tailwind Typography (3 pts)
- BLOG-102: Line-Height Extension (5 pts)
- BLOG-103: Fix List Spacing (5 pts)
- BLOG-104: Synchronize Views (8 pts)

**Sprint 1 Success Criteria:**
- Editor preview matches published output
- Line-height controls functional
- Basic list spacing working
- Zero formatting loss on publish

---

### Sprint 2: Advanced Controls (18 points)
**Duration:** 2 weeks  
**Goal:** Add advanced spacing controls and essential typography features

Stories:
- BLOG-201: Paragraph Spacing Extension (5 pts)
- BLOG-202: Spacing Toolbar Controls (5 pts)
- BLOG-203: List Item CSS Variables (3 pts)
- BLOG-301: Font Size Controls (3 pts)
- BLOG-302: H4-H6 Headings (2 pts)

**Sprint 2 Success Criteria:**
- Full spacing control in toolbar
- Font size controls working
- Extended heading levels available
- Content creators can control all spacing aspects

---

### Sprint 3: Polish & Export (21 points)
**Duration:** 2 weeks  
**Goal:** Add remaining features and ensure quality HTML export

Stories:
- BLOG-303: Underline Support (2 pts)
- BLOG-304: Horizontal Rule (2 pts)
- BLOG-305: Table Support (5 pts)
- BLOG-306: Indentation (4 pts)
- BLOG-401: Unified CSS Styles (5 pts)
- BLOG-402: Apply Consistent Class (3 pts)

**Sprint 3 Success Criteria:**
- All typography features implemented
- Unified CSS system in place
- Professional-grade blog editor
- Feature parity with major blogging platforms

---

### Sprint 4 (Optional): UX Enhancements (13 points)
**Duration:** 2 weeks  
**Goal:** Add nice-to-have UX improvements

Stories:
- BLOG-501: Visual Spacing Indicators (3 pts)
- BLOG-502: Format Painter (5 pts)
- BLOG-503: Block Spacing Panel (3 pts)
- BLOG-504: Toolbar Reorganization (2 pts)

---

## 🔧 Technical Dependencies & Order

```
BLOG-101 (Typography Plugin)
  └─→ BLOG-102 (Line-Height)
  └─→ BLOG-103 (List Spacing)
  └─→ BLOG-104 (Sync Views)
       └─→ BLOG-201 (Paragraph Spacing)
            └─→ BLOG-202 (Spacing Controls)
            └─→ BLOG-601 (HTML Export)
       └─→ BLOG-203 (List CSS Variables)
       └─→ BLOG-301 (Font Size)
       └─→ BLOG-302 (H4-H6)
       └─→ BLOG-303 (Underline)
       └─→ BLOG-304 (Horizontal Rule)
       └─→ BLOG-305 (Tables)
       └─→ BLOG-306 (Indentation)
       └─→ BLOG-401 (Unified CSS)
            └─→ BLOG-402 (Apply CSS)
       └─→ BLOG-602 (Sanitization)
            └─→ BLOG-501 (Visual Indicators)
            └─→ BLOG-502 (Format Painter)
            └─→ BLOG-503 (Spacing Panel)
            └─→ BLOG-504 (Toolbar Groups)
```

---

## 📦 Package Dependencies

### Required Packages
```json
{
  "@tailwindcss/typography": "^0.5.10",
  "@tiptap/extension-underline": "^2.1.13",
  "@tiptap/extension-horizontal-rule": "^2.1.13"
}
```

### Optional Packages (Sprint 3)
```json
{
  "@tiptap/extension-table": "^2.1.13",
  "@tiptap/extension-table-row": "^2.1.13",
  "@tiptap/extension-table-cell": "^2.1.13",
  "@tiptap/extension-table-header": "^2.1.13"
}
```

---

## 🧪 Testing Strategy

### Unit Tests
- [ ] Line-height extension applies correctly
- [ ] Spacing extension calculates margins properly
- [ ] HTML export includes inline styles
- [ ] Sanitization removes empty tags

### Integration Tests
- [ ] Editor → Preview consistency
- [ ] Preview → Published consistency
- [ ] Save → Load → Edit workflow
- [ ] Multiple spacing types in one post

### E2E Tests
- [ ] Create post with various spacing
- [ ] Publish and verify formatting
- [ ] Edit existing post and republish
- [ ] View on mobile devices
- [ ] Test in dark mode

### Manual Testing Checklist
- [ ] Single-spaced list (1.0x)
- [ ] 1.5x spaced list
- [ ] Double-spaced paragraphs (2.0x)
- [ ] Mixed spacing in one post
- [ ] Nested lists with spacing
- [ ] Long-form content (2000+ words)
- [ ] Mobile responsive
- [ ] Dark mode rendering
- [ ] Copy/paste preserves formatting
- [ ] Undo/redo spacing changes

---

## 🎯 Acceptance Criteria (Epic Level)

### Must Have (MVP)
- [x] Tailwind Typography plugin installed and configured
- [ ] Line-height controls (1.0x, 1.15x, 1.5x, 2.0x)
- [ ] List spacing preserved in published posts
- [ ] Paragraph spacing preserved in published posts
- [ ] Editor preview matches published output 100%
- [ ] Numbered lists maintain formatting
- [ ] Bullet lists maintain formatting
- [ ] Dark mode support

### Should Have
- [ ] Paragraph spacing controls (before/after)
- [ ] Font size controls
- [ ] H4-H6 heading levels
- [ ] Underline support
- [ ] Indentation controls
- [ ] Unified CSS system
- [ ] HTML sanitization

### Nice to Have
- [ ] Horizontal rule support
- [ ] Table support
- [ ] Format painter
- [ ] Spacing visual indicators
- [ ] Block spacing panel
- [ ] Organized toolbar groups

---

## 📈 Success Metrics

### Performance Metrics
- Editor load time: < 500ms
- Save operation: < 1s
- Publish operation: < 2s
- Zero layout shift during editing

### Quality Metrics
- 100% spacing consistency across views
- Zero formatting loss on publish
- Zero regression bugs in existing posts
- 100% test coverage for new extensions

### User Experience Metrics
- Reduced editing time by 30%
- Reduced support tickets about formatting issues
- Improved content quality scores
- Positive user feedback on spacing controls

---

## 🚀 Deployment Plan

### Phase 1: Feature Flag Rollout
1. Deploy behind feature flag
2. Test with internal team
3. Fix any critical bugs
4. Enable for beta users

### Phase 2: Gradual Rollout
1. Enable for 10% of users
2. Monitor error rates and performance
3. Scale to 50% of users
4. Full rollout to 100%

### Phase 3: Migration
1. No migration needed for existing posts
2. New spacing features optional
3. Existing posts continue to render correctly
4. Content creators can update old posts with new spacing controls

---

## 📝 Documentation Requirements

### Developer Documentation
- [ ] Extension architecture explained
- [ ] Custom Tiptap extensions documented
- [ ] CSS system documented
- [ ] HTML export format documented

### User Documentation
- [ ] How to use line-height controls
- [ ] How to adjust list spacing
- [ ] How to control paragraph spacing
- [ ] How to use font size controls
- [ ] Best practices for blog formatting

### Internal Documentation
- [ ] Testing procedures
- [ ] Rollback procedures
- [ ] Monitoring and alerts
- [ ] Performance benchmarks

---

## ⚠️ Risks & Mitigation

### Risk 1: Existing Posts Break
**Probability:** Medium  
**Impact:** High  
**Mitigation:**
- Extensive testing with existing posts
- Feature flag for gradual rollout
- Keep old CSS classes for backward compatibility

### Risk 2: Performance Degradation
**Probability:** Low  
**Impact:** Medium  
**Mitigation:**
- Performance testing before deployment
- Monitor load times and render times
- Optimize heavy operations

### Risk 3: Browser Compatibility Issues
**Probability:** Medium  
**Impact:** Medium  
**Mitigation:**
- Test on all major browsers
- Provide fallbacks for older browsers
- Use progressive enhancement

### Risk 4: Complex UI Confuses Users
**Probability:** Medium  
**Impact:** Low  
**Mitigation:**
- User testing before launch
- Comprehensive tooltips
- Default to sensible spacing values
- Provide documentation and examples

---

## 📞 Stakeholders

**Product Owner:** Development Team  
**Engineering Lead:** TBD  
**QA Lead:** TBD  
**UX Designer:** TBD  
**Content Team:** Key users for feedback

---

## 🔄 Definition of Done

A story is considered "Done" when:
- [ ] Code implemented and reviewed
- [ ] Unit tests written and passing
- [ ] Integration tests passing
- [ ] Manual testing completed
- [ ] Documentation updated
- [ ] No critical bugs
- [ ] Performance benchmarks met
- [ ] Accessibility requirements met
- [ ] Product owner approval
- [ ] Deployed to staging
- [ ] Ready for production release

---

## 🏁 Sprint Status

**Current Status:** ✅ All Critical Features Complete

- **Sprint 1 (Completed)**: Foundation & Critical Fixes - ✅ DONE
  - Tailwind Typography plugin installed
  - LineHeight extension created
  - List and paragraph spacing fixed
  - All views synchronized with `.blog-content` class

- **Sprint 2 (Completed)**: Advanced Spacing & Typography Features - ✅ DONE
  - Spacing extension created (None, Small, Medium, Large)
  - Font size controls (Small, Normal, Large, XL)
  - H4-H6 heading levels added
  - Underline, horizontal rule, table support added
  - Indentation controls implemented

- **Sprint 3 (Completed)**: Enhanced CSS & Export - ✅ DONE
  - HTML sanitization utility created
  - BlogContentRenderer component for consistent rendering
  - HTML export preserves all formatting
  - Validation warnings for SEO issues

- **Sprint 4**: UX Improvements - COMPLETED
  - Visual spacing indicators with color-coded feedback
  - Format painter tool for copying formatting
  - Advanced spacing panel with direct controls
  - Reorganized toolbar with logical grouping and keyboard shortcuts
  - Enhanced professional editing experience

---

## 📅 Timeline Summary

| Sprint | Duration | Stories | Story Points | Goal |
|--------|----------|---------|--------------|------|
| Sprint 1 | 2 weeks | 4 | 21 | Foundation & Critical Fixes |
| Sprint 2 | 2 weeks | 6 | 18 | Advanced Controls & Typography |
| Sprint 3 | 2 weeks | 8 | 21 | Polish & Quality |
| Sprint 4 | 2 weeks | 4 | 13 | UX Enhancements |
| **Total** | **8 weeks** | **22** | **73** | **Complete Enhancement** |

**Target Completion:** End of Sprint 4 (8 weeks) - ALL SPRINTS COMPLETED  
**Full Feature Set:** ACHIEVED

---

*Document created: 2025-10-30*  
*Last updated: 2025-11-02*  
*Version: 3.0 - All Sprints Complete*