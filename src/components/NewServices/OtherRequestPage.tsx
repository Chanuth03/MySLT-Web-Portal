import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
// Import MUI icons
import TvIcon from '@mui/icons-material/Tv';
import PhoneIcon from '@mui/icons-material/Phone';
import WifiIcon from '@mui/icons-material/Wifi';
// Keep these imports for compatibility with the rest of the code
import BroadbandIcon from "../../assets/Broadband.png";
import PeoTVIcon from "../../assets/PeoTV.png";
import VoiceIcon from "../../assets/Voice.png";
import createSalesLead, { SalesLeadCreationResponse } from "../../services/postpaid/createSalesLead"; // Import the API function
import { useTranslation } from 'react-i18next';

// Define props for the component
interface OtherRequestPageProps {
  telephoneNo: string;
  selectedItem: string;
}

const OtherRequestPage: React.FC<OtherRequestPageProps> = ({ telephoneNo, selectedItem }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [nic, setNic] = useState<string>("");
  const [contactTelNo, setContactTelNo] = useState<string>("");
  const { t } = useTranslation();

  // State for managing dialog and error message
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  console.log("Telephone Number in OtherRequestPage:", telephoneNo);
  console.log("Selected Item in OtherRequestPage:", selectedItem); 

  const handleClick = (item: string) => {
    const updatedItems = selectedItems.includes(item)
      ? selectedItems.filter((i) => i !== item)
      : [...selectedItems, item];

    setSelectedItems(updatedItems);
    console.log("Selected Items after click:", updatedItems); 
  };

  const buttonItems = [
    { label: "PEO TV", image: PeoTVIcon, icon: <TvIcon sx={{ fontSize: 20, color: "#FFFFFF" }} /> },
    { label: "VOICE", image: VoiceIcon, icon: <PhoneIcon sx={{ fontSize: 20, color: "#FFFFFF" }} /> },
    { label: "BROADBAND", image: BroadbandIcon, icon: <WifiIcon sx={{ fontSize: 20, color: "#FFFFFF" }} /> },
  ];

  const commonFontStyle = {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins, sans-serif",
  };
  const TextFieldStyle = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#093050",
      height: "37px",
      width: { sm: "50vw", md: "40vw", lg: "25vw" }, // 👈 Reduced widths
      borderRadius: "10px",
      gap:50,
      "& fieldset": {
        border: "0.2px solid white",
      },
    },
    input: {
      color: "white",
    },
    marginBottom: "16px", // Optional spacing between fields
  };
  
  
  // const ButtonStyle = (isSelected: boolean) => ({
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   width: isSelected ? 27.5 : 25,
  //   height: isSelected ? 27.5 : 25,
  //   padding: 1.5,
  //   border: isSelected ? "4px solid #0056A2" : "3px solid #0056A2",
  //   borderRadius: "100%",
  //   transition: "all 0.3s ease",
  //   "&:hover": {
  //     transform: isSelected ? "scale(1)" : "scale(1.1)",
  //   },
  // });

  const handleSubmit = async () => {
    console.log("Form Submitted. Selected Items:", selectedItems); 
    console.log("Telephone Number on Submit:", telephoneNo); 
    console.log("Service Type Selected:", selectedItem);

    // Assuming you have firstName, lastName, nic, contactTelNo, and selectedItems populated
    // const description = selectedItems.join(", "); // For example, describe the selected services

    const response: SalesLeadCreationResponse | null = await createSalesLead(
      telephoneNo,
      firstName,
      lastName,
      nic,
      contactTelNo,
      selectedItems,  // Array of selected items
      selectedItem
    );

    if (response) {
      if (response.isSuccess) {
        console.log("New Connection Created Successfully:", response.dataBundle);
        setIsSuccess(true);
        setMessage("New Connection created successfully!");
      } else {
        console.error("Error creating sales lead:", response.errorMessege);
        setIsSuccess(false);
        setMessage(response.errorMessege || "An unexpected error occurred.");
      }
    } else {
      console.error("API call failed.");
      setIsSuccess(false);
      setMessage("An unexpected error occurred.");
    }

    // Open the dialog box to show the message
    setIsDialogOpen(true);
  };

  // Handle the dialog close action
  const handleDialogClose = () => {
    setIsDialogOpen(false); // Close the dialog
  };

  return (
    <Box
      sx={{
        paddingX: 1,
        display: "Flex",
        flexDirection: "Column",
        alignItems: "center",
        backgroundColor: "transprent",
        // borderRadius:"10px",
        // border: "0.2px solid #0068B1",
        height:"400px",
        width:"100%",
        
      }}
    >
      <Typography variant="body2" sx={{ ...commonFontStyle, mb: 2 }}>
        {/*Telephone Number: {telephoneNo}*/}
      </Typography>
      <Grid container spacing={1}>
        {/* Use Grid item with proper breakpoint props */}
        <Grid item xs={12} md={6}>
          <Box sx={{ padding: 1 }}>
            <Typography variant="body2" sx={{ ...commonFontStyle }}>
              {t('newServices.firstName')}
            </Typography>
            <TextField
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              sx={{ ...TextFieldStyle }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ padding: 1 }}>
            <Typography variant="body2" sx={{ ...commonFontStyle }}>
              {t('newServices.lastName')}
            </Typography>
            <TextField
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              sx={{ ...TextFieldStyle }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ padding: 1 }}>
            <Typography variant="body2" sx={{ ...commonFontStyle }}>
              {t('newServices.nic')}
            </Typography>
            <TextField
              variant="outlined"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              sx={{ ...TextFieldStyle }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ padding: 1 }}>
            <Typography variant="body2" sx={{ ...commonFontStyle }}>
              {t('newServices.mobileNumber')}
            </Typography>
            <TextField
              variant="outlined"
              value={contactTelNo}
              onChange={(e) => setContactTelNo(e.target.value)}
              sx={{ ...TextFieldStyle }}
            />
          </Box>
        </Grid>
      </Grid>
      <Box
  sx={{
    display: "flex",
    padding: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    gap: "0.8vw",
    marginLeft: "-540px", 
  }}
>
        {buttonItems.map((item) => {
          // const isSelected = selectedItems.includes(item.label);
          
          return (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center", 
                alignItems: "center",
                width: "80px",
                height: "auto",
              }}
              key={item.label}
            >
              <Button
                onClick={() => handleClick(item.label)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "45px",
                  height: "45px",
                  border: "1px solid white",
                  borderRadius: "8px",
                  backgroundColor: "transparent",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)"
                  }
                }}
              >
                {item.icon}
              </Button>
              <Typography
                variant="body2"
                align="center"
                sx={{ 
                  fontSize: 10, 
                  color: "white", 
                  marginTop: "6px",
                  fontWeight: "500",
                  textTransform: "uppercase"
                }}
              >
                {item.label}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* <Typography
        variant="body2"
        sx={{ mt: 2, ...commonFontStyle, color: "#0056A2" }}
      >
       Selected Items: {selectedItems.length > 0 ? selectedItems.join(", ") : "None"}
      </Typography> */}

      <Button
        sx={{
          mt: 2,
          paddingX: 4,
         
          borderRadius: "10px",
           backgroundColor: "#15D151",
          "&:hover": {
            backgroundColor: "#057DE81A",
            transition: "all 0.3s ease",
          },
        }}
        onClick={handleSubmit}
      >
        <Typography
          variant="body2"
          sx={{ ...commonFontStyle, fontSize: 16, textTransform: "capitalize" }}
        >
          {t('newServices.submit')}
        </Typography>
      </Button>

      {/* Error Message Dialog */}
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle sx={{ textAlign: "center", color: isSuccess ? "green" : "red" }}>
          {isSuccess ? "Success" : "Error"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "#0056A2",
              fontWeight: "bold", // Increase the weight to bold
              fontSize: "20px", // Adjust the font size as needed
            }}
          >
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OtherRequestPage;