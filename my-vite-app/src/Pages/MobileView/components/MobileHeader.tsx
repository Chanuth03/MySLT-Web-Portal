import React from 'react';
import logoImg from '../../../assets/logo.png';
import AccountSelector from '../../../components/AccountSelector';
import './MobileHeader.css';

const MobileHeader = () => {
  return (
    <div className="mobile-header">
      <img src={logoImg} alt="SLT Logo" className="mobile-logo" />
      <div className="mobile-account-selector">
        <AccountSelector />
      </div>
    </div>
  );
};

export default MobileHeader;