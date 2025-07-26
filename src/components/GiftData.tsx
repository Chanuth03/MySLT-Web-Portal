import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
// import WatermarkLogo from "../assets/Images/watermarklogo.png";
import { textFieldStyle } from "../assets/Themes/CommonStyles";
import validateDataGiftSubscriber from "../services/postpaid/ValidateDataGiftResponse";
import useStore from "../services/useAppStore";
import { useTranslation } from 'react-i18next';

const GiftData: React.FC = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [_apiResponse, setApiResponse] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // new
  const [loading, setLoading] = useState(false);
  const [showMessage] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch serviceDetails and mobile number from the store
  const { serviceDetails, setLeftMenuItem, setGiftDataMobileNumber } = useStore();
  const serviceID = serviceDetails?.listofBBService[0]?.serviceID;

  // UseEffect to log serviceID whenever it changes
  useEffect(() => {
    console.log("Service ID:", serviceID); // Log serviceID
  }, [serviceID]);

  const handleValidate = async () => {
    if (!username || !serviceID) {
       const errorMsg = t('giftData.errors.missingSubscriberID');
      setErrorMessage(errorMsg);
      setIsSuccess(false);
      setMessage(errorMsg);
      setIsDialogOpen(true);
      return;
    }

    try {
      setLoading(true);

      const response = await validateDataGiftSubscriber(serviceID, username);

      if (response) {
        if (response.isSuccess) {
          const successMsg = t('giftData.messages.validationSuccess');
          setApiResponse(successMsg);
          setIsSuccess(true);
          setErrorMessage(null);
          setMessage(successMsg);
          // Update mobile number in the store when validation is successful
          setGiftDataMobileNumber(username);
        } else {
          const errorMsg = t('giftData.errors.invalidSubscriberID');
          setApiResponse(null);
          setErrorMessage(errorMsg);
          setMessage(errorMsg);
          setIsSuccess(false);
        }
      } else {
        const errorMsg = t('giftData.errors.unexpectedError');
        setApiResponse(null);
        setErrorMessage(errorMsg);
        setMessage(errorMsg);
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Validation API call failed:", error);
      const errorMsg = t('giftData.errors.validationError');
      setApiResponse(null);
      setErrorMessage(errorMsg);
      setMessage(errorMsg);
      setIsSuccess(false);
    } finally {
      setLoading(false);
      setIsDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    if (!errorMessage) {
      setLeftMenuItem("GetGiftDataPage");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "rgba(6, 29, 49, 0.74)",
        color: "#FFFFFF1A",
        padding: 2,
        borderRadius: "10px",
        height: "100%",
        boxShadow: "0px 3px 3px #0000004A",
        overflow: "hidden",
        width: "100%",
        position: "relative",
      }}
    >
      {/* <Typography
        variant="body1"
        align="center"
        sx={{
          fontWeight: "bold",
          color: "#fff",
          mb: 4,
          fontFamily: "Poppins, sans-serif",
          fontSize:"18px"
        }}
      >
        Gift Data
      </Typography> */}

      <Typography
        variant="body1"
        align="center"
        sx={{
          fontWeight: 400,
          color: "#fff",
          mb: 8,
          fontFamily: "Poppins, sans-serif",
        }}
      >
        {/* Enter the username of the person to whom you wish to <span style={{ color: '#40E734' }}>Gift Data</span>
        <br />
        Select the package by tapping VALIDATE RECEIVER */}
        {t('giftData.instructions.enterUsername')}{" "}
        <span style={{ color: '#40E734' }}>{t('menu.giftData')}</span>
        <br />
        {t('giftData.instructions.selectPackage')}
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          mb: 8,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontSize: "17px",
            color: "#fff",
            fontWeight:600,
            lineHeight: 1,
          }}
        >
           {t('giftData.labels.receiversUsername')} :
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              ...textFieldStyle(40, 250),
            }}
          />
        </Box>
      </Box>

      <Button
        variant="contained"
        size="large"
        onClick={handleValidate}
        sx={{
          marginBottom: 1,
          color: "#fff",
          backgroundColor: "#15D151",
          height: "50px",
          fontWeight: "bold",
          mb: 5,
          borderRadius: "8px",
        }}
      >
        <Typography variant="body2" sx={{ fontSize: "18px", fontWeight: 600 }}>{t('giftData.buttons.validateReceiver')}</Typography>
      </Button>

      <Typography
        variant="body2"
        sx={{
          color: "#fff",
          fontSize: 15,
          mb:3
        }}
      >
        {t('giftData.warnings.ensureCorrectUsername')}
      </Typography>

      {/* Dialog for displaying API messages */}
      {/* <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle sx={{ textAlign: "center", color: isSuccess ? "green" : "red" }}>
          {isSuccess ? "Success" : "Error"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "400px",
              height: "50px",
              gap: -10,
              color: "#0056A2",
              fontWeight: "bold",
              fontSize: "10px",
              textAlign: "center",
              overflow: "hidden",
            }}
          >
            {isSuccess ? (
              <>
                {apiResponse}
               
                <img
                  src="https://cdn.dribbble.com/users/39201/screenshots/3694057/nutmeg.gif"
                  alt="Success"
                  style={{ width: "100px", height: "30px", borderRadius: "10px" }}
                />
              </>
            ) : (
              <>
                {errorMessage}
             
                <img
                  src="https://i.gifer.com/Z16w.gif"
                  alt="Failure"
                  style={{ width: "30px", height: "18px", borderRadius: "10px" }}
                />
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>     */}

<Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            width: "400px",
            borderRadius: "10px",
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            m: 0,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            bgcolor: "white",
          },
        }}
      >
        <Box
          sx={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: isSuccess ? "#4CD137" : "#f44336",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 1,
            position: "relative",
            top: "-10px",
            animation: "pulse 1.5s infinite",
            "@keyframes pulse": {
              "0%": {
                opacity: 1,
                transform: "scale(1)",
                boxShadow: `0 0 0 0 ${isSuccess ? "rgba(76, 209, 55, 0.7)" : "rgba(244, 67, 54, 0.7)"}`,
              },
              "50%": {
                opacity: 0.8,
                transform: "scale(1.05)",
                boxShadow: `0 0 0 10px ${isSuccess ? "rgba(76, 209, 55, 0)" : "rgba(244, 67, 54, 0)"}`,
              },
              "100%": {
                opacity: 1,
                transform: "scale(1)",
                boxShadow: `0 0 0 0 ${isSuccess ? "rgba(76, 209, 55, 0)" : "rgba(244, 67, 54, 0)"}`,
              },
            },
          }}
        >
          <Typography sx={{ color: "white", fontSize: "30px", fontWeight: "bold" }}>
            {isSuccess ? "✓" : "×"}
          </Typography>
        </Box>
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            textAlign: "center",
            p: 0,
            m: 0,
            mb: 2,
            fontWeight: "bold",
            fontSize: "18px",
            textTransform: "uppercase",
            color: "#333333",
          }}
        >
          {loading ? "Processing" : isSuccess ? "Success" : "Error"}
        </DialogTitle>
        <DialogContent sx={{ p: 0, mb: 2, textAlign: "center" }}>
          {loading ? (
            <Typography variant="body2" sx={{ color: "#555555", fontSize: "16px" }}>
              Please wait while we process your voucher...
            </Typography>
          ) : (
            showMessage && (
              <Typography variant="body2" sx={{ color: "#555555", fontSize: "16px" }}>
                {message}
              </Typography>
            )
          )}
        </DialogContent>
        <DialogActions sx={{ p: 0, mt: 3, display: "flex", justifyContent: "center", width: "100%" }}>
          {!loading && (
            <Button
              onClick={handleDialogClose}
              sx={{
                backgroundColor: isSuccess ? "#4CD137" : "#f44336",
                color: "white",
                borderRadius: "30px",
                py: 1,
                px: 4,
                textTransform: "uppercase",
                "&:hover": {
                  backgroundColor: isSuccess ? "#44bd32" : "#d32f2f",
                },
              }}
            >
              {isSuccess ? "Continue" : "Close"}
            </Button>
          )}
        </DialogActions>
      </Dialog>   
    </Box>
  );
};

export default GiftData;
