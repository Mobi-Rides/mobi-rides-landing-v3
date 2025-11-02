/**
 * HTML Sanitization and Formatting Utilities
 * Ensures blog content HTML is clean and properly formatted
 */

interface SanitizeOptions {
  preserveFormatting?: boolean;
  allowedTags?: string[];
  allowedAttributes?: string[];
}

const DEFAULT_ALLOWED_TAGS = [
  'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'code', 'pre',
  'table', 'thead', 'tbody', 'tr', 'th', 'td', 'hr', 'span', 'div'
];

const DEFAULT_ALLOWED_ATTRIBUTES = [
  'href', 'src', 'alt', 'title', 'class', 'style', 'target',
  'data-spacing', 'data-line-height'
];

/**
 * Sanitize HTML while preserving formatting attributes
 */
export function sanitizeHtml(html: string, options: SanitizeOptions = {}): string {
  const {
    preserveFormatting = true,
    allowedTags = DEFAULT_ALLOWED_TAGS,
    allowedAttributes = DEFAULT_ALLOWED_ATTRIBUTES,
  } = options;

  if (!html) return '';

  // Create a temporary DOM element to parse HTML
  const temp = document.createElement('div');
  temp.innerHTML = html;

  // Clean up the HTML
  cleanNode(temp, allowedTags, allowedAttributes);

  return temp.innerHTML;
}

/**
 * Recursively clean DOM nodes
 */
function cleanNode(
  node: HTMLElement,
  allowedTags: string[],
  allowedAttributes: string[]
): void {
  const children = Array.from(node.childNodes);

  children.forEach((child) => {
    if (child.nodeType === Node.ELEMENT_NODE) {
      const element = child as HTMLElement;
      const tagName = element.tagName.toLowerCase();

      // Remove disallowed tags
      if (!allowedTags.includes(tagName)) {
        element.remove();
        return;
      }

      // Remove disallowed attributes
      const attributes = Array.from(element.attributes);
      attributes.forEach((attr) => {
        if (!allowedAttributes.includes(attr.name)) {
          element.removeAttribute(attr.name);
        }
      });

      // Recursively clean children
      cleanNode(element, allowedTags, allowedAttributes);
    }
  });
}

/**
 * Preserve custom formatting attributes in HTML export
 * This ensures line-height, spacing, and font-size are maintained
 */
export function preserveFormattingAttributes(html: string): string {
  if (!html) return '';

  const temp = document.createElement('div');
  temp.innerHTML = html;

  // Ensure all formatting attributes are properly set
  const elements = temp.querySelectorAll('[style], [data-spacing]');
  elements.forEach((element) => {
    const el = element as HTMLElement;

    // Extract and normalize styles
    const styles: string[] = [];
    
    // Preserve line-height
    if (el.style.lineHeight) {
      styles.push(`line-height: ${el.style.lineHeight}`);
    }

    // Preserve font-size
    if (el.style.fontSize) {
      styles.push(`font-size: ${el.style.fontSize}`);
    }

    // Preserve spacing from data attributes
    const spacing = el.getAttribute('data-spacing');
    if (spacing) {
      const spacingMap: Record<string, string> = {
        none: '0',
        small: '0.5rem',
        medium: '1rem',
        large: '2rem',
      };
      if (spacingMap[spacing]) {
        styles.push(`margin-bottom: ${spacingMap[spacing]}`);
      }
    }

    // Apply consolidated styles
    if (styles.length > 0) {
      el.setAttribute('style', styles.join('; '));
    }
  });

  return temp.innerHTML;
}

/**
 * Clean up empty tags and normalize whitespace
 */
export function cleanupHtml(html: string): string {
  if (!html) return '';

  let cleaned = html;

  // Remove empty paragraphs
  cleaned = cleaned.replace(/<p><\/p>/g, '');
  cleaned = cleaned.replace(/<p>\s*<\/p>/g, '');

  // Remove empty spans
  cleaned = cleaned.replace(/<span><\/span>/g, '');
  cleaned = cleaned.replace(/<span>\s*<\/span>/g, '');

  // Normalize multiple line breaks
  cleaned = cleaned.replace(/(<br\s*\/?>){3,}/gi, '<br><br>');

  // Remove trailing whitespace in tags
  cleaned = cleaned.replace(/\s+>/g, '>');

  return cleaned;
}

/**
 * Export blog content HTML with all formatting preserved
 */
export function exportBlogHtml(html: string): string {
  if (!html) return '';

  // Step 1: Preserve formatting attributes
  let exported = preserveFormattingAttributes(html);

  // Step 2: Clean up unnecessary elements
  exported = cleanupHtml(exported);

  // Step 3: Sanitize while preserving formatting
  exported = sanitizeHtml(exported, { preserveFormatting: true });

  return exported;
}

/**
 * Validate blog content HTML structure
 */
export function validateBlogHtml(html: string): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!html || html.trim() === '') {
    errors.push('Content is empty');
    return { valid: false, errors, warnings };
  }

  const temp = document.createElement('div');
  temp.innerHTML = html;

  // Check for multiple H1 tags (SEO issue)
  const h1Count = temp.querySelectorAll('h1').length;
  if (h1Count > 1) {
    warnings.push(`Found ${h1Count} H1 tags. Consider using only one H1 per post for better SEO.`);
  }

  // Check for images without alt text
  const imagesWithoutAlt = temp.querySelectorAll('img:not([alt])');
  if (imagesWithoutAlt.length > 0) {
    warnings.push(`${imagesWithoutAlt.length} image(s) missing alt text`);
  }

  // Check for broken links (empty href)
  const emptyLinks = temp.querySelectorAll('a[href=""]');
  if (emptyLinks.length > 0) {
    errors.push(`${emptyLinks.length} link(s) with empty href attribute`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
