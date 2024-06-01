import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile';
import LoginForm from './pages/LoginForm';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<LoginForm />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
