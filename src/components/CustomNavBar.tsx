import { useEffect, useState } from "react";
import { FaWifi, FaTv, FaPhone, FaMobile, FaGift } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import useStore from "../services/useAppStore";
import logoImg from "../assets/logo.png";
import "./CustomNavBar.css";

const CustomNavBar = () => {
  const { t } = useTranslation();
  const {
    serviceDetails,
    setSelectedNavbarItem,
    selectedNavbarItem,
    selectedTelephone,
    setLeftMenuItem,
    setSelectedQuickAccessItem,
  } = useStore();
  
  const isPrepaid =
    serviceDetails?.promotionType === "Prepaid" ||
    serviceDetails?.promotionType === null;
  
  const [selectedItem, setSelectedItem] = useState("Broadband");

  const items =
    selectedTelephone === "0714329988"
      ? [
          { id: "Ashen", name: "Ashen" },
          { id: "Sachini", name: "Sachini" },
          { id: "Nuwan", name: "Nuwan" },
        ]
      : [
          { id: "Broadband", name: t('navbar.broadband'), icon: <FaWifi /> },
          { id: "PeoTV", name: t('navbar.peoTV'), icon: <FaTv /> },
          { id: "Voice", name: t('navbar.voice'), icon: <FaPhone /> },
          { id: "Mobile", name: t('navbar.mobile'), icon: <FaMobile /> },
          { id: "Promotions", name: t('navbar.promotions'), icon: <FaGift /> },
        ];

  const handleItemClick = (itemId: string) => {
    setSelectedQuickAccessItem("");
    setSelectedItem(itemId);
    setSelectedNavbarItem(itemId);
    if (itemId === "Broadband") setLeftMenuItem("Summary");
    if (itemId === "PeoTV") setLeftMenuItem("My Package");
    if (itemId === "Voice") setLeftMenuItem("My Package");
  };

  const disabledItems = ["PeoTV", "Mobile", "Voice"];

  useEffect(() => {
    setSelectedItem(selectedNavbarItem);
  }, [selectedNavbarItem]);

  useEffect(() => {
    setSelectedNavbarItem("Broadband");
    setSelectedItem("Broadband");
  }, [selectedTelephone]);

  return (
    <div className="sidebar">
      <div className="logo-container-dashboard">
        <img src={logoImg} alt="Logo" className="logo-dashboard" />
      </div>
      <div className="service-list">
        {items.map((item) => {
          const disabled = disabledItems.includes(item.id) && isPrepaid;
          return (
            <div
              key={item.id}
              className={`service-item ${selectedItem === item.id ? "active" : ""} ${disabled ? "disabled" : ""}`}
              onClick={() => !disabled && handleItemClick(item.id)}
            >
              {'icon' in item && item.icon && <div className="service-icon">{item.icon}</div>}
              <div className="service-name-sidebar">{item.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomNavBar;