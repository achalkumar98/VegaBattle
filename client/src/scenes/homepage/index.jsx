import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import NavBar from '../../scenes/navbar';
import BattleCard from '../../components/BattleCard';

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
      <Button
        onClick={handleLogout}
        sx={{
          m: '1rem',
          p: '0.5rem 1rem',
          backgroundColor: primaryColor,
          color: '#fff',
          '&:hover': { backgroundColor: '#1565c0' },
        }}
      >
        Logout
      </Button>
      <BattleCard user={user ? user.name : 'Guest'} opponent="new" />
    </Box>
  );
};

export default HomePage;
