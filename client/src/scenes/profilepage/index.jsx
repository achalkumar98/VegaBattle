import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../scenes/navbar";
import UserWidget from "../../widgets/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null); // State to store user data
  const [token, setToken] = useState(""); // State to store token
  const { userId } = useParams(); // Get userId from route parameters
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

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
        headers: { Authorization: `Bearer ${token}` }, // Include token in request headers
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

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId}  />
          <Box m="2rem 0" />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* You can add more widgets or content here */}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
