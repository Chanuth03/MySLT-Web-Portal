import React, { useState } from "react";
import "./BroadbandNavbar.css"; // You'll need to create this CSS file

interface BroadbandNavbarProps {
  navbarItems: {
    label: string;
    label_name: string;
    used?: string | null;
    limit?: string | null;
  }[];
  type: string;
  onSelected: (item: string) => void;
  selected: string;
}

const BroadbandNavbar: React.FC<BroadbandNavbarProps> = ({ 
  navbarItems, 
  type, 
  selected, 
  onSelected 
}) => {
  const [selectedItem, setSelectedItem] = useState(selected);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    onSelected(item);
  };

  return (
    <div className="broadband-navbar">
      {navbarItems.map((item, index) => (
        <button
          key={index}
          onClick={() => handleItemClick(item.label)}
          className={`navbar-item-broadband ${selectedItem === item.label ? 'selected' : ''}`}
        >
          <span className={`item-label-broadband ${item.label === "Home Schooling & WFH" ? 'small-text' : ''}`}>
            {item.label_name}
          </span>
          
          <span className="item-details-broadband">
  {item.label === "My Package"
    ? item.limit != null && item.used != null
      ? `${item.used} used from ${item.limit} GB`
      : "N/A"
    : type === "Summary"
    ? item.limit != null || item.used != null
      ? `${item.used ?? 0} used from ${item.limit ?? 0} GB`
      : "N/A"
    : item.limit ?? "N/A"}
</span>

        </button>
      ))}
    </div>
  );
};

export default BroadbandNavbar;