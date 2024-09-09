import React from 'react';
import { createContext } from 'react';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    return (
        <AuthContext.Provider value={allContexts}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;