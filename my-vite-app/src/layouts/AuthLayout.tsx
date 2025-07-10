import { ReactNode } from 'react';
import Navbar from '../Pages/Auth/Navbar';
import VideoBackground from '../Pages/Auth/VideoBackground';
import '../../src/App.css';
import { useTranslation } from 'react-i18next';

interface AuthLayoutProps {
  children: ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  const { t } = useTranslation();
  return (
    <div className="app">
      <VideoBackground />
      <div className="content-container">
        <div className="main-content">
          <div className="left-side">
            <Navbar />
            <div className="tagline">
              <h2>{t('auth.login.videoTitle')}</h2>
              <div className="app-buttons">
                <a href="#" className="app-button ios">
                  <img src="/app-store.png" alt="Download on the App Store" />
                </a>
                <a href="#" className="app-button android">
                  <img src="/google-play.png" alt="Get it on Google Play" />
                </a>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;