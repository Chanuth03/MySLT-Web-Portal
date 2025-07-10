import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";
// import fetchBillStatus from "../../services/billMethod/fetchBillStatus";
// import useStore from "../../services/useAppStore";
import fetchBillingDetails from "../../services/postpaid/fetchBillingDetails";
import { useTranslation } from 'react-i18next';

interface BillingDetail {
  outstandingBalance: number;
  lastBillDate: string;
  lastPaymentAmount: number;
  lastPaymentDate: string;
}

interface BillDetailsProps {
  selectedTab: string;
  telephoneNo: string;
  accountNo: string;
  billingDetails: BillingDetail[];
}

const BillDetails: React.FC<BillDetailsProps> = ({
  selectedTab,
  telephoneNo,
  accountNo,
  billingDetails,
}) => {
  const { t } = useTranslation();
  
  // ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS
  useEffect(() => {
    const fetchDetails = async () => {
      const details = await fetchBillingDetails(telephoneNo, accountNo);
      console.log("Fetched billing details inside useEffect:", details);
    };
  
    fetchDetails();
  }, [telephoneNo, accountNo]);

  // Log the entire billingDetails to the console
  console.log("Full billing details:", billingDetails);
  console.log("Telephone No:", telephoneNo);
  console.log("Account No:", accountNo);

  // Check if billingDetails exists and use the first entry directly
  const billingData = billingDetails?.[0];

  // NOW it's safe to do conditional returns
  if (!billingData) {
    return (
      <Box sx={{ p: 2, mt: 2, textAlign: "center", width: "95%" }}>
        <CircularProgress />
      </Box>
    );
  }

  const handlePayNow = async () => {
    const details = await fetchBillingDetails(telephoneNo, accountNo);
  
    if (!details || details.length === 0) {
      console.error("No billing details found");
      return;
    }
  
    const formData = {
      EventSource: accountNo,
      vpc_Amount: details[0].billAmount,
      prepaidID: "",
      reciever: "",
      packageId: "",
      channel: "SLTPRE",
      commitUser: "Omni",
      reporterPackage: "",
      callbackURLSLT: "",
    };
  
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://billpay.slt.lk/confirm.php";
    form.target = "_blank"; // Use "_blank" to open in new tab
  
    Object.entries(formData).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });
  
    document.body.appendChild(form);
    form.submit();
  };

  return (
    <Box sx={{ p: 0, width: "99%" }}>
      {selectedTab === "Total Payable" && (
        <>
          {/* Two-column layout for Total Payable and Last Payment */}
          <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
            {/* Total Payable Section */}
            <Box
              sx={{
                bgcolor: "#4CAF95", // Green color as shown in the image
                color: "#FFFFFF",
                borderRadius: "8px",
                padding: 2,
                flex: 1,
                height: "160px", // Fixed height to match image
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="body1" sx={{ mb: 1 }}>
                {t('billDetails.totalPayable')} :
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: "auto" }}>
                {t('common.currency')} {billingData.outstandingBalance || "6,465.50"}
              </Typography>
              <Typography variant="body2" sx={{ alignSelf: "flex-end", mt: 4 }}>
                {t('billDetails.monthEnding', { date: billingData.lastBillDate || "2025/03/05" })}
              </Typography>
            </Box>

            {/* Last Payment Section */}
            <Box
              sx={{
                bgcolor: "#C0C0C0", // Gray color as shown in the image
                color: "#FFFFFF",
                borderRadius: "8px",
                padding: 2,
                flex: 1,
                height: "160px", // Fixed height to match image
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="body1" sx={{ mb: 1 }}>
                {t('billDetails.lastPayment')} :
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: "auto" }}>
                {t('common.currency')} {billingData.lastPaymentAmount || "6,000.00"}
              </Typography>
              <Typography variant="body2" sx={{ alignSelf: "flex-end", mt: 4 }}>
                {t('billDetails.paymentOn', { date: billingData.lastPaymentDate || "2025/02/23" })}
              </Typography>
            </Box>
          </Box>

          {/* Pay Now Button */}
          <Box sx={{ mt: 6, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#3498db", // Blue color as shown in the image
                color: "white",
                padding: "10px 30px",
                fontWeight: "bold",
                fontFamily: "Poppins, sans-serif",
                borderRadius: "10px",
                textTransform: "none",
                fontSize: "16px",
              }}
              onClick={handlePayNow}
            >
              {t('billDetails.payNow')}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default BillDetails;