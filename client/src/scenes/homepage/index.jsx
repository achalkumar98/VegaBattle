
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Box, Typography, useTheme } from "@mui/material";
import { setLogout } from "../../state/index";
import NavBar from "../../scenes/navbar";
import BattleCard from "../../components/BattleCard";


const HomePage = () => {
   
    return (
      <Box>
        <NavBar />
        <BattleCard user="harsh" opponent="new"/>
        </Box>
    );
};

export default HomePage;