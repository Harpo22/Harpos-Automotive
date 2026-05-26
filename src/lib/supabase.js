// ============================================================
// SUPABASE CONFIGURATION
// ============================================================
// After creating your Supabase project, replace the two values
// below with your actual Project URL and Anon Key.
// You'll find these in: Supabase Dashboard → Settings → API
// ============================================================

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ============================================================
// STORAGE BUCKET NAME — must match what you create in Supabase
// ============================================================
export const STORAGE_BUCKET = 'vehicle-images'
