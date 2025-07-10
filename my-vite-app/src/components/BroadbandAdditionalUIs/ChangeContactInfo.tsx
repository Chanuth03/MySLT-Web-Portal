import { Box, Button, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress } from "@mui/material";
import { useState } from "react";
import useStore from "../../services/useAppStore";
import updateContact from "../../services/profile/updateContact";
import { useTranslation } from 'react-i18next';

const ChangeContactForm = () => {
  const { serviceDetails } = useStore();
  const serviceID = serviceDetails?.listofBBService[0]?.serviceID;
  const { t } = useTranslation();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!serviceID || !fullName || !email || !mobile) {
      setDialogMessage("Please fill all the fields correctly");
      setDialogOpen(true);
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await updateContact(serviceID, email, mobile, fullName);
      if (response) {
        setDialogMessage("Contact information updated successfully");
        setIsSuccess(true);
      } else {
        setDialogMessage("Failed to update contact information. Please try again.");
        setIsSuccess(false);
      }
    } catch (error) {
      setDialogMessage("Error occurred during update. Please try again later.");
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
      setDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(6, 29, 49, 0.74)",
        color: "white",
        borderRadius: "16px",
        width: "100%",
        maxWidth: "700px",
        margin: "0 auto",
        overflow: "hidden",
        position: "relative",
        transition: "all 0.3s ease",
        
      }}
    >
      {/* Accent top bar */}
      <Box 
        sx={{ 
          height: "6px", 
          width: "100%", 
          backgroundColor: "#3498db" 
        }} 
      />
      
      <Box sx={{ p: 4 }}>
        <Typography
          variant="h5"
          sx={{ 
            fontSize: "26px", 
            fontWeight: "700", 
            mb: 4,
            textAlign: "center",
            color: "#FFF"
          }}
        >
         {t('changedetails.update_info')}
        </Typography>

        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3.5,
            width: "100%",
          }}
        >
          <TextField
            fullWidth
            label={t('changedetails.full_name')}
            variant="outlined"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder={t('changedetails.enter_full_name')}
            required
            InputProps={{
              sx: {
                borderRadius: "12px",
                backgroundColor: "rgba(30, 41, 59, 0.6)",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "rgba(30, 41, 59, 0.8)",
                },
              }
            }}
            InputLabelProps={{
              sx: { color: "rgba(255, 255, 255, 0.7)" }
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(148, 163, 184, 0.2)" },
                "&:hover fieldset": { borderColor: "rgba(148, 163, 184, 0.4)" },
                "&.Mui-focused fieldset": { borderColor: "#3498db" }
              },
              "& .MuiInputBase-input": {
                color: "white",
                py: 1.5
              }
            }}
          />

          <TextField
            fullWidth
            label={t('changedetails.mobile')}
            variant="outlined"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder={t('changedetails.enter_mobile')}
            required
            InputProps={{
              sx: {
                borderRadius: "12px",
                backgroundColor: "rgba(30, 41, 59, 0.6)",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "rgba(30, 41, 59, 0.8)",
                },
              }
            }}
            InputLabelProps={{
              sx: { color: "rgba(255, 255, 255, 0.7)" }
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(148, 163, 184, 0.2)" },
                "&:hover fieldset": { borderColor: "rgba(148, 163, 184, 0.4)" },
                "&.Mui-focused fieldset": { borderColor: "#3498db" }
              },
              "& .MuiInputBase-input": {
                color: "white",
                py: 1.5
              }
            }}
          />

          <TextField
            fullWidth
            label={t('changedetails.email')}
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('changedetails.enter_email')}
            required
            InputProps={{
              sx: {
                borderRadius: "12px",
                backgroundColor: "rgba(30, 41, 59, 0.6)",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "rgba(30, 41, 59, 0.8)",
                },
              }
            }}
            InputLabelProps={{
              sx: { color: "rgba(255, 255, 255, 0.7)" }
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(148, 163, 184, 0.2)" },
                "&:hover fieldset": { borderColor: "rgba(148, 163, 184, 0.4)" },
                "&.Mui-focused fieldset": { borderColor: "#3498db" }
              },
              "& .MuiInputBase-input": {
                color: "white",
                py: 1.5
              }
            }}
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isLoading}
            sx={{
              mt: 2,
              py: 1.5,
              borderRadius: "12px",
              textTransform: "none",
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "0.5px",
              backgroundColor: "#3498db",
              transition: "all 0.3s ease",
              border: "none",
              "&:hover": {
                backgroundColor: "#2980b9",
                transform: "translateY(-2px)"
              },
              "&:active": {
                transform: "translateY(0)"
              },
              "&.Mui-disabled": {
                backgroundColor: "#64748b",
                color: "rgba(255, 255, 255, 0.7)"
              }
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t('changedetails.update_info')
            )}
          </Button>
        </Box>
      </Box>

      {/* Dialog box for response messages */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            color: "white",
            minWidth: "350px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            borderBottom: "1px solid rgba(148, 163, 184, 0.2)",
            py: 2,
            px: 3,
          }}>
          <Typography variant="h6" component="div" sx={{ 
            fontWeight: 600,
            color: isSuccess ? "#2dd4bf" : "#f43f5e",
            display: "flex",
            alignItems: "center",
            gap: 1
          }}>
            {isSuccess ? "Success" : "Notification"}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 3, mt: 2 }}>
          <Typography variant="body1">{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, justifyContent: "center" }}>
          <Button 
            onClick={handleCloseDialog} 
            autoFocus
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              px: 4,
              py: 1,
              backgroundColor: "#3498db",
              color: "white",
              "&:hover": {
                backgroundColor: "#2980b9",
              }
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ChangeContactForm;