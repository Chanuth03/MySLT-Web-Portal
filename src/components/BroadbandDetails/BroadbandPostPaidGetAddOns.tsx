import {
  Box,
  Button,
  Card,
  // CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import fetchLTEPostpaidAddOnPackages from "../../services/postpaid/fetchLTEPostpaidAddOnPackages";
import useStore from "../../services/useAppStore";
import { Addon, PostpaidAddOnPackage } from "../../types/types";
import { useTranslation } from 'react-i18next';
// import BroadbandNavbar from "./BroadbandNavbar";
import purchaseAddons from "../../services/postpaid/purchaseAddons";

const BroadbandPostPaidGetAddOns = () => {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [packages, setPackages] = useState<PostpaidAddOnPackage[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Addon | null>(null);
  const [activationType, setActivationType] = useState("onetime");
  const { serviceDetails, selectedTelephone } = useStore();
  const packageName = serviceDetails?.listofBBService[0]?.packageName;
  const subscriberID:string = serviceDetails?.listofBBService[0]?.serviceID || "";
  const [_activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current.offsetLeft || 0);
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const itemWidth = 250;
    const currentIndex = Math.round(scrollLeft / itemWidth) + 1;
    setActiveIndex(currentIndex);
  };

  useEffect(() => {
    const fetchPackages = async () => {
      const response = await fetchLTEPostpaidAddOnPackages(packageName, subscriberID);
      // Handle potential null response
      if (response) {
        setPackages(response);
        console.log("Packages: ", response);
        if (response.length > 0) setSelectedItem(response[0].category);
      } else {
        setPackages([]);
        console.log("No packages received");
      }
    };
    fetchPackages();
  }, [selectedTelephone]);

  const handleCardButtonClick = (addon: Addon) => {
    console.log("Selected Package: ", addon);
    setSelectedPackage(addon);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedPackage(null);
    setActivationType("onetime");
  };

  const handleActivation = async () => {
    if (!selectedPackage) {
      console.log("No package selected.");
      return;
    }
    const packageCategory = packages.find((category) =>
      category.addons.some((addon) => addon.id === selectedPackage.id)
    );
    if (!packageCategory) {
      console.log("Selected package category not found.");
      return;
    }
    const requiresCorrection =
      (packageCategory.category as string) === "LMS" ||
      (packageCategory.category as string) === "Home Schooling & WFH";
    if (!requiresCorrection) {
      console.log(
        `No correction needed for category: ${packageCategory.category}`
      );
      console.log(
        `Selected package is already correct: ${selectedPackage.name}`
      );
      return;
    }
    const basePackageName = selectedPackage.name
      .split(" ")
      .slice(0, -2)
      .join(" ");
    console.log("Base Package Name:", basePackageName);
    let correctedPackage = null;
    for (const addon of packageCategory.addons) {
      const isMatchingName = addon.name.startsWith(basePackageName);
      const isMatchingType =
        activationType === "recurrent" ? addon.recurring : !addon.recurring;
      if (isMatchingName && isMatchingType) {
        correctedPackage = addon;
        break;
      }
    }
    if (correctedPackage) {
      try {
        const result = await purchaseAddons(correctedPackage.id,subscriberID,correctedPackage.name);
        console.log("Package fetched successfully:", result);
      } catch (error) {
        console.error("Error fetching package:", error);
      }
    } else {
      console.log("No matching package found.");
    }
    handleDialogClose();
  };

  const navbarItems = packages.map((pkg) => ({
    label: pkg.category,
  }));

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgba(6, 29, 49, 0.74)",
          color: "#FFFFFF",
          height: "100%",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/* Left sidebar navigation */}
        <Box sx={{ display: "flex", height: "100%" }}>
          <Box
            sx={{
              width: "200px",
              display: "flex",
              flexDirection: "column",
              padding: 2,
              gap: 2,
            }}
          >
            {navbarItems.map((item, index) => (
              <Button
                key={index}
                variant="contained"
                sx={{
                  textAlign: "center",
                  backgroundColor: selectedItem === item.label ? "#0056A2" : "#192B5F",
                  color: "white",
                  borderRadius: 2,
                  padding: "12px",
                  textTransform: "none",
                  width: "100%",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#0056A2",
                  },
                }}
                onClick={() => setSelectedItem(item.label)}
              >
                {item.label}
              </Button>
            ))}
          </Box>
          {/* Main content area */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: "#1a3e6f",
              borderRadius: "12px",
              margin: 2,
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <Box
              ref={scrollRef}
              onScroll={handleScroll}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={() => setIsDragging(false)}
              sx={{
                display: "flex",
                gap: 3,
                width: "100%",
                padding: 1,
                overflowX: "auto",
                cursor: isDragging ? "grabbing" : "grab",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                userSelect: "none",
                scrollbarWidth: "none",
                justifyContent: "center",
              }}
            >
              {selectedItem.trim() === "LMS" ||
              selectedItem.trim() === "Home Schooling & WFH" ? (
                <>
                  {packages
                    .find((pkg) => pkg.category === selectedItem)
                    ?.addons.slice(0, 2)
                    .map((addon) => (
                      <Card
                        key={addon.id}
                        sx={{
                          width: "220px",
                          backgroundColor: "#2f5aa8",
                          borderRadius: "16px",
                          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                          overflow: "hidden",
                          position: "relative",
                          pb: 0,
                        }}
                      >
                        {/* Top part with laptop image */}
                        <Box
                          sx={{
                            backgroundColor: "#6693d0",
                            width: "100%",
                            height: "160px",
                            position: "relative",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            overflow: "hidden",
                            padding: "10px",
                          }}
                        >
                          <Box 
                            sx={{
                              height: "100%",
                              width: "100%",
                              backgroundImage: `url(${addon.icon_url})`,
                              backgroundSize: "contain",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                            }}
                          />
                        </Box>
                        
                        {/* Bottom white part with details */}
                        <Box
                          sx={{
                            backgroundColor: "white",
                            width: "100%",
                            padding: "15px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          {/* Meet Lite title */}
                          <Typography
                            sx={{
                              color: "#666666",
                              fontWeight: "500",
                              fontSize: "16px",
                              textAlign: "left",
                            }}
                          >
                            {addon.name.split(" ").slice(0, 2).join(" ")}
                          </Typography>
                          
                          {/* Price and data row */}
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              width: "100%",
                              mb: 1,
                            }}
                          >
                            {/* 30 GB */}
                            <Box
                              sx={{
                                backgroundColor: "#4c8dca",
                                color: "#ffffff",
                                padding: "5px 10px",
                                borderRadius: "5px",
                                fontSize: "14px",
                                fontWeight: "medium",
                              }}
                            >
                              {addon.description}
                            </Box>
                            
                            {/* Rs. 195.00 */}
                            <Typography
                              sx={{
                                color: "#666666",
                                fontWeight: "bold",
                                fontSize: "16px",
                              }}
                            >
                              {`Rs. ${addon.postprice}`}
                            </Typography>
                          </Box>
                          
                          {/* Activate Now button */}
                          <Button
                            sx={{
                              backgroundColor: "#4DB07F",
                              color: "white",
                              textTransform: "none",
                              borderRadius: "50px",
                              padding: "8px 15px",
                              fontWeight: "medium",
                              fontSize: "15px",
                              width: "100%",
                              "&:hover": {
                                backgroundColor: "#3F8E67",
                              },
                            }}
                            onClick={() => handleCardButtonClick(addon)}
                          >
                            {t("broadbandPostPaidGetAddOns.activateNow")}
                          </Button>
                        </Box>
                      </Card>
                    ))}
                </>
              ) : (
                <>
                  {packages
                    .find((pkg) => pkg.category === selectedItem)
                    ?.addons.map((addon) => (
                      <Card
                        key={addon.id}
                        sx={{
                          width: "220px",
                          backgroundColor: "#2f5aa8",
                          borderRadius: "16px",
                          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                          overflow: "hidden",
                          position: "relative",
                          pb: 0,
                        }}
                      >
                        {/* Top part with laptop image */}
                        <Box
                          sx={{
                            backgroundColor: "#6693d0",
                            width: "100%",
                            height: "160px",
                            position: "relative",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            overflow: "hidden",
                            padding: "10px",
                          }}
                        >
                          <Box 
                            sx={{
                              height: "100%",
                              width: "100%",
                              backgroundImage: `url(${addon.icon_url})`,
                              backgroundSize: "contain",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                            }}
                          />
                        </Box>
                        
                        {/* Bottom white part with details */}
                        <Box
                          sx={{
                            backgroundColor: "white",
                            width: "100%",
                            padding: "15px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          {/* Package title */}
                          <Typography
                            sx={{
                              color: "#666666",
                              fontWeight: "500",
                              fontSize: "14px",
                              textAlign: "left",
                            }}
                          >
                            {addon.name}
                          </Typography>
                          
                          {/* Price and data row */}
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              width: "100%",
                              mb: 1,
                            }}
                          >
                            {/* Data amount - Only show if data_volume exists */}
                            {addon.description && addon.description.trim() !== "" ? (
                              <Box
                                sx={{
                                  backgroundColor: "#4c8dca",
                                  color: "#ffffff",
                                  padding: "5px 10px",
                                  borderRadius: "5px",
                                  fontSize: "14px",
                                  fontWeight: "medium",
                                }}
                              >
                                {addon.description}
                              </Box>
                            ) : (
                              <Box sx={{ flex: 1 }}></Box> // Empty space filler when no data volume
                            )}
                            
                            {/* Price */}
                            <Typography
                              sx={{
                                color: "#666666",
                                fontWeight: "bold",
                                fontSize: "16px",
                              }}
                            >
                              {`Rs. ${addon.postprice}`}
                            </Typography>
                          </Box>
                          
                          {/* Activate Now button */}
                          <Button
                            sx={{
                              backgroundColor: "#4DB07F",
                              color: "white",
                              textTransform: "none",
                              borderRadius: "50px",
                              padding: "8px 15px",
                              fontWeight: "medium",
                              fontSize: "15px",
                              width: "100%",
                              "&:hover": {
                                backgroundColor: "#3F8E67",
                              },
                            }}
                            onClick={() => handleCardButtonClick(addon)}
                          >
                            {t("broadbandPostPaidGetAddOns.activateNow")}
                          </Button>
                        </Box>
                      </Card>
                    ))}
                </>
              )}
            </Box>
          </Box>
        </Box>
        
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Confirm</DialogTitle>
          <DialogContent>
            <Typography>
              Do you want to purchase and activate {selectedPackage?.name}?
            </Typography>
            {(selectedItem.trim() === "LMS" ||
              selectedItem.trim() === "Home Schooling & WFH") && (
              <RadioGroup
                value={activationType}
                onChange={(e) => setActivationType(e.target.value)}
              >
                <FormControlLabel
                  value="onetime"
                  control={<Radio />}
                  label="One-Time"
                />
                <FormControlLabel
                  value="recurrent"
                  control={<Radio />}
                  label="Recurrent"
                />
              </RadioGroup>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="error">
              No
            </Button>
            <Button onClick={handleActivation} color="primary">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default BroadbandPostPaidGetAddOns;