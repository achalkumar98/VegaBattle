import { useState } from 'react';
import React from 'react';
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import {
  Help,
  Close,
  Person,
  EmojiEvents,
  Tv,
  MilitaryTech,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import FlexBetween from '../../components/FlexBetween';
import { useUserContext } from '../../UserContext';
import MetaMaskWallet from '../../components/MetaMaskWallet';

const NavBar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const { user, logout } = useUserContext();
  const navigate = useNavigate();
  const isNonMobileScreens = window.innerWidth >= 1000;

  const primaryColor = '#1976d2';
  const neutralLight = '#f5f5f5';
  const dark = '#333';
  const background = '#ffffff';
  const alt = '#e0e0e0';

  const fullName = user ? `${user.firstName} ${user.lastName}` : 'Guest';
  const userId = user ? user._id : ''; // Extract user ID

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem,2rem,2.25rem)"
          color={primaryColor}
          onClick={() => navigate('/home')}
          sx={{
            '&:hover': {
              color: '#0d47a1',
              cursor: 'pointer',
            },
          }}
        >
          VegaBattle
        </Typography>
      </FlexBetween>

      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton>
            <Help sx={{ fontSize: '25px', color: dark }} />
          </IconButton>
          <MetaMaskWallet />
          <EmojiEvents
            onClick={() => navigate('/home')}
            sx={{ fontSize: '25px', color: dark }}
          />
          <Person
            onClick={() => navigate(`/profile/${userId}`)} // Navigate to profile page
            sx={{ fontSize: '25px', color: dark }}
          />
          <Tv onClick={() => navigate('/contest')} sx={{ fontSize: '25px', color: dark }} />
          <MilitaryTech
            onClick={() => navigate('/opportunity')}
            sx={{ fontSize: '25px', color: dark }}
          />
          <Help sx={{ fontSize: '25px', color: dark }} />
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: '150px',
                borderRadius: '0.25rem',
                p: '0.25rem 1 rem',
                '& .MuiSvgIcon-root': {
                  pr: '0.25rem',
                  width: '3rem',
                },
                '& .MuiSelect-select:focus': {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={logout}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Help sx={{ fontSize: '25px', color: dark }} />
        </IconButton>
      )}

      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close sx={{ color: dark }} />
            </IconButton>
          </Box>

          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="2rem"
          >
            <IconButton>
              <Help sx={{ fontSize: '25px', color: dark }} />
            </IconButton>
            <EmojiEvents
              onClick={() => navigate('/home')}
              sx={{ fontSize: '25px', color: dark }}
            />
            <Person
              onClick={() => navigate(`/profile/${userId}`)} // Navigate to profile page
              sx={{ fontSize: '25px', color: dark }}
            />
            <Tv
              onClick={() => navigate('/contest')}
              sx={{ fontSize: '25px', color: dark }}
            />
            <MilitaryTech
              onClick={() => navigate('/opportunity')}
              sx={{ fontSize: '25px', color: dark }}
            />
            <Help sx={{ fontSize: '25px', color: dark }} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: '150px',
                  borderRadius: '0.25rem',
                  p: '0.25rem 1 rem',
                  '& .MuiSvgIcon-root': {
                    pr: '0.25rem',
                    width: '3rem',
                  },
                  '& .MuiSelect-select:focus': {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={logout}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default NavBar;
