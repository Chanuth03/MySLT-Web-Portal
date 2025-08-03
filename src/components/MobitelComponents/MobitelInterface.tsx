import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import logo from "../../assets/Images/MobitelComponents/Rectangle 138.png";
// Import components
import Voice from "./Voice";
import Sms from "./Sms";
import DataBalanceSection from "./DataBalanceSection";
import Call from "./Call";

const MobitelInterface = () => {
  // State to track which component to display
  const [activeComponent, setActiveComponent] = useState("Data");

  // Listen for the custom event from CustomNavBar
  useEffect(() => {
    const handleNavSelection = (event) => {
      setActiveComponent(event.detail.selectedItem);
    };

    window.addEventListener("navItemSelected", handleNavSelection);

    // Clean up
    return () => {
      window.removeEventListener("navItemSelected", handleNavSelection);
    };
  }, []);

  // Function to render the active component
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "Voice":
        return <Voice />;
      case "SMS":
        return <Sms />;
      case "Data":
        return <DataBalanceSection />;
      case "Call":
        return <Call />;
      default:
        return <Sms />;
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="70vh"
      py={5}
      px={2}
      borderRadius="10px"
      fontFamily="Poppins, sans-serif"
    >
      {/* Main Card Container */}
      <Box
        width="100%"
        maxWidth="850px"
        height="133vh"
        bgcolor="rgba(15, 59, 122, 0.5)"
        borderRadius="15px"
        p={3}
        boxShadow="0 8px 20px rgba(0,0,0,0.3)"
      >
        {/* Top Header */}
        <Box
          display="flex"
          mb={3}
          gap={1}
          sx={{
            borderRadius: "12px",
            overflow: "hidden",
            padding: "0",
            width: "100%",
            position: "relative",
          }}
        >
          {/* Left Section with WELCOME, number, CONNECTED and BLUE */}
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
              0719205030
              <Box
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
              </Box>
            </Typography>

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
                  fontSize: "12px",
                }}
              >
                →
              </Box>
            </Box>

            {/* BLUE with hexagon logo */}
            <Box
              sx={{
                position: "absolute",
                right: "20px",
                bottom: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Hexagon Logo */}
              <Box sx={{ marginTop: "15px" }}>
                <img src={logo} alt="Hexagon Logo" width={150} />
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
                    fontSize: "12px",
                  }}
                >
                  →
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Right Section with Balance and buttons */}
          <Box
            sx={{
              width: "40%",
              display: "flex",
              flexDirection: "column",
              padding: "16px",
              justifyContent: "space-between",
              background: "#045AA0",
              borderRadius: "12px",
            }}
          >
            {/* Balance */}
            <Typography
              fontSize="16px"
              color="white"
              fontWeight="bold"
              mb={3}
              marginLeft={-1}
            >
              Balance : Rs. 120.00
            </Typography>

            {/* Buttons */}
            <Box
              display="flex"
              justifyContent={"flex-end"}
              gap={1}
              flexWrap="wrap"
            >
              <Button
                sx={{
                  borderRadius: "20px",
                  color: "white",
                  border: "1px solid white",
                  textTransform: "none",
                  fontSize: "12px",
                  px: 1.5,
                  py: 0.5,
                  minWidth: "auto",
                }}
              >
                Get a loan
              </Button>
              <Button
                sx={{
                  borderRadius: "20px",
                  color: "white",
                  border: "1px solid white",
                  textTransform: "none",
                  fontSize: "12px",
                  px: 1.5,
                  py: 0.5,
                  minWidth: "auto",
                }}
              >
                RELOAD
              </Button>
              <Button
                sx={{
                  borderRadius: "20px",
                  color: "white",
                  border: "1px solid white",
                  textTransform: "none",
                  fontSize: "12px",
                  px: 1.5,
                  py: 0.5,
                  display: "flex",
                  alignItems: "center",
                  minWidth: "auto",
                }}
              >
                MORE ▼
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Quick Reload Section */}
        <Box mb={3} mt={4}>
          {/* Tab buttons */}
          <Box display="flex" gap={1} mb={1}>
            <Button
              sx={{
                borderRadius: "30px",
                border: "1px solid #ffffff",
                backgroundColor: "transparent",
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
                px: 2,
                py: 1,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
            >
              Quick Activation
            </Button>
            <Button
              sx={{
                borderRadius: "30px",
                border: "1px solid #0d2d62",
                backgroundColor: "#0d2d62",
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
                px: 2,
                py: 1,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#0d2d62",
                },
              }}
            >
              Quick Reload
            </Button>
          </Box>

          {/* Reload cards */}
          <Box
            mt={3}
            display="grid"
            gridTemplateColumns="repeat(5, 1fr)"
            gap={2}
            bgcolor="#045AA0"
            borderRadius="10px"
            p={2}
          >
            {[50, 100, 150, 200, 300].map((amount) => (
              <Box
                key={amount}
                sx={{
                  bgcolor: "#d6e6f8",
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box p={2} textAlign="center">
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      display: "flex",
                      color: "black",
                      alignItems: "baseline",
                      justifyContent: "center",
                    }}
                  >
                    Rs
                    <Box
                      component="span"
                      sx={{ fontSize: "42px", lineHeight: "1" }}
                    >
                      {amount}
                    </Box>
                    .
                    <Box component="span" sx={{ fontSize: "18px" }}>
                      00
                    </Box>
                  </Typography>
                </Box>
                <Button
                  sx={{
                    mt: "auto",
                    bgcolor: "#0d2d62",
                    color: "white",
                    borderRadius: "0",
                    fontSize: "18px",
                    fontWeight: "bold",
                    py: 1.5,
                    width: "100%",
                    "&:hover": {
                      bgcolor: "#0d2d62",
                    },
                  }}
                >
                  BUY
                </Button>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Render the active component */}
        {renderActiveComponent()}
      </Box>
    </Box>
  );
};

export default MobitelInterface;
