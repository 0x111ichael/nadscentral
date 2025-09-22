import { createContext, useContext, ReactNode } from 'react';
import { useUserProfile, UserProfile } from '@/hooks/use-user-profile';

interface UserProfileContextType {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  updateProfile: (updates: Partial<Pick<UserProfile, 'username' | 'avatar_url'>>) => Promise<UserProfile | null | undefined>;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const { profile, loading, error, updateProfile } = useUserProfile();

  return (
    <UserProfileContext.Provider value={{ profile, loading, error, updateProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfileContext() {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfileContext must be used within a UserProfileProvider');
  }
  return context;
}