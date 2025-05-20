import React, { useEffect, useState, createContext, useContext } from 'react';
import { useSupabase } from './supabase-provider';
const AuthContext = createContext(null);
// Demo user for development
const DEMO_USER = {
  id: '123456',
  email: 'demo@example.com',
  user_metadata: {
    name: 'Demo User',
    avatar_url: 'https://ui-avatars.com/api/?name=Demo+User&background=random'
  }
};
export function AuthProvider({
  children
}) {
  const supabase = useSupabase();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Check active session
    const checkUser = async () => {
      const {
        data: {
          session
        }
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setIsLoading(false);
      // Listen for auth changes
      const {
        data: {
          subscription
        }
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user || null);
      });
      return () => {
        subscription.unsubscribe();
      };
    };
    checkUser();
  }, [supabase]);
  const login = async (email, password) => {
    const {
      data,
      error
    } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    return data;
  };
  const register = async (email, password) => {
    const {
      data,
      error
    } = await supabase.auth.signUp({
      email,
      password
    });
    if (error) throw error;
    return data;
  };
  const loginWithGoogle = async () => {
    const {
      data,
      error
    } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    });
    if (error) throw error;
    return data;
  };
  const logout = async () => {
    setUser(null);
    const {
      error
    } = await supabase.auth.signOut();
    if (error) throw error;
  };
  const resetPassword = async email => {
    const {
      error
    } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  };
  // Demo login function for development
  const loginWithDemo = () => {
    setUser(DEMO_USER);
    return {
      user: DEMO_USER
    };
  };
  return <AuthContext.Provider value={{
    user,
    isLoading,
    login,
    register,
    loginWithGoogle,
    loginWithDemo,
    logout,
    resetPassword
  }}>
      {children}
    </AuthContext.Provider>;
}
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};