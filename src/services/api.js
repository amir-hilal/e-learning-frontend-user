import axios from 'axios';
import store from '../store';
import { logout } from '../store/authSlice';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Request interceptor for adding the token to headers
api.interceptors.request.use((config) => {
    const { token } = store.getState().auth;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor for handling 401 Unauthorized
api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response && error.response.status === 401) {
        store.dispatch(logout());
    }
    return Promise.reject(error);
});

export default api;
