import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
// import { textFieldStyles } from "./LogIn";
import { MuiOtpInput } from "mui-one-time-password-input";
import verifyOTP from "../../services/changePassword/verifyOTP";
import useStore from "../../services/useAppStore";

interface OTPProps {
  onSelectTab: (tab: string) => void;
}

const OTPPage = ({ onSelectTab }: OTPProps) => {
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const { otpState } = useStore();

  const handleChange = (newValue: string) => {
    setOtp(newValue);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const userId = otpState?.userName;
    if (!userId) {
      console.error("No user ID found in OTP state");
      return;
    }
    await verifyOTP(userId, newPassword, otp);
    setLoading(false);
    onSelectTab("login");
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
      }}
    >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontFamily: "Poppins, sans-serif",
              color: "#0056A2",
              fontSize: "2.5rem",
              fontWeight: "bold",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            Forgot Password ?
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
            Enter 6 digits OTP code reset your profile password.
          </Typography>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              mb: "30px",
            }}
          >
            <Typography variant="body2" sx={{ color: " #A4A4AA", mb: 2 }}>
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
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              mb: "10px",
            }}
          >
            <Typography variant="body2" sx={{ color: " #A4A4AA" }}>
              New Password
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
              sx={{
                // ...textFieldStyles,
              }}
              type={showPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              value={newPassword}
              placeholder="Enter your new password"
              onChange={(e) => setNewPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Typography variant="body2" sx={{ color: "#0056A2", mb: "30px" }}>
            minimum 6 characters {/*  */}
          </Typography>
          <Button
            onClick={handleSubmit}
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
          <Typography
            variant="body2"
            sx={{
              color: "#333333",
              textAlign: "center",
              marginBottom: "20px",
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

export default OTPPage;
