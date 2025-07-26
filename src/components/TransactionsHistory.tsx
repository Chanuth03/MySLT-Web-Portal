import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import fetchTransactionHistory from "../services/prepaid/fetchTransactionHistory";
import { parseTime } from "../services/helperFunctions";
import { Transaction } from "../types/types";

interface TransactionsHistoryProps {
  serviceId: string;
}

const formatTxnDate = (timestamp: string): string => {
  const date = parseTime(timestamp);
  return date ? date.toISOString().slice(0, 10) : ""; // Format as YYYY-MM-DD
};

const formatTxnTime = (timestamp: string): string => {
  const date = parseTime(timestamp);
  return date ? date.toISOString().slice(11, 19) : ""; // Format as HH:MM:SS
};

// Convert Date to format YYYYMMDD for API
const formatDateForApi = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
};

// Convert date string to YYYY-MM-DD format for input fields
const formatDateForInput = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

const TransactionsHistory: React.FC<TransactionsHistoryProps> = ({ serviceId }) => { 
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  // Get initial date range (last month to today)
  const initialToDate = new Date();
  const initialFromDate = new Date(initialToDate);
  initialFromDate.setMonth(initialFromDate.getMonth() - 1);
  
  // State for form inputs
  const [fromDate, setFromDate] = useState<string>(formatDateForInput(initialFromDate));
  const [toDate, setToDate] = useState<string>(formatDateForInput(initialToDate));

  const fetchTransactions = async (fromDateStr: string, toDateStr: string) => {
    setLoading(true);
    try {
      // Convert the date strings from YYYY-MM-DD to YYYYMMDD format
      const fromDateObj = new Date(fromDateStr);
      const toDateObj = new Date(toDateStr);
      
      const formattedFromDate = formatDateForApi(fromDateObj);
      const formattedToDate = formatDateForApi(toDateObj);
      
      const data: Transaction[] | null = await fetchTransactionHistory(
        serviceId,
        formattedFromDate,
        formattedToDate
      );
      
      if (data) {
        const sortedTransactions = data.sort((a, b) => b.txnTime.localeCompare(a.txnTime));
        setTransactions(sortedTransactions);
        setError(null);
      } else {
        setError("Failed to fetch transaction history or data not found.");
      }
    } catch (fetchError) {
      setError(`An error occurred while fetching transaction history. ${fetchError}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load initial data when component mounts
    fetchTransactions(fromDate, toDate);
  }, [serviceId]); // Only run on initial mount or when serviceId changes

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate date range
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);
    
    if (fromDateObj > toDateObj) {
      setError("From date cannot be after to date");
      return;
    }
    
    // Clear any previous errors and fetch transactions
    setError(null);
    fetchTransactions(fromDate, toDate);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#1B1D41",
        color: "#FFFFFF1A",
        padding: 1.5,
        borderRadius: "10px",
        height: "100%",
        boxShadow: "0px 3px 3px #0000004A",
        overflow: "hidden",
      }}
    >
      <Box sx={{ padding: 1, width: "100%" }}>
        <Typography
          variant="body2"
          align="center"
          sx={{ fontSize: 23, fontWeight: "bold", color: "#fff", marginBottom: 2 }}
        >
          ── Transactions History ──
        </Typography>

        {/* Date range form */}
        <Box 
          component="form" 
          onSubmit={handleSubmit}
          sx={{ 
            display: "flex", 
            gap: 2, 
            mb: 2, 
            mt: 4,
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TextField
            label="From Date"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            size="small"
            required
            sx={{ 
              width: { xs: "100%", sm: "auto" }, 
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#fff" },
                "&:hover fieldset": { borderColor: "#fff" },
                "&.Mui-focused fieldset": { borderColor: "#fff" },
              },
              "& .MuiInputLabel-root": { color: "#fff" },
              "& .MuiInputBase-input": { color: "#fff" }
            }}
          />
          <TextField
            label="To Date"
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            size="small"
            required
            sx={{ 
              width: { xs: "100%", sm: "auto" }, 
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#fff" },
                "&:hover fieldset": { borderColor: "#fff" },
                "&.Mui-focused fieldset": { borderColor: "#fff" },
              },
              "& .MuiInputLabel-root": { color: "#fff" },
              "& .MuiInputBase-input": { color: "#fff" }
            }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            disabled={loading}
            sx={{ 
              bgcolor: "#0056A2", 
              "&:hover": { bgcolor: "#003B6F" },
              height: 40,
              px: 3
            }}
          >
            {loading ? "Loading..." : "Submit"}
          </Button>
        </Box>

        {error ? (
          <Typography color="error" align="center" sx={{ marginY: 2 }}>
            {error}
          </Typography>
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 2,
              overflow: "auto",
              maxHeight: 335,
              paddingRight: 0.5,
              "&::-webkit-scrollbar": {
                width: "8px",
                height: "8px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f1f1f1",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#0D67A6",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#0056A2",
              },
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#0056A2" }}>
                  <TableCell
                    sx={{
                      color: "#FFFFFF",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#FFFFFF",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Time
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#FFFFFF",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#FFFFFF",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Reload Amount
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ color: "#0D67A6" }}>
                      {loading ? "Loading transactions..." : "No transactions found for the selected period"}
                    </TableCell>
                  </TableRow>
                ) : (
                  transactions.map((transaction) => (
                    <TableRow
                      key={transaction.id}
                      sx={{
                        backgroundColor: "#0D67A6",
                        borderRadius: 2,
                        marginY: 1,
                      }}
                    >
                      <TableCell
                        sx={{
                          color: "#FFFFFF",
                          textAlign: "center",
                          whiteSpace: "pre-line",
                        }}
                      >
                        {formatTxnDate(transaction.txnTime)}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#FFFFFF",
                          textAlign: "center",
                        }}
                      >
                        {formatTxnTime(transaction.txnTime)}
                      </TableCell>
                      <TableCell sx={{ color: "#FFFFFF", textAlign: "center" }}>
                        {transaction.statusCode === "1001" ? "Recharge Success" : "Recharge Failed"}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#FFFFFF",
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        Rs. {transaction.txnAmount}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default TransactionsHistory;