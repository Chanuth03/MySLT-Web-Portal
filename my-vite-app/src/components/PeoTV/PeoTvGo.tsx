import Box from "@mui/material/Box";
import PeoTvGoImage from "../../assets/Rectangle 151.png";
import { Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Pstore from "../../assets/google-play-2.png";
import Astore from "../../assets/app-store-2.png";
import { useTranslation } from "react-i18next";

const PeoTvGo = () => {
  const handleclick = () => {
    window.open("https://www.peotvgo.com/", "_blank");
  };
  const {t} = useTranslation();
  
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "65vh",
        backgroundColor: "#0e2444",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      {/* Left side with text content */}
      <Box
        sx={{
          width: "60%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 40px",
          position: "relative",
          backgroundColor: "#1976d2",
          borderTopRightRadius: "50%",
          borderBottomRightRadius: "50%",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontWeight: "bold",
            marginBottom: "10px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {t('peoTv.peoTvGo.stay_in_control')}
        </Typography>
        
        <Typography
          variant="h5"
          sx={{
            color: "white",
            marginBottom: "10px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {t('peoTv.peoTvGo.of_your_connection')}
        </Typography>
        
        <Typography
          variant="body1"
          sx={{
            color: "white",
            marginBottom: "15px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {t('peoTv.peoTvGo.with_the_new')}
        </Typography>
        
        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontWeight: "bold",
            marginBottom: "20px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          PEOTV GO
        </Typography>

        {/* App Store buttons */}
        <Box sx={{ display: "flex", gap: 2, marginBottom: "25px" }}>
          <Box
            
            onClick={() => window.open("https://apps.apple.com/lk/app/peo-mobile/id1617811699", "_blank")}
            sx={{
              display: "flex",
              alignItems: "center",
              
              border: "none",
              borderRadius: "8px",
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            <Box
              component="img"
              src={Pstore}
              alt="Get it on Google Play"
              sx={{ height: "37px" }}
            />
          </Box>
          
          <Box
            
            onClick={() => window.open("https://play.google.com/store/apps/details?id=com.peotvgo", "_blank")}
            sx={{
              display: "flex",
              alignItems: "center",
              
              border: "none",
              borderRadius: "8px",
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            <Box
              component="img"
              src={Astore}
              alt="Download on the App Store"
              sx={{ height: "35px" }}
            />
          </Box>
        </Box>
        
        {/* Explore More text with arrow */}
        <Box
          component="button"
          onClick={handleclick}
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "transparent",
            border: "none",
            color: "white",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
            padding: 0,
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {t('peoTv.peoTvGo.explore')}
          <ArrowForwardIcon sx={{ marginLeft: "5px", fontSize: "20px" }} />
        </Box>
      </Box>
      
      {/* Right side with PEO TV GO logo */}
      <Box
        sx={{
          width: "40%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 20px",
          position: "relative",
        }}
      >
        
        
        <Box
          component="img"
          src={PeoTvGoImage}
          alt="PEO TV GO Logo"
          sx={{
            width: "250px",
          }}
        />
      </Box>
    </Box>
  );
};

export default PeoTvGo;