import {
  DESKTOP_MIN_WIDTH,
  MOBILE_MIN_WIDTH,
  WINDOW_MAX_WIDTH
} from '@constants/layout';
import { useState, useEffect } from 'react';

const useWindowWidth = () => {
  // 현재 MAX_WIDTH 500으로 가져감
  // 나중에 웹 쪽에 대해서도 대응할 일이 있다면, 주석 해제 필요
  // const width = window.innerWidth;
  const width = WINDOW_MAX_WIDTH;
  const [isMobile, setIsMobile] = useState(width < MOBILE_MIN_WIDTH);
  const [isDesktopMin, setIsDesktopMin] = useState(width <= DESKTOP_MIN_WIDTH);

  const handleResize = () => {
    setIsMobile(width < MOBILE_MIN_WIDTH);
    setIsDesktopMin(width <= DESKTOP_MIN_WIDTH);
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
