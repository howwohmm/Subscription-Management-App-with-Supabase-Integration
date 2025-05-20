import React, { createContext, useContext } from 'react';
import { createClient } from '@supabase/supabase-js';
// Initialize Supabase client - in a real app, use environment variables
const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = 'your-supabase-anon-key';
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const SupabaseContext = createContext(null);
export function SupabaseProvider({
  children
}) {
  return <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>;
}
export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === null) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};