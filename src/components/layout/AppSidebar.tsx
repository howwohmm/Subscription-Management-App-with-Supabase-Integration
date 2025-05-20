import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CreditCard, BarChart, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../lib/auth-provider';
import { cn } from '../../lib/utils';
const AppSidebar = () => {
  const {
    logout
  } = useAuth();
  const navItems = [{
    to: '/',
    icon: <Home className="w-5 h-5" />,
    label: 'Dashboard'
  }, {
    to: '/subscriptions',
    icon: <CreditCard className="w-5 h-5" />,
    label: 'Subscriptions'
  }, {
    to: '/analytics',
    icon: <BarChart className="w-5 h-5" />,
    label: 'Analytics'
  }, {
    to: '/settings',
    icon: <Settings className="w-5 h-5" />,
    label: 'Settings'
  }];
  return <aside className="w-16 md:w-64 border-r border-border flex flex-col">
      <div className="h-16 border-b border-border flex items-center justify-center md:justify-start md:px-6">
        <span className="text-xl font-bold hidden md:block">SubTrack</span>
        <span className="text-xl font-bold md:hidden">ST</span>
      </div>
      <nav className="flex-1 py-6">
        <ul className="space-y-1 px-2">
          {navItems.map(item => <li key={item.to}>
              <NavLink to={item.to} className={({
            isActive
          }) => cn('flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors', isActive && 'bg-accent text-foreground')}>
                {item.icon}
                <span className="hidden md:block">{item.label}</span>
              </NavLink>
            </li>)}
        </ul>
      </nav>
      <div className="p-4 mt-auto">
        <button onClick={() => logout()} className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="hidden md:block">Logout</span>
        </button>
      </div>
    </aside>;
};
export default AppSidebar;