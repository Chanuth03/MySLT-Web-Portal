// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import ArrowImage from "../../assets/Images/MobileImages/arrowImage.png";
// import VolteImage from "../../assets/Images/MobileImages/VolteImage.png";
// import BottomImage from "../../assets/Images/MobileImages/BottomImageMobile.png";
// import TopImage from "../../assets/Images/MobileImages/TopImageMobile.png";
// import { Typography } from "@mui/material";

// const Mobile = () => {
//   const handleRedirect = () => {
//     window.open("https://www.mobitel.lk/selfcare-app", "_blank");
//   };
//   return (
//     <Box
//       sx={{
//         position: "relative",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         width: "100%",
//         height: "110%",
//         backgroundColor: "white",
//         borderRadius: 3,
//       }}
//     >
//       <Box
//         component="img"
//         src={VolteImage}
//         alt="Watermark Logo"
//         sx={{
//           position: "absolute",
//           right:"30px",
//           top: "7vh",
//           display:{xs:"none",sm:"none",md:"block",lg:"block",xl:"block"},
//           width:{md:"40vw",lg:"425px"},
//           maxWidth:"425px",
//           objectFit: "cover",
//         }}
//       />
//       <Button
//       onClick={handleRedirect}
//       sx={{
//         marginTop: {xs:"0%",sm:"0%",md:"20vh",lg:"20vh"},
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         width: "200px",
//         height: "50px",
//         backgroundColor: "white",
//         border: "3px solid #0056A2",
//         borderRadius:"60px",
//         "&:hover": {
//           backgroundColor: "#DFF0FF",
//           color: "white",
//         }
//       }}
//       >
//         <Box
//         component="img"
//         src={ArrowImage}
//         alt="Watermark Logo"
//         sx={{
//           ml: 1,
//           mr:2,
//           width: '25px',
//           height: '25px',
//           objectFit: "cover",
//         }}
//       />
//       <Typography variant="body2" sx={{ color: "#0056A2", fontSize: 24 }}>
//         Go
//       </Typography>
//       </Button>
//       <Box
//         component="img"
//         src={BottomImage}
//         alt="Watermark Logo"
//         sx={{
//           zIndex: 1,
//           position: "absolute",
//           bottom:0,
//           right: 20,
//           width: "25vw",
//           minWidth: "250px",
//           opacity: 1,
//         }}
//       />
//       <Box
//         component="img"
//         src={TopImage}
//         alt="Watermark Logo"
//         sx={{
//           zIndex: 1,
//           position: "absolute",
//           top:0,
//           left: 20,
//           width: "25vw",
//           minWidth: "250px",
//           opacity: 1,
//         }}
//       />
//     </Box>
//   );
// };

// export default Mobile;
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import Astore from "../../assets/Images/MobileImages/ap.png";
import App from "../../assets/Images/MobileImages/image 4.png";
import Mock from "../../assets/Images/MobileImages/mockpng.png";
import Pstore from "../../assets/Images/MobileImages/pl.png";

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