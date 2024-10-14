import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import useFirebase from '../useFirebase/useFirebase';

const UserContext = createContext();

// Context provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Holds user authentication info
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.email) {
        try {
          const response = await axios.get(`http://localhost:5000/users?email=${user.email}`);
          if (response.data.length > 0) {
            setUserInfo(response.data[0]);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserInfo({});
        } finally {
          setLoading(false);
        }
      } else {
        setUserInfo({});
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, userInfo, setUserInfo, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Export the context so it can be used directly in other components
export { UserContext };