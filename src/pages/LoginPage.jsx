import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login as loginAction } from '../store/authSlice';
import authService from '../services/authService';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await authService.login({ email, password });
            dispatch(loginAction({ token: data.token, user: data.user }));
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="flex justify-content-center align-items-center min-h-screen">
            <div className="surface-card p-4 shadow-2 border-round w-full md:w-6 lg:w-4">
                <h2 className="text-center">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="field mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="field mb-3">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 border-none surface-700 text-white border-round cursor-pointer"
                    >
                        Login
                    </button>
                    <div>
                        <p>Don't have an account? <span className='cursor-pointer' onClick={() => navigate('/register')}><u>Sign Up</u></span></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
