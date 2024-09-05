// src/components/BattleCard.js
import React from "react";
import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";
import { Person } from "@mui/icons-material"; // Using Material Icons

const BattleCard = ({ user, opponent }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minWidth: 300,
        maxWidth: 600,
        margin: "auto",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {/* User Side */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Person sx={{ fontSize: 50, color: theme.palette.primary.main }} />
          <Typography variant="h6">{user.name}</Typography>
        </Box>

        {/* VS Text */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Person sx={{ fontSize: 50, color: theme.palette.primary.main }} />
          <Typography variant="h6">{opponent.name}</Typography>
        </Box>
      </CardContent>

      {/* Canvas for Battle UI */}

      <Box
        sx={{
          width: "100%",
          height: "50px",
          backgroundColor: theme.palette.primary.main,
          marginTop: "1rem",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="h6"
          display="flex"
          justifyContent="center"
        //   alignItems="center"
          marginTop="1rem"
          sx={{ color: theme.palette.background.default }}
        >
          Battle
        </Typography>
      </Box>
    </Card>
  );
};

export default BattleCard;
