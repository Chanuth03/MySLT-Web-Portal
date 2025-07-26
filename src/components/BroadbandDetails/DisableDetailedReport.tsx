import { Box, Button, Typography } from "@mui/material";
// import React from "react";
import DescriptionIcon  from '@mui/icons-material/Description';
import { useTranslation } from 'react-i18next'; 

const DisableDetailedReport = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        justifyContent: "start",
        alignItems: "center",
        backgroundColor: "#082444",
        padding: 2,
        borderRadius: "10px",
        height: "400px",
        boxShadow: "0px 3px 3px #0000004A",
        overflow: "hidden",
      }}
    >
       {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#1a3564",
          padding: "8px",
           width:"98%",
          marginTop:"10px",
          borderRadius: 2,
          // borderTopLeftRadius: 16,
          // borderTopRightRadius: 16,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mr: 2,
          }}
        >
          <Box
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: "50%",
            }}
          >
          <DescriptionIcon 
  sx={{ 
    color: "#FFFFFF",
    fontSize: 28,
   
  }} 
/>



          </Box>
        </Box>
        <Typography
          variant="h6"
          sx={{
            color: "white",
            fontWeight: "bold",
            fontSize: "20px",
            fontFamily: "Poppins, sans-serif",
             textTransform: "uppercase",
          }}
        >
        {/* Unsubscribe for detailed reports */}
        {t('dreport.unsubscribe_detailed')}
        </Typography>
      </Box>
          
       
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          gap: 4,
        }}
      >
        <Typography variant="body2" sx={{ fontSize: "20px", color: "#FFFFFF" }}>
          {/* Unsubscribe to usage report */}
          {t('dreport.unsubscribe_usage')}
        </Typography>
        <Button
          sx={{
            backgroundColor: "#15D151",
            color: "#FFFFFF",
            width: "150px",
            height: "40px",
            borderRadius: "10px",
            textTransform: "uppercase",
            transition: "transform 0.2s",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <Typography variant="body2" sx={{ textTransform: "uppercase"}}>{t('dreport.submit')}</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default DisableDetailedReport;
