import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthStore } from '../../store/authStore';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (!user.isVerified) {
    return <Navigate to={`/verify-email/${user.email}`} replace />;
  }

  return children;
};

export default ProtectedRoute;
