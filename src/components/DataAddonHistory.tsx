import React, { useState, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fetchPurchaseHistory from "../services/postpaid/fetchhistorydetails";
import { DataBundle } from "../types/types";
import { Box, Typography, Button, TextField, CircularProgress} from "@mui/material";
import useStore from "../services/useAppStore";
import HistoryIcon from '@mui/icons-material/History';
import { useTranslation } from 'react-i18next';

const PurchaseHistoryComponent: React.FC = () => {
  const { t } = useTranslation();
  const [purchaseHistory, setPurchaseHistory] = useState<DataBundle[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { serviceDetails } = useStore();
  const subscriberID = serviceDetails?.listofBBService[0]?.serviceID;
  const [historyFrom, setHistoryFrom] = useState<Date | null>(new Date());
  const [historyTo, setHistoryTo] = useState<Date | null>(new Date());

  const handleFromDateChange = useCallback((date: Date | null) => {
    setHistoryFrom(date);
  }, []);

  const handleToDateChange = useCallback((date: Date | null) => {
    setHistoryTo(date);
  }, []);

  const handleSearch = async () => {
    if (!historyFrom || !historyTo) return;
    if (historyFrom > historyTo) {
      setError("Invalid date range: 'From' date cannot be later than 'To' date.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const formattedFrom = historyFrom.toLocaleDateString("en-CA");
      const formattedTo = historyTo.toLocaleDateString("en-CA");
      const data = await fetchPurchaseHistory(subscriberID!, formattedFrom, formattedTo);
      setPurchaseHistory(data && data.length > 0 ? data : []);
    } catch {
      setError("Failed to fetch purchase history. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate the fixed height based on viewport
  const contentHeight = "calc(75vh - 300px)";

  return (
    <Box
      sx={{
        width: "100%",
        margin: "10px auto",
        padding: "0",
        textAlign: "center",
        background: "#082444",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#1a3564",
          padding: "10px",
          width:"96.5%",
          marginLeft:"15px",
          marginTop:"10px",
          borderRadius: 2,
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
              width: 26,
              height: 26,
              borderRadius: "50%",
              marginRight: "10px",
            }}
          >
            <HistoryIcon 
              sx={{ 
                color: "#FFFFFF",
                fontSize: 30,
                marginRight: 0
              }} 
            />
          </Box>
        </Box>
        <Typography
          variant="h6"
          sx={{
            color: "white",
            fontWeight: "bold",
            fontSize: "18px",
            fontFamily: "Poppins, sans-serif",
            letterSpacing: "0.5px",
          }}
        >
          {t('menu.history')}
        </Typography>
      </Box>

      {/* Date Inputs & Search Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 20px",
          backgroundColor: "#0A2D62",
          margin: "10px 15px",
          borderRadius: "5px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold", color: "white", marginRight: "8px", fontSize: "14px", fontFamily: "Poppins, sans-serif" }}>
               {t('menu.from')} :
            </Typography>
            <DatePicker
              selected={historyFrom}
              onChange={handleFromDateChange}
              dateFormat="yyyy-MM-dd"
              maxDate={historyTo || undefined}
              customInput={
                <TextField
                  variant="outlined"
                  size="small"
                  sx={{
                    width: "115px",
                    backgroundColor: "#fff",
                    borderRadius: "6px",
                    "& .MuiOutlinedInput-root": {
                      height: "36px",
                      "& fieldset": { borderColor: "transparent" },
                      "&:hover fieldset": { borderColor: "transparent" },
                      "&.Mui-focused fieldset": { borderColor: "transparent" },
                    },
                    "& .MuiInputBase-input": {
                      padding: "8px 10px",
                      fontSize: "14px",
                      textAlign: "center",
                      fontFamily: "Poppins, sans-serif",
                    },
                  }}
                />
              }
            />
          </Box>
          
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold", color: "white", marginRight: "8px", fontSize: "14px", fontFamily: "Poppins, sans-serif" }}>
               {t('menu.to')}  :
            </Typography>
            <DatePicker
              selected={historyTo}
              onChange={handleToDateChange}
              dateFormat="yyyy-MM-dd"
              minDate={historyFrom || undefined}
              customInput={
                <TextField
                  variant="outlined"
                  size="small"
                  sx={{
                    width: "115px",
                    backgroundColor: "#fff",
                    borderRadius: "6px",
                    "& .MuiOutlinedInput-root": {
                      height: "36px",
                      "& fieldset": { borderColor: "transparent" },
                      "&:hover fieldset": { borderColor: "transparent" },
                      "&.Mui-focused fieldset": { borderColor: "transparent" },
                    },
                    "& .MuiInputBase-input": {
                      padding: "8px 10px",
                      fontSize: "14px",
                      textAlign: "center",
                      fontFamily: "Poppins, sans-serif",
                    },
                  }}
                />
              }
            />
          </Box>
        </Box>
        <Button
          variant="contained"
          sx={{
            padding: "8px 25px",
            fontSize: "14px",
            fontWeight: "600",
            background: "#0093dd",
            color: "white",
            borderRadius: "6px",
            textTransform: "none",
            "&:hover": { backgroundColor: "#007bbf" },
            minWidth: "100px",
            height: "36px",
            fontFamily: "Poppins, sans-serif",
          }}
          onClick={handleSearch}
        >
          {t('menu.search')}
        </Button>
      </Box>
      
      {/* History Items Container - Fixed height container */}
      <Box 
        sx={{ 
          padding: "0 15px", 
          height: contentHeight,
          minHeight: contentHeight,
          overflow: "auto",
          marginBottom: "15px",
          display: "flex",
          flexDirection: "column",
          justifyContent: loading ? "center" : "flex-start",
          alignItems: loading ? "center" : "stretch",
          // Custom scrollbar styling
          "&::-webkit-scrollbar": {
            width: "8px",
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "rgba(10, 45, 98, 0.4)",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#0093dd",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "#007bbf",
            },
          },
          // Firefox scrollbar styling
          scrollbarWidth: "thin",
          scrollbarColor: "#0093dd rgba(10, 45, 98, 0.4)",
        }}
      >
        {loading && <CircularProgress sx={{ color: "#0056A2" }} />}
        
        {!loading && error && (
          <Typography sx={{ 
            padding: "20px", 
            color: "#ff4d4d", 
            fontWeight: "bold",
            fontFamily: "Poppins, sans-serif",
          }}>
            {error}
          </Typography>
        )}
        
        {!loading && purchaseHistory && purchaseHistory.length > 0 ? (
          <Box>
            {purchaseHistory.map((item, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: "#0A2D62",
                  color: "white",
                  padding: "15px",
                  borderRadius: "5px",
                  marginBottom: "10px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "flex-start",
                  marginBottom: "12px"
                }}>
                  <Box sx={{ textAlign: "left" }}>
                    <Typography variant="h6" sx={{ color: "white", fontWeight: "normal", marginBottom: "2px", fontSize: "14px", fontFamily: "Poppins, sans-serif" }}>
                      {item.vasType}
                    </Typography>
                    <Typography variant="h4" sx={{ color: "#ffed00", fontWeight: "bold", fontSize: "28px", fontFamily: "Poppins, sans-serif" }}>
                      {item.vasPackage}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant="h5" sx={{ color: "white", fontWeight: "bold", fontSize: "16px", fontFamily: "Poppins, sans-serif" }}>
                      Rs. {item.payPrice}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ 
                  display: "flex", 
                  justifyContent: "flex-end", 
                  gap: "16px",
                  textAlign: "right"
                }}>
                  <Typography variant="body2" sx={{ color: "white", fontSize: "11px", fontFamily: "Poppins, sans-serif" }}>
                    Added by : {item.subscriberId}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "white", fontSize: "11px", fontFamily: "Poppins, sans-serif" }}>
                    Valid Till : {item.validTill}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          !loading && purchaseHistory !== null && 
          <Typography sx={{ 
            padding: "20px", 
            fontSize: "18px", 
            fontWeight: 600, 
            color: "white",
            fontFamily: "Poppins, sans-serif",
          }}>
            No purchase history available.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default PurchaseHistoryComponent;