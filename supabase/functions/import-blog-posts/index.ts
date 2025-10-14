import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400",
};

const BLOG_POSTS = [
  {
    slug: "botswana-driving-guide-2024",
    title: "Complete Guide to Driving in Botswana: What You Need to Know",
    excerpt: "Essential tips for safe driving in Botswana, including wildlife encounters, road conditions, and local regulations.",
    author_name: "MobiRides Team",
    author_email: "team@mobirides.com",
    category: "Travel Guides",
    tags: ["driving", "botswana", "safety", "wildlife"],
    published_at: "2024-01-15T10:00:00Z",
    featured_image_asset: "/src/assets/botswana-safari.jpg",
    image_file_name: "botswana-driving-guide.jpg",
  },
  {
    slug: "car-rental-business-botswana",
    title: "The Future of Car Rental Business in Botswana",
    excerpt: "How technology is transforming the car rental industry in Botswana and creating new opportunities for entrepreneurs.",
    author_name: "Business Development Team",
    author_email: "business@mobirides.com",
    category: "Business Insights",
    tags: ["business", "technology", "entrepreneurship"],
    published_at: "2024-01-10T10:00:00Z",
    featured_image_asset: "/src/assets/gaborone-business.jpg",
    image_file_name: "car-rental-business.jpg",
  },
  {
    slug: "best-vehicles-botswana-roads",
    title: "Best Vehicles for Botswana's Diverse Road Conditions",
    excerpt: "From city streets to safari trails, discover which vehicles perform best on Botswana's varied terrain.",
    author_name: "Vehicle Experts",
    author_email: "experts@mobirides.com",
    category: "Vehicle Reviews",
    tags: ["vehicles", "reviews", "off-road", "recommendations"],
    published_at: "2024-01-05T10:00:00Z",
    featured_image_asset: "/src/assets/pickup-truck.jpg",
    image_file_name: "best-vehicles-botswana.jpg",
  },
  {
    slug: "sustainable-mobility-botswana",
    title: "Building Sustainable Mobility Solutions in Botswana",
    excerpt: "How shared mobility platforms are contributing to environmental sustainability and economic growth in Botswana.",
    author_name: "Sustainability Team",
    author_email: "sustainability@mobirides.com",
    category: "Local News",
    tags: ["sustainability", "environment", "mobility", "botswana"],
    published_at: "2023-12-28T10:00:00Z",
    featured_image_asset: "/src/assets/find-your-drive.jpg",
    image_file_name: "sustainable-mobility.jpg",
  },
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting blog posts import...");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const results = [];

    for (const post of BLOG_POSTS) {
      console.log(`\n=== Processing: ${post.title} ===`);

      try {
        // Step 1: Generate article content
        console.log("Generating article content...");
        const generateResponse = await fetch(
          `${supabaseUrl}/functions/v1/generate-blog-article`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              topic: post.slug,
              title: post.title,
              excerpt: post.excerpt,
              category: post.category,
            }),
          }
        );

        if (!generateResponse.ok) {
          throw new Error(`Content generation failed: ${generateResponse.status}`);
        }

        const { content, readTime } = await generateResponse.json();
        console.log(`✓ Generated ${readTime} min article`);

        // Step 2: Fetch and upload featured image
        console.log("Fetching featured image...");
        
        // Map asset paths to Unsplash images as placeholders
        const imageMap: Record<string, string> = {
          "/src/assets/botswana-safari.jpg": "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&h=800&fit=crop",
          "/src/assets/gaborone-business.jpg": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop",
          "/src/assets/pickup-truck.jpg": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&h=800&fit=crop",
          "/src/assets/find-your-drive.jpg": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=800&fit=crop",
        };
        
        const imageUrl = imageMap[post.featured_image_asset];
        const imageResponse = await fetch(imageUrl);
        
        if (!imageResponse.ok) {
          throw new Error(`Image fetch failed: ${imageResponse.status}`);
        }
        
        const imageBlob = await imageResponse.blob();
        const imageBuffer = await imageBlob.arrayBuffer();
        const base64Data = btoa(String.fromCharCode(...new Uint8Array(imageBuffer)));
        
        console.log(`✓ Fetched image (${imageBuffer.byteLength} bytes)`);
        
        // Upload to storage
        console.log("Uploading to storage...");
        const uploadResponse = await fetch(
          `${supabaseUrl}/functions/v1/upload-blog-image`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              imageData: base64Data,
              fileName: post.image_file_name,
              contentType: imageBlob.type,
            }),
          }
        );

        if (!uploadResponse.ok) {
          const errorText = await uploadResponse.text();
          throw new Error(`Image upload failed: ${uploadResponse.status} - ${errorText}`);
        }

        const { publicUrl } = await uploadResponse.json();
        console.log(`✓ Image uploaded: ${publicUrl}`);

        // Step 3: Insert into database
        console.log("Inserting into database...");
        const { data, error } = await supabase.from("blog_posts").insert({
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          content: content,
          featured_image: publicUrl,
          author_name: post.author_name,
          author_email: post.author_email,
          author_bio: `Part of the ${post.author_name} at MobiRides, bringing you the latest insights about car rental and travel in Botswana.`,
          category: post.category,
          tags: post.tags,
          meta_description: post.excerpt,
          status: "published",
          published_at: post.published_at,
          read_time: readTime,
          view_count: 0,
        }).select();

        if (error) {
          console.error("Database error:", error);
          throw error;
        }

        console.log(`✓ Successfully imported: ${post.title}`);
        results.push({
          slug: post.slug,
          success: true,
          id: data[0].id,
        });

      } catch (error) {
        console.error(`✗ Failed to import ${post.title}:`, error);
        results.push({
          slug: post.slug,
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    const successCount = results.filter(r => r.success).length;
    console.log(`\n=== Import Complete: ${successCount}/${BLOG_POSTS.length} successful ===`);

    return new Response(
      JSON.stringify({ 
        success: true,
        imported: successCount,
        total: BLOG_POSTS.length,
        results 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Import process error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
