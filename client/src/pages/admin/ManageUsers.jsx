import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageUsers = () => {
  const [studentData, setStudentData] = useState({});
  const [facultyData, setFacultyData] = useState({});
  const [deleteEmail, setDeleteEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [studentSuccess, setStudentSuccess] = useState(null);
  const [facultySuccess, setFacultySuccess] = useState(null);
  const navigate = useNavigate();

  const handleChangeStudent = (e) => {
    setStudentData({ ...studentData, [e.target.id]: e.target.value });
  };

  const handleChangeFaculty = (e) => {
    setFacultyData({ ...facultyData, [e.target.id]: e.target.value });
  };

  const handleChangeDeleteEmail = (e) => {
    setDeleteEmail(e.target.value);
  };



  const handleSubmitStudent = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setStudentSuccess(null); // Clear success message before request
      const res = await fetch('/api/admin/addStudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }
      setStudentSuccess('Student added successfully!'); // Set success message
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handleSubmitFaculty = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setFacultySuccess(null); 
      const res = await fetch('/api/admin/addFaculty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(facultyData),
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }
      setFacultySuccess('Faculty added successfully!');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };



  const handleDeleteUser = async (e, role) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/admin/delete-user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: deleteEmail, role }),
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }
      if (role === 'student') {
        setStudentSuccess('Student deleted successfully!');
      } else {
        setFacultySuccess('Faculty deleted successfully!');
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex space-x-12 items-center justify-center bg-gray-100 p-4 sm:p-6 md:p-8">

      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-10 mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 md:text-center">Add Student</h2>
        <form onSubmit={handleSubmitStudent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label htmlFor="studentFullName" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="studentFullName"
              placeholder="Enter full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-200"
              onChange={handleChangeStudent}
            />
          </div>
          <div className="relative">
            <label htmlFor="studentRegisterNumber" className="block text-sm font-medium text-gray-700">Register Number</label>
            <input
              type="text"
              id="studentRegisterNumber"
              placeholder="Enter register number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-200"
              onChange={handleChangeStudent}
            />
          </div>
          <div className="relative">
            <label htmlFor="studentPhoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              id="studentPhoneNumber"
              placeholder="Enter phone number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-200"
              onChange={handleChangeStudent}
            />
          </div>
          <div className="relative">
            <label htmlFor="studentEmail" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="studentEmail"
              placeholder="Enter email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-200"
              onChange={handleChangeStudent}
            />
          </div>
          <div className="relative">
            <label htmlFor="studentDepartment" className="block text-sm font-medium text-gray-700">Department</label>
            <input
              type="text"
              id="studentDepartment"
              placeholder="Enter department"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-200"
              onChange={handleChangeStudent}
            />
          </div>
          <div className="relative">
            <label htmlFor="studentYear" className="block text-sm font-medium text-gray-700">Year</label>
            <input
              type="text"
              id="studentYear"
              placeholder="Enter year"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-200"
              onChange={handleChangeStudent}
            />
          </div>
          <div className="relative">
            <label htmlFor="studentSemester" className="block text-sm font-medium text-gray-700">Semester</label>
            <input
              type="text"
              id="studentSemester"
              placeholder="Enter semester"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-200"
              onChange={handleChangeStudent}
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              placeholder="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-200"
              onChange={handleChangeStudent}
            />
          </div>
          <div className="col-span-full">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-full border-2 border-blue-600 hover:bg-blue-700 hover:border-blue-700 focus:outline-none focus:bg-blue-700 focus:border-blue-700 disabled:opacity-80 shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              {loading ? 'Loading...' : 'Add Student'}
            </button>
          </div>
        </form>
        {error && (
            <p className="text-red-600 text-center mt-4">{error}</p>
          )}
          {studentSuccess && (
            <p className="text-green-600 text-center mt-4">{studentSuccess}</p>
          )}
         <div className="relative mt-4">
          <label htmlFor="deleteStudentEmail" className="block text-sm font-medium text-gray-700">Delete Student by Email</label>
          <input
            type="email"
            id="deleteStudentEmail"
            placeholder="Enter email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-200"
            value={deleteEmail}
            onChange={handleChangeDeleteEmail}
          />
          <button
            onClick={(e) => handleDeleteUser(e, 'student')}
            disabled={loading}
            className="w-full py-3 bg-red-600 text-white rounded-full border-2 border-red-600 hover:bg-red-700 hover:border-red-700 focus:outline-none focus:bg-red-700 focus:border-red-700 disabled:opacity-80 shadow-md transition duration-300 ease-in-out transform hover:scale-105 mt-2"
          >
            {loading ? 'Loading...' : 'Delete Student'}
          </button>
        </div>
      </div>

      <div className="w-full max-w-md  bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 md:text-center">Add Faculty</h2>
        <form onSubmit={handleSubmitFaculty} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label htmlFor="facultyFullName" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="facultyFullName"
              placeholder="Enter full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-200"
              onChange={handleChangeFaculty}
            />
          </div>
          <div className="relative">
            <label htmlFor="facultyid" className="block text-sm font-medium text-gray-700">Faculty ID</label>
            <input
              type="text"
              id="facultyid"
              placeholder="Enter register number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-200"
              onChange={handleChangeFaculty}
            />
          </div>
          <div className="relative">
            <label htmlFor="facultyPhoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              id="facultyPhoneNumber"
              placeholder="Enter phone number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-200"
              onChange={handleChangeFaculty}
            />
          </div>
          <div className="relative">
            <label htmlFor="facultyEmail" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="facultyEmail"
              placeholder="Enter email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-200"
              onChange={handleChangeFaculty}
            />
          </div>
          <div className="relative">
            <label htmlFor="facultyDepartment" className="block text-sm font-medium text-gray-700">Department</label>
            <input
              type="text"
              id="facultyDepartment"
              placeholder="Enter department"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-200"
              onChange={handleChangeFaculty}
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              placeholder="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-200"
              onChange={handleChangeFaculty}
            />
          </div>
          <div className="col-span-full">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-full border-2 border-blue-600 hover:bg-blue-700 hover:border-blue-700 focus:outline-none focus:bg-blue-700 focus:border-blue-700 disabled:opacity-80 shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              {loading ? 'Loading...' : 'Add Faculty'}
            </button>
          </div>
        </form>
        {error && (
            <p className="text-red-600 text-center mt-4">{error}</p>
        )}
        {facultySuccess && (
            <p className="text-green-600 text-center mt-4">{facultySuccess}</p>
          )}
   <div className="relative mt-4">
          <label htmlFor="deleteFacultyEmail" className="block text-sm font-medium text-gray-700">Delete Faculty by Email</label>
          <input
            type="email"
            id="deleteFacultyEmail"
            placeholder="Enter email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-200"
            value={deleteEmail}
            onChange={handleChangeDeleteEmail}
          />
           <button
            onClick={(e) => handleDeleteUser(e, 'faculty')}
            disabled={loading}
            className="w-full py-3 bg-red-600 text-white rounded-full border-2 border-red-600 hover:bg-red-700 hover:border-red-700 focus:outline-none focus:bg-red-700 focus:border-red-700 disabled:opacity-80 shadow-md transition duration-300 ease-in-out transform hover:scale-105 mt-2"
          >
            {loading ? 'Loading...' : 'Delete Faculty'}
          </button>
        </div>
      </div>

    </div>
  );
};

export default ManageUsers;
