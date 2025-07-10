import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface BroadbandNavbarHorizontalProps {
  navbarItems: {
    label: string;
    used?: string | null;
    limit?: string | null;
  }[];
  type: string;
  onSelected: (item: string) => void;
  selected: string;
}

const BroadbandNavbarHorizontal = ({ 
  navbarItems, 
  type, 
  selected, 
  onSelected 
}: BroadbandNavbarHorizontalProps) => {
  const [selectedItem, setSelectedItem] = useState(selected);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    onSelected(item);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column", // Make it vertical
        gap: 1,
        height: "auto", // Adjust height for vertical layout
        width: "100%", // Take full width
        color: "#0056A2",
        backgroundColor: "#ffffff",
        border: "1px solid #0056A252",
        borderRadius: "10px",
        padding: 2,
        minHeight: "400px", // Ensure it fills the space
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 700, 
          color: "#0056A2", 
          textAlign: "center",
          marginBottom: 1,
          borderBottom: "1px solid #0056A252",
          paddingBottom: 1
        }}
      >
        {type === "Summary" ? "Usage Summary" : "Packages"}
      </Typography>
      
      {navbarItems.map((item, index) => (
        <Button
          key={index}
          onClick={() => handleItemClick(item.label)}
          sx={{
            height: "auto", // Auto height for vertical layout
            width: "100%", // Full width
            padding: 1.5,
            display: "flex",
            flexDirection: "column",
            borderRadius: "10px",
            marginBottom: 1,
            color: selectedItem === item.label ? "#ffffff" : "#0056A2",
            backgroundColor: selectedItem === item.label ? "#0056A2" : "transparent",
            "&:hover": {
              backgroundColor: selectedItem === item.label ? "#0056A2" : "#0056A210",
            },
            border: "1px solid #0056A252",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: item.label === "Home Schooling & WFH" ? "13px" : "15px",
              textTransform: "capitalize",
              fontWeight: 700,
              marginBottom: 0.5
            }}
          >
            {item.label}
          </Typography>
          
          {type === "Summary" ? (
            <Typography
              variant="body2"
              sx={{
                fontSize: "10px",
                textTransform: "capitalize",
                fontWeight: 700,
              }}
            >
              {item.label === "My Package"
                ? ""
                : item.limit || item.used
                ? `${item.used ?? 0} used from ${item.limit ?? 0} GB`
                : "N/A"}
            </Typography>
          ) : (
            <Typography
              variant="body2"
              sx={{
                fontSize: "10px",
                textTransform: "capitalize",
                fontWeight: 700,
              }}
            >
              {item.limit}
            </Typography>
          )}
        </Button>
      ))}
    </Box>
  );
};

export default BroadbandNavbarHorizontal;