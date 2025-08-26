// Supabase configuration info for frontend
// These values will be provided at build time
export const projectId = import.meta.env?.VITE_SUPABASE_URL?.split('//')[1]?.split('.')[0] || 'demo-project';
export const publicAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'demo-key';