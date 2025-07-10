import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import ErrorIcon from '@mui/icons-material/Error';
import { useTranslation } from 'react-i18next';

// Import the API function
import createFaultRequest from "../services/createFaultRequest";
import useStore from "../services/useAppStore";
import headsetIcon from "../assets/Group.png"; // Add this icon to your project

interface AddComplaintsProps {
  telephoneNo: string;
}

const AddComplaints: React.FC<AddComplaintsProps> = ({ telephoneNo }) => {
  const { t } = useTranslation();
  const { serviceDetails } = useStore(); // Fetch serviceDetails from the store
  const serviceID = serviceDetails?.listofBBService[0]?.serviceID; // Get the first serviceID dynamically
  const serviceStatus = serviceDetails?.listofBBService[0]?.serviceStatus; // Get serviceStatus dynamically
  
  const [serviceOption, setServiceOption] = useState("All");
  const [contactNo, setContactNo] = useState("");
  const [faultDescription, setFaultDescription] = useState("");
  const [status, _setStatus] = useState(serviceStatus || "");  // Default to serviceStatus if available

  // Dialog States
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true); // Success or failure flag
  const [dialogMessage, setDialogMessage] = useState(""); // Message to show in dialog

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleSubmit = async () => {
    // Log form data before the API call
    console.log("Form Data before API call :", {
      serviceID: serviceID || "undefined",
      telephoneNo: telephoneNo || "undefined",
      serviceOption: serviceOption || "undefined",
      contactNo: contactNo || "undefined",
      faultDescription: faultDescription || "undefined",
      status: status || "undefined",
    });
  
    // Validate required fields
    if (!serviceID || !telephoneNo || !contactNo || !faultDescription || !status) {
      console.error("Validation Error: Missing required fields.");
      setDialogMessage("Please fill in all required fields.");
      setIsSuccess(false);
      setIsDialogOpen(true);
      return;
    }
  
    // Make the API call
    try {
      const response = await createFaultRequest(
        serviceID,
        telephoneNo,
        serviceOption,
        contactNo,
        faultDescription,
        status
      );
  
      if (response?.isSuccess) {
        console.log("Fault request created successfully:", response);
        setDialogMessage("Complaint submitted successfully!");
        setIsSuccess(true);
      } else {
        console.error("Error creating fault request:", response?.errorMessage || "Unknown error");
        setDialogMessage(response?.errorMessage || "Unknown error occurred");
        setIsSuccess(false);
      }
  
      setIsDialogOpen(true); // Open the dialog after API response
    } catch (error) {
      console.error("Exception during API call:", error);
      setDialogMessage("An unexpected error occurred.");
      setIsSuccess(false);
      setIsDialogOpen(true);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(6, 29, 49, 0.74)", // Dark blue background like in the image
        color: "#FFFFFF",
        padding: 3,
        borderRadius: "10px",
        height: "auto",
        width: "100%",
        gap:2,
      }}
    >
      {/* Header Section with headset icon */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#1E3A8A", // Dark blue background for the header
          padding: "12px 20px",
          borderRadius: "8px",
          marginBottom: 3,
        }}
      >
        <img
          src={headsetIcon}
          alt="Headset"
          style={{ width: "25px", height: "25px", marginRight: "12px" }}
        />
        <Typography
          variant="h6"
          sx={{
            color: "#FFFFFF",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          {t('complaints.complaint')}
        </Typography>
      </Box>

      {/* Form Content */}
      <Grid container spacing={3}>
        {/* Left Column - Inputs */}
        <Grid item xs={12} sm={6}>
          <Box sx={{ marginBottom: "20px" }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: "#FFFFFF",
                marginBottom: "8px",
              }}
            >
              {t('complaints.serviceType')} :
            </Typography>
            <TextField
              select
              fullWidth
              variant="outlined"
              size="small"
              sx={{
                backgroundColor: "#182F6E",
                borderRadius: "5px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#2D4B7E",
                  },
                  "&:hover fieldset": {
                    borderColor: "#3D5C8E",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#4D6C9E",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "#FFFFFF",
                },
                "& .MuiSvgIcon-root": {
                  color: "#FFFFFF",
                },
              }}
              value={serviceOption}
              onChange={(e) => setServiceOption(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Broadband">Broadband</MenuItem>
              <MenuItem value="PeoTV">PeoTV</MenuItem>
              <MenuItem value="Voice">Voice</MenuItem>
            </TextField>
          </Box>

          <Box sx={{ marginBottom: "20px" }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: "#FFFFFF",
                marginBottom: "8px",
              }}
            >
               {t('complaints.contactNumber')} :
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="070XXXXXX"
              sx={{
                backgroundColor: "#182F6E",
                borderRadius: "5px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#2D4B7E",
                  },
                  "&:hover fieldset": {
                    borderColor: "#3D5C8E",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#4D6C9E",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "#FFFFFF",
                },
              }}
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
            />
          </Box>

          <Box sx={{ marginBottom: "20px" }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: "#FFFFFF",
                marginBottom: "8px",
              }}
            >
              {t('complaints.complaintDescription')} :
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              sx={{
                backgroundColor: "#182F6E",
                borderRadius: "5px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#2D4B7E",
                  },
                  "&:hover fieldset": {
                    borderColor: "#3D5C8E",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#4D6C9E",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "#FFFFFF",
                },
              }}
              value={faultDescription}
              onChange={(e) => setFaultDescription(e.target.value)}
            />
          </Box>
        </Grid>

        {/* Right Column - Map Section */}
        <Grid item xs={12} sm={6}>
          <Box sx={{ marginBottom: "16px" }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: "#FFFFFF",
                marginBottom: "8px",
              }}
            >
              {t('complaints.selectServiceLocation')} : 
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter a location.."
              variant="outlined"
              size="small"
              sx={{
                backgroundColor: "#182F6E",
                borderRadius: "5px",
                marginBottom: "10px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#2D4B7E",
                  },
                  "&:hover fieldset": {
                    borderColor: "#3D5C8E",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#4D6C9E",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "#FFFFFF",
                },
              }}
            />
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126744.08449728298!2d79.81216954042364!3d6.927078400000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259404958c1f9%3A0x4fdf4c34fd426a0f!2sColombo!5e0!3m2!1sen!2slk!4v1699056801524!5m2!1sen!2slk&zoom=13&disableDefaultUI=true&mapTypeControl=false"
              style={{
                border: 0,
                width: "100%",
                height: "300px",
                borderRadius: "8px",
              }}
              allowFullScreen
            ></iframe>
          </Box>
        </Grid>
      </Grid>

      {/* Submit Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#3B82F6",
            color: "#FFFFFF",
            borderRadius: "40px",
            textTransform: "none",
            padding: "10px 24px",
            fontWeight: "bold",
            fontSize: "16px",
            "&:hover": {
              backgroundColor: "#2563EB",
            },
          }}
          onClick={handleSubmit}
        >
          {t('complaints.submitYourComplaint')}
        </Button>
      </Box>
{/* Dialog for displaying API messages */}
<Dialog open={isDialogOpen} onClose={handleDialogClose}>
  <DialogTitle 
    sx={{ 
      textAlign: "center", 
      color: isSuccess ? "#4caf50" : "#f44336",
      fontWeight: "bold",
      padding: "16px 24px 8px"
    }}
  >
    {isSuccess ? "Success" : "Error"}
  </DialogTitle>
  <DialogContent sx={{ padding: "0px 24px 8px" }}>
    <DialogContentText
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "400px",
        minHeight: "120px",
        color: isSuccess ? "#4caf50" : "#f44336",
        fontWeight: "medium",
        fontSize: "14px",
        textAlign: "center",
        padding: "12px 0",
      }}
    >
      {/* Icon with blinking animation for both success and error */}
      <Box
        sx={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: isSuccess ? "#4CD137" : "#f44336", // Green for success, red for error
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
          position: "relative",
          top: "-10px", // Slightly overlapping with the top of the card
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
            }
          }
        }}
      >
        {isSuccess ? (
          <Typography sx={{ color: "white", fontSize: "30px", fontWeight: "bold" }}>✓</Typography>
        ) : (
          <Typography sx={{ color: "white", fontSize: "30px", fontWeight: "bold" }}>×</Typography>
        )}
      </Box>
      
      <Box sx={{ marginBottom: "16px" }}>
        {dialogMessage}
      </Box>
    </DialogContentText>
  </DialogContent>
  <DialogActions sx={{ padding: "8px 16px 16px", justifyContent: "center" }}>
    <Button 
      onClick={handleDialogClose} 
      autoFocus
      variant="contained"
      sx={{
        backgroundColor: isSuccess ? "#4caf50" : "#f44336",
        color: "white",
        '&:hover': {
          backgroundColor: isSuccess ? "#3d8b40" : "#d32f2f",
        },
        minWidth: "120px",
        borderRadius: "20px"
      }}
    >
      Close
    </Button>
  </DialogActions>
</Dialog>
    </Box>
  );
};

export default AddComplaints;
