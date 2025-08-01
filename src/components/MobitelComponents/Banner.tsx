import { useEffect, useState } from "react";
import "./Banner.css";
import banner1 from "../../assets/Images/MobitelComponents/4g-banner-create-desktop-02.jpg";
import banner2 from "../../assets/Images/MobitelComponents/new-banner-sp.jpg";
import banner3 from "../../assets/Images/MobitelComponents/Desktop_Ookla2020_MainBanner.png";
import vas1 from "../../assets/Images/MobitelComponents/Rectangle 13.png";
import vas2 from "../../assets/Images/MobitelComponents/Rectangle 40.png";
import vas3 from "../../assets/Images/MobitelComponents/myslt.png";
import vas4 from "../../assets/Images/MobitelComponents/Rectangle 42.png";
import vas5 from "../../assets/Images/MobitelComponents/Rectangle 43.png";

// ✅ Static banner data instead of fetching from API
const staticBannerData = [
  { image: banner1 },
  { image: banner2 },
  { image: banner3 },
];

// ✅ Web-based images for Value Added Services
const items = [
  { image: vas1, url: "#", label: "Service One" },
  { image: vas2, url: "#", label: "Service One" },
  { image: vas3, url: "#", label: "Service One" },
  { image: vas4, url: "#", label: "Service One" },
  { image: vas5, url: "#", label: "Service One" },
];

const Banner = () => {
  const [bannerData] = useState(staticBannerData);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % bannerData.length
        );
        setFade(true);
      }, 50);
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerData.length]);

  return (
    <>
      <div className="banner-container">
        {bannerData.length > 0 && (
          <div
            className={`banner-image ${fade ? "fade-in" : "fade-out"}`}
            style={{
              backgroundImage: `url(${bannerData[currentImageIndex]?.image})`,
            }}
          />
        )}
      </div>
      <div className="value-added-services">
        <h3>Other Apps</h3>
        <div className="service-icons">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="service-icon-rightside"
            >
              <img
                src={item.image}
                alt="Value Added Service"
                className="vas-icon-image"
              />
              {/* <p className="new-service-label">{item.label}</p> */}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Banner;
