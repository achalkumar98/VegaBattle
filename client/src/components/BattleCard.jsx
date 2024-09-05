import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  useTheme,
  CircularProgress,
} from '@mui/material';
import { Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure to install axios if you use it

const BattleCard = ({ user, opponent }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  // State to manage battle connection status
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState(null);

  // Function to handle the start of the battle
  const handleStartBattle = async () => {
    setIsConnecting(true);
    setConnectionError(null);

    try {
      // Replace with your actual API endpoint and request
      const response = await axios.post(`http://localhost:3001/battle/match/${user.username}`, {
        player1: user.username,
        player2: opponent.username,
      });

      if (response.status === 200) {
        // Navigate to the Battle Arena page if the request is successful
        navigate('/battle-arena');
      } else {
        throw new Error('Failed to start the battle');
      }
    } catch (error) {
      setConnectionError(error.message || 'Failed to start the battle');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minWidth: 300,
        maxWidth: 600,
        margin: 'auto',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {/* User Side */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <Person sx={{ fontSize: 50, color: theme.palette.primary.main }} />
          <Typography variant="h6">{user.username}</Typography>
        </Box>

        {/* VS Text */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <Typography variant="h4" sx={{ color: theme.palette.primary.main }}>
            VS
          </Typography>
        </Box>

        {/* Opponent Side */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <Person sx={{ fontSize: 50, color: theme.palette.primary.main }} />
          <Typography variant="h6">{opponent.username}</Typography>
        </Box>
      </CardContent>

      {/* Button to Start Battle */}
      <Button
        variant="contained"
        sx={{
          width: '100%',
          marginTop: '1rem',
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.background.default,
        }}
        onClick={handleStartBattle}
        disabled={isConnecting} // Disable button while connecting
      >
        {isConnecting ? (
          <CircularProgress size={24} sx={{ color: theme.palette.background.default }} />
        ) : (
          'Start Battle'
        )}
      </Button>

      {/* Display connection error if any */}
      {connectionError && (
        <Typography color="error" sx={{ marginTop: '1rem' }}>
          {connectionError}
        </Typography>
      )}
    </Card>
  );
};

export default BattleCard;
