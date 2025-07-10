import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import useStore from "../services/useAppStore";
import { useTranslation } from 'react-i18next';

const MenuLeft: React.FC = () => {
  const { t } = useTranslation();
  const {
    serviceDetails,
    setLeftMenuItem,
    selectedLeftMenuItem,
    selectedNavbarItem,
    detailReportAvailability,
  } = useStore();

  const isPrepaid =
    serviceDetails?.promotionType === "Prepaid" ||
    serviceDetails?.promotionType === null;

  // Keep English keys for internal logic
  const postPaidItems = [
    "summary",
    "dailyUsage",
    "giftData",
    "history",
    "redeemData",
    "happyDay",
    "more",
  ];
  const prePaidItems = ["mainPackages", "dataAddOns"];
  const broadbandItems = isPrepaid ? prePaidItems : postPaidItems;
  const peoTVItems = ["myPackage", "vod", "peoTvGo", "packages"];
  const voiceItems = ["myPackage", "callForwarding"];

  let items =
    selectedNavbarItem === "Broadband"
      ? broadbandItems
      : selectedNavbarItem === "PeoTV"
      ? peoTVItems
      : voiceItems;

  const [selectedItem, setSelectedItem] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [mousePosition, setMousePosition] = useState<{ mouseX: number; mouseY: number } | null>(null);

  // Helper function to get display text
  const getDisplayText = (itemKey: string): string => {
    return t(`menu.${itemKey}`);
  };

  // Helper function to convert display text back to key (for backward compatibility)
  const getKeyFromDisplayText = (displayText: string): string => {
    // Map of display texts to keys for backward compatibility
    const displayToKeyMap: { [key: string]: string } = {
      "Summary": "summary",
      "Daily Usage": "dailyUsage",
      "Gift Data": "giftData",
      "History": "history",
      "Redeem Data": "redeemData",
      "Happy Day": "happyDay",
      "More": "more",
      "Main Packages": "mainPackages",
      "Data Add-Ons": "dataAddOns",
      "My Package": "myPackage",
      "VOD": "vod",
      "PEOTVGO": "peoTvGo",
      "Packages": "packages",
      "Call Forwarding": "callForwarding",
    };
    
    return displayToKeyMap[displayText] || displayText;
  };

  useEffect(() => {
    if (isPrepaid && selectedNavbarItem === "Broadband") {
      setSelectedItem("mainPackages");
      setLeftMenuItem("Main Packages"); // Keep backward compatibility for store
    } else if (!isPrepaid && selectedNavbarItem === "Broadband") {
      setSelectedItem("summary");
      setLeftMenuItem("Summary"); // Keep backward compatibility for store
    } else {
      setSelectedItem("myPackage");
      setLeftMenuItem("My Package"); // Keep backward compatibility for store
    }
  }, [isPrepaid, selectedNavbarItem]);

  useEffect(() => {
    // Convert selectedLeftMenuItem to key format for internal use
    const selectedKey = getKeyFromDisplayText(selectedLeftMenuItem);
    setSelectedItem(selectedKey);
  }, [selectedLeftMenuItem]);

  const handleMoreClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setMousePosition({ mouseX: event.clientX, mouseY: event.clientY });
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMousePosition(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "more-popover" : undefined;

  // More menu items with their translation keys
  const moreMenuItems = [
    {
      key: detailReportAvailability ? "disableDetailReport" : "subscription",
      displayKey: detailReportAvailability ? "disableDetailReport" : "subscription",
      legacyValue: detailReportAvailability ? "DisableDetailReport" : "Subscription"
    },
    {
      key: "contactInformationChange",
      displayKey: "contactInformationChange", 
      legacyValue: "ContactInformationChange"
    }
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 2.2,
        width: "100%",
        color: "#FFFFFF1A",
        padding: 1,
        background: "linear-gradient(to right, #0068B1, #183366)",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        maxHeight: "500px",
      }}
    >
      {items.map((item, index) => (
        <Button
          key={index}
          sx={{
            backgroundColor: item === selectedItem ? "rgba(255, 255, 255, 0.15)" : "#192B5F",
            borderRadius: "10px",
            padding: 1.1,
            color: "#ffffff",
            minWidth: "100px",
            justifyContent: "center",
            margin: "2px",
            "&:hover": {
              backgroundColor: item === selectedItem ? " rgba(255, 255, 255, 0.1)" : " rgba(255, 255, 255, 0.1)",
              borderColor: "#50B748",
            },
          }}
          onClick={(event) => {
            if (item === "more") {
              handleMoreClick(event);
            } else {
              setSelectedItem(item);
              // Convert key back to legacy format for store compatibility
              const legacyMap: { [key: string]: string } = {
                "summary": "Summary",
                "dailyUsage": "Daily Usage",
                "giftData": "Gift Data",
                "history": "History",
                "redeemData": "Redeem Data",
                "happyDay": "Happy Day",
                "mainPackages": "Main Packages",
                "dataAddOns": "Data Add-Ons",
                "myPackage": "My Package",
                "vod": "VOD",
                "peoTvGo": "PEOTVGO",
                "packages": "Packages",
                "callForwarding": "Call Forwarding",
              };
              setLeftMenuItem(legacyMap[item] || item);
            }
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: "16px",
              color: item === selectedItem ? "#FFFFFF" : "#FFFFFF",
              textTransform: "capitalize",
              fontWeight: item === selectedItem ? 600 : 600,
            }}
          >
            {getDisplayText(item)}
          </Typography>
        </Button>
      ))}

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={mousePosition ? { top: mousePosition.mouseY + 10, left: mousePosition.mouseX } : undefined}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#1A2148",
            minWidth: 200,
            padding: 0,
            color: "#333",
          },
        }}
      >
        <List>
          {moreMenuItems.map((menuItem, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClose();
                  setLeftMenuItem(menuItem.legacyValue);
                }}
              >
                <ListItemText>
                  <Typography variant="body2" sx={{ color: "#fff", fontSize: 16 }}>
                    {t(`menu.${menuItem.displayKey}`)}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
    </Box>
  );
};

export default MenuLeft;