import { supabase } from '../../lib/supabase';
import type { User } from '@supabase/supabase-js';

export interface AuthResponse {
  user: User | null;
  error?: string;
}

class AuthService {
  async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      return { user: data.user };
    } catch (error) {
      console.error('Sign in error:', error);
      return { 
        user: null, 
        error: error instanceof Error ? error.message : 'Failed to sign in' 
      };
    }
  }

  async signUp(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      return { user: data.user };
    } catch (error) {
      console.error('Sign up error:', error);
      return { 
        user: null, 
        error: error instanceof Error ? error.message : 'Failed to sign up' 
      };
    }
  }

  async signOut(): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return session?.user ?? null;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange((_event, session) => {
      callback(session?.user ?? null);
    });
  }
}

const authService = new AuthService();
export { authService };