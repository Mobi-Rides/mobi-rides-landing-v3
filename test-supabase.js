import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://putjowciegpzdheideaf.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1dGpvd2NpZWdwemRoZWlkZWFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NTQ5MTQsImV4cCI6MjA1MDUzMDkxNH0.p3UPDQc4Y9r1BbMB4cPssPKNvoj5fbf9b9M40x6724o';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkBlogPosts() {
  try {
    console.log('Testing Supabase connection to blog_posts...');
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(5);

    if (error) {
      console.error('Supabase error:', error.message);
      process.exitCode = 1;
      return;
    }

    if (!data || data.length === 0) {
      console.log('No published blog posts found.');
    } else {
      console.log(`Found ${data.length} published blog posts.`);
      for (const post of data) {
        console.log(`- ${post.title} (slug: ${post.slug}, published_at: ${post.published_at})`);
      }
    }
  } catch (e) {
    console.error('Unexpected error:', e?.message || e);
    process.exitCode = 1;
  }
}

checkBlogPosts();