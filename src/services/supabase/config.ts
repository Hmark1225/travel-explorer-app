export interface PublicSupabaseEnvironment { source?: string; url?: string; publishableKey?: string }
export function supabaseSettings(env: PublicSupabaseEnvironment): { url: string; key: string } | null {
  if (env.source !== "supabase" || !env.url || !env.publishableKey?.startsWith("sb_publishable_") || env.publishableKey.length < 25) return null;
  try {
    const url = new URL(env.url);
    if (url.protocol !== "https:" || url.username || url.password || url.pathname !== "/" || url.search || url.hash || url.port) return null;
    return { url: url.origin, key: env.publishableKey };
  } catch { return null; }
}
