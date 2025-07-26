import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import SharedBackground from './SharedBackground';

interface BackgroundManagerProps {
  children: ReactNode;
}

function BackgroundManager({ children }: BackgroundManagerProps) {
  const location = useLocation();
  const sharedBackgroundRoutes = ['/', '/home']; // Routes that use the shared background
  
  const shouldShowSharedBackground = sharedBackgroundRoutes.includes(location.pathname);
  
  return (
    <>
      {shouldShowSharedBackground && <SharedBackground />}
      {children}
    </>
  );
}

export default BackgroundManager;