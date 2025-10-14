import { supabase } from './supabase';

/**
 * Check for scheduled posts that should be published now
 * This function should be called periodically (e.g., every minute)
 */
export async function processScheduledPosts(): Promise<{
  published: number;
  errors: string[];
}> {
  const now = new Date().toISOString();
  const errors: string[] = [];
  let published = 0;

  try {
    // Find posts scheduled to be published now or in the past
    const { data: scheduledPosts, error: fetchError } = await supabase
      .from('blog_posts')
      .select('id, title, scheduled_for')
      .eq('status', 'scheduled')
      .lte('scheduled_for', now);

    if (fetchError) {
      errors.push(`Failed to fetch scheduled posts: ${fetchError.message}`);
      return { published, errors };
    }

    if (!scheduledPosts || scheduledPosts.length === 0) {
      return { published, errors };
    }

    // Update each scheduled post to published
    for (const post of scheduledPosts) {
      try {
        const { error: updateError } = await supabase
          .from('blog_posts')
          .update({
            status: 'published',
            published_at: now,
            scheduled_for: null
          })
          .eq('id', post.id);

        if (updateError) {
          errors.push(`Failed to publish "${post.title}": ${updateError.message}`);
        } else {
          published++;
          console.log(`Published scheduled post: "${post.title}"`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        errors.push(`Error publishing "${post.title}": ${errorMessage}`);
      }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    errors.push(`Scheduler error: ${errorMessage}`);
  }

  return { published, errors };
}

/**
 * Validate that a scheduled date is in the future
 */
export function validateScheduledDate(scheduledFor: string): {
  valid: boolean;
  error?: string;
} {
  const scheduledDate = new Date(scheduledFor);
  const now = new Date();

  if (isNaN(scheduledDate.getTime())) {
    return { valid: false, error: 'Invalid date format' };
  }

  if (scheduledDate <= now) {
    return { valid: false, error: 'Scheduled date must be in the future' };
  }

  // Don't allow scheduling more than 1 year in advance
  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

  if (scheduledDate > oneYearFromNow) {
    return { valid: false, error: 'Cannot schedule more than 1 year in advance' };
  }

  return { valid: true };
}

/**
 * Get upcoming scheduled posts
 */
export async function getUpcomingScheduledPosts(limit: number = 10): Promise<{
  posts: Array<{
    id: string;
    title: string;
    scheduled_for: string;
    author_name: string;
  }>;
  error?: string;
}> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, scheduled_for, author_name')
      .eq('status', 'scheduled')
      .order('scheduled_for', { ascending: true })
      .limit(limit);

    if (error) {
      return { posts: [], error: error.message };
    }

    return { posts: data || [] };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { posts: [], error: errorMessage };
  }
}

/**
 * Cancel a scheduled post (convert back to draft)
 */
export async function cancelScheduledPost(postId: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const { error } = await supabase
      .from('blog_posts')
      .update({
        status: 'draft',
        scheduled_for: null
      })
      .eq('id', postId);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: errorMessage };
  }
}