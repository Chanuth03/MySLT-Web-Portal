import DeleteIcon from "@mui/icons-material/Delete";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import terminateUserProfile from "../../services/profile/terminateUserProfile";
import updateUserInfo from "../../services/profile/updateUserInfo";
import { useTranslation } from 'react-i18next';

const UserProfile = () => {
  const storedEmail = localStorage.getItem("username");
  const [altrContact, setAltrContact] = useState("");
  const [name, setName] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const { t } = useTranslation();

  const handleUpdate = async () => {
    if (!storedEmail) {
      console.error("User email not found");
      return;
    }
    const response = await updateUserInfo(storedEmail, altrContact, name);
    if (response) {
      setResponseMessage(response.message);
    }
  };

  const handleDelete = async () => {
    const response = await terminateUserProfile();
    if (response) {
      setResponseMessage("Profile successfully terminated.");
    } else {
      setResponseMessage("Failed to terminate the profile.");
    }
    setOpenDialog(false);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        backgroundColor: "#0a1e38",
        color: "white",
        padding: "24px",
        borderRadius: "16px",
        border: "1px solid #1e3a5c",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#0F3B7A",
          padding: "14px 22px",
          marginBottom: "20px",
          borderRadius: "12px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#102a4c",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "12px",
            border: "2px solid white",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="white"/>
          </svg>
        </Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "600",
            fontSize: "18px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {t('profile.my_profile')}
        </Typography>
      </Box>

      {/* Main Content */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
        {/* Profile Card - Left Side */}
        <Box
          sx={{
            flex: { xs: "1", md: "0 0 40%" },
            backgroundColor: "#0F3B7A",
            borderRadius: "16px",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0",
            minHeight: "400px",
          }}
        >
          {/* Top Curved Background with Avatar inside at bottom */}
          <Box
            sx={{
              width: "100%",
              height: "30%",
              backgroundColor: "#4b96ff",
              borderRadius: "0 0 50% 50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end", // Align items to the bottom
              paddingBottom: "10px", // Add some padding at the bottom
              position: "relative",
            }}
          >
            {/* Avatar moved inside the curved section */}
            <Avatar
              alt="User Avatar"
              sx={{
                width: "80px",
                height: "80px",
                backgroundColor: "#8cffcb",
                border: "3px solid white",
                zIndex: 2,
                marginBottom: "-7px", // Slightly overlap the curved boundary
              }}
            >
              {/* Placeholder for avatar image */}
            </Avatar>
          </Box>

          {/* User Info */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingTop: "40px", // Increased to account for avatar overlap
              textAlign: "center",
              flex: 1,
            }}
          >
            <Typography 
              variant="h6"
              sx={{
                fontWeight: "600",
                fontSize: "20px",
                marginTop: "-10px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              {storedEmail || "mysitweb@gmail.com"}
            </Typography>
            <Typography 
              variant="body2"
              sx={{
                color: "#a8b9d5",
                fontSize: "14px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              You are logged in as a EasyLogin
            </Typography>
          </Box>

          {/* Bottom Curved Background with Delete Icon */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "100px",
              height: "90px",
              backgroundColor: "#4b96ff",
              borderRadius: "100% 0 0 0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              aria-label="delete"
              onClick={() => setOpenDialog(true)}
              sx={{
                color: "white",
                position: "absolute",
                bottom: "15px",
                right: "15px",
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Form - Right Side */}
        <Box 
          sx={{ 
            flex: { xs: "1", md: "0 0 60%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Mobile Field */}
          <Typography
            variant="body1"
            sx={{
              marginBottom: "8px",
              fontWeight: "500",
              fontSize: "16px",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            {t('profile.enter_mobile')} :
          </Typography>
          <TextField
            fullWidth
           
            variant="outlined"
            value={altrContact}
            onChange={(e) => setAltrContact(e.target.value)}
            sx={{
              marginBottom: "20px",
              "& .MuiInputBase-root": {
                backgroundColor: "#102a4c",
                color: "white",
                borderRadius: "8px",
                height: "45px",
                 width: "450px"
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #355680",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#4b96ff",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#4b96ff",
              },
            }}
          />

          {/* Name Field */}
          <Typography
            variant="body1"
            sx={{
              marginBottom: "8px",
              fontWeight: "500",
              fontSize: "16px",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            {t('profile.name')} :
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              marginBottom: "30px",
              "& .MuiInputBase-root": {
                backgroundColor: "#102a4c",
                color: "white",
                borderRadius: "8px",
                height: "45px",
                width: "450px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #355680",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#4b96ff",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#4b96ff",
              },
            }}
          />

          {/* Update Button */}
          <Button
            variant="contained"
            onClick={handleUpdate}
            sx={{
              backgroundColor: "#15D151",
              color: "white",
              textTransform: "none",
              borderRadius: "30px",
              padding: "10px 36px",
              fontWeight: "600",
              fontSize: "16px",
              fontFamily: "Poppins, sans-serif",
              width: "fit-content",
              "&:hover": {
                backgroundColor: "#12b846",
              },
            }}
          >
             {t('profile.update')} 
          </Button>

          {responseMessage && (
            <Typography variant="body2" sx={{ color: "#4b96ff", marginTop: "16px" }}>
              {responseMessage}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          style: {
            backgroundColor: "#102a4c",
            color: "white",
            borderRadius: "12px",
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: "600" }}>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#8fa5c0" }}>
            Are you sure you want to delete your profile? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: "#3d7cc9" }}>
            No
          </Button>
          <Button onClick={handleDelete} sx={{ color: "#ff5e5e" }}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserProfile;