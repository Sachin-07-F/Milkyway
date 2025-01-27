import React, { createContext, useState, useContext } from 'react';
import App from '../../App.js';
// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null });

  const login = (userData) => setAuth({ user: userData });
  const logout = () => setAuth({ user: null });

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook for Using Auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};