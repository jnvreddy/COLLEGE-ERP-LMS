import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">Profile</h2>
        <p className="text-center text-gray-700 dark:text-gray-300 mb-4">Name: {user.name}</p>
        <p className="text-center text-gray-700 dark:text-gray-300 mb-4">Email: {user.email}</p>
        <div className="text-center">
          <button
            onClick={handleLogout}
            className="bg-blue-500 dark:bg-blue-600 text-white px-12 py-2 rounded-full hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:bg-blue-600 dark:focus:bg-blue-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
