import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { SupabaseProvider } from './lib/supabase-provider';
import { AuthProvider, useAuth } from './lib/auth-provider';
import { Toaster } from './components/ui/toaster';
// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Subscriptions from './pages/Subscriptions';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import AppLayout from './components/layout/AppLayout';
// Protected route component
const ProtectedRoute = ({
  children
}) => {
  const {
    user,
    isLoading
  } = useAuth();
  if (isLoading) {
    return <div className="flex items-center justify-center w-full h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export function App() {
  return <Router>
      <SupabaseProvider>
        <AuthProvider>
          <ThemeProvider defaultTheme="system" storageKey="subscription-theme">
            <Routes>
              {/* Auth routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              {/* App routes */}
              <Route path="/" element={<ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>}>
                <Route index element={<Dashboard />} />
                <Route path="subscriptions" element={<Subscriptions />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </SupabaseProvider>
    </Router>;
}