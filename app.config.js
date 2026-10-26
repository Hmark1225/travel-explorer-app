// Runs before Expo start/export. All EXPO_PUBLIC values enter the mobile bundle.
// Fail closed on accidental secret-key configuration; never include the value in an error.
module.exports = ({ config }) => {
  const key = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (key && (!key.startsWith("sb_publishable_") || key.length < 25)) {
    throw new Error("Use a Supabase publishable key only. Secret and legacy JWT keys must not enter Expo public environment variables.");
  }
  const endpoint = process.env.EXPO_PUBLIC_SUPABASE_URL;
  if (endpoint) {
    let parsed;
    try { parsed = new URL(endpoint); } catch { throw new Error("Invalid public Supabase URL."); }
    if (parsed.protocol !== "https:" || parsed.username || parsed.password || parsed.search || parsed.hash || parsed.pathname !== "/" || parsed.port) {
      throw new Error("Use a plain HTTPS project URL without credentials or query parameters.");
    }
  }
  return config;
};
