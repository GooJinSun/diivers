import React, { useEffect, useState } from 'react';
import { IconButton } from '@material-ui/core';
import VerticalAlignTop from '@material-ui/icons/VerticalAlignTop';
import useWindowWidth from '@hooks/env/useWindowWidth';
import { ButtonWrapper } from './ScrollTopButton.styles';

const ScrollTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const onClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };
  const { isMobile } = useWindowWidth();

  const handleVisible = () => {
    setIsVisible(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleVisible);
    return () => {
      window.removeEventListener('scroll', handleVisible);
    };
  }, []);

  if (!isVisible) return <></>;
  return (
    <ButtonWrapper isMobile={isMobile}>
      <IconButton
        id="scroll-top-button"
        size="small"
        style={{ color: '#f12c56' }}
        onClick={onClick}
      >
        <VerticalAlignTop fontSize="medium" />
      </IconButton>
    </ButtonWrapper>
  );
};

export default ScrollTopButton;
