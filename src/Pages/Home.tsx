import AccountBalance from "../components/AccountBalance";
import Banner from "../components/Banner";
import ContentSection from "../components/ContentSection";
import AccountSelector from "../components/AccountSelector";
import CustomNavBar from "../components/CustomNavBar";
import MobitelQuickAccessMenu from "../components/MobitelComponents/QuickAccessMenu";
import MobitelBanner from "../components/MobitelComponents/Banner";
import QuickAccessMenu from "../components/QuickAccessMenu";
import useStore from "../services/useAppStore";
import logoImg from "../assets/logo.png";
import Mobile from "../components/MobitelComponents/MobitelInterface";
import "./Home.css";

const Home = () => {
  const { selectedNavbarItem, selectedTelephone } = useStore();

  const isMobitel = selectedTelephone === "0714329988";

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
            {isMobitel ? <MobitelQuickAccessMenu /> : <QuickAccessMenu />}
            {isMobitel ? <MobitelBanner /> : <Banner />}
          </div>
        </div>

        <div className="mobile-account-balance-box">
          <AccountBalance />
        </div>
        <div className="mobile-custom-navbar">
          <CustomNavBar />
        </div>

        <div className="top-section">{isMobitel ? "" : <AccountBalance />}</div>

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
        {isMobitel ? <MobitelQuickAccessMenu /> : <QuickAccessMenu />}
        {isMobitel ? <MobitelBanner /> : <Banner />}
      </div>
    </div>
  );
};

export default Home;
