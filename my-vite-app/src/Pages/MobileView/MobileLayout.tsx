import React from 'react';
import MobileHeader from './components/MobileHeader';
import MobileQuickAccess from './components/MobileQuickAccess';
import MobileBanner from './components/MobileBanner';
import MobileAccountBalance from './components/MobileAccountBalance';
import MobileNavBar from './components/MobileNavBar';
import MobileContentSection from './components/MobileContentSection';
import useStore from '../../services/useAppStore';
import ContentSection from '../../components/ContentSection';
import Mobile from '../../components/Mobile/Mobile';

const MobileLayout = () => {
  const { selectedNavbarItem } = useStore();

  return (
    <div className="mobile-container">
      <MobileHeader />
      <MobileQuickAccess />
      <MobileBanner />
      <MobileAccountBalance />
      <MobileNavBar />
      <MobileContentSection>
        {selectedNavbarItem === "" && <ContentSection />}
        {selectedNavbarItem === "Broadband" && <ContentSection />}
        {selectedNavbarItem === "PeoTV" && <ContentSection />}
        {selectedNavbarItem === "Voice" && <ContentSection />}
        {selectedNavbarItem === "Mobile" && <Mobile />}
      </MobileContentSection>
    </div>
  );
};

export default MobileLayout;