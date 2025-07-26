import { CircularProgress, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import fetchServiceDetailByTelephone from "../../services/fetchServiceDetails";
import useStore from "../../services/useAppStore";
import { useTranslation } from 'react-i18next';
import {
  PostpaidUsageDetails,
  ServiceDetailsAPIResponse,
} from "../../types/types";
import CircularProgressBar from "../CircularProgressBar";
import fetchMyPackageUsage from "../../services/postpaid/fetchMyPackageUsage";
import fetchOtherPackageUsage from "../../services/postpaid/fetchOtherUsage";
import BroadbandNavbar from "./BroadbandNavbar";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import { FaClock, FaUser } from 'react-icons/fa'
import './BroadbandDetailsPostPaid.css'

// const commonTextStyle = {
//   fontSize: "14px",
//   fontWeight: 700,
//   color: "#0056A2",
// };


interface CustomSectionProps {
  label: string;
  value: string | null;
}

// const CustomSection = ({ label, value }: CustomSectionProps) => (
//   <Typography variant="body2" sx={commonTextStyle}>
//     {label}:
//     <Typography
//       component="span"
//       variant="body2"
//       sx={{ fontSize: "12px", fontWeight: 500, color: "#0056A2" }}
//     >
//       {value ? ` ${value}` : "Loading..."}
//     </Typography>
//   </Typography>
// );

const CustomSection = ({ label, value }: CustomSectionProps) => (
  <div className="package-details">
    <div className={`${label.toLowerCase().replace(/\s+/g, '-')}-indicator`}>
      {label === "Active" ? <FaClock /> : <FaUser />} {value || "Loading..."}
    </div>
  </div>
);

const BroadbandDetailsPostPaid = () => {
  const { t } = useTranslation();
  const { selectedTelephone, setLeftMenuItem } = useStore();
  const [serviceData, setServiceData] =
    useState<ServiceDetailsAPIResponse | null>(null);
  const [usageDetails, setUsageDetails] = useState<{
    myPackageDetails?: PostpaidUsageDetails | null;
    extraGBDetails?: PostpaidUsageDetails | null;
    bonusDataDetails?: PostpaidUsageDetails | null;
    freeDataDetails?: PostpaidUsageDetails | null;
    addOnsDetails?: PostpaidUsageDetails | null;
  }>({});
  const [selectedItem, setSelectedItem] = useState("My Package");
  const [selectedPackage, setSelectedPackage] =
    useState<PostpaidUsageDetails | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const serviceID = serviceData?.listofBBService[0]?.serviceID || null;
  const serviceStatus =
    serviceData?.listofBBService[0]?.serviceStatus || "Loading...";
  const packageName =
    serviceData?.listofBBService[0]?.packageName || "Loading...";

  useEffect(() => {
    const fetchData = async () => {
      if (selectedTelephone) {
        const data = await fetchServiceDetailByTelephone(selectedTelephone);
        setServiceData(data);
      }
    };
    fetchData();
  }, [selectedTelephone]);

  useEffect(() => {
    if (serviceID) {
      const fetchUsageData = async () => {
        setLoading(true);
        const myPackageDetails = await fetchMyPackageUsage(serviceID);
        const extraGBDetails = await fetchOtherPackageUsage(
          serviceID,
          "ExtraGB"
        );
        const bonusDataDetails = await fetchOtherPackageUsage(
          serviceID,
          "BonusData"
        );
        const freeDataDetails = await fetchOtherPackageUsage(
          serviceID,
          "FreeData"
        );
        const addOnsDetails = await fetchOtherPackageUsage(
          serviceID,
          "GetDashboardVASBundles"
        );
        setUsageDetails({
          myPackageDetails,
          extraGBDetails,
          bonusDataDetails,
          freeDataDetails,
          addOnsDetails,
        });
        setLoading(false);
      };

      fetchUsageData();
    }
  }, [serviceID, selectedTelephone]);

  const navbarItems = [
    {
      label: "My Package",
      label_name: t('broadbanddetails.mypackage'),
      used: usageDetails?.myPackageDetails?.package_summary?.used || null,
      limit: usageDetails?.myPackageDetails?.package_summary?.limit || null,
    },
    {
      label: "Extra GB",
      label_name: t('broadbanddetails.extra_gb'),
      used: usageDetails?.extraGBDetails?.package_summary?.used || null,
      limit: usageDetails?.extraGBDetails?.package_summary?.limit || null,
    },
    {
      label: "Bonus Data",
      label_name: t('broadbanddetails.bonus_data'),
      used: usageDetails?.bonusDataDetails?.package_summary?.used || null,
      limit: usageDetails?.bonusDataDetails?.package_summary?.limit || null,
    },
    {
      label: "Add-Ons",
      label_name: t('broadbanddetails.addons'),
      used: usageDetails?.addOnsDetails?.package_summary?.used || null,
      limit: usageDetails?.addOnsDetails?.package_summary?.limit || null,
    },
    {
      label: "Free Data",
      label_name: t('broadbanddetails.free_data'),
      used: usageDetails?.freeDataDetails?.package_summary?.used || null,
      limit: usageDetails?.freeDataDetails?.package_summary?.limit || null,
    },
  ];

  useEffect(() => {
    if (selectedItem === "My Package") {
      setSelectedPackage(usageDetails?.myPackageDetails || null);
    } else if (selectedItem === "Extra GB") {
      setSelectedPackage(usageDetails?.extraGBDetails || null);
    } else if (selectedItem === "Bonus Data") {
      setSelectedPackage(usageDetails?.bonusDataDetails || null);
    } else if (selectedItem === "Add-Ons") {
      setSelectedPackage(usageDetails?.addOnsDetails || null);
    } else if (selectedItem === "Free Data") {
      setSelectedPackage(usageDetails?.freeDataDetails || null);
    }
  }, [selectedItem, usageDetails]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        color: "#FFFFFF1A",
        width: "100%",
        borderRadius: "10px",
        height: "100%",
      }}
    >
      <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        color: "#FFFFFF1A",
        padding: 1,
        width: "100%",
        borderRadius: "10px",
        height: "100%",
      }}
      >
      <Box
      sx={{
        display: "flex",
        gap: 6,
        flexDirection: "column",
        color: "#FFFFFF1A",
        padding: 1,
        width: "25%",
        borderRadius: "10px",
        height: "100%",
      }}
    >
      {
        <BroadbandNavbar
          navbarItems={navbarItems}
          onSelected={setSelectedItem}
          type="Summary"
          selected="My Package"
        />
      }
    </Box>
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexDirection: "column",
        backgroundColor: "#1B1D41",
        color: "#FFFFFF1A",
        padding: 1,
        width: "75%",
        borderRadius: "10px",
        height: "100%",
      }}
    >
      <Box sx={{ height: "100%", display: "flex", justifyContent: "end" }}>
        {loading ? (
          <Box
            sx={{
              width: "100%",
              
              height: "60vh",
              maxHeight: "400px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              padding: 2,
              border: "1px solid #0056A252",
              borderRadius: "10px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
              
              height: "60vh",
              maxHeight: "400px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "center",
              gap: 1,
              padding: 2,
              border: "1px solid #0056A252",
              borderRadius: "10px",
            }}
          >
            {selectedPackage && selectedPackage?.usageDetails.length > 0 && !loading ? (
              <>
                <Typography
                  variant="body2"
                  sx={{ fontSize: 20, fontWeight: 700, color: "#fff" }}
                >
                  {selectedItem === "My Package"
                    ? `Your speed is ${selectedPackage?.status} right now`
                    : selectedPackage?.usageDetails[selectedIndex]?.name ||
                      "Loading..."}
                </Typography>
                <Box
                  sx={{
                    width: "65%",
                    display: "Flex",
                    gap: 2,
                    justifyContent: "center",
                    alignItems: "Center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <ArrowBackIos
                    sx={{
                      marginRight: -1,
                      color: selectedIndex === 0 ? "gray" : "#0056A2",
                      zIndex: 100,
                    }}
                    onClick={() => {
                      if (selectedIndex > 0) {
                        setSelectedIndex(selectedIndex - 1);
                      }
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      transition: "transform 0.3s ease-in-out",
                      transform: `translateX(-${selectedIndex * 110}%)`,
                      width: "80%",
                      maxWidth: "300px",
                    }}
                  >
                    {selectedPackage?.usageDetails.map((item, index) => (
                      <Box
                        id={item.name}
                        key={index}
                        sx={{
                          minWidth: "110%",
                          display: "flex",
                          justifyContent: "start",
                        }}
                      >
                        <CircularProgressBar
                          percentage={
                            selectedPackage?.usageDetails[selectedIndex]
                              ?.percentage
                          }
                          totalData={
                            selectedPackage?.usageDetails[selectedIndex].limit
                          }                          
                        />
                      </Box>
                    ))}
                  </Box>
                  <ArrowForwardIos
                    sx={{
                      color:
                        selectedIndex ===
                        selectedPackage.usageDetails.length - 1
                          ? "gray"
                          : "#0056A2",
                      zIndex: 100,
                    }}
                    onClick={() => {
                      if (
                        selectedIndex <
                        selectedPackage.usageDetails.length - 1
                      ) {
                        setSelectedIndex(selectedIndex + 1);
                      }
                    }}
                  />
                </Box>
                <Typography
                  variant="body2"
                  sx={{ fontSize: 20, fontWeight: 700, color: "#FFF" }}
                >
                  {/* {`${selectedPackage?.usageDetails[selectedIndex].used} GB USED OF ${selectedPackage?.usageDetails[selectedIndex].limit} GB`} */}
                  {t('broadbandDetails.dataUsage', {
                    used: selectedPackage?.usageDetails[selectedIndex].used,
                    limit: selectedPackage?.usageDetails[selectedIndex].limit
                  })}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: 16, fontWeight: 500, color: "#FFF" }}
                >
                  {t('broadbandDetails.validTill', {
                    date: selectedPackage?.usageDetails[selectedIndex].expiry_date
                  })}
                </Typography>
              </>
            ) : (
              <Typography
                variant="body2"
                sx={{ fontSize: 20, fontWeight: 700, color: "#fff" }}
              >
                {t('broadbandDetails.noDataAvailable')}
              </Typography>
            )}
          </Box>
        )}
        
      </Box>

      {/* Updated bottom section to match the design in the image */}
      
    </Box>
      </Box>
      <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        color: "#FFFFFF1A",
        padding: 1,
        width: "100%",
        borderRadius: "10px",
        height: "100%",
      }}>
          <Box
        sx={{
          display: "flex",
          width: "100%",
          // background: "linear-gradient(to right, #002053, #1A3365)",
          borderRadius: "10px",
          position: "relative",
          background: "#1B1D41",
          
        }}
      >
        {/* Left side info and button */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            
            width: "50%",
            padding: 2,
            borderRadius: "10px",
            
            alignItems: "center"
          }}
        >
          <Box
            // sx={{
            //   display: "flex",
            //   flexDirection: "column",
            //   gap: 1,
            //   backgroundColor: "#B3EDFF8A",
            //   borderRadius: "10px",
            //   padding: 1,
            // }}
          >
            {/* <CustomSection label="Package" value={packageName} />
            <CustomSection label="Status" value={serviceStatus} />
            <CustomSection label="Username" value={serviceID} /> */}
            <div className="package-name">{packageName}</div>
            
            <div className="status-account-container" style={{ display: "flex", width: "100%", justifyContent: "space-between",gap: "20px" }}>
              <CustomSection label={t('broadbandDetails.active')}  value={serviceStatus ? t('broadbandDetails.active') : t('broadbandDetails.inactive')} />
              <CustomSection label="Account" value={serviceID || serviceID} />
            </div>
          </Box>
          
          <Button
            variant="outlined"
            sx={{
              borderRadius: "5px",
              border: "2px solid #fff",
              color: "#fff",
              textTransform: "none",
              padding: "10px 20px",
              fontSize: "14px",
              fontWeight: "bold",
              width: "80%",
              mt: 2,
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
                border: "2px solid #fff",
              },
            }}
            onClick={() => {
              setLeftMenuItem("PostPaidPackageUpgrade");
            }}
          >
            {t('broadbandDetails.packageUpgrade')}
          </Button>
        </Box>
        
        {/* Right side buttons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            justifyContent: "center",
            borderRadius: "10px",
            background: "#192B5F",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#192B5F",
              color: "#fff",
              borderRadius: "5px",
              border: "2px solid #fff",
              padding: "10px 20px",
              
              fontWeight: "bold",
              width: "60%",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#071835",
              },
            }}
            onClick={() => {
              setLeftMenuItem("GetExtraGB");
            }}
          >
             {t('broadbandDetails.getExtraGB')}
          </Button>
          
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#192B5F",
              color: "#fff",
              borderRadius: "5px",
              border: "2px solid #fff",
              padding: "10px 20px",
              
              fontWeight: "bold",
              width: "60%",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#071835",
              },
            }}
            onClick={() => {
              setLeftMenuItem("GetPostpaidAddOnPackages");
            }}
          >
            {t('broadbandDetails.getDataAddOns')}
          </Button>
        </Box>
        
        {/* Watermark logo */}
        {/* <Box
          sx={{ position: "absolute", zIndex: 1, right: "1%", bottom: "1%" }}
        >
          <img src={WatermarkLogo} alt="Watermark Logo" />
        </Box> */}
      </Box>
      </Box>
      
    </Box>
      

      
  );
};

export default BroadbandDetailsPostPaid;