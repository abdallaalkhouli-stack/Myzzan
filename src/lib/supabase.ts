import { createClient } from '@supabase/supabase-js';

// Plug your credentials below or use environment variables
// SUPABASE_URL: The URL of your Supabase project (e.g., https://xyzcompany.supabase.co)
// SUPABASE_ANON_KEY: The public anon key for your Supabase project

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseUrl = rawUrl.startsWith('http') ? rawUrl : 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY_HERE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
