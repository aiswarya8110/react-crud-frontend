import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
const ProtectedRoute = ()=>{
    const { loggedIn } = useContext(UserContext);
    return loggedIn ? <Outlet /> : <Navigate to="login"/>
}

export default ProtectedRoute;