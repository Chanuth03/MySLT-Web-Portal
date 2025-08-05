import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";

type ReloadAmount = 50 | 100 | 150 | 200;
type QuickReloadTab = "activation" | "reload";

interface QuickReloadSectionProps {
  onBuyReload?: (amount: ReloadAmount) => void;
  currency?: string;
  reloadAmounts?: ReloadAmount[];
}

const QuickReloadSection: React.FC<QuickReloadSectionProps> = ({
  onBuyReload,
  currency = "R$",
  reloadAmounts = [50, 100, 150, 200],
}) => {
  const [activeTab, setActiveTab] = useState<QuickReloadTab>("reload");

  const handleBuyClick = (amount: ReloadAmount) => {
    onBuyReload?.(amount);
    console.log(`Buying reload for ${currency} ${amount}`);
  };

  const handleTabClick = (tab: QuickReloadTab) => {
    setActiveTab(tab);
  };

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "#082444",
        borderRadius: "20px",
        p: 2,
        gap: 2,
        alignItems: "stretch",
        mt: 1.2,
      }}
    >
      {/* Left side buttons */}
      <Box
        display="flex"
        flexDirection="column"
        gap={1}
        minWidth="150px"
        justifyContent="center"
      >
        <Button
          onClick={() => handleTabClick("activation")}
          sx={{
            backgroundColor: activeTab === "activation" ? "#133b63" : "#0a2b4a",
            color: "#fff",
            borderRadius: "8px",
            px: 2,
            py: 1,
            fontSize: "14px",
            fontWeight: 500,
            textTransform: "none",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.2)",
            "&:hover": { backgroundColor: "#133b63" },
          }}
        >
          Quick Activation
        </Button>
        <Button
          onClick={() => handleTabClick("reload")}
          sx={{
            backgroundColor: activeTab === "reload" ? "#133b63" : "#0a2b4a",
            color: "#fff",
            borderRadius: "8px",
            px: 2,
            py: 1,
            fontSize: "14px",
            fontWeight: 500,
            textTransform: "none",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.2)",
            "&:hover": { backgroundColor: "#133b63" },
          }}
        >
          Quick Reload
        </Button>
      </Box>

      {/* Right side content */}
      <Box flex={1}>
        {activeTab === "reload" && (
          <Box
            display="grid"
            gridTemplateColumns="repeat(4, 1fr)"
            gap={2}
            alignItems="stretch"
          >
            {reloadAmounts.map((amount) => (
              <Box
                key={amount}
                sx={{
                  bgcolor: "#e9f4ff",
                  borderRadius: "10px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  },
                  // border: "0.1px solid rgba(0,0,0,0.05)",
                }}
              >
                {/* Price section */}
                <Box
                  sx={{
                    textAlign: "center",
                    pt: 2,
                    pb: 1.5,
                    backgroundColor: "#d9ecff",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#000",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                    }}
                  >
                    {currency}
                    <Box
                      component="span"
                      sx={{ fontSize: "28px", mx: 0.5, fontWeight: 700 }}
                    >
                      {amount}
                    </Box>
                    .
                    <Box component="span" sx={{ fontSize: "14px" }}>00</Box>
                  </Typography>
                </Box>

                {/* BUY button */}
                <Button
                  onClick={() => handleBuyClick(amount)}
                  sx={{
                    mt: "auto",
                    bgcolor: "#0091ff",
                    color: "white",
                    borderRadius: "0",
                    fontSize: "14px",
                    fontWeight: 600,
                    py: 1.2,
                    "&:hover": {
                      bgcolor: "#0077d9",
                    },
                  }}
                >
                  BUY
                </Button>
              </Box>
            ))}
          </Box>
        )}

        {activeTab === "activation" && (
          <Box
            sx={{
              bgcolor: "#0a2b4a",
              borderRadius: "10px",
              p: 3,
              textAlign: "center",
            }}
          >
            <Typography color="white" fontSize="16px">
              Quick Activation features will be available soon
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default QuickReloadSection;
export type { ReloadAmount };
