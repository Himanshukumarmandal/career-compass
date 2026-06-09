import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem('cc_token') || sessionStorage.getItem('cc_token') || null;
  });
  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem('cc_admin') || sessionStorage.getItem('cc_admin');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Validate token on app load
  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          const res = await api.get('/auth/verify');
          if (res.data.success) {
            setAdmin(res.data.admin);
          } else {
            logout();
          }
        } catch (err) {
          console.error('Session validation failed:', err.message);
          logout();
        }
      }
      setCheckingAuth(false);
    };
    validateToken();
  }, [token]);

  const login = async (email, password, rememberMe = false) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token: newToken, admin: adminData } = res.data;

      setToken(newToken);
      setAdmin(adminData);

      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('cc_token', newToken);
      storage.setItem('cc_admin', JSON.stringify(adminData));

      // Clear the other storage
      const otherStorage = rememberMe ? sessionStorage : localStorage;
      otherStorage.removeItem('cc_token');
      otherStorage.removeItem('cc_admin');

      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('cc_token');
    localStorage.removeItem('cc_admin');
    sessionStorage.removeItem('cc_token');
    sessionStorage.removeItem('cc_admin');
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, admin, login, logout, isAuthenticated, loading, checkingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
