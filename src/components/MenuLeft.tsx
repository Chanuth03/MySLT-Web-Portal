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

const MenuLeft: React.FC = () => {
  const {
    serviceDetails,
    setLeftMenuItem,
    selectedLeftMenuItem,
    selectedNavbarItem,
    detailReportAvailability,
  } = useStore();

  const isPrepaid: boolean =
    serviceDetails?.promotionType === "Prepaid" ||
    serviceDetails?.promotionType === null;

  const postPaidItems: string[] = [
    "Summary",
    "Daily Usage",
    "Gift Data",
    "History",
    "Redeem Data",
    "Happy Day",
    "More",
  ];
  const prePaidItems: string[] = ["Main Packages", "Data Add-Ons"];
  const broadbandItems: string[] = isPrepaid ? prePaidItems : postPaidItems;
  const peoTVItems: string[] = ["My Package", "VOD", "PEOTVGO", "Packages"];
  const voiceItems: string[] = ["My Package", "Call Forwarding"];

  let items: string[];
  if (selectedNavbarItem === "Broadband") {
    items = broadbandItems;
  } else if (selectedNavbarItem === "PeoTV") {
    items = peoTVItems;
  
  } else {
    items = voiceItems;
  }

  const [selectedItem, setSelectedItem] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [mousePosition, setMousePosition] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  useEffect(() => {
    if (isPrepaid && selectedNavbarItem === "Broadband") {
      setSelectedItem("Main Packages");
      setLeftMenuItem("Main Packages");
    } else if (!isPrepaid && selectedNavbarItem === "Broadband") {
      setSelectedItem("Summary");
      setLeftMenuItem("Summary");
    } else if (selectedNavbarItem === "PeoTV") {
      setSelectedItem("My Package");
      setLeftMenuItem("My Package");
    } else if (selectedNavbarItem === "Voice") {
      setSelectedItem("My Package");
      setLeftMenuItem("My Package");
    }
    
  }, [isPrepaid]);

  useEffect(() => {
    setSelectedItem(selectedLeftMenuItem);
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

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexDirection: "column",
        color: "#FFFFFF",
        padding: "10px",
        borderRadius: "10px",
        maxHeight: "100%",
      }}
    >
      {items.map((item, index) => (
        <Button
          sx={{
            backgroundColor: item === selectedItem ? "#0056A2" : "#192B5F",
            borderRadius: "10px",
            marginBottom: "10px",
            padding: "18px 10px;",
            "&:hover": {
              backgroundColor: item === selectedItem ? "#0056A2" : "rgba(0, 86, 162, 0.1)",
            },
          }}
          key={index}
          onClick={(event) => {
            if (item === "More") {
              handleMoreClick(event);
            } else {
              setSelectedItem(item);
              setLeftMenuItem(item);
            }
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: "16px",
              color: item === selectedItem ? "#FFFFFF" : "#FFFFFF",
              textTransform: "capitalize",
              fontWeight: item === selectedItem ? 700 : 600,
            }}
          >
            {item}
          </Typography>
        </Button>
      ))}

      {/* Popover for the More Button */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          mousePosition
            ? { top: mousePosition.mouseY + 10, left: mousePosition.mouseX }
            : undefined
        }
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#f5f5f5",
            minWidth: 200,
            padding: 0,
            color: "#333",
          },
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleClose();
                if (detailReportAvailability) {
                  setLeftMenuItem("DisableDetailReport");
                } else {
                  setLeftMenuItem("Subscription");
                }
              }}
            >
              <ListItemText>
                <Typography
                  variant="body2"
                  sx={{ color: "#00256A", fontSize: 16 }}
                >
                  {detailReportAvailability
                    ? "Disable Detailed Report"
                    : "Enable Detailed Report"}
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleClose();
                setLeftMenuItem("ContactInformationChange");
              }}
            >
              <ListItemText>
                <Typography
                  variant="body2"
                  sx={{ color: "#00256A", fontSize: 16 }}
                >
                  Change Contact Information
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleClose();
                setLeftMenuItem("BroadbandPasswordChange");
              }}
            >
              <ListItemText>
                <Typography
                  variant="body2"
                  sx={{ color: "#00256A", fontSize: 16 }}
                >
                  Change Broadband Password
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </Box>
  );
};

export default MenuLeft;
