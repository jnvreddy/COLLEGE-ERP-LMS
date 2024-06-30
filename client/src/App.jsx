import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Headnav from './components/Headnav.jsx';
import AdminRoute from './components/AdminRoute';
import FacultyRoute from './components/FacultyRoute';
import StudentRoute from './components/StudentRoute';
import Login from './pages/Login.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import FacultyDashboard from './pages/faculty/FacultyDashboard.jsx';
import StudentDashboard from './pages/student/StudentDashboard.jsx';
import AdminProfile from './pages/admin/AdminProfile.jsx';
import FacultyProfile from './pages/faculty/FacultyProfile.jsx';
import StudentProfile from './pages/student/StudentProfile.jsx';
import AdminHome from './pages/admin/AdminHome.jsx';
import ManageUsers from './pages/admin/ManageUsers.jsx';
import FacultyHome from './pages/faculty/facultyHome.jsx';
import StudentHome from './pages/student/StudentHome.jsx';
import Attendance from './components/Attendance.jsx';

function MainApp() {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  // Define paths where Headnav should not be visible
  const noHeadnavPaths = ['/login', '/sign-up'];

  return (
    <>
      {!noHeadnavPaths.includes(location.pathname) && currentUser && <Headnav />}
      <Routes>
        <Route path="*" element={<Navigate to="/login" replace />} /> {/* Default route: redirect to Login on invalid paths */}
        <Route path="/login" element={<Login />} />
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminHome/>} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/manageusers" element={<ManageUsers />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
        </Route>
        <Route element={<FacultyRoute />}>
          <Route path="/faculty" element={<FacultyHome />} />
          <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
          <Route path="/faculty/attendance" element={<Attendance />} />
          <Route path="/faculty/profile" element={<FacultyProfile />} />
        </Route>
        <Route element={<StudentRoute />}>
          <Route path="/student" element={<StudentHome />} />
          <Route path="/studentdashboard" element={<StudentDashboard />} />
          <Route path="/student/profile" element={<StudentProfile />} />
        </Route>
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}
