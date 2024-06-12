import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  clearError,
} from '../redux/user/userSlice';

export default function Login() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log('API Response:', data); // Log the API response
      if (res.ok) {
        if (data._id) { // Check for user identifier in the response
          dispatch(loginSuccess(data));
          const { role } = data;
          localStorage.setItem('userRole', role);

          if (role === 'admin') {
            navigate('/admin');
          } else if (role === 'faculty') {
            navigate('/faculty');
          } else if (role === 'student') {
            navigate('/student');
          } else {
            navigate('/'); // Default to home if role is unrecognized
          }
        } else {
          throw new Error("User data is missing in the response");
        }
      } else {
        dispatch(loginFailure(data));
        console.error("Login failed:", data);
      }
    } catch (error) {
      dispatch(loginFailure(error));
      console.error("An error occurred during login:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-10">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-200"
              onChange={handleChange}
            />
          </div>
          <div className="relative">
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-200"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gray-800 text-white rounded-full border-2 border-gray-800 hover:bg-gray-900 hover:border-gray-700 focus:outline-none focus:bg-gray-900 focus:border-gray-900 disabled:opacity-80 shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
          <Link to="/contact-us" className="text-gray-500 hover:underline mb-2 sm:mb-0">Contact Us</Link>
          <Link to="#" className="text-gray-500 hover:underline">Forgot password?</Link>
        </div>
        <div className="flex justify-center mt-5">
          <p className="mr-2">Don't have an account?</p>
          <Link to="/sign-up">
            <span className="text-blue-500">Sign up</span>
          </Link>
        </div>
        {error && (
          <p className="text-red-600 text-center mt-4">
            {error.message ? error.message : 'Something went wrong!'}
          </p>
        )}
      </div>
    </div>
  );
}
