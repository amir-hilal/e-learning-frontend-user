import { createSlice } from '@reduxjs/toolkit';
import authService from '../services/authService';

const initialState = {
  token: localStorage.getItem('token') || null,
  isLoggedIn: !!localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user')) || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.user = action.payload.user;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    register(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.user = action.payload.user;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },
  },
});

export const { login, logout, register } = authSlice.actions;

export const registerUser = (userData) => async (dispatch) => {
  try {
    const data = await authService.register(userData);
    dispatch(register({ token: data.token, user: data.user }));
  } catch (error) {
    console.error('Registration failed:', error);
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch(logout());
};

export default authSlice.reducer;
