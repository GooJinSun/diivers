import styled from 'styled-components';
import { AUTHENTICATION_MIN_WIDTH } from '@constants/layout';

export const AuthenticationDescWrapper = styled.div`
  max-width: 300px;
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 36px;
  padding: 0 40px;

  @media (max-width: ${AUTHENTICATION_MIN_WIDTH}px) {
    font-size: 24px;
    margin-top: 50px;
  }
`;
