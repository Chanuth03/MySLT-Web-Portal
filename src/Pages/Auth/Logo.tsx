// components/Logo.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';

const Logo: React.FC = () => {
  return (
    <div className="logo">
      <Link to="/home">
        <img src="/logo.png" alt="SLT MOBITEL" />
      </Link>
    </div>
  );
};

export default Logo;
