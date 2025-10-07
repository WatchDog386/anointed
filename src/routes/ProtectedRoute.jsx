// src/routes/ProtectedRoute.jsx
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  // Basic token validation: must exist and be reasonably long (JWTs are ~100+ chars)
  const isValidToken = token && token.length > 50;

  useEffect(() => {
    if (!isValidToken) {
      console.warn('Access denied: No valid admin token found');
    }
  }, [isValidToken]);

  if (!isValidToken) {
    // Redirect to login, preserving the attempted route
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;