import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import FiberRequestPage from "./FiberRequestPage";
import OtherRequestPage from "./OtherRequestPage";
import Sicon from "../../assets/sicon.png";
import { useTranslation } from 'react-i18next';


// Define props for the NewServicesPage component
interface NewServicesPageProps {
  telephoneNo: string;
}

const NewServicesPage: React.FC<NewServicesPageProps> = ({ telephoneNo }) => {
  const [selectedItem, setSelectedItem] = useState("Fiber");
  const { t } = useTranslation();

  console.log("Telephone Number:", telephoneNo); // Log the telephone number

  const items = [
    { label: "Fiber", key: "Fiber" },
    { label: "Megaline", key: "Megaline" },
    { label: "4G LTE", key: "4G LTE" },
  ];

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    console.log("Selected Item in Parent Component:", item); // Log selected item in the parent component
  };

  return (
    <Box
      sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "center",
      height:"600px",
      width: "100%",
      backgroundColor: "#082444", // Dark blue background
      color: "#FFFFFF",
      borderRadius: 3,
      padding: 1.5,
      position: "relative",
      overflow: "hidden",
    }}
    >

{/*         Green circle element positioned to fill left side with curved edge on right
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "70%", // Covers most of the frame
            height: "120%",
            backgroundImage: `linear-gradient(rgba(21, 156, 250, 0.6), rgba(21, 156, 250, 0.6)), url(${Mock})`, 
            borderTopRightRadius: "50%", // Curved edge on right side
            borderBottomRightRadius: "50%",
backgroundSize: "cover", // Ensures the image covers the area
backgroundPosition: "center center", // Curved edge on right side
            zIndex: 0,
          }}
        /> */}

 {/* Red header bar at the top */}
 <Box
 sx={{
 position: "relative",
 zIndex: 1,
 width: "96%",
 backgroundColor: "#0F3B7A", // Red header
 color: "white",
 padding: "15px 15px",
 display: "flex",
 alignItems: "center",
            
 borderRadius: "8px",
 marginBottom: 1.5,
 }}
 >
<Box
  component="img"
  src={Sicon}
  alt="Fiber Icon"
  sx={{
    width: 24,
    height: 24,
    marginRight: 1,
  }}
/>
 <Typography variant="body1" sx={{ fontWeight: "bold" }}>
{t('newServices.title')}
 </Typography>
 </Box>

<Box
  sx={{
    position: "relative",
    zIndex: 1,
    display: "flex",
    gap: "10px",
    paddingX: 1,
    marginLeft: "-470px",
  }}
>
  {items.map((item, index) => {
    return (
      <Button
        key={index}
        onClick={() => handleItemClick(item.key)}
        sx={{
          backgroundColor: selectedItem === item.key ? "#0a4a9e" : "transparent", // Dark blue when active, transparent when inactive
          color: selectedItem === item.key ? "#FFFFFF" : "#FFFFFF", // Always white text
          border: `1px solid ${selectedItem === item.key ? "#0a4a9e" : "#FFFFFF"}`, // Border matches background when active, white when inactive
          borderRadius: "4px",
          textTransform: "none",
          width: "103px", // Fixed width as requested
          height: "37px", // Fixed height as requested
          padding: "4px 8px",
          fontSize: "14px",
          fontWeight: "medium",
          "&:hover": {
            backgroundColor: selectedItem === item.key ? "#0a4a9e" : "rgba(255, 255, 255, 0.2)",
          },
        }}
      >
        {item.label}
      </Button>
 );
 })}
 </Box>

 {/* Content area */}
 <Box sx={{ position: "relative", zIndex: 1, marginTop: 3, width: "100%", padding: 1 }}>
{selectedItem === "Fiber" && <FiberRequestPage />}
 {selectedItem === "Megaline" && (
<OtherRequestPage telephoneNo={telephoneNo} selectedItem={selectedItem} />
  )}
  {selectedItem === "4G LTE" && (
 <OtherRequestPage telephoneNo={telephoneNo} selectedItem={selectedItem} />
 )}
</Box>
</Box>
 
 );
};

export default NewServicesPage;
