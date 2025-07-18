import React from "react";
import "./Mobile.css";

const Mobile = () => {
  return (
    <div className="mobile-content">
      {/* Summary Section */}
      <div className="mobile-content-section">
        <h3 className="section-title">Summary</h3>
        <div className="data-usage-card">
          <div className="usage-title">Daily Usage</div>
          <div className="usage-amount">1.2 GB used</div>
          <div className="usage-progress">
            <div className="usage-progress-bar" style={{ width: "30%" }}></div>
          </div>
          <div className="usage-details">3.8 GB remaining</div>
        </div>
        {/* Add more cards as needed */}
      </div>

      {/* My Package Section */}
      <div className="mobile-content-section">
        <h3 className="section-title">My Package</h3>
        <div className="data-usage-card">
          <div className="usage-title">Main Data</div>
          <div className="usage-amount">10.25 used from 100.00 GB</div>
          <div className="usage-progress">
            <div className="usage-progress-bar" style={{ width: "10%" }}></div>
          </div>
        </div>
        {/* Add more cards as needed */}
      </div>

      {/* Add more sections as shown in your image */}
    </div>
  );
};

export default Mobile;