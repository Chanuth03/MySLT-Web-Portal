import { Box,Typography } from "@mui/material";
import { useEffect, useState } from "react";
import fetchBillStatus from "../../services/billMethod/fetchBillStatus";
import fetchBillingDetails from "../../services/postpaid/fetchBillingDetails";
import fetchBillingHistory from "../../services/postpaid/fetchBillingHistory";
import { useTranslation } from 'react-i18next';
// Import the store
import useStore from "../../services/useAppStore";
import Navbar from "./BillDetailNavbar";
import BillDetails from "./BillDetails";
import OutstandingBills from "./BillHistory";
import BillMethod from "./BillMethod";
import BillIcon from "../../assets/Vector.png";

interface BillPageProps {
  telephoneNo: string;
  accountNo: string;
}

const BillPage: React.FC<BillPageProps> = ({ telephoneNo, accountNo }) => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState("Total Payable");
  const [billingDetails, setBillingDetails] = useState<any>(null);
  const [billingHistory, setBillingHistory] = useState<any>(null);
  const setBillMethodDataBundle = useStore((state) => state.setBillMethodDataBundle); // Use the setBillMethodDataBundle method from store

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await fetchBillingDetails(telephoneNo, accountNo);
      setBillingDetails(details);
    };
    fetchDetails();
  }, [telephoneNo, accountNo]);

  useEffect(() => {
    const fetchHistory = async () => {
      const history = await fetchBillingHistory(telephoneNo, accountNo);
      setBillingHistory(history);
    };
    fetchHistory();
  }, [telephoneNo, accountNo]);

  useEffect(() => {
    const fetchBillStatusDetails = async () => {
      const response = await fetchBillStatus(accountNo, telephoneNo);
      if (response && response.dataBundle) {
        console.log("Data Bundle:", response.dataBundle); // Log the extracted dataBundle
        setBillMethodDataBundle(response.dataBundle); // Store dataBundle in the store
      }
    };
    fetchBillStatusDetails();
  }, [accountNo, telephoneNo, setBillMethodDataBundle]); // Trigger when accountNo or telephoneNo changes

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexDirection: "column",
          
          backgroundColor: "#082444",
          color: "#FFFFFF1A",
          padding: 1.2,
          borderRadius: "10px",
          height: "550px",
          width:"100%",
          boxShadow: "0px 3px 3px #0000004A",
          overflow: "hidden",
        }}
      >
          <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#1E3A8A", // Dark blue background for the header
          padding: "12px 20px",
          borderRadius: "8px",
          marginBottom: 3,
        }}
      >
        <img
          src={BillIcon}
          alt="Headset"
          style={{ width: "30px", height: "30px", marginRight: "12px" }}
        />
        <Typography
          variant="h5"
          sx={{
            color: "#FFFFFF",
            fontWeight: "bold",
            textTransform: "uppercase",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {t('bill.title')}
        </Typography>
      </Box>
        
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Navbar onTabChange={handleTabChange} t={t} />
        </Box>
        <Box sx={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
          {selectedTab === "Total Payable" && <BillDetails
                selectedTab={selectedTab}
                telephoneNo={telephoneNo}
                accountNo={accountNo}
                billingDetails={billingDetails}
              />}
          {selectedTab === "Bill History" && <OutstandingBills
                selectedTab={selectedTab}
                billingHistory={billingHistory}
                telephoneNo={telephoneNo}
                accountNo={accountNo}
              />}
          {selectedTab === "Bill Methods" && <BillMethod selectedTab={selectedTab} />}
        </Box>
      </Box>
      
    </Box>
  );
};

export default BillPage;