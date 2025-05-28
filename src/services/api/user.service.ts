import { supabase } from '../../lib/supabase';

interface StoredUser {
  firstName: string;
  lastName: string;
  email: string;
}

class UserService {
  getStoredUser(): StoredUser | null {
    const userData = localStorage.getItem('genieUser');
    return userData ? JSON.parse(userData) : null;
  }

  async getUser(email: string) {
    const { data, error } = await supabase
      .from('genie_users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      throw error;
    }

    return data;
  }
}

const userService = new UserService();
export default userService;