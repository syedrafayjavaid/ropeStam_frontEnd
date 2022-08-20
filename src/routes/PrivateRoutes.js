import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import jwtDecode from 'jwt-decode';
const PrivateRoutes = () => {

    let validToken = true;

    // checking the token is valid or not
    if (window.localStorage.getItem('token')) {
        const jwtToken = window.localStorage.getItem('token');
        let decodedToken = jwtDecode(jwtToken);
        let currentDate = new Date();

        // JWT exp is in seconds
        if (decodedToken.exp * 1000 > currentDate.getTime()) {
            validToken = true;
        } else {
            validToken = false;
        }
    }
    else {
        validToken = false;
    }


    console.log("the loggggggggggggggggggggggggg token is ", validToken);

    return (
        validToken ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes