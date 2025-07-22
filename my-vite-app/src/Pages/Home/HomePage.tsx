import React, { useState, useEffect, useRef } from 'react';
import './HomePage.css';
import '../../i18n/i18n';
import { Link, useNavigate } from 'react-router-dom';
import LanguageSelector from '../../components/LanguageSelector';
import { useTranslation } from 'react-i18next';

const HomePage: React.FC = () => {
    const [showChatMessage, setShowChatMessage] = useState<boolean>(false);
    const [animationCompleted, setAnimationCompleted] = useState<boolean>(false);
    const [platformAnimationCompleted, setPlatformAnimationCompleted] = useState<boolean>(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [isVideoPaused, setIsVideoPaused] = useState<boolean>(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const navigate = useNavigate();
    const { t } = useTranslation();
  
    useEffect(() => {
        const timer = setTimeout(() => setAnimationCompleted(true), 100);
        const platformTimer = setTimeout(() => setPlatformAnimationCompleted(true), 4500);
        return () => {
            clearTimeout(timer);
            clearTimeout(platformTimer);
        };
    }, []);
  
    const handleMouseEnter = () => setShowChatMessage(true);
    const handleMouseLeave = () => setShowChatMessage(false);
    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    const toggleVideoPlayback = () => {
        if (videoRef.current) {
            if (isVideoPaused) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
            setIsVideoPaused(!isVideoPaused);
        }
    };

    

    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };
        document.addEventListener('keydown', handleEscKey);
        return () => document.removeEventListener('keydown', handleEscKey);
    }, [mobileMenuOpen]);

    return (
        <div className="homepage-container">
            <nav className={`main-nav ${platformAnimationCompleted ? 'fade-in-element' : 'hidden-element'}`}> 
                <div className="nav-left">
                    <button 
                        className={`menu-button ${mobileMenuOpen ? 'active' : ''}`} 
                        onClick={toggleMobileMenu} 
                        aria-label="Toggle mobile menu">
                        <span className="menu-icon"></span>
                    </button>
                </div>
                <div className={`nav-center ${mobileMenuOpen ? 'mobile-nav-open' : ''}`}>
                    {/* Add this close button */}
                    <button
                        className="close-mobile-menu"
                        onClick={() => setMobileMenuOpen(false)}
                        aria-label="Close mobile menu"
                    >
                        <span className="close-icon">&times;</span>
                    </button>
                    <a href="#">{t('homepage.about-us')}</a>
                    <a href="#">{t('homepage.coverage-map')}</a>
                    <a href="#">{t('homepage.support')}</a>
                    <a href="#">{t('homepage.contact-us')}</a>
                </div>
                <div className="nav-right">
                    <div className="language-selector-container">
                        <LanguageSelector />
                    </div>
                    <Link to="/login" className="auth-button login-btn">{t('homepage.login')}</Link>
                    <Link to="/signup" className="auth-button signup-btn">{t('homepage.signup')}</Link>
                </div>
            </nav>
            
            <div className={`main-content`}>
                <div className={`slt-logo ${animationCompleted ? 'animate-logo' : ''}`}>
                    <img src="src/assets/slt-mobitel-logo.svg" alt="SLT MOBITEL" className="logo-image" />
                </div>
                
                <div className={`marketing-message top-message ${platformAnimationCompleted ? 'fade-in-element' : 'hidden-element'}`}>
                    <p>{t('homepage.text-1')}</p>
                </div>
                
                <div className={`marketing-message bottom-message ${platformAnimationCompleted ? 'fade-in-element' : 'hidden-element'}`}>
                    <p>{t('homepage.text-2')}</p>
                </div>
                
                <div className={`fiber-mascot ${animationCompleted ? 'animate-mascot' : ''}`}>
                    <img src="src/assets/fiber-mascot.png" alt="FibreOn Mascot" className="mascot-image" />
                    <img src="src/assets/platform-circle.png" alt="Platform" className={`mascot-platform ${animationCompleted ? 'animate-platform' : ''}`} />
                </div>
                
                <div className={`next-button ${platformAnimationCompleted ? 'fade-in-element' : 'hidden-element'}`}>
                    <button className="circle-btn" onClick={() => navigate('/login')}>
                        <span className="arrow-icon">›</span>
                    </button>
                </div>
                
                <div className={`promo-video ${platformAnimationCompleted ? 'fade-in-element' : 'hidden-element'}`}>
                    <video ref={videoRef} autoPlay loop muted onClick={toggleVideoPlayback}>
                        <source src="src/assets/promo-video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Video Controls Overlay */}
                    <div className={`video-controls-overlay ${isVideoPaused ? 'visible' : ''}`}>
                        <div className="video-controls-container">
                            <div className="playback-controls">
                                <button 
                                    className="playback-button" 
                                    onClick={toggleVideoPlayback}
                                    aria-label={isVideoPaused ? "Play video" : "Pause video"}
                                >
                                    {isVideoPaused ? "▶" : "⏸"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className={`chatbot-container ${platformAnimationCompleted ? 'fade-in-element' : 'hidden-element'}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className="chatbot-icon">
                    <video autoPlay loop muted>
                        <source src="src/assets/chatbot-icon.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                {showChatMessage && (
                    <div className="chat-message">
                        <p>{t('homepage.chatbot')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
