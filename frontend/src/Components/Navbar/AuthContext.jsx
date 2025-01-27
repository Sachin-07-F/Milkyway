import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log('Decoded Token:', decoded); // Debugging the token structure
        setIsLoggedIn(true);
        setUserName(decoded.name);
        if (decoded.email) localStorage.setItem('user.email', decoded.email);
        if (decoded.userName) localStorage.setItem('user.userName', decoded.userName);
      } catch (error) {
        console.error('Invalid token:', error);
        clearLocalStorage();
      }
    }
  }, []);

  const clearLocalStorage = () => {
    console.log('Clearing localStorage...'); // Debugging
    localStorage.removeItem('token');
    localStorage.removeItem('user.email');
    localStorage.removeItem('user.userName');
    console.log('localStorage after clear:', localStorage); // Debugging
  };

  const login = (token) => {
    try {
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      console.log('Login: Decoded Token:', decoded); // Debugging
      setIsLoggedIn(true);
      setUserName(decoded.name);
      if (decoded.email) localStorage.setItem('user.email', decoded.email);
      if (decoded.userName) localStorage.setItem('user.userName', decoded.userName);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = () => {
    console.log('Logout triggered'); // Debugging
    clearLocalStorage();
    setIsLoggedIn(false);
    setUserName('');
    console.log('State after logout:', { isLoggedIn, userName }); // Debugging
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
