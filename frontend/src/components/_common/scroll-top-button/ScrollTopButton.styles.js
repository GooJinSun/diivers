import styled from 'styled-components';
import { DEFAULT_MARGIN, BOTTOM_TAB_HEIGHT } from '@constants/layout';
import { primaryColor } from '@constants/colors';

export const ButtonWrapper = styled.div`
  position: fixed;
  bottom: ${({ isMobile }) =>
    !isMobile ? DEFAULT_MARGIN : BOTTOM_TAB_HEIGHT + 8}px;
  right: ${DEFAULT_MARGIN / 2}px;
  border: 1px solid ${primaryColor};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  border-radius: 8px;
  background-color: #fff;
`;

export const ButtonText = styled.div`
  font-size: 12px;
  color: ${primaryColor};
`;
