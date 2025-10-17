import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const publicRoutes = ['/login', '/signup', '/resetpassword', '/onboarding', '/quizonboarding', '/paywall'];

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1C132F] to-[#0F0A1A] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  const isPublicRoute = publicRoutes.some(route => location.pathname.startsWith(route));

  if (!user && !isPublicRoute) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
