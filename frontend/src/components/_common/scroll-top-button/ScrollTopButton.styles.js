import styled from 'styled-components';
import { DEFAULT_MARGIN, BOTTOM_TAB_HEIGHT } from '@constants/layout';
// import { primaryColor } from '@constants/colors';

export const ButtonWrapper = styled.div`
  position: fixed;
  bottom: ${({ isMobile }) =>
    !isMobile ? DEFAULT_MARGIN : BOTTOM_TAB_HEIGHT + 8}px;
  right: ${DEFAULT_MARGIN / 2}px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  border-radius: 50%;
  background-color: #fccacf;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;
