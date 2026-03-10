
-- Create table for VIP quote requests
CREATE TABLE public.vip_quote_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service_type TEXT NOT NULL,
  event_date DATE,
  guests INTEGER,
  requirements TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.vip_quote_requests ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public form)
CREATE POLICY "Anyone can submit a quote request"
  ON public.vip_quote_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated admins should read (for now allow authenticated users to read)
CREATE POLICY "Authenticated users can view quote requests"
  ON public.vip_quote_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_vip_quote_requests_updated_at
  BEFORE UPDATE ON public.vip_quote_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
