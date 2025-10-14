import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imagePath, fileName } = await req.json();
    
    console.log("Uploading image:", fileName, "from:", imagePath);

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Read the image file from the assets directory
    // Note: In production, we'd fetch from the actual deployed asset URL
    const assetUrl = `${supabaseUrl.replace('.supabase.co', '.lovable.app')}${imagePath}`;
    
    console.log("Fetching image from:", assetUrl);
    
    const imageResponse = await fetch(assetUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.status}`);
    }

    const imageBlob = await imageResponse.blob();
    const imageBuffer = await imageBlob.arrayBuffer();

    // Upload to blog-images bucket
    const storagePath = `featured/${fileName}`;
    const { data, error } = await supabase.storage
      .from("blog-images")
      .upload(storagePath, imageBuffer, {
        contentType: imageBlob.type,
        upsert: true,
      });

    if (error) {
      console.error("Storage error:", error);
      throw error;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("blog-images")
      .getPublicUrl(storagePath);

    console.log("Image uploaded successfully:", urlData.publicUrl);

    return new Response(
      JSON.stringify({ 
        publicUrl: urlData.publicUrl,
        path: storagePath 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error uploading image:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
