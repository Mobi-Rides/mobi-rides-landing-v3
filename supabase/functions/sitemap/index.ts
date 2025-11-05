import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BlogPost {
  slug: string;
  updated_at: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the base URL from the request
    const url = new URL(req.url);
    const baseUrl = `${url.protocol}//${url.host}`;
    const today = new Date().toISOString().split('T')[0];

    // Static pages with their priorities and change frequencies
    const staticPages = [
      { url: '/', priority: '1.0', changefreq: 'daily' },
      { url: '/find-ride', priority: '0.9', changefreq: 'weekly' },
      { url: '/host', priority: '0.9', changefreq: 'weekly' },
      { url: '/blog', priority: '0.8', changefreq: 'daily' },
      { url: '/about', priority: '0.7', changefreq: 'monthly' },
      { url: '/safety', priority: '0.7', changefreq: 'monthly' },
      { url: '/careers', priority: '0.6', changefreq: 'weekly' },
      { url: '/press', priority: '0.6', changefreq: 'weekly' },
      { url: '/contact', priority: '0.8', changefreq: 'monthly' },
      { url: '/support', priority: '0.8', changefreq: 'monthly' },
      { url: '/privacy', priority: '0.4', changefreq: 'yearly' },
      { url: '/terms', priority: '0.4', changefreq: 'yearly' },
      { url: '/pricing', priority: '0.8', changefreq: 'monthly' },
      { url: '/host-requirements', priority: '0.7', changefreq: 'monthly' },
      { url: '/faq', priority: '0.7', changefreq: 'monthly' },
      { url: '/host-benefits', priority: '0.7', changefreq: 'monthly' },
      { url: '/host-dashboard', priority: '0.6', changefreq: 'monthly' },
      { url: '/host-support', priority: '0.7', changefreq: 'monthly' },
      { url: '/locations', priority: '0.8', changefreq: 'monthly' },
      { url: '/insurance', priority: '0.7', changefreq: 'monthly' },
      { url: '/host-protection', priority: '0.7', changefreq: 'monthly' },
      { url: '/host-community', priority: '0.6', changefreq: 'monthly' },
      { url: '/travel-guides', priority: '0.7', changefreq: 'weekly' },
      { url: '/business-solutions', priority: '0.8', changefreq: 'monthly' },
      { url: '/api-docs', priority: '0.5', changefreq: 'monthly' },
      { url: '/partners', priority: '0.7', changefreq: 'monthly' },
    ];

    // Fetch published blog posts
    let blogPosts: BlogPost[] = [];
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('slug, updated_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error fetching blog posts:', error);
      } else if (data) {
        blogPosts = data;
      }
    } catch (error) {
      console.error('Exception fetching blog posts:', error);
    }

    // Generate XML sitemap
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add static pages
    staticPages.forEach(page => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += '  </url>\n';
    });

    // Add blog posts
    blogPosts.forEach(post => {
      const lastmod = post.updated_at 
        ? new Date(post.updated_at).toISOString().split('T')[0] 
        : today;
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.6</priority>\n`;
      xml += '  </url>\n';
    });

    xml += '</urlset>';

    console.log(`Generated sitemap with ${staticPages.length} static pages and ${blogPosts.length} blog posts`);

    // Return XML with proper content type
    return new Response(xml, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate sitemap' }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
