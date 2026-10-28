import { fileURLToPath } from 'node:url';
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
if (key && (!key.startsWith('sb_publishable_') || key.length < 25)) throw new Error('Only a Supabase publishable key is allowed.');
const endpoint = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (endpoint) {
  const u = new URL(endpoint);
  if (u.protocol !== 'https:' || u.username || u.password || u.search || u.hash || u.pathname !== '/') throw new Error('A plain HTTPS Supabase project URL is required.');
}
const origin = process.env.NEXT_PUBLIC_ADMIN_ORIGIN;
if (origin && (new URL(origin).protocol !== 'https:' || new URL(origin).origin !== origin)) throw new Error('Admin origin must be a plain HTTPS origin.');
const csp = "default-src 'self'; script-src 'self' 'unsafe-inline'" + (process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : "") + "; style-src 'self' 'unsafe-inline'; img-src 'self' https: blob:; connect-src 'self' https: wss:; font-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'";
export default {
  poweredByHeader: false,
  outputFileTracingRoot: fileURLToPath(new URL('.',import.meta.url)),
  experimental: { useTypeScriptCli: false },
  async headers() { return [{ source: '/:path*', headers: [
    { key: 'Content-Security-Policy', value: csp }, { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'no-referrer' }, { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  ] }]; },
};
