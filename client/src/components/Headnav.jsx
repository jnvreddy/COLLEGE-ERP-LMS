import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function Headnav() {
  const { currentUser } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  if (!currentUser) {
    return null;
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  return (
    <nav className="bg-gray-200 fixed top-0 w-full z-10">
      <div className="relative h-14 flex items-center justify-between px-4">
        <div className="flex items-center">
          <button className="text-gray-700" onClick={toggleMenu} aria-label="Toggle navigation">
            <span className="material-icons">menu</span>
          </button>
          <Link className="text-xl font-bold px-3" to="/">College-ERP</Link>
        </div>
        <div className="flex items-center ">
          <form className="flex items-center">
            <input className="form-input rounded-full px-2 py-1 text-center" type="search" placeholder="Search" aria-label="Search" />
            <button type="submit" className="p-2">
              <span className="material-icons">S</span>
            </button>
          </form>
          <button className="text-gray-700 p-2">
            <span className="material-icons">notifications</span>
          </button>
          <div className="relative">
            <button onClick={toggleProfileMenu} className="flex items-center p-2">
              <img src={currentUser.profilePicture || "/default-profile.png"} alt="Profile" className="w-8 h-8 rounded-full" />
            </button>
            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
                <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link>
                <Link to="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Settings</Link>
                <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Offcanvas Menu */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="p-4 flex items-center justify-between">
          <h5 className="text-lg font-bold">Menu</h5>
          <button onClick={toggleMenu} className="text-gray-700">
            <span className="material-icons">close</span>
          </button>
        </div>
        <ul className="flex flex-col p-4 space-y-2">
          {currentUser.role === 'admin' && (
            <>
              <li>
                <Link className="nav-link" to="/admin" onClick={toggleMenu}>Home</Link>
              </li>
              <li>
                <Link className="nav-link" to="/admin/dashboard" onClick={toggleMenu}>Dashboard</Link>
              </li>
              <li>
                <Link className="nav-link" to="/admin/manageusers" onClick={toggleMenu}>Manage Users</Link>
              </li>
              <li>
                <Link className="nav-link" to="/admin/profile" onClick={toggleMenu}>Profile</Link>
              </li>
            </>
          )}
          {currentUser.role === 'faculty' && (
            <>
              <li>
                <Link className="nav-link" to="/faculty/courses" onClick={toggleMenu}>My Courses</Link>
              </li>
              <li>
                <Link className="nav-link" to="/faculty/schedule" onClick={toggleMenu}>Schedule</Link>
              </li>
              <li>
                <Link className="nav-link" to="/faculty/profile" onClick={toggleMenu}>Profile</Link>
              </li>
            </>
          )}
          {currentUser.role === 'student' && (
            <>
              <li>
                <Link className="nav-link" to="/student/courses" onClick={toggleMenu}>My Courses</Link>
              </li>
              <li>
                <Link className="nav-link" to="/student/schedule" onClick={toggleMenu}>Schedule</Link>
              </li>
              <li>
                <Link className="nav-link" to="/student/profile" onClick={toggleMenu}>Profile</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

 