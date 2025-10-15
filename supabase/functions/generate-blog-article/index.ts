import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, Authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic, title, excerpt, category } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Generating article for:", title);

    // Create detailed prompt based on the topic
    const systemPrompt = `You are a professional travel and automotive content writer specializing in Botswana. 
Write comprehensive, engaging, and informative blog articles with proper HTML formatting.
Use semantic HTML tags: <h2>, <h3>, <p>, <ul>, <ol>, <li>, <strong>, <em>.
Include practical tips, local insights, and actionable advice.
Write in a friendly but professional tone.
Target audience: Travelers, business people, and car rental users in Botswana.`;

    let userPrompt = "";

    // Custom prompts for each article
    if (title.includes("Driving in Botswana")) {
      userPrompt = `Write a comprehensive 1200-1500 word article titled "${title}".

Key topics to cover:
- Introduction to driving in Botswana (unique aspects)
- Road conditions: tar roads vs gravel/sand tracks
- Wildlife safety and encounters on roads
- Fuel station locations and planning your route
- Essential documents (license, insurance, permits for visitors)
- Local driving laws and regulations specific to Botswana
- Best practices for different terrains (city, highway, bush)
- Emergency contacts and roadside assistance
- Seasonal considerations (rainy season driving)
- Tips for first-time visitors

Use proper HTML formatting with <h2> for main sections and <h3> for subsections.
Include practical examples and specific locations where relevant.`;
    } else if (title.includes("Car Rental Business")) {
      userPrompt = `Write a comprehensive 1000-1200 word article titled "${title}".

Key topics to cover:
- Current state of car rental market in Botswana
- Tourism growth driving demand for rental vehicles
- Technology transformation: mobile apps, digital payments, GPS tracking
- Peer-to-peer car sharing opportunities and benefits
- Revenue potential for individual car owners
- Platform economy and the sharing economy in Africa
- Regulatory landscape and licensing requirements
- Environmental sustainability through shared vehicles
- Future trends: electric vehicles, autonomous driving
- Success stories and case studies from Botswana

Use proper HTML formatting with <h2> for main sections and <h3> for subsections.
Include statistics and growth projections where appropriate.`;
    } else if (title.includes("Best Vehicles")) {
      userPrompt = `Write a comprehensive 900-1100 word article titled "${title}".

Key topics to cover:
- Overview of Botswana's diverse road conditions
- Vehicle categories: sedans, SUVs, 4x4s, pickup trucks
- Best vehicles for city driving in Gaborone and Francistown
- Recommended vehicles for safari and game drives
- Off-road capable vehicles for Okavango Delta and Kalahari
- Fuel efficiency vs capability trade-offs
- Popular rental models available in Botswana
- Seasonal considerations (wet vs dry season)
- Ground clearance and water crossing capabilities
- Budget considerations for different vehicle types

Use proper HTML formatting with <h2> for main sections and <h3> for subsections.
Include specific vehicle models and their pros/cons.`;
    } else if (title.includes("Sustainable Mobility")) {
      userPrompt = `Write a comprehensive 1000-1200 word article titled "${title}".

Key topics to cover:
- Introduction to sustainable mobility in African context
- Environmental impact of car sharing vs ownership
- Reducing carbon footprint through shared vehicles
- Economic benefits for local communities
- Integration with public transport systems
- Urban planning and mobility in Gaborone
- Technology enabling sustainable solutions
- Government policies supporting green transport
- Future mobility trends in Africa and Botswana
- Community impact and job creation
- Success metrics and environmental data

Use proper HTML formatting with <h2> for main sections and <h3> for subsections.
Include relevant environmental statistics and projections.`;
    } else {
      userPrompt = `Write a comprehensive article titled "${title}".
      
Excerpt for context: ${excerpt}
Category: ${category}

Create detailed, well-researched content of 1000-1500 words with proper HTML formatting.
Use <h2> for main sections and <h3> for subsections.`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    // Calculate read time (average 200 words per minute)
    const wordCount = generatedContent.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    console.log(`Generated article: ${wordCount} words, ${readTime} min read`);

    return new Response(
      JSON.stringify({ 
        content: generatedContent,
        readTime,
        wordCount 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error generating article:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
