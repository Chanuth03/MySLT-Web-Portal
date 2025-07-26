import React, { useEffect, useState } from "react";
import { 
  Box, 
  Typography, 
  Button, 
  Checkbox, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  CircularProgress
} from "@mui/material";
// import AddToBillImage from "../../assets/Images/subscriptionPageImages/GetExtraGBAdd.jpeg";
// import PayNowImage from "../../assets/Images/subscriptionPageImages/GetExtraGBPay.jpeg";
// import WatermarkLogo from "../../assets/Images/watermarklogo.png";
import useStore from "../../services/useAppStore";
import { useTranslation } from 'react-i18next';
import fetchPackageDetails from "../../services/postpaid/fetchPackageDetails";
import activatepackagedetails from "../../services/postpaid/activatepackagedetails";
// import axios from "axios";
// import fetchServiceDetailByTelephone from "../../services/fetchServiceDetails";



interface DataPlan {
  range: string;
  pricePerGB: number;
}

interface PackageDetail {
  volume: number;
  postPrice: string;
  packageId: number;
}

// const dataPlans: DataPlan[] = [
//   { range: "1GB to 3GB", pricePerGB: 100 },
//   { range: "5GB to 19GB", pricePerGB: 85 },
//   { range: "20GB to 49GB", pricePerGB: 75 },
//   { range: "Above 50GB", pricePerGB: 60 },
// ];

interface DataPlanProps {
  packageName: string | null;
}

// interface PaymentResponse {
//   success: boolean;
//   error?: string;
//   message?: string;
// }


const GetExtraGbPage: React.FC<DataPlanProps> = ({ packageName }) => {
   const { t } = useTranslation();
  const { serviceDetails } = useStore();
  const serviceID = serviceDetails?.listofBBService[0]?.serviceID;
  const {   selectedTelephone } = useStore();
  
  console.log("🔍 [Init] Service Details:", serviceDetails);
  console.log("🆔 [Init] Service ID:", serviceID);
  
  const [selectedGB, setSelectedGB] = useState<number | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [packageDetails, setPackageDetails] = useState<PackageDetail[]>([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"addToBill" | "payNow" | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const storedEmail = localStorage.getItem("username");

   // Define data plans with translations
  const dataPlans: DataPlan[] = [
    { range: t('extraGB.dataPlans.range1to3'), pricePerGB: 100 },
    { range: t('extraGB.dataPlans.range5to19'), pricePerGB: 85 },
    { range: t('extraGB.dataPlans.range20to49'), pricePerGB: 75 },
    { range: t('extraGB.dataPlans.above50'), pricePerGB: 60 },
  ];

  // Logging effects
  useEffect(() => {
    console.log("📦 [Update] Package Details:", packageDetails);
  }, [packageDetails]);

  useEffect(() => {
    console.log("🔄 [State] Selection Updated:", { selectedGB, selectedPrice });
  }, [selectedGB, selectedPrice]);

  useEffect(() => {
    console.log("✅ [State] Checkbox:", isCheckboxChecked);
  }, [isCheckboxChecked]);

  useEffect(() => {
    console.log("💳 [State] Payment Method:", paymentMethod);
  }, [paymentMethod]);

  const handleSelect = (gb: number) => {
    console.log("🖱 [Action] Selected GB:", gb);
    const selectedPlan = packageDetails.find(plan => plan.volume === gb);
    
    if (selectedPlan) {
      console.log("📄 [Data] Selected Plan:", selectedPlan);
      setSelectedGB(gb);
      setSelectedPrice(parseFloat(selectedPlan.postPrice));
    } else {
      console.warn("⚠ [Warning] No plan found for GB:", gb);
    }
  };

  const handleSubmit = async () => {
    console.group("🚀 [Action] Form Submission");
    console.log("⏳ [Status] Validation Started");
  
    if (!isCheckboxChecked || !selectedGB || !paymentMethod || !serviceID) {
      console.log(serviceID);
      console.log(selectedGB);
      console.log(selectedTelephone);
      

      console.warn("⚠ [Validation] Missing:", {
        checkbox: !isCheckboxChecked,
        GB: !selectedGB,
        method: !paymentMethod,
        serviceID: !serviceID
      });
  
      setErrorMessage(t('extraGB.errors.selectAllOptions'));
      setOpenDialog(true);
      console.groupEnd();
      return;
    }
  
    console.log("✅ [Validation] All fields valid");
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
  
    try {
      const selectedPlan = packageDetails.find(plan => plan.volume === selectedGB);
      if (!selectedPlan) throw new Error(t('extraGB.errors.planNotFound'));
  
      console.log("📦 [Selected Plan ID]:", selectedPlan.packageId);
  
      if (paymentMethod === "addToBill") {
        console.log("📝 [Action] Adding to bill...");
        const response = await activatepackagedetails(serviceID, selectedPlan.packageId);
        console.log("📄 [Response] Activation:", response);
        
        if (!response?.isSuccess) {
          throw new Error(response?.errorShow || response?.errorMessege || t('extraGB.errors.addToBillFailed'));
        }
  
        setSuccessMessage(response?.message || t('extraGB.messages.addToBillSuccess'));
      } else {
        console.log("💳 [Action] Redirecting to payment gateway...");
       

         // Define payment fields
         const paymentData = {
        
          CustEmail: storedEmail,
          ContactNumber:selectedTelephone,
          subscriberID: serviceID,
          prepaidID:"EGB",
          reciever:  serviceID,
          packageId: selectedPlan.packageId,
          channel: "SLTPRE",
          commitUser: "OmniAPP",
          reporterPackage: selectedPlan.packageId,
          activatedBy: serviceID,
          callbackURLSLT: "", 
        };
  
        // Create form element
        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://billpay.slt.lk/bbtopup/summaryallAPImyslt.php";
        form.target = "_blank"; // Use "_blank" to open in new tab
  
    


        console.log("📤 [Form Data to be Sent]:", paymentData);
  
        // Append fields to form
        Object.entries(paymentData).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value?.toString() ?? "";
          form.appendChild(input);
        });
  
        // Append and submit the form
        document.body.appendChild(form);
        form.submit();
  
        return; // Exit, since redirection will occur
      }
    } catch (error: any) {
      console.error("❌ [Error] Transaction Failed:", error);
      setErrorMessage(error.message || t('extraGB.errors.unexpectedError'));
    } finally {
      setIsLoading(false);
      setOpenDialog(true);
      console.log("⏳ [Status] Loading Complete");
      console.groupEnd();
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      console.group("🌐 [API] Fetching Packages");
      if (serviceID && packageName) {
        try {
          console.log("⏳ [Request] Fetching package details...");
          const response = await fetchPackageDetails(serviceID, packageName);
          console.log("✅ [Response] Received:", response);

          if (response && response.length > 0) {
            setPackageDetails(response);
          } else {
            console.warn("⚠ [Warning] No package details found");
            setErrorMessage(t('extraGB.errors.noPackageOptions'));
            setOpenDialog(true);
          }
        } catch (error) {
          console.error("❌ [Error] Fetch Failed:", error);
          setErrorMessage(t('extraGB.errors.loadPackageOptions'));
          setOpenDialog(true);
        }
      }
      console.groupEnd();
    };
    fetchData();
  }, [serviceID, packageName]);

  const handleDialogClose = () => {
    console.log("📢 [UI] Closing Dialog");
    setOpenDialog(false);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(6, 29, 49, 0.74)",
        color: "white",
        padding: 3,
        borderRadius: "20px",
        minHeight: "500px",
        width: "100%",

      }}
    >
      {/* Left Section - Price Plan */}
      <Box
        sx={{
         flex: 1,
          padding: 2,
          width: "60%",
        }}
      >
        <Typography variant="h5"
          sx={{
            color: "white",
            fontWeight: "bold",
            mb: 3,
            fontSize: "28px",
          }}
        >
           {t('extraGB.pricePlan')}
        </Typography>
        
         {/* Price Table */}
        {dataPlans.map((plan, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: index !== dataPlans.length - 1 ? "1px solid rgba(255,255,255,0.2)" : "none",
              py: 1.5,
            }}

          >
            <Typography sx={{
                color: "white",
                fontSize: "16px",
                fontWeight: "medium",
              }}>
              {plan.range}
            </Typography>
            <Typography sx={{
                color: "white",
                fontSize: "16px",
                textAlign: "right",
              }}>
              {plan.pricePerGB} {t('extraGB.currency')}/GB
            </Typography>
          </Box>
        ))}

        {/* Data Buttons */}
        <Box sx={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(4, 1fr)", 
          gap: 1.5, 
          marginTop: 4 
        }}>
          {Array.from({ length: 10 }, (_, i) => i + 1)
            .filter(gb => gb !== 4)
            .concat([15, 20, 25])
            .map((gb) => (
              <Button
                key={gb}
                variant={selectedGB === gb ? "contained" : "outlined"}
                sx={{
                backgroundColor: selectedGB === gb ? "#1E4976" : "transparent",
                color: "white",
                fontSize: "16px",
                fontWeight: "medium",
                border: selectedGB === gb ? "none" : "1px solid rgba(255,255,255,0.3)",
                borderRadius: "8px",
                padding: "10px 5px",
                "&:hover": {
                  backgroundColor: selectedGB === gb ? "#1E4976" : "rgba(255,255,255,0.1)",
                },
              }}

                onClick={() => handleSelect(gb)}
                disabled={isLoading}
              >
                {gb}GB
              </Button>
            ))}
        </Box>
      </Box>

      {/* Right Section - Subscription Details */}
      <Box
        sx={{
          padding: 3,
          margin: "10px",
          borderRadius: "10px",
          width: "40%",
          backgroundColor: "rgba(3, 15, 25, 0.74)"
        }}
      >
        {/* Package Summary */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#233550",
            padding: 2,
            borderRadius: "10px",
            marginBottom: 4,
          }}

        >
          <Typography variant="h5"
            sx={{ 
              color: "white", 
              fontWeight: "bold",
              fontSize: "26px" 
            }}>
            {selectedGB || "0"} GB
          </Typography>
          <Typography variant="body1"
            sx={{ 
              color: "white", 
              fontSize: "14px" 
            }}
          >
            {t('extraGB.currency')} {selectedPrice ? Math.floor(selectedPrice) : "0"} + {t('extraGB.tax')}
          </Typography>
        </Box>

        {/* Payment Options */}
        <Box sx={{ marginBottom: 4 }}>
          <Button
            variant="outlined"
            sx={{
              color: "white",
              border: paymentMethod === "addToBill" 
        ? "2px solid #4CAF50" 
        : "1px solid rgba(255,255,255,0.3)",
              borderRadius: "8px",
              padding: "10px",
              width: "100%",
              marginBottom: 2,
              justifyContent: "flex-start",
              gap: 2,
              textTransform: "none",
              backgroundColor: "rgba(255,255,255,0.1)",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              }
            }}
            onClick={() => !isLoading && setPaymentMethod("addToBill")}
          >
            <Box component="span" sx={{ display: "flex", alignItems: "center" }}>
              <Box component="span" sx={{ mr: 1 }}>📄</Box>
               {t('extraGB.paymentMethods.addToBill')}
            </Box>
          </Button>

          <Button
            variant="outlined"
            sx={{
              color: "white",
              border: paymentMethod === "payNow" 
        ? "2px solid #4CAF50" 
        : "1px solid rgba(255,255,255,0.3)",
              borderRadius: "8px",
              padding: "10px",
              width: "100%",
              marginBottom: 2,
              justifyContent: "flex-start",
              gap: 2,
              textTransform: "none",
              backgroundColor: "rgba(255,255,255,0.1)",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              }
            }}
            onClick={() => !isLoading && setPaymentMethod("payNow")}
          >
            <Box component="span" sx={{ display: "flex", alignItems: "center" }}>
              <Box component="span" sx={{ mr: 1 }}>💳</Box>
              {t('extraGB.paymentMethods.payNow')}
            </Box>
          </Button>
        </Box>

        {/* Terms and Conditions */}
        <Box sx={{ mt: 4, mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
            <Checkbox
              checked={isCheckboxChecked}
              onChange={(e) => {
                console.log("✅ [UI] Checkbox Changed:", e.target.checked);
                setIsCheckboxChecked(e.target.checked);
              }}
              disabled={isLoading}
              sx={{
              color: "rgba(255,255,255,0.7)",
              "&.Mui-checked": {
                color: "white",
              },
            }}

            />
            <Typography variant="body2"
            sx={{
              fontSize: "14px",
              color: "white",
            }}>
               {t('extraGB.termsAndConditions.agree')}{" "}
              <span style={{ fontWeight: "bold", textDecoration: "underline", cursor: "pointer" }}>
                {t('extraGB.termsAndConditions.termsLink')}
              </span>
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="contained"
            disabled={!isCheckboxChecked || !paymentMethod || !selectedGB || isLoading}
            sx={{
            backgroundColor: "#15D151",
            color: "#FFF",
            textTransform: "none",
            fontSize: "16px",
            padding: "12px",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "#F0F0F0",
            },
            "&.Mui-disabled": {
              backgroundColor: "rgba(255,255,255,0.3)",
              color: "rgba(10,23,41,0.5)",
            }
          }}

            onClick={handleSubmit}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : t('common.submit')}
          </Button>
        </Box>       
      </Box>

      {/* Result Dialog */}
     {/* <Dialog 
        open={openDialog} 
        onClose={handleDialogClose}
        PaperProps={{
          style: {
            backgroundColor: "#162338",
            color: "white",
            borderRadius: "10px"
          }
        }}
      >
        <DialogTitle sx={{ color: "white" }}>
          {errorMessage ? t('common.error') : t('extraGB.messages.success')}
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: "white" }}>
            {errorMessage || successMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} sx={{ color: "white" }}>
            {t('common.cancel')}
          </Button>
        </DialogActions>
      </Dialog> */}
      <Dialog 
  open={openDialog} 
  onClose={handleDialogClose}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
  PaperProps={{
    sx: {
      width: "400px",
      borderRadius: "10px",
      padding: "30px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      m: 0,
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      bgcolor: "white",
    },
  }}
>
  <Box
    sx={{
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      backgroundColor: errorMessage ? "#f44336" : "#4CD137",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      mb: 1,
      position: "relative",
      top: "-10px",
      animation: "pulse 1.5s infinite",
      "@keyframes pulse": {
        "0%": {
          opacity: 1,
          transform: "scale(1)",
          boxShadow: `0 0 0 0 ${errorMessage ? "rgba(244, 67, 54, 0.7)" : "rgba(76, 209, 55, 0.7)"}`,
        },
        "50%": {
          opacity: 0.8,
          transform: "scale(1.05)",
          boxShadow: `0 0 0 10px ${errorMessage ? "rgba(244, 67, 54, 0)" : "rgba(76, 209, 55, 0)"}`,
        },
        "100%": {
          opacity: 1,
          transform: "scale(1)",
          boxShadow: `0 0 0 0 ${errorMessage ? "rgba(244, 67, 54, 0)" : "rgba(76, 209, 55, 0)"}`,
        },
      },
    }}
  >
    <Typography sx={{ color: "white", fontSize: "30px", fontWeight: "bold" }}>
      {errorMessage ? "×" : "✓"}
    </Typography>
  </Box>
  
  <DialogTitle
    id="alert-dialog-title"
    sx={{
      textAlign: "center",
      p: 0,
      m: 0,
      mb: 2,
      fontWeight: "bold",
      fontSize: "18px",
      textTransform: "uppercase",
      color: "#333333",
    }}
  >
    {isLoading ? "Processing" : errorMessage ? "Error" : "Success"}
  </DialogTitle>
  
  <DialogContent sx={{ p: 0, mb: 2, textAlign: "center" }}>
    {isLoading ? (
      <Typography variant="body2" sx={{ color: "#555555", fontSize: "16px" }}>
        Please wait while we process your request...
      </Typography>
    ) : (
      <Typography variant="body2" sx={{ color: "#555555", fontSize: "16px" }}>
        {errorMessage || successMessage}
      </Typography>
    )}
  </DialogContent>
  
  <DialogActions sx={{ p: 0, mt: 3, display: "flex", justifyContent: "center", width: "100%" }}>
    {!isLoading && (
      <Button
        onClick={handleDialogClose}
        sx={{
          backgroundColor: errorMessage ? "#f44336" : "#4CD137",
          color: "white",
          borderRadius: "30px",
          py: 1,
          px: 4,
          textTransform: "uppercase",
          "&:hover": {
            backgroundColor: errorMessage ? "#d32f2f" : "#44bd32",
          },
        }}
      >
        {errorMessage ? "Close" : "Continue"}
      </Button>
    )}
  </DialogActions>
</Dialog>

    </Box>
  );
};

export default GetExtraGbPage;