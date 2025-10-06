// /src/routes/ProtectedRoute.jsx
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  // Optional: Validate token format or expiration (basic check)
  const isValidToken = token && token.length > 20;

  useEffect(() => {
    if (!isValidToken) {
      console.warn('Access denied: No valid admin token found');
    }
  }, [isValidToken]);

  if (!isValidToken) {
    // Redirect to login, but remember where they tried to go
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;