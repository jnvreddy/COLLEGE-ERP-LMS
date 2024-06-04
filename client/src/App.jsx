import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Headnav';
import PrivateRoute from './components/PrivateRoute';
import SignIn from './pages/SignIn';

export default function App() {
  return (
    <BrowserRouter>
      {/* header */}
      <Header />
      <Routes>
        <Route path='/sign-in' element={<SignIn />} />
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
