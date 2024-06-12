// src/components/FacultyRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const FacultyRoute = () => {
  const isAuthenticated = true; // Replace this with actual authentication logic
  const isFaculty = true; // Replace this with actual role check logic

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!isFaculty) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default FacultyRoute;
