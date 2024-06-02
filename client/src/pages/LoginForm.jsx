import React, { useState, useEffect } from 'react';

const LoginForm = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
        <div className="absolute top-4 right-4 flex items-center">
          <button
            onClick={toggleDarkMode}
            className={`w-14 h-8 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 duration-300 ease-in-out ${darkMode ? 'justify-end' : 'justify-start'}`}
          >
            <div className="w-6 h-6 bg-white dark:bg-gray-800 rounded-full shadow-md transform duration-300 ease-in-out"></div>
          </button>
        </div>
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">College</h1>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">Login</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring focus:ring-blue-200 dark:focus:ring-blue-700 focus:border-blue-400 dark:focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring focus:ring-blue-200 dark:focus:ring-blue-700 focus:border-blue-400 dark:focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-6 text-center">
              <a
                href="#"
                className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-500 focus:text-blue-600 dark:focus:text-blue-500 focus:outline-none"
              >
                Forgot password?
              </a>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 dark:bg-blue-600 text-white px-12 py-2 rounded-full hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:bg-blue-600 dark:focus:bg-blue-700"
              >
                Login
              </button>
            </div>
            <div className="mt-6 text-center">
              <a
                href="#"
                className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-500 focus:text-blue-600 dark:focus:text-blue-500 focus:outline-none"
              >
                Contact Us
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
