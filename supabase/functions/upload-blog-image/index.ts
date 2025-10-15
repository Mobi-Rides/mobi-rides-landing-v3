import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

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
    const { imageData, fileName, contentType = 'image/jpeg' } = await req.json();
    
    console.log("Uploading image:", fileName);

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Convert base64 to buffer if needed
    let imageBuffer: ArrayBuffer;
    if (typeof imageData === 'string' && imageData.startsWith('data:')) {
      // Handle base64 data URL
      const base64Data = imageData.split(',')[1];
      const binaryString = atob(base64Data);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      imageBuffer = bytes.buffer;
    } else if (typeof imageData === 'string') {
      // Handle base64 string without data URL prefix
      const binaryString = atob(imageData);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      imageBuffer = bytes.buffer;
    } else {
      // Assume it's already an ArrayBuffer
      imageBuffer = imageData;
    }

    console.log("Image buffer size:", imageBuffer.byteLength);

    // Upload to blog-images bucket
    const storagePath = `featured/${fileName}`;
    const { data, error } = await supabase.storage
      .from("blog-images")
      .upload(storagePath, imageBuffer, {
        contentType: contentType,
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
