import { AppBar, Avatar, Box, Container, FormControl, IconButton, MenuItem, Popover, Select, SelectChangeEvent, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import userImage from "../../src/assets/profile.jpg";
import fetchAccountDetails from "../services/fetchAccountDetails";
import useStore from "../services/useAppStore";
import { AccountDetails } from "../types/types";
import MySLTMenu from "./ProfileMenuUIs/MySLTMenu";

const CustomAppBar = () => {
  const { fetchServiceDetails, setSelectedTelephone } = useStore();
  const [account, setAccount] = useState(""); // Selected account
  const [openDropdown, setOpenDropdown] = useState(false); // Dropdown open/close state
  const [accounts, setAccounts] = useState<AccountDetails[]>([
    {
      telephoneno: "0714329988",
      // accountNo: undefined,
      accountno: "",
      status: ""
    }, // Hardcoded phone number
  ]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // State for popover anchor

  // Function to handle the profile icon click
  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); // Set the anchor element for the popover
  };

  const handleCloseProfileMenu = () => {
    setAnchorEl(null); // Close the profile menu
  };

  const handleChange = (event: SelectChangeEvent) => {
    setAccount(event.target.value);
    fetchServiceDetails(event.target.value);
    setSelectedTelephone(event.target.value);
    setOpenDropdown(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const accountData = await fetchAccountDetails();
      if (accountData && accountData.length > 0) {
        setAccounts((prevAccounts) => [...prevAccounts, ...accountData]);
        setSelectedTelephone(accountData[0].telephoneno);
        setAccount(accountData[0].telephoneno);
        fetchServiceDetails(accountData[0].telephoneno);
      }
    };
    fetchData();
  }, []);

  const open = Boolean(anchorEl); // Menu open state

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        boxShadow: "none",
        padding: 0.5,
        borderBottomLeftRadius: "15px",
        borderBottomRightRadius: "15px",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
            <img
              src="src/assets/images/SLTMobitel_Logo.svg 2.png"
              alt="Logo"
              style={{ height: "8vh", minHeight: "50px" }}
            />
          </Box>

          {/* Right Section */}
          <Box
            sx={{ flexGrow: 1, display: "flex", justifyContent: "end", alignItems: "center" }}
          >
            {/* Select Menu */}
            <FormControl
              sx={{
                mr: 4,
                width: "14vw",
                minWidth: "200px",
                color: "#00256A",
                "& .MuiOutlinedInput-root": {
                  height: "5vh",
                  minHeight: "30px",
                  borderRadius: "8px",
                  "& fieldset": {
                    border: "3px solid #00256A",
                  },
                  "&:hover fieldset": {
                    borderColor: "#00256A",
                  },
                  "& .Mui-focused fieldset": {
                    borderColor: "#00256A",
                    borderWidth: 3,
                  },
                },
              }}
            >
              <Select
                labelId="select-account-label"
                id="select-account"
                value={account}
                renderValue={(selected) => (selected ? selected : "Select Account")}
                onChange={handleChange}
                open={openDropdown}
                onOpen={() => setOpenDropdown(true)}
                onClose={() => setOpenDropdown(false)}
                sx={{
                  color: "#00256A",
                  fontWeight: 600,
                  fontFamily: "Poppins",
                }}
              >
                {accounts.length > 0 ? (
                  accounts.map((acc, index) => (
                    <MenuItem key={index} value={acc.telephoneno}>
                      {acc.telephoneno} {/* Display the telephone number here */}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="">No Accounts Available</MenuItem>
                )}
              </Select>
            </FormControl>

            {/* Avatar Button */}
            <IconButton sx={{ p: 0 }} onClick={handleProfileClick}>
              <Avatar
                sx={{ height: "50px", width: "auto" }}
                alt="User Avatar"
                src={userImage}
              />
            </IconButton>

            {/* Popover for Dropdown */}
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleCloseProfileMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {/* Render your custom dropdown component */}
              <MySLTMenu onMenuClick={handleCloseProfileMenu} />
            </Popover>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default CustomAppBar;
