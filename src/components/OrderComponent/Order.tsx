import { useState, useRef, useEffect } from "react";
import "./OrderAnimation.css";
import { Typography } from "@mui/material";
import gsap from "gsap";
import { useTranslation } from 'react-i18next';

const OrderAnimation = () => {
  const { t } = useTranslation();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDone, setIsDone] = useState(false);
  
  const buttonRef = useRef<HTMLButtonElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const truckRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Cleanup animations when component unmounts
    return () => {
      if (buttonRef.current) {
        gsap.killTweensOf(buttonRef.current);
      }
      if (boxRef.current) {
        gsap.killTweensOf(boxRef.current);
      }
      if (truckRef.current) {
        gsap.killTweensOf(truckRef.current);
      }
    };
  }, []);

  const navigateToSLTSite = () => {
    window.location.href = "https://myslt.slt.lk/applyonline";
  };

  const handleClick = () => {
    if (isAnimating || isDone) return;
    
    setIsAnimating(true);
    
    const button = buttonRef.current;
    const box = boxRef.current;
    const truck = truckRef.current;
    
    if (!button || !box || !truck) return;
    
    // Start the animation sequence
    gsap.to(button, {
      '--rx': '-90deg',
      '--br': 0,
      duration: 0.5,
      onComplete: () => {
        // Box appears and moves to position
        gsap.to(button, {
          '--box-s': 1,
          '--box-o': 1,
          duration: 0.3,
          delay: 0.2
        });
        
        gsap.to(box, {
          x: 0,
          duration: 0.4,
          delay: 0.5
        });
        
        gsap.to(button, {
          '--hx': -5,
          '--bx': 50,
          duration: 0.18,
          delay: 0.75
        });
        
        gsap.to(box, {
          y: 0,
          duration: 0.1,
          delay: 0.95
        });
        
        // Truck starts to move
        gsap.set(button, {
          '--truck-y': 0,
          '--truck-y-n': -26
        });
        
        gsap.to(button, {
          '--truck-y': 1,
          '--truck-y-n': -25,
          duration: 0.2,
          delay: 1.05,
          onComplete() {
            gsap.timeline({
              onComplete() {
                setIsDone(true);
                // Navigate to SLT site after animation completes
                setTimeout(() => {
                  navigateToSLTSite();
                }, 1000); // Reduced from 5000 to 1000ms for faster navigation after animation
              }
            })
            .to(truck, { x: 0, duration: 0.4 })
            .to(truck, { x: 40, duration: 1 })
            .to(truck, { x: 20, duration: 0.6 })
            .to(truck, { x: 96, duration: 0.4 });
            
            gsap.to(button, {
              '--progress': 1,
              duration: 2.4,
              ease: 'power2.in'
            });
          }
        });
      }
    });
  };
  
  // const resetAnimation = () => {
  //   setIsAnimating(false);
  //   setIsDone(false);
    
  //   const button = buttonRef.current;
  //   const box = boxRef.current;
  //   const truck = truckRef.current;
    
  //   if (!button || !box || !truck) return;
    
  //   gsap.set(truck, { x: 4 });
    
  //   gsap.set(button, {
  //     '--rx': '0deg',
  //     '--br': '5px',
  //     '--progress': 0,
  //     '--hx': 0,
  //     '--bx': 0,
  //     '--box-s': 0.5,
  //     '--box-o': 0,
  //     '--truck-y': 0,
  //     '--truck-y-n': -26
  //   });
    
  //   gsap.set(box, { x: -24, y: -6 });
  // };

  return (
    <button
      ref={buttonRef}
      className={`order-button ${isAnimating ? "animation" : ""} ${isDone ? "done" : ""}`}
      onClick={handleClick}
      style={{
               
        
        left: '-240px', 
        marginTop:"350px",
        backgroundColor: '#1a417a',
        color: 'white',
        padding: '12px 30px',
        borderRadius: '5px',
        border: 'none',
        fontSize: '20px',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      }}
    
    >
      <span className="default">
        <Typography sx={{ fontSize: "20px" }} variant="body2">
          {/* Request Now */}
          {t('newServices.requestNow')}
        </Typography>
      </span>
      <span className="success">
        <Typography sx={{ fontSize: "18px" }} variant="body2">
          Fiber is on the way
          <svg viewBox="0 0 12 10">
            <polyline points="1.5 6 4.5 9 10.5 1" />
          </svg>
        </Typography>
      </span>
      <div className="truck" ref={truckRef}>
        <div className="wheel"></div>
        <div className="back"></div>
        <div className="front"></div>
        <div className="box" ref={boxRef}></div>
      </div>
    </button>
  );
};

export default OrderAnimation;