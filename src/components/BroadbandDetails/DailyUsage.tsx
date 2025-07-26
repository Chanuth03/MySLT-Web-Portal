import DataUsageIcon from '@mui/icons-material/DataUsage';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Box,
  Button,
  Link,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import fetchDailyUsageData from "../../services/postpaid/fetchDailyUsage";
import fetchPreviousDailyUsageData from "../../services/postpaid/fetchPreviousDailyUsageData";
import useStore from "../../services/useAppStore";
import { DailyUsageDetails } from "../../types/types";
import DetailedUsage from "./DetailedUsage"; // Import the DetailedUsage component
import { useTranslation } from 'react-i18next'; 

const getMonthNames = (): string[] => {
  const now = new Date();
  const monthNames = new Intl.DateTimeFormat("en-US", { month: "long" });

  const lastMonth = monthNames.format(
    new Date(now.setMonth(now.getMonth() - 1))
  ); // Last month
  const twoMonthsAgo = monthNames.format(
    new Date(now.setMonth(now.getMonth() - 1))
  ); // Month before last

  return ["Current Month", lastMonth, twoMonthsAgo];
};

const DailyUsage = () => {
  const { t } = useTranslation();
  const { serviceDetails, setLeftMenuItem, setUsageDetails, detailReportAvailability } = useStore();
  const serviceID = serviceDetails?.listofBBService[0]?.serviceID;
  const months = getMonthNames();
  const [selectedMonth, setSelectedMonth] = useState<string>(months[0]);
  const [usageData, setUsageData] = useState<DailyUsageDetails[]>([]); 
  const [loading, setLoading] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false); // State to control popup visibility
  
  // For month dropdown menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  // Function to close the popup
  const closePopup = () => {
    setShowPopup(false);
  };

  // Fetch daily usage data based on selected month
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log("Fetching daily usage data for serviceID:", serviceID);

        let data: DailyUsageDetails[] | null = null;

        if (serviceID) {
          if (selectedMonth === months[0]) {
            // Current Month
            data = await fetchDailyUsageData(serviceID, "01");
          } else if (selectedMonth === months[1]) {
            // Last Month
            data = await fetchPreviousDailyUsageData(serviceID, "01", 1);
          } else if (selectedMonth === months[2]) {
            // Two Months Ago
            data = await fetchPreviousDailyUsageData(serviceID, "01", 2);
          }
        }
        if (data) {
          console.log("Fetched Daily Usage Data:", data);
          setUsageData(data);
        } else {
          console.error("No usage data found for serviceID:", serviceID);
        }
      } catch (error) {
        console.error("Error fetching daily usage data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [serviceID, selectedMonth]);

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    handleClose();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(6, 29, 49, 0.74)",
        padding: 0,
        borderRadius: "16px",
        height: "520px", // Fixed height as required
        overflow: "hidden",
        // border: "1px solid #0A2D62",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#1a3564",
          padding: "8px",
           width:"96%",
          marginLeft:"20px",
          marginTop:"10px",
          borderRadius: 2,
          // borderTopLeftRadius: 16,
          // borderTopRightRadius: 16,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mr: 2,
          }}
        >
          <Box
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: "50%",
            }}
          >
             <DataUsageIcon 
          sx={{ 
            color: "#FFFFFF",
            fontSize: 28,
            marginRight: 1.5
          }}
        />

          </Box>
        </Box>
        <Typography
          variant="h6"
          sx={{
            color: "white",
            fontWeight: "bold",
            fontSize: "20px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {/* DAILY USAGE */}
            {t('menu.dailyUsage')}
        </Typography>
      </Box>

      {/* Legend */}
      <Box
        sx={{
          display: "flex",
          padding: "12px 24px",
          alignItems: "center",
          backgroundColor: "#082444",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>
          <FiberManualRecordIcon sx={{ color: "#4FD745", fontSize: 13, marginRight: 0.5 }} />
          <Typography variant="body2" sx={{ color: "#FFFFFF", fontSize: "14px" }}>
            {/* Base Bundle */}
            {t('dailyusage.base')}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>
          <FiberManualRecordIcon sx={{ color: "#FF0000", fontSize: 13, marginRight: 0.5 }} />
          <Typography variant="body2" sx={{ color: "#FFFFFF", fontSize: "14px" }}>
            {/* Extra GB */}
              {t('dailyusage.extra_gb')}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>
          <FiberManualRecordIcon sx={{ color: "#F6E901", fontSize: 13, marginRight: 0.5 }} />
          <Typography variant="body2" sx={{ color: "#FFFFFF", fontSize: "14px" }}>
            {/* Loyalty */}
            {t('dailyusage.loyalty')}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>
          <FiberManualRecordIcon sx={{ color: "#00B4EB", fontSize: 13, marginRight: 0.5 }} />
          <Typography variant="body2" sx={{ color: "#FFFFFF", fontSize: "14px" }}>
          {t('dailyusage.vas')}
          </Typography>
        </Box>

        {/* Month Selector */}
        <Box sx={{ 
          display: "flex", 
          justifyContent: "flex-end",
          marginLeft: "auto"
        }}>
          <Button
            id="month-selection-button"
            aria-controls={open ? 'month-selection-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{
              // backgroundColor: "#0A2D62",
              color: "#FFFFFF",
              borderRadius: "10px",
              textTransform: "none",
              padding: "4px 12px",
              fontSize: "14px",
              border: "0.1px solid white",
              minWidth: "140px",
              justifyContent: "space-between",
              '&:hover': {
                backgroundColor: "#0A3D7A",
              }
            }}
          >
            {selectedMonth}
          </Button>
          <Menu
            id="month-selection-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'month-selection-button',
            }}
            sx={{
              '& .MuiPaper-root': {
                backgroundColor: "#0A2D62",
                borderRadius: "4px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
              }
            }}
          >
            {months.map((month) => (
              <MenuItem 
                key={month} 
                onClick={() => handleMonthChange(month)}
                sx={{
                  color: "#FFFFFF",
                  fontSize: "14px",
                  '&:hover': {
                    backgroundColor: "#0A3D7A",
                  }
                }}
              >
                {month}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>

      {/* Table Header */}
      <Box sx={{ padding: "0 16px" }}>
        <Box
          sx={{
            display: "flex",
            backgroundColor: "#0A2D62",
            padding: "12px 16px",
            borderRadius: "6px",
          }}
        >
          <Box sx={{ flex: "0 0 80px" }}>
            <Typography sx={{ color: "#FFFFFF", fontWeight: 500, fontSize: "14px"}}>
              {t('dailyusage.date')}
            </Typography>
          </Box>
          <Box sx={{ flex: "0 0 120px", textAlign: "center" }}>
            <Typography sx={{ color: "#FFFFFF", fontWeight: 500, fontSize: "14px" }}>
              {t('dailyusage.total_usage')}
            </Typography>
            <Typography sx={{ color: "#FFFFFF", fontSize: "12px" }}>
              ({t('dailyusage.inGB')})
            </Typography>
          </Box>
          <Box sx={{ flex: 1, textAlign: "center" }}>
            <Typography sx={{ color: "#FFFFFF", fontWeight: 500, fontSize: "14px" }}>
              {t('dailyusage.usage')}
            </Typography>
          </Box>
          <Box sx={{ flex: "0 0 80px", textAlign: "center" }}>
            <Typography sx={{ color: "#FFFFFF", fontWeight: 500, fontSize: "14px" }}>
              {t('dailyusage.report')}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Loading state */}
      {loading && (
        <Box sx={{ padding: "20px", textAlign: "center" }}>
          <Typography variant="body1" sx={{ color: "#FFFFFF" }}>
            Loading data...
          </Typography>
        </Box>
      )}

      {/* Table Content - with fixed height and scrolling */}
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          padding: "8px 16px",
          maxHeight: "calc(700px - 152px)", // Calculated to ensure total component height is 700px
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(255, 255, 255, 0.1)',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '10px',
          },
        }}
      >
        {usageData && usageData.length > 0 ? (
          usageData.map((row: DailyUsageDetails, index: number) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "12px 16px",
                borderRadius: "6px",
                marginBottom: "4px",
                backgroundColor: "#001E54",
                '&:hover': {
                  backgroundColor: "#072761",
                }
              }}
            >
              {/* Date */}
              <Box sx={{ flex: "0 0 80px" }}>
                <Typography sx={{ color: "#FFFFFF", fontSize: "14px" }}>
                  {row.displaydate}
                </Typography>
              </Box>
              
              {/* Total Usage */}
              <Box sx={{ flex: "0 0 120px", textAlign: "center" }}>
                <Typography sx={{ color: "#FFFFFF", fontSize: "14px" }}>
                  {row.daily_total_usage} GB
                </Typography>
              </Box>
              
              {/* Usage Bar */}
              <Box sx={{ flex: 1, paddingX: 2, position: "relative" }}>
                {row?.usages ? (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        height: 8,
                        borderRadius: "4px",
                        backgroundColor: "#102B56",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          width: `${row.daily_percentage}%`,
                          height: "100%",
                        }}
                      >
                        {row.usages.map((usage, idx) => (
                          <Box
                            key={idx}
                            sx={{
                              width: `${usage.percentage}%`,
                              height: 8,
                              backgroundColor: 
                                usage.sorter === 1 ? "#4FD745" : 
                                usage.sorter === 2 ? "#F6E901" : 
                                usage.sorter === 3 ? "#FF0000" : "#00B4EB",
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                    <Link
                      onClick={() => {
                        setUsageDetails(row); // Set the usage details first
                        setShowPopup(true); // Show the popup instead of navigating
                      }}
                      href="#"
                      sx={{
                        fontSize: "12px",
                        color: "rgba(255, 255, 255, 0.7)",
                        textAlign: "center",
                        display: "block",
                        marginTop: "6px",
                        textDecoration: "none",
                        '&:hover': {
                          color: "#FFFFFF",
                          textDecoration: "underline",
                        }
                      }}
                    >
                      {/* View Detailed Usage */}
                      {t('dailyusage.view_detailed')}
                    </Link>
                  </>
                ) : (
                  <Typography variant="body2" sx={{ color: "#FFFFFF", textAlign: "center" }}>
                    No data
                  </Typography>
                )}
              </Box>
              
              {/* Report */}
              <Box sx={{ flex: "0 0 80px", textAlign: "center" }}>
                <Link
                  onClick={() => {
                    if (detailReportAvailability) {
                      setLeftMenuItem("ProtocolReport");
                      setUsageDetails(row);
                    } else {
                      setLeftMenuItem("Subscription");
                    }
                  }}
                  href="#"
                  sx={{
                    color: "#FFFFFF",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: 500,
                    '&:hover': {
                      textDecoration: "underline",
                    }
                  }}
                >
                  {/* View */}
                  {t('dailyusage.view')}
                </Link>
              </Box>
            </Box>
          ))
        ) : (
          <Box sx={{ padding: "20px", textAlign: "center" }}>
            <Typography variant="body1" sx={{ color: "#FFFFFF" }}>
              No data available
            </Typography>
          </Box>
        )}
      </Box>
      
      {/* Detailed Usage Popup */}
      {showPopup && <DetailedUsage onClose={closePopup} />}
    </Box>
  );
};

export default DailyUsage;