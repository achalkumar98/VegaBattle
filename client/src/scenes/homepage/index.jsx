
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Box, Typography, useTheme } from "@mui/material";
import { setLogout } from "../../state/index";

const HomePage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(setLogout());
  };

  return (
    <Box
      sx={{
        padding: "2rem",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: "100vh",
      }}
    >
      <Typography variant="h1" sx={{ color: theme.palette.primary.main }}>
        Welcome to the Battle Platform!
      </Typography>
      {user ? (
        <Box mt="2rem">
          <Typography variant="h4">Hello, !</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogout}
            sx={{ mt: "1rem" }}
          >
            Logout
          </Button>
        </Box>
      ) : (
        <Typography variant="h5" mt="2rem">
          Please login or register to start battling!
        </Typography>
      )}
    </Box>
  );
};

export default HomePage;
