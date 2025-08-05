import { Box, Typography } from "@mui/material";
import React from "react";
import HexagonLogo from '../../assets/images/MobitelComponents/Rectangle-138.png';

// Define props interface
interface WelcomeSectionProps {
  phoneNumber?: string;
  isConnected?: boolean;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ 
  phoneNumber = "0719205030", 
  isConnected = true 
}) => {
  return (
    <Box
      sx={{
        width: "60%",
        display: "flex",
        flexDirection: "column",
        padding: "16px",
        background: `linear-gradient(to right, #003584, #0053a6)`,
        borderRadius: "12px",
        position: "relative",
      }}
    >
      <Typography
        color="white"
        fontSize="14px"
        fontWeight="bold"
        mb={1}
        fontFamily="Poppins, sans-serif"
      >
        WELCOME
      </Typography>
      <Typography
        fontSize="20px"
        fontWeight="bold"
        color="white"
        fontFamily="Poppins, sans-serif"
        display="flex"
        alignItems="center"
        mb={2}
      >
        {phoneNumber}
        {/* <Box
          component="span"
          ml={1}
          sx={{
            fontSize: "12px",
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            border: "2px solid white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "6px",
          }}
        >
          +
        </Box> */}
      </Typography>

      {isConnected && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#4caf50",
            borderRadius: "20px",
            px: 2,
            py: 0.5,
            width: "fit-content",
          }}
        >
          <Typography
            fontSize="14px"
            fontWeight="bold"
            color="white"
            mr={1}
          >
            CONNECTED
          </Typography>
          {/* <Box
            sx={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              border: "2px solid white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "12px",
            }}
          >
            →
          </Box> */}
        </Box>
      )}

      {/* BLUE with hexagon logo */}
      <Box
        sx={{
          position: "absolute",
          right: "10px",
          bottom: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Hexagon Logo */}
        <Box sx={{ marginTop: "15px" }}>
          <img 
  src={HexagonLogo} 
  alt="Hexagon Logo" 
  width={140} 
/>
        </Box>

        {/* BLUE text and circle */}
        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography
            fontSize="16px"
            fontWeight="bold"
            color="white"
            mr={1}
          >
            BLUE
          </Typography>
          <Box
            sx={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              border: "2px solid white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "8px",
            }}
          >
            ➜
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WelcomeSection;