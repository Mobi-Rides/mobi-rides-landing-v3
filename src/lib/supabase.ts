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