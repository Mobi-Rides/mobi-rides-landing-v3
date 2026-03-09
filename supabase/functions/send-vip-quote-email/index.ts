import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const RECIPIENT_EMAIL = "hello@mobirides.africa";

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, serviceType, eventDate, guests, requirements } = await req.json();

    // Build email body
    const emailBody = `
New VIP Quote Request

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Service Type: ${serviceType}
Date Required: ${eventDate || 'Not specified'}
Number of Guests: ${guests || 'Not specified'}
Special Requirements: ${requirements || 'None'}

---
Submitted via MobiRides VIP Services page
    `.trim();

    // Use Supabase's built-in email via the admin client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    // Send email using a simple fetch to a mail endpoint
    // For now, log the request - email sending requires an email provider setup
    console.log(`VIP Quote Request from ${name} (${email})`);
    console.log(`Service: ${serviceType}`);
    console.log(`To be sent to: ${RECIPIENT_EMAIL}`);
    console.log(emailBody);

    // Store in database as well
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { error: dbError } = await supabase
      .from('vip_quote_requests')
      .insert({
        name,
        email,
        phone: phone || null,
        service_type: serviceType,
        event_date: eventDate || null,
        guests: guests ? parseInt(guests) : null,
        requirements: requirements || null,
      });

    if (dbError) {
      console.error('Database insert error:', dbError);
      throw new Error('Failed to save quote request');
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Quote request submitted successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
