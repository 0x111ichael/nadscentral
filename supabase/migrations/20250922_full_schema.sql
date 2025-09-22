-- Nads Central: Full Supabase Schema Migration

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT NOT NULL UNIQUE,
  username TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_wallet_address_lower ON public.profiles (LOWER(wallet_address));
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (true);

-- 2. user_daily_stats Table
CREATE TABLE IF NOT EXISTS public.user_daily_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT NOT NULL,
  daily_points INTEGER NOT NULL DEFAULT 0,
  current_points INTEGER NOT NULL DEFAULT 0,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  total_earned INTEGER NOT NULL DEFAULT 0,
  total_spent INTEGER NOT NULL DEFAULT 0,
  last_interaction_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT fk_stats_wallet FOREIGN KEY(wallet_address) REFERENCES public.profiles(wallet_address) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_stats_wallet_address ON public.user_daily_stats (wallet_address);
ALTER TABLE public.user_daily_stats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Stats are viewable by everyone" ON public.user_daily_stats;
CREATE POLICY "Stats are viewable by everyone" ON public.user_daily_stats FOR SELECT USING (true);
DROP POLICY IF EXISTS "Users can insert their own stats" ON public.user_daily_stats;
CREATE POLICY "Users can insert their own stats" ON public.user_daily_stats FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Users can update their own stats" ON public.user_daily_stats;
CREATE POLICY "Users can update their own stats" ON public.user_daily_stats FOR UPDATE USING (true);

-- 3. user_quest_interactions Table
CREATE TABLE IF NOT EXISTS public.user_quest_interactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT NOT NULL,
  quest_id INTEGER NOT NULL,
  interaction_type TEXT NOT NULL,
  points_earned INTEGER NOT NULL DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  daily_points INTEGER NOT NULL DEFAULT 0,
  streak_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT fk_quest_wallet FOREIGN KEY(wallet_address) REFERENCES public.profiles(wallet_address) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_quest_wallet_address ON public.user_quest_interactions (wallet_address);
CREATE INDEX IF NOT EXISTS idx_quest_quest_id ON public.user_quest_interactions (quest_id);
ALTER TABLE public.user_quest_interactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Quest interactions are viewable by everyone" ON public.user_quest_interactions;
CREATE POLICY "Quest interactions are viewable by everyone" ON public.user_quest_interactions FOR SELECT USING (true);
DROP POLICY IF EXISTS "Users can insert their own quest interactions" ON public.user_quest_interactions;
CREATE POLICY "Users can insert their own quest interactions" ON public.user_quest_interactions FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Users can update their own quest interactions" ON public.user_quest_interactions;
CREATE POLICY "Users can update their own quest interactions" ON public.user_quest_interactions FOR UPDATE USING (true);

-- 4. Timestamp Triggers
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;


DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();


DROP TRIGGER IF EXISTS update_stats_updated_at ON public.user_daily_stats;
CREATE TRIGGER update_stats_updated_at
  BEFORE UPDATE ON public.user_daily_stats
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();


DROP TRIGGER IF EXISTS update_quest_interactions_updated_at ON public.user_quest_interactions;
CREATE TRIGGER update_quest_interactions_updated_at
  BEFORE UPDATE ON public.user_quest_interactions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- End of schema
