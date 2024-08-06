import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AuthGuard = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthGuard;
