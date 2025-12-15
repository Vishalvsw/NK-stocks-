import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useApp();
  
  if (!user) {
    // If not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};