import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";


const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');

  // Static color values can be defined in a theme or constants file
  const primaryColor = theme.palette.primary.main; // Use theme color
  const backgroundAlt = theme.palette.background.alt; // Use theme color

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={backgroundAlt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography
          fontWeight="bold"
          fontSize="32px"
          color={primaryColor}
        >
          VegaBattle
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={backgroundAlt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to VegaBattle
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
