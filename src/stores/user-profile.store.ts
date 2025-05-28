import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  existingConditions: string[];
  medications: string[];
  allergies: string[];
  familyHistory: Record<string, boolean>;
  healthGoals: string[];
  preferredContactMethod: string;
}

interface UserProfileState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  fetchProfile: (userId: string) => Promise<void>;
  updateProfile: (userId: string, data: Partial<UserProfile>) => Promise<void>;
}

export const useUserProfileStore = create<UserProfileState>((set) => ({
  profile: null,
  loading: false,
  error: null,
  fetchProfile: async (userId: string) => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      set({ profile: data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  updateProfile: async (userId: string, profileData: Partial<UserProfile>) => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase
        .from('user_profiles')
        .upsert({ id: userId, ...profileData })
        .eq('id', userId);

      if (error) throw error;
      set((state) => ({
        profile: state.profile ? { ...state.profile, ...profileData } : null,
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));