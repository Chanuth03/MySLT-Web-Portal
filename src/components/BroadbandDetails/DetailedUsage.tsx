import { Box, Typography, IconButton } from "@mui/material";
// import React from "react";
import useStore from "../../services/useAppStore";
import ProgressBar from "./ProgressBar";
import CloseIcon from '@mui/icons-material/Close';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import { useTranslation } from 'react-i18next'; 

const DetailedUsage = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();
  const { usageDetails } = useStore();
  const itemArray = [
   { label:t('dailyusage.base'), color: "#4FD745" },
    { label: t('dailyusage.extra_gb'), color: "#CF1C1F" },
    { label: t('dailyusage.loyalty'), color: "#F6E901" },
    { label: t('dailyusage.vas'), color: "#00B4EB" },
  ];

  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1300,
        width: "100%",
        maxWidth: "800px",
        
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          gap: 1,
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          backgroundColor: "#082444",
          padding: 2,
          borderRadius: "10px",
          height: "450px",
          boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.5)",
          overflow: "hidden",
          border: "10px solid #0F3B7A",
        }}
      >
      
        {/* new Header */}
        <Box
  sx={{
    display: "flex",
    alignItems: "center",
    backgroundColor: "#1a3564",
    padding: "5px",
    width: "100%",
    marginBottom:"10px",
    // marginLeft: "20px",
   
    borderRadius: 2,
    position: "relative", // Added to position the close button
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
      <DataUsageIcon 
        sx={{ 
          color: "#FFFFFF",
          fontSize: 28,
          marginRight: 1.5
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
    }}
  >
    {/* DETAILED USAGE */}
    {t('detailedusage.detailed_usage')}
  </Typography>
  
  {/* Close button added here */}
  <IconButton
    onClick={onClose}
    sx={{
      position: "absolute",
      right: 8,
      top: 8,
      color: "#FFFFFF", // Changed to white for better visibility on dark background
    }}
  >
    <CloseIcon />
  </IconButton>
</Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
            mb: 1,
          }}
        >
          {itemArray.map((item, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  bgcolor: item.color,
                  borderRadius: "50%",
                }}
              />
              <Typography variant="body2"sx={{ color: "#FFFFFF", fontSize: "13px",fontFamily: "Poppins, sans-serif", }}>{item.label}</Typography>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            mt: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "#FFFFFF", fontSize: "16px", fontWeight: 600, fontFamily: "Poppins, sans-serif", }}
>{`${t('detailedusage.total_usage')} - ${usageDetails?.daily_total_usage}${usageDetails?.volumeunit}`}</Typography>          <Box
            sx={{
              mt: 1,
              display: "flex",
              width: "80%",
              height: 12,
              borderRadius: "5px",
              backgroundColor: "#E5E5EF",
              overflow: "hidden",
           
              
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: `${usageDetails?.daily_percentage}%`,
                height: "100%",
                borderRadius: "5px",
              
              }}
            >
              {usageDetails?.usages ? (
                usageDetails.usages.map((usage, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        width: `${usage.percentage}%`,
                        height: 12,
                        
                        backgroundColor:
                          usage.sorter === 1
                            ? "#4FD745"
                            : usage.sorter === 2
                            ? "#F6E901"
                            : usage.sorter === 3
                            ? "#CF1C1F"
                            : "#00B4EB",
                      }}
                    ></Box>
                  );
                })
              ) : (
                <Box>no data</Box>
              )}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            width: "90%",
            minHeight: "20px",
            
            gap: 2,
          }}
        >
          {usageDetails?.usages ? (
            usageDetails.usages.map((usage, index) => (
              <Box sx={{ width: "45%" }} key={index}>
                {" "}
                <ProgressBar usage={usage}  />
              </Box>
            ))
          ) : (
            <Box>no data</Box>
          )}
        </Box>
        <Box
          sx={{
            mt: 4,
            display: "flex",
            gap: 2,
            justifyContent: "space-around",
            width: "90%",
            height: "30px",
            
          }}
        >
          <StyledText text= {t('detailedusage.pd')} />
          <StyledText text={t('detailedusage.pu')} />
          <StyledText text={t('detailedusage.od')} />
          <StyledText text={t('detailedusage.ou')} />
        </Box>
      </Box>
    </Box>
  );
};

export default DetailedUsage;

interface props {
  text: string;
}
export const StyledText = ({ text }: props) => {
  return (
    <Typography
      variant="body2"
      sx={{ color: "#FFFFFF", fontSize: "14px", fontWeight: 600, mt: 2,fontFamily: "Poppins, sans-serif", }}
    >
      {text}
    </Typography>
  );
};