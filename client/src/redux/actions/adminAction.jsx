// src/redux/actions/adminActions.js
import axios from 'axios';

export const fetchUsers = () => async (dispatch) => {
  dispatch({ type: 'FETCH_USERS_START' });
  try {
    const res = await axios.get('/api/users');
    dispatch({ type: 'FETCH_USERS_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'FETCH_USERS_FAILURE', payload: error.message });
  }
};

export const updateUserRole = (userId, role) => async (dispatch) => {
  try {
    await axios.put(`/api/users/${userId}/role`, { role });
    dispatch(fetchUsers()); // Refresh the user list
  } catch (error) {
    console.error(error);
  }
};
