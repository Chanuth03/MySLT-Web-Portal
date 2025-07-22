import React from 'react';
import './MobileContentSection.css';

interface MobileContentSectionProps {
  children: React.ReactNode;
}

const MobileContentSection: React.FC<MobileContentSectionProps> = ({ children }) => {
  return <div className="mobile-content-section">{children}</div>;
};

export default MobileContentSection;