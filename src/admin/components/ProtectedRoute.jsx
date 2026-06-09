import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, checkingAuth } = useAuth();

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white gap-3">
        <Loader2 size={36} className="animate-spin text-yellow-400" />
        <p className="text-sm text-slate-400 font-semibold tracking-wider uppercase animate-pulse">Validating Session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
