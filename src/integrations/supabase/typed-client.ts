import { createClient } from '@supabase/supabase-js';

// Simple database schema types
interface Tables {
  user_quest_interactions: {
    id: string;
    status: string;
  };
}

// Create typed Supabase client
export const typedSupabase = createClient<Tables>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    }
  }
);