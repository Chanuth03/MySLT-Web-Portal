import React from 'react';
import { Phone } from 'lucide-react';
import './Call.css';

const Call = () => {
  const currentDate = "29/04/2025 11.32 AM";
  
  // Bundle data for both voice services
  const bundles = [
    {
      name: "Loyalty Voice",
      used: 1,
      total: 4,
      expiryDate: "2025-05-01 21:22:34"
    },
    {
      name: "Call Center Voice",
      used: 2,
      total: 4,
      expiryDate: "2025-05-01 21:22:34"
    }
  ];

  // Calculate progress percentage for the progress bar
  const calculateProgress = (used, total) => {
    return (used / total) * 100;
  };

  return (
    <div className="call-container">
      <div className="call-header">
        <Phone size={20} className="phone-icon" />
        <h1 className="call-title">Call</h1>
      </div>
      
      <div className="update-info">
        Updated as at {currentDate}
      </div>
      
      {bundles.map((bundle, index) => (
        <div key={index} className="bundle-card">
          <h2 className="bundle-title">
            {bundle.name}
          </h2>
          
          <div className="bundle-label">
            Bundle :
          </div>
          
          <div className="progress-bar-container">
            <div 
              className="progress-bar"
              style={{ width: `${calculateProgress(bundle.used, bundle.total)}%` }}
            />
          </div>
          
          <div className="usage-info">
            <div className="usage-text">{bundle.used} used of {bundle.total}</div>
            <div className="remaining-container">
              <span className="remaining-number">{bundle.total - bundle.used}</span>
              <span className="remaining-text">Remaining</span>
            </div>
          </div>
          
          <div className="expiry-info">
            Expires on : {bundle.expiryDate}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Call;