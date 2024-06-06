// src/pages/admin/UserList.js
import React from 'react';

const UserList = ({ users, setSelectedUser }) => {
  return (
    <div>
      <ul className="list-disc pl-5">
        {users.map((user) => (
          <li key={user._id} className="mb-2">
            <span>{user.username} - {user.role}</span>
            <button
              className="ml-2 bg-green-500 text-white p-1 rounded"
              onClick={() => setSelectedUser(user._id)}
            >
              Select
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
