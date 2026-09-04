import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

// `supabase` is null when env vars aren't set yet (e.g. local dev before
// credentials arrive). Every query function in lib/content.ts checks this
// and falls back to bundled placeholder content instead of crashing.
export const supabase = isSupabaseConfigured
  ? createClient(url!, anonKey!, {
      auth: { persistSession: false },
    })
  : null;
