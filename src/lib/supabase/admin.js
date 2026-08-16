import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Uses the service_role key, which bypasses Row Level Security entirely.
// Never import this outside a "use server" Server Action, and never call
// it without re-checking the caller's role first — RLS is not a backstop
// here the way it is for src/lib/supabase/server.js.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
