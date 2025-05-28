import { create } from 'zustand';
import type { User } from '@supabase/supabase-js';
import { authService } from '../services/api/auth.service';

interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  signIn: async (email: string, password: string) => {
    const { user, error } = await authService.signIn(email, password);
    if (error) throw new Error(error);
    set({ user });
  },
  signUp: async (email: string, password: string) => {
    const { user, error } = await authService.signUp(email, password);
    if (error) throw new Error(error);
    set({ user });
  },
  signOut: async () => {
    await authService.signOut();
    set({ user: null });
  },
  setUser: (user) => set({ user, loading: false }),
}));