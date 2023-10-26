/**
 * @author Alejandro Garcia de Paredes
 * @created July 27, 2023
 * @modified July 31, 2023
 **/

import React, { createContext, useState, useContext } from 'react';

// Create a context for authentication
const AuthContext = createContext();

// Provide authentication states and functionalities to children components
export function AuthProvider({ children }) {
  
  // Define states related to authentication, user information, and balance
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userIcon, setUserIcon] = useState(null);
  const [username, setUsername] = useState('');
  const [balance, setBalance] = useState(0);

  // Define a function to reset authentication-related states during logout
  function logout() {
    setIsLoggedIn(false);
    setUserIcon(null);
    setUsername('');
    setBalance(0);
  }

  // Wrap children components with authentication context and expose necessary values
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userIcon, setUserIcon, username, setUsername, balance, setBalance, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Define a hook to use authentication context outside the AuthProvider
export function useAuth() {
  return useContext(AuthContext);
}
