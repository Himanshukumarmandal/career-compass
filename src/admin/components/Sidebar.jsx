import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, KanbanSquare, BarChart3,
  MessageSquare, Settings, Image, LogOut, ChevronLeft,
  GraduationCap, X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const menuItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { path: '/admin/leads', icon: Users, label: 'Leads' },
  { path: '/admin/admissions', icon: KanbanSquare, label: 'Admissions' },
  { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/admin/contacts', icon: MessageSquare, label: 'Contact Requests' },
  { path: '/admin/banners', icon: Image, label: 'Banners' },
  { path: '/admin/settings', icon: Settings, label: 'Settings' },
];

const Sidebar = ({ isOpen, onClose, collapsed, onToggleCollapse }) => {
  const { logout } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed top-0 left-0 h-full z-50 admin-sidebar text-white flex flex-col
          transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static
          ${collapsed ? 'lg:w-20' : 'lg:w-64'}
          w-64
        `}
      >
        {/* Logo */}
        <div className={`flex items-center gap-3 p-5 border-b border-white/10 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center flex-shrink-0">
            <GraduationCap size={22} className="text-brandNavy" />
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="overflow-hidden"
            >
              <h1 className="font-bold text-sm leading-tight">Career Compass</h1>
              <p className="text-[10px] text-white/50">Admin Panel</p>
            </motion.div>
          )}

          {/* Close button (mobile) */}
          <button onClick={onClose} className="lg:hidden ml-auto p-1 rounded-lg hover:bg-white/10">
            <X size={18} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 py-4 px-3 admin-scroll overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${isActive
                      ? 'bg-white/15 text-yellow-400 shadow-lg shadow-black/10'
                      : 'text-white/70 hover:bg-white/8 hover:text-white'
                    }
                    ${collapsed ? 'justify-center' : ''}
                    `
                  }
                >
                  <item.icon size={20} className="flex-shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/10">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium
              text-red-300 hover:bg-red-500/15 hover:text-red-200 transition-all duration-200
              ${collapsed ? 'justify-center' : ''}`}
          >
            <LogOut size={20} className="flex-shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>

          {/* Collapse toggle (desktop only) */}
          <button
            onClick={onToggleCollapse}
            className={`hidden lg:flex items-center gap-3 w-full px-3 py-2 mt-1 rounded-xl text-xs
              text-white/40 hover:bg-white/5 hover:text-white/60 transition-all duration-200
              ${collapsed ? 'justify-center' : ''}`}
          >
            <ChevronLeft
              size={16}
              className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
            />
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
