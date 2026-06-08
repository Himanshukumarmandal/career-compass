import React from 'react';
import { Menu, Moon, Sun, Bell, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const TopNavbar = ({ onMenuToggle }) => {
  const { admin } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <header className="admin-topbar sticky top-0 z-30 border-b admin-border px-4 lg:px-6 h-16 flex items-center justify-between">
      {/* Left — Hamburger + Page title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          <Menu size={22} className="admin-text" />
        </button>
        <div className="hidden sm:block">
          <p className="text-xs admin-text-muted">Welcome back,</p>
          <p className="text-sm font-semibold admin-text">{admin?.name || 'Admin'}</p>
        </div>
      </div>

      {/* Right — Actions */}
      <div className="flex items-center gap-2">
        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? (
            <Sun size={19} className="text-yellow-400" />
          ) : (
            <Moon size={19} className="admin-text-muted" />
          )}
        </button>

        {/* Notifications */}
        <button className="p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200 relative">
          <Bell size={19} className="admin-text-muted" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse-dot"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 ml-2 pl-3 border-l admin-border">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brandNavy to-brandNavy-light flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-semibold admin-text">{admin?.name || 'Admin'}</p>
            <p className="text-[10px] admin-text-muted">{admin?.email || ''}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
