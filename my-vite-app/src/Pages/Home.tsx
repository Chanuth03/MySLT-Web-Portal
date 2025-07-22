import React, { useState, useEffect } from 'react';
import AccountBalance from "../components/AccountBalance";
import Banner from "../components/Banner";
import ContentSection from "../components/ContentSection";
import AccountSelector from "../components/AccountSelector";
import CustomNavBar from "../components/CustomNavBar";
import QuickAccessMenu from "../components/QuickAccessMenu";
import useStore from "../services/useAppStore";
import Mobile from "../components/Mobile/Mobile";
import MobileLayout from "./MobileView/MobileLayout";
import "./Home.css";

const Home = () => {
  const { selectedNavbarItem } = useStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return <MobileLayout />;
  }

  return (
    <div className="home-container desktop-view">
      {/* Desktop Layout */}
      <div className="nav-sidebar">
        <CustomNavBar />
      </div>

      <div className="main-content-dashboard">
        <div className="top-section">
          <AccountBalance />
        </div>

        <div className="dynamic-content">
          {selectedNavbarItem === "" && <ContentSection />}
          {selectedNavbarItem === "Broadband" && <ContentSection />}
          {selectedNavbarItem === "PeoTV" && <ContentSection />}
          {selectedNavbarItem === "Voice" && <ContentSection />}
          {selectedNavbarItem === "Mobile" && <Mobile />}
        </div>
      </div>

      <div className="right-sidebar">
        <AccountSelector />
        <QuickAccessMenu />
        <Banner />
      </div>
    </div>
  );
};

export default Home;