-- ==============================================================================
-- GameYard Database Schema for Supabase (Project: qkfdskufngkpdczxtalu)
-- Run this script in your Supabase Dashboard -> SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. PROFILES TABLE (Linked to Supabase Auth users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  email TEXT,
  avatar_url TEXT DEFAULT 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=150&q=80',
  level INTEGER DEFAULT 1,
  xp INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert and update their own profile" 
ON public.profiles FOR ALL USING (auth.uid() = id);

-- 2. TRIGGER TO AUTOMATICALLY CREATE PROFILE ON USER SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, username)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1))
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. GAMES TABLE (For storing game details, images, and hardware specs)
CREATE TABLE IF NOT EXISTS public.games (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  genre TEXT,
  release_year TEXT,
  developer TEXT,
  rating NUMERIC(2,1) DEFAULT 4.5,
  reviews_count TEXT DEFAULT '10k REVIEWS',
  hero_image TEXT,
  thumbnail TEXT,
  screenshots JSONB DEFAULT '[]'::jsonb,
  specs JSONB DEFAULT '{
    "minimum": {
      "os": "Windows 10 64-bit",
      "cpu": "Intel Core i5-4460 / AMD Ryzen 3 1200",
      "gpu": "NVIDIA GTX 970 / AMD RX 470 (4 GB)",
      "ram": "8 GB RAM",
      "storage": "110 GB available space"
    },
    "recommended": {
      "os": "Windows 10/11 64-bit",
      "cpu": "Intel Core i7-8700K / AMD Ryzen 5 3600X",
      "gpu": "NVIDIA RTX 2070 / AMD RX 6700 XT (8 GB)",
      "ram": "16 GB RAM",
      "storage": "110 GB NVMe SSD"
    }
  }'::jsonb,
  download_options JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on games
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Games are viewable by everyone" 
ON public.games FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert or update games" 
ON public.games FOR ALL TO authenticated USING (true);

-- 4. STORAGE BUCKET FOR GAME ASSETS (Images, covers, screenshots)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('game-assets', 'game-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies
CREATE POLICY "Public can view game assets" 
ON storage.objects FOR SELECT USING (bucket_id = 'game-assets');

CREATE POLICY "Authenticated users can upload game assets" 
ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'game-assets');
