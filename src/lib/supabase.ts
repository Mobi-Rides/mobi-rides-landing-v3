import { createClient } from '@supabase/supabase-js';

// Using working Supabase credentials from mobirides-app
const supabaseUrl = 'https://putjowciegpzdheideaf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1dGpvd2NpZWdwemRoZWlkZWFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NTQ5MTQsImV4cCI6MjA1MDUzMDkxNH0.p3UPDQc4Y9r1BbMB4cPssPKNvoj5fbf9b9M40x6724o';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types - matches main app's cars table structure
export interface Car {
  id: string; // UUID from database
  owner_id: string; // UUID from database
  brand: string;
  model: string;
  year: number;
  vehicle_type: string;
  price_per_day: number;
  location: string;
  latitude?: number | null;
  longitude?: number | null;
  transmission: string;
  fuel: string;
  seats: number;
  description: string | null;
  image_url: string | null;
  is_available: boolean;
  features: string[];
  created_at: string;
  updated_at: string;
}

// Blog post types for CMS
export interface BlogPost {
  id: string; // UUID from database
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Rich text content
  featured_image: string | null;
  author_name: string;
  author_email: string;
  author_bio: string | null;
  author_image: string | null;
  category: string;
  tags: string[];
  meta_description: string | null;
  status: 'draft' | 'published' | 'scheduled';
  published_at: string | null;
  scheduled_for: string | null;
  created_at: string;
  updated_at: string;
  read_time: number; // estimated read time in minutes
  view_count: number;
  social_image: string | null;
}