import {
    BarChart,
    Call as CallIcon,
    Message,
    Phone
} from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React from "react";

// Define component types
type ComponentType = "Data" | "Voice" | "SMS" | "Call";

// Define tab interface
interface Tab {
  key: ComponentType;
  label: string;
  icon: React.ReactElement;
}

// Define props interface
interface NavigationTabsProps {
  activeComponent: ComponentType;
  setActiveComponent: (component: ComponentType) => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ 
  activeComponent, 
  setActiveComponent 
}) => {
  const tabs: Tab[] = [
    { key: "Data", label: "Data", icon: <BarChart fontSize="small" /> },
    { key: "Voice", label: "Voice", icon: <Phone fontSize="small" /> },
    { key: "SMS", label: "SMS", icon: <Message fontSize="small" /> },
    { key: "Call", label: "Call", icon: <CallIcon fontSize="small" /> },
  ];

  const handleTabClick = (tabKey: ComponentType): void => {
    setActiveComponent(tabKey);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 1.5,
        mb: 0,
        backgroundColor: "#1a3a6b",
        borderRadius: "12px",
        p: 1,
      }}
    >
      {tabs.map((tab: Tab) => (
        <Button
          key={tab.key}
          onClick={() => handleTabClick(tab.key)}
          startIcon={tab.icon}
          sx={{
            flex: 1,
            backgroundColor: activeComponent === tab.key ? "#2c5aa0" : "transparent",
            color: "white",
            borderRadius: "8px",
            textTransform: "none",
            fontSize: "14px",
            fontWeight: "bold",
            py: 1,
            "&:hover": {
              backgroundColor: activeComponent === tab.key ? "#2c5aa0" : "rgba(255,255,255,0.1)",
            },
          }}
        >
          {tab.label}
        </Button>
      ))}
    </Box>
  );
};

export default NavigationTabs;
export type { ComponentType };
