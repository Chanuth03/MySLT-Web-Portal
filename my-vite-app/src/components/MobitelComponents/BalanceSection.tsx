import { Box, Button, Typography } from "@mui/material";
import React from "react";

// Define props interface
interface BalanceSectionProps {
  balance?: number;
  currency?: string;
  onGetLoan?: () => void;
  onReload?: () => void;
  onMore?: () => void;
}

const BalanceSection: React.FC<BalanceSectionProps> = ({ 
  balance = 120.00,
  currency = "Rs",
  onGetLoan,
  onReload,
  onMore
}) => {
  const handleGetLoan = (): void => {
    if (onGetLoan) {
      onGetLoan();
    }
  };

  const handleReload = (): void => {
    if (onReload) {
      onReload();
    }
  };

  const handleMore = (): void => {
    if (onMore) {
      onMore();
    }
  };

  return (
    <Box
      sx={{
        width: "40%",
        display: "flex",
        flexDirection: "column",
        padding: "16px",
        justifyContent: "space-between",
        background: "linear-gradient(135deg, #4ade80, #128b37)",
        borderRadius: "12px",
      }}
    >
      {/* Balance */}
      <Typography
        fontSize="16px"
        color="white"
        fontWeight="bold"
        mb={3}
        marginLeft={-1}
      >
        Balance : {currency}. {balance.toFixed(2)}
      </Typography>

      {/* Buttons */}
      <Box
        display="flex"
        justifyContent={"flex-end"}
        gap={1}
        flexWrap="wrap"
      >
        <Button
          onClick={handleGetLoan}
          sx={{
            borderRadius: "20px",
            color: "white",
            border: "1px solid white",
            textTransform: "none",
            fontSize: "12px",
            px: 1.5,
            py: 0.5,
            minWidth: "auto",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          Get a loan
        </Button>
        <Button
          onClick={handleReload}
          sx={{
            borderRadius: "20px",
            color: "white",
            border: "1px solid white",
            textTransform: "none",
            fontSize: "12px",
            px: 1.5,
            py: 0.5,
            minWidth: "auto",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          RELOAD
        </Button>
        <Button
          onClick={handleMore}
          sx={{
            borderRadius: "20px",
            color: "white",
            border: "1px solid white",
            textTransform: "none",
            fontSize: "12px",
            px: 1.5,
            py: 0.5,
            display: "flex",
            alignItems: "center",
            minWidth: "auto",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          MORE ▼
        </Button>
      </Box>
    </Box>
  );
};

export default BalanceSection;