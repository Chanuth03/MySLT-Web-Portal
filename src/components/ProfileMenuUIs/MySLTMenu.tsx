import { Avatar, Box, MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // For navigation
import useStore from "../../services/useAppStore"; // Zustand store hook
import LogoutIcon from '@mui/icons-material/Logout';
import { useTranslation } from 'react-i18next';

interface MySLTMenuProps {
  onMenuClick: () => void;
}

const MySLTMenu = ({ onMenuClick }: MySLTMenuProps) => {
  // Access the selected telephone number from the store
  const { selectedTelephone, setLeftMenuItem } = useStore();
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    // Clear access token
    localStorage.removeItem("accessToken");
    console.log("Access token cleared");

    // Optionally redirect to login page
    navigate("/login"); // Ensure you have a route set up for "/login"
  };
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        backgroundColor: "white",
        width: "100%",
        maxWidth: "250px",
        borderRadius: "8px",
        overflow: "hidden",
        margin: "0 auto",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "16px",
          backgroundColor: "#005792",
          color: "white",
          
        }}
      >
        <Avatar sx={{ backgroundColor: "lightgray", marginRight: "8px" }} />
        <Box>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            My SLT
          </Typography>
          <Typography variant="body2">{selectedTelephone || "N/A"}</Typography>
        </Box>
      </Box>

      {/* Menu Items */}
      <Box sx={{ padding: "8px", backgroundColor: "#1A2148" }}>
        <MenuItem
          onClick={() => {
            setLeftMenuItem("My Profile");
            onMenuClick();
          }}
          sx={{
            padding: "12px",
            borderRadius: "4px",
            marginBottom: "8px",
            color: "white",
            "&:hover": { backgroundColor: "#0765B1" },
          }}
        >
          <Typography variant="body2">{t('profile.my_profile')}</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setLeftMenuItem("Manage Connections");
            onMenuClick();
          }}
          sx={{
            padding: "12px",
            borderRadius: "4px",
            marginBottom: "8px",
            color: "white",
            "&:hover": { backgroundColor: "#0765B1" },
          }}
        >
          <Typography variant="body2">{t('profile.manage_connection')}</Typography>
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
          sx={{
            padding: "12px",
            borderRadius: "15px",
            backgroundColor: "#FF5F5F",
            color: "white",  // Text color is now red
            "&:hover": { backgroundColor: "#FF5F5F", color: "white" },
          }}
        >
          <LogoutIcon sx={{ marginRight: 1, fontSize: "small", color: "white", "&:hover": { color: "red" }}} />
          <Typography variant="body2">{t('profile.logout')}</Typography>
        </MenuItem>
      </Box>
    </Box>
  );
};

export default MySLTMenu;
