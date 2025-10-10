-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true);

-- Set up RLS policies for the blog-images bucket
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'blog-images');

CREATE POLICY "Authenticated users can upload blog images" ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own blog images" ON storage.objects FOR UPDATE 
USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can delete their own blog images" ON storage.objects FOR DELETE 
USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

-- Optional: Create a more restrictive policy for admin-only uploads
-- Uncomment if you want only admins to upload images
/*
DROP POLICY "Authenticated users can upload blog images" ON storage.objects;

CREATE POLICY "Admin users can upload blog images" ON storage.objects FOR INSERT 
WITH CHECK (
  bucket_id = 'blog-images' 
  AND auth.role() = 'authenticated'
  AND (
    auth.jwt() ->> 'email' LIKE '%@mobirides.com'
    OR (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  )
);
*/