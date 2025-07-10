import Box from "@mui/material/Box";
import useStore from "../../services/useAppStore";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

// import WaterMarkLogo from "../../assets/Images/watermarklogo.png";

const MyPackageVoice = () => {
  const { t } = useTranslation();
  const { serviceDetails } = useStore();
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        gap: 2,
        flexDirection: "column",
        backgroundColor: "#1B1D41",
        color: "#FFFFFF1A",
        padding: 1,
        borderRadius: "10px",
        height: "65vh",
      }}
    >
      <Box
        sx={{
          margin: "auto",
          background: "linear-gradient(to right, rgba(0, 104, 177, 0.3) 0%, rgba(0, 44, 75, 0.5) 100%)",
          border: "1px solid", // Add this
          borderColor: "#FFFFFF88",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          width: "60%",
          height: "60%",
          
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: "#FFF", fontSize: "20px", fontWeight: 600, mb: 4 }}
        >
          {`${t('peoTv.serviceId')} : ${serviceDetails?.listofVoiceService[0].serviceID}`}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#FFF", fontSize: "36px", fontWeight: 600, mb: 3 }}
        >
          {`${serviceDetails?.listofVoiceService[0].packageName}`}
        </Typography>
        <Typography variant="body2" sx={{ color: "#FFF", fontSize: "22px", }}>
          {`${t('peoTv.status')}  `}
          <Typography
            variant="body2"
            component={"span"}
            sx={{ color: "#8BCA84", fontSize: "22px", fontWeight: 600 }}
          >
            •{serviceDetails?.listofVoiceService[0].serviceStatus}
          </Typography>
        </Typography>
      </Box>
      {/* <Box
        component="img"
        src={WaterMarkLogo}
        alt="Watermark Logo"
        sx={{
          zIndex: 1,
          position: "absolute",
          bottom: 20,
          right: 20,
          width: "200px",
          opacity: 1,
        }}
      /> */}
    </Box> 
  );
};

export default MyPackageVoice;
