import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please click the "Connect to Supabase" button in the top right to set up Supabase.');
}

// Ensure URL is valid before creating client
try {
  new URL(supabaseUrl);
} catch (error) {
  throw new Error('Invalid Supabase URL. Please check your VITE_SUPABASE_URL environment variable.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

let isHealthCheckInProgress = false;
let lastHealthCheckTime = 0;
const HEALTH_CHECK_INTERVAL = 60000; // 1 minute

export async function checkSupabaseHealth(): Promise<boolean> {
  const now = Date.now();
  
  // Return cached result if health check was performed recently
  if (isHealthCheckInProgress || (now - lastHealthCheckTime < HEALTH_CHECK_INTERVAL)) {
    return true;
  }

  try {
    isHealthCheckInProgress = true;

    // Simple query to check database connection
    const { count, error: countError } = await supabase
      .from('newsletter_subscribers')
      .select('*', { count: 'exact' });

    if (countError) {
      console.warn('Supabase connection check failed:', countError.message);
      return false;
    }

    lastHealthCheckTime = now;
    return true;
  } catch (error) {
    console.warn('Supabase health check failed:', error);
    return false;
  } finally {
    isHealthCheckInProgress = false;
  }
}