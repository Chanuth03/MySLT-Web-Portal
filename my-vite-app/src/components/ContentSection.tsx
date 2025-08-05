// src/components/BroadbandSection.js

import { useEffect, useState } from "react";
import fetchDataBalance from "../services/prepaid/fetchDataBalance";
import useStore from "../services/useAppStore";
import { DataBalance } from "../types/types";
import BillPage from "./BillDetails/Billpage";
import BroadbandPrepaidAddOnPackages from "./BroadBandPrepaidPackageDetails/BroadbandPrepaidAddOnPackages";
import BroadbandPrepaidMainPackages from "./BroadBandPrepaidPackageDetails/BroadbandPrepaidMainPackages";
import BroadbandDetailsPostPaid from "./BroadbandDetails/BroadbandDetailsPostPaid";
import BroadbandDetailsPrePaid from "./BroadbandDetails/BroadbandDetailsPrePaid";
import BroadbandDetailsPrepaidAddons from "./BroadbandDetails/BroadbandDetailsPrepaidAddons";

import Box from "@mui/material/Box";
import fetchDetaliedReportAvailability from "../services/postpaid/enableDetailedReport/fetchDetaliedReportAvailability";
import AddComplaints from "./AddComplaints";
import ChangeBroadbandPassword from "./BroadbandAdditionalUIs/ChangeBroadbandPassword";
import ChangeContactForm from "./BroadbandAdditionalUIs/ChangeContactInfo";
import SubscriptionPage from "./BroadbandAdditionalUIs/Subscription";
import BroadbandPostPaidGetAddOns from "./BroadbandDetails/BroadbandPostPaidGetAddOns";
import BroadbandPostPaidPackageUpgrader from "./BroadbandDetails/BroadbandPostPaidPackageUpgrader";
import DailyUsage from "./BroadbandDetails/DailyUsage";
import DetailedUsage from "./BroadbandDetails/DetailedUsage";
import DisableDetailedReport from "./BroadbandDetails/DisableDetailedReport";
import GetExtraGB from "./BroadbandDetails/GetExtraGB";
import ProtocolReport from "./BroadbandDetails/ProtocolReport";
import Complaints from "./Complaints";
import DigitalLife from "./DigitalLife";
import GiftData from "./GiftData";
import HappyDay from "./HappyDay";
import MenuLeft from "./MenuLeft";
import NewServicesPage from "./NewServices/NewServicesPage";
import MyPackagePeotv from "./PeoTV/MyPackagePeotv";
import PeoTvGo from "./PeoTV/PeoTvGo";
import VideoOnDemand from "./PeoTV/VideoOnDemand";
import PhoneNumberList from "./ProfileMenuUIs/PhoneNumberList";
import UserProfile from "./ProfileMenuUIs/UserProfile";
import Promotion from "./Promotion";
import Redeem from "./Redeem";
import TransactionsHistory from "./TransactionsHistory";
import VerticalMenuLeft from "./VerticalMenuLeft";
import CallForwarding from "./Voice/CallForwarding";
import MyPackageVoice from "./Voice/MyPackageVoice";
// import fetchPurchaseHistory from "../services/postpaid/fetchhistorydetails";

import History from "./DataAddonHistory";

import {
  // Button,
  // Dialog,
  // DialogActions,
  // DialogContent,
  // DialogTitle,
  Typography,
} from "@mui/material";
import PeoTvPackages from "./PeoTV/PeoTvPackages";

const UnderConstruction = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "450px",
        backgroundColor: "white",
        borderRadius: 3,
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <Typography variant="body2" sx={{ color: "#0056A2", fontSize: 24 }}>
        Under Construction
      </Typography>
    </Box>
  );
};

const ContentSection = () => {
  const [addOnData, setAddOnData] = useState<DataBalance[]>([]);
  const [mainData, setMainData] = useState<DataBalance[]>([]);
  const {
    selectedLeftMenuItem,
    selectedTelephone,
    selectedAccountNo,
    packageListUpdate,
    selectedNavbarItem,
    packageName,
    serviceDetails,
    // Remove setEmail if it doesn't exist in your store
    // setEmail,
    setDetailReportAvailability,
  } = useStore();

  // Remove unused isPrepaid variable
  // const isPrepaid =
  //     serviceDetails?.promotionType === "Prepaid" ||
  //     serviceDetails?.promotionType === null;

  const disabledItems = [
    "New Services",
    "Promotion",
    "Digital Life",
    "Bill",
    "Hot Devices",
    "Complaints",
    "SUBMIT YOUR COMPLAINT",
    "My Profile",
    "Manage Connections",
    "Subscription",
    "ContactInformationChange",
    "BroadbandPasswordChange",
    "GetExtraGB",
  ]; // menu icons that will disable the left menu upon clicking

  useEffect(() => {
    const getDetailedReportAvalability = async () => {
      const subcriberID = serviceDetails?.listofBBService[0]?.serviceID;
      if (subcriberID) {
        const response = await fetchDetaliedReportAvailability(subcriberID);
        setDetailReportAvailability(response!["availability"]);
        // Remove setEmail call if it doesn't exist in your store
        // setEmail(response!["email"]);
      }
    };
    getDetailedReportAvalability();
  }, [serviceDetails]);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const data = await fetchDataBalance(selectedTelephone);

      const { addOnData, mainData } = data!.reduce(
        (acc, item) => {
          if (item.packageCategory === "Add-ons") {
            acc.addOnData.push(item);
          } else {
            acc.mainData.push(item);
          }
          return acc;
        },
        { addOnData: [], mainData: [] } as {
          addOnData: DataBalance[];
          mainData: DataBalance[];
        }
      );
      setAddOnData(addOnData);
      setMainData(mainData);
    };

    fetchData();
  }, [selectedTelephone, packageListUpdate]);

  // Fixed return statement using conditional rendering
  return selectedNavbarItem === "Broadband" || selectedNavbarItem === "" ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        backgroundColor: "#0F3B7A",
        padding: "10px",
        borderRadius: "10px",
        boxShadow: "0 0 15px rgba(15, 59, 122, 0.9)",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {!disabledItems.includes(selectedLeftMenuItem) && (
        <Box sx={{ width: "100%" }}>
          <VerticalMenuLeft />
        </Box>
      )}
      <Box
        sx={{
          width: disabledItems.includes(selectedLeftMenuItem) ? "100%" : "100%",
          height: "100%",
        }}
      >
        {/* Rendering based on selectedLeftMenuItem */}
        {/*Postpaid*/}
        {selectedLeftMenuItem === "Summary" && <BroadbandDetailsPostPaid />}
        {selectedLeftMenuItem === "Daily Usage" && <DailyUsage />}
        {selectedLeftMenuItem === "Gift Data" && <GiftData />}
        {selectedLeftMenuItem === "History" && <History />}
        {selectedLeftMenuItem === "Redeem Data" && <Redeem />}
        {selectedLeftMenuItem === "Happy Day" && <HappyDay />}
        {selectedLeftMenuItem === "Subscription" && <SubscriptionPage />}
        {selectedLeftMenuItem === "ContactInformationChange" && (
          <ChangeContactForm />
        )}
        {selectedLeftMenuItem === "BroadbandPasswordChange" && (
          <ChangeBroadbandPassword />
        )}
        {/* Add onClose prop to DetailedUsage */}
        {selectedLeftMenuItem === "DetailedUsageDetails" && (
          <DetailedUsage onClose={() => {}} />
        )}
        {selectedLeftMenuItem === "ProtocolReport" && <ProtocolReport />}

        {selectedLeftMenuItem === "PostPaidPackageUpgrade" && (
          <BroadbandPostPaidPackageUpgrader />
        )}
        {selectedLeftMenuItem === "GetExtraGB" && (
          <GetExtraGB packageName={packageName} />
        )}
        {selectedLeftMenuItem === "GetPostpaidAddOnPackages" && (
          <BroadbandPostPaidGetAddOns />
        )}
        {selectedLeftMenuItem === "DisableDetailReport" && (
          <DisableDetailedReport />
        )}

        {/*Prepaid*/}
        {selectedLeftMenuItem === "Main Packages" && (
          <BroadbandDetailsPrePaid dataBalance={mainData} />
        )}
        {selectedLeftMenuItem === "Data Add-Ons" && (
          <BroadbandDetailsPrepaidAddons dataBalance={addOnData} />
        )}
        {selectedLeftMenuItem === "GetBroadbandMainPackage" && (
          <BroadbandPrepaidMainPackages />
        )}
        {selectedLeftMenuItem === "GetBroadbandAddOnPackage" && (
          <BroadbandPrepaidAddOnPackages />
        )}
        {selectedLeftMenuItem === "Transaction" && (
          <TransactionsHistory serviceId={selectedTelephone} />
        )}

        {/*PeoTV - Only show when navbar is Broadband*/}
        {selectedLeftMenuItem === "My Package" &&
          selectedNavbarItem === "Broadband" && <MyPackagePeotv />}
        {selectedLeftMenuItem === "VOD" && <VideoOnDemand />}
        {selectedLeftMenuItem === "PEOTVGO" && <PeoTvGo />}
        {selectedLeftMenuItem === "Packages" && <PeoTvPackages />}

        {/*Voice - Only show when navbar is Broadband*/}
        {selectedLeftMenuItem === "My Package" &&
          selectedNavbarItem === "Broadband" && <MyPackageVoice />}
        {selectedLeftMenuItem === "Call Forwarding" && (
          <CallForwarding telephoneNo={selectedTelephone} />
        )}

        {/*QuickAccess*/}
        {selectedLeftMenuItem === "New Services" && (
          <NewServicesPage telephoneNo={selectedTelephone} />
        )}
        {selectedLeftMenuItem === "Promotion" && (
          <Promotion telephoneNo={selectedTelephone} />
        )}

        {selectedLeftMenuItem === "Digital Life" && <DigitalLife />}

        {selectedLeftMenuItem === "Bill" && (
          <BillPage
            telephoneNo={selectedTelephone}
            accountNo={selectedAccountNo}
          />
        )}
        {selectedLeftMenuItem === "Hot Devices" && <UnderConstruction />}
        {selectedLeftMenuItem === "Complaints" && <Complaints />}
        {selectedLeftMenuItem === "SUBMIT YOUR COMPLAINT" && (
          <AddComplaints telephoneNo={selectedTelephone} />
        )}
        {selectedLeftMenuItem === "My Profile" && <UserProfile />}
        {selectedLeftMenuItem === "Manage Connections" && <PhoneNumberList />}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        gap: "20px", // added gap between items
        backgroundColor: "#0F3B7A", // changed background color
        padding: "10px", // added padding
        borderRadius: "10px", // added border radius
        boxShadow: "0 0 15px rgba(15, 59, 122, 0.9)", // added box shadow
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <Box
        sx={{
          width: "25%",
          display: disabledItems.includes(selectedLeftMenuItem)
            ? "none"
            : "block",
        }}
      >
        <MenuLeft />
      </Box>
      <Box
        sx={{
          width: disabledItems.includes(selectedLeftMenuItem) ? "100%" : "75%",
          height: "100%",
        }}
      >
        {/* Rendering based on selectedLeftMenuItem */}
        {/*Postpaid*/}
        {selectedLeftMenuItem === "Summary" && <BroadbandDetailsPostPaid />}
        {selectedLeftMenuItem === "Daily Usage" && <DailyUsage />}
        {selectedLeftMenuItem === "Gift Data" && <GiftData />}
        {selectedLeftMenuItem === "History" && <History />}
        {selectedLeftMenuItem === "Redeem Data" && <Redeem />}
        {selectedLeftMenuItem === "Happy Day" && <HappyDay />}
        {selectedLeftMenuItem === "Subscription" && <SubscriptionPage />}
        {selectedLeftMenuItem === "ContactInformationChange" && (
          <ChangeContactForm />
        )}
        {selectedLeftMenuItem === "BroadbandPasswordChange" && (
          <ChangeBroadbandPassword />
        )}
        {/* Add onClose prop to DetailedUsage */}
        {selectedLeftMenuItem === "DetailedUsageDetails" && (
          <DetailedUsage onClose={() => {}} />
        )}
        {selectedLeftMenuItem === "ProtocolReport" && <ProtocolReport />}

        {selectedLeftMenuItem === "PostPaidPackageUpgrade" && (
          <BroadbandPostPaidPackageUpgrader />
        )}
        {selectedLeftMenuItem === "GetExtraGB" && (
          <GetExtraGB packageName={packageName} />
        )}
        {selectedLeftMenuItem === "GetPostpaidAddOnPackages" && (
          <BroadbandPostPaidGetAddOns />
        )}
        {selectedLeftMenuItem === "DisableDetailReport" && (
          <DisableDetailedReport />
        )}

        {/*Prepaid*/}
        {selectedLeftMenuItem === "Main Packages" && (
          <BroadbandDetailsPrePaid dataBalance={mainData} />
        )}
        {selectedLeftMenuItem === "Data Add-Ons" && (
          <BroadbandDetailsPrepaidAddons dataBalance={addOnData} />
        )}
        {selectedLeftMenuItem === "GetBroadbandMainPackage" && (
          <BroadbandPrepaidMainPackages />
        )}
        {selectedLeftMenuItem === "GetBroadbandAddOnPackage" && (
          <BroadbandPrepaidAddOnPackages />
        )}
        {selectedLeftMenuItem === "Transaction" && (
          <TransactionsHistory serviceId={selectedTelephone} />
        )}

        {/*PeoTV*/}
        {selectedLeftMenuItem === "My Package" &&
          selectedNavbarItem === "PeoTV" && <MyPackagePeotv />}
        {selectedLeftMenuItem === "VOD" && <VideoOnDemand />}
        {selectedLeftMenuItem === "PEOTVGO" && <PeoTvGo />}
        {selectedLeftMenuItem === "Packages" && <PeoTvPackages />}

        {/*Voice*/}
        {selectedLeftMenuItem === "My Package" &&
          selectedNavbarItem === "Voice" && <MyPackageVoice />}
        {selectedLeftMenuItem === "Call Forwarding" && (
          <CallForwarding telephoneNo={selectedTelephone} />
        )}

        {/*QuickAccess*/}
        {selectedLeftMenuItem === "New Services" && (
          <NewServicesPage telephoneNo={selectedTelephone} />
        )}
        {selectedLeftMenuItem === "Promotion" && (
          <Promotion telephoneNo={selectedTelephone} />
        )}

        {selectedLeftMenuItem === "Digital Life" && <DigitalLife />}

        {selectedLeftMenuItem === "Bill" && (
          <BillPage
            telephoneNo={selectedTelephone}
            accountNo={selectedAccountNo}
          />
        )}
        {selectedLeftMenuItem === "Hot Devices" && <UnderConstruction />}
        {selectedLeftMenuItem === "Complaints" && <Complaints />}
        {selectedLeftMenuItem === "SUBMIT YOUR COMPLAINT" && (
          <AddComplaints telephoneNo={selectedTelephone} />
        )}
        {selectedLeftMenuItem === "My Profile" && <UserProfile />}
        {selectedLeftMenuItem === "Manage Connections" && <PhoneNumberList />}
      </Box>
    </Box>
  );
};

export default ContentSection;