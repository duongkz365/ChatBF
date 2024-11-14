
// src/components/Logout.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom'; 
import { logoutProfileRequest } from '../../redux/profile/actions';

const Logout = () => {
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(logoutProfileRequest());
    }, [dispatch])
    return <Navigate to="/login" />; 
}
export default Logout;
