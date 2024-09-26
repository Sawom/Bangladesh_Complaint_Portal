import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useFirebase from '../useFirebase/useFirebase';

const PrivateRoute = ({children}) => {
    const { user, loading } = useFirebase();

    const location = useLocation();

    if(loading){
        return <progress className="progress progress-success w-56" value="70" max="100"></progress>
    }

    if(!user?.email){
        return <Navigate to='/login'  state={{from:location}} replace ></Navigate>
    }
    return children;
};

export default PrivateRoute;