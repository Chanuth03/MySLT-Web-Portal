import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
// import { textFieldStyle } from "../assets/Themes/CommonStyles";
import addAccountPrepaid from "../services/addAccount/addAccountPrepaid";
import addAccountRequest from "../services/addAccount/addAccountRequest";
import vasAccountRequest from "../services/addAccount/vasAccountRequest";
import { useTranslation } from 'react-i18next';

const AddAccountForm: React.FC = () => {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);
  const [postPaid, setPostPaid] = useState(true);
  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState({
    telephone: "",
    accountNumber: "",
    nationalId: "",
    broadbandId: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Data: ", formData);

    if (tabValue === 0 && !postPaid) {
      try {
        const response = await addAccountPrepaid(formData.telephone, formData.nationalId);
        console.log("API Response: ", response);

        if (response.errorShow) {
          setErrorMessage(response.errorShow);
          setOpenDialog(true);
        }
      } catch (error) {
        console.error("API Request failed:", error);
      }
    }

    if (tabValue === 0 && postPaid) {
      try {
        const response = await addAccountRequest(
          formData.accountNumber,
          formData.telephone,
          formData.nationalId
        );
        console.log("API Response: ", response);

        if (response.errorShow) {
          setErrorMessage(response.errorShow);
          setOpenDialog(true);
        }
      } catch (error) {
        console.error("API Request failed:", error);
      }
    }

    if (tabValue === 1) {
      try {
        const response = await vasAccountRequest(formData.broadbandId, formData.password);
        console.log("API Response: ", response);

        if (response.errorShow) {
          setErrorMessage(response.errorShow);
          setOpenDialog(true);
        }
      } catch (error) {
        console.error("API Request failed:", error);
      }
    }
  };

  const handleClose = () => {
    setShowForm(false);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  if (!showForm) return null;

  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "#0a1e3c",
        color: "white",
        borderRadius: 3,
        p: 2,
        maxWidth: 700,
        mx: "auto",
        minHeight: "450px",
        boxShadow: 3,
        border: "2px solid #1e407a",
      }}
    >
      {/* Header with Icon and Text */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 30,
            height: 30,
            borderRadius: "50%",
            backgroundColor: "#1a3564",
            mr: 1.5,
          }}
        >
          <Typography sx={{ fontSize: 16, color: "white" }}>👤+</Typography>
        </Box>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "white", fontWeight: "bold" ,fontFamily: "Poppins, sans-serif",}}>
          {t('addacc.addaccount')} 
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            color: "white",
            padding: 0.5,
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Tabs */}
      <Tabs
        value={tabValue}
        onChange={(_, newValue: number) => setTabValue(newValue)}
        sx={{
          mb: 2.5,
          "& .MuiTabs-indicator": { backgroundColor: "transparent" },
          "& .MuiTab-root": {
            color: "#5d7397",
            fontSize: "16px",
            fontWeight: "bold",
            fontFamily: "Poppins, sans-serif",
            mr: 3,
            p: 0,
            minWidth: "unset",
          },
          "& .Mui-selected": { color: "white !important" },
        }}
        
      >
        
        <Tab label= {<>{t('addacc.telephone_n')}</>} />
        <Tab label= {<>{t('addacc.broadband')}</>} />
        
        

      </Tabs>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {tabValue === 0 ? (
          <>
            {/* Postpaid/Prepaid Radio Buttons */}
            <FormControl component="fieldset" sx={{ mb: 2, display: "flex", flexDirection: "row" }}>
              <RadioGroup
                row
                value={postPaid ? "postpaid" : "prepaid"}
                onChange={(e) => setPostPaid(e.target.value === "postpaid")}
              >
                <FormControlLabel
                  value="postpaid"
                  control={
                    <Radio
                      sx={{
                        color: "#5d7397",
                        padding: "6px",
                        "&.Mui-checked": { color: "white" },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ color: "white", fontSize: "14px", ml: -1 ,fontFamily: "Poppins, sans-serif",}}>
                      {t('addacc.postpaid')}
                    </Typography>
                  }
                  sx={{ mr: 6 }}
                />
                <FormControlLabel
                  value="prepaid"
                  control={
                    <Radio
                      sx={{
                        color: "#5d7397",
                        padding: "6px",
                        "&.Mui-checked": { color: "white" },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ color: "white", fontSize: "14px", ml: -1 ,fontFamily: "Poppins, sans-serif",}}>
                      {t('addacc.prepaid')}
                    </Typography>
                  }
                />
              </RadioGroup>
            </FormControl>

            {/* Telephone Fields */}
            <Typography
              variant="body2"
              sx={{
                color: "white",
                mb: 1,
                fontSize: "14px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              {t('addacc.telephone')} :
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              required
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  backgroundColor: "#132c53",
                  borderRadius: "6px",
                  height: "45px",
                  "& fieldset": {
                    borderColor: "#1a3564",
                    borderWidth: 1.5,
                  },
                  "&:hover fieldset": {
                    borderColor: "#1a3564",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1a3564",
                  },
                },
              }}
            />

            {/* Conditional Rendering: Hide SLT Account Number if Prepaid */}
            {postPaid && (
              <>
                <Typography
                  variant="body2"
                  sx={{
                    color: "white",
                    mb: 1,
                    fontSize: "14px",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {t('addacc.accountNumber')}
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  required
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      color: "white",
                      backgroundColor: "#132c53",
                      borderRadius: "6px",
                      height: "45px",
                      "& fieldset": {
                        borderColor: "#1a3564",
                        borderWidth: 1.5,
                      },
                      "&:hover fieldset": {
                        borderColor: "#1a3564",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#1a3564",
                      },
                    },
                  }}
                />
              </>
            )}
            
            <Typography
              variant="body2"
              sx={{
                color: "white",
                mb: 1,
                fontSize: "14px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
             {t('addacc.nationalId')}
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              required
              name="nationalId"
              value={formData.nationalId}
              onChange={handleChange}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  backgroundColor: "#132c53",
                  borderRadius: "6px",
                  height: "45px",
                  "& fieldset": {
                    borderColor: "#1a3564",
                    borderWidth: 1.5,
                  },
                  "&:hover fieldset": {
                    borderColor: "#1a3564",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1a3564",
                  },
                },
              }}
            />
          </>
        ) : (
          <>
            {/* Broadband Fields */}
            <Typography
              variant="body2"
              sx={{
                color: "white",
                mb: 1,
                fontSize: "14px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              {t('addacc.broadbandId')} 
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              required
              name="broadbandId"
              value={formData.broadbandId}
              onChange={handleChange}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  backgroundColor: "#132c53",
                  borderRadius: "6px",
                  height: "45px",
                  "& fieldset": {
                    borderColor: "#1a3564",
                    borderWidth: 1.5,
                  },
                  "&:hover fieldset": {
                    borderColor: "#1a3564",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1a3564",
                  },
                },
              }}
            />

            <Typography
              variant="body2"
              sx={{
                color: "white",
                mb: 1,
                fontSize: "14px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              {t('addacc.password')} 
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="password"
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  backgroundColor: "#132c53",
                  borderRadius: "6px",
                  height: "45px",
                  "& fieldset": {
                    borderColor: "#1a3564",
                    borderWidth: 1.5,
                  },
                  "&:hover fieldset": {
                    borderColor: "#1a3564",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1a3564",
                  },
                },
              }}
            />
          </>
        )}

        {/* Submit Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#15D151",
              color: "white",
              fontWeight: "bold",
              borderRadius: "20px",
              fontSize: "14px",
              padding: "6px 24px",
              textTransform: "uppercase",
              fontFamily: "Poppins, sans-serif",
              "&:hover": { backgroundColor: "#5ad072" },
            }}
          >
            {t('addacc.submit')}
          </Button>
        </Box>
      </form>

      {/* Dialog to show error message */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{errorMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddAccountForm;