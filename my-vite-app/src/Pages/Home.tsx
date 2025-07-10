// import React from "react";
// import homebackgroundImage from "../../src/assets/bg-dashboard.png";
import AccountBalance from "../components/AccountBalance";
import Banner from "../components/Banner";
import ContentSection from "../components/ContentSection";
import AccountSelector from "../components/AccountSelector";
import CustomNavBar from "../components/CustomNavBar";
import QuickAccessMenu from "../components/QuickAccessMenu";
// import ValueAddedServicesMenu from "../components/ValueAddedServicesMenu";
import useStore from "../services/useAppStore";
import Mobile from "../components/Mobile/Mobile";
import "./Home.css"; // Import the CSS file

const Home = () => {
  const { selectedNavbarItem } = useStore();

  return (
    <div className="home-container">
      {/* Left Sticky Navigation Bar */}
      <div className="nav-sidebar">
        <CustomNavBar />
      </div>

      {/* Main Content */}
      <div className="main-content-dashboard">
        {/* Value Added Services and Account Balance in Right Middle */}
        <div className="top-section">
          <AccountBalance />
        </div>

        {/* Dynamic Content */}
        <div className="dynamic-content">
          {selectedNavbarItem === "" && <ContentSection />}
          {selectedNavbarItem === "Broadband" && <ContentSection />}
          {selectedNavbarItem === "PeoTV" && <ContentSection />}
          {selectedNavbarItem === "Voice" && <ContentSection />}
          {selectedNavbarItem === "Mobile" && <Mobile />}
        </div>
      </div>

      {/* Right Sticky Quick Access Menu & Banner */}
      <div className="right-sidebar">
        <AccountSelector />
        <QuickAccessMenu />
        <Banner />
      </div>
    </div>
  );
};

export default Home;