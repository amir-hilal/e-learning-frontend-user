import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../store/authSlice';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        dispatch(registerUser({ name, email, password, role: 'user' }));
        navigate('/dashboard');
    };

    return (
        <div className="flex justify-content-center align-items-center min-h-screen">
            <div className="surface-card p-4 shadow-2 border-round w-full md:w-6 lg:w-4">
                <h2 className="text-center">Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="field mb-3">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
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
            <div> <p>Already have an account? <span className='cursor-pointer' onClick={()=>navigate('/login')} ><u>Log In</u></span></p></div>

                    <button
                        type="submit"
                        className="w-full p-3 border-none surface-700 text-white border-round cursor-pointer"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
