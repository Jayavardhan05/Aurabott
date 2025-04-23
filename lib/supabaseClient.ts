import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test function to verify Supabase connection
export async function testSupabaseConnection() {
  const { data, error } = await supabase.from('User').select('*').limit(1);
  if (error) {
    console.error('Supabase connection error:', error);
  } else {
    console.log('Supabase connection successful:', data);
  }
}
