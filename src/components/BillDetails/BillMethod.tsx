import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import registerSmartBill from "../../services/billMethod/registerSmartBill";
import useStore from "../../services/useAppStore"; // Import the Zustand store
import { useTranslation } from 'react-i18next';

interface BillMethodProps {
  selectedTab: string;
}

const BillMethod: React.FC<BillMethodProps> = ({ selectedTab }) => {
  // Access Zustand store values
  const { billMethodDataBundle, selectedTelephone, selectedAccountNo } = useStore();

  // State for response messages and dialog visibility
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  // Get stored email from localStorage
  const storedEmail = localStorage.getItem("username");
  const { t } = useTranslation();

  // Log state values for debugging
  useEffect(() => {
    if (billMethodDataBundle) {
      console.log("billMethodDataBundle changed:", billMethodDataBundle);
      console.log("Possible bill mode list:", billMethodDataBundle.possiblebillmodelist);
      console.log("Bill Method Data Bundle eContact:", billMethodDataBundle?.email);
    }
    console.log("Selected Telephone:", selectedTelephone);
    console.log("Selected Account No:", selectedAccountNo);
  }, [billMethodDataBundle, selectedTelephone, selectedAccountNo]);

  // Function to handle smart bill registration
  const handleSmartBillRegistration = async (method: any) => {
    try {
      const tpNo = selectedTelephone;
      const accountNo = selectedAccountNo;
      const econtact = billMethodDataBundle?.email || "";
      const billCode = method.bill_code;

      const response = await registerSmartBill(tpNo, accountNo, econtact, billCode);

      // Extract response message
      const responseMessage =
        response?.dataBundle?.errorShow || // Message inside nested `dataBundle.errorShow`
        response?.errorShow || // Top-level `errorShow`
        "An unexpected error occurred. Please try again later.";

      setResponseMessage(responseMessage); // Set the message for display
      setDialogOpen(true); // Open the dialog box
    } catch (error) {
      console.error("Registration error:", error);
      setResponseMessage("An unexpected error occurred. Please try again later.");
      setDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // Render no privilege message if bill_code is "24"
  if (billMethodDataBundle?.bill_code === "24") {
    return (
      <Box p={1} textAlign="center" sx={{ mt: 4 }}>
        <Box
          sx={{
            color: "#0056A2",
            backgroundColor: "#E3F2FD",
            padding: 2,
            borderRadius: 2,
            maxWidth: 400,
            margin: "0 auto",
            marginTop: 10,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {t('bill.no_privilege')}
          </Typography>
          <Typography variant="body1">
            {/* You do not have permission to change the bill method */}
          {t('bill.no_permission')}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box p={1} textAlign="center">
      {billMethodDataBundle?.bill_code === "" ? (
        <Box sx={{ mt: 4, color: "#FF0000", fontWeight: "bold" }}>
          <Typography variant="h6">No privilege</Typography>
          <Typography variant="body1">
            {t('bill.no_permission')}
          </Typography>
        </Box>
      ) : (
        selectedTab === "Bill Methods" && (
          <Box
            sx={{
              color: "#FFFFFF",
              px: 2,
              borderRadius: "8px",
              textAlign: "left",
              width: "100%",
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              sx={{ width: "95%", padding: 1 }}
            >
              {/* Current Bill Method Section */}
              <Box
                sx={{
                  width: "100%",
                  backgroundColor: "#0056A2",
                  maxWidth: "1000px",
                  color: "#FFFFFF",
                  borderRadius: 2,
                  padding: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                     {t('bill.current_method')}
                  </Typography>
                  <Typography variant="body1">
                    {billMethodDataBundle?.bill_code_desc || "N/A"} : {storedEmail || "N/A"}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    color: "#ffffff",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                >
                  <Typography variant="body2">{t('bill.edit')}</Typography>
                </Button>
              </Box>

              {/* Other Methods Section */}
              <Box sx={{ width: "100%", mt: 3, textAlign: "left" }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    mt: -2,
                    mb: 1,
                    color: "#fff",
                  }}
                >
                   {t('bill.other_methods')}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    overflowX: "auto",
                    gap: 2,
                    py: 1.5,
                    backgroundColor: "#0A1929",
                    borderRadius: 2,
                    padding: 2,
                    "&::-webkit-scrollbar": {
                      height: 6,
                    },
                    "&::-webkit-scrollbar-track": {
                      backgroundColor: "#0e2948",
                      borderRadius: 3,
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#2196f3",
                      borderRadius: 3,
                    },
                  }}
                >
                  {billMethodDataBundle.possiblebillmodelist?.map(
                    (
                      method: { bill_code_desc: string; bill_code: string },
                      index: React.Key | null | undefined
                    ) => (
                      <Box
                        key={index}
                        sx={{
                          background: "linear-gradient(145deg, #102a43, #0d223a)",
                          borderRadius: 2,
                          padding: 2,
                          minWidth: 364,
                          maxWidth: 400,
                          flex: "0 0 auto",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                          border: "1px solid #143456",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 6px 16px rgba(0, 0, 0, 0.4)",
                            borderColor: "#1c4b7c",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            height: "100%",
                          }}
                        >
                          <Box>
                            {/* Icon + Title in one row */}
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  backgroundColor: "rgba(33, 150, 243, 0.15)",
                                  borderRadius: "50%",
                                  width: 32,
                                  height: 32,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  mr: 1.5,
                                }}
                              >
                                {method.bill_code_desc.toLowerCase().includes("sms") ? (
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17 2H7C5.89543 2 5 2.89543 5 4V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V4C19 2.89543 18.1046 2 17 2Z" stroke="#2196f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 18H12.01" stroke="#2196f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                ) : method.bill_code_desc.toLowerCase().includes("email") ? (
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#2196f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M22 6L12 13L2 6" stroke="#2196f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                ) : (
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H8" stroke="#2196f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M15 2H9C8.44772 2 8 2.44772 8 3V5C8 5.55228 8.44772 6 9 6H15C15.5523 6 16 5.55228 16 5V3C16 2.44772 15.5523 2 15 2Z" stroke="#2196f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                )}
                              </Box>
                              <Typography variant="subtitle1" fontWeight="bold" color="#e3f2fd">
                                {method.bill_code_desc}
                              </Typography>
                            </Box>
                            
                            <Typography 
                              variant="body2" 
                              color="#90caf9" 
                              sx={{ 
                                mb: 1.5,
                                fontSize: "0.875rem"
                              }}
                            >
                              {t('bill.get_via')} {method.bill_code_desc}
                            </Typography>
                            
                            <FormControlLabel
                              sx={{
                                margin: 0,
                                ".MuiFormControlLabel-label": {
                                  fontSize: "0.75rem"
                                }
                              }}
                              control={
                                <Checkbox 
                                  size="small"
                                  sx={{
                                    padding: "2px",
                                    color: "#5090d3",
                                    '&.Mui-checked': {
                                      color: "#64b5f6",
                                    },
                                  }}
                                />
                              }
                              label={
                                <Typography variant="caption" sx={{ color: "#bbdefb" }}>
                                  {t('bill.agree_terms')}
                                </Typography>
                              }
                            />
                          </Box>
                          
                          <Button
                            variant="contained"
                            size="small"
                            fullWidth
                            sx={{
                              mt: 1.5,
                              backgroundColor: "#1976d2",
                              color: "#ffffff",
                              fontWeight: "bold",
                              borderRadius: 1.5,
                              py: 0.75,
                              textTransform: "none",
                              fontSize: "0.8125rem",
                              boxShadow: "0 2px 8px rgba(33, 150, 243, 0.3)",
                              "&:hover": {
                                backgroundColor: "#1565c0",
                              },
                            }}
                            onClick={() => handleSmartBillRegistration(method)}
                          >
                            {t('bill.subscribe')}
                          </Button>
                        </Box>
                      </Box>
                    )
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        )
      )}
      {/* Dialog for displaying response messages */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Notification</DialogTitle>
        <DialogContent>
          <DialogContentText>{responseMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BillMethod;
