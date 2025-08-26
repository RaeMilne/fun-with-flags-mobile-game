import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// For frontend use - these should be safe to expose
const SUPABASE_URL = import.meta.env?.VITE_SUPABASE_URL || 'https://demo-project.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'demo-key';

export const createClient = (supabaseUrl?: string, supabaseKey?: string) => {
  const url = supabaseUrl || SUPABASE_URL;
  const key = supabaseKey || SUPABASE_ANON_KEY;
  
  if (!url || !key || url === 'https://demo-project.supabase.co' || key === 'demo-key') {
    console.warn('Using demo Supabase configuration. Please set proper environment variables.');
  }
  
  return createSupabaseClient(url, key);
};

// Singleton client for frontend use
export const supabase = createClient();