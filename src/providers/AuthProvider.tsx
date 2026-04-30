/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { updateUserInfoCookie } from '@/server-actions/actions/auth/update-user-info';
import { useMeQuery } from '@/services/features/users/user.api';

import { useAuthStore, UserInfo } from '@/store/auth-store';
import { useEffect } from 'react';

interface AuthProviderProps {
  initialUser: UserInfo | null;
  children: React.ReactNode;
}

export function AuthProvider({ initialUser, children }: AuthProviderProps) {
  const { setUser, setHydrated } = useAuthStore();

  // Option A: Cookie থেকে instant hydration
  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    }
    setHydrated(true);
  }, []);

  return (
    <>
      <BackgroundSync />
      {children}
    </>
  );
}

function BackgroundSync() {
  const { user, setUser, isHydrated } = useAuthStore();

  const { data } = useMeQuery({ isHydrated });

  useEffect(() => {
    if (!data?.data) return;

    const freshUser = data.data;

    // Change detection — same হলে unnecessary update নেই
    const hasChanged = JSON.stringify(freshUser) !== JSON.stringify(user);

    if (hasChanged) {
      setUser(freshUser); // Zustand update
      updateUserInfoCookie(freshUser); // Cookie update (reload এও fresh থাকবে)
    }
  }, [data]);

  return null;
}
