import React, { useEffect, useState } from 'react';
import useAuth from '../useAuth/useAuth';
import axios from 'axios';

const useAdmin = () => {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(null);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (!loading && user?.email) {
        try {
          const res = await axios.get(`http://localhost:5000/users/admin/${user.email}`, {
            withCredentials: true,  // Ensures cookies are sent with the request
          });
          setIsAdmin(res.data.admin);
        } catch (error) {
          console.error('Failed to fetch admin status:', error);
          setIsAdmin(false);
        } finally {
          setIsAdminLoading(false);
        }
      }
    };

    fetchAdminStatus();  // Call when component mounts
  }, [user?.email, loading]);

  return [isAdmin, isAdminLoading];
};

export default useAdmin;