import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import CCTVImage from "../assets/CCTV.jpg";
import DuthayaImage from "../assets/Duthaya.jpg";
import eSiphalaImage from "../assets/esiphala.jpg";
import eSportImage from "../assets/eSport.jpg";
import KasperskyImage from "../assets/kaspersky.jpg";
import SLTStorageImage from "../assets/sltStorage.jpg";
import SLTLynkedImage from "../assets/SLTLynked.png";
import SmartHomeImage from "../assets/smartHome.jpg";

type Service = {
  id: number;
  name: string;
  imageUrl: string;
  url?: string;
};

const DigitalLife: React.FC = () => {
  // Data for each card with imported image URLs and optional URL for navigation
  const services: Service[] = [
    {
      id: 1,
      name: "Duthaya",
      imageUrl: DuthayaImage,
      url: "https://duthaya.lk/",
    },
    {
      id: 2,
      name: "eSport",
      imageUrl: eSportImage,
      url: "https://esports.slt.lk/landing",
    },
    {
      id: 3,
      name: "Kaspersky",
      imageUrl: KasperskyImage,
      url: "https://kaspersky-dp.slt.lk/customerProductList",
    },
    {
      id: 4,
      name: "SLT Storage",
      imageUrl: SLTStorageImage,
      url: "https://storage.slt.lk/portal/new-registration",
    },
    {
      id: 5,
      name: "CCTV",
      imageUrl: CCTVImage,
      url: "https://www.slt.lk/en/cctv",
    },
    {
      id: 6,
      name: "Smart Home",
      imageUrl: SmartHomeImage,
      url: "https://www.slt.lk/en/smart-home",
    },
    {
      id: 7,
      name: "eSiphala",
      imageUrl: eSiphalaImage,
      url: "https://www.esiphala.lk/",
    },
    {
      id: 8,
      name: "SLT Lynked",
      imageUrl: SLTLynkedImage,
      url: "https://meet.sltmobitel.lk/",
    },
  ];

  const handleButtonClick = (url?: string) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "rgba(6, 29, 49, 0.74)",
        color: "#FFF",
        padding: 4,
        borderRadius: "10px",
      }}
    >
      <Typography
        variant="body2"
        align="center"
        sx={{ fontSize: "18px", fontWeight: "bold", mb: 3 }}
      >
        Experience The Digital Lifestyle With SLT
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(3, 1fr)",
          },
          gap: 0.25,
          justifyContent: "center",
        }}
      >
        {services.map((service) => (
          <Button
            onClick={() => handleButtonClick(service.url)}
            sx={{
              transition: "transform 0.1s ease-in-out",
              "&:hover": {
                transform: "scale(1.025)",
              },
            }}
          >
            <Card
              key={service.id}
              sx={{
                width: 250,
                height: 190,
                backgroundColor: "#0F3B7A",
                border: "1px solid", // Add this
                borderColor: "#FFFFFF55",
                borderRadius: "10px",
                boxShadow: 3,
                textAlign: "center",
                margin: 0.4,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 1.5,
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 1,
                  borderRadius: "10px",
                  position: "relative",
                  height: "125px",
                  width: "auto",
                  boxShadow: "0px 3px 3px #0000004A",
                  overflow: "hidden",
                  margin: 1,
                  backgroundImage: `url(${service.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></Box>
              <CardContent sx={{ p: 0.7 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      textTransform: "initial",
                      fontSize: "17px",
                      fontWeight: 400,
                      color: "white",
                      ml: 1,
                    }}
                  >
                    {service.name}
                  </Typography>
                  <Typography variant="body2"></Typography>
                </Box>
              </CardContent>
            </Card>
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default DigitalLife;
