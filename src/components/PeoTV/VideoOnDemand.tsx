import { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import useStore from "../../services/useAppStore";
import { useTranslation } from "react-i18next";

const VideoOnDemand = () => {
  const { serviceDetails, setLeftMenuItem, selectedNavbarItem } = useStore();
  const [showAlert, setShowAlert] = useState(false);
  const {t} = useTranslation();

  useEffect(() => {
    // @ts-ignore
    if (!serviceDetails?.listofVODService?.length) {
      setShowAlert(true);
    }
  }, [serviceDetails, selectedNavbarItem]);

  const handleCloseAlert = () => setShowAlert(false);

  return (
    <>
      {/* Alert Dialog */}
      <Dialog open={showAlert} onClose={handleCloseAlert}>
        <DialogTitle>
          <Typography variant="body2" sx={{ fontSize: "24px", color: "#00256A" }}>
            {t('peoTv.vod.no_VOD_title')}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ fontSize: "16px", color: "#0056A2" }}>
            {t('peoTv.vod.no_VOD_message')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button sx={buttonStyle} onClick={handleCloseAlert} color="primary">
            {t('common.close')}
          </Button>
          <Button
  sx={buttonStyle}
  onClick={() => {
    handleCloseAlert();
    setLeftMenuItem("New Services");
    window.open("https://www.slt.lk/en/personal/peo-tv/vod", "_blank");
  }}
  color="primary"
  autoFocus
>
  {t('peoTv.vod.subscribe_now')}
</Button>

        </DialogActions>
      </Dialog>

      {/* Main Content Box */}
      <Box sx={containerStyle}>
        <Box sx={contentBoxStyle}>
          {/* @ts-ignore */}
          {serviceDetails?.listofVODService?.length > 0 ? (
            <>
              <Typography variant="body2" sx={textStyle}>
                {/* @ts-ignore */}
                {`Service ID : ${serviceDetails.listofVODService[0].serviceID}`}
              </Typography>
              <Typography variant="body2" sx={{ ...textStyle, fontSize: "36px" }}>
                {/* @ts-ignore */}
                {serviceDetails.listofVODService[0].movieTitle}
              </Typography>
              <Typography variant="body2" sx={{ ...textStyle, fontSize: "36px" }}>
                {`Status : `}
                <Typography
                  variant="body2"
                  component={"span"}
                  sx={{ color: "#4FD745", fontSize: "36px", fontWeight: 600 }}
                >
                  {/* @ts-ignore */}
                  {serviceDetails.listofVODService[0].serviceStatus}
                </Typography>
              </Typography>
            </>
          ) : (
            <Typography variant="body2" sx={{ ...textStyle, fontSize: "24px" }}>
              {t('peoTv.vod.no_videos')}
            </Typography>
          )}
        </Box>

      </Box>
    </>
  );
};

// Reusable Styles
const buttonStyle = {
  backgroundColor: "#fff",
  color: "#00256A",
  "&:hover": {
    backgroundColor: "#00256A",
    color: "#ffffff",
  },
};

const containerStyle = {
    position: "relative",
    display: "flex",
    gap: 2,
    flexDirection: "column",
    backgroundColor: "#1B1D41",
    color: "#FFFFFF1A",
    padding: 1,
    borderRadius: "10px",
    height: "65vh",
};

const contentBoxStyle = {
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
};

const textStyle = {
  color: "#FFF",
  fontSize: "20px",
  fontWeight: 600,
  mb: 2,
};

export default VideoOnDemand;