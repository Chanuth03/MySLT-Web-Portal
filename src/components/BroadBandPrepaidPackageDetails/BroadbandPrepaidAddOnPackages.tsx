import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import addBroadbandPackage from "../../services/prepaid/addBroadbandPackage";
import { fetchLTEPrepaidAddOnPackages } from "../../services/prepaid/fetchLTEPrepaidAddOnPackages";
import useStore from "../../services/useAppStore";
import { BroadbandPrepaidAddOnPackageDetails } from "../../types/types";
import bgImage from "../../assets/pred.jpg";
 
const BroadbandPrepaidAddOnPackages: React.FC = () => {
  const { selectedTelephone, setLeftMenuItem, setPackageListUpdate } = useStore();
  const [packages, setPackages] = useState<
    BroadbandPrepaidAddOnPackageDetails[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPackageIndex, setSelectedPackageIndex] = useState<
    number | null
  >(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
 
  useEffect(() => {
    const getPackages = async () => {
      setLoading(true);
      try {
        const data = await fetchLTEPrepaidAddOnPackages();
        setPackages(data);
      } catch (error) {
        setError(`Failed to fetch packages: ${error}`);
      } finally {
        setLoading(false);
      }
    };
 
    getPackages();
  }, []);
  
  // Center the first item after loading
  useEffect(() => {
    if (!loading && packages.length > 0 && scrollRef.current) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        goToSlide(0);
      }, 100);
    }
  }, [loading, packages.length]);
 
  const handleButtonPress = (index: number) => {
    setSelectedPackageIndex(index);
    setDialogOpen(true);
  };
 
  const handleConfirmActivation = async () => {
    const telephoneNo = selectedTelephone.toString();
    const offeringId = packages[selectedPackageIndex!]?.OFFERING_ID;
    const pkgName = packages[selectedPackageIndex!]?.OFFERING_NAME;
    await addBroadbandPackage(telephoneNo, offeringId, pkgName);
    setPackageListUpdate();
    setDialogOpen(false);
    setLeftMenuItem("Data Add-Ons");
  };
 
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
    const containerWidth = scrollRef.current.clientWidth;
    const itemWidth = 280; // Adjusted to match card width plus gap
    const centerPosition = scrollLeft + (containerWidth / 2);
    const currentIndex = Math.floor(centerPosition / itemWidth);
    
    setActiveIndex(currentIndex);
  };
 
  if (loading) {
    return <CircularProgress />;
  }
 
  if (error) {
    console.log(error);
  }
 
  const goToSlide = (index: number) => {
    if (scrollRef.current) {
      const itemWidth = 280;
      const containerWidth = scrollRef.current.clientWidth;
      const offset = (containerWidth / 2) - (itemWidth / 2);
      scrollRef.current.scrollTo({
        left: index * itemWidth - offset,
        behavior: 'smooth'
      });
    }
  };
 
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#001434", // Dark navy background matching the image
        width: "100%",
        height: "100%",
        padding: 2,
        position: "relative",
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
          gap: 2,
          overflowX: "auto",
          width: "100%",
          padding: "12px 48px 24px 48px",
          cursor: isDragging ? "grabbing" : "grab",
          "&::-webkit-scrollbar": { display: "none" },
          scrollSnapType: "x mandatory",
          position: "relative",
        }}
      >
        {packages.map((pkg, index) => (
          <Card
            key={pkg.OFFERING_ID}
            sx={{
              width: 240,
              height: 350,
              backgroundImage: `linear-gradient(rgba(15, 59, 122, 0.6), rgba(15, 59, 122, 0.6)), url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
              borderRadius: "10px",
              scrollSnapAlign: "center",
              flex: "0 0 auto",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              overflow: "hidden",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.3s, margin 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#0056A2",
                transform: "scale(1.078)",
                marginLeft: 1,
                marginRight: 1,
              },
            }}
          >
            {/* Right-aligned red top section with curved bottom */}
            <Box
              sx={{
                bgcolor: "#17A1FA", // Red background
                height: "120px",
                width: "50%", // Takes up half the width
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                top: 0,
                right: 0,
                borderRadius: "0 0px 50px 30px", // Rounded on top-right and bottom-left
              }}
            >
              <Typography
                sx={{
                  color: "#FFF900", // Yellow price text
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  lineHeight: 1,
                  fontFamily: "Arial, sans-serif",
                  mb: 0.3,
                }}
              >
                Rs.{pkg.PRICE_LKR_WITH_TAX || "535"}<span style={{ fontSize: "1.0rem" }}>.00</span>
              </Typography>
              <Typography
                sx={{
                  color: "white",
                  fontSize: "0.80rem",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                (with tax)
              </Typography>
            </Box>

            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "16px",
                paddingTop: "180px", // Space for the top section
                paddingBottom: "16px !important",
                height: "100%",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.0rem",
                  fontWeight: "bold", 
                  color: "white",
                  lineHeight: 1.2,
                  fontFamily: "Arial, sans-serif",
                  mb: 2,
                  mt: -2,
                }}
              >
                {pkg.ADDON_NAME || "4G LTE - HBB Anytime - 155 (7 Days)"}
              </Typography>
              
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  mb: 1,
                  mt: 2,
                  flexWrap: "nowrap",
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "0.9rem",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  Total Volume
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    color: "white",
                    fontSize: "1.0rem",
                    fontWeight: "bold",
                    flexWrap: "nowrap",
                    fontFamily: "Arial, sans-serif",
                    ml: 1,
                  }}
                >
                  {pkg.DATA_VOLUME_GB || "5"} <span style={{ fontSize: "1.0rem" , flexWrap: "nowrap",}}>GB</span>
                </Typography>
                
                {/* Vertical divider */}
                <Box
                  component="span"
                  sx={{
                    display: "inline-block",
                    width: "2px",
                    height: "24px",
                    backgroundColor: "white",
                    flexWrap: "nowrap",
                    mx: 2,
                    opacity: 0.7,
                  }}
                />
                
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "0.9rem",
                    fontFamily: "Arial, sans-serif",
                    flexWrap: "nowrap",
                  }}
                >
                  Validity Period
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    fontFamily: "Arial, sans-serif",
                    ml: 1,
                    
                  }}
                >
                  {pkg.VALIDITY || "30"} Days
                </Typography>
              </Box>
              
              <Button
                variant="contained"
                onClick={() => handleButtonPress(index)}
                sx={{
                  backgroundColor: "#20C997",
                  color: "white",
                  borderRadius: "5px", // More rounded corners
                  textTransform: "none",
                  fontSize: "1.0rem",
                  fontWeight: "500",
                  padding: "8px 0",
                  width: "110px", // Not full width - matches image
                  height: "40px",
                  marginTop: "auto",
                  marginLeft: "auto", // Right-aligned
                  "&:hover": {
                    backgroundColor: "#3ac77a",
                  },
                  boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                Activate
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
      
      {/* Navigation Arrows */}
      <Box sx={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", zIndex: 20 }}>
        <Button
          sx={{
            minWidth: "30px",
            width: "30px",
            height: "30px",
            backgroundColor: "rgba(255,255,255,0.2)",
            color: "white",
            borderRadius: "50%",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.4)" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 0,
          }}
          onClick={() => {
            const newIndex = Math.max(0, activeIndex - 1);
            goToSlide(newIndex);
          }}
        >
          {"<"}
        </Button>
      </Box>
      
      <Box sx={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", zIndex: 20 }}>
        <Button
          sx={{
            minWidth: "30px",
            width: "30px",
            height: "30px",
            backgroundColor: "rgba(255,255,255,0.2)",
            color: "white",
            borderRadius: "50%",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.4)" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 0,
          }}
          onClick={() => {
            const newIndex = Math.min(packages.length - 1, activeIndex + 1);
            goToSlide(newIndex);
          }}
        >
          {">"}
        </Button>
      </Box>
 
      {/* Indicator Dots */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 0.8,
          mt: 2,
          mb: 1,
        }}
      >
        {packages.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: index === activeIndex ? 20 : 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: index === activeIndex ? "#4AE08F" : "rgba(255,255,255,0.3)",
              transition: "width 0.3s ease",
              cursor: "pointer",
            }}
            onClick={() => goToSlide(index)}
          />
        ))}
      </Box>
 
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>
          <Typography variant="body2" fontSize={23}>
            Confirm Activation
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="body2">
              Are you sure you want to activate the{" "}
              {selectedPackageIndex !== null &&
                packages[selectedPackageIndex]?.ADDON_NAME}{" "}
              package?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              backgroundColor: "#0056A2",
              color: "#FFFFFF",
            }}
            onClick={() => setDialogOpen(false)}
          >
            <Typography variant="body2">Cancel</Typography>
          </Button>
          <Button
            sx={{
              backgroundColor: "#0056A2",
              color: "#FFFFFF",
            }}
            onClick={handleConfirmActivation}
            autoFocus
          >
            <Typography variant="body2">Confirm</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
 
export default BroadbandPrepaidAddOnPackages;