import React, { useEffect, useState } from 'react';
import useAuth from '../useAuth/useAuth';
import useAxiosSecure from '../useAxiosSecure/useAxiosSecure';

const useAdmin = () => {
    const { user, loading } = useAuth(); 
    const [axiosSecure] = useAxiosSecure();
    const [isAdmin, setIsAdmin] = useState(null);
    const [isAdminLoading, setIsAdminLoading] = useState(true); 

    useEffect(() => {
        const fetchAdminStatus = async () => {
            if (!loading && user?.email && !!localStorage.getItem('access-token')) {
                try {
                    const res = await axiosSecure.get(`/users/admin/${user?.email}`);
                    setIsAdmin(res?.data?.admin); // Set admin status
                } catch (error) {
                    console.error('Failed to fetch admin status:', error);
                    setIsAdmin(false); // If error, treat as non-admin
                } finally {
                    setIsAdminLoading(false); // Loading done
                }
            }
        };

        fetchAdminStatus(); // Call the function when component mounts
    }, [user?.email, loading, axiosSecure]);

    return [isAdmin, isAdminLoading]; // Return admin status and loading state
};

export default useAdmin;