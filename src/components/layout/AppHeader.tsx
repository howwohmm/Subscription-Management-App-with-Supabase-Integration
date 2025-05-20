import React from 'react';
import { useAuth } from '../../lib/auth-provider';
import { useTheme } from '../theme-provider';
import { Button } from '../ui/button';
import { Bell, Moon, Sun, ChevronDown } from 'lucide-react';
const AppHeader = () => {
  const {
    user,
    logout
  } = useAuth();
  const {
    theme,
    setTheme
  } = useTheme();
  return <header className="border-b border-border h-16 px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold hidden md:block">
          SubscriptionHub
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium">{user?.email}</p>
          </div>
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </header>;
};
export default AppHeader;