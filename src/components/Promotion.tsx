import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import checkOfferAvailability from "../services/postpaid/checkOfferAvailability";
import PromotionpackageActivation from "../services/postpaid/PromotionpackageActivation";


interface PromotionData {
  title: string;
  activated: boolean;
  packageid: number;
  refno: number;
  image?: string;
}

interface PromotionProps {
  telephoneNo: string;
}

const Promotion: React.FC<PromotionProps> = ({ telephoneNo }) => {
  const [promotions, setPromotions] = useState<PromotionData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogMessage, setDialogMessage] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const offerData: unknown = await checkOfferAvailability(telephoneNo);

        if (offerData && Array.isArray(offerData)) {
          const fetchedPromotions: PromotionData[] = offerData.map((offer: any) => ({
            title: offer.packageName,
            activated: offer.isActive,
            packageid: offer.packageid,
            refno: offer.refno,
            image: offer.imageURL || "",
          }));
          setPromotions(fetchedPromotions);
        } else {
          setPromotions([]);
        }
      } catch (error) {
        console.error("Failed to fetch promotions:", error);
        setError("Failed to fetch promotions.");
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, [telephoneNo]);

  const handleActivate = async (packageid: number, refno: number) => {
    try {
      const response = await PromotionpackageActivation(telephoneNo, packageid, refno);
      if (response) {
        setDialogMessage(response.message || "Promotion activated successfully!");
      } else {
        setDialogMessage("Failed to activate promotion.");
      }
    } catch (error) {
      console.error("Error activating promotion:", error);
      setDialogMessage("An error occurred while activating the promotion.");
    } finally {
      setDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const scroll = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += offset;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        color: "#0056A2",
        padding: 1,
        borderRadius: "10px",
        boxShadow: "0px 3px 3px #0000004A",
        height: "60vh",
      }}
    >
      <Typography variant="body2" align="center" sx={{ fontSize: 24, fontWeight: "bold" }}>
        ── Promotion ──
      </Typography>
      {loading && (
        <Typography variant="body1" color="textSecondary">
          Loading promotions...
        </Typography>
      )}
      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}
      {!loading && !error && promotions.length === 0 && (
        <Typography variant="body2" color="textSecondary" sx={{ fontSize: 24 }}>
          This Number has no promotions available.
        </Typography>
      )}
      {!loading && !error && promotions.length > 0 && (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => scroll(-200)}
            sx={{ position: "absolute", left: 0, zIndex: 1 }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Box
            ref={scrollRef}
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1.5,
              overflowX: "auto",
              scrollBehavior: "smooth",
              width: "100%",
              paddingY: 3,
              paddingX: 4,
            }}
          >
            {promotions.map((promo, index) => (
              <Card
                key={index}
                sx={{
                  minWidth: "27%",
                  backgroundColor: "#3076B2",
                  color: "white",
                  borderRadius: "10px",
                  transition: "transform 0.3s, margin 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#0056A2",
                    transform: "scale(1.09)",
                    marginLeft: 3,
                    marginRight: 3,
                  },
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        height: "200px",
                        width: "200px",
                        borderRadius: "10px",
                        backgroundImage: `url(${promo.image})`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        mt: 1,
                        mb: 1,
                      }}
                    ></Box>
                    <Typography variant="body2" sx={{ fontSize: 20, mb: 1 }}>
                      {promo.title}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => handleActivate(promo.packageid, promo.refno)}
                      sx={{
                        backgroundColor: promo.activated ? "#4FD745" : "white",
                        color: promo.activated ? "white" : "#4FD745",
                        "&:hover": {
                          backgroundColor: promo.activated ? "#4FD745" : "#E0E0E0",
                        },
                      }}
                    >
                      <Typography variant="body2" sx={{ fontSize: 16 }}>
                        {promo.activated ? "Activated" : "Activate"}
                      </Typography>
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
          <IconButton
            onClick={() => scroll(200)}
            sx={{ position: "absolute", right: 0, zIndex: 1 }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      )}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Promotion Activation</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Promotion;
