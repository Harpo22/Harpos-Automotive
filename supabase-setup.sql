-- ============================================================
-- HARPO AUTOMOTIVES — SUPABASE DATABASE SETUP
-- ============================================================
-- Run this entire script in:
-- Supabase Dashboard → SQL Editor → New Query → Paste → Run
-- ============================================================

-- 1. Create the vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Basic details
  year INTEGER NOT NULL,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  trim TEXT,
  
  -- Pricing & mileage
  price NUMERIC NOT NULL,
  mileage INTEGER NOT NULL,
  
  -- Specs
  fuel TEXT DEFAULT 'Petrol',
  transmission TEXT DEFAULT 'Automatic',
  engine TEXT,
  power TEXT,
  color TEXT,
  doors INTEGER DEFAULT 4,
  seats INTEGER DEFAULT 5,
  body_type TEXT,
  
  -- Listing
  featured BOOLEAN DEFAULT FALSE,
  badge TEXT,
  
  -- Content
  description TEXT,
  features TEXT[],   -- Array of feature strings
  
  -- Images
  image TEXT,        -- Main image URL
  gallery TEXT[]     -- Array of image URLs
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

-- 3. Allow anyone to READ vehicles (public website)
CREATE POLICY "Public can view vehicles"
  ON vehicles FOR SELECT
  USING (true);

-- 4. Only logged-in admin can INSERT, UPDATE, DELETE
CREATE POLICY "Admin can insert vehicles"
  ON vehicles FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can update vehicles"
  ON vehicles FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Admin can delete vehicles"
  ON vehicles FOR DELETE
  TO authenticated
  USING (true);

-- 5. Auto-update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER vehicles_updated_at
  BEFORE UPDATE ON vehicles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- STORAGE SETUP (run this too)
-- ============================================================

-- Create the storage bucket for vehicle images
INSERT INTO storage.buckets (id, name, public)
VALUES ('vehicle-images', 'vehicle-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public to view images
CREATE POLICY "Public can view images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'vehicle-images');

-- Allow authenticated admin to upload images
CREATE POLICY "Admin can upload images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'vehicle-images');

-- Allow authenticated admin to delete images
CREATE POLICY "Admin can delete images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'vehicle-images');

-- ============================================================
-- DONE! Your database is ready.
-- ============================================================
