import { MOBILE_MIN_WIDTH } from '@constants/layout';
import { useState, useEffect, useCallback } from 'react';

const useWindowWidth = () => {
  const width = document.body.clientWidth;
  const [isMobile, setIsMobile] = useState(width < MOBILE_MIN_WIDTH);

  const handleResize = useCallback(() => {
    console.log(width);
    console.log(MOBILE_MIN_WIDTH);
    console.log(width < MOBILE_MIN_WIDTH);

    setIsMobile(width < MOBILE_MIN_WIDTH);
  }, [width]);

  useEffect(() => {
    console.log(isMobile);
    handleResize();

    window.addEventListener('resize', handleResize, false);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return {
    isMobile
  };
};

export default useWindowWidth;
