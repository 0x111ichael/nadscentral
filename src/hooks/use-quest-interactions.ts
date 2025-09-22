import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useUserProfileContext } from '@/contexts/UserProfileContext';

export interface UserQuestInteraction {
  id: string;
  wallet_address: string;
  created_at: string;
  updated_at: string;
  quest_id: number;
  interaction_type: string;
  points_earned: number;
  completed_at: string;
  daily_points: number;
  streak_count: number;
}

export function useQuestInteractions() {
  const { profile } = useUserProfileContext();

  return useQuery<UserQuestInteraction[]>({
    queryKey: ['quest-interactions', profile?.wallet_address],
    queryFn: async () => {
      if (!profile?.wallet_address) return [];
      const { data, error } = await supabase
        .from('user_quest_interactions')
        .select('*')
        .eq('wallet_address', profile.wallet_address)
        .order('completed_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!profile?.wallet_address,
  });
}
