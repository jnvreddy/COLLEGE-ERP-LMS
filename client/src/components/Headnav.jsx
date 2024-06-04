import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function Headnav() {
  const { currentUser } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  if (!currentUser) {
    return null;
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-200 fixed top-0 w-full z-10">
      <div className="container mx-auto px-4 flex items-center justify-between py-3">
        <Link className="text-xl font-bold" to="/">College-ERP-LMS</Link>
        <button className="text-gray-700" onClick={toggleMenu} aria-label="Toggle navigation">
          <span className="material-icons">menu</span>
        </button>
      </div>
      {/* Offcanvas Menu */}
      <div className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="p-4 flex items-center justify-between">
          <h5 className="text-lg font-bold">Menu</h5>
          <button onClick={toggleMenu} className="text-gray-700">
            <span className="material-icons">close</span>
          </button>
        </div>
        <ul className="flex flex-col p-4 space-y-4">
          <li>
            <Link className="nav-link active" aria-current="page" to="/" onClick={toggleMenu}>Home</Link>
          </li>
          <li>
            <Link className="nav-link" to="/about" onClick={toggleMenu}>About</Link>
          </li>
          <li>
            <Link className="nav-link" to="/profile" onClick={toggleMenu}>Profile</Link>
          </li>
        </ul>
        <form className="flex mt-3 p-4">
          <input className="form-input w-full" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success ml-2" type="submit">Search</button>
        </form>
      </div>
    </nav>
  );
}
