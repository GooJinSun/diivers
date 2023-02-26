import React, { useEffect, useState } from 'react';
import { IconButton } from '@material-ui/core';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import useWindowWidth from '@hooks/env/useWindowWidth';
import { ButtonWrapper, ButtonText } from './ScrollTopButton.styles';

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
        color="primary"
        id="scroll-top-button"
        size="small"
        onClick={onClick}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <ArrowUpward fontSize="small" />
          <ButtonText>맨위로</ButtonText>
        </div>
      </IconButton>
    </ButtonWrapper>
  );
};

export default ScrollTopButton;
