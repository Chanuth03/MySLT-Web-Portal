// SharedBackground.tsx
import React from 'react';
import './SharedBackground.css';

const SharedBackground: React.FC = () => {
  return (
    <div className="shared-background">
      <img 
        src="/bg-main.png" 
        alt="Background" 
        className="background-image"
      />
    </div>
  );
};

export default SharedBackground;
