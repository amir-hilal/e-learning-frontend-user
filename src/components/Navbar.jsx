import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../store/authSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const username = localStorage.getItem('username')

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
    };
    return (
        <div className="flex justify-content-between align-items-center p-3 surface-overlay">
            <div className="text-xl font-bold">
                {username ? `Welcome, ${username}` : 'E-Learning'}
            </div>
            <button
                onClick={handleLogout}
                className="p-2 border-none surface-700 text-white border-round cursor-pointer"
            >
                Logout
            </button>
        </div>
    );
};

export default Navbar;
