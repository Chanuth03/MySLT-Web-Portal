import { useState } from "react";
import {
  FaWifi,
  FaPhoneAlt,
  FaChartPie,
  FaSimCard,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhone,
  FaFileInvoiceDollar,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import { MdMiscellaneousServices } from "react-icons/md";
import "./QuickAccessMenu.css";

const QuickAccessMenu = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [hoverIndex, setHoverIndex] = useState(-1);

  const quickAccessItems = [
    { label: "Data Plans", icon: <FaWifi />, disabled: false },
    { label: "Voice & Text Plans", icon: <FaPhoneAlt />, disabled: false },
    { label: "Usage", icon: <FaChartPie />, disabled: false },
    { label: "E-sim", icon: <FaSimCard />, disabled: false },
    {
      label: "Digital Services",
      icon: <MdMiscellaneousServices />,
      disabled: false,
    },
    { label: "Roaming", icon: <FaGlobe />, disabled: false },
    { label: "Locate Us", icon: <FaMapMarkerAlt />, disabled: false },
    { label: "Contact", icon: <FaPhone />, disabled: false },
    { label: "E-Bill", icon: <FaFileInvoiceDollar />, disabled: false },
    { label: "Scratch Card", icon: <FaMoneyCheckAlt />, disabled: false },
  ];

  const handleRedirect = () => {
    window.open("https://eteleshop.slt.lk/", "_blank");
  };

  const handleItemClick = (item: { label: string; disabled: boolean }) => {
    if (item.label === "Locate Us") {
      handleRedirect();
    } else if (!item.disabled) {
      setSelectedItem(item.label);
    }
  };

  return (
    <div className="quick-access-menu">
      <div className="access-grid">
        {quickAccessItems.map((item, index) => (
          <div
            key={index}
            className={`access-card ${
              selectedItem === item.label ? "selected" : ""
            } ${item.disabled ? "disabled" : ""}`}
            onClick={() => handleItemClick(item)}
            onMouseEnter={() => !item.disabled && setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(-1)}
          >
            <div className="icon-container">{item.icon}</div>
            <div className="label">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickAccessMenu;
