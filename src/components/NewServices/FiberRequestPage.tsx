import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import fiberCharacter from "../../assets/fiber-mascot.png";
import OrderAnimation from "../OrderComponent/Order";
import Mock from "../../assets/Quantum Fiber.jpg"; // Import your background
import { useTranslation } from 'react-i18next';

import { useState } from "react";

const FiberRequestPage = () => {
  const { t } = useTranslation();
  const [isDisabled, setIsDisabled] = useState(false);
  const handleRequestClick = () => {
    // Open the URL in a new tab
    window.open("https://myslt.slt.lk/applyonline", "_blank",);
  };

  const handleClick = () => {
    setIsDisabled(true);
    setTimeout(() => {
      handleRequestClick();
      setIsDisabled(false);
    }, 9000);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        minWidth: "65vw",
        minHeight: "45vh",
      }}
    >
      {/* Circular Green Background Element */}
<Box
  sx={{
    position: "absolute",
    top: "80%",                // Center vertically
    left: -65,            // Shift left so part of the circle peeks in
    width: "100%",            // Diameter of the circle
    height: "700px",
    backgroundImage: `linear-gradient(rgba(21, 156, 250, 0.6), rgba(21, 156, 250, 0.6)), url(${Mock})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "50%",       // This makes it a circle
    transform: "translateY(-50%)",  // Perfect vertical centering
    zIndex: 0,
  }}
/>


      {/* Text Box - Bottom Left */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '60px',
          left: '40px',
          zIndex: 10,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: 36,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '10px',
            paddingLeft:'50px',
            fontFamily: "Poppins, sans-serif",
          }}
        >
          SLT FIBER HOME LINE
        </Typography>

        <Typography
          variant="h5"
          sx={{
            fontSize: 24,
            color: '#FFEB3B',
            marginBottom: '30px',
            paddingLeft:'20px',
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {/* Live life better, happier and faster! */}
          {t('newServices.tagline')}!
        </Typography>
      </Box>

      {/* Request Button */}
      <Button
        disableRipple
        onClick={handleClick}
        disabled={isDisabled}
      >
        <OrderAnimation />
      </Button>

      {/* Character Image - Right Center */}
      <Box
        component="img"
        src={fiberCharacter}
        alt="Fiber Character"
        sx={{
          zIndex: 1,
          position: "absolute",
          right: -55,
          top: "60%",
          transform: "translateY(-50%)",
          width: "70vh",
          height: "auto",
          maxWidth: "100%",
        }}
      />
    </Box>
  );
};

export default FiberRequestPage;
