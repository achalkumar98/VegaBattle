import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import NavBar from '../../scenes/navbar';


const HomePage = () => {
  
  const [user, setUser] = useState({ name: 'John Doe' });

  const primaryColor = '#1976d2'; 
  const backgroundColor = '#e0e0e0'; 

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Box>
      <NavBar />
     
    </Box>
  );
};

export default HomePage;
