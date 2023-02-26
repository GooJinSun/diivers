import React, { useEffect, useState } from 'react';
import { IconButton } from '@material-ui/core';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import { ButtonWrapper, ButtonText } from './ScrollTopButton.styles';

const ScrollTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const onClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setIsVisible(window.scrollY > 0);
    });
  }, []);

  if (!isVisible) return <></>;
  return (
    <ButtonWrapper>
      <IconButton color="primary" id="scroll-top-button" onClick={onClick}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <ArrowUpward />
          <ButtonText>맨위로</ButtonText>
        </div>
      </IconButton>
    </ButtonWrapper>
  );
};

export default ScrollTopButton;
