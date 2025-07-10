import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
// import WatermarkLogo from "../assets/Images/watermarklogo.png";
import setHappyDay from "../services/postpaid/setHappyDay"; // Import API function
import useStore from "../services/useAppStore"; // Import useStore


const HappyDay: React.FC = () => {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false); // To manage dialog success/error state

  const { serviceDetails } = useStore();
  const serviceID = serviceDetails?.listofBBService[0]?.serviceID;

  console.log("Service ID:", serviceID); // Log serviceID to the console

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  // const handleDialogOpen = () => {
  //   setDialogOpen(true);
  // };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSetHappyDay = async () => {
    if (!serviceID || !selectedDate) {
      alert(t("happyDay.alerts.missingServiceOrDate"));
      return;
    }

    const formattedDate = selectedDate.format("YYYY-MM-DD");
    const response = await setHappyDay(serviceID, formattedDate);

    if (response?.isSuccess) {
      setApiResponse(response.dataBundle?.message || t("happyDay.messages.success"));
      setErrorMessage(null);
      setIsSuccess(true); // Set success state
    } else {
      setErrorMessage(response?.errorShow || t("happyDay.messages.error"));
      setApiResponse(null);
      setIsSuccess(false); // Set error state
    }

    setDialogOpen(true); // Open the dialog to show success/error message
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(6, 29, 49, 0.74)",
          color: "#0F2552",
          padding: 2,
          borderRadius: "10px",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            fontSize: "16px",
            fontWeight: "bold",
            mb: 2,
            color: "#fff",
          }}
        >
           {t("happyDay.description.part1")}{" "}
          <Typography
            variant="body1"
            component="span"
            sx={{
              fontSize: "16px",
              fontWeight: "bold",
              mb: 2,
              color: "#40E734",
            }}
          >
           {t("happyDay.description.highlight")}
          </Typography>{" "}
          {t("happyDay.description.part2")}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "300px",
              gap: 1,
            }}
          >
            <TextField
              value={selectedDate ? selectedDate.format("DD-MM-YYYY") : ""}
              sx={{
                "& .MuiInputBase-root": {
                  height: "40px",
                  backgroundColor: "#093050",
                  width: "250px",
                  borderRadius: "10px",
                  mt: 14,
                  border: "2px solid rgba(255, 255, 255, 0.2)",
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
                  fontFamily: "Poppins, sans-serif",
                  color: "#fff",
                  fontWeight: "medium",
                },
              }}
            />

            {/* Dialog for displaying API messages */}
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
              <DialogTitle sx={{ textAlign: "center", color: isSuccess ? "green" : "red" }}>
                {isSuccess ? t("happyDay.dialog.success") : t("happyDay.dialog.error")}
              </DialogTitle>
              <DialogContent>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    width: "400px",
                    height: "50px",
                    gap: -10,
                    color: "#0056A2",
                    fontWeight: "bold",
                    fontSize: "10px",
                    textAlign: "center",
                    overflow: "hidden",
                  }}
                >
                  {isSuccess ? (
                    <>
                      {apiResponse}
                      {/* Success GIF */}
                      <img
                        src="https://cdn.dribbble.com/users/39201/screenshots/3694057/nutmeg.gif"
                        alt={t("happyDay.dialog.successAlt")}
                        style={{ width: "100px", height: "30px", borderRadius: "10px" }}
                      />
                    </>
                  ) : (
                    <>
                      {errorMessage}
                      {/* Failure GIF */}
                      <img
                        src="https://i.gifer.com/Z16w.gif"
                        alt={t("happyDay.dialog.errorAlt")}
                        style={{ width: "30px", height: "18px", borderRadius: "10px" }}
                      />
                    </>
                  )}
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose} autoFocus>
                  {t("happyDay.buttons.ok")}
                </Button>
              </DialogActions>
            </Dialog>

            <Button
              variant="contained"
              size="large"
              sx={{
                mt: 2,
                color: "#0056A2",
                backgroundColor: "#15D151",
                height: "50px",
                width: "150px",
                fontWeight: "bold",
                borderRadius: "8px",
              }}
              onClick={handleSetHappyDay}
            >
              <Typography
                variant="body2"
                sx={{
                  textTransform: "capitalize",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                 {t("happyDay.buttons.setDate")}
              </Typography>
            </Button>
            
          </Box>

          {/* Calendar in the top-right corner */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              borderRadius: "12px",
              padding: "3px",
              border: "2px solid rgba(0, 86, 162, 0.5)", // Softer border color
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Light shadow for depth
              backgroundColor: "#F8FAFD", // Light background
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                value={selectedDate}
                onChange={handleDateChange}
                disablePast
                slotProps={{
                  toolbar: {
                    sx: {
                      backgroundColor: "#0056A2", // Toolbar background
                      color: "#FFFFFF", // Toolbar text color
                      fontWeight: "bold",
                    },
                  },
                  actionBar: {
                    sx: {
                      "& button": {
                        color: "#0056A2", // Button color
                        fontWeight: "bold",
                        "&:hover": { backgroundColor: "rgba(0, 86, 162, 0.1)" },
                      },
                    },
                  },
                  day: {
                    sx: {
                      "&.Mui-selected": {
                        backgroundColor: "#0056A2 !important", // Selected date color
                        color: "#fff",
                        minHeight: "30px",
                        padding: "4px",
                      },
                      "&.Mui-selected:hover": {
                        backgroundColor: "#004080 !important", // Darker on hover
                      },
                      "&:hover": {
                        backgroundColor: "rgba(0, 86, 162, 0.1)", // Light blue hover effect
                      },
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </Box>
        </Box>
      </Box>
      <Box sx={{
          display: "flex",
          gap: 1,
          marginTop: "10px",
          flexDirection: "column",
          backgroundColor: "rgba(6, 29, 49, 0.74)",
          color: "#0F2552",
          padding: 2,
          borderRadius: "10px",
          height: "100%",
          overflow: "hidden",
        }}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#fff",
                  textAlign: "left",
                }}
              >
                 {t("happyDay.termsAndConditions.title")}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: "12px", color: "#fff", textAlign: "justify" , marginLeft:"100px"}}
              >
                {/* • Select any day and enjoy Free data for 24 hours.
                <br />• You can change the date as your requirement, one day
                prior to the selected date. */}
                {t("happyDay.termsAndConditions.content1")}
                <br />  {t("happyDay.termsAndConditions.content2")}
              </Typography>
            </Box>

     
      
    </>
  );
};

export default HappyDay;
