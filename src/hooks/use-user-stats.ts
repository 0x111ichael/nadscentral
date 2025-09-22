import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useUserProfileContext } from '@/contexts/UserProfileContext';

export interface UserDailyStats {
  id: string;
  wallet_address: string;
  created_at: string;
  updated_at: string;
  daily_points: number;
  last_interaction_date: string | null;
  current_streak: number;
  longest_streak: number;
  current_points: number;
  total_earned: number;
  total_spent: number;
}

export function useUserStats() {
  const { profile } = useUserProfileContext();

  return useQuery<UserDailyStats | null>({
    queryKey: ['user-stats', profile?.wallet_address],
    queryFn: async () => {
      if (!profile?.wallet_address) return null;
      const { data, error } = await supabase
        .from('user_daily_stats')
        .select('*')
        .eq('wallet_address', profile.wallet_address)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!profile?.wallet_address,
  });
}
