import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import WatermarkLogo from "../../assets/Images/watermarklogo.png";
import fetchAccountDetails from "../../services/fetchAccountDetails";
import removeAccount from "../../services/profile/removeAccount";
import AddAccountForm from "../AddAccountForm"; 
import UserIcon from "../../assets/Manage Profile.png";
import { useTranslation } from 'react-i18next';

const PhoneNumberList: React.FC = () => {
  const [phoneNumbers, setPhoneNumbers] = useState<
    { phoneNumber: string; accountNo: string }[]
  >([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState<string | null>(
    null
  );
  const [selectedAccountNo, setSelectedAccountNo] = useState<string | null>(
    null
  );
  const [showAddForm, setShowAddForm] = useState<boolean>(false); // State to toggle AddAccountForm popup
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const getAccountDetails = async () => {
      const accountData = await fetchAccountDetails();
      if (accountData) {
        const phoneNumbersList = accountData.map((item) => ({
          phoneNumber: item.telephoneno,
          accountNo: item.accountno,
        }));
        setPhoneNumbers(phoneNumbersList);
      }
    };

    getAccountDetails();
  }, []);

  const handleDeleteClick = (accountNo: string, phoneNo: string) => {
    setSelectedAccountNo(accountNo);
    setSelectedPhoneNumber(phoneNo);
    setOpenDialog(true);
  };

  const handleDeleteConfirmation = async (confirm: boolean) => {
    if (confirm && selectedAccountNo && selectedPhoneNumber) {
      const response = await removeAccount(selectedAccountNo, selectedPhoneNumber);
      if (response) {
        navigate("/login");
      }
    }
    setOpenDialog(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#082444",
        borderRadius: 4,
        padding: 0,
        boxShadow: 3,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#1a3564",
          padding: "12px 24px",
          width:"855px",
          marginLeft:"25px",
          marginTop:"10px",
          borderRadius: 2,
          // borderTopLeftRadius: 16,
          // borderTopRightRadius: 16,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mr: 2,
          }}
        >
          <Box
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: "50%",
            }}
          >
           <Typography sx={{ fontSize: 24, color: "white" }}>
  <img 
    src={UserIcon}
    alt="User Icon" 
    style={{ width: 30, height: 30 }} 
  />
</Typography>

          </Box>
        </Box>
        <Typography
          variant="h6"
          sx={{
            color: "white",
            fontWeight: "bold",
            fontSize: "20px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
           {t('profile.manage_connection')} 
        </Typography>
      </Box>

      {/* Phone Numbers List */}
      <Box sx={{ padding: "24px", flex: 1 }}>
        {phoneNumbers.map(({ phoneNumber, accountNo }, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              padding: "16px 24px",
              marginBottom: 2,
              backgroundColor: "#385E95",
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: "white", fontWeight: "bold", fontSize: "18px" }}
            >
              {phoneNumber}
            </Typography>
            <IconButton
              onClick={() => handleDeleteClick(accountNo, phoneNumber)}
              sx={{ color: "white" }}
            >
              <DeleteIcon fontSize="medium" />
            </IconButton>
          </Box>
        ))}

        {/* Add Account Button */}
        {phoneNumbers.length < 4 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              variant="contained"
              onClick={() => setShowAddForm(true)}
              sx={{
                backgroundColor: "#3f80ce",
                color: "white",
                fontWeight: "bold",
                borderRadius: 8,
                padding: "12px 24px",
                fontSize: "16px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#2c6cb3",
                },
              }}
            >
               {t('addacc.addbutton')}
            </Button>
          </Box>
        )}
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography>Do you want to remove this account?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDeleteConfirmation(false)} color="primary">
            No
          </Button>
          <Button onClick={() => handleDeleteConfirmation(true)} color="error">
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Account Popup */}
      <Dialog
        open={showAddForm}
        onClose={() => setShowAddForm(false)}
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: "hidden",
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
      >
        <AddAccountForm />
      </Dialog>

      {/* Watermark
      <Box sx={{ position: "absolute", right: "2%", bottom: "2%" }}>
        <img
          src={WatermarkLogo}
          alt="Watermark Logo"
          style={{ height: "auto" }}
        />
      </Box> */}
    </Box>
  );
};

export default PhoneNumberList;