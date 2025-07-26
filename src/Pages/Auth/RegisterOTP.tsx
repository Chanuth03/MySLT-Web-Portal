import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useState } from "react";
import sendOTPRequest from "../../services/changePassword/sendOTPRequest";
import verifyOtp from "../../services/register/verifyOtp";
import useStore from "../../services/useAppStore";

// Define the TabSelectorProps interface
interface TabSelectorProps {
  onSelectTab: (tab: string) => void;
}

const RegisterOTP = ({ onSelectTab }: TabSelectorProps) => {
  const [otp, setOtp] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [loading, setLoading] = useState(false);
  const { otpState } = useStore();

  const handleChange = (newValue: string) => {
    setOtp(newValue);
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (otpState?.dataBundle != null) {
      const id = otpState.dataBundle;
      try {
        await verifyOtp(otp, id);
        alert("OTP & Registration successful");
        onSelectTab("login");
        console.log("OTP verification successful");
      } catch (error) {
        console.error("Error verifying OTP", error);
      }
    }
    setLoading(false);
  };

  const handleResendOtp = async () => {
    setIsResending(true); // Set resend state to true during the process
    const userType = otpState?.userType;
    const userName = otpState?.userName;
    if (userType != null && userName != null) {
      try {
        const response = await sendOTPRequest(userName, userType); // Call resendOtp API
        if (response != null && response.isSuccess) {
          alert("OTP has been resent successfully.");
        } else {
          console.error("Failed to resend OTP", response?.errorMessage);
        }
      } catch (error) {
        console.error("Error resending OTP", error);
      } finally {
        setIsResending(false); // Reset resend state
      }
    }
  };

  return (
    <Box
    sx={{
      height: "80%",
      paddingTop: "30px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "center",
      marginTop: "40px",
      // backgroundColor: "#F5F5F5", // light background outside the white box
    }}
  >
    {/* White Box Container */}
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        padding: "40px",
        borderRadius: "16px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        width: "90%",
        maxWidth: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
  variant="h1"
  sx={{
    fontFamily: "Poppins, sans-serif",
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginTop: "20px",
    marginBottom: "20px",
  }}
>
  <Box component="span" sx={{ color: "#0056A2" }}>Enter </Box>
  <Box component="span" sx={{ color: "#32a852" }}>OTP</Box>
</Typography>

      <Typography
        variant="body2"
        sx={{
          color: "#0056A2",
          textAlign: "center",
          marginBottom: "20px",
          maxWidth: "400px",
          mb: "30px",
          fontSize: "14px",
        }}
      >
        Enter 6 digits OTP code to reset your profile password.
      </Typography>
  
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          mb: "30px",
        }}
      >
        <Typography variant="body2" sx={{ color: "#A4A4AA", mb: 2 }}>
          Enter your OTP
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
  
        <MuiOtpInput
          sx={{
            margin: "auto",
            width: "80%",
            minWidth: "350px",
            "& .MuiInputBase-root": {
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              height: "50px",
              border: "2px solid #7FAAD0",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
              "&:hover": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "transparent",
                },
                borderColor: "#0056A2",
              },
              transition: "border 0.3s ease",
            },
            "& input": {
              textAlign: "center",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#0056A2",
            },
          }}
          value={otp}
          onChange={handleChange}
          length={6}
        />
      </Box>
  
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          width: "200px",
          borderRadius: 15,
          height: "50px",
          textTransform: "capitalize",
          mb: "10px",
        }}
        onClick={handleSubmit}
      >
        {loading ? (
          <CircularProgress color="inherit" size={20} />
        ) : (
          <Typography
            variant="body2"
            sx={{ fontSize: "16px", color: "#FFFFFF" }}
          >
            Submit
          </Typography>
        )}
      </Button>
  
      <Button
        variant="outlined"
        color="primary"
        sx={{
          width: "200px",
          borderRadius: 15,
          height: "50px",
          textTransform: "capitalize",
          mb: "10px",
          borderColor: "#0056A2",
        }}
        onClick={handleResendOtp}
        disabled={isResending}
      >
        {isResending ? "Resending..." : "Resend OTP"}
      </Button>
  
      <Typography
        variant="body2"
        sx={{
          color: "#333333",
          textAlign: "center",
          marginBottom: "10px",
          maxWidth: "400px",
        }}
      >
        Back to{" "}
        <Typography
          onClick={() => onSelectTab("login")}
          component="span"
          sx={{
            color: "#0056A2",
            cursor: "pointer",
            textTransform: "capitalize",
            textDecoration: "underline",
          }}
        >
          Sign in
        </Typography>
      </Typography>
    </Box>
  </Box>
  
  );
};
export default RegisterOTP;
