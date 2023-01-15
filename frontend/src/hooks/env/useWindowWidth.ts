import { DESKTOP_MIN_WIDTH, MOBILE_MIN_WIDTH } from '@constants/layout';
import { useState, useEffect } from 'react';

const useWindowWidth = () => {
  const [isMobile, setIsMobile] = useState(
    window?.innerWidth < MOBILE_MIN_WIDTH
  );
  const [isDesktopMin, setIsDesktopMin] = useState(
    window?.innerWidth <= DESKTOP_MIN_WIDTH
  );

  const handleResize = () => {
    setIsMobile(window.innerWidth < MOBILE_MIN_WIDTH);
    setIsDesktopMin(window.innerWidth <= DESKTOP_MIN_WIDTH);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize, false);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    isDesktopMin,
    isMobile
  };
};

export default useWindowWidth;
