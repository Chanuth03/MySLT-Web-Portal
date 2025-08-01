import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

// Replace with your image paths
import AddToBillImage from "../../assets/subscriptionPageImages/GetExtraGBAdd.jpeg";
import PayNowImage from "../../assets/subscriptionPageImages/GetExtraGBPay.jpeg";
import WatermarkLogo from "../../assets/watermarklogo.png";

import enrollDataGift from "../../services/postpaid/enrollDataGift";
import getDataGiftPackages from "../../services/postpaid/getDataGiftPackages";
import useStore from "../../services/useAppStore";

const GetGiftDataPage: React.FC = () => {
  const { serviceDetails, giftDataMobileNumber } = useStore();
  const serviceID = serviceDetails?.listofBBService[0]?.serviceID;
  const [apiData, setApiData] = useState<any | null>(null);
  const [selectedGB, setSelectedGB] = useState<number | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [addToBillSelected, setAddToBillSelected] = useState<boolean>(false);
  const [payNowSelected, setPayNowSelected] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false); // state for checkbox
  const [openDialog, setOpenDialog] = useState(false); // state to open/close dialog
  const [dialogMessage, setDialogMessage] = useState(""); // state to hold the message

  const dataPlans = [
    { range: "1GB to 3GB", pricePerGB: 100 },
    { range: "5GB to 19GB", pricePerGB: 85 },
    { range: "20GB to 49GB", pricePerGB: 75 },
    { range: "Above 50GB", pricePerGB: 60 },
  ];

  useEffect(() => {
    if (serviceID) {
      getDataGiftPackages(serviceID, "GiftPackage")
        .then((data) => {
          setApiData(data);
          data?.dataBundle?.forEach((packageItem: any) => {
            console.log("Package ID:", packageItem.packageId); // Assuming packageId is part of each item in dataBundle
          });
        })
        .catch((error) => console.error("Error fetching API data:", error));
    }
  }, [serviceID]);

  useEffect(() => {
    console.log("Gift Mobile Number from Store:", giftDataMobileNumber);
  }, [giftDataMobileNumber]); // Trigger whenever giftDataMobileNumber changes

  const handleSelect = (gb: number) => {
    const selectedPlan = apiData?.dataBundle.find(
      (plan: any) => plan.volume === gb
    );
    if (selectedPlan) {
      setSelectedGB(gb);
      setSelectedPrice(parseFloat(selectedPlan.postPrice));
      console.log("Selected Package ID:", selectedPlan.packageId);
    }
  };

  const handleAddToBillClick = () => {
    setAddToBillSelected(!addToBillSelected);
  };

  const handlePayNowClick = () => {
    setPayNowSelected(!payNowSelected);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // toggle checkbox state
  };

  const handleSubmit = async () => {
    if (addToBillSelected && selectedGB && selectedPrice) {
      const packageId = apiData?.dataBundle.find(
        (plan: any) => plan.volume === selectedGB
      )?.packageId;

      if (packageId && serviceID) {
        // Ensure giftDataMobileNumber is not null, default to an empty string if it is
        const mobileNumber = giftDataMobileNumber || ""; // Handle null by providing a default empty string

        // Pass the serviceID and mobileNumber to the enrollDataGift API call
        const response = await enrollDataGift(
          mobileNumber,
          serviceID,
          packageId,
          "SCP"
        );

        // Check the response and set dialog message accordingly
        if (response && response.isSuccess) {
          setDialogMessage(response.dataBundle?.message ?? "Success"); // Fallback to "Success" if message is null or undefined
        } else {
          setDialogMessage("Error in enrolling the gift package.");
        }

        // Open the dialog with the message
        setOpenDialog(true);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        color: "#0056A2",
        padding: 1,
        borderRadius: "10px",
        boxShadow: "0px 3px 3px #0000004A",
        height: "500px",
      }}
    >
      <Box
        sx={{
          flex: 1,
          padding: 4,
          width: "50%",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#0056A2",
            fontWeight: "bold",
            mb: 1,
            fontSize: "25px",
          }}
        >
          Price Plan
        </Typography>
        {dataPlans.map((plan, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 1,
              marginBottom: 1,
              backgroundColor: "rgba(5, 125, 232, 0.3)",
              border: "1px solid #0056A2",
              borderRadius: "10px",
            }}
          >
            <Typography
              sx={{
                color: "#0056A2",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {plan.range}
            </Typography>
            <Typography
              sx={{
                color: "#0056A2",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {plan.pricePerGB} LKR Per GB
            </Typography>
          </Box>
        ))}

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, marginTop: 2 }}>
          {apiData?.dataBundle?.map((plan: any) => (
            <Button
              key={plan.volume}
              variant={selectedGB === plan.volume ? "contained" : "outlined"}
              sx={{
                backgroundColor:
                  selectedGB === plan.volume ? "#0056A2" : "white",
                color: selectedGB === plan.volume ? "white" : "#0056A2",
                fontSize: "15px",
                height: "60px",
                fontWeight: "bold",
                border: "2px solid #0056A2",
                borderRadius: "8px",
                padding: "3px 6px",
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
              onClick={() => handleSelect(plan.volume)}
            >
              {plan.volume}GB
            </Button>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          border: "3px dashed #0056A2",
          padding: 4,
          margin: "10px 15px",
          borderRadius: "8px",
          width: "35%",
        }}
      >
        {selectedGB && selectedPrice ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "rgba(5, 125, 232, 0.3)",
              width: "90%",
              height: "50px",
              padding: 2.5,
              borderRadius: "10px",
              marginBottom: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontSize: "40px", color: "#0056A2", fontWeight: "bold" }}
            >
              {selectedGB} GB
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontSize: "20px", color: "#0056A2", fontWeight: "bold" }}
            >
              Rs. {Math.floor(selectedPrice)} + Tax
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "rgba(5, 125, 232, 0.3)",
              width: "90%",
              height: "50px",
              padding: 2.5,
              borderRadius: "10px",
              marginBottom: 3,
              gap: 4,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontSize: "45px", color: "#0056A2", fontWeight: "bold" }}
            >
              {selectedGB || "1"} GB
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontSize: "20px", color: "#0056A2", fontWeight: "bold" }}
            >
              Rs. {selectedPrice || "100"} + Tax
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            marginTop: 2,
          }}
        >
          <img
            src={AddToBillImage}
            alt="Add to Bill"
            style={{
              width: "100px",
              height: "auto",
              cursor: "pointer",
              filter: addToBillSelected ? "invert(20%)" : "none", // Apply filter when selected
            }}
            onClick={handleAddToBillClick}
          />
          <img
            src={PayNowImage}
            alt="Pay Now"
            style={{
              width: "100px",
              height: "auto",
              cursor: "pointer",
              filter: payNowSelected ? "invert(20%)" : "none", // Apply filter when selected
            }}
            onClick={handlePayNowClick}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 4,
            marginTop: 5,
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              sx={{
                color: "#0056A2",
                "&.Mui-checked": { color: "#0056A2" },
              }}
              checked={isChecked} // bind the checkbox state
              onChange={handleCheckboxChange} // toggle on change
            />
            <Typography
              variant="body2"
              sx={{ fontSize: "14px", color: "#0056A2" }}
            >
              I agree to the{" "}
              <span
                style={{
                  fontWeight: "bold",
                  textDecoration: "underline",
                }}
              >
                general terms and conditions
              </span>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "white",
                border: "2px solid #0056A2",
                color: "#0056A2",
                textTransform: "none",
                fontSize: "16px",
                padding: "6px 30px",
                borderRadius: "10px",
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
              disabled={!isChecked} // disable button if checkbox is not checked
              onClick={handleSubmit} // correctly placed onClick
            >
              Submit
            </Button>
          </Box>
        </Box>

        {/* Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Enrollment Status</DialogTitle>
          <DialogContent>{dialogMessage}</DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Box sx={{ position: "absolute", right: "2%", bottom: "1%" }}>
          <img
            src={WatermarkLogo}
            alt="Watermark"
            style={{ width: "120px", height: "auto" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default GetGiftDataPage;
