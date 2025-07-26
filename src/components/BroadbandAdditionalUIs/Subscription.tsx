import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import DescriptionIcon from "@mui/icons-material/Description";
import PaymentIcon from "@mui/icons-material/Payment";

// Import images
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

import fetchAdvancedReportEnableDetails from "../../services/postpaid/enableDetailedReport/fetchAdvancedReportEnableDetails";
import { EnableAdvancedReportDetails } from "../../types/types";
import activateDetailedReport from "../../services/postpaid/enableDetailedReport/activateDetailedReport";
import useStore from "../../services/useAppStore";

const SubscriptionPage = () => {
  const { serviceDetails } = useStore();
  const userName = serviceDetails?.listofBBService[0].serviceID || "";
  const [pageLoading, setPageLoading] = useState(true);
  const [selectedSubscriptionIndex, setSelectedSubscriptionIndex] = useState(0);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(-1);
  const [subscriptionDetails, setSubscriptionDetails] = useState<
    EnableAdvancedReportDetails[] | null
  >(null);

  const getSubscriptionDetails = async () => {
    setPageLoading(true);
    const response = await fetchAdvancedReportEnableDetails();
    if (response) {
      setSubscriptionDetails(response);
    }
    setPageLoading(false);
  };
  useEffect(() => {
    getSubscriptionDetails();
  }, []);
  const handleSubmit = () => {
    if (!isCheckboxChecked) {
      alert("Please agree to the general terms and conditions.");
      return;
    }

    if (selectedPaymentOption === -1) {
      alert("Please select a payment option");
      return;
    }
    if (selectedPaymentOption === 0) {
      alert("activated");
      activateDetailedReport(userName, selectedSubscriptionIndex.toString());
    } else if (selectedPaymentOption === 1) {
      alert("paynow");
      //window.open("<payment_gateway_URL>", "_blank");
    }
  };
  return (
    // <Box
    //   sx={{
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     width: "100%",
    //     minHeight: "100vh",
    //     backgroundColor: "#0A192F", // Dark blue background
    //     padding: 2,
    //     marginLeft:"-120px",
    //   }}
    // >
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          backgroundColor: "rgba(6, 29, 49, 0.74)", // Dark blue background
          borderRadius: 2,
          padding: 4,
          height:"500px",
        }}
      >
        {pageLoading ? (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "200px",
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress sx={{ color: "#4CAF50" }} />
          </Box>
        ) : (
          <>
            {/* Title */}
            <Typography
              variant="h6"
              sx={{
                fontSize: "20px",
                color: "white",
                fontWeight: "bold",
                marginBottom: 3,
                textAlign: "center",
              }}
            >
              Subscribe for Detailed Reports
            </Typography>

            {/* Subscription Options */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
                gap: 2,
              }}
            >
              {subscriptionDetails?.map((_option, index) => (
                <Box
                  onClick={() => setSelectedSubscriptionIndex(index)}
                  key={index}
                  sx={{
                    width: "48%",
                    height: "90px",
                    border: `1px solid ${
                      selectedSubscriptionIndex === index ? "#4CAF50" : "#1E5C9B"
                    }`,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "14px",
                    backgroundColor: selectedSubscriptionIndex === index ? "#152D4D" : "#0F2542",
                    flexDirection: "column",
                    gap: 1,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "#152D4D",
                    },
                  }}
                >
                  {index === 0 ? (
                    <AccessTimeIcon sx={{ fontSize: 28, color: "white" }} />
                  ) : (
                    <EventIcon sx={{ fontSize: 28, color: "white" }} />
                  )}
                  <Typography variant="body2" sx={{ color: "white" }}>
                    {index === 0 ? "Monthly Subscribe" : "Yearly Subscribe"}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Details Section */}
            <Box
              sx={{
                borderRadius: "8px",
                padding: 2,
                marginBottom: 3,
                background: "#152D4D",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontSize: "15px",
                  color: "white",
                }}
              >
                {subscriptionDetails &&
                  `Enabling the Detailed report will charge Rs.${
                    subscriptionDetails[selectedSubscriptionIndex].postprice
                  } (+Tax) Per ${
                    subscriptionDetails[selectedSubscriptionIndex].packageid ==
                    "1"
                      ? "Monthly"
                      : "Yearly"
                  }`}
              </Typography>

              {/* Payment Options */}
              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                <Box
                  onClick={() => setSelectedPaymentOption(0)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    backgroundColor: selectedPaymentOption === 0 ? "#152D4D" : "transparent",
                    border: `1px solid ${selectedPaymentOption === 0 ? "#4CAF50" : "#1E5C9B"}`,
                    borderRadius: "8px",
                    padding: "15px 19px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "#152D4D",
                    },
                  }}
                >
                  <DescriptionIcon sx={{ fontSize: 18, color: "white" }} />
                  <Typography variant="body2" sx={{ color: "white", fontSize: "16px" }}>
                    Add to bill
                  </Typography>
                </Box>
                <Box
                  onClick={() => setSelectedPaymentOption(1)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    backgroundColor: selectedPaymentOption === 1 ? "#152D4D" : "transparent",
                    border: `1px solid ${selectedPaymentOption === 1 ? "#4CAF50" : "#1E5C9B"}`,
                    borderRadius: "8px",
                    padding: "15px 19px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "#152D4D",
                    },
                  }}
                >
                  <PaymentIcon sx={{ fontSize: 18, color: "white" }} />
                  <Typography variant="body2" sx={{ color: "white", fontSize: "16px" }}>
                    Pay Now
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Terms and Submit Button */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  required
                  checked={isCheckboxChecked}
                  onChange={(e) => setIsCheckboxChecked(e.target.checked)}
                  sx={{
                    color: "#4CAF50",
                    "&.Mui-checked": {
                      color: "#4CAF50",
                    },
                    padding: "0 8px 0 0",
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "13px",
                    color: "white",
                  }}
                >
                  I agree to the{" "}
                  <span
                    style={{
                      textDecoration: "underline",
                    }}
                  >
                    general terms and conditions
                  </span>
                </Typography>
              </Box>
              <Button
                type="button"
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  backgroundColor: "#15D151",
                  color: "white",
                  textTransform: "none",
                  fontSize: "14px",
                  padding: "6px 35px",
                  borderRadius: "6px",
                  "&:hover": {
                    backgroundColor: "#388E3C",
                  },
                }}
              >
                Next
              </Button>
            </Box>
          </>
        )}
      </Box>
   
  );
};

export default SubscriptionPage;