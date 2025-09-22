import { useState, useEffect } from 'react';
import { typedSupabase } from '@/integrations/supabase/typed-client';

export function useQuestCount() {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchCount = async () => {
      try {
        const { data } = await typedSupabase
          .from('user_quest_interactions')
          .select('id')
          .eq('status', 'available');

        if (isMounted) {
          setCount(data?.length ?? 0);
        }
      } catch (error) {
        console.error('Error fetching quest count:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCount();

    fetchCount();
    return () => { isMounted = false; };
  }, []);

  return { count, loading };
}