-- Supabase RLS Policy Relaxation for Development
-- This file contains SQL to make all user data public for SELECT/INSERT/UPDATE (no DELETE)
-- Remove or tighten these policies before production!

-- PROFILES TABLE
ALTER POLICY "Profiles are viewable by everyone" ON profiles USING (true);
ALTER POLICY "Users can insert their own profile" ON profiles WITH CHECK (true);
ALTER POLICY "Users can update their own profile" ON profiles USING (true);

-- USER_DAILY_STATS TABLE
ALTER POLICY "Users can view their own stats" ON user_daily_stats USING (true);
ALTER POLICY "Users can insert their own stats" ON user_daily_stats WITH CHECK (true);
ALTER POLICY "Users can update their own stats" ON user_daily_stats USING (true);

-- USER_QUEST_INTERACTIONS TABLE
ALTER POLICY "Users can view their own interactions" ON user_quest_interactions USING (true);
ALTER POLICY "Quest managers can view all interactions" ON user_quest_interactions USING (true);
ALTER POLICY "System can insert interactions" ON user_quest_interactions WITH CHECK (true);
-- (No UPDATE/DELETE policies for now)

-- NOTE: This makes all data public for SELECT/INSERT/UPDATE. For production, implement wallet-based or Supabase Auth-based RLS.
