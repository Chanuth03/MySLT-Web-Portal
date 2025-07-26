import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
// import RedeemImage from "../assets/Images/redeem.png";
import Voucher from "../assets/voucher.png";
// import WatermarkLogo from "../assets/Images/watermarklogo.png";
import redeemVoucher from "../services/postpaid/redeemVoucher";
import useStore from "../services/useAppStore";
import { useTranslation } from 'react-i18next';
import { textFieldStyle } from "../assets/CommonStyles";

const Redeem: React.FC = () => {
  const { t } = useTranslation();
  const { serviceDetails } = useStore();
  const serviceID = serviceDetails?.listofBBService[0]?.serviceID;
  const [voucherId, setVoucherId] = useState("");
  const [loading, setLoading] = useState(false); // To handle loading state
  const [message, setMessage] = useState(""); // To display response messages
  const [isDialogOpen, setIsDialogOpen] = useState(false); // To manage message box visibility
  const [isSuccess, setIsSuccess] = useState(false); // To check if the result is success or error
  const [showMessage, setShowMessage] = useState(false); // To handle delayed message display

  const handleValidate = async () => {
    if (!voucherId) {
      setMessage(t('redeem.errors.enterVoucherID'));
      setIsSuccess(false);
      setIsDialogOpen(true);
      setShowMessage(true);
      return;
    }

    if (!serviceID) {
      setMessage(t('redeem.errors.serviceIDMissing'));
      setIsSuccess(false);
      setIsDialogOpen(true);
      setShowMessage(true);
      return;
    }

    setLoading(true); // Start loading
    setMessage(""); // Reset the message
    setShowMessage(false); // Initially hide the message
    setIsDialogOpen(true); // Open the dialog

    try {
      const response = await redeemVoucher(serviceID, voucherId);

      if (response?.isSuccess) {
        setMessage(response.dataBundle.message || t('redeem.messages.successDefault'));
        setIsSuccess(true);
      } else {
        setMessage(response?.errorShow || t('redeem.errors.redeemFailed'));
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("An error occurred while redeeming the voucher:", error);
      setMessage(t('redeem.errors.unexpectedError'));
      setIsSuccess(false);
    } finally {
      setLoading(false); // Stop loading
      setShowMessage(true); // Show the message
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false); // Close the message box
    setShowMessage(false); // Reset message visibility
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        gap: 1,
        flexDirection: "column",

        backgroundImage: `url(${Voucher})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: 2,
        borderRadius: "10px",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontWeight: "bold",
          color: "#fff",
          marginTop:'20px',
          paddingLeft:'40%',
          mb: "10vh",
          fontSize: "18px",
        }}
      >
        {t('redeem.instructions.enterPromoCode')}
        <br/>
        {t('redeem.instructions.availOffer')}
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          mb: "8vh",
          paddingLeft:'40%',
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "#fff",
            fontSize: "16px",
            lineHeight: 1,
          }}
        >
          {t('redeem.labels.enterVoucherID')}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            variant="outlined"
            value={voucherId}
            onChange={(e) => setVoucherId(e.target.value)}
            sx={{
              ...textFieldStyle(40, 250)
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end", // Aligns button to the right
          width: "88%", // Ensures it takes full width
        }}
      >
        <Button
          variant="contained"
          size="medium"
          onClick={handleValidate}
          disabled={loading}
          sx={{
            marginBottom: 2,
            color: "#0056A2",
            backgroundColor: "#15D151",
            height: "50px",
            fontWeight: "bold",
            borderRadius: "8px",
            paddingX: 3,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            {loading ? t('redeem.buttons.processing') : t('redeem.buttons.redeemVoucher')}
          </Typography>
        </Button>
      </Box>

      {/* <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle
          sx={{
            textAlign: "center",
            color: isSuccess ? "green" : "red",
            padding: "10px 20px",
          }}
        >
          
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "250px",
            height: "50px",
            color: "#0056A2",
            overflow: "hidden",
            padding: 0,
          }}
        >
          {showMessage && (
            <>
              {isSuccess ? (
                <>
                  <img
                    src="https://cdn.dribbble.com/users/39201/screenshots/3694057/nutmeg.gif"
                    alt="Success"
                    style={{ width: "100px", borderRadius: "10px" }}
                  />
                  <Typography variant="body2">{message}</Typography>
                </>
              ) : (
                <>
                  <img
                    src="https://i.gifer.com/Z16w.gif"
                    alt="Error"
                    style={{ width: "30px", height: "20px" }}
                  />
                  <Typography variant="body2">{message}</Typography>
                </>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog> */}
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
         {loading ? t('redeem.dialog.processing') : isSuccess ? t('redeem.dialog.success') : t('common.error')}
        </DialogTitle>
        <DialogContent sx={{ p: 0, mb: 2, textAlign: "center" }}>
          {loading ? (
            <Typography variant="body2" sx={{ color: "#555555", fontSize: "16px" }}>
              {t('redeem.dialog.processingMessage')}
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
              {isSuccess ? t('common.next') : t('giftData.buttons.close')}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Redeem;
