// components/Navbar.tsx
import React from 'react';
import Logo from './Logo';
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <nav className="navbar">
      <Logo />
      <div className="nav-links">
        <a href="#" className="nav-link">{t('auth.contact_us')}</a>
        <a href="#" className="nav-link">{t('auth.support')}</a>
      </div>
    </nav>
  );
};

export default Navbar;
