import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import fetchServiceDetailByTelephone from "../../services/fetchServiceDetails";
import { parseTime } from "../../services/helperFunctions";
import useStore from "../../services/useAppStore";
import { DataBalance, ServiceDetailsAPIResponse } from "../../types/types";
import CircularProgressBar from "../CircularProgressBar";
import { FaClock, FaUser } from 'react-icons/fa'
import './BroadbandDetailsPrePaid.css'
import { useTranslation } from 'react-i18next';

// const commonTextStyle = {
//   fontSize: "14px",
//   fontWeight: 700,
//   color: "#0056A2",
// };

const commonButtonStyle = {
  borderRadius: "10px",
  width: "90%",
};

interface CustomSectionProps {
  label: string;
  value: string;
}

// const CustomSection = ({ label, value }: CustomSectionProps) => (
//   <Typography variant="body2" sx={commonTextStyle}>
//     {label}:
//     <Typography
//       component="span"
//       variant="body2"
//       sx={{ fontSize: "12px", fontWeight: 500, color: "#0056A2" }}
//     >
//       {` ${value}`}
//     </Typography>
//   </Typography>
// );

const CustomSection2 = ({ label, value }: CustomSectionProps) => (
  <div className="package-details-prepaid">
    <div className={`${label.toLowerCase().replace(/\s+/g, '-')}-indicator-prepaid`}>
      {label === "Active" ? <FaClock /> : <FaUser />} {value || "Loading..."}
    </div>
  </div>
);

interface ActionButtonProps {
  text: string;
  variant?: "outlined" | "contained";
  onClick: () => void;
}

const ActionButton = ({
  text,
  variant = "outlined",
  onClick,
}: ActionButtonProps) => (
  <Button
    variant={variant}
    sx={{
      ...commonButtonStyle,
      zIndex: 10,
      border: variant === "outlined" ? "3px solid #0056A2" : "1px solid #fff",
      backgroundColor: variant === "contained" ? "#192B5F" : "#fff",
      color: variant === "contained" ? "#ffffff" : "#0056A2",
      marginY: variant === "contained" ? 0 : 3,
      padding: variant === "contained" ? 1 : 2.5,
      "&:hover": {
        backgroundColor: variant === "contained" ? "#071835" : "#e0f7fa",
        border: variant === "outlined" ? "3px solid #004b8c" : "1px solid #fff",
        color: variant === "contained" ? "#ffffff" : "#004b8c",
      },
    }}
    onClick={onClick}
  >
    <Typography
      variant="body2"
      textTransform="capitalize"
      sx={{ fontWeight: "bold", fontSize: 16 }}
    >
      {text}
    </Typography>
  </Button>
);

interface BroadbandDetailsPrepaidTemplateProps {
  dataBalance: DataBalance[];
  isMain: boolean;
}

const BroadbandDetailsPrepaidTemplate = ({
  dataBalance,
}: BroadbandDetailsPrepaidTemplateProps) => {
  const { setLeftMenuItem, selectedTelephone } = useStore();
  const [serviceDetails, setServiceDetails] =
    useState<ServiceDetailsAPIResponse | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    if (selectedTelephone) {
      const fetchDetails = async () => {
        const details = await fetchServiceDetailByTelephone(selectedTelephone);
        setServiceDetails(details);
      };
      fetchDetails();
    }
  }, [selectedTelephone]);

  const percentage =
    dataBalance.length > 0
      ? (parseFloat(dataBalance[selectedIndex]?.currentAmount) /
          parseFloat(dataBalance[selectedIndex]?.initialAmount)) *
        100
      : 0;

  const initialAmount =
    dataBalance.length > 0
      ? parseFloat(dataBalance[selectedIndex]?.initialAmount)
      : 0;
  const currentAmount =
    dataBalance.length > 0
      ? parseFloat(dataBalance[selectedIndex]?.currentAmount)
      : 0;
  const expireTime =
    dataBalance.length > 0
      ? parseTime(dataBalance[selectedIndex]?.expireTime)
      : null;
  const formattedExpireTime = expireTime?.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  const serviceID =
    serviceDetails?.listofBBService[0]?.serviceID || "Loading...";
  const serviceStatus =
    serviceDetails?.listofBBService[0]?.serviceStatus || "Loading...";
  const packageName =
    serviceDetails?.listofBBService[0]?.packageName || "Loading...";
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexDirection: "column",
        backgroundColor: "#1B1D41",
        color: "#FFFFFF1A",
        padding: 1,
        borderRadius: "10px",
        height: "60vh",
        boxShadow: "0px 3px 3px #0000004A",
      }}
    >
      <Box sx={{ height: "100%", display: "flex" }}>
        <Box
          sx={{
            width: "60%",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
            padding: 2,
            border: "1px solid #0056A252",
            borderRadius: "10px",
          }}
        >
          {dataBalance.length > 0 ? (
            <>
              <Typography
                variant="body2"
                sx={{
                  fontSize: 20,
                  textAlign: "center",
                  fontWeight: 700,
                  color: "#FFF",
                }}
              >
                {dataBalance[selectedIndex]?.packageName}
              </Typography>
              <Box
                sx={{
                  width: "95%",
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
                    transform: `translateX(-${selectedIndex * 100}%)`,
                    width: "80%",
                  }}
                >
                  {dataBalance.map((item, index) => (
                    <Box
                    id = {item.packageName}
                      key={index}
                      sx={{
                        minWidth: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <CircularProgressBar percentage={percentage} totalData={initialAmount} />
                    </Box>
                  ))}
                </Box>
                <ArrowForwardIos
                  sx={{
                    color:
                      selectedIndex === dataBalance.length - 1
                        ? "gray"
                        : "#0056A2",
                    zIndex: 100,
                  }}
                  onClick={() => {
                    if (selectedIndex < dataBalance.length - 1) {
                      setSelectedIndex(selectedIndex + 1);
                    }
                  }}
                />
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  sx={{ fontSize: 20, fontWeight: 700, color: "#FFF" }}
                >
                  {t('prepaid.dataUsage.gbUsedOf', { 
                    used: initialAmount - currentAmount, 
                    total: initialAmount 
                  })}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: 16, fontWeight: 500, color: "#FFF", paddingLeft: "30px" }}
                >
                  {t('prepaid.dataUsage.validTill', { date: formattedExpireTime })}
                </Typography>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                flexGrow: 1,
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontSize: 20, fontWeight: 700, color: "#FFF" }}
              >
                {t('prepaid.dataUsage.noDataToShow')}
              </Typography>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            width: "40%",
            gap: 2,
            paddingX: 2,
            backgroundColor: "#0056A2",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              alignItems: "start",
              backgroundColor: "#1B1D41",
              borderRadius: "10px",
              marginTop: "20px",
              padding: 2,
              gap: 1,
            }}
          >
            {/* <CustomSection label="Status" value={serviceStatus} />
            <CustomSection label="Username" value={serviceID} /> */}
            <div className="package-name-prepaid">{packageName}</div>
            
            <div className="status-account-container-prepaid" style={{ display: "flex", width: "100%",gap: "40px", marginLeft:"12%" }}>
              <CustomSection2 label="Active" value={serviceStatus || serviceStatus ? t('prepaid.status.active') : t('prepaid.status.inactive')} />
              <CustomSection2 label="Account" value={serviceID || serviceID} />
            </div>
          </Box>
          {/* <Box
            sx={{
              width: "100%",
              display: "flex",
              backgroundColor: "#FFF",
              borderRadius: "10px",
              paddingY: 3,
              gap: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: 20,
                color: "#0056A2",
                margin: "auto",
                fontWeight: 700,
              }}
            >
              {isMain ? "Main Package" : "Data Add-ons"}
            </Typography>
          </Box> */}
          <ActionButton
            text={t('prepaid.buttons.dataUsage')}
            variant="outlined"
            onClick={() => {}}
          />
          <ActionButton
            text={t('prepaid.buttons.getMainPackage')}
            variant="contained"
            onClick={() => {
              setLeftMenuItem("GetBroadbandMainPackage");
            }}
          />
          <ActionButton
            text={t('prepaid.buttons.getDataAddOns')}
            variant="contained"
            onClick={() => {
              setLeftMenuItem("GetBroadbandAddOnPackage");
            }}
          />
          <Box
            sx={{ position: "absolute", zIndex: 1, right: "1%", bottom: "1%" }}
          >
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BroadbandDetailsPrepaidTemplate;
