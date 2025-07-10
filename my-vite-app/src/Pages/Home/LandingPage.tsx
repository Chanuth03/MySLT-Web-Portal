import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RotatingRing from './RotatingRing';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  const [rotatingRingComplete, setRotatingRingComplete] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const navigate = useNavigate();

  // First phase - show the rotating ring animation
  useEffect(() => {
    const ringTimer = setTimeout(() => {
      setRotatingRingComplete(true);
    }, 5000); // Adjust time to match RotatingRing animation

    return () => clearTimeout(ringTimer);
  }, []);

  // Second phase - show logo and progress bar
  useEffect(() => {
    if (rotatingRingComplete) {
      const totalLoadingTime = 6000; // 10 seconds
      const intervalTime = 100; // Update progress every 100ms
      const incrementValue = (intervalTime / totalLoadingTime) * 100;

      const progressInterval = setInterval(() => {
        setProgress(prev => (prev + incrementValue >= 100 ? 100 : prev + incrementValue));
      }, intervalTime);

      const loadingTimer = setTimeout(() => {
        setLoading(false);
        clearInterval(progressInterval);
        setProgress(100);
      }, totalLoadingTime);

      return () => {
        clearTimeout(loadingTimer);
        clearInterval(progressInterval);
      };
    }
  }, [rotatingRingComplete]);

  // Final phase - redirect to the home page
  useEffect(() => {
    if (!loading) {
      const redirectTimer = setTimeout(() => {
        navigate('/home'); // Redirect to main app page
      }, 500); // Smooth transition delay

      return () => clearTimeout(redirectTimer);
    }
  }, [loading, navigate]);

  return (
    <div className="landing-page">
      {!rotatingRingComplete ? (
        <RotatingRing />
      ) : loading ? (
        <div className="logo-container">
          {/* SLT Logo */}
          <img 
            src="src/assets/slt-mobitel-logo.svg" 
            alt="SLT MOBITEL" 
            className="slt-logo-landing"
          />
          
          {/* Progress Bar */}
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default LandingPage;
