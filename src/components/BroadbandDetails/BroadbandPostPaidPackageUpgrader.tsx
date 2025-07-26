import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import fetchCurrentPackage from "../../services/postpaid/fetchCurrentPackage";
import useStore from "../../services/useAppStore";
import { useTranslation } from 'react-i18next';
import { BBPackage, CurrentPackageDetails } from "../../types/types";
import fetchPackageUpgrades from "../../services/postpaid/fetchPackageUpgrades";
import upgradePackage from "../../services/postpaid/upgradePackage";

// Define interface for package items
interface PackageItem {
  title: string;
  subtitle: string;
  price: string | number;
}

const BroadbandPostPaidPackageUpgrader = () => {
  const { t } = useTranslation();
  const { serviceDetails } = useStore();
  const [currentPackage, setCurrentPackage] = useState<CurrentPackageDetails>();
  const packageType = serviceDetails?.listofBBService[0]?.serviceType;
  const packageName = serviceDetails?.listofBBService[0]?.packageName;
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const tabs = ["Standard", "Any", "Unlimited"];
  const [selectedTab, setSelectedTab] = useState("Standard");

  const [standardPackages, setStandardPackages] = useState<BBPackage[]>([]);
  const [anyPackages, setAnyPackages] = useState<BBPackage[]>([]);
  const [unlimitedPackages, setUnlimitedPackages] = useState<BBPackage[]>([]);

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
    const itemWidth = 220;
    const currentIndex = Math.round(scrollLeft / itemWidth) + 1;

    setActiveIndex(currentIndex);
  };

  const getPackages = (): PackageItem[] => {
    let packages: PackageItem[] = [];

    if (selectedTab === "Standard") {
      packages = standardPackages.map((pkg) => ({
        title: pkg.BB_PACKAGE_NAME,
        subtitle: `Standard : ${pkg.STANDARD_GB}GB + Free : ${pkg.FREE_GB}GB`,
        price: pkg.MONTHLY_RENTAL,
      }));
    } else if (selectedTab === "Any") {
      packages = anyPackages.map((pkg) => ({
        title: pkg.BB_PACKAGE_NAME,
        subtitle: `${pkg.STANDARD_GB}GB ${pkg.DESCRIPTION}`,
        price: pkg.MONTHLY_RENTAL,
      }));
    } else if (selectedTab === "Unlimited") {
      packages = unlimitedPackages.map((pkg) => ({
        title: pkg.BB_PACKAGE_NAME,
        subtitle: pkg.DESCRIPTION,
        price: pkg.MONTHLY_RENTAL,
      }));
    }

    return packages;
  };
  
  const packages = getPackages();

  useEffect(() => {
    const getCurrentPackage = async () => {
      try {
        if (packageType && packageName) {
          const response = await fetchCurrentPackage(packageType, packageName);
          if (response) {
            setCurrentPackage(response);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    getCurrentPackage();
  }, [packageType, packageName]);

  useEffect(() => {
    const getPackageUpgrades = async () => {
      try {
        if (packageType && packageName) {
          const response = await fetchPackageUpgrades(packageType, packageName);
          if (response) {
            console.log(response);
            setStandardPackages(response.Standard.flat(1) || []);
            setAnyPackages(response.Any.flat(1) || []);
            setUnlimitedPackages(response.Unlimited.flat(1) || []);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    getPackageUpgrades();
  }, [packageType, packageName]);

  const handleActivation = async (item: PackageItem) => {
    try {
      await upgradePackage(
        serviceDetails!.listofBBService[0]?.serviceID,
        serviceDetails!.listofBBService[0]?.serviceType,
        serviceDetails!.contactNamewithInit,
        serviceDetails!.contactMobile,
        "", // email placeholder - you may need to get this from somewhere else
        currentPackage?.bB_PACKAGE_NAME || "",
        item.title,
        currentPackage?.monthlY_RENTAL || "",
        String(item.price)
      );
    } catch (error) {
      console.error("An error occurred while upgrading the package:", error);
      return null;
    }
  };

  return (
    <Box sx={{ width: "100%", backgroundColor: "#102548", p: 2 ,borderRadius:"10px"}}>
      {/* Current Package Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#4FB18B",
          color: "#FFFFFF",
          padding: 2,
          fontFamily: "Poppins, sans-serif",
          borderRadius: "8px",
          width: "100%",
          mb: 2,
        }}
      >
        {/* Left Section */}
        <Box>
          <Typography variant="body2" sx={{ color: "#FFFFFF", mb: 0.5, fontSize: "0.85rem",fontFamily: "Poppins, sans-serif" }}>
            {t('broadbandPackageUpgrader.currentPackage')}
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            color="white"
            sx={{
              backgroundColor: "#3B78D2",
              padding: "6px 12px",
              borderRadius: 1.5,
              fontFamily: "Poppins, sans-serif",
              display: "inline-block",
              fontSize: "1rem",
            }}
          >
            {currentPackage?.bB_PACKAGE_NAME || "Web Family Xtra"}
          </Typography>
        </Box>

        {/* Center Section */}
        <Box textAlign="center">
          <Typography
            variant="body1"
            sx={{ fontSize: "1.1rem", fontWeight: "bold", color: "#FFFFFF",fontFamily: "Poppins, sans-serif" }}
          >
            {/* Rs. {currentPackage?.monthlY_RENTAL || "3090"} + Tax (Per Month) */}
            {t('broadbandPackageUpgrader.monthlyPrice', { price: currentPackage?.monthlY_RENTAL || "3090" })}
          </Typography>
        </Box>

        {/* Right Section */}
        <Box display="flex" alignItems="center">
          {/* Standard Data */}
          <Box
            textAlign="center"
            sx={{
              width: "90px",
              backgroundColor: "#FFFFFF",
              padding: 0.8,
              borderRadius: "8px",
              mr: 1.5,
            }}
          >
            <Typography variant="body2" fontWeight="bold" color="#3B78D2" fontSize="0.8rem" fontFamily={ "Poppins, sans-serif"}>
              {t('broadbandPackageUpgrader.standard')}
            </Typography>
            <Typography variant="h5" fontWeight="bold" color="#3B78D2" fontSize="1.5rem" fontFamily={ "Poppins, sans-serif"}>
              {currentPackage?.standarD_GB || "70"}GB
            </Typography>
          </Box>

          <Typography variant="h5" mx={0.5} color="#FFFFFF" fontWeight="bold">
            +
          </Typography>

          {/* Free Data */}
          <Box
            textAlign="center"
            sx={{
              width: "90px",
              backgroundColor: "#EFE2FC",
              padding: 0.8,
              borderRadius: "8px",
            }}
          >
            <Typography variant="body2" fontWeight="bold" color="#7642A9" fontSize="0.8rem" fontFamily={ "Poppins, sans-serif"}>
              {t('broadbandPackageUpgrader.free')}
            </Typography>
            <Typography variant="h5" fontWeight="bold" color="#7642A9" fontSize="1.5rem" fontFamily={ "Poppins, sans-serif"}>
              {currentPackage?.freE_GB || "100"}GB
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Package Selection Section */}
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#173361",
          borderRadius: "8px",
          p: 2.5,
        }}
      >
        {/* Tabs */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2.5,
          }}
        >
          {tabs.map((tab) => (
            <Button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              sx={{
                px: 2.5,
                py: 0.5,
                mx: 1.5,
                backgroundColor: "transparent",
                color: selectedTab === tab ? "#FFFFFF" : "#8A8FA3",
                fontWeight: selectedTab === tab ? 700 : 400,
                fontSize: "1rem",
                textTransform: "none",
                borderBottom: selectedTab === tab ? "2px solid #FFFFFF" : "none",
                borderRadius: 0,
                "&:hover": {
                  backgroundColor: "transparent",
                  opacity: 0.8,
                },
              }}
            >
              {tab}
            </Button>
          ))}
        </Box>

        {/* Carousel */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
          }}
        >
          {/* Left Arrow
          <Button
            sx={{
              position: "absolute",
              left: -15,
              top: "50%",
              transform: "translateY(-50%)",
              minWidth: "30px",
              zIndex: 10,
              color: "#FFFFFF",
              fontSize: "1.5rem",
              p: 0,
            }}
          >
            ‹
          </Button>

          {/* Right Arrow */}
          {/* <Button
            sx={{
              position: "absolute",
              right: -15,
              top: "50%",
              transform: "translateY(-50%)",
              minWidth: "30px",
              zIndex: 10,
              color: "#FFFFFF",
              fontSize: "1.5rem",
              p: 0,
            }}
          >
            ›
          </Button> */} 

          <Box
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsDragging(false)}
            sx={{
              display: "flex",
              gap: 2,
              width: "100%",
              overflowX: "auto",
              cursor: isDragging ? "grabbing" : "grab",
              "&::-webkit-scrollbar": { display: "none" },
              userSelect: "none",
              pb: 1.5,
            }}
          >
            {packages && packages.length > 0 ? (
              packages.map((item, index) => (
                <Card
                  key={index}
                  sx={{
                    width: "32%",
                    flex: "0 0 auto",
                    backgroundColor: "#1D2940",
                    color: "white",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "none",
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          mb: 1.5,
                          fontWeight: "bold",
                          color: "#FFFFFF",
                          fontSize: "1.2rem",
                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        {item.title}
                      </Typography>

                      <Box
                        sx={{
                          width: "100%",
                          border: "1px solid #FFFFFF",
                          padding: 1.5,
                          borderRadius: 1,
                          backgroundColor: "transparent",
                          color: "#FFFFFF",
                          mb: 1.5,
                        }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: "medium", fontSize: "0.85rem", fontFamily:"Poppins, sans-serif"}}>
                          {item.subtitle}
                        </Typography>
                      </Box>

                      <Typography
                        variant="subtitle1"
                        sx={{ mb: 1.5, fontWeight: "bold", fontSize: "1rem" }}
                      >
                        {t('broadbandPackageUpgrader.packagePrice', { price: item.price })}
                        <Typography component="span" variant="body2" sx={{ display: "block", fontSize: "0.75rem",fontFamily:"Poppins, sans-serif" }}>
                          {t('broadbandPackageUpgrader.perMonth')}
                        </Typography>
                      </Typography>

                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#4DB07F",
                          color: "#FFFFFF",
                          fontFamily:"Poppins, sans-serif",
                          borderRadius: "10px",
                          width: "50%",
                          py: 1,
                          textTransform: "none",
                          fontSize: "0.9rem",
                          fontWeight: "500",
                          "&:hover": {
                            backgroundColor: "#3F8E67",
                          },
                        }}
                        onClick={() => {
                          handleActivation(item);
                        }}
                      >
                        {t('broadbandPackageUpgrader.upgrade')}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))
            ) : (
              // Fallback if no packages are available from API
              [1, 2, 3].map((_, index) => (
                <Card
                  key={index}
                  sx={{
                    width: "32%",
                    flex: "0 0 auto",
                    backgroundColor: "#1D2940",
                    color: "white",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "none",
                  }}
                >
                  {/* <CardContent sx={{ p: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          mb: 1.5,
                          fontWeight: "bold",
                          color: "#FFFFFF",
                          fontSize: "1.2rem",
                        }}
                      >
                        Any Tide
                      </Typography>

                      <Box
                        sx={{
                          width: "100%",
                          border: "1px solid #FFFFFF",
                          padding: 1.5,
                          borderRadius: 1,
                          backgroundColor: "transparent",
                          color: "#FFFFFF",
                          fontFamily:"Poppins, sans-serif",
                          mb: 1.5,
                        }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: "medium", fontSize: "0.85rem" }}>
                          120GB AnyTime BB - FTTH
                        </Typography>
                      </Box>

                      <Typography
                        variant="subtitle1"
                        sx={{ mb: 1.5, fontWeight: "bold", fontSize: "1rem" }}
                      >
                        Rs. 4890 + Tax
                        <Typography component="span" variant="body2" sx={{ display: "block", fontSize: "0.75rem" }}>
                          (Per Month)
                        </Typography>
                      </Typography>

                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#5EC890",
                          color: "#FFFFFF",
                          borderRadius: "50px",
                          width: "80%",
                          py: 1,
                          textTransform: "none",
                          fontSize: "0.9rem",
                          fontWeight: "500",
                          "&:hover": {
                            backgroundColor: "#4DB07F",
                          },
                        }}
                        onClick={() => {
                          handleActivation({ title: "Any Tide", price: 4890 });
                        }}
                      >
                        Upgrade
                      </Button>
                    </Box>
                  </CardContent> */}
                </Card>
              ))
            )}
          </Box>
        </Box>

        {/* Pagination Dots */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 0.8,
            mt: 2,
          }}
        >
          {(packages && packages.length > 0 ? packages : [{}, {}, {}]).slice(0, 5).map((_, index) => (
            <Box
              key={index}
              sx={{
                width: activeIndex === index ? "16px" : "6px",
                height: "6px",
                backgroundColor: activeIndex === index ? "#FFFFFF" : "#8A8FA3",
                borderRadius: "3px",
                transition: "width 0.3s, background-color 0.3s",
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default BroadbandPostPaidPackageUpgrader;