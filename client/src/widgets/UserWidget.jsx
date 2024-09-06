import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
  } from "@mui/icons-material";
  import { Box, Typography, Divider, useTheme } from "@mui/material";
  import FlexBetween from "../components/FlexBetween";
  import WidgetWrapper from "../components/WidgetWrapper"
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  
  const UserWidget = ({ userId }) => {
    const [user, setUser] = useState(null); // State to store user data
    const [token, setToken] = useState(""); // State to store the token
    const { palette } = useTheme();
    const navigate = useNavigate();
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.primary.main;
  
    // Function to manually fetch token, e.g., from localStorage
    const fetchToken = () => {
      const savedToken = localStorage.getItem("token"); // Example: Retrieve token from localStorage
      if (savedToken) {
        setToken(savedToken); // Update token state
      }
    };
  
    // Function to fetch user data
    const getUser = async () => {
      if (!token) return; // Exit if no token is available
  
      try {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data); // Set user data
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
  
    // Fetch token when the component mounts
    useEffect(() => {
      fetchToken(); // Retrieve token from localStorage
    }, []);
  
    // Fetch user data whenever the token or userId changes
    useEffect(() => {
      if (token) {
        getUser(); // Fetch user data if token is available
      }
    }, [token, userId]); // Dependencies: token and userId
  
    if (!user) return null; // Return null if user data is not available
  
    const {
      firstName,
      lastName,
      location,
      occupation,
      friends,
    } = user;
  
    return (
      <WidgetWrapper>
        <FlexBetween
          gap="0.5rem"
          pb="1.1rem"
          onClick={() => navigate(`/profile/${userId}`)}
        >
          <Box>
            <Typography
              variant="h6"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
          </Box>
          <ManageAccountsOutlined />
        </FlexBetween>
        <Divider />
  
        <Box p="1rem 0">
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{location}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="1rem">
            <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{occupation}</Typography>
          </Box>
        </Box>
        <Divider />
        <Box p="1rem 0">

        </Box>
        <Divider />
        <Box p="1rem 0">
          <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
            Social Profiles
          </Typography>
          <FlexBetween gap="1rem" mb="0.5rem">
            <FlexBetween gap="1rem">
              <img src="/assets/twitter.png" alt="twitter" />
              <Box>
                <Typography color={main} fontWeight="500">
                  Twitter
                </Typography>
                <Typography color={medium}>Social Network</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined sx={{ color: main }} />
          </FlexBetween>
          <FlexBetween gap="1rem">
            <FlexBetween gap="1rem">
              <img src="/assets/linkedin.png" alt="linkedin" />
              <Box>
                <Typography color={main} fontWeight="500">
                  Linkedin
                </Typography>
                <Typography color={medium}>Network Platform</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined sx={{ color: main }} />
          </FlexBetween>
        </Box>
      </WidgetWrapper>
    );
  };
  
  export default UserWidget;
  