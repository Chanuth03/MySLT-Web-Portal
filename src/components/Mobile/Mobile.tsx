import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Mock from "../../assets/Images/MobileImages/mockpng.png";
import { Typography } from "@mui/material";
import App from "../../assets/Images/MobileImages/image 4.png";
import Pstore from "../../assets/Images/MobileImages/pl.png";
import Astore from "../../assets/Images/MobileImages/ap.png";
import { useTranslation } from "react-i18next";

const Mobile = () => {
  const handleRedirect = () => {
    window.open("https://www.mobitel.lk/selfcare-app", "_blank");
  };

  const handlePlayStoreRedirect = () => {
    window.open(
      "https://play.google.com/store/apps/details?id=com.mobitel.selfcare",
      "_blank"
    );
  };

  const handleAppStoreRedirect = () => {
    window.open(
      "https://apps.apple.com/lk/app/mobitel-selfcare/id885337888",
      "_blank"
    );
  };

  const { t } = useTranslation();

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "500px",
        backgroundColor: "#0b214e",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        border: "1px solid #2563a8",
        marginTop: "40px",
      }}
    >
      <Box
        sx={{
          width: "50%",
          backgroundColor: "#2563a8",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 4,
          borderRadius: "0 50% 50% 0",
          position: "relative",
        }}
      >
        {/* Phone mockup image */}
        <Box
          component="img"
          src={Mock}
          alt="Mobitel app mockup"
          sx={{
            position: "absolute",
            right: "-55px",
            top: "50%",
            transform: "translateY(-50%)",
            height: "90%",
            zIndex: 3,
          }}
        />
      </Box>

      {/* Right side - Dark blue section with "STAY IN CONTROL" */}
      <Box
        sx={{
          width: "50%",
          // backgroundColor: "#0b214e",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
        }}
      >
        {/* App icon */}
        <Box
          component="img"
          src={App}
          alt="Mobitel app icon"
          sx={{
            width: "80px",
            height: "80px",
            borderRadius: 2,
            marginBottom: 4,
          }}
        />

        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontWeight: "bold",
            fontFamily: "Poppins, sans-serif",
            textAlign: "center",
            marginBottom: 1,
          }}
        >
          {t("mobile.stay_in_control")}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "white",
            textAlign: "center",
            fontFamily: "Poppins, sans-serif",
            marginBottom: 1,
          }}
        >
          {t("mobile.of_your_connection")}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "white",
            textAlign: "center",
            fontFamily: "Poppins, sans-serif",
            marginBottom: 4,
          }}
        >
          {t("mobile.with_the_all")}
        </Typography>

        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontWeight: "bold",
            fontFamily: "Poppins, sans-serif",
            textAlign: "center",
            marginBottom: 4,
          }}
        >
          Mobitel Selfcare App
        </Typography>

        {/* App store buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            marginBottom: 3,
          }}
        >
          <Box
            component="img"
            src={Pstore}
            alt="Get it on Google Play"
            sx={{
              height: "50px",
              cursor: "pointer",
            }}
            onClick={handlePlayStoreRedirect}
          />

          <Box
            component="img"
            src={Astore}
            alt="Get it on App Store"
            sx={{
              height: "50px",
              cursor: "pointer",
            }}
            onClick={handleAppStoreRedirect}
          />
        </Box>

        <Button
          onClick={handleRedirect}
          sx={{
            color: "white",
            textTransform: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography>{t("mobile.more_info")}</Typography>
          <Typography sx={{ marginLeft: 1, fontFamily: "Poppins, sans-serif" }}>
            →
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Mobile;
