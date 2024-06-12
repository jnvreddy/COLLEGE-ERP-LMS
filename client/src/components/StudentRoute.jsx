// src/components/StudentRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const StudentRoute = () => {
  const isAuthenticated = true; // Replace this with actual authentication logic
  const isStudent = true; // Replace this with actual role check logic

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!isStudent) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default StudentRoute;
