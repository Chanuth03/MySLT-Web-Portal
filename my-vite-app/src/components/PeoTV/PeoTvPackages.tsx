import { useEffect, useState } from "react";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import useStore from "../../services/useAppStore";

const PeoTvPackages = () => {
  const { serviceDetails, setLeftMenuItem, selectedNavbarItem } = useStore();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!serviceDetails?.listofPEOService?.length) {
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
            No PEO TV Connection
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ fontSize: "16px", color: "#0056A2" }}>
            Seems like you don't have a PEO TV connection. Let's request one!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button sx={buttonStyle} onClick={handleCloseAlert} color="primary">
            Close
          </Button>
          <Button
            sx={buttonStyle}
            onClick={() => {
              handleCloseAlert();
              setLeftMenuItem("New Services");
            }}
            color="primary"
            autoFocus
          >
            Request Now
          </Button>
        </DialogActions>
      </Dialog>

      {/* Main Content Box */}
      <Box sx={containerStyle}>
        <Box sx={contentBoxStyle}>
          {serviceDetails?.listofPEOService && serviceDetails.listofPEOService.length > 0 ? (
            serviceDetails?.listofPEOService?.map((packageItem, index) => (
              <Typography key={index} variant="body2" sx={textStyle}>
                {`${packageItem.packageName} - ${packageItem.serviceStatus}`}
              </Typography>
            ))
          ) : (
            <Typography variant="body2" sx={{ ...textStyle, fontSize: "24px" }}>
              No Packages Available
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

export default PeoTvPackages;