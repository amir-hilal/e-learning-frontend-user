import { createSlice } from '@reduxjs/toolkit';
import api from '../services/api';

const initialState = {
  token: localStorage.getItem('token') || null,
  isLoggedIn: !!localStorage.getItem('token'),
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.user = action.payload.user;
      localStorage.setItem('username', action.payload.user.name);
      localStorage.setItem('token', action.payload.token);
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem('username');
      localStorage.removeItem('token');
    },
    register(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.user = action.payload.user;
      localStorage.setItem('token', action.payload.token);
    },
  },
});

export const { login, logout, register } = authSlice.actions;

export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await api.post('/auth/register', userData);
    dispatch(
      register({ token: response.data.token, user: response.data.user })
    );
  } catch (error) {
    console.error('Registration failed:', error);
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch(logout());
};

export default authSlice.reducer;
