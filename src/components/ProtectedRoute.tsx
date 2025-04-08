
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { Loader2 } from 'lucide-react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-accent" />
      </div>
    );
  }
  
  if (!user) {
    // Save the attempted URL for redirecting after login
    return <Navigate to="/" state={{ from: location.pathname }} replace />;
  }
  
  return <>{children}</>;
}
