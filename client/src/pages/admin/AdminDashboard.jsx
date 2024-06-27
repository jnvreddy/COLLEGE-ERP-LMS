<<<<<<< HEAD
// src/pages/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, updateUserRole } from '../../redux/actions/adminAction'; // Assume these actions are defined
import UserList from '../admin/UserList'; // Create this component
import Statistics from '../admin/Statistics'; // Create this component

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.admin);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleRoleChange = () => {
    if (selectedUser && newRole) {
      dispatch(updateUserRole(selectedUser, newRole));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome, Admin!</p>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Statistics</h2>
        <Statistics />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-2">User Management</h2>
        {loading && <p>Loading users...</p>}
        {error && <p>Error fetching users: {error}</p>}
        {users && <UserList users={users} setSelectedUser={setSelectedUser} />}
      </div>

      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-2">Change User Role</h2>
        <select
          className="border p-2 rounded mb-2"
          onChange={(e) => setNewRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="admin">Admin</option>
        </select>
        <button
          className="bg-blue-500 text-white p-2 rounded ml-2"
          onClick={handleRoleChange}
        >
          Update Role
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
=======
// src/pages/faculty/FacultyDashboard.js
import React from 'react';

const FacultyDashboard = () => {
  return <div>Faculty Dashboard</div>;
};

export default FacultyDashboard;
>>>>>>> b57ab5b (admin home page and funcunality to add users by admin in progress)
