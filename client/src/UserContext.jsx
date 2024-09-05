import React, { createContext, useState, useContext } from 'react';

// Create a Context for user data
const UserContext = createContext();

// Provider component to wrap around parts of your app that need access to user context
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to update user data
  const login = (userInfo) => setUser(userInfo);

  // Function to clear user data (logout)
  const logout = () => setUser(null);

  // Provide context to children components
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easier access to the UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }

  return context;
};
