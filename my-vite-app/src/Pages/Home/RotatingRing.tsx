import React, { useEffect } from "react";
import './RotatingRing.css';

const RotatingRing: React.FC = () => {
  useEffect(() => {
    const wrapper = document.getElementById("wrapper");
    if (!wrapper) return; // Prevent errors if wrapper isn't found

    wrapper.innerHTML = ""; // Clear existing dots to prevent duplication

    const numDots = 12;
    const radius = 120; // Adjust radius for effect

    for (let i = 0; i < numDots; i++) {
      const angle = (i / numDots) * 360;
      const dot = document.createElement("div");
      dot.classList.add("dot");
      dot.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
      wrapper.appendChild(dot);
    }
  }, []);

  // Cursor-following gradient effect
  useEffect(() => {
    const updateGradientPosition = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--y", `${e.clientY}px`);
    };

    document.addEventListener("mousemove", updateGradientPosition);
    return () => document.removeEventListener("mousemove", updateGradientPosition);
  }, []);

  return (
    <div className="background">    

      <div className="container">
        <div id="wrapper"></div>
      </div>
    </div>
  );
};

export default RotatingRing;
