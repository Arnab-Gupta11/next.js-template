/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { create } from 'zustand';

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  [key: string]: any;
}

interface AuthState {
  user: UserInfo | null;
  isHydrated: boolean;
  setUser: (user: UserInfo | null) => void;
  setHydrated: (value: boolean) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isHydrated: false,
  setUser: (user) => set({ user }),
  setHydrated: (value) => set({ isHydrated: value }),
  clearUser: () => set({ user: null, isHydrated: false }),
}));
