
/*import { useState, useEffect } from 'react';
>>>>>>> b57ab5b (admin home page and funcunality to add users by admin in progress)
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setError(null); // Clear error on component mount
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }
      navigate('/login');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-10">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              id="username"
              placeholder="Username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-200"
              onChange={handleChange}
            />
          </div>
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
          <div className="relative">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Choose Role:
            </label>
            <select
              id="role"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-200"
              onChange={handleChange}
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gray-800 text-white rounded-full border-2 border-gray-800 hover:bg-gray-900 hover:border-gray-700 focus:outline-none focus:bg-gray-900 focus:border-gray-900 disabled:opacity-80 shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
        </form>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
          <Link to="/contact-us" className="text-gray-500 hover:underline mb-2 sm:mb-0">Contact Us</Link>
          <Link to="#" className="text-gray-500 hover:underline">Forgot password?</Link>
        </div>
        <div className="flex justify-center mt-5">
          <p className="mr-2">Have an account?</p>
          <Link to="/login">
            <span className="text-blue-500">Sign in</span>
          </Link>
        </div>
        {error && (
          <p className="text-red-600 text-center mt-4">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}*/
