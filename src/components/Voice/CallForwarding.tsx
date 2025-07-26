import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  // DialogContentText,
  DialogTitle,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
// import WaterMarkLogo from "../../assets/Images/watermarklogo.png";
import { textFieldStyle } from "../../assets/CommonStyles";
import callForwardingRequest from "../../services/postpaid/Voice/callForwardingRequest"; // Import the call forwarding API
import checkCallForwardingStatus from "../../services/postpaid/Voice/checkCallForwardingStatus"; // Import the API function

const CallForwarding: React.FC<{ telephoneNo: string }> = ({ telephoneNo }) => {
  const [statusMessage, setStatusMessage] = useState<string>(""); // State for status message
  const [_errorMessage, setErrorMessage] = useState<string>("");// State for error message
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // State to control dialog visibility
  const [forwardingNumber, setForwardingNumber] = useState<string>(""); // State for forwarding number
  const [forwardingNumberError, setForwardingNumberError] = useState<string>(""); // State for forwarding number validation error
  const [currentStatus, setCurrentStatus] = useState<string>(""); // State to store the current status (Y or N)
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false); // State for terms checkbox
  const [termsError, setTermsError] = useState<string>(""); // State for terms validation error

  useEffect(() => {
    const fetchStatus = async () => {
      setLoading(true);
      const statusResponse = await checkCallForwardingStatus(telephoneNo);
      setLoading(false);
      
      if (statusResponse) {
        // Check the status from the API response
        const status = statusResponse.status;
        setCurrentStatus(status); // Store the current status
        if (status === "N") {
          setStatusMessage("Call forwarding status failed");
        } else if (status === "Y") {
          setStatusMessage("Call forwarding status Request Success");
        } else {
          setStatusMessage("Unknown status received from API");
        }

        // Check for the error message in the response
        if (statusResponse.errorShow) {
          setErrorMessage(statusResponse.errorShow);
          setMessage(statusResponse.errorShow);
          setShowMessage(true);
          setIsSuccess(false);
          setIsDialogOpen(true);
        }
      } else {
        const errorMsg = "Sorry, the service is temporarily unavailable. Please try again later";
        setErrorMessage(errorMsg);
        setMessage(errorMsg);
        setShowMessage(true);
        setIsSuccess(false);
        setIsDialogOpen(true);
      }
    };

    fetchStatus();
  }, [telephoneNo]);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setShowMessage(false);
  };

  const validateForm = (): boolean => {
    let isValid = true;

    // Validate forwarding number
    if (!forwardingNumber.trim()) {
      setForwardingNumberError("Forwarding number is required");
      isValid = false;
    } else {
      setForwardingNumberError("");
    }

    // Validate terms acceptance
    if (!termsAccepted) {
      setTermsError("You must accept the terms and conditions");
      isValid = false;
    } else {
      setTermsError("");
    }

    return isValid;
  };

  const handleSubscribeClick = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setIsDialogOpen(true);
    setShowMessage(false);

    // Set the requestType based on the current status (Y or N)
    const requestType = currentStatus === "Y" ? "N" : "Y"; 

    // Prepare the data for the API request
    const response = await callForwardingRequest(telephoneNo, forwardingNumber, requestType);
    
    setLoading(false);
    setShowMessage(true);

    if (response) {
      setIsSuccess(true);
      const successMsg = requestType === "Y" 
        ? "Call forwarding has been successfully activated." 
        : "Call forwarding has been successfully canceled.";
      setStatusMessage(successMsg);
      setMessage(successMsg);
    } else {
      setIsSuccess(false);
      const errorMsg = "Failed to process the request.";
      setErrorMessage(errorMsg);
      setMessage(errorMsg);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        gap: 2,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1B1D41",
        padding: 1,
        borderRadius: "10px",
        height: "65vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "70%",
          padding: 3,
          backgroundColor: "#1B1D41",
          
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontSize: 24, fontWeight: "bold", marginBottom: "32px", color:"#FFF", textAlign: "center", }}
        >
          Call Forwarding
        </Typography>
        <Box sx={{ marginBottom: "16px" }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold",
              color: "#fff",
              marginBottom: "8px",
            }}
          >
            Your Number
            <Typography
              component="sup"
              sx={{
                color: "red",
                fontWeight: "bold",
                fontSize: "1rem",
                marginLeft: "2px",
              }}
            >
              *
            </Typography>
          </Typography>

          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={telephoneNo} // Display the passed telephone number
            disabled
            required
            sx={{
              ...textFieldStyle(),
            }}
          />
        </Box>
        <Box sx={{ marginBottom: "16px" }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold",
              color: "#fff",
              marginBottom: "8px",
            }}
          >
            Forwarding Number
            <Typography
              component="sup"
              sx={{
                color: "red",
                fontWeight: "bold",
                fontSize: "1rem",
                marginLeft: "2px",
              }}
            >
              *
            </Typography>
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Enter forwarding number"
            value={forwardingNumber}
            onChange={(e) => setForwardingNumber(e.target.value)}
            error={!!forwardingNumberError}
            helperText={forwardingNumberError}
            required
            FormHelperTextProps={{
              sx: { color: "error.main", marginLeft: 0 }
            }}
            sx={{
              ...textFieldStyle(),
              '& .MuiFormHelperText-root': {
                color: 'red',
              },
            }}
          />
        </Box>
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                sx={{
                  color: "#fff",
                  "&.Mui-checked": {
                    color: "#fff",
                  },
                }}
              />
            }
            label={
              <Typography
                variant="body2"
                sx={{
                  color: "#0056A2",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    color: "#fff",
                    padding: "4px 8px",
                    borderRadius: "4px",
                  }}
                >
                  I agree to the general terms and conditions
                </Box>
              </Typography>
            }
          />
          {termsError && (
            <Typography
              variant="caption"
              sx={{
                color: "red",
                display: "block",
                ml: 2,
              }}
            >
              {termsError}
            </Typography>
          )}
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Button
          variant="contained"
          onClick={handleSubscribeClick} // Handle the button click
          sx={{
            backgroundColor: "#15D151",
            color: "#0056A2",
            height: "50px",
            width: "150px",
            borderRadius: "8px",
            mb: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              textTransform: "capitalize",
              fontWeight: 600,
              fontSize: "20px",
              color: "#fff",
            }}
          >
            Subscribe
          </Typography>
        </Button>
      </Box>
      {statusMessage && !isDialogOpen && (
        <Typography
          variant="body2"
          sx={{
            marginTop: 2,
            color: statusMessage.includes("failed") ? "red" : "green",
            fontWeight: "bold",
          }}
        >
          {statusMessage}
        </Typography>
      )}

      {/* New Enhanced Dialog Component */}
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
              Please wait while we process your request...
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

export default CallForwarding;