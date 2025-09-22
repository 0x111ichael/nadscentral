import { useState, useEffect } from 'react';
import { useActiveAccount } from 'thirdweb/react';
import { supabase } from '@/integrations/supabase/client';

export interface UserProfile {
  id: string;
  wallet_address: string;
  username: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const account = useActiveAccount();

  const createOrGetProfile = async (walletAddress: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // First, try to get existing profile
      const { data: existing, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .ilike('wallet_address', walletAddress)
        .maybeSingle();

      if (fetchError) {
        throw fetchError;
      }

      if (existing) {
        setProfile(existing);
        return existing;
      }

      // Create new profile if doesn't exist
      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .insert([{
          wallet_address: walletAddress.toLowerCase(),
          username: null,
          avatar_url: null,
        }])
        .select()
        .single();

      if (createError) {
        throw createError;
      }

      setProfile(newProfile);
      return newProfile;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create profile';
      setError(message);
      console.error('Profile error:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Pick<UserProfile, 'username' | 'avatar_url'>>) => {
    if (!profile) return null;

    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', profile.id)
        .select()
        .single();

      if (error) throw error;
      
      setProfile(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update profile';
      setError(message);
      console.error('Update profile error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Auto-create profile when wallet connects
  useEffect(() => {
    if (account?.address) {
      createOrGetProfile(account.address);
    } else {
      setProfile(null);
      setError(null);
    }
  }, [account?.address]);

  return {
    profile,
    loading,
    error,
    createOrGetProfile,
    updateProfile,
  };
}