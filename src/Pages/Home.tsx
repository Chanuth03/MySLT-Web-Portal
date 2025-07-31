import AccountBalance from "../components/AccountBalance";
import Banner from "../components/Banner";
import ContentSection from "../components/ContentSection";
import AccountSelector from "../components/AccountSelector";
import CustomNavBar from "../components/CustomNavBar";
import QuickAccessMenu from "../components/QuickAccessMenu";
import useStore from "../services/useAppStore";
import logoImg from "../assets/logo.png";
import Mobile from "../components/Mobile/Mobile";
import "./Home.css";

const Home = () => {
  const { selectedNavbarItem } = useStore();

  return (
    <div className="home-container">
      <div className="nav-sidebar desktop-only">
        <CustomNavBar />
      </div>

      <div className="main-content-dashboard">
        <div className="mobile-main-box">
          <div className="account-selector-mobile">
            <img src={logoImg} alt="Logo" className="mobile-logo" />
            <AccountSelector />
          </div>
          <div className="quick-access-mobile">
            <QuickAccessMenu />
            <Banner />
          </div>
        </div>

        <div className="mobile-account-balance-box">
          <AccountBalance />
        </div>
        <div className="mobile-custom-navbar">
          <CustomNavBar />
        </div>

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
        <div className="account-selector-desktop">
          <AccountSelector />
        </div>
        <QuickAccessMenu />
        <Banner />
      </div>
    </div>
  );
};

export default Home;
