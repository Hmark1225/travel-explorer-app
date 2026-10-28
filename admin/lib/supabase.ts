import { createClient, type SupabaseClient } from '@supabase/supabase-js';
let browser: SupabaseClient | null = null;
export function settings() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key?.startsWith('sb_publishable_') || key.length<25) return null;
  try { const u = new URL(url); if (u.protocol!=='https:' || u.username || u.password || u.pathname!=='/' || u.search || u.hash || u.port) return null; } catch { return null; }
  return { url, key };
}
export function browserClient() {
  const config = settings();
  if (!config || typeof window === 'undefined') return null;
  browser ??= createClient(config.url,config.key,{ auth:{ storage:window.sessionStorage,persistSession:true,autoRefreshToken:true,detectSessionInUrl:false } });
  return browser;
}
export function publicClient() {
  const config = settings();
  return config ? createClient(config.url,config.key,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}}) : null;
}
