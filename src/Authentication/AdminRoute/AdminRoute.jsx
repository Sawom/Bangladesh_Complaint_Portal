import React from 'react';
import { useLocation } from 'react-router-dom';
import useAdmin from '../useAdmin/useAdmin';
import useAuth from '../useAuth/useAuth';

const AdminRoute = ({children}) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading]  = useAdmin();
    const location = useLocation();

    if(loading || isAdminLoading){
        return <progress className='progress w-56' ></progress>
    }

    if(user && isAdmin){
        return children;
    }

    return <Navigate to='/'  state={{from: location}} replace ></Navigate>;
};

export default AdminRoute;