-- Create blog_posts table for CMS
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  author_name VARCHAR(100) NOT NULL,
  author_email VARCHAR(255) NOT NULL,
  author_bio TEXT,
  author_image TEXT,
  category VARCHAR(100) NOT NULL,
  tags TEXT[] DEFAULT '{}',
  meta_description VARCHAR(160),
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
  published_at TIMESTAMPTZ,
  scheduled_for TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  read_time INTEGER DEFAULT 5,
  view_count INTEGER DEFAULT 0,
  social_image TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author_email ON blog_posts(author_email);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blog_posts_updated_at 
    BEFORE UPDATE ON blog_posts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to published posts
CREATE POLICY "Public can view published blog posts" ON blog_posts
    FOR SELECT USING (status = 'published' AND published_at <= NOW());

-- Create policies for authenticated admin users (adjust email domain as needed)
CREATE POLICY "Admins can manage all blog posts" ON blog_posts
    FOR ALL USING (
        auth.jwt() ->> 'email' LIKE '%@mobirides.com' OR
        auth.jwt() ->> 'email' = 'admin@mobirides.com'
    );

-- Insert sample blog posts (optional - you can remove this section)
INSERT INTO blog_posts (
    title, 
    slug, 
    excerpt, 
    content, 
    featured_image, 
    author_name, 
    author_email, 
    category, 
    tags, 
    meta_description, 
    status, 
    published_at,
    read_time
) VALUES 
(
    'The Ultimate Guide to Driving in Botswana',
    'ultimate-guide-driving-botswana',
    'Everything you need to know about road safety, wildlife encounters, and navigation in Botswana.',
    '<h2>Introduction</h2><p>Driving in Botswana offers unique experiences and challenges. This comprehensive guide will help you navigate safely through our beautiful country.</p><h2>Road Safety Basics</h2><p>Always maintain a safe following distance and be aware of wildlife crossings, especially during dawn and dusk hours.</p><h2>Wildlife Encounters</h2><p>Botswana is home to diverse wildlife. Here are essential tips for safe wildlife encounters while driving...</p>',
    '/assets/botswana-safari.jpg',
    'MobiRides Team',
    'admin@mobirides.com',
    'Travel Guide',
    ARRAY['driving', 'botswana', 'safety', 'wildlife'],
    'Complete guide to safe driving in Botswana with wildlife encounter tips and road safety advice.',
    'published',
    NOW(),
    8
),
(
    'Starting Your Car Rental Business in 2024',
    'starting-car-rental-business-2024',
    'A comprehensive guide to launching and scaling your car rental business with modern technology.',
    '<h2>Market Analysis</h2><p>The car rental industry in Botswana is experiencing significant growth, driven by increased tourism and business travel.</p><h2>Technology Integration</h2><p>Modern car rental businesses rely heavily on technology platforms for booking, fleet management, and customer service.</p><h2>Success Strategies</h2><p>Learn from successful car rental entrepreneurs and discover proven strategies for growth...</p>',
    '/assets/gaborone-business.jpg',
    'Business Team',
    'admin@mobirides.com',
    'Business',
    ARRAY['business', 'entrepreneurship', 'car rental', 'technology'],
    'Learn how to start and scale a successful car rental business in 2024 with proven strategies.',
    'published',
    NOW() - INTERVAL '2 days',
    12
),
(
    'Best Vehicles for Different Terrains in Botswana',
    'best-vehicles-different-terrains-botswana',
    'Choose the right vehicle for your journey - from city streets to Kalahari adventures.',
    '<h2>Urban Driving</h2><p>For city driving in Gaborone and Francistown, compact cars and sedans offer the best fuel efficiency and maneuverability.</p><h2>Safari Adventures</h2><p>When heading to the Okavango Delta or Chobe National Park, 4WD vehicles are essential for navigating rough terrain.</p><h2>Long Distance Travel</h2><p>For cross-country journeys, consider comfort, fuel capacity, and reliability...</p>',
    '/assets/pickup-truck.jpg',
    'Travel Expert',
    'admin@mobirides.com',
    'Vehicle Guide',
    ARRAY['vehicles', 'terrain', 'safari', 'travel'],
    'Discover the best vehicles for different terrains in Botswana, from city driving to safari adventures.',
    'draft',
    NULL,
    10
);

-- Grant necessary permissions
GRANT ALL ON blog_posts TO authenticated;
GRANT SELECT ON blog_posts TO anon;