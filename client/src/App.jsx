// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile';
import Headnav from './components/Headnav';
import AdminRoute from './components/AdminRoute';
import Login from './pages/login';
import SignUp from './pages/SignUp';
import AdminDashboard from './pages/admin/AdminDashboard'; // Add your admin-specific page

export default function App() {
  return (
    <BrowserRouter>
      <Headnav />
      <Routes>
        <Route path='*' element={<Login />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<AdminRoute />}>
          <Route path='/' element={<AdminDashboard />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
