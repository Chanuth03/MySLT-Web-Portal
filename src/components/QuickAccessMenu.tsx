import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { 
  // FaGift, 
  FaCogs, 
  FaTabletAlt, 
  FaFileInvoice, 
  FaMobileAlt, 
  FaHeadset,
  FaThLarge 
} from "react-icons/fa";
import "./QuickAccessMenu.css";
import useStore from "../services/useAppStore";

interface QuickAccessItem {
  label: string;
  labelKey: string;
  icon: React.ReactElement;
  disabled: boolean;
}

const QuickAccessMenu = () => {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState("");
  
  const {
    selectedTelephone,
    serviceDetails,
    setLeftMenuItem,
    setSelectedNavbarItem,
    setSelectedQuickAccessItem,
    selectedQuickAccessItem,
  } = useStore();
  
  const isPrepaid = serviceDetails?.promotionType === "Prepaid";

  const quickAccessItems: QuickAccessItem[] = [
    // {
    //   label: t('quickAccessMenu.promotion'),
    //   icon: <FaGift />,
    //   disabled: false
    // },
    {
      label: t('quickAccessMenu.newServices'),
      labelKey: "New Services", // Keep original key for comparison
      icon: <FaCogs />,
      disabled: false
    },
    {
      label: t('quickAccessMenu.digitalLife'),
      labelKey: "Digital Life",
      icon: <FaTabletAlt />,
      disabled: false
    },
    {
      label: isPrepaid ? "Reload" : t('quickAccessMenu.bill'),
      labelKey: isPrepaid ? "Reload" : "Bill",
      icon: <FaFileInvoice />,
      disabled: isPrepaid && isPrepaid
    },
    {
      label: t('quickAccessMenu.hotDevices'),
      labelKey: "Hot Devices",
      icon: <FaMobileAlt />,
      disabled: false
    },
    {
      label: t('quickAccessMenu.complaints'),
      labelKey: "Complaints",
      icon: <FaHeadset />,
      disabled: isPrepaid
    },
    {
      label: t('quickAccessMenu.more'),
      labelKey: "More",
      icon: <FaThLarge />,
      disabled: false
    },

  ];

  const handleRedirect = () => {
    window.open("https://eteleshop.slt.lk/", "_blank");
  };

  const handleItemClick = (item: QuickAccessItem) => {
    if (item.labelKey === "Hot Devices") {
      handleRedirect();
    } else if (!item.disabled) {
      setSelectedQuickAccessItem(item.labelKey); // Use labelKey for internal logic
      setLeftMenuItem(item.labelKey);
      setSelectedNavbarItem("");
    }
  };

  // const handleItemClick = (item) => {
  //   // Only allow clicking on "Digital Life" and handle Hot Devices redirect
  //   if (item.labelKey === "Digital Life" || item.labelKey === "New Services" || item.labelKey === "Bill") {
  //     setSelectedQuickAccessItem(item.labelKey);
  //     setLeftMenuItem(item.labelKey);
  //     setSelectedNavbarItem("");
  //   } else if (item.labelKey === "Hot Devices") {
  //     handleRedirect();
  //   }
  //   // Ignore clicks on other items
  // };

  useEffect(() => {
    setSelectedItem(selectedQuickAccessItem);
  }, [selectedQuickAccessItem]);

  useEffect(() => {
    setSelectedQuickAccessItem("");
  }, [selectedTelephone]);

  return (
    <div className="quick-access-menu">
      <div className="access-grid">
        {quickAccessItems.map((item, index) => (
          <div 
            key={index}
            className={`access-card ${selectedItem === item.labelKey ? 'selected' : ''} ${item.disabled ? 'disabled' : ''}`}
            onClick={() => handleItemClick(item)}
          >
            <div className="icon-container">
              {item.icon}
            </div>
            <div className="label">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
    
  );
};

export default QuickAccessMenu;