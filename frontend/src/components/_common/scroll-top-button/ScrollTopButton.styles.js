import styled from 'styled-components';
import { DEFAULT_MARGIN } from '@constants/layout';
import { primaryColor } from '@constants/colors';

export const ButtonWrapper = styled.div`
  position: fixed;
  bottom: ${DEFAULT_MARGIN}px;
  right: ${DEFAULT_MARGIN}px;
  width: 40px;
  height: 40px;
  border: 1px solid ${primaryColor};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

export const ButtonText = styled.div`
  font-size: 12px;
  color: ${primaryColor};
`;
