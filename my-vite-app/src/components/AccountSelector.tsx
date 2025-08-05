import React, { useEffect, useState } from "react";
import userImage from "../assets/avatar.png";
import fetchAccountDetails from "../services/fetchAccountDetails";
import useStore from "../services/useAppStore";
import { AccountDetails } from "../types/types";
import "./AccountSelector.css";
import MySLTMenu from "./ProfileMenuUIs/MySLTMenu";

const AccountSelector = () => {
  const { fetchServiceDetails, setSelectedTelephone } = useStore();
  const [account, setAccount] = useState(""); // Selected account
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_openDropdown, setOpenDropdown] = useState(false); // Dropdown open/close state
  const [accounts, setAccounts] = useState<AccountDetails[]>([
    {
      telephoneno: "0714329988",
      accountno: "",
      status: "",
    },
  ]);

  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const profileMenuRef = React.useRef<HTMLDivElement>(null);

  // Function to handle the profile icon click
  const handleProfileClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleCloseProfileMenu = () => {
    setMenuOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setAccount(value);
    fetchServiceDetails(value);
    setSelectedTelephone(value);
    setOpenDropdown(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const accountData = await fetchAccountDetails();

      if (accountData && accountData.length > 0) {
        const mergedAccounts = [
          {
            telephoneno: "0714329988",
            accountno: "",
            status: "",
          },
          ...accountData,
        ];

        setAccounts(mergedAccounts);
        setSelectedTelephone(mergedAccounts[0].telephoneno);
        setAccount(mergedAccounts[0].telephoneno);
        fetchServiceDetails(mergedAccounts[0].telephoneno);
      }
    };

    fetchData();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node) &&
        !menuOpen
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="account-selector">
      {/* Profile Section - Now at the top */}
      <div className="profile-section">
        {/* Avatar Button */}
        <button className="avatar-button" onClick={handleProfileClick}>
          <img className="avatar-image" alt="User Avatar" src={userImage} />
        </button>

        {/* Custom Dropdown Menu */}
        {menuOpen && (
          <div className="profile-menu-wrapper" ref={profileMenuRef}>
            <MySLTMenu onMenuClick={handleCloseProfileMenu} />
          </div>
        )}
      </div>

      {/* Account Select Wrapper - Now below the profile section */}
      <div className="account-select-wrapper" ref={dropdownRef}>
        <select
          id="select-account"
          value={account}
          onChange={handleChange}
          onFocus={() => setOpenDropdown(true)}
          onBlur={() => setOpenDropdown(false)}
          className="account-select"
          style={
            {
              // Apply styles to the select element itself if needed
            }
          }
        >
          <option
            value=""
            disabled
            style={{
              color: "#5a8f94", // Muted teal (works with blue/green themes)
              backgroundColor: "#f5f5f5", // Light gray background
            }}
          >
            Select Account
          </option>
          {accounts.map((acc, index) => (
            <option key={index} value={acc.telephoneno}>
              {acc.telephoneno}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AccountSelector;