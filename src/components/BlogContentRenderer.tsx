import React from 'react';
import { validateBlogHtml } from '@/lib/htmlSanitizer';

interface BlogContentRendererProps {
  content: string;
  className?: string;
}

/**
 * Renders blog content with proper styling and validation
 * Ensures consistent formatting across editor, preview, and published views
 */
export const BlogContentRenderer: React.FC<BlogContentRendererProps> = ({
  content,
  className = '',
}) => {
  // Validate content (optional, for development)
  if (import.meta.env.DEV) {
    const validation = validateBlogHtml(content);
    if (!validation.valid) {
      console.warn('Blog content validation errors:', validation.errors);
    }
    if (validation.warnings.length > 0) {
      console.warn('Blog content validation warnings:', validation.warnings);
    }
  }

  return (
    <div
      className={`blog-content ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
